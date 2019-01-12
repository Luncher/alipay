declare const _default: {
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
export default _default;
