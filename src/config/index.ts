export { isTest, isProd } from './env'

type ApiResponseMessage = string
type ApiResponseData = string | number | object
type ApiResponseCode = AlipayNormalResponseCode | AlipayPaymentResponseCode
export interface ApiResponse {
  code:     ApiResponseCode,
  message:  ApiResponseMessage,
  data:     ApiResponseData
}

export interface AlipayOption {
  appPrivKeyFile:   string      //应用私钥
  alipayPubKeyFile: string      //支付宝公钥
  appId:            string      //应用ID
  notifyUrl?:       string      //支付宝异步通知URL
}

export enum AlipayNormalResponseCode {
  OK                           = 0,
  EXCEPTION                     = -1,
  SIGNATURE_ERROR               = -2,
  SUCCESS                       = 10000,
  UNAVALIABLE                   = 20000,
  INSUFFICIENT_AUTHORIZATION    = 20001,
  MISSING_REQUIRED_ARGS         = 40001,
  INVALID_ARGS                  = 40002,
  PROCESSING_FAILURE            = 40004,
  PERMISSION_DENIED             = 40006
}

export const AlipayResponseMessage = {
  '0':   '请求成功',
  '-1':  '异常',
  '-2':  '签名错误',
  10000: '接口调用成功',
  20000: '服务不可用',
  20001: '授权权限不足',
  40001: '缺少必选参数',
  40002: '非法的参数',
  40004: '业务处理失败',
  40006: '权限不足',

  //支付结果信息
  9000: '订单支付成功',
  8000: '正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态',
  4000: '订单支付失败',
  5000: '重复请求',
  6001: '用户中途取消',
  6002: '网络连接出错',
  6004: '支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态'
}

//App支付同步通知参数
type VerifyPamentResult = string | PaymentResult
export interface VerifyPamentArgs {
  memo:   string,                         //描述信息
  result: VerifyPamentResult,             //处理结果(类型为json结构字符串)
  resultStatus: AlipayPaymentResponseCode //结果码(类型为字符串)
}

export interface PaymentResult {
  alipay_trade_app_pay_response: AlipayTradeAppPayResponse,
  sign: string,
  sign_type: AlipaySignType
}

export interface AlipayTradeAppPayResponse {
  code: AlipayNormalResponseCode,
  msg: string,
  app_id: string,
  out_trade_no: string,
  trade_no: string,
  total_amount: number,
  seller_id: string,
  charset: string,
  timestamp: string
}

//App支付同步通知状态码
export enum AlipayPaymentResponseCode {
  SUCCESS         = '9000',
  PROCESSING      = '8000',
  FAILURE         = '4000',
  REPEAT_REQ      = '5000',
  USER_CANCEL     = '6001',
  NETWORK_ERROR   = '6002',
  UNKNOW          = '6004'
}

//支付宝异步通知参数
export interface AlipayNotifyArgs {
  notify_time:  string, //通知的发送时间。格式为yyyy-MM-dd HH:mm:ss
  notify_type:  string, //通知的类型
  notify_id:    string, //通知校验ID	
  app_id:       string, //支付宝分配给开发者的应用Id
  charset:      string, //编码格式，如utf-8、gbk、gb2312等
  version:      string, //调用的接口版本，固定为：1.0
  sign_type:    AlipaySignType, //签名类型
  trade_no:     string, //支付宝交易凭证号
  out_trade_no: string, //原支付请求的商户订单号
  [key: string]: string | number//可选参数
}

//支付宝接口公共请求参数
export interface AlipayPublicArgs {
  app_id: string,     //支付宝分配给开发者的应用ID
  method: MethodType, //接口名称
  format?: string,    //仅支持JSON
  return_url?: string,//HTTP/HTTPS开头字符串
  charset: string,    //请求使用的编码格式，如utf-8,gbk,gb2312等
  sign_type: AlipaySignType,  //商户生成签名字符串所使用的签名算法类型
  sign: string,       //商户请求参数的签名串
  timestamp: string,   //发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"
  version: string,    //调用的接口版本，固定为：1.0
  notify_url: string, //支付宝服务器主动通知商户服务器里指定的页面http/https路径。
  biz_content: string //业务请求参数的集合，最大长度不限
}

