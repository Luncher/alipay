import fs from 'fs'
import urllib from 'urllib'
import crypto from 'crypto'
import makeDebug from 'debug'
import Promise from 'bluebird'
import makeBase64 from 'js-base64'
import config from './config'
import Parser from './parser'
import { RESPONSE_MESSAGE, METHOD_TYPES } from './config'

const Base64 = makeBase64.Base64
const debug = makeDebug('alipay-mobile:index')
const isPro = process.env.NODE_ENV === 'production'

export default class Alipay {
  constructor(options = {}) {
    this.privKey = options.appPrivKeyFile;
    this.pubKey = options.alipayPubKeyFile;

    if (!this.privKey || !this.pubKey) {
      throw new Error('Invalid appPrivKeyFile or alipayPubKeyFile')
    }

    if ( !fs.existsSync(this.privKey)) {
      throw new Error("Not Found appPrivKeyFile.")
    }
    if ( !fs.existsSync(this.pubKey)) {
      throw new Error("Not Found alipayPubKeyFile.")
    }
    this.normalizePem()
    const omit = ['appPrivKeyFile', 'alipayPubKeyFile']
    this.options = Object.assign({}, Object.keys(options).reduce((acc, val, index) => {
      if (omit.indexOf(val) === -1) {
        acc[val] = options[val]
      }
      return acc
    }, {}))
    debug("origin options:", options)
    debug("basic options:", this.options)
  }

  normalizePem () {
    this.pubKey = fs.readFileSync(this.pubKey, 'utf-8')
    this.privKey = "-----BEGIN RSA PRIVATE KEY-----\n" 
      + fs.readFileSync(this.privKey, 'utf-8')
      + "\n-----END RSA PRIVATE KEY-----"
  }

  makeSignStr (params, omit = ['sign']) {
    return Object.keys(params)
      .sort()
      .filter(key => params[key] && omit.indexOf(key) === -1)
      .map(key => {
        const value = typeof params[key] === 'object' ?
          JSON.stringify(params[key]) : params[key]
        return key + '=' + value + ''
      })
      .join('&').trim()
  }

  signAlgorithm (signType) {
    return config.ALIPAY_ALGORITHM_MAPPING[signType]
  }

  makeSign (params) {
    const signStr = this.makeSignStr(params)
    debug("signStr:", signStr)
    const algorithm = this.signAlgorithm(params.sign_type)
    const signer = crypto.createSign(algorithm);
    signer.update(signStr, params.charset)
    return signer.sign(this.privKey, "base64")
  }

  buildBasicParams (method, options) {
    const params = Object.assign({}, this.options, { method })
    return Parser.parseBasic(params)
  }

  buildAPIParams (method, options) {
    return Parser.parseAPIParams(method, options)
  }

  buildParams (method, options) {
    return Promise.all([
      this.buildBasicParams(method, options),
      this.buildAPIParams(method, options)
    ])
    .then(result => {
      return Object.assign({}, result[0], { biz_content: result[1] })
    })
    .then(params => {
      params.sign = this.makeSign(params)
      debug("sign: ", params.sign)
      return params
    })
  }

  isSucceed (response) {
    return ['10000'].indexOf(response.code) !== -1    
  }

  isPermissionDenied (response) {
    return ['40006'].indexOf(response.code) !== -1    
  }

  // {
  // code: 'xx'
  // message: 'xxx'
  // metadata: 'public response'
  // data: "specific response data"
  //}
  parseResponse (response) {
    const metafields = [ 'code', 'msg', 'sub_code', 'sub_msg', 'sign' ]
    const result = Object.keys(response).reduce((acc, cur) => {
      const field = metafields.indexOf(cur) !== -1 ? 'metadata' : 'data'
      acc[field] = response[cur]
    }, { metadata: {}, data: {} })
    return JSON.parse(JSON.stringify(result))
  }

  makeResponse (response) {
    return Promise.resolve()
    .then(() => {
      return this.verifySign(response)
    })
    .then((valid) => {
      const result = this.parseResponse(response)
      const { metadata, data } = result;
      if (!valid) {
        result.code = '-3'
      } else {
        if (this.isSucceed(result.metadata)) {
          result.code = '0'
        } else if (this.isPermissionDenied(result.metadata)) {
          result.code = '-2'
        } else {
          result.code = '-1'
        }
      }
      result.message = RESPONSE_MESSAGE[result.code]
      return result
    })
  }

