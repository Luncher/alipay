import Preset from './preset'
import Promise from 'bluebird'
import { METHOD_TYPES } from '../config'

class Runner {
  constructor (presets, params) {
    this.value    
    this.result
    this.invalid = false
    this.message = 'Success'
    this.params = params
    this.presets = presets
    this.paramsKeys = Object.keys(params)   
    this.presetKeys = Object.keys(presets)  
  }

  validateRequired (checker, key, data) {
    if (checker.required && !data && !checker.default) {
      this.invalid = true
      this.message = `${key} required. But Not Found In params.`
    }
  }

  validateEnum (checker, key, data) {
    if (checker.type !== 'enum') return
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

  validateLength (checker, key, data) {
    if ((key in params) && !data) {
      this.invalid = true
      this.message = `${key}. Length equal 0.`
    } else if (data && checker.maxLength && data.length > checker.maxLength) {
      this.invalid = true
      this.message = `${key}. Too Long.`
    }
  }

  validateField (checker, key, data) {
    if (this.presetKeys.indexOf(key) === -1) {
      this.invalid = true
      this.message = `${key} Parameters should not appear`
    }
  }

  normalize (checker, key, data) {
    if (!data && checker.default) {
      if (typeof checker.default === 'function') {
        data = checker.default()
      } else {
        data = checker.default
      }
    }
    return data
  }

  validate (key) {
    const data = this.params[key]
    const checker = this.presets[key]

    do {
      this.validateRequired(checker, key, data)
      if (this.invalid) break;
      this.validateEnum(checker, key, data)
      if (this.invalid) break;      
      this.validateLength(checker, key, data)
      if (this.invalid) break;      
      this.validateField(checker, key, data)
      if (this.invalid) break;      
      this.result[key] = this.normalize(checker, key, data)
    } while(0)

    return this.invalid
  }

  run () {
    return new Promise((resolve, reject) => {
      for (let i = 0, len = this.presetKeys.length; i < len; i++) {
        const key = this.presetKeys[i]
        if (validate(key)) {
          reject(new Error(this.message))
          return;
        }
      }
      resolve(this.result)
    })
  }
}

export function parseBasic (params) {
  const instance = new Runner(Preset.Basic, params)
  return instance.run()
}

export function parseAPIParams (method, params) {
  let instance

  switch (method) {
    case METHOD_TYPES.CREATE_ORDER : {
      instance = new Runner(Preset.CreateOrder, params)
      break
    }
    case METHOD_TYPES.QUERY_ORDER : {
      instance = new Runner(Preset.QueryOrder, params)    
      break; 
    }
    case METHOD_TYPES.VERIFY_PAYMENT: {
      instance = new Runner(Preset.VerifyPayment, params)
    }
    default: {
      throw new Error(`Parser Unknow method type:${method}`)
    }
  }
  return instance.run()  
}

export default { parseBasic, parseAPIParams }