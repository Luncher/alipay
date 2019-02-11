import * as Joi from 'joi'

export const tradeCloseSchema: Joi.ObjectSchema = Joi.object({
  out_trade_no: Joi.string().max(64),
  trade_no: Joi.string().max(64),
  operator_id: Joi.string().max(28)
}).or('out_trade_no', 'trade_no')
