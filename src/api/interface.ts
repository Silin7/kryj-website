import api from '@/api/index'

// 登录注册 - 验证码
export function authcodeApi() {
  return api.get('/app-api/member/auth/code')
}

// 登录注册 - 验证码 参数 -- mobile: 手机号; scene: 2 修改手机号 3 重置密码 4 忘记密码 5 注册
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

// 登录注册 - 重置密码
export function resetpasswordApi(data: any) {
  return api.put('/app-api/member/user/reset-password', data)
}

// 登录注册 - 修改密码
export function updatepasswordApi(data: any) {
  return api.put('/app-api/member/user/update-password', data)
}

// 登录注册 - 修改手机号
export function updatemobileApi(data: any) {
  return api.put('/app-api/member/user/update-mobile', data)
}

// 登录注册 - 用户信息
export function authinfoApi() {
  return api.post('/app-api/member/user/get')
}

// 登录注册 - 退出登录
export function baselogoutdApi() {
  return api.post('/app-api/member/auth/logout')
}

// 首页 - 主页数据
export function zhhomeApi() {
  return api.post('/app-api/cms/content/zh/home')
}

// 关于我们 - banner
export function zhabouseoApi() {
  return api.post('/app-api/cms/content/diy_seo/zh/about')
}

// 关于我们 - 数据
export function zhaboutcontentApi() {
  return api.post('/app-api/cms/content/diy_content/zh/about')
}

// 页脚
export function zhfooterApi() {
  return api.post('/app-api/cms/content/zh/footer')
}

// AI预测平台 - banner
export function zhaicheckApi() {
  return api.post('/app-api/cms/content/diy_seo/zh/ai-check')
}

// AI预测平台 - 体验次数
export function checkTimeApi() {
  return api.post('/app-api/member/auth/getCheckTime')
}

// AI预测平台 - 套餐列表
export function cusedlistApi() {
  return api.get('/app-api/member/combo/get-used-list')
}

// AI预测平台 - 创建订单
export function ordercreateApi(data: any) {
  return api.post('/app-api/member/order/create', data)
}

// AI预测平台 - 查询订单状态
export function orderstatusApi(orderId: any) {
  return api.get('/app-api/member/order/status?orderId=' + orderId)
}

// AI预测平台 - 订单列表
export function orderpageApi(params: any) {
  return api.get('/app-api/member/order/page', {
    params,
  })
}

// AI预测平台 - 我的检测记录
export function checkrecordApi(params: any) {
  return api.get('/app-api/member/ai/check-record', {
    params,
  })
}

// AI预测平台 - AI检测-疾病 不分页 无需登录
export function checkdiseaseApi() {
  return api.get('/app-api/member/ai/check-disease')
}

// AI预测平台 - AI检测-病种 分页 无需登录
export function checkdrugsApi(params: any) {
  return api.get('/app-api/member/ai/check-drugs', {
    params,
  })
}

// AI预测平台 - AI检测
export function aicheckApi(data: any) {
  return api.post('/app-api/member/ai/check', data)
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

