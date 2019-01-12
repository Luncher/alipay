import * as utils from '../utils';
declare const _default: {
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
export default _default;
