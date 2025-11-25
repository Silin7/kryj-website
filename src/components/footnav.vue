<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useHeaderStore from '@/store/modules/header'
import { zhfooterApi } from '@/api/interface'
import windowOpen from '@/hooks/windowOpen'

const headerStore = useHeaderStore()

const selectedTab = computed(() => {
  return headerStore.selectedTab
})

// 用户端-获取所有有效系统信息（如系统名称、版权信息等，按Key排序）
const sysInfos: any = ref({})

function getSysinfosApi() {
  zhfooterApi().then((res: any) => {
    sysInfos.value = res.data.footer
  })
}

onMounted(() => {
  getSysinfosApi()
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
          <div class="contacttext">{{ sysInfos.contentSource }}</div>
        </div>
        <div class="contactUs frsc">
          <div class="contactFa">
            <i class="fa fa-phone"></i>
          </div>
          <div class="contacttext">{{ sysInfos.contentShortTitle }}</div>
        </div>
        <div class="contactUs frsc">
          <div class="contactFa">
            <i class="fa fa-envelope"></i>
          </div>
          <div class="contacttext">{{ sysInfos.contentAuthor }}</div>
        </div>
      </div>
      <img :src="sysInfos.contentImg" alt="" />
    </div>
    <div class="footBottom" :style="selectedTab !== 'home' ? 'margin-top: 0;' : ''">
      <div class="footInfo">{{ sysInfos.contentKeyword }}</div>
      <div class="footInfo" @click="windowOpen('https://beian.miit.gov.cn/#/Integrated/recordQuery', true)">
        {{ sysInfos.contentDescription }}
      </div>
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
    justify-content: space-around;
    border-bottom: 1px solid #1a3670;

    .quickbox {
      max-width: calc(100% - 8rem);
      flex-shrink: 0;
      display: flex;
      flex-flow: column;
      flex-wrap: wrap;
      align-items: center;

      .contactUs {
        width: 100%;
        flex-shrink: 0;
        padding: 0 1rem 1rem 0;
        display: flex;
        align-items: flex-start;

        @media (max-width: 768px) {
          padding: 0 0.5rem 0.5rem 0;
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

    img {
      margin-bottom: 1rem;
      width: 8rem;
      height: 8rem;

      @media (max-width: 768px) {
        margin-bottom: 0;
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
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