//创建订单参数
export interface AlipayCreateOrderArgs {
  body?:        string,//对一笔交易的具体描述信息
  subject:      string,//商品的标题/交易标题/订单标题/订单关键字等
  out_trade_no: string,//商户网站唯一订单号
  timeout_express?: string,//该笔订单允许的最晚付款时间，逾期将关闭交易
  time_expire?: string,//绝对超时时间，格式为yyyy-MM-dd HH:mm
  total_amount: number,//订单总金额，单位为元
  auth_token: string,//针对用户授权接口，获取用户相关数据时，用于标识用户授权关系
  product_code: string,//销售产品码
  goods_type?: GoodsType,//商品主类型
  passback_params?: string,//公用回传参数，如果请求时传递了该参数，则返回给商户时会回传该参数
  promo_params?: string,//优惠参数注：仅与支付宝协商后可用
  extend_params?: string,//业务扩展参数
  enable_pay_channels?: string,//可用渠道
  disable_pay_channels?: string,//禁用渠道
  store_id: string,//商户门店编号
  quit_url: string,//添加该参数后在h5支付收银台会出现返回按钮，可用于用户付款中途退出并返回到该参数指定的商户网站地址
  ext_user_info: string//外部指定买家
}

//查询订单参数
export interface AlipayQueryOrderArgs {
  out_trade_no?: string,//订单支付时传入的商户订单号,和支付宝交易号不能同时为空
  trade_no?: string,    //支付宝交易号，和商户订单号不能同时为空
  org_pid?: string,     //银行间联模式下有用，其它场景请不要使用
}

//取消订单
export interface AlipayCancelOrderArgs {
  out_trade_no?: string,//订单支付时传入的商户订单号,和支付宝交易号不能同时为空
  trade_no?: string     //支付宝交易号，和商户订单号不能同时为空
}

//统一收单交易关闭接口
export interface AlipayTradeCloseArgs {
  out_trade_no?: string,//订单支付时传入的商户订单号,和支付宝交易号不能同时为空
  trade_no?: string,    //支付宝交易号，和商户订单号不能同时为空
  operator_id?: string  //卖家端自定义的的操作员 ID
}

//统一收单交易退款接口
export interface AlipayTradeRefundArgs {
  out_trade_no?: string,//订单支付时传入的商户订单号,和支付宝交易号不能同时为空
  trade_no?: string,    //支付宝交易号，和商户订单号不能同时为空
  refund_amount?: number,//需要退款的金额
  refund_currency?: string,//订单退款币种信息
  refund_reason?: string,//退款的原因说明
  out_request_no?: string,//标识一次退款请求
  operator_id?: string,//商户的操作员编号
  store_id?: string,//商户的门店编号
  terminal_id?: string,//商户的终端编号
  goods_detail?: any,//退款包含的商品列表信息
  refund_royalty_parameters?: any,//退分账明细信息
  org_pid?: string//银行间联模式下有用，其它场景请不要使用
}

//统一收单交易退款查询
export interface AlipayTradeRefundQueryArgs {
  out_trade_no?: string,//订单支付时传入的商户订单号,和支付宝交易号不能同时为空
  trade_no?: string,    //支付宝交易号，和商户订单号不能同时为空
  out_request_no: string,//请求退款接口时，传入的退款请求号
  org_pid?: string       //银行间联模式下有用，其它场景请不要使用
}

//查询对账单下载地址
export interface AlipayBillQueryArgs {
  bill_type: string,  //账单类型
  bill_date: string   //账单时间
}

