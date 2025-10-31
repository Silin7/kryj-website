import api from '@/api/index'

// 用户端-创建视频购买微信预支付订单（生成支付二维码）
export function wxpayvideocreateApi(videoid: any) {
  return api.post(`/api/client/pay/video/${videoid}/wxpay/create`)
}

// 用户端-创建VIP会员微信预支付订单（生成支付二维码）
export function wxpayvipcreateApi(packageid: any) {
  return api.post(`/api/client/pay/vip/${packageid}/wxpay/create`)
}

// 用户端-创建视频购买Alipay预支付订单（生成支付二维码）
export function alipayvideocreateApi(videoid: any) {
  return api.post(`/api/client/pay/video/${videoid}/alipay/create`)
}

// 用户端-创建VIP会员Alipay预支付订单（生成支付二维码）
export function alipayvipcreateApi(packageid: any) {
  return api.post(`/api/client/pay/vip/${packageid}/alipay/create`)
}


// 用户端-查询支付状态（0=视频，1=VIP）
export function payvideostatusApi(itemid: any, videoid: any) {
  return api.get(`/api/client/pay/${itemid}/${videoid}/status`)
}


// 用户端-获取视频播放地址（需PayRecord存在且status=1）
export function videoplayApi(videoid: any) {
  return api.get(`/api/client/pay/video/${videoid}/play`)
}

// 用户端-获取视频下载地址（需PayRecord存在且status=1）
export function videodownloadApi(videoid: any) {
  return api.get(`/api/client/pay/video/${videoid}/download`)
}

// 用户端-获取当前用户的支付记录
export function payrecordsApi(params: any) {
  return api.get('/api/client/pay/records', {
    params
  })
}

// 微信支付回调-创建正式支付记录
export function paynotifywechatApi(data: any) {
  return api.post(`/api/client/pay/notify/wechat`, null, {
    params: {
      ...data,
    },
  })
}

// 支付宝支付回调-创建正式支付记录
export function paynotifyalipayApi(data: any) {
  return api.post(`/api/client/pay/notify/alipay`, null, {
    params: {
      ...data,
    },
  })
}

// 用户端-轮询支付状态（通用：微信/支付宝，基于订单号精准查询）
export function payouttradenostatusApi(outtradeno: any, data: any) {
  return api.post(`/api/client/pay/order/${outtradeno}/status/poll`, null, {
    params: {
      ...data,
    },
  })
}

