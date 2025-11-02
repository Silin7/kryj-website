<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import backToTop from '@/hooks/backToTop'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'
import {
  secpositionsApi,
  bannerlistApi,
  vippartnersApi,
  syspseoApi,
  seccontentlistApi,
} from '@/api/modules/basic'
import {
  solutioncateApi,
  allpcateApi,
  allaiappApi,
  flinktopApi,
} from '@/api/modules/common'
import { productpcatechildrenApi } from '@/api/modules/product'

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
        const item = res[i]
        if (item.url === window.localStorage.getItem('selectedName')) {
          positionid.value = item.id
          getBannerlist()
        }
        // 首页-公司信息banner	home-xtjj-banner
        if (item.url === 'home-xtjj-banner') {
          getSeccontentlist0(item.id)
        }
        // 首页-创建背景	home-cjbj
        if (item.url === 'home-cjbj') {
          getSeccontentlist1(item.id)
        }
        // 首页-涵盖范围	home-hgfw
        if (item.url === 'home-hgfw') {
          getSeccontentlist2(item.id)
        }
        // 首页-应用对象	home-yydx
        if (item.url === 'home-yydx') {
          getSeccontentlist3(item.id)
        }
        // 首页-系统创建	home-xtcj
        if (item.url === 'home-xtcj') {
          getSeccontentlist4(item.id)
        }
        // 首页-委托开发	home-rcjx
        if (item.url === 'home-rcjx') {
          getSeccontentlist5(item.id)
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
        ],
      })
    }
  })
}

// 创建背景
const homextjjbanner: any = ref({})

function getSeccontentlist0(id: any) {
  seccontentlistApi(id).then((res: any) => {
    homextjjbanner.value = res[0]
  })
}

// 创建背景
const homecjbj: any = ref({})

function getSeccontentlist1(id: any) {
  seccontentlistApi(id).then((res: any) => {
    homecjbj.value = res[0]
  })
}

// 涵盖范围
const homehgfw: any = ref({})

function getSeccontentlist2(id: any) {
  seccontentlistApi(id).then((res: any) => {
    homehgfw.value = res[0]
  })
}

// 应用对象
const homeyydx: any = ref({})

function getSeccontentlist3(id: any) {
  seccontentlistApi(id).then((res: any) => {
    homeyydx.value = res[0]
  })
}

// 系统创建
const homextcj: any = ref({})

function getSeccontentlist4(id: any) {
  seccontentlistApi(id).then((res: any) => {
    homextcj.value = res[0]
  })
}

// 用户端-获取所有有效合作单位（按排序升序、创建时间倒序）
const vippartners: any = ref([])

function getVippartners() {
  vippartnersApi().then((res: any) => {
    vippartners.value = res
  })
}

// 数字化解决方案
const solutionPactive: any = ref('')
const solutionParent: any = ref([])
const solutionCactive: any = ref('')
const solutionCform: any = ref({})
const solutionChild: any = ref([])

function getSolutioncate() {
  solutioncateApi().then((res: any) => {
    if (res && res.parent_cates && res.parent_cates.length > 0) {
      solutionPactive.value = res.parent_cates[0].id
      solutionParent.value = res.parent_cates
    }
    if (res && res.child_cates && res.child_cates.length > 0) {
      solutionChild.value = res.child_cates
      const child = solutionChild.value.find((el: any) => {
        return el.parent_id === solutionPactive.value
      })
      if (child) {
        solutionCactive.value = child.id
        solutionCform.value = child
      }
    }
  })
}

function solutionPchange(item: any) {
  solutionPactive.value = item.id
  const child = solutionChild.value.find((el: any) => {
    return el.parent_id === item.id
  })
  if (child) {
    solutionCactive.value = child.id
    solutionCform.value = child
  }
}

function solutionCchange(item: any) {
  solutionCactive.value = item.id
  solutionCform.value = item
}

// 委托开发
const pcatePactive: any = ref(0)
const pcateZhu: any = ref([])
const pcateAll: any = ref([])
const pcateChild: any = ref([])

function getSeccontentlist5(id: any) {
  seccontentlistApi(id).then((res: any) => {
    pcateZhu.value = res
  })
}

function getPcateOne(pid: any = 0) {
  productpcatechildrenApi({
    page: 1,
    pageSize: 999,
    parent_id: pid,
  }).then((res: any) => {
    if (res && res.items.length > 0) {
      pcateAll.value = res.items
      const levelone = pcateAll.value.filter((element: any) => element.item_id === pcatePactive.value)
      pcateChild.value = levelone
    }
  })
}

