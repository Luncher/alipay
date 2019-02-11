import * as Joi from 'joi'

export const notifySchema: Joi.ObjectSchema = Joi.object({
  notify_time: Joi.string().required(),
  notify_type: Joi.string().required(),
  notify_id: Joi.string().required(),
  app_id: Joi.string().required(),
  version: Joi.string().required(),
  sign_type: Joi.string().required(),
  sign: Joi.string().required(),
  trade_no: Joi.string().required(),
  out_trade_no: Joi.string().required()
})
