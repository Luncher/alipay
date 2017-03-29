'use strict'

const ALIPAY_PAYMENT_MESSAGE = {
  9000: '订单支付成功',
  8000: '正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态',
  4000: '订单支付失败',
  5000: '重复请求',
  6001: '用户中途取消',
  6002: '网络连接出错',
  6004: '支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态'
}

export default {
  memo: {
    type: 'string',
    required: true,
  },
  result: {
    type: 'object',
    required: true
  },
  resultStatus: {
    type: 'enum',
    enums: Object.keys(ALIPAY_PAYMENT_MESSAGE)
  }
}