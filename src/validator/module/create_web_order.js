import * as utils from '../utils';

export default {
	body: {
		type: 'string',
		maxLength: 128
	},
	subject: {
		type: 'string',
		required: true,
		maxLength: 256
	},
	out_trade_no: {
		type: 'string',
		required: true,
		maxLength: 64
	},
	timeout_express: {
		type: 'string',
		maxLength: 6
	},
	total_amount: {
		type: 'string',
		required: true,
		maxLength: 9,
		normalize: utils.normalizeTotalAmount
	},
	seller_id: {
		type: 'string',
		maxLength: 16
	},
	product_code: {
		type: 'string',
		maxLength: 64,
		default: 'QUICK_WAP_PAY'
	},
	goods_type: {
		type: 'enum',
		enums: ['0', '1']
	},
	passback_params: {
		type: 'string',
		maxLength: 512,
		normalize: utils.normalizePassbackParams
	},
	promo_params: {
		type: 'string',
		maxLength: 512
	},
	extend_params: utils.extendParams,
	enable_pay_channels: utils.payChannel,
	disable_pay_channels: utils.payChannel,
	auth_token: {
		type: 'string',
		maxLength: 40
	},
	store_id: {
		type: 'string',
		maxLength: 32
	}
};