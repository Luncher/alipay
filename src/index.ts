import * as urllib from 'urllib'
import {
  isProd,
  AlipayOption,
  MethodType,
  GateWay,
  AlipayPrivKey,
  AlipayTradeSettleArgs,
  AlipayBillQueryArgs,
  AlipayPublicArgs,
  AlipayToaccountTransferArgs,
  AlipayTradeRefundArgs,
  AlipayTradeCloseArgs,
  AlipayQueryOrderArgs,
  AlipayCancelOrderArgs,
  AlipayCreateOrderArgs,
  AlipayTradePrecreateArgs,
  AlipayResponseMessage,
  AlipayNormalResponseCode,
  AlipayTradeRefundQueryArgs,
  ApiResponse,
  AlipayNotifyArgs,
  VerifyPamentArgs
} from './config'
import * as utils from './utils'
import { isString } from 'util'
import Validator from './validator'

export default class Alipay {
  gateWay: GateWay
  options: AlipayOption
  
  constructor(options: AlipayOption) {
    this.options = this.normalizeOptions(options)
  }

  normalizeOptions(options: AlipayOption) {
    let { appPrivKeyFile: privKey, alipayPubKeyFile: publicKey } = options

    if (publicKey.indexOf('BEGIN PUBLIC KEY') === -1) {
      publicKey = "-----BEGIN PUBLIC KEY-----\n" + publicKey
        + "\n-----END PUBLIC KEY-----"
    }
    if (privKey.indexOf('BEGIN RSA PRIVATE KEY') === -1 
      && privKey.indexOf('BEGIN PRIVATE KEY') === -1) {
      privKey = AlipayPrivKey.BEGIN + privKey + AlipayPrivKey.END
    }

    options.appPrivKeyFile = privKey
    options.alipayPubKeyFile = publicKey

    this.gateWay = isProd() ? GateWay.ALIPAY_GETWAY : GateWay.ALIPAY_DEV_GETWAY

    return options
  }

  get appId(): string {
    return this.options.appId
  }

  get privKey(): string {
    return this.options.appPrivKeyFile
  }

  get publicKey() {
    return this.options.alipayPubKeyFile
  }

  get notifyUrl() {
    return this.options.notifyUrl
  }

  validateBasicParams (method, basicParams): Promise<AlipayPublicArgs>  {
    const params  = Object.assign({}, this.options, basicParams, { method })
    return Validator.validateBasicParams(params)
  }

  validateAPIParams (method, options) {
    return Validator.validateAPIParams(method, options)
  }

  validateParams(method, publicParams, basicParams): Promise<AlipayPublicArgs> {
    return Promise.all([
      this.validateBasicParams(method, basicParams),
      this.validateAPIParams(method, publicParams)
    ])
    .then(result => {
      return Object.assign({}, result[0], { biz_content: JSON.stringify(result[1]) })
    })
    .then(params => {
      params.sign = utils.makeSign(this.privKey, params)
      return params
    })
  }

  makeResponse(response): ApiResponse {
    return {
      code: response.code,
      message: AlipayResponseMessage[response.code],
      data: response[utils.responseType(response)]
    }
  }

  makeRequest(params, options = {}): Promise<ApiResponse> {
    const httpclient = new urllib.HttpClient2()
    return httpclient.request(this.gateWay, Object.assign({
      data: params,
      dataType: 'json',
      dataAsQueryString: true
    }, options))
    .then(resp => this.makeResponse(resp.data))
  }

  verifyPayment(params: VerifyPamentArgs): Promise<ApiResponse> {
    return this.validateAPIParams(MethodType.VERIFY_PAYMENT, params)
      .then(() => this.makeResponse(isString(params.result) ? JSON.parse(params.result) : params.result))
  }

  makeNotifyResponse(params: AlipayNotifyArgs): Promise<ApiResponse> {
    return this.validateAPIParams(MethodType.NOTIFY_RESPONSE, params)
      .then(() => {
        const resp = { sign: params.sign, 'async_notify_response': params, sign_type: params.sign_type }
        return utils.verifySign(this.publicKey, resp, ['sign', 'sign_type'], params)
      })
      .then(valid => {
        const code = valid ? AlipayNormalResponseCode.OK : AlipayNormalResponseCode.SIGNATURE_ERROR
        return { code, message: AlipayResponseMessage[code], data: params }
      })
  }

  createWebOrderURL(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    return this.createWebOrder(publicParams, basicParams)
    .then(result => {
      if (result.code === 0) {
        result.data = this.gateWay + '?' + result.data
      }
      return result
    })
  }

  createPageOrderURL(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    return this.createPageOrder(publicParams, basicParams)
      .then(result => {
        if (result.code === 0) {
          result.data = this.gateWay + '?' + result.data
        }
        return result
      })
  }

  createPageOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    let sign
    return this.validateParams(MethodType.CREATE_PAGE_ORDER, publicParams, basicParams)
    .then(params => {
      sign = params.sign
      return utils.makeSignStr(params)
    })
    .then(signStr => {
      return signStr.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        return acc + key + '=' + encodeURIComponent(value) + '&'
      }, "").slice(0, -1)
    })
    .then(data => {
      data = data + '&sign=' + encodeURIComponent(sign)
      return { code: 0, message: AlipayResponseMessage[0], data }
    })
  }

  createWebOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    let sign
    return this.validateParams(MethodType.CREATE_WEB_ORDER, publicParams, basicParams)
    .then(params => {
      sign = params.sign
      return utils.makeSignStr(params)
    })
    .then(signStr => {
      return signStr.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        return acc + key + '=' + encodeURIComponent(value) + '&'
      }, "").slice(0, -1)
    })
    .then(data => {
      data = data + '&sign=' + encodeURIComponent(sign)
      return { code: 0, message: AlipayResponseMessage[0], data }
    })
  }

  //Compat
  createOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs) {
    return this.createAppOrder(publicParams, basicParams)
  }

  createAppOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs) {
    let sign
    return this.validateParams(MethodType.CREATE_APP_ORDER, publicParams, basicParams)
      .then(params => {
        sign = params.sign
        return utils.makeSignStr(params)
      })
      .then(signStr => {
        return signStr.split('&').reduce((acc, cur) => {
          const [key, value] = cur.split('=')
          return acc + key + '=' + encodeURIComponent(value) + '&'
        }, "").slice(0, -1)
      })
      .then(data => {
        data = data + '&sign=' + encodeURIComponent(sign)
        return { code: AlipayNormalResponseCode.OK, message: AlipayResponseMessage[AlipayNormalResponseCode.OK], data }
      })
  }

  queryOrder(publicParams: AlipayQueryOrderArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        if (!publicParams.out_trade_no && !publicParams.trade_no) {
          throw new Error("outTradeNo and tradeNo can not both omit.")
        }
        return this.validateParams(MethodType.QUERY_ORDER, publicParams, basicParams)
        .then(params => {
          return this.makeRequest(params)
        })
      })
  }

  cancelOrder(publicParams: AlipayCancelOrderArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        if (!publicParams.out_trade_no && !publicParams.trade_no) {
          throw new Error("outTradeNo and tradeNo can not both omit.")
        }
        return this.validateParams(MethodType.CANCEL_ORDER, publicParams, basicParams)
          .then(params => {
            return this.makeRequest(params)
          })
      })
  }

  tradeClose(publicParams: AlipayTradeCloseArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        if (!publicParams.out_trade_no && !publicParams.trade_no) {
          throw new Error("outTradeNo and tradeNo can not both omit.")
        }
        return this.validateParams(MethodType.TRADE_CLOSE, publicParams, basicParams)
          .then(params => {
            return this.makeRequest(params)
          })
      })
  }

  tradeRefund(publicParams: AlipayTradeRefundArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        if (!publicParams.out_trade_no && !publicParams.trade_no) {
          throw new Error("outTradeNo and tradeNo can not both omit.")
        }
        return this.validateParams(MethodType.TRADE_REFUND, publicParams, basicParams)
          .then(params => {
            return this.makeRequest(params)
          })
      })
  }

  tradeRefundQuery(publicParams: AlipayTradeRefundQueryArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        if (!publicParams.out_trade_no && !publicParams.trade_no) {
          throw new Error("outTradeNo and tradeNo can not both omit.")
        }
        return this.validateParams(MethodType.TRADE_REFUND_QUERY, publicParams, basicParams)
          .then(params => {
            return this.makeRequest(params)
          })
      })
  }

  billDownloadQuery(publicParams: AlipayBillQueryArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        return this.validateParams(MethodType.BILL_DOWNLOAD_QUERY, publicParams, basicParams)
          .then(params => {
            return this.makeRequest(params)
          })
      })
  }

  tradePrecreate(publicParams: AlipayTradePrecreateArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
      .then(() => {
        return this.validateParams(MethodType.TRADE_PRECREATE, publicParams, basicParams)
          .then(params => {
            return this.makeRequest(params)
          })
      })
  }

  tradeSettle(publicParams: AlipayTradeSettleArgs, basicParams?: AlipayPublicArgs) {
    return Promise.resolve()
    .then(() => {
      return this.validateParams(MethodType.TRADE_SETTLE, publicParams, basicParams)
      .then(params => {
        return this.makeRequest(params)
      })
    })
  }

  toaccountTransfer(publicParams: AlipayToaccountTransferArgs, basicParams?: AlipayPublicArgs) {
    return this.validateParams(MethodType.FUND_TRANS_TOACCOUNT_TRANSFER, publicParams, basicParams)
      .then(params => {
        return this.makeRequest(params)
      })
  }
}
