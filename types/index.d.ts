import { AlipayOption, GateWay, AlipayTradeSettleArgs, AlipayBillQueryArgs, AlipayPublicArgs, AlipayToaccountTransferArgs, AlipayTradeRefundArgs, AlipayTradeCloseArgs, AlipayQueryOrderArgs, AlipayCancelOrderArgs, AlipayCreateOrderArgs, AlipayTradePrecreateArgs, AlipayNormalResponseCode, AlipayTradeRefundQueryArgs, ApiResponse, AlipayNotifyArgs, VerifyPamentArgs } from './config';
export default class Alipay {
    gateWay: GateWay;
    options: AlipayOption;
    constructor(options: AlipayOption);
    normalizeOptions(options: AlipayOption): AlipayOption;
    readonly appId: string;
    readonly privKey: string;
    readonly publicKey: string;
    readonly notifyUrl: string | undefined;
    validateBasicParams(method: any, basicParams: any): Promise<AlipayPublicArgs>;
    validateAPIParams(method: any, options: any): any;
    validateParams(method: any, publicParams: any, basicParams: any): Promise<AlipayPublicArgs>;
    makeResponse(response: any): ApiResponse;
    makeRequest(params: any, options?: {}): Promise<ApiResponse>;
    verifyPayment(params: VerifyPamentArgs): Promise<ApiResponse>;
    makeNotifyResponse(params: AlipayNotifyArgs): Promise<ApiResponse>;
    createWebOrderURL(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    createPageOrderURL(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    createPageOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    createWebOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    createOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<{
        code: AlipayNormalResponseCode;
        message: string;
        data: string;
    }>;
    createAppOrder(publicParams: AlipayCreateOrderArgs, basicParams?: AlipayPublicArgs): Promise<{
        code: AlipayNormalResponseCode;
        message: string;
        data: string;
    }>;
    queryOrder(publicParams: AlipayQueryOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    cancelOrder(publicParams: AlipayCancelOrderArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    tradeClose(publicParams: AlipayTradeCloseArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    tradeRefund(publicParams: AlipayTradeRefundArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    tradeRefundQuery(publicParams: AlipayTradeRefundQueryArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    billDownloadQuery(publicParams: AlipayBillQueryArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    tradePrecreate(publicParams: AlipayTradePrecreateArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    tradeSettle(publicParams: AlipayTradeSettleArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
    toaccountTransfer(publicParams: AlipayToaccountTransferArgs, basicParams?: AlipayPublicArgs): Promise<ApiResponse>;
}
