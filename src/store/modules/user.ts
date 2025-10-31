import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { loginApi, getPermissionInfo } from '@/api/modules/sys'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const account = ref(localStorage.getItem('account') ?? '')
    const avatar = ref(localStorage.getItem('avatar') ?? '')
    const accessToken = ref(localStorage.getItem('accessToken') ?? '')
    const permissions = ref<string[]>([])

    // 登录
    async function login(data: { account: string; password: string }) {
      const res = await loginApi(
        Object.assign(data, {
          grantType: 'password',
          tenantId: '000000',
          username: data.account,
          code: '3mgn',
          uuid: 'ebb8f534655a487483d56bf4267e6ae1',
        }),
      )
      localStorage.setItem('account', data.account)
      localStorage.setItem('avatar', res.data.avatar)
      localStorage.setItem('accessToken', res.data.access_token)
      account.value = data.account
      avatar.value = res.data.avatar
      accessToken.value = res.data.access_token
    }

    // 获取权限
    async function getPermissions() {
      const res = await getPermissionInfo()
      permissions.value = res.data.permissions
      return permissions.value
    }

    // 登出
    function logout() {
      localStorage.removeItem('account')
      localStorage.removeItem('avatar')
      localStorage.removeItem('accessToken')
      account.value = ''
      avatar.value = ''
      accessToken.value = ''
      permissions.value = []
      router.push({
        path: '/login',
      })
    }

    return {
      account,
      avatar,
      accessToken,
      permissions,
      login,
      getPermissions,
      logout,
    }
  },
)

export default useUserStore
