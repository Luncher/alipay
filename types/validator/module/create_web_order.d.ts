import * as Joi from 'joi';
export declare const createWebOrderSchema: Joi.ObjectSchema;
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
        normalize: any;
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
        normalize: any;
    };
    promo_params: {
        type: string;
        maxLength: number;
    };
    extend_params: any;
    enable_pay_channels: any;
    disable_pay_channels: any;
    store_id: {
        type: string;
        maxLength: number;
    };
};
export default _default;