//交易预创建接口
export interface AlipayTradePrecreateArgs {
  out_trade_no: string, //商户订单号
  seller_id?: string,   //卖家支付宝用户ID
  total_amount: number, //订单总金额
  discountable_amount?: number, //可打折金额
  subject: string,    //订单标题
  goods_detail?: any,  //订单包含的商品列表信息
  body?: string,       //对交易或商品的描述
  operator_id?: string,//商户操作员编号
  store_id?: string,   //商户门店编号
  disable_pay_channels?: string,//禁用渠道
  enable_pay_channels?: string, //可用渠道，用户只能在指定渠道范围内支付
  terminal_id?: string,   //商户机具终端编号
  extend_params?: string, //业务扩展参数
  timeout_express?: string, //该笔订单允许的最晚付款时间
  settle_info?: any,        //描述结算信息
  merchant_order_no?: string,//商户原始订单号
  business_params?: string,   //商户传入业务信息
  qr_code_timeout_express?: string //该笔订单允许的最晚付款时间
}

//统一收单交易结算接口
export interface AlipayTradeSettleArgs {
  out_request_no: string,   //结算请求流水号
  trade_no: string,         //支付宝订单号
  royalty_parameters: any,  //分账明细信息
  operator_id?: string      //操作员id
}

//单笔转账到支付宝账户接口
export interface AlipayToaccountTransferArgs {
  out_biz_no: string, //商户转账唯一订单号
  payee_type: string, //收款方账户类型
  payee_account: string, //收款方账户
  amount: number, //转账金额
  payer_show_name?: string,//付款方姓名
  payee_real_name?: string,//收款方真实姓名
  remark?: string//转账备注
}

export enum AlipayPayType {
  ALIPAY_USERID   = 'ALIPAY_USERID',
  ALIPAY_LOGONID  = 'ALIPAY_LOGONID',
}

export enum GoodsType {
  VIRTUAL     = 0,
  PARTICALITY = 1
}

export enum MethodType {
  QUERY_ORDER       = 'alipay.trade.query',
  CREATE_APP_ORDER  = 'alipay.trade.app.pay',
  CREATE_WEB_ORDER  = 'alipay.trade.wap.pay',
  CREATE_PAGE_ORDER = 'alipay.trade.page.pay',
  CANCEL_ORDER      = 'alipay.trade.cancel',
  TRADE_CLOSE       = 'alipay.trade.close',
  TRADE_SETTLE      = 'alipay.trade.order.settle',
  TRADE_REFUND      = 'alipay.trade.refund',
  TRADE_PRECREATE   = 'alipay.trade.precreate',
  TRADE_REFUND_QUERY  = 'alipay.trade.fastpay.refund.query',
  BILL_DOWNLOAD_QUERY = 'alipay.data.dataservice.bill.downloadurl.query',
  FUND_TRANS_TOACCOUNT_TRANSFER = 'alipay.fund.trans.toaccount.transfer',

  //self define
  VERIFY_PAYMENT  = 'verify.payment.status',
  NOTIFY_RESPONSE = 'notify.response'
}

export enum GateWay {
  ALIPAY_GETWAY = 'https://openapi.alipay.com/gateway.do',
  ALIPAY_DEV_GETWAY = 'https://openapi.alipaydev.com/gateway.do',
}

export enum AlipayAPIList {
  'alipay.trade.query' = '订单查询',
  'alipay.trade.refund' = '交易退款',
  'alipay.trade.cancel' = '取消订单',
  'alipay.trade.precreate' = '预创建订单',
  'alipay.trade.close' = '关闭交易',
  'alipay.trade.create' = '创建交易',
  'alipay.trade.order.settle' = '交易结算',
  'alipay.trade.fastpay.refund.query' = '交易退款查询',
  'alipay.trade.app.pay' = '生成创建订单所需参数',
  'alipay.fund.trans.toaccount.transfer' = '单笔转账到支付宝账户接口',
  'alipay.data.dataservice.bill.downloadurl.query' = '查询账单下载地址接口',
  'async.notify' = '异步通知' // 自定义
}

export enum AlipayNotifyResult {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export enum AlipayAlgorithm {
  RSA   = "RSA-SHA1",
  RSA2  = "RSA-SHA256"
}

export enum AlipaySignType {
  RSA2 = 'RSA2',
  RSA  = 'RSA'
}

export enum AlipayPrivKey {
  BEGIN = '-----BEGIN RSA PRIVATE KEY-----\n',
  END   = '\n-----END RSA PRIVATE KEY-----'
}