// Type definitions for aplipay-mobile v2.2.2
// Project: https://github.com/Luncher/alipay
// Definitions by: Mervyn Zhan <https://github.com/feimeizhan/>

export = Alipay;

declare class Alipay {

    constructor(options: Alipay.AlipayOptions);

    makeNotifyResponse(params: Alipay.NotifyParams): Promise<Alipay.RetData>;

    verifyPayment(params: Alipay.VerifyPaymentParams): Promise<Alipay.RetData>;

    createOrder(publicParams: Alipay.CreateAppOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;
    createAppOrder(publicParams: Alipay.CreateAppOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    createWebOrder(publicParams: Alipay.CreateWebOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    createWebOrderURL(publicParams: Alipay.CreateWebOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    createPageOrder(publicParams: Alipay.CreatePageOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    createPageOrderURL(publicParams: Alipay.CreatePageOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    queryOrder(publicParams: Alipay.QueryOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    cancelOrder(publicParams: Alipay.CancelOrderParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    tradeClose(publicParams: Alipay.TradeCloseParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    tradeRefund(publicParams: Alipay.TradeRefundParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    tradeRefundQuery(publicParams: Alipay.TradeRefundQueryParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    billDownloadQuery(publicParams: Alipay.BillDownloadQueryParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    tradePrecreate(publicParams: Alipay.TradePrecreateParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    tradeSettle(publicParams: Alipay.TradeSettleParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;

    toaccountTransfer(publicParams: Alipay.ToAccountTransferParams, basicParams?: Alipay.BasicParams): Promise<Alipay.RetData>;
}

declare namespace Alipay {
    enum GOODS_TYPE {
        /**
         * 虚拟商品
         */
        VIRTUAL_GOODS = "0",
        /**
         * 实物类商品
         */
        REALITY_GOODS = "1",
    }

    type ExtendParams = "sys_service_provider_id" | "needBuyerRealnamed" | "TRANS_MEMO"

    type PayChannel = "balance" | "moneyFund" | "coupon" | "pcredit" | "pcreditpayInstallment" |
        "creditCard" | "creditCardExpress" | "creditCardCartoon" | "credit_group"| "debitCardExpress" |
        "mcard" | "pcard" | "promotion" | "voucher" | "point" | "mdiscount" | "bankPay";

    enum ALIPAY_PAYMENT_CODE {
        /**
         * 9000: "订单支付成功",
         */
        PAY_SUC = 9000,
        /**
         *
         * 8000: "正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态",
         */
        HANDLING = 8000,
        /**
         * 4000: "订单支付失败",
         */
        PAY_FAIL = 4000,
        /**
         *
         * 5000: "重复请求",
         */
        REQUEST_DUPLICATE = 5000,
        /**
         * 6001: "用户中途取消",
         */
        CANCEL = 6001,
        /**
         * 6002: "网络连接出错",
         */
        NETWORK_ERROR = 6002,
        /**
         * 6004: "支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态"
         */
        UNKNOWN = 6004,
    }

    enum RESPONSE_CODE {
        SUCCESS = 0,
        PROCESSING = 1,
        ERROR = -1,
        PERMISSION_DENIED = -2,
        SIGN_ERROR = -3,
    }

    type AlipayAccountType = "ALIPAY_USERID" | "ALIPAY_LOGONID";

    interface AlipayOptions {
        app_id: string;
        appPrivKeyFile: string;
        alipayPubKeyFile: string;
    }

    interface VerifyPaymentParams {
        memo?: string;
        result?: string;
        resultStatus?: ALIPAY_PAYMENT_CODE;
    }

    interface CreateAppOrderParams {
        body?: string;
        subject: string;
        out_trade_no: string;
        timeout_express?: string;
        total_amount: string;
        seller_id?: string;
        /**
         * default: "QUICK_MSECURITY_PAY"
         */
        product_code?: string;
        goods_type?: GOODS_TYPE;
        passback_params?: string;
        extend_params?: ExtendParams;
        enable_pay_channels?: PayChannel;
        disable_pay_channels?: PayChannel;
        promo_params?: string;
        store_id?: string;
    }

    type CreateWebOrderParams = CreateAppOrderParams & {time_expire?: string};

    type CreatePageOrderParams = CreateAppOrderParams & {qr_pay_mode?: string, qrcode_width?: string};

    interface QueryOrderParams {
        out_trade_no?: string;
        trade_no?: string;
    }

    type CancelOrderParams = QueryOrderParams;

    type TradeCloseParams = QueryOrderParams & {operator_id?: string};

    type TradeRefundParams = QueryOrderParams & {
        refund_amount: string;
        refund_reason?: string;
        out_request_no?: string;
        operator_id?: string;
        store_id?: string;
        terminal_id?: string;
    }

    interface TradePrecreateParams {
        out_trade_no: string;
        seller_id?: string;
        total_amount: string;
        discountable_amount?: string;
        undiscountable_amount?: string;
        buyer_logon_id?: string;
        subject: string;
        body?: string;
        goods_detail?: any;
        operator_id?: string;
        store_id?: string;
        terminal_id?: string;
        extend_params?: any;
        timeout_express?: string;
        royalty_info?: any;
        sub_merchant?: any;
        alipay_store_id?: string;
    }

    type TradeRefundQueryParams = QueryOrderParams & {out_request_no: string};

    interface BillDownloadQueryParams {
        bill_type: string;
        bill_date: string;
    }


    interface ToAccountTransferParams {
        /**
         * 商户转账唯一订单号
         */
        out_biz_no: string;
        /**
         * 收款方账户类型
         */
        payee_type: AlipayAccountType;
        /**
         * 收款方账户
         */
        payee_account: string;
        /**
         * 转账金额，单位：元
         */
        amount: string;
        /**
         * 付款方姓名
         */
        payer_show_name?: string;
        /**
         * 收款方真实姓名
         */
        payee_real_name?: string;
        /**
         * 转账备注
         */
        remark?: string;
    }

    interface TradeSettleParams {
        out_request_no: string;
        trade_no: string;
        royalty_parameters: any;
        operator_id?: string;
    }

    interface NotifyParams {
        notify_time: string;
        notify_type: string;
        notify_id: string;
        app_id: string;
        version: string;
        sign_type: string;
        sign: string;
        trade_no: string;
        out_trade_no: string;
        out_biz_no?: string;
        buyer_id?: string;
        buyer_logon_id?: string;
        seller_id?: string;
        seller_email?: string;
        trade_status?: string;
        total_amount?: string;
        receipt_amount?: string;
        invoice_amount?: string;
        buyer_pay_amount?: string;
        point_amount?: string;
        refund_fee?: string;
        subject?: string;
        body?: string;
        gmt_create?: string;
        gmt_payment?: string;
        gmt_refund?: string;
        gmt_close?: string;
        fund_bill_list?: string;
        passback_params?: string;
        voucher_detail_list?: string;
    }

    interface BasicParams {
        app_id: string;
        method: string;
        /**
         * default: "JSON",
         */
        format?: string;
        return_url?: string;
        /**
         * default: "utf-8",
         */
        charset?: string;
        /**
         * default: RSA2
         */
        sign_type?: string;
        timestamp?: string;
        /**
         * default: 1.0
         */
        version?: string;
        notify_url: string;
    }

    interface RetData {
        // 返回的码RESPONSE_CODE
        code: number | string;
        message?: string;
        data?: any;
    }
}


