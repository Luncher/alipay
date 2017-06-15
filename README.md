# alipay

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
<!--[![Codecov Status][codecov-image]][codecov-url]-->
[![David Status][david-image]][david-url]
<!--[![NPM download][download-image]][download-url]-->

[npm-url]: https://www.npmjs.com/package/alipay-mobile
[npm-image]: https://img.shields.io/npm/v/alipay-mobile.svg?style=flat
[download-url]: https://www.npmjs.com/package/alipay-mobile
[download-image]: https://img.shields.io/npm/dm/alipay-mobile.svg?style=flat
[david-url]: https://david-dm.org/Luncher/alipay-mobile
[david-image]: https://david-dm.org/Luncher/alipay-mobile.svg?style=flat
[travis-url]: https://travis-ci.org/Luncher/alipay
[travis-image]: https://img.shields.io/travis/Luncher/alipay.svg?style=flat
[codecov-url]: https://codecov.io/gh/Luncher/alipay
[codecov-image]: https://img.shields.io/codecov/c/github/Luncher/alipay.svg?style=flat


[蚂蚁金服开放平台](https://openhome.alipay.com/platform/home.htm)`Node.js` SDK。

---

## 安装

``` javascript

npm i alipay-mobile -S

```

## 基本使用

``` javascript
const fs = require('fs')
const Alipay = require('alipay-mobile')

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

>为了方便异步处理，所有接口均返回`Promise`

---

## API 说明

### 创建订单`createOrder`

>用于返回给APP,传递给支付宝端发起交易申请

```javascript
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
  //result.data 用于返回给APP,传递给支付宝端发起交易申请
})
```

---

### 创建网页订单`createWebOrder`

>该接口用于支付宝手机网页支付，服务端调用该接口生成一个`URL`返回给客户端, 客户端拿到该`URL`之后跳转到该URL发起支付请求。支付结束支付宝会跳转到客户端填写的`return_url`。

``` javascript
const service = new Alipay(options)
const data = {
  subject: '辣条',
  out_trade_no: '1232423',
  total_amount: '100'
}
const basicParams = {
  return_url: 'http://xxx.com'
}
return service.createWebOrder(data, basicParams)
.then(result => {
  assert(result.code == 0, result.message)
  assert(result.message == 'success', result.message)
})
```

---

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

### 取消订单`cancelOrder`

``` javascript
const outTradeNo = 'foobar'
return service.cancelOrder({ out_trade_no: outTradeNo })
.then(result => {
  assert(result.code == -1, result.message)
  assert(result.message == 'error', result.message)
  assert(result.data.code === '40004')
  assert(result.data.sub_msg === '交易不存在')
})
```

---

### 验证支付结果`verifyPayment`

```javascript
const params = {
  memo: "xxxx",
  result: "xxxx",
  resultStatus: "xxx"
}
return service.verifyPayment(params)

```

---

### 异步通知校验`makeNotifyResponse`

```javascript
const params = {
  sign: 'xxxxxxxx',
  sign_type: 'xxxxx',
  ...
}

return service.makeNotifyResponse(params)

```

#### 异步通知应答

>在接收到蚂蚁金服服务器的订单状态变更通知之后，需要进行应答，有两种(成功、失败)应答类型：

``` javascript
import AlipayConfig from 'alipay-mobile/config'

console.log(AlipayConfig.ALIPAY_NOTIFY_SUCCESS) // 'success'

console.log(AlipayConfig.ALIPAY_NOTIFY_FAILURE) // 'failure'

```

---

### 交易关闭`tradeClose`

```javascript
const params = {
  out_trade_no: 'xxxxx'
}
return service.tradeClose(params)

```

---

### 交易退款`tradeRefund`

```javascript
const params = {
  out_trade_no: 'xxxxx'
}
return service.tradeRefund(params)
```

---

### 交易退款查询`tradeRefundQuery`

```javascript
const params = {
  out_trade_no: 'xxxxx'
}
return service.tradeRefundQuery(params)
```

---

### 查询账单下载地址`billDownloadQuery`

```javascript
const params = {
  bill_type: 'trade',
  bill_date: '2017-05-06'
}
return service.billDownloadQuery(params)

```

---

### 交易预创建`tradePrecreate`

```javascript
const params = {
  out_trade_no: 'xxx',
  seller_id: 'asad',
  total_amount: '231wawsda',
  subject: '面包'
}
return service.tradePrecreate(params)

```

---

### 交易结算`tradeSettle`

```javascript
const params = {
  out_request_no: 'xxx'
}
return service.tradeSettle(params)
```

---

## 功能列表

- [x] 创建订单
- [x] 取消订单
- [x] 订单查询
- [x] 验证支付状态
- [x] 订单状态异步推送
- [x] 预创建订单
- [x] 申请退款
- [x] 退款查询
- [x] 交易结算
- [x] 关闭交易
- [x] 账单下载地址查询


---

## LICENSE

  [MIT](https://mit-license.org/)
