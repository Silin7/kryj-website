import axios from 'axios'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
import { baseURL } from './baseConfig'
import pageJump from '@/hooks/pageJump'

const api = axios.create({
  baseURL,
  timeout: 1000 * 60,
  responseType: 'json',
  headers: {
    'tenant-id': '1',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
})

api.interceptors.request.use((request) => {
  // 设置请求头
  if (request.headers && localStorage.getItem('accessToken')) {
    request.headers.accessToken = `Bearer ${localStorage.getItem('accessaccessToken') ?? ''}`
    request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken') ?? ''}`
  }
  return request
})

api.interceptors.response.use(
  async (response) => {
    if (!response.data) {
      throw new Error()
    }
    // // 401 登录失效
    // else if (response.data && response.data.code === 401) {
    //   ElMessage.error('登录信息失效，请重新登录')
    //   router.push({
    //     path: '/login',
    //   })
    // }
    // 其他错误
    else if (response.data?.code !== 0 && response.data?.code !== 401) {
      ElMessage.error(response.data.msg)
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    ElMessage.error(error.response.data.msg)
    return Promise.reject(error)
  },
)

export default api
