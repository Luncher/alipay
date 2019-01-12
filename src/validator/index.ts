import Preset from './preset'
import makeDebug from 'debug'
import { MethodType } from '../config'

const debug = makeDebug('alipay-mobile:parser')

class Validator {
  result = {}
  params: any = null
  presets: any = null
  paramsKeys: any = null
  presetKeys: any = null
  invalid: boolean = false
  message: string = 'Success'

  constructor (presets, params) {
    this.paramsKeys = Object.keys(params)
    this.presetKeys = Object.keys(presets)  
  }

  validateRequired (checker, key, data) {
    if (checker.required && !data && !checker.default) {
      this.invalid = true
      this.message = `${key} is required. But Not Found In params.`
    }
  }

  validateEnum (checker, key, data) {
    if (checker.type !== 'enum' || !data) return
    const items = Array.isArray(data) ? data : data.split(',')

    for (let i = 0, len = items.length; i < len; i++) {
      const it = items[i]
      if (it && checker.enums.indexOf(it) === -1) {
        this.invalid = true
        this.message = `key: ${key}, value: ${data}. Not Found In : ${checker.enums.join(',')}`     
        break               
      }
    }
  }

  validateLength (checker, key: string, data) {
    if (!data) return
    if ((key in this.params) && !data.length) {
      this.invalid = true
      this.message = `${key}. Length equal 0.`
    } else if (checker.maxLength && data.length > checker.maxLength) {
      this.invalid = true
      this.message = `${key}. Too Long.`
    }
  }

  validateField (_, key: string) {
    if (this.presetKeys.indexOf(key) === -1) {
      this.invalid = true
      this.message = `${key} Parameters should not appear`
    }
  }

  normalize (checker, _, data) {
    if (!data && checker.default) {
      if (typeof checker.default === 'function') {
        data = checker.default()
      } else {
        data = checker.default
      }
    }
    if (checker.normalize) {
      data = checker.normalize(data)
    }

    return data
  }

  validate (key: string) {
    let data = this.params[key]
    const checker = this.presets[key]
    debug("key: ", key)
    debug("data: ", data)
    debug("checker: ", checker)

    this.validateRequired(checker, key, data)
    if (this.invalid) return this.invalid
    data = this.normalize(checker, key, data)
    this.validateEnum(checker, key, data)
    if (this.invalid) return this.invalid     
    this.validateLength(checker, key, data)
    if (this.invalid) return this.invalid    
    this.validateField(checker, key)
    if (this.invalid) return this.invalid
    if (data) {
      this.result[key] = data
    }
    return this.invalid
  }

  run () {
    return new Promise((resolve, reject) => {
      for (let i = 0, len = this.presetKeys.length; i < len; i++) {
        const key = this.presetKeys[i]
        if (this.validate(key)) {
          return reject(new Error(this.message))
        }
      }
      resolve(this.result)
    })
  }
}

export function validateBasicParams (params) {
  debug("params:", params)
  const instance = new Validator(Preset.Basic, params)
  return instance.run()
}

export function validateAPIParams (method, params) {
  let instance

  switch (method) {
    case MethodType.CREATE_WEB_ORDER: {
      instance = new Validator(Preset.CreateWebOrder, params)
      break
    }
    case MethodType.CREATE_APP_ORDER: {
      instance = new Validator(Preset.CreateAppOrder, params)
      break
    }
    case MethodType.CREATE_PAGE_ORDER: {
      instance = new Validator(Preset.CreatePageOrder, params)      
      break
    }
    case MethodType.QUERY_ORDER: {
      instance = new Validator(Preset.QueryOrder, params)    
      break
    }
    case MethodType.CANCEL_ORDER: {
      instance = new Validator(Preset.CancelOrder, params)
      break
    }
    case MethodType.VERIFY_PAYMENT: {
      instance = new Validator(Preset.VerifyPayment, params)
      break       
    }
    case MethodType.NOTIFY_RESPONSE: {
      instance = new Validator(Preset.Notify, params)
      break   
    }
    case MethodType.TRADE_CLOSE: {
      instance = new Validator(Preset.TradeClose, params)
      break
    }
    case MethodType.TRADE_REFUND: {
      instance = new Validator(Preset.TradeRefund, params)
      break
    }
    case MethodType.TRADE_REFUND_QUERY: {
      instance = new Validator(Preset.TradeRefundQuery, params)
      break
    }
    case MethodType.BILL_DOWNLOAD_QUERY: {
      instance = new Validator(Preset.BillDownloadQuery, params)
      break
    }
    case MethodType.TRADE_PRECREATE: {
      instance = new Validator(Preset.TradePrecreate, params)
      break
    }
    case MethodType.TRADE_SETTLE: {
      instance = new Validator(Preset.TradeSettle, params)
      break
    }
    case MethodType.FUND_TRANS_TOACCOUNT_TRANSFER: {
      instance = new Validator(Preset.ToaccountTransfer, params)      
      break
    }
    default: {
      throw new Error(`Parser Unknow method type:${method}`)
    }
  }
  return instance.run()  
}

export default {
  validateAPIParams,
  validateBasicParams  
}