function pcatePchange(id: any) {
  pcatePactive.value = id
  const levelone = pcateAll.value.filter((element: any) => element.item_id === pcatePactive.value)
  pcateChild.value = levelone
}

// 产品中心
const businessAi: any = ref([])
const bidcostAi: any = ref([])

function getAllaiapp() {
  allaiappApi().then((res: any) => {
    businessAi.value = []
    bidcostAi.value = []
    if (res && res.length > 0) {
      res.forEach((item: any) => {
        if (item.cate_id === 2) {
          businessAi.value.push(item)
        }
        if (item.cate_id === 1) {
          bidcostAi.value.push(item)
        }
      })
    }
  })
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
  getVippartners()
  getSolutioncate()
  getPcateOne()
  getAllaiapp()
  getFlinktop()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div>
    <div class="homePage">
      <!-- homeBanner -->
      <div class="homeBanner"></div>
      <!-- 公司信息 -->
      <div class="featuresBox">
        <div class="featuresImgTitle">公司信息</div>
        <div class="featuresRounded">
          <div class="featuresRoundedItem">
            <div class="featuresRoundedTop">
              <div class="featuresRoundedShu"></div>
              <div class="featuresRoundedTitle">创建背景</div>
            </div>
            <div class="featuresRoundedInfo">
              公司成立于2022年，总部位于济南，聚焦医学人工智能技术研发。核心团队由临床医学、合成化学、生物信息工程、AI算法等多领域专家组成，实现跨学科技术融合。核心团队由临床医学、合成化学、生物信息工程、AI算法等多领域专家组成，实现跨学科技术融合。
            </div>
          </div>
          <div class="featuresRoundedItem">
            <div class="featuresRoundedTop">
              <div class="featuresRoundedShu"></div>
              <div class="featuresRoundedTitle">涵盖范围</div>
            </div>
            <div class="featuresRoundedInfo">
              技术领域‌：医学人工智能、类器官技术、多组学分析、智能药物模拟。
            </div>
          </div>
          <div class="featuresRoundedItem">
            <div class="featuresRoundedTop">
              <div class="featuresRoundedShu"></div>
              <div class="featuresRoundedTitle">应用对象‌</div>
            </div>
            <div class="featuresRoundedInfo">
              医药企业‌：为创新药研发提供高效、精准的AI驱动解决方案；
              科研机构‌：辅助缩短实验周期，降低研发成本；
              临床研究团队‌：通过类器官与AI结合，提升药物验证的可靠性。
            </div>
          </div>
          <div class="featuresRoundedItem">
            <div class="featuresRoundedTop">
              <div class="featuresRoundedShu"></div>
              <div class="featuresRoundedTitle">系统创建‌</div>
            </div>
            <div class="featuresRoundedInfo">
              医学AI药物筛选数据库‌：整合多源数据，加速靶点发现;
              AI辅助药物验证模拟系统‌：预测药物活性与安全性，减少实验试错;
              智能分子对接与体内模拟分析‌：优化药物设计，提升成药性;
              将AI与类器官技术深度绑定，构建“多组学-AI-类器官”四位一体体系;
              通过人工降噪技术提升数据质量，增强模型可靠性。
            </div>
          </div>
        </div>
      </div>
      <!-- 委托开发 AI平台 -->
      <div class="wtkfaiBox">
        <div class="wtkfaiItem">
          <div class="wtkfaiTitle">委托开发</div>
          <img src="@/assets/home/wtkf.png" alt="">
        </div>
        <div class="wtkfaiItem">
          <img src="@/assets/home/aipt.png" alt="">
          <div class="wtkfaiTitle">AI平台</div>
        </div>
      </div>
      <!-- 产品中心 -->
      <div class="cpzxBox">
        <div class="cpzxContent">
          <div class="cpzxTitle">产品中心</div>
          <div class="cpzxHeng"></div>
          <div class="cpzxClassbox">
            <div class="cpzxClassitem">
              <div class="cpzxClassitemfa frcc">
                <i class=" fa fa-github-alt"></i>
              </div>
              <div class="cpzxClassitemtext">AI 驱动药物靶点发现数据库</div>
            </div>
            <div class="cpzxClassitem">
              <div class="cpzxClassitemfa frcc">
                <i class=" fa fa-medkit"></i>
              </div>
              <div class="cpzxClassitemtext">小分子创新药研发</div>
            </div>
            <div class="cpzxClassitem">
              <div class="cpzxClassitemfa frcc">
                <i class=" fa fa-subscript"></i>
              </div>
              <div class="cpzxClassitemtext">生物制剂研发辅助系统</div>
            </div>
            <div class="cpzxClassitem">
              <div class="cpzxClassitemfa frcc">
                <i class=" fa fa-heartbeat"></i>
              </div>
              <div class="cpzxClassitemtext">老药新用筛选平台</div>
            </div>
            <div class="cpzxClassitem">
              <div class="cpzxClassitemfa frcc">
                <i class=" fa fa-contao"></i>
              </div>
              <div class="cpzxClassitemtext">药物晶型预测与筛选系统</div>
            </div>
            <div class="cpzxClassitem">
              <div class="cpzxClassitemfa frcc">
                <i class=" fa fa-h-square"></i>
              </div>
              <div class="cpzxClassitemtext">类器官多组学数据 AI 整合分析工具</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 合作单位  -->
      <div class="mxBox">
        <div class="mxContent">
          <div class="mxTitle">合作单位</div>
          <div class="mxHeng"></div>
          <div class="mxInfo">感谢以下单位对本平台的大力支持与合作</div>
          <div class="mxClassbox">
            <div v-for="(item, index) in vippartners" :key="index" class="mxClassitem" @click="windowOpen(item.url)">
              <img :src="fileURL + item.logoimg" alt="" class="mxClassitemfa" />
              <div class="mxClassitemtext">{{ item.company_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 友情链接  -->
      <div class="pyBox">
        <div class="pyTitle">友情链接</div>
        <div class="pyHeng"></div>
        <div class="pyClassbox">
          <div v-for="(item, index) in flinktop" :key="index" class="pyClassitem"
            @click="windowOpen(item.link_url, true)">
            <img :src="fileURL + item.logo" alt="" class="pyClassitemfa" />
            <div class="pyClassitemtext">{{ item.name }}</div>
            <div class="pyClassiteminfo">{{ item.remark }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homePage {
  background-color: #f9fafb;
  overflow-x: hidden;

  .homeBanner {
    width: 100vw;
    height: 100vh;
    background: url(@/assets/home/dexbanner.png) no-repeat center top;
    background-size: auto;
    background-size: cover;
  }

  .featuresBox {
    margin: 0 auto;
    width: 100%;
    max-width: 1400px;


    .featuresImgTitle {
      margin: 0 auto;
      padding-left: 1.5rem;
      width: 100%;
      height: 8rem;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      line-height: 8rem;
      font-weight: 700;
      color: #1f3e85;
      background-color: #ebf0fb;

      @media (max-width: 768px) {
        padding-left: 1rem;
        height: 5rem;
        line-height: 5rem;
      }
    }

    .featuresRounded {
      margin: 0 auto;
      padding: 2.5rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-radius: 0 0 1rem 1rem;
      box-sizing:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      background-color: #f1f4f9;

      @media (max-width: 768px) {
        padding: 1rem 1.5rem;
      }

      .featuresRoundedItem {
        margin-bottom: 2.5rem;
        width: 100%;

        .featuresRoundedTop {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;

          .featuresRoundedShu {
            width: 0.5rem;
            height: 2rem;
            background-color: #1f3e85;
            border-radius: 0.25rem;

            @media (max-width: 768px) {
              height: 1.5rem;
            }
          }

          .featuresRoundedTitle {
            padding-left: 1rem;
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 2rem;
            font-weight: 700;
            color: #1f3e85;
          }
        }

        .featuresRoundedInfo {
          font-size: clamp(1rem, 4vw, 1.25rem);
          color: #4b5563;
        }
      }
    }
  }

  .wtkfaiBox {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }

    .wtkfaiItem {
      cursor: pointer;
      width: calc(50% - 2rem);
      background-color: #ebf0fb;
      border-radius: 10px;
      display: flex;
      flex-flow: column;
      align-items: center;

      @media (max-width: 768px) {
        width: 100%;

        &:first-child {
          margin-bottom: 1rem;
        }
      }

      @media (min-width: 768px) {

        &:first-child {
          margin: 6rem 0 12rem;

          .wtkfaiTitle {
            border-bottom: 1px solid #fff;
          }
        }

        &:last-child {
          margin: 12rem 0 6rem;

          .wtkfaiTitle {
            border-top: 1px solid #fff;
          }
        }
      }

      .wtkfaiTitle {
        width: 100%;
        padding: 1rem 0;
        text-align: center;
        color: #1f3e85;
        font-weight: 700;
        font-size: clamp(1.25rem, 4vw, 1.75rem);
      }

      img {
        width: 60%;
      }
    }
  }

  .cpzxBox {
    padding: 4rem 2.5rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);

    @media (max-width: 768px) {
      padding: 4rem 0;
    }

    .cpzxContent {
      position: relative;
      margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0 1rem;
      }

      .cpzxTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .cpzxHeng {
        margin: 1rem auto 2.5rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;
      }

      .cpzxClassbox {
        margin-bottom: 2.5rem;
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          margin-bottom: 1.5rem;
        }

        .cpzxClassitem {
          margin: 0 1rem 1rem 0;
          padding: 1.25rem;
          width: calc(33.3% - 1rem);
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background-color: rgb(249 250 251);
          border-radius: 0.75rem;

          @media (max-width: 768px) {
            padding: 1.25rem 1rem;
            width: calc(50% - 1rem);
          }

          .cpzxClassitemfa {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            border-radius: 9999px;
            background-color: rgb(22 93 255 / 0.1);

            @media (max-width: 768px) {
              width: 3rem;
              height: 3rem;
            }

            i {
              font-size: 1.5rem;
              color: #1f3e85;
            }
          }

          .cpzxClassitemfa2 {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            border-radius: 9999px;
            background-color: rgb(114 46 209 / 0.1);

            @media (max-width: 768px) {
              width: 3rem;
              height: 3rem;
            }

            i {
              font-size: 1.5rem;
              color: #722ed1;
            }
          }

          .cpzxClassitemtext {
            line-height: 1.5rem;
            font-weight: 500;
            text-align: center;
            color: rgb(1 32 96);
          }
        }

        .cpzxClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }

      .cpzxClassbox:last-child {
        margin-bottom: 0rem;
      }
    }
  }

  .mxBox {
    margin: 0 auto;
    padding: 2.5rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    background-image: url('../assets/about00.jpg');

    @media (max-width: 768px) {
      padding: 2.5rem 0;
    }

    .mxContent {
      margin: 0 auto;
      position: relative;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0 1rem;
      }

      .mxTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .mxHeng {
        margin: 1rem auto 0;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;
      }

      .mxInfo {
        margin: 1rem auto 2.5rem;
        text-align: center;
        max-width: 42rem;
        color: #4b5563;
      }

      .mxClassbox {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .mxClassitem {
          margin: 0 1rem 1rem 0;
          padding: 1.25rem;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
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

          .mxClassitemfa {
            margin-bottom: 1rem;
            padding: 0.25rem;
            width: 5rem;
            height: 5rem;
            border-radius: 9999px;
            border: 2px solid rgb(22 93 255 / 0.2);
          }

          .mxClassitemfa2 {
            margin-bottom: 1rem;
            width: 5rem;
            height: 5rem;
            border-radius: 9999px;
            background-color: rgb(114 46 209 / 0.1);
          }

          .mxClassitemtext {
            line-height: 1.5rem;
            font-weight: 500;
            text-align: center;
            color: rgb(1 32 96);
          }
        }

        .mxClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }
    }
  }

  .pyBox {
    position: relative;
    margin: 5rem auto 0;
    padding: 0 2rem 4rem;
    width: 100%;
    max-width: 1400px;

    @media (max-width: 768px) {
      margin: 4rem auto 0;
      padding: 0 1rem 4rem;
    }

    .pyTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .pyHeng {
      margin: 1rem auto 2.5rem;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: #1f3e85;
    }

    .pyClassbox {
      width: calc(100% + 1rem);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .pyClassitem {
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

        .pyClassitemfa1 {
          margin-bottom: 1rem;
          padding: 0.25rem;
          width: 5rem;
          height: 5rem;
          border-radius: 9999px;
          border: 2px solid rgb(22 93 255 / 0.2);
        }

        .pyClassitemfa {
          margin-bottom: 1rem;
          width: 5rem;
          height: 5rem;
          border-radius: 9999px;
          background-color: rgb(114 46 209 / 0.1);
        }

        .pyClassitemtext {
          line-height: 1.5rem;
          font-weight: 500;
          text-align: center;
          color: rgb(1 32 96);
        }

        .pyClassiteminfo {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          text-align: center;
          color: #6b7280;
        }
      }

      .pyClassitem:hover {
        @media (min-width:768px) {
          cursor: pointer;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
          animation: jumpUpwards 300ms ease-in-out forwards;
        }
      }
    }
  }
}
</style>
