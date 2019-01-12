export default {
  out_biz_no: {
    type: 'string',
    maxLength: 64,
    required: true,    
    desc: '商户转账唯一订单号'
  },
  payee_type: {
    type: 'enum',
    required: true,    
    enums: ['ALIPAY_USERID', 'ALIPAY_LOGONID'],
    desc: '收款方账户类型'  
  },
  payee_account: {
    type: 'string',
    maxLength: 100, 
    required: true,    
    desc: '收款方账户'  
  },
  amount: {
    type: 'string',
    maxLength: 16, 
    required: true,    
    desc: '转账金额，单位：元'    
  },
  payer_show_name: {
    type: 'string',
    maxLength: 100,    
    desc: '付款方姓名'    
  },
  payee_real_name: {
    type: 'string',
    maxLength: 100,
    desc: '收款方真实姓名'    
  },
  remark: {
    type: 'string',
    maxLength: 200,
    desc: '转账备注'    
  }
}