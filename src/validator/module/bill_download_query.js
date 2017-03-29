'use strict'

export default {
  bill_type: {
    type: 'string',
    required: true,
    maxLength: 10
  },
  bill_date: {
    type: 'string',
    required: true,
    maxLength: 15
  }
}