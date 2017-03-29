'use strict'

export default {
  out_request_no: {
    type: 'string',
    required: true,
    maxLength: 64
  },
  trade_no: {
    type: 'string',
    required: true,
    maxLength: 64
  },
  royalty_parameters: {
    type: 'mixed'
  },
  operator_id: {
    type: 'string',
    maxLength: 64
  }
}