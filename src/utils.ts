/**
 * @file alipay utils
 * @author linchen <gakiclin@gmail.com>
 */

import { isString } from 'util'
import * as crypto from 'crypto'
import * as config from './config'
import * as Validator from './validator'
import {
  MethodType,
  ApiResponse,
  PaymentResult,
  AlipayResponse,
  VerifyPamentArgs,
  alipayResponseMessage
} from './config'

export function makeSignStr(params: object, omit = ['sign']) {
  return Object.keys(params)
    .sort()
    .filter((key) => params[key] && omit.indexOf(key) === -1)
    .map((key) => {
      const value = typeof params[key] === 'object'
        ? JSON.stringify(params[key]) : params[key]
      return `${String(key)}=${String(value)}`
    })
    .join('&')
    .trim()
}

export function getSignAlgorithm(signType: config.AlipaySignType): config.AlipayAlgorithm {
  return config.AlipayAlgorithm[signType]
}

export function makeSign(privKey: string, params: config.AlipayPublicArgs) {
  const signStr = makeSignStr(params)
  const algorithm = getSignAlgorithm(params.sign_type)
  const signer = crypto.createSign(algorithm as string)
  signer.update(signStr, <crypto.Utf8AsciiLatin1Encoding>params.charset)
  return signer.sign(privKey, 'base64')
}

export function verifySign(
  publicKey: string, response: config.AlipayVerifySignArgs,
  omit: string[], options: config.AlipayNotifyArgs
): boolean {
  if (!response.async_notify_response || !response.sign) {
    return false
  }
  const { sign } = response
  const resp = makeSignStr(response.async_notify_response, omit)
  const algorithm = getSignAlgorithm(options.sign_type)
  const verify = crypto.createVerify(algorithm)
  verify.update(resp, <crypto.Utf8AsciiLatin1Encoding>options.charset)
  return verify.verify(publicKey, sign, 'base64')
}

export function getResponseType(response: config.GetResponseTypeArgs): config.AlipayResponseType {
  const respType: string = Object.keys(config.AlipayAPIList)
    .map((name) => name.replace(/\./g, '_'))
    .find((api) => `${api}_response` in response)
  if (respType) {
    return <config.AlipayResponseType>(`${respType}_response`)
  }
  throw new Error(`Not Found responseType: ${String(response.msg)}`)
}

export function makeResponse(response: AlipayResponse): ApiResponse {
  return {
    code: response.code,
    message: alipayResponseMessage[response.code],
    data: response[getResponseType(response)]
  }
}

export function verifyPayment(params: VerifyPamentArgs): ApiResponse {
  Validator.validateAPIParams(MethodType.VERIFY_PAYMENT, params)
  const data = isString(params.result)
    ? (<PaymentResult>JSON.parse(params.result))
    : params.result

  return makeResponse(data.alipay_trade_app_pay_response)
}
