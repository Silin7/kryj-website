<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'
import { bannerlistApi, secpositionsApi, syspseoApi } from '@/api/modules/basic'
import { solutioncateApi, flinktopApi } from '@/api/modules/common'

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 用户端-获取所有启用的板块位置（含完整字段，按排序升序、创建时间倒序）
const positionid: any = ref('')
const bannerData: any = ref([])

function getSecpositions() {
  secpositionsApi().then((res: any) => {
    if (res && res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        if (res[i].url === window.localStorage.getItem('selectedName')) {
          positionid.value = res[i].id
          getBannerlist()
          break
        }
      }
    }
  })
}

function getBannerlist() {
  // 用户端-按板块位置ID获取所有启用的Banner（含位置名称）
  bannerlistApi(positionid.value).then((res: any) => {
    bannerData.value = res[0]
  })
  // 用户端-根据页面ID（page_id）获取启用的SEO配置详情（含页面名称）
  syspseoApi(positionid.value).then((res: any) => {
    if (res) {
      useHead({
        title: res.page_name,
        meta: [
          { name: 'description', content: res.description },
          { name: 'keywords', content: res.keywords },
        ]
      })
    }
  })
}

// 数字化解决方案
const solutionPactive: any = ref('')
const solutionParent: any = ref([])
const solutionChild: any = ref([])

function getSolutioncate() {
  solutioncateApi().then((res: any) => {
    if (res && res.parent_cates && res.parent_cates.length > 0) {
      solutionPactive.value = res.parent_cates[0].id
      solutionParent.value = res.parent_cates
    }
    if (res && res.child_cates && res.child_cates.length > 0) {
      solutionChild.value = res.child_cates
    }
  })
}

function solutionPchange(item: any) {
  solutionPactive.value = item.id
}

// 友情链接
const flinktop: any = ref([])

function getFlinktop() {
  flinktopApi().then((res: any) => {
    if (res && res.length > 0) {
      flinktop.value = res
    }
  })
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
  getSolutioncate()
  getFlinktop()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

</script>

<template>
  <div>
    <div class="datasolutionPage">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.datasolutionPage {
  overflow-x: hidden;
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;

  .introdsOut {
    padding: 6rem 1rem;
    width: 100%;

    @media (max-width: 768px) {
      padding: 1rem;
    }

    .introdsBox {
      position: relative;
      margin: 0 auto;
      padding: 1rem;
      width: 100%;
      max-width: 1400px;
      background-color: #fff;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      border-radius: 1rem;

      @media (min-width: 992px) {
        padding: 2.5rem;
      }

      .introdsText {
        font-size: clamp(1rem, 4vw, 1.25rem);
        line-height: 1.75rem;
        color: rgb(75 85 99);
      }

      // .introdsBtns {
      //   margin-top: 1rem;
      //   display: flex;
      //   flex-wrap: wrap;

      //   .introdsBtn {
      //     flex-shrink: 1;
      //     margin: 0 1rem 1rem 0;
      //     padding: 2.5rem;
      //     // padding: 0.5rem 1rem;
      //     line-height: 1.5rem;
      //     color: rgb(22 93 255);
      //     background-color: rgb(22 93 255 / 0.1);
      //     border-radius: 9999px;

      //     i {
      //       margin-right: 0.5rem;
      //     }
      //   }
      // }
    }
  }

  .digitizeOut {
    padding: 2.5rem 0 4rem;
    width: 100%;
    background-color: #f0f7ff;

    @media (max-width: 768px) {
      padding: 2rem 0;
    }

    .digitizeBox {
      position: relative;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
      max-width: 1400px;

      .digitizeSubBoxOut {
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;

        .digitizeSubBox {
          overflow-x: auto;
          display: flex;
          flex-wrap: nowrap;

          .digitizeSubItem {
            flex-shrink: 0;
            margin: 0 0.5rem;
            padding: 0.5rem 1rem;
            line-height: 2rem;
            color: rgb(1 32 96);
            background-color: #fff;
            border-radius: 9999px;

            @media (max-width: 768px) {
              padding: 0.375rem 0.875rem;
              margin: 0 0.25rem;
            }
          }

          .digitizeSubItem:first-child {
            margin-left: 0;
          }

          .digitizeSubItem:last-child {
            margin-right: 0;
          }

          .digitizeSubItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              background-color: rgb(243 244 246);
            }
          }
        }

        .digitizeActive {
          color: #fff !important;
          background-color: #165dff !important;
        }
      }

      .digitizeClassbox {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          width: 100%;
        }

        .digitizeClassitem {
          margin: 0 1rem 1rem 0;
          padding: 1.5rem;
          width: calc(33.3% - 1rem);
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 1rem 0;
          }

          .digitizeClassitemfa {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            font-size: 1.5rem;
            line-height: 2rem;
            border-radius: 9999px;
            color: rgb(22 93 255);
            background-color: rgb(22 93 255 / 0.1);
          }

          .digitizeClassitemtext {
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(1 32 96);

            @media (max-width: 768px) {
              font-size: 1.125rem;
            }
          }

          .digitizeClassiteminfo {
            text-align: center;
            margin-bottom: 1rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);

            @media (max-width: 768px) {
              // font-size: 0.875rem;
            }
          }

          button {
            padding: 0.5rem 1.5rem;
            line-height: 1.5rem;
            color: #fff;
            background-color: rgb(22 93 255);
            border-radius: 0.5rem;
          }
        }

        .digitizeClassitem:last-child {
          @media (max-width: 768px) {
            margin-bottom: 0;
          }
        }

        .digitizeClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }
    }
  }

  .gysBox {
    position: relative;
    margin: 6rem auto 0;
    padding: 0 2rem 4rem;
    width: 100%;
    max-width: 1400px;

    @media (max-width: 768px) {
      margin: 0 auto;
      padding: 2rem 1rem 1rem;
    }

    .gysTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .gysHeng {
      margin: 1rem auto 0;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: rgb(22 93 255);
    }

    .gysInfo {
      margin: 1rem auto 2.5rem;
      text-align: center;
      max-width: 42rem;
      color: rgb(75 85 99);
    }

    .gysClassbox {
      width: calc(100% + 1rem);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .gysClassitem {
        margin: 0 1rem 1rem 0;
        padding: 1.25rem 1rem;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 0.75rem;

        @media (min-width: 992px) {
          width: calc(16.6% - 1rem);
        }

        @media (max-width: 992px) and (min-width: 768px) {
          width: calc(33.3% - 1rem);
        }

        @media (max-width: 768px) {
          padding: 1rem 0.5rem;
          width: calc(50% - 1rem);
        }

        .gysClassitemfa1 {
          margin-bottom: 1rem;
          padding: 0.25rem;
          width: 5rem;
          height: 5rem;
          border-radius: 9999px;
          border: 2px solid rgb(22 93 255 / 0.2);
        }

        .gysClassitemfa {
          margin-bottom: 1rem;
          width: 5rem;
          height: 5rem;
          border-radius: 9999px;
          background-color: rgb(114 46 209 / 0.1);
        }

        .gysClassitemtext {
          line-height: 1.5rem;
          font-weight: 500;
          text-align: center;
          color: rgb(1 32 96);
        }

        .gysClassiteminfo {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          text-align: center;
          color: #6b7280;
        }
      }

      .gysClassitem:hover {
        @media (min-width: 768px) {
          cursor: pointer;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          animation: jumpUpwards 300ms ease-in-out forwards;
        }
      }
    }
  }
}
</style>
