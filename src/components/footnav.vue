<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import useHeaderStore from '@/store/modules/header'
import { sysinfosApi } from '@/api/modules/basic'

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 用户端-获取所有有效系统信息（如系统名称、版权信息等，按Key排序）
const sysInfos: any = ref({})

function getSysinfosApi() {
  sysinfosApi().then((res: any) => {
    if (res && res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        sysInfos.value[item.ky] = item.val
      }
    }
  })
}

const headerStore = useHeaderStore()

const selectedTab = computed(() => {
  return headerStore.selectedTab
})

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSysinfosApi()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="footnav">
    <div v-if="selectedTab === 'home'" class="footTop">
      <div class="footRow">
        <div class="footCol">
          <div class="titleshu"></div>
          <div class="titletext">关于我们</div>
        </div>
        <div class="quickbox">
          <div class="quicklink" @click="pageJump('about')">公司简介</div>
          <div class="quicklink" @click="pageJump('about')">合作伙伴</div>
          <div class="quicklink" @click="pageJump('about')">联系我们</div>
          <div class="quicklink" @click="pageJump('about')">隐私政策</div>
        </div>
        <div class="quickbox">
          <div class="contactUs frsc">
            <div class="contactbox">
              <i class="fa fa-map-marker"></i>
            </div>
            <div class="contacttext">{{ sysInfos.sys_address }}</div>
          </div>
          <div class="contactUs frsc">
            <div class="contactbox">
              <i class="fa fa-phone"></i>
            </div>
            <div class="contacttext">{{ sysInfos.sys_tel }}</div>
          </div>
          <div class="contactUs frsc">
            <div class="contactbox">
              <i class="fa fa-envelope"></i>
            </div>
            <div class="contacttext">{{ sysInfos.sys_email }}</div>
          </div>
          <div class="contactUs frsc">
            <div class="contactbox">
              <i class="fa fa-clock-o"></i>
            </div>
            <div class="contacttext">{{ sysInfos.sys_worktime }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footBottom">
      <div class="footInfo">{{ sysInfos.sys_company }}</div>
      <div class="footInfo">{{ sysInfos.sys_filing }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footnav {
  padding: 2rem;
  background-color: #012060;

  @media (max-width:760.5rem) {
    padding: 2rem 1rem;
  }

  .footTop {
    margin: 0 auto 1rem;
    max-width: 1400px;

    .footRow {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #1a3670;

      .footCol {
        display: flex;
        align-items: center;
        padding-bottom: 1rem;

        .titleshu {
          margin-right: 0.5rem;
          width: 0.25rem;
          height: 1rem;
          background-color: #165dff;
        }

        .titletext {
          font-size: 1.25rem;
          color: #fff;
          font-weight: 700;
        }
      }

      .quickbox {
        margin-left: 1rem;
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        @media (max-width: 768px) {
          width: 100%;
        }

        .quicklink {
          flex-shrink: 0;
          margin-right: 1rem;
          padding-bottom: 1rem;
          color: #9ca3af;
        }

        .quicklink:hover {
          @media (min-width:760.5rem) {
            cursor: pointer;
            color: #165dff;
          }
        }

        .quicklink:last-child {
          margin-right: 0;
        }

        .contactUs {
          flex-shrink: 0;
          margin-right: 1rem;
          padding-bottom: 1rem;
          display: flex;
          align-items: center;

          .contactbox {
            margin-right: 0.5rem;
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(22 93 255 / 0.1);
            border-radius: 1.5rem;

            i {
              font-size: 0.85rem;
              color: #165dff;
            }
          }

          .contacttext {
            line-height: 1.5rem;
            color: #9ca3af;
          }
        }

        .contactUs:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .footBottom {

    .footInfo {
      text-align: center;
      font-size: 1rem;
      line-height: 1.5rem;
      color: #9ca3af;
    }

    .footInfo:last-child {
      margin-top: 0.5rem;
    }
  }
}
</style>