  makeRequest (params, options = {}) {
    const httpclient = urllib.create()
    const gatway = isPro ? config.ALIPAY_GETWAY : config.ALIPAY_DEV_GETWAY
    return httpclient.request(gatway, Object.assign({}, {
      data: params,
      dataAsQueryString: true
    }, options))
    .then(result => this.makeResponse(result))
  }

  createOrder (options) {
    let sign;
    return this.buildParams(METHOD_TYPES.CREATE_ORDER, options)
    .then(params => {
      sign = params.sign
      return this.makeSignStr(params)
    })
    .then(signStr => {
      return signStr.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        return acc + key + '=' + encodeURIComponent(value) + '&'
      }, "").slice(0, -1)
    })
    .then(data => {
      data = data + '&sign=' + encodeURIComponent(sign)
      return { code: 0, message: RESPONSE_MESSAGE[0], data }
    })
  }

  responseType (response) {
    return Object.keys(config.ALIPAY_API_LIST)
      .map(name => name.replace(/\./g, '_'))
      .find(api => `${api}_response` in response)
  }

  //response:
  // xxx_response
  // sign
  // sign_type
  verifySign (response, charset = this.options.charset) {
    return Promise.resolve()
    .then(() => {
      let isValid = true
      const respType = this.responseType(response)
      if (!respType) {
        debug("Invalid Response Type")
        isValid = false
      }
      else {
        const sign = response.sign
        const resp = response[respType] 
        const algorithm = this.signAlgorithm(response.sign_type)
        const verify = crypto.createVerify(algorithm)
        verify.update(resp, charset)
        isValid = !!(verify.verify(this.pubKey, sign, 'base64'))
      }

      return isValid
    })
  }

  isPaymentSuccess (response) {
    return ['9000'].indexOf(response.resultStatus) !== -1
  }

  isPaymentInProcessing (response) {
    return ['8000', '6004'].indexOf(response.resultStatus) !== -1
  }

  // app request the server to verify payment status
  // verify signature
  // verify out_trade_no
  // vetify total_amount
  // verify seller_id or seller_email
  // verify appid
  // options: {
  //   memo: ''
  //   result: ''
  //   resultStatus: '' 
  // }
  verifyPayment (options) {
    return this.buildAPIParams(METHOD_TYPES.VERIFY_PAYMENT, options)
    .then(() => {
      if (this.isPaymentSuccess(options)) {
        return '0'
      }
      else if (this.isPaymentInProcessing(options)) {
        return '1'
      }
      else {
        return '-1'
      }
    })
    .then(code => {
      if (code == '0') {
        return this.makeResponse(options.result)
      } else {
        return { code, message: RESPONSE_MESSAGE[code] }
      }
    })
  }

  // sync query order status
  queryOrder (outTradeNo, tradeNo) {
    return Promise.resolve()
    .then(() => {
      if (!outTradeNo && !tradeNo) {
        throw new Error("outTradeNo and tradeNo can not both omit.")
      }
      const params = { out_trade_no: outTradeNo, trade_no: tradeNo }
      return this.buildParams(METHOD_TYPES.QUERY_ORDER, params)
      .then(params => {
        return this.makeRequest(params)
      })
    })
  }

  // receive alipay server notify and make response
  verifyNotifySign (params) {
    return Promise.resolve()
    .then(() => {
      const sign = Base64.decode(params.sign);
      const str = this.makeSignStr(params, ['sign', 'sign_type'])
      const resp = { sign, 'async_notify_response': str, sign_type: params.sign_type }
      return this.verifySign(resp)
    })
  }

  notifySuccess () {
    return config.ALIPAY_NOTIFY_SUCCESS
  }

  notifyFailure () {
    return config.ALIPAY_NOTIFY_FAILURE
  }

  makeNotifyResponse (params) {
    return this.verifyNotifySign(params)
    .then(valid => {
      const code = valid ? '0' : '-2'
      return { code, message: RESPONSE_MESSAGE[code], data: params }
    })
  }
}