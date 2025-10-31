import api from '@/api/index'

// 用户端-根据解决方案分类ID获取需求表单（含multiitems，用于前端渲染表单；支持匿名访问）
export function requirementsbycateApi(params: any) {
  return api.get('/api/client/solution/requirements/by-cate', {
    params
  })
}

// 用户端-提交解决方案需求订单（需登录且账号活跃；user_id由登录态自动获取，无需前端传递）
export function solutionordersApi(data: any) {
  return api.post('/api/client/solution/orders', data)
}
