import moment from 'moment'

export function createTimeStamp () {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

export function normalizeTotalAmount (value) {
  return Number(value).toFixed(2)
}

export function normalizePassbackParams (params) {
  return params && encodeURI(params)
}

export const extendParams = {
  type: 'enum',
  enums: [
    'sys_service_provider_id',
    'needBuyerRealnamed',
    'TRANS_MEMO'
  ]
}

export const payChannel = {
  type: 'enum',
  enums: [
    'balance',
    'moneyFund',
    'coupon',
    'pcredit',
    'pcreditpayInstallment',
    'creditCard',
    'creditCardExpress',
    'creditCardCartoon',
    'credit_group',
    'debitCardExpress',
    'mcard',
    'pcard',
    'promotion',
    'voucher',
    'point',
    'mdiscount',
    'bankPay'
  ]
}

export const ALIPAY_PAYMENT_MESSAGE = {
  9000: '订单支付成功',
  8000: '正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态',
  4000: '订单支付失败',
  5000: '重复请求',
  6001: '用户中途取消',
  6002: '网络连接出错',
  6004: '支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态'
}