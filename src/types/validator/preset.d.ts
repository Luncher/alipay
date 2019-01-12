import * as utils from './utils';
declare const _default: {
    Basic: {
        app_id: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        method: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        format: {
            type: string;
            default: string;
            maxLength: number;
        };
        return_url: {
            type: string;
            maxLength: number;
        };
        charset: {
            type: string;
            required: boolean;
            default: string;
            maxLength: number;
        };
        sign_type: {
            type: string;
            required: boolean;
            default: string;
            maxLength: number;
        };
        timestamp: {
            type: string;
            required: boolean;
            maxLength: number;
            default: typeof utils.createTimeStamp;
        };
        version: {
            type: string;
            required: boolean;
            default: string;
            maxLength: number;
        };
        notify_url: {
            type: string;
            maxLength: number;
        };
    };
    Notify: {
        notify_time: {
            type: string;
            required: boolean;
        };
        notify_type: {
            type: string;
            required: boolean;
        };
        notify_id: {
            type: string;
            required: boolean;
        };
        app_id: {
            type: string;
            required: boolean;
        };
        version: {
            type: string;
            required: boolean;
        };
        sign_type: {
            type: string;
            required: boolean;
        };
        sign: {
            type: string;
            required: boolean;
        };
        trade_no: {
            type: string;
            required: boolean;
        };
        out_trade_no: {
            type: string;
            required: boolean;
        };
        out_biz_no: {
            type: string;
        };
        buyer_id: {
            type: string;
        };
        buyer_logon_id: {
            type: string;
        };
        seller_id: {
            type: string;
        };
        seller_email: {
            type: string;
        };
        trade_status: {
            type: string;
        };
        total_amount: {
            type: string;
        };
        receipt_amount: {
            type: string;
        };
        invoice_amount: {
            type: string;
        };
        buyer_pay_amount: {
            type: string;
        };
        point_amount: {
            type: string;
        };
        refund_fee: {
            type: string;
        };
        subject: {
            type: string;
        };
        body: {
            type: string;
        };
        gmt_create: {
            type: string;
        };
        gmt_payment: {
            type: string;
        };
        gmt_refund: {
            type: string;
        };
        gmt_close: {
            type: string;
        };
        fund_bill_list: {
            type: string;
        };
        passback_params: {
            type: string;
        };
        voucher_detail_list: {
            type: string;
        };
    };
    VerifyPayment: {
        memo: {
            type: string;
        };
        result: {
            type: string;
        };
        resultStatus: {
            type: string;
            enums: string[];
        };
    };
    CreateAppOrder: {
        body: {
            type: string;
            maxLength: number;
        };
        subject: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        out_trade_no: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        timeout_express: {
            type: string;
            maxLength: number;
        };
        total_amount: {
            type: string;
            required: boolean;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        seller_id: {
            type: string;
            maxLength: number;
        };
        product_code: {
            type: string;
            maxLength: number;
            default: string;
        };
        goods_type: {
            type: string;
            enums: string[];
        };
        passback_params: {
            type: string;
            maxLength: number;
            normalize: typeof utils.normalizePassbackParams;
        };
        extend_params: {
            type: string;
            enums: string[];
        };
        enable_pay_channels: {
            type: string;
            enums: string[];
        };
        disable_pay_channels: {
            type: string;
            enums: string[];
        };
        promo_params: {
            type: string;
            maxLength: number;
        };
        store_id: {
            type: string;
            maxLength: number;
        };
    };
    CreateWebOrder: {
        body: {
            type: string;
            maxLength: number;
        };
        subject: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        out_trade_no: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        timeout_express: {
            type: string;
            maxLength: number;
        };
        time_expire: {
            type: string;
            maxLength: number;
        };
        total_amount: {
            type: string;
            required: boolean;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        seller_id: {
            type: string;
            maxLength: number;
        };
        product_code: {
            type: string;
            maxLength: number;
            default: string;
        };
        goods_type: {
            type: string;
            enums: string[];
        };
        passback_params: {
            type: string;
            maxLength: number;
            normalize: typeof utils.normalizePassbackParams;
        };
        promo_params: {
            type: string;
            maxLength: number;
        };
        extend_params: {
            type: string;
            enums: string[];
        };
        enable_pay_channels: {
            type: string;
            enums: string[];
        };
        disable_pay_channels: {
            type: string;
            enums: string[];
        };
        store_id: {
            type: string;
            maxLength: number;
        };
    };
    CreatePageOrder: {
        body: {
            type: string;
            maxLength: number;
        };
        subject: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        out_trade_no: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        timeout_express: {
            type: string;
            maxLength: number;
        };
        total_amount: {
            type: string;
            required: boolean;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        seller_id: {
            type: string;
            maxLength: number;
        };
        product_code: {
            type: string;
            maxLength: number;
            default: string;
        };
        goods_type: {
            type: string;
            enums: string[];
        };
        passback_params: {
            type: string;
            maxLength: number;
            normalize: typeof utils.normalizePassbackParams;
        };
        promo_params: {
            type: string;
            maxLength: number;
        };
        extend_params: {
            type: string;
            enums: string[];
        };
        enable_pay_channels: {
            type: string;
            enums: string[];
        };
        disable_pay_channels: {
            type: string;
            enums: string[];
        };
        store_id: {
            type: string;
            maxLength: number;
        };
        qr_pay_mode: {
            type: string;
            maxLength: number;
        };
        qrcode_width: {
            type: string;
            maxLength: number;
        };
    };
    QueryOrder: {
        out_trade_no: {
            type: string;
            maxLength: number;
        };
        trade_no: {
            type: string;
            maxLength: number;
        };
    };
    TradeSettle: {
        out_request_no: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        trade_no: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        royalty_parameters: {
            type: string;
        };
        operator_id: {
            type: string;
            maxLength: number;
        };
    };
    CancelOrder: {
        out_trade_no: {
            type: string;
            maxLength: number;
        };
        trade_no: {
            type: string;
            maxLength: number;
        };
    };
    TradeClose: {
        out_trade_no: {
            type: string;
            maxLength: number;
        };
        trade_no: {
            type: string;
            maxLength: number;
        };
        operator_id: {
            type: string;
            maxLength: number;
        };
    };
    TradeRefund: {
        out_trade_no: {
            type: string;
            maxLength: number;
        };
        trade_no: {
            type: string;
            maxLength: number;
        };
        refund_amount: {
            type: string;
            required: boolean;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        refund_reason: {
            type: string;
            maxLength: number;
        };
        out_request_no: {
            type: string;
            maxLength: number;
        };
        operator_id: {
            type: string;
            maxLength: number;
        };
        store_id: {
            type: string;
            maxLength: number;
        };
        terminal_id: {
            type: string;
            maxLength: number;
        };
    };
    TradePrecreate: {
        out_trade_no: {
            type: string;
            maxLength: number;
            required: boolean;
        };
        seller_id: {
            type: string;
            maxLength: number;
        };
        total_amount: {
            type: string;
            required: boolean;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        discountable_amount: {
            type: string;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        undiscountable_amount: {
            type: string;
            maxLength: number;
            normalize: typeof utils.normalizeTotalAmount;
        };
        buyer_logon_id: {
            type: string;
            maxLength: number;
        };
        subject: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        body: {
            type: string;
            maxLength: number;
        };
        goods_detail: {
            type: string;
        };
        operator_id: {
            type: string;
            maxLength: number;
        };
        store_id: {
            type: string;
            maxLength: number;
        };
        terminal_id: {
            type: string;
            maxLength: number;
        };
        extend_params: {
            type: string;
        };
        timeout_express: {
            type: string;
            maxLength: number;
        };
        royalty_info: {
            type: string;
        };
        sub_merchant: {
            type: string;
        };
        alipay_store_id: {
            type: string;
            maxLength: number;
        };
    };
    TradeRefundQuery: {
        out_trade_no: {
            type: string;
            maxLength: number;
        };
        trade_no: {
            type: string;
            maxLength: number;
        };
        out_request_no: {
            type: string;
            required: boolean;
            maxLength: number;
        };
    };
    BillDownloadQuery: {
        bill_type: {
            type: string;
            required: boolean;
            maxLength: number;
        };
        bill_date: {
            type: string;
            required: boolean;
            maxLength: number;
        };
    };
    ToaccountTransfer: {
        out_biz_no: {
            type: string;
            maxLength: number;
            required: boolean;
            desc: string;
        };
        payee_type: {
            type: string;
            required: boolean;
            enums: string[];
            desc: string;
        };
        payee_account: {
            type: string;
            maxLength: number;
            required: boolean;
            desc: string;
        };
        amount: {
            type: string;
            maxLength: number;
            required: boolean;
            desc: string;
        };
        payer_show_name: {
            type: string;
            maxLength: number;
            desc: string;
        };
        payee_real_name: {
            type: string;
            maxLength: number;
            desc: string;
        };
        remark: {
            type: string;
            maxLength: number;
            desc: string;
        };
    };
};
export default _default;
