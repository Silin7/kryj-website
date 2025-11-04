<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
  // sysinfosApi().then((res: any) => {
  //   if (res && res.length > 0) {
  //     for (let i = 0; i < res.length; i++) {
  //       const item = res[i]
  //       sysInfos.value[item.ky] = item.val
  //     }
  //   }
  // })
  sysInfos.value = {
    sys_address: '山东省济南市高新区春兰路1177号银丰生物城3号地块4号楼504',
    sys_tel: '15668313535',
    sys_email: '15668313535@163.com',
    sys_worktime: '周一至周五 9:00-18:00',
    sys_company: '© 2025 山东科睿易晶生物技术有限公司. 保留所有权利.',
    sys_filing:  '鲁ICP备12345678号-1'
  }
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
    <div v-if="selectedTab === 'home'" class="footRow">
      <div class="quickbox">
        <div class="contactUs frsc">
          <div class="contactFa">
            <i class="fa fa-map-marker"></i>
          </div>
          <div class="contacttext">{{ sysInfos.sys_address }}</div>
        </div>
        <div class="contactUs frsc">
          <div class="contactFa">
            <i class="fa fa-phone"></i>
          </div>
          <div class="contacttext">{{ sysInfos.sys_tel }}</div>
        </div>
        <div class="contactUs frsc">
          <div class="contactFa">
            <i class="fa fa-envelope"></i>
          </div>
          <div class="contacttext">{{ sysInfos.sys_email }}</div>
        </div>
        <div class="contactUs frsc">
          <div class="contactFa">
            <i class="fa fa-clock-o"></i>
          </div>
          <div class="contacttext">{{ sysInfos.sys_worktime }}</div>
        </div>
      </div>
    </div>
    <div class="footBottom" :style="selectedTab !== 'home' ? 'margin-top: 0;' : ''">
      <div class="footInfo">{{ sysInfos.sys_company }}</div>
      <div class="footInfo">{{ sysInfos.sys_filing }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footnav {
  padding: 1rem;
  background-color: #1f3e85;

  .footRow {
    margin: 0 auto;
    max-width: 1400px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #1a3670;

    .quickbox {
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      @media (max-width: 768px) {
        width: 100%;
      }

      .contactUs {
        flex-shrink: 0;
        margin-right: 1rem;
        padding-bottom: 1rem;
        display: flex;
        align-items: flex-start;

        @media (max-width: 768px) {
          width: 100%;
        }

        .contactFa {
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
          max-width: calc(100% - 2rem);
          line-height: 1.5rem;
          color: #fff;
        }
      }

      .contactUs:last-child {
        margin-right: 0;
      }
    }
  }

  .footBottom {
    margin-top: 1rem;

    .footInfo {
      text-align: center;
      font-size: 1rem;
      line-height: 1.5rem;
      color: #fff;
    }

    .footInfo:last-child {
      margin-top: 0.5rem;
    }
  }
}
</style>
