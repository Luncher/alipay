# alipay-mobile

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![David Status][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-url]: https://www.npmjs.com/package/alipay-mobile
[npm-image]: https://img.shields.io/npm/v/alipay-mobile.svg?style=flat
[download-url]: https://www.npmjs.com/package/alipay-mobile
[download-image]: https://img.shields.io/npm/dm/alipay-mobile.svg?style=flat
[david-url]: https://david-dm.org/Luncher/alipay-mobile
[david-image]: https://david-dm.org/Luncher/alipay-mobile.svg?style=flat
[travis-url]: https://travis-ci.org/Luncher/alipay-mobile
[travis-image]: https://img.shields.io/travis/Luncher/alipay-mobile.svg?style=flat
[codecov-url]: https://codecov.io/gh/Luncher/alipay-mobile
[codecov-image]: https://img.shields.io/codecov/c/github/Luncher/alipay-mobile.svg?style=flat


[蚂蚁金服开放平台](https://openhome.alipay.com/platform/home.htm)`Node.js` SDK。

---

## 测试

+ 1 `git clone`

+ 2 `设置 appid 以及秘钥和公钥`

+ 3 `npm t` 运行测试

## 安装

``` javascript

npm install alipay-mobile -S

```

## 基本使用

``` javascript
import Alipay from 'alipay-mobile'

const read = filename => {
  return fs.readFileSync(path.resolve(__dirname, filename))
}

//app_id: 开放平台 appid
//appPrivKeyFile: 你的应用私钥
//alipayPubKeyFile: 蚂蚁金服公钥
const options = {
  app_id: '2016080100137766',
  appPrivKeyFile: read('./keys/app_priv_key.pem'),
  alipayPubKeyFile: read('./keys/alipay_public_key.pem')
}

const service = new Alipay(options)
const data = {
  subject: '辣条',
  out_trade_no: '1232423',
  total_amount: '100'
}
return service.createOrder(data)
.then(result => {
  assert(result.code == 0, result.message)
  assert(result.message == 'success', result.message)
})

```

## 说明

### 接口返回错误码以及错误信息

``` javascript
{
  '0': 'success',
  '1': 'processing',
  '-1': 'error',
  '-2': 'permission denied',
  '-3': 'sign error'
}
```

### 接口返回格式

``` javascript
{
  code: 错误码,
  message: 错误信息,
  data: 蚂蚁金服返回的原始数据//可能为空对象
}
```

### 服务器异步通知应答

>在接收到蚂蚁金服服务器的订单状态变更通知之后，需要进行应答，有两种(成功、失败)应答类型：

``` javascript
import AlipayConfig from 'alipay-mobile/config'

console.log(AlipayConfig.ALIPAY_NOTIFY_SUCCESS) // 'success'

console.log(AlipayConfig.ALIPAY_NOTIFY_FAILURE) // 'failure'

```



## API 说明

### 订单查询`queryOrder`

``` javascript
const outTradeNo = '1232423'
return service.queryOrder({ out_trade_no: outTradeNo })
.then(result => {
  assert(result.code == -1, result.message)
  assert(result.message == 'error', result.message)
  assert(result.data.code === '40004')
  assert(result.data.sub_msg === '交易不存在')
})
```

---

## 功能列表

- [x] 创建订单
- [x] 关闭交易
- [x] 订单主动查询
- [x] 订单异步推送
- [x] 预创建订单
- [x] 取消订单
- [x] 申请退款
- [x] 退款查询
- [x] 交易结算
- [x] 验证支付状态
- [x] 账单下载地址查询


---

## LICENSE

  [MIT](https://mit-license.org/)