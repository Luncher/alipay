import moment from 'moment'
import config from '../config'

function createTimeStamp () {
  return '2017-03-20 10:28:59'//moment().format('YYYY-MM-DD HH:mm:ss')
}

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

const Basic = {
  app_id: {
    type: 'string',
    required: true,
    maxLength: 32
  },
  method: {
    type: 'string',
    required: true,
    maxLength: 128
  },
  format: {
    type: 'string',
    default: 'JSON',
    maxLength: 40
  },
  charset: {
    type: 'string',
    required: true,
    default: 'utf-8',
    maxLength: 10
  },
  sign_type: {
    type: 'string',
    required: true,
    default: 'RSA2',
    maxLength: 10
  },
  timestamp: {
    type: 'string',
    required: true,
    maxLength: 19,
    default: createTimeStamp
  },
  version: {
    type: 'string',
    required: true,
    default: '1.0',
    maxLength: 3
  },
  notify_url: {
    type: 'string',
    required: true,
    maxLength: 256
  }
}

function normalizeTotalAmount (value) {
  return Number('1.234').toFixed(2)
}

function normalizePassbackParams (params) {
  return params && encodeURI(params)
}

const CreateOrder = {
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
    normalize: normalizeTotalAmount
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
    normalize: normalizePassbackParams
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

const QueryOrder = {
  out_trade_no: {
    type: 'string',
    maxLength: 64
  },
  trade_no: {
    type: 'string',
    maxLength: 64
  }
}

const VerifyPayment = {
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
    enums: Object.keys(config.ALIPAY_PAYMENT_MESSAGE)
  }
}

export default { VerifyPayment, QueryOrder, CreateOrder, Basic, extendParams, payChannel }