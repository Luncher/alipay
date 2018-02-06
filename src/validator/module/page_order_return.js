import * as utils from '../utils';

export default {
	total_amount: {
		type: 'string',
		required: true,
		maxLength: 9,
		normalize: utils.normalizeTotalAmount
	},
	trade_no:{
		type: 'string',
		required: true,
		maxLength: 64
	},
	out_trade_no: {
		type: 'string',
		required: true,
		maxLength: 64
	},
	seller_id: {
		type: 'string',
		maxLength: 16
	}
};