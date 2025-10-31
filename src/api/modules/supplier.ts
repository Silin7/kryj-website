import api from '@/api/index'

// 获取已审核供应商企业列表（分页）
export function suppliercompaniesApi(params: any) {
  return api.get('/api/client/supplier/companies', {
    params,
  })
}

// 获取已审核供应商企业详情
export function articlescateApi(companyid: any) {
  return api.get(`/api/client/supplier/companies/${companyid}`)
}


// 获取供应商企业已审核资质列表
export function suppliercompaniescertificatesApi(companyid: any) {
  return api.get(`/api/client/supplier/companies/${companyid}/certificates`)
}


// 获取供应商企业已审核资质详情
export function suppliercertificatescertidApi(certid: any) {
  return api.get(`/api/client/supplier/certificates/${certid}`)
}

// 获取供应商企业已审核案例列表
export function suppliercompaniescasesApi(companyid: any) {
  return api.get(`/api/client/supplier/companies/${companyid}/cases`)
}

// 获取供应商企业已审核案例详情
export function suppliercasescertidApi(certid: any) {
  return api.get(`/api/client/supplier/cases/${certid}`)
}

// 根据供应商企业ID获取其关联的所有产品（含四类产品，带类别标识）
export function suppliercompaniesproductsApi(certid: any) {
  return api.get(`/api/client/supplier/companies/${certid}/products`)
}
