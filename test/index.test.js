import path from 'path'
import assert from 'assert'
import Alipay from '../src/index'

const resolve = filename => {
  return path.resolve(__dirname, filename)
}

const options = {
  app_id: '2016080300160334',
  notify_url: 'http://test.tangide.com/alipap-test.php',
  appPrivKeyFile: resolve('./keys/app_priv_key.pem'),
  alipayPubKeyFile: resolve('./keys/alipay_public_key.pem')
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

  it('should allow query order', () => {
    const outTradeNo = '1232423'
    return service.queryOrder(outTradeNo)
    .then(result => {
      assert(result.code == -1, result.message)
      assert(result.data.code == '40004')
      assert(result.data.sub_msg === '交易不存在')
    })
  })
  it ('should reject makeNotifyResponse', () => {
    return service.makeNotifyResponse({})
    .then(result => {
      console.dir(result)
      assert(result.code == -1, result.message)
    })
  })

  // it ('should reject makeNotifyResponse', () => {
  //   return service.makeNotifyResponse()
  //   .then(result => {
  //     assert(result.code == -1, result.message)
  //   })
  // })
})