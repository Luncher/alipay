import * as Joi from 'joi'
import { AlipayPaymentResponseCode } from 'src/config'

export const verifyPaymentSchema: Joi.ObjectSchema = Joi.object({
  memo: Joi.string().required(),
  result: Joi.any().required(),
  resultStatus: Joi.string().allow(Object.keys(AlipayPaymentResponseCode))
})
