<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, unref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import useHeaderStore from '@/store/modules/header'
import { baselogoutdApi } from '@/api/interface'

const windowWidth: any = ref(window.innerWidth)
const windowScrollY: any = ref(window.scrollY)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

function handleScroll() {
  windowScrollY.value = window.scrollY
}

const headerStore = useHeaderStore()

const selectedTab = computed(() => {
  getUserInfo()
  return headerStore.selectedTab
})

function tabRouterPush(item: any) {
  pageJump(item.name)
  drawerVisible.value = false
}

const menuList: any = ref([
  { title: '系统首页', path: '/', name: 'home' },
  { title: '公司介绍', path: '/about', name: 'about' },
  { title: '委托开发', path: '/', name: '' },
  { title: '产品出售', path: '/', name: '' },
  { title: 'AI预测平台 ', path: '/ai', name: 'ai' },
])

// 登陆后的用户信息
const userInfo: any = ref(
  window.localStorage.getItem('userInfo')
    ? JSON.parse(window.localStorage.getItem('userInfo') as string)
    : {},
)

function getUserInfo() {
  if (window.localStorage.getItem('userInfo')) {
    userInfo.value = JSON.parse(window.localStorage.getItem('userInfo') as string)
  } else {
    userInfo.value = {}
  }
}

// 退出登录
function logoutFunction() {
  ElMessageBox.confirm('确定要退出登录吗？ ', '退出登录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      baselogoutdApi().then((res: any) => {
        if (res) {
          ElMessage({
            type: 'success',
            message: '退出成功',
          })
          window.localStorage.removeItem('accessToken')
          window.localStorage.removeItem('refreshToken')
          window.localStorage.removeItem('expiresTime')
          window.localStorage.removeItem('userInfo')
          pageJump('login')
        }
      })
    })
    .catch(() => {
      console.log('取消退出')
    })
}

// popover 气泡
const buttonRef = ref()
const popoverRef = ref()
function onClickOutside() {
  unref(popoverRef).popperRef?.delayHide?.()
}

