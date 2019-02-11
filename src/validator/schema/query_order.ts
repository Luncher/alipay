import * as Joi from 'joi'

export const queryOrderSchema: Joi.ObjectSchema = Joi.object({
  out_trade_no: Joi.string().max(64),
  trade_no: Joi.string().max(64)
}).or('out_trade_no', 'trade_no')
