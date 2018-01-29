import urllib from 'urllib';
import Promise from 'bluebird';
import config from './config';
import * as utils from './utils';
import Validator from './validator';
import {
	RESPONSE_MESSAGE,
	METHOD_TYPES
} from './config';

const isTest = process.env.NODE_ENV === 'test';
const GATEWAY = isTest ? config.ALIPAY_DEV_GATEWAY : config.ALIPAY_GATEWAY;

export default class Alipay {
	constructor(options = {}) {
		// read in key file using path
		const fs = require('fs');

		const read = filename => {
			return fs.readFileSync(filename);
		};

		if (!(options.appPrivKeyFile || options.privateKeyPath) ||
			!(options.alipayPubKeyFile || options.aliKeyPath)) {
			throw new Error('Must provide app private key and Alipay public key');
		}

		if (!options.appPrivKeyFile) {
			options.appPrivKeyFile = read(options.privateKeyPath);
		}
		if (!options.alipayPubKeyFile) {
			options.alipayPubKeyFile = read(options.aliKeyPath);
		}

		this.privKey = options.appPrivKeyFile;
		this.publicKey = options.alipayPubKeyFile;

		if (!this.privKey || !this.publicKey) {
			throw new Error('Invalid appPrivKeyFile or alipayPubKeyFile');
		}
		this.normalizeKeys();
		const omit = ['appPrivKeyFile', 'alipayPubKeyFile'];
		this.options = Object.assign({}, Object.keys(options).reduce((acc, val) => {
			if (omit.indexOf(val) === -1) {
				acc[val] = options[val];
			}
			return acc;
		}, {}));
	}

	normalizeKeys() {
		if (this.publicKey.indexOf('BEGIN PUBLIC KEY') === -1) {
			this.publicKey = "-----BEGIN PUBLIC KEY-----\n" + this.publicKey +
				"\n-----END PUBLIC KEY-----";
		}
		if (this.privKey.indexOf('BEGIN RSA PRIVATE KEY') === -1) {
			this.privKey = "-----BEGIN RSA PRIVATE KEY-----\n" + this.privKey +
				"\n-----END RSA PRIVATE KEY-----";
		}
	}

	validateBasicParams(method, basicParams) {
		const params = Object.assign({}, this.options, basicParams, {
			method
		});
		return Validator.validateBasicParams(params);
	}

	validateAPIParams(method, options) {
		return Validator.validateAPIParams(method, options);
	}

	validateParams(method, publicParams, basicParams) {
		return Promise.all([
				this.validateBasicParams(method, basicParams),
				this.validateAPIParams(method, publicParams)
			])
			.then(result => {
				return Object.assign({}, result[0], {
					biz_content: JSON.stringify(result[1])
				});
			})
			.then(params => {
				params.sign = utils.makeSign(this.privKey, params);
				return params;
			});
	}

	makeResponse(response) {
		const isSucceed = response => {
			return ['10000'].indexOf(response.code) !== -1;
		};
		const isPermissionDenied = response => {
			return ['40006'].indexOf(response.code) !== -1;
		};
		const result = {};
		const respType = utils.responseType(response);
		const respData = response[respType];
		if (isSucceed(respData)) {
			result.code = '0';
		} else if (isPermissionDenied(respData)) {
			result.code = '-2';
		} else {
			result.code = '-1';
		}
		result.data = response[respType];
		result.message = RESPONSE_MESSAGE[result.code];

		return result;
	}

	makeRequest(params, options = {}) {
		const httpclient = urllib.create();
		return httpclient.request(GATEWAY, Object.assign({}, {
				data: params,
				dataType: 'json',
				dataAsQueryString: true
			}, options))
			.then(resp => this.makeResponse(resp.data));
	}

	verifyPayment(params) {
		const isSuccess = () => {
			return ['9000'].indexOf(params.resultStatus) !== -1;
		};
		const isProcessing = () => {
			return ['8000', '6004'].indexOf(params.resultStatus) !== -1;
		};

		return this.validateAPIParams(METHOD_TYPES.VERIFY_PAYMENT, params)
			.then(() => {
				if (isSuccess()) {
					return this.makeResponse(params.result);
				} else {
					const code = isProcessing() ? '1' : '-1';
					return {
						code,
						message: RESPONSE_MESSAGE[code]
					};
				}
			})
			.catch(err => ({
				code: '-1',
				message: err.message,
				data: {}
			}));
	}

	makeNotifyResponse(params) {
		return Promise.resolve()
			.then(() => {
				return this.validateAPIParams(METHOD_TYPES.NOTIFY_RESPONSE, params);
			})
			.then(() => {
				const resp = {
					sign: params.sign,
					'async_notify_response': params,
					sign_type: params.sign_type
				};
				return utils.verifySign(this.publicKey, resp, ['sign', 'sign_type'], params);
			})
			.then(valid => {
				const code = valid ? '0' : '-2';
				return {
					code,
					message: RESPONSE_MESSAGE[code],
					data: params
				};
			})
			.catch(err => ({
				code: '-1',
				message: err.message,
				data: {}
			}));
	}

