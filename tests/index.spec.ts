import * as fs from 'fs'
import * as path from 'path'
// import * as urllib from 'urllib'
import Alipay from '../src/index'
import {
  AlipayOption
} from '../src/config'

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
  expect(result.message).toEqual('success')
}

describe('ALIPAY unit test',  () => {
  it.only('should use private key with ras header', () => {
    const vOptions = {
      app_id: '2016080100137766',
      appPrivKeyFile: read('./keys/app_priv_key_with_rsa_head.pem'),
      alipayPubKeyFile: read('./keys/alipay_public_key.pem')
    }
    return testCreateAppOrderOk(vOptions);
  })

  // it('should use private key with header', () => {
  //   const vOptions = {
  //     app_id: '2016080100137766',
  //     appPrivKeyFile: read('./keys/app_priv_key_with_head.pem'),
  //     alipayPubKeyFile: read('./keys/alipay_public_key.pem')
  //   }
  //   return testCreateAppOrderOk(vOptions);
  // })

  // it('should allow create order', () => {
  //   const data = {
  //     subject: '辣条',
  //     out_trade_no: '1232423',
  //     total_amount: '100'
  //   }
  //   return createService().createAppOrder(data)
  //   .then((result: ApiResponse) => {
  //     expect(result.code).toEqual(0)
  //     expect(result.message).toEqual('success')
  //   })
  // })

  // it ('should reject makeNotifyResponse', () => {
  //   return service.makeNotifyResponse({})
  //   .then(result => {
  //     assert(result.code == -1, result.message)
  //   })
  // })

  // it('should allow toaccountTransfer', () => {
  //   const sandbox = sinon.createSandbox()
  //   sandbox.stub(urllib, "create").callsFake(function() {
  //     return {
  //       request: () => Promise.resolve({ data: {
  //         "alipay_fund_trans_toaccount_transfer_response": {
  //           "code": "10000",
  //           "msg": "Success",
  //           "out_biz_no": "3142321423432",
  //           "order_id": "20160627110070001502260006780837",
  //           "pay_date": "2013-01-01 08:08:08"
  //         },
  //         "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
  //       }})
  //     }
  //   })
  //   return service.toaccountTransfer({
  //     out_biz_no: "1234",
  //     payee_type: 'ALIPAY_LOGONID',
  //     payee_account: "user666",
  //     amount: "100"
  //   }, {})
  //   .then(result => {
  //     sandbox.verifyAndRestore()
  //   })
  // })
})
