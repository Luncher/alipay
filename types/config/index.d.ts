export { isTest, isProd } from './env';
declare type ApiResponseMessage = string;
declare type ApiResponseData = string | number | object;
declare type ApiResponseCode = AlipayNormalResponseCode | AlipayPaymentResponseCode;
export interface ApiResponse {
    code: ApiResponseCode;
    message: ApiResponseMessage;
    data: ApiResponseData;
}
export interface AlipayOption {
    appPrivKeyFile: string;
    alipayPubKeyFile: string;
    appId: string;
    notifyUrl?: string;
}
export declare enum AlipayNormalResponseCode {
    OK = 0,
    EXCEPTION = -1,
    SIGNATURE_ERROR = -2,
    SUCCESS = 10000,
    UNAVALIABLE = 20000,
    INSUFFICIENT_AUTHORIZATION = 20001,
    MISSING_REQUIRED_ARGS = 40001,
    INVALID_ARGS = 40002,
    PROCESSING_FAILURE = 40004,
    PERMISSION_DENIED = 40006
}
export declare const alipayResponseMessage: {
    0: string;
    '-1': string;
    '-2': string;
    10000: string;
    20000: string;
    20001: string;
    40001: string;
    40002: string;
    40004: string;
    40006: string;
    9000: string;
    8000: string;
    4000: string;
    5000: string;
    6001: string;
    6002: string;
    6004: string;
};
export declare type AlipayAPIArgs = VerifyPamentArgs | AlipayNotifyArgs | AlipayPublicArgs | AlipayCreateOrderArgs | AlipayQueryOrderArgs | AlipayCancelOrderArgs | AlipayTradeCloseArgs | AlipayTradeRefundArgs | AlipayTradeRefundQueryArgs | AlipayBillQueryArgs | AlipayTradePrecreateArgs | AlipayTradeSettleArgs | AlipayToaccountTransferArgs;
export declare type VerifyPamentResult = string | PaymentResult;
export interface VerifyPamentArgs {
    memo: string;
    result: VerifyPamentResult;
    resultStatus: AlipayPaymentResponseCode;
}
export interface PaymentResult {
    alipay_trade_app_pay_response: AlipayTradeAppPayResponse;
    sign: string;
    sign_type: AlipaySignType;
}
export declare type AlipayTradeAppPayResponse = AlipayTradeAppPayResponseImpl & AlipayResponseTypeMap;
export interface AlipayTradeAppPayResponseImpl {
    code: AlipayNormalResponseCode;
    msg: string;
    app_id: string;
    out_trade_no: string;
    trade_no: string;
    total_amount: number;
    seller_id: string;
    charset: string;
    timestamp: string;
}
export declare enum AlipayPaymentResponseCode {
    SUCCESS = "9000",
    PROCESSING = "8000",
    FAILURE = "4000",
    REPEAT_REQ = "5000",
    USER_CANCEL = "6001",
    NETWORK_ERROR = "6002",
    UNKNOW = "6004"
}
export interface AlipayNotifyArgs {
    notify_time: string;
    notify_type: string;
    notify_id: string;
    app_id: string;
    charset: string;
    version: string;
    sign_type: AlipaySignType;
    trade_no: string;
    out_trade_no: string;
    sign: string;
    [key: string]: string | number;
}
export interface AlipayVerifySignArgs {
    sign: string;
    msg?: string;
    sign_type: string;
    async_notify_response: object;
}
export interface AlipayPublicArgs {
    app_id: string;
    method: MethodType;
    format?: string;
    return_url?: string;
    charset: string;
    sign_type: AlipaySignType;
    sign: string;
    timestamp: string;
    version: string;
    notify_url: string;
    biz_content: string;
}
export declare type AlipayResponse = AlipayPublicResponse | AlipayTradeAppPayResponse;
export declare type AlipayResponseType = 'alipay_trade_query_response' | 'alipay_trade_refund_response' | 'alipay_trade_cancel_response' | 'alipay_trade_precreate_response' | 'alipay_trade_close_response' | 'alipay_trade_create_response' | 'alipay_trade_order_settle_response' | 'alipay_trade_fastpay_refund_query_response' | 'alipay_trade_app_pay_response' | 'alipay_fund_trans_toaccount_transfer_response' | 'alipay_data_dataservice_bill_downloadurl_query_response' | 'async_notify_response';
export declare type AlipayResponseTypeMap = {
    [key in AlipayResponseType]: string;
};
export declare type AlipayPublicResponse = AlipayPublicResponseImpl & AlipayResponseTypeMap;
export interface AlipayPublicResponseImpl {
    code: ApiResponseCode;
    msg: string;
    sub_code?: string;
    sub_msg?: string;
    sign: string;
}
declare type OrderTotalAmount = string | number;
export interface AlipayCreateOrderArgs {
    body?: string;
    subject: string;
    out_trade_no: string;
    total_amount: OrderTotalAmount;
    timeout_express?: string;
    time_expire?: string;
    auth_token?: string;
    product_code?: string;
    goods_type?: GoodsType;
    passback_params?: string;
    promo_params?: string;
    extend_params?: string;
    enable_pay_channels?: string;
    disable_pay_channels?: string;
    quit_url?: string;
    store_id?: string;
    ext_user_info?: string;
}
export interface AlipayQueryOrderArgs {
    out_trade_no?: string;
    trade_no?: string;
    org_pid?: string;
}
export interface AlipayCancelOrderArgs {
    out_trade_no?: string;
    trade_no?: string;
}
export interface AlipayTradeCloseArgs {
    out_trade_no?: string;
    trade_no?: string;
    operator_id?: string;
}
export interface AlipayTradeRefundArgs {
    out_trade_no?: string;
    trade_no?: string;
    refund_amount?: number;
    refund_currency?: string;
    refund_reason?: string;
    out_request_no?: string;
    operator_id?: string;
    store_id?: string;
    terminal_id?: string;
    goods_detail?: Map<string, string | number>[];
    refund_royalty_parameters?: Map<string, string | number>[];
    org_pid?: string;
}
export interface AlipayTradeRefundQueryArgs {
    out_trade_no?: string;
    trade_no?: string;
    out_request_no: string;
    org_pid?: string;
}
export interface AlipayBillQueryArgs {
    bill_type: string;
    bill_date: string;
}
export interface AlipayTradePrecreateArgs {
    out_trade_no: string;
    seller_id?: string;
    total_amount: number;
    discountable_amount?: number;
    subject: string;
    goods_detail?: Map<string, string | number>[];
    body?: string;
    operator_id?: string;
    store_id?: string;
    disable_pay_channels?: string;
    enable_pay_channels?: string;
    terminal_id?: string;
    extend_params?: string;
    timeout_express?: string;
    settle_info?: any;
    merchant_order_no?: string;
    business_params?: string;
    qr_code_timeout_express?: string;
}
export interface AlipayTradeSettleArgs {
    out_request_no: string;
    trade_no: string;
    royalty_parameters: any;
    operator_id?: string;
}
export interface AlipayToaccountTransferArgs {
    out_biz_no: string;
    payee_type: string;
    payee_account: string;
    amount: number;
    payer_show_name?: string;
    payee_real_name?: string;
    remark?: string;
}
export declare enum AlipayPayType {
    ALIPAY_USERID = "ALIPAY_USERID",
    ALIPAY_LOGONID = "ALIPAY_LOGONID"
}
export declare enum GoodsType {
    VIRTUAL = 0,
    PARTICALITY = 1
}
export declare enum PayChannel {
    balance = "balance",
    moneyFund = "moneyFund",
    coupon = "coupon",
    pcredit = "pcredit",
    pcreditpayInstallment = "pcreditpayInstallment",
    creditCard = "creditCard",
    creditCardExpress = "creditCardExpress",
    creditCardCartoon = "creditCardCartoon",
    credit_group = "credit_group",
    debitCardExpress = "debitCardExpress",
    mcard = "mcard",
    pcard = "pcard",
    promotion = "promotion",
    voucher = "voucher",
    point = "point",
    mdiscount = "mdiscount",
    bankPay = "bankPay"
}
export declare enum MethodType {
    QUERY_ORDER = "alipay.trade.query",
    CREATE_APP_ORDER = "alipay.trade.app.pay",
    CREATE_WEB_ORDER = "alipay.trade.wap.pay",
    CREATE_PAGE_ORDER = "alipay.trade.page.pay",
    CANCEL_ORDER = "alipay.trade.cancel",
    TRADE_CLOSE = "alipay.trade.close",
    TRADE_SETTLE = "alipay.trade.order.settle",
    TRADE_REFUND = "alipay.trade.refund",
    TRADE_PRECREATE = "alipay.trade.precreate",
    TRADE_REFUND_QUERY = "alipay.trade.fastpay.refund.query",
    BILL_DOWNLOAD_QUERY = "alipay.data.dataservice.bill.downloadurl.query",
    FUND_TRANS_TOACCOUNT_TRANSFER = "alipay.fund.trans.toaccount.transfer",
    VERIFY_PAYMENT = "verify.payment.status",
    NOTIFY_RESPONSE = "notify.response"
}
export declare enum GateWay {
    ALIPAY_GETWAY = "https://openapi.alipay.com/gateway.do",
    ALIPAY_DEV_GETWAY = "https://openapi.alipaydev.com/gateway.do"
}
export declare enum AlipayAPIList {
    'alipay.trade.query' = "\u8BA2\u5355\u67E5\u8BE2",
    'alipay.trade.refund' = "\u4EA4\u6613\u9000\u6B3E",
    'alipay.trade.cancel' = "\u53D6\u6D88\u8BA2\u5355",
    'alipay.trade.precreate' = "\u9884\u521B\u5EFA\u8BA2\u5355",
    'alipay.trade.close' = "\u5173\u95ED\u4EA4\u6613",
    'alipay.trade.create' = "\u521B\u5EFA\u4EA4\u6613",
    'alipay.trade.order.settle' = "\u4EA4\u6613\u7ED3\u7B97",
    'alipay.trade.fastpay.refund.query' = "\u4EA4\u6613\u9000\u6B3E\u67E5\u8BE2",
    'alipay.trade.app.pay' = "\u751F\u6210\u521B\u5EFA\u8BA2\u5355\u6240\u9700\u53C2\u6570",
    'alipay.fund.trans.toaccount.transfer' = "\u5355\u7B14\u8F6C\u8D26\u5230\u652F\u4ED8\u5B9D\u8D26\u6237\u63A5\u53E3",
    'alipay.data.dataservice.bill.downloadurl.query' = "\u67E5\u8BE2\u8D26\u5355\u4E0B\u8F7D\u5730\u5740\u63A5\u53E3",
    'async.notify' = "\u5F02\u6B65\u901A\u77E5"
}
export declare type GetResponseTypeArgs = AlipayResponse | AlipayVerifySignArgs;
export declare enum AlipayNotifyResult {
    SUCCESS = "success",
    FAILURE = "failure"
}
export declare enum AlipayAlgorithm {
    RSA = "RSA-SHA1",
    RSA2 = "RSA-SHA256"
}
export declare enum AlipaySignType {
    RSA2 = "RSA2",
    RSA = "RSA"
}
export declare enum AlipayPrivKey {
    BEGIN = "-----BEGIN RSA PRIVATE KEY-----\n",
    END = "\n-----END RSA PRIVATE KEY-----"
}
