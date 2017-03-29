'use strict'

import * as utils from '../utils'

const extendParams = {
  type: 'enum',
  enums: [
    'sys_service_provider_id',
    'needBuyerRealnamed',
    'TRANS_MEMO'
  ]
}

const payChannel = {
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

export default {
  body: {
    type: 'string',
    maxLength: 128
  },
  subject: {
    type: 'string',
    required: true,
    maxLength: 256
  },
  out_trade_no: {
    type: 'string',
    required: true,
    maxLength: 64
  },
  timeout_express: {
    type: 'string',
    maxLength: 6
  },
  total_amount: {
    type: 'string',
    required: true,
    maxLength: 9,
    normalize: utils.normalizeTotalAmount
  },
  seller_id: {
    type: 'string',
    maxLength: 16    
  },
  product_code: {
    type: 'string',
    maxLength: 64,
    default: 'QUICK_MSECURITY_PAY'
  },
  goods_type: {
    type: 'enum',
    enums: ['0', '1']
  },
  passback_params: {
    type: 'string',
    maxLength: 512,
    normalize: utils.normalizePassbackParams
  },
  extend_params: extendParams,
  enable_pay_channels: payChannel,
  disable_pay_channels: payChannel,
  promo_params: {
    type: 'string',
    maxLength: 512
  },
  store_id: {
    type: 'string',
    maxLength: 32
  }
}