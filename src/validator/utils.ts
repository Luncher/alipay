import * as moment from 'moment'

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