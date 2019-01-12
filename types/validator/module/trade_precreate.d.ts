import * as utils from '../utils';
declare const _default: {
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
export default _default;
