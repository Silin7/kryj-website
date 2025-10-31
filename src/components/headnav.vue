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
  { id: '1', title: '系统首页', path: '/', name: 'home', children: [] },
  { id: '6', title: '公司信息', path: '/data-solution', name: 'datasolution', children: [] },
  { id: '7', title: '委托开发', path: '/ai', name: 'ai', children: [] },
  { id: '8', title: '产品出售', path: '/video', name: 'video', children: [] },
  { id: '9', title: 'AI平台', path: '/supplier', name: 'supplier', children: [] },
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

// 移动端
const drawerVisible = ref(false)

watch(
  () => drawerVisible.value,
  (val: boolean) => {
    if (val) {
      console.log('-------->', selectedTab.value)
    } else {
      menuList.value.forEach((element: any) => {
        element.expanded = false
      })
    }
  },
  {
    immediate: true,
  },
)

const buttonRef = ref()
const popoverRef = ref()
function onClickOutside() {
  unref(popoverRef).popperRef?.delayHide?.()
}

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
    <div class="headPositon">
      <div class="headFlex">
        <img src="@/assets/logo/logo-21.jpg" alt="logo" class="headLogo" @click="pageJump('home')" />
        <div class="headNav" style="border: 1px solid red">
          <div v-if="windowWidth > 1200" class="menuPc">
            <div class="menuBox">
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
            <div v-if="userInfo.name" ref="buttonRef" v-click-outside="onClickOutside" class="userName">
              <i class="fa fa-user-circle mr-2"></i>
              <span class="nameStyle">{{ userInfo.name }}</span>
              <el-popover placement="bottom" :virtual-ref="buttonRef" virtual-triggering :width="160" trigger="click">
                <div class="userPopover">
                  <div class="popoverItem" @click="pageJump('user-index')">
                    用户中心
                  </div>
                  <div class="popoverItem" @click="logoutFunction">
                    退出登录
                  </div>
                </div>
              </el-popover>
            </div>
            <div v-else class="headBtns">
              <div class="headLogin">
                <div class="btnHeng1"></div>
                <button @click="pageJump('login')">登录</button>
                <div class="btnHeng2"></div>
              </div>
              <button class="registerbtn" @click="pageJump('register')">注册</button>
            </div>
          </div>
          <div v-else class="drawerIcon" @click="drawerVisible = true">
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端 抽屉 -->
    <el-drawer v-model="drawerVisible" :with-header="false" direction="rtl" size="80%" class="mobiledrawer">
      <div class="drawerhead">
        <div class="drawerleft">
          <div class="culbbox">
            <i class="fa fa-cube"></i>
          </div>
          <p>新材网</p>
        </div>
        <i class="fa fa-times drawerclose" @click="drawerVisible = false"></i>
      </div>
      <div class="mobilecollapse">
        <div v-for="(item, index) in menuList" :key="index"
          :class="['collapseItem', selectedTab === item.name ? 'collapseActive' : '']" @click="tabRouterPush(item)">
          <div class="frbc">{{ item.title }}</div>
        </div>
      </div>
      <div v-if="userInfo.name" class="mobileBtns">
        <div class="frcc">
          <i class="fa fa-user-circle mr-2"></i>
          <span class="nameStyle">{{ userInfo.name }}</span>
        </div>
        <!-- <span class="logoutStyle" @click="logoutFunction">退出</span> -->
      </div>
      <div v-if="userInfo.name" class="mobileBtns">
        <div class="frcc">
          <i class="fa fa-sign-out mr-2"></i>
          <span @click="logoutFunction">退出登录</span>
        </div>
      </div>
      <div v-else class="mobileBtns">
        <button class="mobileDlbtn" @click="tabRouterPush({ name: 'login' })">登录</button>
        <button class="mobileZcbtn" @click="tabRouterPush({ name: 'register' })">注册</button>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.headPositon {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;
  background-image: linear-gradient(to bottom, rgba(235, 240, 251, 1) 50%, rgba(235, 240, 251, 0));
  border: 1px solid red;

  .headFlex {
    margin: 0 auto;
    max-width: 1400px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid red;

    .headLogo {
      cursor: pointer;
      width: 160px;
      height: 80px;
    }

    .headNav {
      width: calc(100% - 160px);
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .menuBox {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;

        .menuItem {
          position: relative;
          display: flex;

          .menuTitle {
            color: #1f3e85;
            opacity: 0.6;
          }

          .menuYanhua {
            width: 32px;
            height: 26px;
            opacity: 0;
          }
        }

        .menuItem:hover {
          cursor: pointer;

          .menuTitle {
            opacity: 1;
          }

          .menuYanhua {
            opacity: 1;
          }
        }

        @keyframes hengChange {
          0% {
            width: 0%;
          }

          100% {
            width: 100%;
          }
        }
      }

      .drawerIcon {
        font-size: 1.25rem;
        color: #fff;
      }
    }

    .userName {
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 1.25rem;

      .nameStyle {
        display: inline-block;
        max-width: 210px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .userName:hover {
      @media (min-width: 1291px) {
        cursor: pointer;
      }
    }

    .headBtns {
      display: flex;
      align-items: center;

      .headLogin {
        .btnHeng1 {
          margin-bottom: 8px;
          width: 0%;
          height: 2px;
        }

        button {
          color: #fff;
        }

        .btnHeng2 {
          margin-top: 8px;
          width: 0%;
          height: 2px;
        }
      }

      .headLogin:hover {
        .btnHeng2 {
          animation: loginbtnHeng1 0.5s infinite alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
      }

      @keyframes loginbtnHeng1 {
        0% {
          width: 0%;
          background-color: #165dff;
        }

        100% {
          width: 100%;
          background-color: #165dff;
        }
      }

      .registerbtn {
        display: inline-block;
        margin-left: 1rem;
        padding: 8px 1.25rem;
        color: #fff;
        background-color: #165dff;
        border-radius: 9999px;
      }

      .registerbtn:hover {
        transform: scale(1.05);
        box-shadow: 2px 2px 10px 0 rgb(22 93 255 / 0.1);
      }
    }
  }
}

.mobiledrawer {
  .drawerhead {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(255 255 255);

    .drawerleft {
      display: flex;
      align-items: center;

      .culbbox {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(22 93 255 / 0.1);
        border-radius: 0.5rem;

        i {
          font-size: 1rem;
          color: #165dff;
        }
      }

      p {
        margin: 0 0 0 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        color: #fff;
      }
    }

    .drawerclose {
      font-size: 1.25rem;
      color: #fff;
    }
  }

  .mobilecollapse {
    padding: 0.5rem;

    .collapseItem {
      margin-bottom: 0.5rem;
      padding: 0.75rem 0.5rem;
      font-size: 1rem;
      line-height: 1rem;
      color: #fff;
      border-radius: 0.5rem;

      i {
        font-size: 0.75rem;
      }
    }

    .collapseItem:last-child {
      margin-bottom: 0;
    }

    .collapseChildren {
      margin: 0.5rem 0 0 0.5rem;

      .collapseCitem {
        margin-bottom: 0.5rem;
        padding: 0.75rem 0.5rem;
        font-size: 1rem;
        line-height: 1rem;
        color: #fff;
        border-radius: 0.5rem;
      }

      .collapseCitem:last-child {
        margin-bottom: 0;
      }
    }

    .collapseActive {
      background-color: rgb(22 93 255 / 0.2);
    }
  }

  .mobileBtns {
    margin-top: 1rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    color: rgb(22 93 255);

    .nameStyle {
      display: inline-block;
      max-width: 8rem;
      white-space: nowrap;
      /* 防止文本换行 */
      overflow: hidden;
      /* 隐藏溢出的文本 */
      text-overflow: ellipsis;
      /* 显示省略号 */
    }

    .logoutStyle {
      margin-left: 0.5rem;
    }

    .logoutStyle:hover {
      cursor: pointer;
      color: #165dff;
    }

    button {
      margin-bottom: 0.5rem;
      width: calc(50% - 0.25rem);
      line-height: 1.5rem;
      padding: 0.5rem 0;
      border-radius: 9999px;
    }

    .mobileDlbtn {
      color: rgb(22 93 255);
      border: 1px solid rgb(22 93 255);
    }

    .mobileZcbtn {
      color: #fff;
      background-color: rgb(22 93 255 / 0.9);
    }
  }
}

.popoverItem {
  line-height: 44px;
  color: #262626;
  text-align: center;
  cursor: pointer;
}

.popoverItem:hover {
  color: #165dff;
  background-color: #eee;
}
</style>

<style lang="scss">
.mobiledrawer {
  .el-drawer__body {
    padding: 0 !important;
    background-color: rgb(1 32 96);
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
      color: #165dff !important;
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
      color: #165dff !important;
    }
  }
}
</style>
