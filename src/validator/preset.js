import * as utils from './utils';
import Notify from './module/notify';
import TradeClose from './module/trade_close';
import TradeSettle from './module/trade_settle';
import TradeRefund from './module/trade_refund';
import QueryOrder from './module/query_order';
import CreateAppOrder from './module/create_app_order';
import CreateWebOrder from './module/create_web_order';
import CreatePageOrder from './module/create_page_order';
import PageOrderReturn from './module/page_order_return';
import CancelOrder from './module/cancel_order';
import VerifyPayment from './module/verify_payment';
import TradePrecreate from './module/trade_precreate';
import TradeRefundQuery from './module/trade_refund_query';
import BillDownloadQuery from './module/bill_download_query';
import ToaccountTransfer from './module/toaccount_transfer';

const Basic = {
  app_id: {
    type: 'string',
    required: true,
    maxLength: 32
  },
  method: {
    type: 'string',
    required: true,
    maxLength: 128
  },
  format: {
    type: 'string',
    default: 'JSON',
    maxLength: 40
  },
  return_url: { //用于网页支付回调
    type: 'string',
    maxLength: 256
  },
  charset: {
    type: 'string',
    required: true,
    default: 'utf-8',
    maxLength: 10
  },
  sign_type: {
    type: 'string',
    required: true,
    default: 'RSA2',
    maxLength: 10
  },
  timestamp: {
    type: 'string',
    required: true,
    maxLength: 19,
    default: utils.createTimeStamp
  },
  version: {
    type: 'string',
    required: true,
    default: '1.0',
    maxLength: 3
  },
  notify_url: {
    type: 'string',
    maxLength: 256
  }
};

export default {
  Basic,  
  Notify,
  VerifyPayment,
  CreateAppOrder,
  CreateWebOrder,
  CreatePageOrder,
  PageOrderReturn,
  QueryOrder,
  TradeSettle,
  CancelOrder,
  TradeClose,
  TradeRefund,
  TradePrecreate,
  TradeRefundQuery,
  BillDownloadQuery,
  ToaccountTransfer
};