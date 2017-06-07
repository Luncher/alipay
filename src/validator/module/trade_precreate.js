import * as utils from '../utils'

export default {
  out_trade_no: {
    type: 'string',
    maxLength: 64,
    required: true
  },
  seller_id: {
    type: 'string',
    maxLength: 28
  },
  total_amount: {
    type: 'string',
    required: true,
    maxLength: 11,
    normalize: utils.normalizeTotalAmount
  },
  discountable_amount: {
    type: 'string',
    maxLength: 11,
    normalize: utils.normalizeTotalAmount    
  },
  undiscountable_amount: {
    type: 'string',
    maxLength: 11,
    normalize: utils.normalizeTotalAmount    
  },
  buyer_logon_id: {
    type: 'string',
    maxLength: 100
  },
  subject: {
    type: 'string',
    required: true,
    maxLength: 256
  },
  body: {
    type: 'string',
    maxLength: 128
  },
  goods_detail: {
    type: 'mixed'
  },
  operator_id: {
    type: 'string',
    maxLength: 28
  },
  store_id: {
    type: 'string',
    maxLength: 32
  },
  terminal_id: {
    type: 'string',
    maxLength: 32
  },
  extend_params: {
    type: 'mixed'
  },
  timeout_express: {
    type: 'string',
    maxLength: 9    
  },
  royalty_info: {
    type: 'mixed'
  },
  sub_merchant: {
    type: 'mixed'
  },
  alipay_store_id: {
    type: 'string',
    maxLength: 32
  }
}