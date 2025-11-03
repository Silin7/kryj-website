<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch, unref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import useHeaderStore from '@/store/modules/header'
import { baselogoutdApi } from '@/api/modules/login'

const windowWidth = ref(window.innerWidth)
const windowScrollY = ref(window.scrollY)

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
  if (item.children && item.children.length > 0) {
    item.expanded = !item.expanded
    return
  }
  pageJump(item.name)
  drawerVisible.value = false
}

const menuList: any = ref([
  { title: '系统首页', path: '/', name: 'home' },
  { title: '公司信息', path: '/about', name: 'about' },
  { title: '委托开发', path: '/supplier', name: 'supplier' },
  { title: '产品出售', path: '/data-solution', name: 'datasolution' },
  { title: 'AI平台', path: '/ai', name: 'ai' },
])

// menuChild show Mouseenter Mouseleave
const menuChildShow: any = ref(false)

function menuMouseenter(item: any) {
  if (item.children.length > 0) {
    menuChildShow.value = true
  }
}

function menuMouseleave() {
  menuChildShow.value = false
}

// 登陆后的用户信息
const userInfo: any = ref({})

function getUserInfo() {
  if (window.localStorage.getItem('userinfo')) {
    userInfo.value = JSON.parse(window.localStorage.getItem('userinfo') as string)
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
      baselogoutdApi({}).then((res: any) => {
        if (res) {
          ElMessage({
            type: 'success',
            message: '退出成功',
          })
          menuChildShow.value = false
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('userinfo')
          window.localStorage.removeItem('permission')
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
        <img src="@/assets/logo/logo-21.jpg" alt="logo" class="headLogo" @click="pageJump('home')" />
        <template v-if="windowWidth > 1200">
          <div class="headNav">
            <div v-for="(item, index) in menuList" :key="index" class="menuItem" @mouseenter="menuMouseenter(item)"
              @mouseleave="menuMouseleave" @click="tabRouterPush(item)">
              <img src="@/assets/header/yanhua_l.png" alt="yanhua-l" class="menuYanhua"
                :style="selectedTab === item.name ? 'opacity: 1;' : ''" />
              <div class="menuTitle" :style="selectedTab === item.name ? 'opacity: 1;' : ''">
                {{ item.title }}
              </div>
              <img src="@/assets/header/yanhua_r.png" alt="yanhua-r" class="menuYanhua"
                :style="selectedTab === item.name ? 'opacity: 1;' : ''" />
            </div>
          </div>
          <div v-if="userInfo.name" ref="buttonRef" class="userName" v-click-outside="onClickOutside">
            <i class="fa fa-user-circle mr-2"></i>
            <span>{{ userInfo.name }}</span>
            <el-popover placement="bottom" :virtual-ref="buttonRef" virtual-triggering :width="160" trigger="click">
              <div>
                <!-- <div class="popoverItem" @click="pageJump('user-index')">用户中心</div> -->
                <div class="popoverItem" @click="logoutFunction">退出登录</div>
              </div>
            </el-popover>
          </div>
          <button v-else class="headLogin" @click="pageJump('login')">登录/注册</button>
        </template>
        <div v-else class="drawerIcon" @click="drawerVisible = true">
          <i class="fa fa-bars"></i>
        </div>
      </div>
    </div>

    <!-- 移动端 抽屉 -->
    <el-drawer v-model="drawerVisible" :with-header="false" direction="rtl" size="80%" class="mobiledrawer">
      <div v-if="userInfo.name" class="drawerTitle">
        <p>欢迎您，</p>
        <p>{{ userInfo.name }}</p>
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
        <!-- <button v-if="userInfo.name" @click="logoutFunction" class="mobileBtns">
          用户中心
          <i class="fa fa-user-md"></i>
        </button> -->
        <button v-if="userInfo.name" @click="logoutFunction" class="mobileBtns">
          退出登录
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.headNoMove {
  background-image: linear-gradient(to bottom, rgba(235, 240, 251, 1) 50%, rgba(235, 240, 251, 0));
}

.headMoved {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.headPositon {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;

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

        .menuTitle {
          color: #1f3e85;
          opacity: 0.6;
          line-height: 1.625rem;
        }

        .menuYanhua {
          width: 2rem;
          height: 1.625rem;
          opacity: 0;
        }

        &:hover {

          .menuTitle,
          .menuYanhua {
            opacity: 1;
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
    }

    .headLogin {
      cursor: pointer;
      line-height: 1.625rem;
      color: #1f3e85;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }

    .drawerIcon {
      font-size: 1.875rem;
      color: #1f3e85;
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
      opacity: 0.6;
    }

    .collapseActive {
      opacity: 1;
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
    background-color: #ebf0fb;
    border-radius: 0.75rem;

    i {
      margin-left: 0.75rem;
    }
  }
}

.popoverItem {
  cursor: pointer;
  line-height: 2.5rem;
  color: #1f3e85;
  text-align: center;
  opacity: 0.6;

  &:hover {
    opacity: 1;
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
