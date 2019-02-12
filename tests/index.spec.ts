import * as fs from 'fs'
import * as path from 'path'
import Alipay from '../src/index'
import { AlipayOption } from '../src/config'

const read = filename => {
  return fs.readFileSync(path.resolve(__dirname, filename))
}

function createService(optons?: AlipayOption) {
  const defaultOptions = {
    app_id: '2016080100137766',
    appPrivKeyFile: read('./keys/app_priv_key.pem'),
    alipayPubKeyFile: read('./keys/alipay_public_key.pem')
  }
  return new Alipay({ ...defaultOptions, ...optons })
}

function testCreateAppOrderOk(options) {
  const data = {
    subject: '辣条',
    out_trade_no: '1232423',
    total_amount: '100'
  }
  const result = createService(options).createAppOrder(data)
  expect(result.code).toEqual(0)
  expect(result.message).toEqual('请求成功')
}

describe('ALIPAY unit test',  () => {
  it('should use private key with ras header', () => {
    const vOptions = {
      app_id: '2016080100137766',
      appPrivKeyFile: read('./keys/app_priv_key_with_rsa_head.pem'),
      alipayPubKeyFile: read('./keys/alipay_public_key.pem')
    }
    return testCreateAppOrderOk(vOptions);
  })

  it('should use private key with header', () => {
    const vOptions = {
      app_id: '2016080100137766',
      appPrivKeyFile: read('./keys/app_priv_key_with_head.pem'),
      alipayPubKeyFile: read('./keys/alipay_public_key.pem')
    }
    return testCreateAppOrderOk(vOptions);
  })

  it('should allow create order', () => {
    const data = {
      subject: '辣条',
      out_trade_no: '1232423',
      total_amount: '100'
    }
    const result = createService().createAppOrder(data)
    expect(result.code).toEqual(0)
    expect(result.message).toEqual('请求成功')
  })
})
