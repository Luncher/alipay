export declare const RESPONSE_MESSAGE: {
    '0': string;
    '1': string;
    '-1': string;
    '-2': string;
    '-3': string;
};
export declare enum RESPONSE_CODE {
    SUCCESS = 0,
    PROCESSING = 1,
    ERROR = -1,
    PERMISSION_DENIED = -2,
    SIGN_ERROR = -3
}
export interface AlipayOption {
    appPrivKeyFile: string;
    alipayPubKeyFile: string;
    app_id: string;
    notify_url: string;
}
