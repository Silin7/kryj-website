import api from '@/api/index'

// 用户端-获取最新6条推荐文章（公开接口）
export function articlesrecommendedApi() {
  return api.get('/api/client/articles/recommended')
}

// 用户端-获取所有启用的文章分类（公开接口）
export function articlescatesApi() {
  return api.get('/api/client/articles/cates')
}

// 用户端-文章列表（公开接口，支持筛选分页）
export function articlesApi(params: any) {
  return api.get('/api/client/articles', {
    params,
  })
}

// 用户端-按分类ID获取文章列表（公开接口）
export function articlescateApi(cateid: any, params: any) {
  return api.get(`/api/client/articles/cate/${cateid}`, {
    params,
  })
}

// 用户端-获取文章详情（公开接口）
export function articledetailApi(articleid: any) {
  return api.get(`/api/client/articles/${articleid}`)
}

// 用户端-收藏或取消收藏文章（需登录）
export function articlescollectApi(articleid: any) {
  return api.post(`/api/client/articles/${articleid}/collect`)
}

// 用户端-获取所有启用的单页文章（简化字段：ID、链接标识、标题、简介）
export function articleallsimpleApi() {
  return api.get('/api/client/particle/particles/all-simple')
}

// 用户端 - 按链接标识获取单页文章详情（如'about-us'获取关于我们页面）
export function articlebyurlApi(theurl: any) {
  return api.get(`/api/client/particle/particles/by-url/${theurl}`)
}

// 用户端-按ID获取单页文章详情
export function articleparticleApi(particleid: any) {
  return api.get(`/api/client/particle/particles/${particleid}`)
}
