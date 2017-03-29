'use strict'

import moment from 'moment'

export function createTimeStamp () {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

export function normalizeTotalAmount (value) {
  return Number(value).toFixed(2)
}

export function normalizePassbackParams (params) {
  return params && encodeURI(params)
}