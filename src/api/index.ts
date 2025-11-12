import axios from 'axios'
import { ElMessage } from 'element-plus'
import { baseURL } from './baseConfig'

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
    request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken') ?? ''}`
  }
  return request
})

api.interceptors.response.use(
  async (response) => {
    if (!response.data) {
      throw new Error()
    }
    // 401 登录失效
    if (response.data && response.data.code === 401) {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
      window.localStorage.removeItem('expiresTime')
      window.localStorage.removeItem('userInfo')
    }
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
