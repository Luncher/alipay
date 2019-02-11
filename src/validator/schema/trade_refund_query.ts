import * as Joi from 'joi'

export const tradeRefundQuery: Joi.ObjectSchema = Joi.object({
  out_trade_no: Joi.string().max(64),
  trade_no: Joi.string().max(64),
  out_request_no: Joi.string().max(64).required(),
  org_pid: Joi.string().max(16)
}).or('trade_no', 'out_trade_no')
