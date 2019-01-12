import { AlipayPaymentResponseCode } from '../../config/'

export default {
  memo: {
    type: 'string'
  },
  result: {
    type: 'string'
  },
  resultStatus: {
    type: 'enum',
    enums: AlipayPaymentResponseCode
  }
}