import api from '@/api/index'

// 登录注册 - 验证码
export function authcodeApi() {
  return api.get('/app-api/member/auth/code')
}

// 登录注册 - 注册
export function authregisterApi(data: any) {
  return api.post('/app-api/member/auth/register', data)
}

// 登录注册 - 登录
export function authloginApi(data: any) {
  return api.post('/app-api/member/auth/login', data)
}

// 登录注册 - 用户信息
export function authinfoApi() {
  return api.post('/app-api/member/auth/get')
}

// AI平台 体验次数
export function checkTimeApi() {
  return api.post('/app-api/member/auth/getCheckTime')
}