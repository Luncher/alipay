import * as Joi from 'joi'

export const tradeRefundSchema: Joi.ObjectSchema = Joi.object({
  out_trade_no: Joi.string().max(64),
  trade_no: Joi.string().max(64),
  refund_amount: Joi.number(),
  refund_reason: Joi.string().max(256),
  out_request_no: Joi.string().max(64),
  operator_id: Joi.string().max(30),
  store_id: Joi.string().max(32),
  terminal_id: Joi.string().max(32)
}).or('trade_no', 'out_trade_no')
