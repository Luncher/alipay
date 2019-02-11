import * as config from 'config';
export declare function makeSignStr(params: object, omit?: string[]): string;
export declare function getSignAlgorithm(signType: config.AlipayAlgorithmSignType): config.AlipayAlgorithm;
export declare function makeSign(privKey: string, params: config.AlipayPublicArgs): string;
export declare function verifySign(publicKey: string, response: config.AlipayVerifySignArgs, omit: string[], options: config.AlipayNotifyArgs): boolean;
export declare function getResponseType(response: config.GetResponseTypeArgs): config.AlipayResponseType;
