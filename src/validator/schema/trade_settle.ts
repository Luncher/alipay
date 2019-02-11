import * as Joi from 'joi'

export const tradeSettleSchema: Joi.ObjectSchema = Joi.object({
  out_request_no: Joi.string().max(64).required(),
  trade_no: Joi.string().max(64).required(),
  royalty_parameters: Joi.any().required(),
  operator_id: Joi.string().max(64)
})
