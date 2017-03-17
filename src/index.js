import fs from 'fs'
import urllib from 'urllib'
import Promise from 'bluebird'
import config from './config'
import Parser from './config/parser'
import * as methodTypes from './config/method-types'

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
    const omit = ['appPrivKeyFile', 'alipayPubKeyFile']
    this.options = Object.assign({}, Object.keys(options).reduce((acc, val, index) => {
      omit.indexOf(val) === -1 && (acc[val] = options[val])
    }, {}))
  }

  makeSignStr (params) {
    return str = Object.keys(params)
      .sort()
      .filter(key => params[key] && key !== 'sign')
      .map(key => {
        return key + '="' + params[key] + '"'
      })
      .join('&')
  }

  makeSign (params) {
    const signAlgorithm = params.sign_type === 'RSA2' ? 
      'RSA-SHA256' : 'RSA-SHA1';
    const signStr = this.makeSignStr(params)
    const signer = crypto.createSign(signAlgorithm);
    signer.update(str, 'utf-8')
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
      buildBasicParams(method, options),
      buildAPIParams(method, options)
    ])
    .then(result => {
      return Object.assign({}, result[0], { biz_content: result[1] })
    })
    .then(params => {
      params.sign = this.makeSign(params)
      return params
    })
  }

  parseResponse () {
    
  }

  makeRequest (params, options = {}) {
    const httpclient = urllib.create()
    return httpclient.request(config.APIPAY_ENDPOINT, Object.assign({}, {
      data: params,
      dataAsQueryString: true
    }, options))
  }

  createOrder (options) {
    return this.buildParams(methodTypes.CREATE_ORDER, options)
    .then(params => {
      return this.makeSignStr(params)
    })
    .then(signStr => {
      return signStr.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        return acc + key + '=' + encodeURIComponent(value) + '&'
      }, "").slice(0, -1)
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
      return this.buildParams(methodTypes.QUERY_ORDER, params)
      .then(params => {
        return this.makeRequest(params)
      })
    })
  }

  // receive alipay notify and make response
  makeNotifyResponse () {

  }
}