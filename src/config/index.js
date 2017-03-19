export { RESPONSE_MESSAGE } from './api'
export { METHOD_TYPES } from './method-types'

export default {
  ALIPAY_DEV_GETWAY: 'https://openapi.devalipay.com/gateway.do',
  ALIPAY_GETWAY: 'https://openapi.alipay.com/gateway.do',
  ALIPAY_PAYMENT_MESSAGE: {
    9000: '订单支付成功',
    8000: '正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态',
    4000: '订单支付失败',
    5000: '重复请求',
    6001: '用户中途取消',
    6002: '网络连接出错',
    6004: '支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态'
  },
  ALIPAY_API_LIST: {
    'alipay.trade.query': '订单查询',
    'alipay.trade.app.pay': '生成创建订单所需参数',
    'async.notify': '异步通知' // 自定义
  },
  ALIPAY_GETWAY_MESSAGE: {
    10000: '接口调用成功',
    20000: '服务不可用',
    20001: '授权权限不足',
    40001: '缺少必选参数',
    40002: '非法的参数',
    40004: '业务处理失败',
    40006: '权限不足'
  },
  ALIPAY_NOTIFY_SUCCESS: 'success',
  ALIPAY_NOTIFY_FAILURE: 'failure',
  ALIPAY_ALGORITHM_MAPPING: {
    RSA: "RSA-SHA1",
    RSA2: "RSA-SHA256"
  }
}