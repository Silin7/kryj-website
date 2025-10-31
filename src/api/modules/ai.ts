import api from '@/api/index'


// AI应用成功案例-获取前N条合作案例（公开接口，支持分类筛选，默认10条）
export function aialtopApi() {
  return api.get('/api/client/case/top')
}

// AI应用成功案例-合作案例分页列表（公开接口，支持分类、关键词筛选）
export function aiallistApi(params: any) {
  return api.get('/api/client/case', {
    params,
  })
}

// AI应用成功案例-合作案例详情（公开接口，仅返回启用且未删除的案例）
export function aialdetailsApi(caseid: any) {
  return api.get(`/api/client/case/${caseid}`)
}

// 获取AI赋能应用详情（含关联板块内容）
export function aidetailsApi(params: any) {
  return api.get('/api/client/syscate/aiappdetail', {
    params,
  })
}