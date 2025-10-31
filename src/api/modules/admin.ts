import api from '@/api/index'

// 用户中心 - 首页
export function homestatisticApi() {
  return api.get('/api/client/statistic/statistics')
}

// 获取有效案例类型列表（仅主分类）
export function casetypesApi() {
  return api.get('/api/client/ucompany/casetypes')
}

// 获取当前用户的企业信息
export function companyinfoApi(params: any) {
  return api.get('/api/client/ucompany/my-company', {
    params,
  })
}

// 保存当前用户的企业信息（创建/更新）
export function savecompanyinfoApi(data: any) {
  return api.post('/api/client/ucompany/my-company', data)
}

// 获取当前用户企业的资质列表
export function certificatesApi(params: any) {
  return api.get('/api/client/ucompany/certificates', {
    params,
  })
}

// 新增企业资质
export function savecertificatesApi(data: any) {
  return api.post('/api/client/ucompany/certificates', data)
}

// 更新企业资质
export function updatecertificatesApi(certid: any, data: any) {
  return api.put(`/api/client/ucompany/certificates/${certid}`, data)
}

// 删除企业资质
export function deletecertificatesApi(certid: any) {
  return api.delete(`/api/client/ucompany/certificates/${certid}`)
}

// 根据ID获取企业资质详情
export function detailcertificatesApi(certid: any) {
  return api.get(`/api/client/ucompany/certificates/${certid}`)
}

// 获取当前用户企业的案例列表
export function casesApi(params: any) {
  return api.get('/api/client/ucompany/cases', {
    params,
  })
}

// 新增企业案例
export function savecasesApi(data: any) {
  return api.post('/api/client/ucompany/cases', data)
}

// 更新企业案例
export function updatecasesApi(certid: any, data: any) {
  return api.put(`/api/client/ucompany/cases/${certid}`, data)
}

// 删除企业案例
export function deletecasesApi(certid: any) {
  return api.delete(`/api/client/ucompany/cases/${certid}`)
}

// 根据ID获取企业案例详情
export function detailcasesApi(certid: any) {
  return api.get(`/api/client/ucompany/cases/${certid}`)
}

// 查询企业列表（公开）
export function ucompanylistApi(params: any) {
  return api.get('/api/client/ucompany/list', {
    params,
  })
}

// 查询企业详情（公开）
export function ucompanydetailApi(companyid: any) {
  return api.get(`/api/client/ucompany/${companyid}`)
}

// 新增数字技工服务
export function humanresourceaddApi(data: any) {
  return api.post('/api/client/uproduct/human-resource/add', data)
}

// 编辑数字技工服务
export function humanresourceeditApi(data: any) {
  return api.post('/api/client/uproduct/human-resource/edit', data)
}

// 数字技工服务调价
export function humanresourceadjustpriceApi(data: any) {
  return api.post('/api/client/uproduct/human-resource/adjust-price', data)
}

// 数字技工服务列表
export function humanresourcelistApi(params: any) {
  return api.get('/api/client/uproduct/human-resource/list', {
    params,
  })
}

// 数字技工服务调价历史
export function humanresourcepricehistoryApi(params: any) {
  return api.get('/api/client/uproduct/human-resource/price-history', {
    params,
  })
}

// 数字技工服务详情
export function humanresourcedetailApi(params: any) {
  return api.get('/api/client/uproduct/human-resource/detail', {
    params,
  })
}

// 新增材料/设备
export function materialaddApi(data: any) {
  return api.post('/api/client/uproduct/material/add', data)
}

// 编辑材料/设备（不含价格）
export function materialeditApi(data: any) {
  return api.post('/api/client/uproduct/material/edit', data)
}

// 材料/设备调价
export function materialadjustpriceApi(data: any) {
  return api.post('/api/client/uproduct/material/adjust-price', data)
}

// 材料/设备列表
export function materiallistApi(params: any) {
  return api.get('/api/client/uproduct/material/list', {
    params,
  })
}

// 材料/设备调价历史
export function materialpricehistoryApi(params: any) {
  return api.get('/api/client/uproduct/material/price-history', {
    params,
  })
}

// 材料/设备详情
export function materialdetailApi(params: any) {
  return api.get('/api/client/uproduct/material/detail', {
    params,
  })
}

// 新增智能建造装备
export function equipmentaddApi(data: any) {
  return api.post('/api/client/uproduct/equipment/add', data)
}

// 编辑智能建造装备（不含价格）
export function equipmenteditApi(data: any) {
  return api.post('/api/client/uproduct/equipment/edit', data)
}

// 智能建造装备调价
export function equipmentadjustpriceApi(data: any) {
  return api.post('/api/client/uproduct/equipment/adjust-price', data)
}

// 智能建造装备列表
export function equipmentlistApi(params: any) {
  return api.get('/api/client/uproduct/equipment/list', {
    params,
  })
}

// 智能建造装备调价历史
export function equipmentpricehistoryApi(params: any) {
  return api.get('/api/client/uproduct/equipment/price-history', {
    params,
  })
}

// 智能建造装备详情
export function equipmentdetailApi(params: any) {
  return api.get('/api/client/uproduct/equipment/detail', {
    params,
  })
}

// 新增信息化产品/服务
export function itproductaddApi(data: any) {
  return api.post('/api/client/uproduct/it-product/add', data)
}

// 编辑信息化产品/服务（不含价格）
export function itproducteditApi(data: any) {
  return api.post('/api/client/uproduct/it-product/edit', data)
}

// 信息化产品/服务调价
export function itproductadjustpriceApi(data: any) {
  return api.post('/api/client/uproduct/it-product/adjust-price', data)
}

// 信息化产品/服务列表
export function itproductlistApi(params: any) {
  return api.get('/api/client/uproduct/it-product/list', {
    params,
  })
}

// 信息化产品/服务调价历史
export function itproductpricehistoryApi(params: any) {
  return api.get('/api/client/uproduct/it-product/price-history', {
    params,
  })
}

// 信息化产品/服务详情
export function itproductdetailApi(params: any) {
  return api.get('/api/client/uproduct/it-product/detail', {
    params,
  })
}

// 用户上传图片
export function iuploadimgApi(data: any) {
  return api.post('/api/client/upload/upload/image', data)
}

// 获取当前用户的解决方案订单列表
export function solutionorderslistApi(params: any) {
  return api.get('/api/client/solution/orders', {
    params,
  })
}

// 用户端 - 提交解决方案需求订单（需登录且账号活跃；user_id由登录态自动获取，无需前端传递
export function solutionorderssaveApi(data: any) {
  return api.post('/api/client/solution/orders', data)
}

// 用户端-根据解决方案分类ID获取需求表单（含multiitems，用于前端渲染表单；支持匿名访问）
export function requirementsbycateApi(params: any) {
  return api.get('/api/client/solution/requirements/by-cate', {
    params,
  })
}

// 获取解决方案订单详情
export function solutionordersdetailApi(orderid: any) {
  return api.get(`/api/client/solution/orders/${orderid}`)
}

// 获取当前用户的询价单列表
export function inquiryorderslistApi(params: any) {
  return api.get('/api/client/inquiry/orders', {
    params,
  })
}

// 获取询价单详情
export function inquiryordersdetailApi(inquiryid: any) {
  return api.get(`/api/client/inquiry/orders/${inquiryid}`)
}
