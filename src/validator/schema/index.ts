/**
 * @alipay api validator schema
 * @author linchen <gakiclin@gmail.com>
 */

import * as Joi from 'joi'
import * as moment from 'moment'
import { AlipaySignType } from '../../config'

export * from './notify'
export * from './trade_close'
export * from './trade_settle'
export * from './trade_refund'
export * from './query_order'
export * from './create_app_order'
export * from './create_web_order'
export * from './create_page_order'
export * from './cancel_order'
export * from './verify_payment'
export * from './trade_precreate'
export * from './trade_refund_query'
export * from './bill_download_query'
export * from './toaccount_transfer'

export const basicSchema: Joi.ObjectSchema = Joi.object({
  app_id: Joi.string().max(32).required(),
  method: Joi.string().max(128).required(),
  format: Joi.string().max(40),
  return_url: Joi.string().max(256),
  charset: Joi.string().max(10).default('utf-8', '请求使用的编码格式'),
  sign_type: Joi.string().allow(
    Object.keys(AlipaySignType)
  ).default('RSA2', '商户生成签名字符串所使用的签名算法类型，目前支持RSA2和RSA，推荐使用RSA2'),
  timestamp: Joi.string().max(19).default(() => moment().format('YYYY-MM-DD HH:mm:ss'), '时间戳'),
  version: Joi.string().max(3).default('1.0', '调用的接口版本，固定为：1.0'),
  notify_url: Joi.string().max(256)
})
