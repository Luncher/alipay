import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"
import * as sinon from "sinon";
import * as urllib from "urllib";
import * as Promise from 'bluebird';
import Alipay = require("../lib/index");
import {RetData} from "../lib/index";

function read(filename: string) {
    return fs.readFileSync(path.resolve(__dirname, filename), {
        encoding: "utf-8"
    });
}

const service = new Alipay({
    app_id: "2016080100137766",
    appPrivKeyFile: read("../test/keys/app_priv_key.pem"),
    alipayPubKeyFile: read("../test/keys/alipay_public_key.pem")
});

describe("ALIPAY unit test", function () {

    it("should allow create order", () => {
        const data = {
            subject: "辣条",
            out_trade_no: "1232423",
            total_amount: "100"
        };
        return service.createAppOrder(data)
            .then(result => {
                assert(result.code == 0, result.message);
                assert(result.message === "success", result.message);
            });
    });

    // it("should allow create query order", () => {
    //   const data = {
    //     subject: "TTFuckYou",
    //     out_trade_no: "1232423",
    //     total_amount: "0.1"
    //   }
    //   const return_url = "http://www.baidu.com"
    //   return service.createWebOrderURL(data, { return_url })
    //   .then(result => {
    //     assert(result.code == 0, result.message)
    //     assert(result.message == "success", result.message)
    //   })
    // })

    // it("should allow query order", () => {
    //   const outTradeNo = "1232423"
    //   return service.queryOrder({ out_trade_no: outTradeNo })
    //   .then(result => {
    //     assert(result.code == -1, result.message)
    //     assert(result.message == "error", result.message)
    //     assert(result.data.code === "40004")
    //     assert(result.data.sub_msg === "交易不存在")
    //   })
    // })

    it("should reject makeNotifyResponse", () => {
        return service.makeNotifyResponse({} as any)
            .then((result: RetData) => {
                assert(result.code == -1, result.message)
            })
    });

    it("should allow toaccountTransfer", () => {
        const sandbox = sinon.createSandbox()
        sandbox.stub(urllib, "create").callsFake(function () {
            return {
                request: () => Promise.resolve({
                    data: {
                        "alipay_fund_trans_toaccount_transfer_response": {
                            "code": "10000",
                            "msg": "Success",
                            "out_biz_no": "3142321423432",
                            "order_id": "20160627110070001502260006780837",
                            "pay_date": "2013-01-01 08:08:08"
                        },
                        "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
                    }
                })
            }
        });
        return service.toaccountTransfer({
            out_biz_no: "1234",
            payee_type: "ALIPAY_LOGONID",
            payee_account: "user666",
            amount: "100"
        }, {} as any)
            .then(result => {
                sandbox.verifyAndRestore()
            })
    });
});
