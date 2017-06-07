import * as utils from '../utils'

export default {
  out_trade_no: {
    type: 'string',
    maxLength: 64
  },
  trade_no: {
    type: 'string',
    maxLength: 64
  },
  refund_amount: {
    type: 'string',
    required: true,
    maxLength: 9,
    normalize: utils.normalizeTotalAmount
  },
  refund_reason: {
    type: 'string',
    maxLength: 256
  },
  out_request_no: {
    type: 'string',
    maxLength: 64        
  },
  operator_id: {
    type: 'string',
    maxLength: 30        
  },
  store_id: {
    type: 'string',
    maxLength: 32
  },
  terminal_id: {
    type: 'string',
    maxLength: 32
  }
}