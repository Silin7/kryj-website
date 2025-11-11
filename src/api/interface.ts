import api from '@/api/index'

// 登录注册 - 验证码
export function authcodeApi() {
  return api.get('/app-api/member/auth/code')
}

// 登录注册 - 验证码 参数 -- mobile: 手机号; scene: 4 忘记密码 5 注册
export function authsmscodeApi(data: any) {
  return api.post('/app-api/member/auth/send-sms-code', data)
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

// 登录注册 - 退出登录
export function baselogoutdApi() {
  return api.post('/app-api/member/auth/logout')
}

// 首页 - 主页数据
export function zhhomeApi() {
  return api.post('/app-api/cms/content/zh/home')
}

// 页脚
export function zhfooterApi() {
  return api.post('/app-api/cms/content/zh/footer')
}

// AI预测平台  体验次数
export function checkTimeApi() {
  return api.post('/app-api/member/auth/getCheckTime')
}

// 药物预测网用户使用协议
export function upaywycyxApi() {
  return api.post('/app-api/cms/content/user-privacy-agreement/ywycyx')
}

// 隐私政策
export function upayszcApi() {
  return api.post('/app-api/cms/content/user-privacy-agreement/yszc')
}

// 儿童隐私协议
export function upachildysxyApi() {
  return api.post('/app-api/cms/content/user-privacy-agreement/childysxy')
}

// 友情链接
export function friendlinkApi() {
  return api.post('/app-api/cms/content/friend-link')
}

// 获取套餐 需登录
export function cusedlistApi() {
  return api.get('/app-api/member/combo/get-used-list')
}

