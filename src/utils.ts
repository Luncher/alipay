import * as crypto from 'crypto'
import * as config from './config'

export function makeSignStr(params, omit = ['sign']) {
  return Object.keys(params)
  .sort()
  .filter(key => params[key] && omit.indexOf(key) === -1)
  .map(key => {
    const value = typeof params[key] === 'object' ?
      JSON.stringify(params[key])  : params[key]
    return key + '=' + value + ''
  })
  .join('&').trim()
}

export function signAlgorithm (signType: config.AlipayAlgorithm): string {
  return config.AlipayAlgorithm[signType]
}

export function makeSign (privKey, params) {
  const signStr = makeSignStr(params)
  const algorithm = signAlgorithm(params.sign_type)
  const signer = crypto.createSign(algorithm)
  signer.update(signStr, params.charset)
  return signer.sign(privKey, "base64")
}

export function verifySign (publicKey, response, omit, options): boolean {
  const type = responseType(response)
  if (!type || !response.sign) {
    return false
  } else {
    // const sign = Base64.decode(response.sign)
    const sign = response.sign
    const resp = makeSignStr(response[type], omit)
    const algorithm = signAlgorithm(options.sign_type)
    const verify = crypto.createVerify(algorithm)
    verify.update(resp, options.charset)
    return verify.verify(publicKey, sign, 'base64')
  }
}

export function responseType (response): string {
  const type = Object.keys(config.AlipayAPIList)
    .map(name => name.replace(/\./g, '_'))
    .find(api => `${api}_response` in response)
  if (type) return type + '_response'
  throw new Error("Not Found responseType: " + response)
}