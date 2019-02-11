import * as Joi from 'joi'
import { AlipayPayType } from 'config'

export const toaccountTransferSchema: Joi.ObjectSchema = Joi.object({
  out_biz_no: Joi.string().required(),
  payee_type: Joi.string().allow(Object.keys(AlipayPayType)).required(),
  payee_account: Joi.string().max(100).required(),
  amount: Joi.string().max(16).required(),
  payer_show_name: Joi.string().max(100),
  payee_real_name: Joi.string().max(100),
  remark: Joi.string().max(200)
})
