import api from '@/api/index'

// 发送手机验证码
export function sendverificationcodeApi(data: any) {
  return api.post('/api/client/sms/sms/send-verification-code', null, {
    params: {
      ...data,
    },
  })
}

// 验证手机验证码
export function verifyverificationcodeApi(data: any) {
  return api.post('/api/client/sms/sms/verify-verification-code', null, {
    params: {
      ...data,
    },
  })
}

// 手机号注册
export function baseregisterApi(data: any) {
  return api.post('/api/client/base/register', null, {
    params: {
      ...data,
    },
  })
}

// 验证码登录
export function baselogincodeApi(data: any) {
  return api.post('/api/client/base/login/code', null, {
    params: {
      ...data,
    },
  })
}

// 密码登录
export function baseloginpwdApi(data: any) {
  return api.post('/api/client/base/login/password', null, {
    params: {
      ...data,
    },
  })
}

// 找回密码
export function baseforgotdpwdApi(data: any) {
  return api.post('/api/client/base/forgot-password', null, {
    params: {
      ...data,
    },
  })
}

// 退出登录
export function baselogoutdApi(data: any) {
  return api.post('/api/client/base/logout', null, {
    params: {
      ...data,
    },
  })
}

// 检查登录状态
export function checkloinApi() {
  return api.get('/api/client/base/check-login')
}

// 获取当前用户信息
export function currentuserApi() {
  return api.get('/api/client/base/current-user')
}

// 获取当前用户的企业信息
export function currentcompanyApi() {
  return api.get('/api/client/base/current-company')
}

// 修改密码（登录状态）
export function updayepasswordApi(data: any) {
  return api.post('/api/client/base/update-password', data)
}