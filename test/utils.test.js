import assert from 'assert'
import * as utils from '~/utils'

describe('ALIPAY unit test - utils', function () {
  it ('it should support billDownloadQuery response type', () => {
    const response = { alipay_data_dataservice_bill_downloadurl_query_response: { code: '10000', msg: 'Success', bill_download_url: 'http://dwbillcenter.alipay.com/downloadBillFile.resource?bizType=trade&userId=123&fileType=csv.zip&bizDates=20150719&downloadFileName=20150719.csv.zip&fileId=%2Ftrade%2F20150719.csv.zip&timestamp=123&token=123' }, sign: '123' }
    const respType = utils.responseType(response)
    assert(respType === 'alipay_data_dataservice_bill_downloadurl_query_response', 'Invalid response type')
  })
})