import crypto from 'crypto';
import config from './config';

export function makeSignStr(params, omit = ['sign']) {
	return Object.keys(params)
		.sort()
		.filter(key => params[key] && omit.indexOf(key) === -1)
		.map(key => {
			const value = typeof params[key] === 'object' ?
				JSON.stringify(params[key]) : params[key];
			return key + '=' + value + '';
		})
		.join('&').trim();
}

export function signAlgorithm(signType) {
	return config.ALIPAY_ALGORITHM_MAPPING[signType];
}

export function makeSign(privKey, params) {
	const signStr = makeSignStr(params);
	const algorithm = signAlgorithm(params.sign_type);
	const signer = crypto.createSign(algorithm);
	signer.update(signStr, params.charset);
	return signer.sign(privKey, "base64");
}

// verify a signed param object
export function verifyParamSign(publicKey, params,
	omit = ['sign', 'sign_type']) {
	if (typeof params !== 'object') return false;

	const sign = params.sign;
	if (!sign) return false;

	const sign_type = params.sign_type || 'RSA2';
	const charset = params.charset || 'utf-8';
	const paramString = makeSignStr(params, omit);
	const algorithm = signAlgorithm(sign_type);
	const verify = crypto.createVerify(algorithm);
	verify.update(paramString, charset);
	return verify.verify(publicKey, sign, 'base64');

}

export function verifySign(publicKey, response, omit, options) {
	const type = responseType(response);
	if (!type || !response.sign) {
		return false;
	} else {
		// const sign = Base64.decode(response.sign)
		const sign = response.sign;
		const resp = makeSignStr(response[type], omit);
		const algorithm = signAlgorithm(options.sign_type);
		const verify = crypto.createVerify(algorithm);
		verify.update(resp, options.charset);
		return verify.verify(publicKey, sign, 'base64');
	}
}


export function responseType(response) {
	const type = Object.keys(config.ALIPAY_API_LIST)
		.map(name => name.replace(/\./g, '_'))
		.find(api => `${api}_response` in response);
	if (type) return type + '_response';
}