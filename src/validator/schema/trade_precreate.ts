import * as Joi from 'joi'

export const tradePrecreateSchema: Joi.ObjectSchema = Joi.object({
  out_trade_no: Joi.string().max(64).required(),
  seller_id: Joi.string().max(128),
  total_amount: Joi.string().max(11).regex(/^[0-9]+(.[0-9]{1,2}?)$/),
  discountable_amount: Joi.string().max(11).regex(/^[0-9]+(.[0-9]{1,2}?)$/),
  undiscountable_amount: Joi.string().max(11).regex(/^[0-9]+(.[0-9]{1,2}?)$/),
  buyer_logon_id: Joi.string().max(100),
  subject: Joi.string().max(256).required(),
  body: Joi.string().max(128),
  operator_id: Joi.string().max(28),
  store_id: Joi.string().max(32),
  disable_pay_channels: Joi.string().max(128),
  enable_pay_channels: Joi.string().max(128),
  terminal_id: Joi.string().max(32),
  extend_params: Joi.object(),
  timeout_express: Joi.string().max(6),
  settle_info: Joi.any(),
  merchant_order_no: Joi.string().max(32),
  business_params: Joi.string().max(512),
  qr_code_timeout_express: Joi.string().max(6)
})