// 移动端
const drawerVisible = ref(false)

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  window.addEventListener('scroll', handleScroll)
  getUserInfo()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div :class="[windowScrollY === 0 ? 'headNoMove' : 'headMoved', 'headPositon']">
      <div class="headFlex">
        <img v-if="selectedTab === 'home' && windowScrollY === 0" src="@/assets/logo/logo-16-9-w.png" alt="logo"
          class="headLogo" @click="pageJump('home')" />
        <img v-else src="@/assets/logo/logo-16-9.png" alt="logo" class="headLogo" @click="pageJump('home')" />
        <template v-if="windowWidth > 1200">
          <div class="headNav">
            <div v-for="(item, index) in menuList" :key="index" class="menuItem" @click="tabRouterPush(item)">
              <img v-if="selectedTab === 'home' && windowScrollY === 0" src="@/assets/header/cb_bz2.png"
                class="menuYanhua" :style="selectedTab === item.name ? 'opacity: 1;' : ''" />
              <img v-else src="@/assets/header/cb_lz2.png" class="menuYanhua"
                :style="selectedTab === item.name ? 'opacity: 1;' : ''" />
              <div class="menuTitle" :style="selectedTab === item.name ? 'opacity: 1;' : ''">
                <span :style="selectedTab === 'home' && windowScrollY === 0 ? 'color: #fff;' : ''">{{ item.title
                }}</span>
              </div>
              <img v-if="selectedTab === 'home' && windowScrollY === 0" src="@/assets/header/cb_by2.png"
                class="menuYanhua" :style="selectedTab === item.name ? 'opacity: 1;' : ''" />
              <img v-else src="@/assets/header/cb_ly2.png" class="menuYanhua"
                :style="selectedTab === item.name ? 'opacity: 1;' : ''" />
            </div>
          </div>
          <div v-if="userInfo.mobile" ref="buttonRef" class="userName" v-click-outside="onClickOutside">
            <i class="fa fa-user-circle mr-2"
              :style="selectedTab === 'home' && windowScrollY === 0 ? 'color: #fff;' : ''"></i>
            <span :style="selectedTab === 'home' && windowScrollY === 0 ? 'color: #fff;' : ''">
              {{ userInfo.mobile }}
              <i class="fa fa-angle-down"></i>
            </span>
            <el-popover placement="bottom" :virtual-ref="buttonRef" virtual-triggering :width="150" trigger="click">
              <div>
                <div class="popoverItem" @click="pageJump('userinfo')">
                  <i class="fa fa-user-o"></i>用户中心
                </div>
                <div class="popoverItem" @click="pageJump('myorder')">
                  <i class="fa fa-navicon"></i>我的订单
                </div>
                <div class="popoverItem" @click="pageJump('rmobile')">
                  <i class="fa fa-phone"></i>修改手机号
                </div>
                <div class="popoverItem" @click="pageJump('upassword')">
                  <i class="fa fa-edit"></i>修改密码
                </div>
                <div class="popoverItem" @click="logoutFunction">
                  <i class="fa fa-sign-out"></i>退出登录
                </div>
              </div>
            </el-popover>
          </div>
          <button v-else class="headLogin" @click="pageJump('login')">
            <span :style="selectedTab === 'home' && windowScrollY === 0 ? 'color: #fff;' : ''">登录/注册</span>
          </button>
        </template>
        <div v-else class="drawerIcon" @click="drawerVisible = true">
          <i class="fa fa-bars" :style="windowScrollY === 0 ? 'color: #fff' : 'color: #1f3e85;'"></i>
        </div>
      </div>
    </div>

    <!-- 移动端 抽屉 -->
    <el-drawer v-model="drawerVisible" :with-header="false" direction="rtl" size="80%" class="mobiledrawer">
      <div v-if="userInfo.mobile" class="drawerTitle">
        <p>欢迎您，</p>
        <p>{{ userInfo.mobile }}</p>
      </div>
      <div v-else class="drawerTitle">
        <p>您好，</p>
        <p @click="tabRouterPush({ name: 'login' })">
          点击此处 登录/注册 <i class="fa fa-sign-out"></i>
        </p>
      </div>
      <div class="mobilecollapse">
        <div v-for="(item, index) in menuList" :key="index"
          :class="['collapseItem', selectedTab === item.name ? 'collapseActive' : '']" @click="tabRouterPush(item)">
          {{ item.title }}
        </div>
        <button v-if="userInfo.mobile" @click="tabRouterPush({ name: 'userinfo' })" class="mobileBtns">
          <i class="fa fa-user-o"></i>
          用户中心
        </button>
        <button v-if="userInfo.mobile" @click="tabRouterPush({ name: 'myorder' })" class="mobileBtns">
          <i class="fa fa-navicon"></i>
          我的订单
        </button>
        <button v-if="userInfo.mobile" @click="tabRouterPush({ name: 'rmobile' })" class="mobileBtns">
          <i class="fa fa-phone"></i>
          修改手机号
        </button>
        <button v-if="userInfo.mobile" @click="tabRouterPush({ name: 'upassword' })" class="mobileBtns">
          <i class="fa fa-edit"></i>
          修改密码
        </button>
        <button v-if="userInfo.mobile" @click="logoutFunction" class="mobileBtns">
          <i class="fa fa-sign-out"></i>
          退出登录
        </button>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.headNoMove {
  background-image: linear-gradient(to bottom, #55aed710 50%, #0e1d2a10);
}

.headMoved {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.headPositon {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 99;

  .headFlex {
    margin: 0 auto;
    padding: 0 1.25rem;
    max-width: 1400px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .headLogo {
      cursor: pointer;
      width: 100px;
      height: 50px;
    }

    .headNav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .menuItem {
        cursor: pointer;
        margin: 0 2rem;
        position: relative;
        display: flex;
        align-items: center;

        .menuTitle {
          color: #1f3e85;
          line-height: 1.625rem;
        }

        .menuYanhua {
          margin: 0 0.5rem;
          width: 1.25rem;
          height: 1.25rem;
          opacity: 0;
        }

        &:hover {

          .menuTitle,
          .menuYanhua {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      }
    }

    .userName {
      cursor: pointer;
      height: 1.625rem;
      display: flex;
      align-items: center;
      color: #1f3e85;
      // color: #fff;
    }

    .headLogin {
      cursor: pointer;
      line-height: 1.625rem;
      color: #1f3e85;

      &:hover {
        transform: scale(1.05);
      }
    }

    .drawerIcon {
      font-size: 1.875rem;
    }
  }
}

.mobiledrawer {
  .drawerTitle {
    padding: 0.75rem;
    border-bottom: 1px solid #ebf0fb;

    p {
      padding: 0.375rem 0.75rem;
      font-size: 1.5rem;
      line-height: 1.875rem;
      font-weight: 700;
      color: #1f3e85;

      &:first-child {
        color: #000;
      }
    }
  }

  .mobilecollapse {
    padding: 0.75rem;

    .collapseItem {
      margin-bottom: 0.75rem;
      padding: 0.75rem 1.25rem;
      line-height: 1.5rem;
      color: #1f3e85;
    }

    .collapseActive {
      border-radius: 0.75rem;
      background-color: #ebf0fb;
    }
  }

  .mobileBtns {
    margin-bottom: 0.75rem;
    padding: 0.75rem 1.25rem;
    display: flex;
    align-items: center;
    color: #1f3e85;
    // background-color: #ebf0fb;
    border: 1px solid #ebf0fb;
    border-radius: 0.75rem;

    i {
      margin-right: 0.5rem;
    }
  }
}

.popoverItem {
  cursor: pointer;
  line-height: 2.5rem;
  color: #1f3e85;
  padding-left: 1rem;

  i {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #eee;
  }
}
</style>

<style lang="scss">
.mobiledrawer {
  .el-drawer__body {
    padding: 0 !important;
  }

  .el-collapse {
    border: 0 !important;

    .el-icon {
      display: none;
    }

    .el-collapse-item__header {
      border: 0 !important;
    }

    .el-collapse-item__header:hover {
      color: #1f3e85 !important;
    }

    .el-collapse-item__title {
      font-size: 1.25rem !important;
    }

    .el-collapse-item__wrap {
      border: 0 !important;
    }

    .el-collapse-item__content {
      display: none;
    }

    .is-active {
      color: #1f3e85 !important;
    }
  }
}

.el-message-box__btns>.el-button--primary {
  background-color: #1f3e85 !important;
}
</style>
