import * as utils from '../utils';
declare const _default: {
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
export default _default;
