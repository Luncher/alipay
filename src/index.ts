import * as urllib from 'urllib'
import {
  isProd,
  AlipayOption,
  MethodType,
  GateWay,
  GateWayDefault,
  AlipayResponse,
  AlipayPrivKey,
  AlipayTradeSettleArgs,
  AlipayBillQueryArgs,
  PaymentResult,
  AlipayPublicArgs,
  AlipayPublicResponse,
  AlipayToaccountTransferArgs,
  AlipayTradeRefundArgs,
  AlipayTradeCloseArgs,
  AlipayQueryOrderArgs,
  AlipayCancelOrderArgs,
  AlipayCreateOrderArgs,
  AlipayTradePrecreateArgs,
  alipayResponseMessage,
  AlipayNormalResponseCode,
  AlipayTradeRefundQueryArgs,
  ApiResponse,
  AlipayNotifyArgs,
  VerifyPamentArgs,
  AlipayVerifySignArgs,
  AlipayAPIArgs
} from './config'
import * as utils from './utils'
import { isString } from 'util'
import * as Validator from './validator'

export = class Alipay {
  public gateWay: GateWay
  public options: AlipayOption

  constructor(options: AlipayOption) {
    this.options = this.normalizeOptions(options)
  }

  private normalizeOptions(options: AlipayOption): AlipayOption {
    let { appPrivKeyFile: privKey, alipayPubKeyFile: publicKey } = options

    if (publicKey.indexOf('BEGIN PUBLIC KEY') === -1) {
      publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`
    }
    if (privKey.indexOf('BEGIN RSA PRIVATE KEY') === -1
      && privKey.indexOf('BEGIN PRIVATE KEY') === -1) {
      privKey = AlipayPrivKey.BEGIN + privKey + AlipayPrivKey.END
    }

    options.appPrivKeyFile = privKey
    options.alipayPubKeyFile = publicKey

    this.gateWay = options.gatewayUrl
    if (!this.gateWay) {
      this.gateWay = isProd() ? GateWayDefault.ALIPAY_GETWAY : GateWayDefault.ALIPAY_DEV_GETWAY
    }

    return options
  }

  get appId(): string {
    return this.options.appId
  }

  get privKey(): string {
    return this.options.appPrivKeyFile
  }

  get publicKey(): string {
    return this.options.alipayPubKeyFile
  }

  get notifyUrl(): string {
    return this.options.notifyUrl
  }

  private validateBasicParams(method: MethodType, publicParams: AlipayPublicArgs): AlipayPublicArgs {
    let newOptions = { ...this.options }
    // remove keys from basic parameters
    delete newOptions.appPrivKeyFile
    delete newOptions.alipayPubKeyFile
    const params: AlipayPublicArgs = { ...newOptions, ...publicParams, method }

    return Validator.validateBasicParams(params)
  }

  private validateAPIParams (method: MethodType, options: AlipayAPIArgs): AlipayAPIArgs {
    return Validator.validateAPIParams(method, options)
  }

  private validateParams(method: MethodType, apiParams: AlipayAPIArgs, publicParams: AlipayPublicArgs): AlipayPublicArgs {
    const validateBasicParams: AlipayPublicArgs = this.validateBasicParams(method, publicParams)
    const validateApiParams: AlipayAPIArgs = this.validateAPIParams(method, apiParams)

    validateBasicParams.biz_content = JSON.stringify(validateApiParams)
    validateBasicParams.sign = utils.makeSign(this.privKey, validateBasicParams)

    return validateBasicParams
  }

  private makeResponse(response: AlipayResponse): ApiResponse {
    return {
      code: response.code,
      message: alipayResponseMessage[response.code],
      data: response[utils.getResponseType(response)]
    }
  }

  private makeRequest(params: AlipayPublicArgs, options: urllib.RequestOptions = {}): Promise<ApiResponse> {
    const httpclient: urllib.HttpClient2 = new urllib.HttpClient2()

    return httpclient.request(this.gateWay, { data: params, dataType: 'json', dataAsQueryString: true, ...options })
      .then((resp: urllib.HttpClientResponse<AlipayPublicResponse>) => this.makeResponse(resp.data))
  }

  public verifyPayment(params: VerifyPamentArgs): ApiResponse {
    this.validateAPIParams(MethodType.VERIFY_PAYMENT, params)
    const data = isString(params.result) ? (<PaymentResult>JSON.parse(params.result)) : params.result

    return this.makeResponse(data.alipay_trade_app_pay_response)
  }

  public makeNotifyResponse(params: AlipayNotifyArgs): ApiResponse {
    // this.validateAPIParams(MethodType.NOTIFY_RESPONSE, params)
    const resp: AlipayVerifySignArgs = { sign: params.sign, async_notify_response: params, sign_type: params.sign_type }
    const valid = utils.verifySign(this.publicKey, resp, ['sign', 'sign_type'], params)
    const code = valid ? AlipayNormalResponseCode.OK : AlipayNormalResponseCode.SIGNATURE_ERROR

    return { code, message: alipayResponseMessage[code], data: params }
  }

  public createWebOrderURL(apiParams: AlipayCreateOrderArgs, publicParams?: AlipayPublicArgs): ApiResponse {
    const result = this.createWebOrder(apiParams, publicParams)
    result.data = this.gateWay + '?' + String(result.data)
    return result
  }

  public createPageOrderURL(apiParams: AlipayCreateOrderArgs, publicParams?: AlipayPublicArgs): ApiResponse {
    const result = this.createPageOrder(apiParams, publicParams)
    result.data = this.gateWay + '?' + String(result.data)
    return result
  }

  public createPageOrder(apiParams: AlipayCreateOrderArgs, publicParams?: AlipayPublicArgs): ApiResponse {
    const params = this.validateParams(MethodType.CREATE_PAGE_ORDER, apiParams, publicParams)
    const sign = params.sign
    const signStr = utils.makeSignStr(params)
    const value = signStr.split('&')
      .reduce(
        (acc, cur) => {
          const [k, v] = cur.split('=')
          return acc + k + '=' + encodeURIComponent(v) + '&'
        },
        ''
        ).slice(0, -1)
    const data = value + '&sign=' + encodeURIComponent(sign)
    return { code: 0, message: alipayResponseMessage[0], data }
  }

  public createWebOrder(apiParams: AlipayCreateOrderArgs, publicParams?: AlipayPublicArgs): ApiResponse {
    const params = this.validateParams(MethodType.CREATE_WEB_ORDER, apiParams, publicParams)
    const sign = params.sign
    const signStr = utils.makeSignStr(params)
    const value = signStr.split('&').reduce(
      (acc, cur) => {
        const [k, v] = cur.split('=')
        return `${acc}${k}=${encodeURIComponent(v)}&`
      },
      ''
      ).slice(0, -1)
    const data = `${value}&sign=${encodeURIComponent(sign)}`
    return { code: 0, message: alipayResponseMessage[0], data }
  }

  // Compat
  public createOrder(apiParams: AlipayCreateOrderArgs, publicParams?: AlipayPublicArgs): ApiResponse {
    return this.createAppOrder(apiParams, publicParams)
  }

  public createAppOrder(apiParams: AlipayCreateOrderArgs, publicParams?: AlipayPublicArgs): ApiResponse {
    const params = this.validateParams(MethodType.CREATE_APP_ORDER, apiParams, publicParams)
    const sign = params.sign
    const signStr = utils.makeSignStr(params)
    const value = signStr.split('&').reduce(
      (acc, cur) => {
        const [k, v] = cur.split('=')
        return acc + k + '=' + encodeURIComponent(v) + '&'
      },
      ''
      ).slice(0, -1)

    const data = value + '&sign=' + encodeURIComponent(sign)
    return { code: AlipayNormalResponseCode.OK, message: alipayResponseMessage[AlipayNormalResponseCode.OK], data }
  }

  public queryOrder(apiParams: AlipayQueryOrderArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    return Promise.resolve()
      .then(() => {
        if (!apiParams.out_trade_no && !apiParams.trade_no) {
          throw new Error('outTradeNo and tradeNo can not both omit.')
        }
        const params = this.validateParams(MethodType.QUERY_ORDER, apiParams, publicParams)
        return this.makeRequest(params)
      })
  }

  public cancelOrder(apiParams: AlipayCancelOrderArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.CANCEL_ORDER, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public tradeClose(apiParams: AlipayTradeCloseArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.TRADE_CLOSE, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public tradeRefund(apiParams: AlipayTradeRefundArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.TRADE_REFUND, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public tradeRefundQuery(apiParams: AlipayTradeRefundQueryArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.TRADE_REFUND_QUERY, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public billDownloadQuery(apiParams: AlipayBillQueryArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.BILL_DOWNLOAD_QUERY, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public tradePrecreate(apiParams: AlipayTradePrecreateArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.TRADE_PRECREATE, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public tradeSettle(apiParams: AlipayTradeSettleArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.TRADE_SETTLE, apiParams, publicParams)
    return this.makeRequest(params)
  }

  public toaccountTransfer(apiParams: AlipayToaccountTransferArgs, publicParams?: AlipayPublicArgs): Promise<ApiResponse> {
    const params = this.validateParams(MethodType.FUND_TRANS_TOACCOUNT_TRANSFER, apiParams, publicParams)
    return this.makeRequest(params)
  }
}
