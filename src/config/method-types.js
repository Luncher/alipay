export const QUERY_ORDER = 'alipay.trade.query'
export const CREATE_APP_ORDER = 'alipay.trade.app.pay'
export const CREATE_WEB_ORDER = 'alipay.trade.wap.pay'
export const CREATE_PAGE_ORDER = 'alipay.trade.page.pay'
export const TRADE_CLOSE = 'alipay.trade.close'
export const CANCEL_ORDER = 'alipay.trade.cancel'
export const TRADE_REFUND = 'alipay.trade.refund'
export const TRADE_SETTLE = 'alipay.trade.order.settle'
export const TRADE_PRECREATE = 'alipay.trade.precreate'
export const TRADE_REFUND_QUERY = 'alipay.trade.fastpay.refund.query'
export const BILL_DOWNLOAD_QUERY = 'alipay.data.dataservice.bill.downloadurl.query'

export const VERIFY_PAYMENT = 'verify.payment.status' //self define
export const NOTIFY_RESPONSE = 'notify.response' //self define

export const METHOD_TYPES = {
  QUERY_ORDER,
  CREATE_APP_ORDER,
  CREATE_WEB_ORDER,
  CREATE_PAGE_ORDER,
  CANCEL_ORDER,
  TRADE_CLOSE,
  TRADE_SETTLE,
  TRADE_REFUND,
  TRADE_PRECREATE,
  TRADE_REFUND_QUERY,
  BILL_DOWNLOAD_QUERY,

  VERIFY_PAYMENT,
  NOTIFY_RESPONSE
}