import * as Joi from 'joi'

export const billDownloadSchema: Joi.ObjectSchema = Joi.object({
  bill_type: Joi.string().max(10).required(),
  bill_date: Joi.string().max(15).required()
})
