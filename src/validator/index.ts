import * as Joi from 'joi'
import * as Schema from './schema'
import { MethodType, AlipayPublicArgs, AlipayAPIArgs } from '../config'

type AlipayArgs = AlipayPublicArgs | AlipayAPIArgs

function validate(schema: Joi.ObjectSchema, params: AlipayArgs): AlipayArgs {
  const result: Joi.ValidationResult<AlipayArgs> = Joi.validate(params, schema)
  if (result.error) {
    throw result.error
  }

  return result.value
}

export function validateBasicParams(params: AlipayPublicArgs): AlipayPublicArgs {
  return <AlipayPublicArgs>validate(Schema.basicSchema.options({ allowUnknown: true }), params)
}

export function validateAPIParams(method: MethodType, params: AlipayAPIArgs): AlipayAPIArgs {
  switch (method) {
    case MethodType.CREATE_WEB_ORDER: {
      return validate(Schema.createWebOrderSchema, params)
    }
    case MethodType.CREATE_APP_ORDER: {
      return validate(Schema.createAppOrderSchema, params)
    }
    case MethodType.CREATE_PAGE_ORDER: {
      return validate(Schema.createPageOrderSchema, params)
    }
    case MethodType.QUERY_ORDER: {
      return validate(Schema.queryOrderSchema, params)
    }
    case MethodType.CANCEL_ORDER: {
      return validate(Schema.cancelOrderSchema, params)
    }
    case MethodType.VERIFY_PAYMENT: {
      return validate(Schema.verifyPaymentSchema, params)
    }
    case MethodType.NOTIFY_RESPONSE: {
      return validate(Schema.notifySchema, params)
    }
    case MethodType.TRADE_CLOSE: {
      return validate(Schema.tradeCloseSchema, params)
    }
    case MethodType.TRADE_REFUND: {
      return validate(Schema.tradeRefundSchema, params)
    }
    case MethodType.TRADE_REFUND_QUERY: {
      return validate(Schema.tradeRefundQuery, params)
    }
    case MethodType.BILL_DOWNLOAD_QUERY: {
      return validate(Schema.billDownloadSchema, params)
    }
    case MethodType.TRADE_PRECREATE: {
      return validate(Schema.tradePrecreateSchema, params)
    }
    case MethodType.TRADE_SETTLE: {
      return validate(Schema.tradeSettleSchema, params)
    }
    case MethodType.FUND_TRANS_TOACCOUNT_TRANSFER: {
      return validate(Schema.toaccountTransferSchema, params)
    }
    default: {
      throw new Error(`Parser Unknow method type:${method}`)
    }
  }
}
