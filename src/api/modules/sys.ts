import api from '@/api/index'

// 登录
export function loginApi(params: any) {
  return api.post('/auth/login', params)
}

// 权限
export function getPermissionInfo() {
  return api.get('/system/auth/get-permission-info')
}
