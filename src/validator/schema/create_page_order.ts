import * as Joi from 'joi'
import { GoodsType } from 'config'

export const createPageOrderSchema: Joi.ObjectSchema = Joi.object({
  body: Joi.string().max(128),
  subject: Joi.string().max(256).required(),
  out_trade_no: Joi.string().max(64).required(),
  timeout_express: Joi.string().max(6),
  total_amount: Joi.string().max(9).regex(/^[0-9]+(.[0-9]{1,2}?)$/),
  seller_id: Joi.string().max(16),
  product_code: Joi.string().max(64).default('FAST_INSTANT_TRADE_PAY'),
  goods_type: Joi.string().max(2).allow(GoodsType),
  passback_params: Joi.string().max(512),
  extend_params: Joi.object({
    sys_service_provider_id: Joi.string().max(64),
    needBuyerRealnamed: Joi.string().max(1),
    TRANS_MEMO: Joi.string().max(128),
    hb_fq_num: Joi.string().max(5),
    hb_fq_seller_percent: Joi.string().max(3)
  }),
  enable_pay_channels: Joi.string().max(128),
  disable_pay_channels: Joi.string().max(128),
  promo_params: Joi.string().max(512),
  store_id: Joi.string().max(32),
  qr_pay_mode: Joi.string().max(2),
  qrcode_width: Joi.string().max(4)
})
