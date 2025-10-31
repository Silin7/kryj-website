import api from '@/api/index'

// 获取解决方案分类（区分父类和子类）
export function solutioncateApi() {
  return api.get('/api/client/syscate/solutioncate')
}

// 获取产品分类的所有父类
export function pcateApi() {
  return api.get('/api/client/syscate/pcate')
}

// 获取产品分类的所有类别
export function allpcateApi() {
  return api.get('/api/client/syscate/allpcate')
}

// 获取所有AI赋能应用
export function allaiappApi() {
  return api.get('/api/client/syscate/allaiapp')
}

// 根据类型获取单位列表
export function unitApi(params: any) {
  return api.get('/api/client/syscate/unit', {
    params
  })
}

// 获取前20个友情链接
export function flinktopApi() {
  return api.get('/api/client/syscate/flink/top20')
}