	createWebOrderURL(publicParams, basicParams = {}) {
		return this.createWebOrder(publicParams, basicParams)
			.then(result => {
				if (result.code === 0) {
					result.data = GATEWAY + '?' + result.data;
				}
				return result;
			});
	}

	createPageOrderURL(publicParams, basicParams = {}) {
		return this.createPageOrder(publicParams, basicParams)
			.then(result => {
				if (result.code === 0) {
					result.data = GATEWAY + '?' + result.data;
				}
				return result;
			});
	}

	createPageOrder(publicParams, basicParams = {}) {
		let sign;
		return this.validateParams(METHOD_TYPES.CREATE_PAGE_ORDER, publicParams, basicParams)
			.then(params => {
				sign = params.sign;
				return utils.makeSignStr(params);
			})
			.then(signStr => {
				return signStr.split('&').reduce((acc, cur) => {
					const [key, value] = cur.split('=');
					return acc + key + '=' + encodeURIComponent(value) + '&';
				}, "").slice(0, -1);
			})
			.then(data => {
				data = data + '&sign=' + encodeURIComponent(sign);
				return {
					code: 0,
					message: RESPONSE_MESSAGE[0],
					data
				};
			})
			.catch(err => ({
				code: '-1',
				message: err.message,
				data: {}
			}));
	}

	createWebOrder(publicParams, basicParams = {}) {
		let sign;
		return this.validateParams(METHOD_TYPES.CREATE_WEB_ORDER, publicParams, basicParams)
			.then(params => {
				sign = params.sign;
				return utils.makeSignStr(params);
			})
			.then(signStr => {
				return signStr.split('&').reduce((acc, cur) => {
					const [key, value] = cur.split('=');
					return acc + key + '=' + encodeURIComponent(value) + '&';
				}, "").slice(0, -1);
			})
			.then(data => {
				data = data + '&sign=' + encodeURIComponent(sign);
				return {
					code: 0,
					message: RESPONSE_MESSAGE[0],
					data
				};
			})
			.catch(err => ({
				code: '-1',
				message: err.message,
				data: {}
			}));
	}

	//Compat
	createOrder(publicParams, basicParams = {}) {
		return this.createAppOrder(publicParams, basicParams);
	}

	createAppOrder(publicParams, basicParams = {}) {
		let sign;
		return this.validateParams(METHOD_TYPES.CREATE_APP_ORDER, publicParams, basicParams)
			.then(params => {
				sign = params.sign;
				return utils.makeSignStr(params);
			})
			.then(signStr => {
				return signStr.split('&').reduce((acc, cur) => {
					const [key, value] = cur.split('=');
					return acc + key + '=' + encodeURIComponent(value) + '&';
				}, "").slice(0, -1);
			})
			.then(data => {
				data = data + '&sign=' + encodeURIComponent(sign);
				return {
					code: 0,
					message: RESPONSE_MESSAGE[0],
					data
				};
			})
			.catch(err => ({
				code: '-1',
				message: err.message,
				data: {}
			}));
	}

	queryOrder(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				if (!publicParams.out_trade_no && !publicParams.trade_no) {
					throw new Error("outTradeNo and tradeNo can not both omit.");
				}
				return this.validateParams(METHOD_TYPES.QUERY_ORDER, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			})
			.catch(err => ({
				code: '-1',
				message: err.message,
				data: {}
			}));
	}

	cancelOrder(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				if (!publicParams.out_trade_no && !publicParams.trade_no) {
					throw new Error("outTradeNo and tradeNo can not both omit.");
				}
				return this.validateParams(METHOD_TYPES.CANCEL_ORDER, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	tradeClose(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				if (!publicParams.out_trade_no && !publicParams.trade_no) {
					throw new Error("outTradeNo and tradeNo can not both omit.");
				}
				return this.validateParams(METHOD_TYPES.TRADE_CLOSE, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	tradeRefund(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				if (!publicParams.out_trade_no && !publicParams.trade_no) {
					throw new Error("outTradeNo and tradeNo can not both omit.");
				}
				return this.validateParams(METHOD_TYPES.TRADE_REFUND, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	tradeRefundQuery(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				if (!publicParams.out_trade_no && !publicParams.trade_no) {
					throw new Error("outTradeNo and tradeNo can not both omit.");
				}
				return this.validateParams(METHOD_TYPES.TRADE_REFUND_QUERY, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	billDownloadQuery(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				return this.validateParams(METHOD_TYPES.BILL_DOWNLOAD_QUERY, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	tradePrecreate(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				return this.validateParams(METHOD_TYPES.TRADE_PRECREATE, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	tradeSettle(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				return this.validateParams(METHOD_TYPES.TRADE_SETTLE, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}

	toaccountTransfer(publicParams, basicParams = {}) {
		return Promise.resolve()
			.then(() => {
				return this.validateParams(METHOD_TYPES.FUND_TRANS_TOACCOUNT_TRANSFER, publicParams, basicParams)
					.then(params => {
						return this.makeRequest(params);
					});
			});
	}
}