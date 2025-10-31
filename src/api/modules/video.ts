import api from '@/api/index'

// 用户端-获取所有启用且未删除的视频分类（支持多级分类结构）
export function videocatesApi() {
  return api.get('/api/client/video/cates')
}

// 用户端-根据视频ID获取视频详情（含完整分类信息）
export function videodetailApi(videoid: any) {
  return api.get(`/api/client/video/detail/${videoid}`)
}

// 用户端-根据分类ID获取视频列表（分页，返回精简信息）
export function videolistbycateApi(cateid: any, params: any) {
  return api.get(`/api/client/video/list-by-cate/${cateid}`, {
    params,
  })
}
