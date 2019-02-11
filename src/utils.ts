import * as crypto from 'crypto'
import * as config from 'config'

export function makeSignStr(params: object, omit = ['sign']) {
  return Object.keys(params)
  .sort()
  .filter(key => params[key] && omit.indexOf(key) === -1)
  .map(key => {
    const value = typeof params[key] === 'object' ?
      JSON.stringify(params[key])  : params[key]
    return String(key) + '=' + String(value) + ''
  })
  .join('&').trim()
}

export function signAlgorithm (signType: string): config.AlipayAlgorithm {
  return config.AlipayAlgorithm[signType]
}

export function makeSign (privKey: string, params: config.AlipayPublicArgs) {
  const signStr = makeSignStr(params)
  const algorithm = signAlgorithm(params.sign_type)
  const signer = crypto.createSign(algorithm)
  signer.update(signStr, <crypto.Utf8AsciiLatin1Encoding>params.charset)
  return signer.sign(privKey, 'base64')
}

export function verifySign(
  publicKey: string, response: config.AlipayVerifySignArgs,
  omit: string[], options: config.AlipayNotifyArgs): boolean {
  const respType = responseType(response)
  if (!respType || !response.sign) {
    return false
  } else {
    // const sign = Base64.decode(response.sign)
    const sign = response.sign
    const resp = makeSignStr(response[respType], omit)
    const algorithm = signAlgorithm(options.sign_type)
    const verify = crypto.createVerify(algorithm)
    verify.update(resp, <crypto.Utf8AsciiLatin1Encoding>options.charset)
    return verify.verify(publicKey, sign, 'base64')
  }
}

export function responseType (response: config.AlipayResponse | config.AlipayVerifySignArgs): string {
  const respType: string = Object.keys(config.AlipayAPIList)
    .map(name => name.replace(/\./g, '_'))
    .find(api => `${api}_response` in response)
  if (respType) {
    return respType + '_response'
  }
  throw new Error('Not Found responseType: ' + String(response.msg))
}
