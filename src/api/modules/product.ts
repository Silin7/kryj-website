import axios from 'axios'
import api from '@/api/index'
import { baseURL } from '../baseConfig'

// 用户端-获取所有启用的产品分类（按上级分类、排序值升序）
export function productpcateApi(params: any) {
  return api.get('/api/client/product/pcates', {
    params,
  })
}

// 用户端-根据上级分类ID获取下级分类（仅返回启用的分类）
export function productpcatechildrenApi(params: any) {
  return api.get('/api/client/product/pcates/children', {
    params,
  })
}

// 用户端-根据item_id获取启用的产品分类（按sort从小到大排序，item_id对应：0=数字技术应用论证/数字实施方案论证，1=材料/设备，2=智能建造装备，3=信息化产品/服务）
export function productpcatebyitemidApi(params: any) {
  return api.get('/api/client/product/pcates/by-item-id', {
    params,
  })
}

// 用户端-获取所有审核通过的数字技术应用论证/数字实施方案论证（不含description字段）
export function producthrApi(params: any) {
  return api.get('/api/client/product/human-resources', {
    params,
  })
}

// 用户端-根据ID获取数字技术应用论证/数字实施方案论证详细数据（含分类、地区、供应商等完整关联信息）
export function producthridApi(id: any) {
  return api.get('/api/client/product/human-resources/' + id)
}

// 用户端-按主分类、二级分类筛选数字技术应用论证/数字实施方案论证（不含description）
export function producthrbycateApi(params: any) {
  return api.get('/api/client/product/human-resources/by-cate', {
    params,
  })
}

// 用户端-多条件检索数字技术应用论证/数字实施方案论证（不含description）
export function producthrsearchApi(params: any) {
  return api.get('/api/client/product/human-resources/search', {
    params,
  })
}

// 用户端-获取数字技工相关产品（通过路径参数传递当前产品ID）
export function producthrrelatedApi(id: any) {
  return api.get('/api/client/product/human-resources/related/' + id)
}

// 用户端-获取所有审核通过的材料（不含description字段）
export function productmaterialsApi(params: any) {
  return api.get('/api/client/product/materials', {
    params,
  })
}

// 用户端-根据ID获取材料详细数据（含三级分类、地区、供应商等完整关联信息）
export function productmaterialsidApi(id: any) {
  return api.get('/api/client/product/materials/' + id)
}

// 用户端-按主分类、二级分类、三级分类筛选材料（不含description）
export function productmaterialsbycateApi(params: any) {
  return api.get('/api/client/product/materials/by-cate', {
    params,
  })
}

// 用户端-多条件检索材料（不含description）
export function productmaterialssearchApi(params: any) {
  return api.get('/api/client/product/materials/search', {
    params,
  })
}

// 用户端-获取材料相关产品（通过路径参数传递当前产品ID）
export function productmaterialsrelatedApi(id: any) {
  return api.get('/api/client/product/materials/related/' + id)
}

// 用户端-获取所有审核通过的装备（不含description字段）
export function productequipmentsApi(params: any) {
  return api.get('/api/client/product/equipments', {
    params,
  })
}

// 用户端-根据ID获取装备详细数据（含租赁/销售类型、分类、供应商等完整关联信息）
export function productequipmentsidApi(id: any) {
  return api.get('/api/client/product/equipments/' + id)
}

// 用户端-按信息类型（租赁/销售）+主/二级分类筛选装备（不含description）
export function productequipmentsbytypecateApi(params: any) {
  return api.get('/api/client/product/equipments/by-type-cate', {
    params,
  })
}

// 用户端-多条件检索装备（不含description）
export function productequipmentssearchApi(params: any) {
  return api.get('/api/client/product/equipments/search', {
    params,
  })
}

// 用户端-获取装备相关产品（通过路径参数传递当前产品ID）
export function productequipmentsrelatedApi(id: any) {
  return api.get('/api/client/product/equipments/related/' + id)
}

// 用户端-获取所有审核通过的信息化产品（不含description字段）
export function producteitApi(params: any) {
  return api.get('/api/client/product/it-products', {
    params,
  })
}

// 用户端-根据ID获取信息化产品详细数据（含演示地址、分类、供应商等完整关联信息）
export function producteitidApi(id: any) {
  return api.get('/api/client/product/it-products/' + id)
}

// 用户端-按信息类型（租赁/销售）+主/二级分类筛选装备（不含description）
export function producteitbytypecateApi(params: any) {
  return api.get('/api/client/product/it-products/by-type-cate', {
    params,
  })
}

// 用户端-多条件检索装备（不含description）
export function producteitsearchApi(params: any) {
  return api.get('/api/client/product/it-products/search', {
    params,
  })
}

// 用户端-获取信息化产品相关产品（通过路径参数传递当前产品ID）
export function producteitrelatedApi(id: any) {
  return api.get('/api/client/product/it-products/related/' + id)
}

// 获取当前用户的询价单列表
export function inquiryorderslistApi(params: any) {
  return api.get('/api/client/inquiry/orders', {
    params,
  })
}

// 获取询价单详情
export function inquiryordersdetailsApi(inquiryid: any) {
  return api.get(`/api/client/inquiry/orders/${inquiryid}`)
}
