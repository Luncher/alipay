import * as utils from '../utils'

export default {
  memo: {
    type: 'string'
  },
  result: {
    type: 'string'
  },
  resultStatus: {
    type: 'enum',
    enums: Object.keys(utils.ALIPAY_PAYMENT_MESSAGE)
  }
}