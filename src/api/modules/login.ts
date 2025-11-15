import api from '@/api/index'

// 验证码
export function authcodeApi() {
  return api.get('/app-api/member/auth/code')
}

// 注册
export function authregisterApi(data: any) {
  return api.post('/app-api/member/auth/register', data)
}

// 登录
export function authloginApi(data: any) {
  return api.post('/app-api/member/auth/login', data)
}

// 用户信息
export function authinfoApi() {
  return api.post('/app-api/member/auth/get')
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
