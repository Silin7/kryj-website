import axios from 'axios'
import { ElMessage } from 'element-plus'
import { baseURL } from './baseConfig'
import pageJump from '@/hooks/pageJump'

const api = axios.create({
  baseURL,
  timeout: 1000 * 60,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
})

api.interceptors.request.use((request) => {
  // 设置请求头
  if (request.headers && localStorage.getItem('token')) {
    request.headers.token = `Bearer ${localStorage.getItem('token') ?? ''}`
    request.headers.Authorization = `Bearer ${localStorage.getItem('token') ?? ''}`
  }
  return request
})

api.interceptors.response.use(
  async (response) => {
    if (!response.data) {
      throw new Error()
    } else {
      return Promise.resolve(response.data)
    }
  },
  (error) => {
    if (error.response.data.code === 401) {
      ElMessage.error('登录信息失效，请重新登录')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userinfo')
      window.localStorage.removeItem('permission')
      pageJump('login')
    } else {
      ElMessage.error(error.response.data.msg)
      return Promise.reject(error)
    }
  },
)

export default api
