export default {
  out_trade_no: {
    type: 'string',
    maxLength: 64
  },
  trade_no: {
    type: 'string',
    maxLength: 64
  },
  out_request_no: {
    type: 'string',
    required: true,
    maxLength: 64
  }
}