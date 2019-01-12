import * as config from './config';
export declare function makeSignStr(params: any, omit?: string[]): string;
export declare function signAlgorithm(signType: config.AlipayAlgorithm): string;
export declare function makeSign(privKey: any, params: any): string;
export declare function verifySign(publicKey: any, response: any, omit: any, options: any): boolean;
export declare function responseType(response: any): string;
