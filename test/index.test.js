import fs from 'fs'
import path from 'path'
import assert from 'assert'
import Alipay from '~/index'

const read = filename => {
  return fs.readFileSync(path.resolve(__dirname, filename))
}

const options = {
  app_id: '2016080100137766',
  appPrivKeyFile: read('./keys/app_priv_key.pem'),
  alipayPubKeyFile: read('./keys/alipay_public_key.pem')
}

const service = new Alipay(options)

describe('ALIPAY unit test', function () {
  it('should allow create order', () => {
    const data = {
      subject: '辣条',
      out_trade_no: '1232423',
      total_amount: '100'
    }
    return service.createOrder(data)
    .then(result => {
      assert(result.code == 0, result.message)
      assert(result.message == 'success', result.message)
    })
  })

  // it('should allow query order', () => {
  //   const outTradeNo = '1232423'
  //   return service.queryOrder({ out_trade_no: outTradeNo })
  //   .then(result => {
  //     assert(result.code == -1, result.message)
  //     assert(result.message == 'error', result.message)
  //     assert(result.data['alipay_trade_query_response'].code === '40004')
  //     assert(result.data['alipay_trade_query_response'].sub_msg === '交易不存在')
  //   })
  // })

  it ('should reject makeNotifyResponse', () => {
    return service.makeNotifyResponse({})
    .then(result => {
      assert(result.code == -1, result.message)
    })
  })
})