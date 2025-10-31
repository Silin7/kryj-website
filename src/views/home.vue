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
        // 首页-系统简介banner	home-xtjj-banner
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
        // 首页-人材机信价格库	home-rcjx
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

// 人材机信价格库
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

// 人工智能应用
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
      <!-- BANNER -->
      <div class="bannerBox" @click="windowOpen(bannerData.url, bannerData.istourl)">
        <div class="bannerAnchor">
          <img v-if="windowWidth > 1140" :src="fileURL + bannerData.imgurl" alt="banner" class="bannerImage" />
          <div class="bannerAbsolute">
            <div class="bannerContent">
              <div class="bannerTitle">聚焦新型城市基础设施建设再起航</div>
              <div class="bannerSubtitle">
                <span>绿色化</span>
                <span>数字化</span>
                <span>智能化</span>
              </div>
              <!-- <div class="frsc">
              <button class="bannerJgkbtn">价格库</button>
              <button class="bannerJjfabtn">
                解决方案 <i class="fa fa-arrow-right" style="margin-left: 0.5rem"></i>
              </button>
            </div> -->
              <div class="bannerCompany">杭州三才工程信息科技有限公司</div>
              <div class="bannerGridbox">
                <div class="bannerGriditem" @click.stop="pageJump('scheme')">
                  <div class="bannerFabox frcc">
                    <i class="fa fa-database" style="font-size: 1.25rem; color: #fff"></i>
                  </div>
                  <div class="bannerGridright">
                    <div class="bannerGridtitle">人材机信价格库</div>
                    <!-- <div class="bannerGridinfo">精准数据，助力成本管控</div> -->
                  </div>
                </div>
                <div v-if="windowWidth > 768" class="bannerGridshu" />
                <div class="bannerGriditem" @click.stop="pageJump('datasolution')">
                  <div class="bannerFabox frcc">
                    <i class="fa fa-calculator" style="font-size: 1.25rem; color: #fff"></i>
                  </div>
                  <div class="bannerGridright">
                    <div class="bannerGridtitle">数据方案组价</div>
                    <!-- <div class="bannerGridinfo">智能组价，优化方案设计</div> -->
                  </div>
                </div>
                <div v-if="windowWidth > 768" class="bannerGridshu" />
                <div class="bannerGriditem" @click.stop="pageJump('ai')">
                  <div class="bannerFabox frcc">
                    <i class="fa fa-android" style="font-size: 1.25rem; color: #fff"></i>
                  </div>
                  <div class="bannerGridright">
                    <div class="bannerGridtitle">人工智能应用</div>
                    <!-- <div class="bannerGridinfo">AI赋能，提升运行效率</div> -->
                  </div>
                </div>
                <div v-if="windowWidth > 768" class="bannerGridshu" />
                <div class="bannerGriditem" @click.stop="pageJump('video')">
                  <div class="bannerFabox frcc">
                    <i class="fa fa-play-circle" style="font-size: 1.25rem; color: #fff"></i>
                  </div>
                  <div class="bannerGridright">
                    <div class="bannerGridtitle">视频演示</div>
                    <!-- <div class="bannerGridinfo">直观教学，掌握核心技能</div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 系统简介 -->
      <div class="featuresBox">
        <div class="featuresImgTitleBox">
          <!--  -->
          <img :src="fileURL + homextjjbanner.secimg" class="featuresImg" />
          <div class="featuresImgTitle">
            <div class="featuresImgTitleCentent">系统简介</div>
          </div>
        </div>
        <div class="featuresContent">
          <div class="featuresRounded">
            <div class="featuresRoundedItem">
              <div class="featuresRoundedTop">
                <div class="featuresRoundedShu"></div>
                <div class="featuresRoundedTitle">{{ homecjbj.title }}</div>
              </div>
              <div class="featuresRoundedInfo2">
                {{ homecjbj.descriptioncontent }}
              </div>
              <!-- <div class="featuresRoundedInfo1">
                当前，建筑行业正在以科技创新推动现代化转型，新一代绿色化智能化建筑材料构筑新质生产力，逐步成为推动建筑业高质量发展的重要力量之一。
              </div>
              <div class="featuresRoundedInfo2">
                尤其在 “双碳背景和新型工业化建筑”
                发展模式下，需求拉动供给的同时，创新供给也创造了新需求，市场供需将发生显著变化，具有绿色化、集成化和智能化特征的新材料新产品与新服务，已逐步迈向市场，将极大地影响生产方式、建造成本和运行管理模式的创新。
              </div> -->
            </div>
            <div class="featuresRoundedItem">
              <div class="featuresRoundedTop">
                <div class="featuresRoundedShu"></div>
                <div class="featuresRoundedTitle">{{ homehgfw.title }}</div>
              </div>
              <div class="featuresRoundedInfo2">
                {{ homehgfw.descriptioncontent }}
              </div>
              <!-- <div class="featuresRoundedInfo1">
                价格查询系统信息涵盖新技术、新材料、新工艺、新服务和造价新型要素（例如，AI、BIM、IoT、GIS、DT、VR/AR、倾斜摄影和三维扫描融合应用）。
              </div>
              <div class="featuresRoundedInfo2">
                适用于绿色低碳、数字智能等高科技含量的新兴业态，以及持续提升城市基础设施韧性和既有建筑更新改造新时代
                "好房子" 的建造需求。
              </div> -->
            </div>
            <div class="featuresRoundedItem">
              <div class="featuresRoundedTop">
                <div class="featuresRoundedShu"></div>
                <div class="featuresRoundedTitle">{{ homeyydx.title }}</div>
              </div>
              <div class="featuresRoundedInfo2">
                {{ homeyydx.descriptioncontent }}
              </div>
              <!-- <div class="featuresRoundedInfo2">
                新材网价格查询系统，竭诚为货物采购单位和其他有关单位提供丰富的
                "原料"信息及其市场价格，供有关单位实施货物采购和预测工程费用参考。
              </div> -->
            </div>
            <div class="featuresRoundedItem" style="margin-bottom: 0">
              <div class="featuresRoundedTop">
                <div class="featuresRoundedShu"></div>
                <div class="featuresRoundedTitle">{{ homextcj.title }}</div>
              </div>
              <div class="featuresRoundedInfo2">
                {{ homextcj.descriptioncontent }}
              </div>
              <!-- <div class="featuresRoundedInfo2">
                本系统由 “杭州三才工程信息科技有限公司”
                创建，应用过程中如有建议，请联系我们，以便进行完善。
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 人材机信价格库 -->
      <div class="containerBox">
        <div class="containerTitle">人材机信价格库</div>
        <div class="containerHeng"></div>
        <div class="containerSubBoxOut">
          <div class="containerSubBox">
            <div :class="pcatePactive === 0 ? 'containerSubItem containerActive' : 'containerSubItem'"
              @click="pcatePchange(0)">
              数字技术应用论证/数字实施方案论证
            </div>
            <div :class="pcatePactive === 1 ? 'containerSubItem containerActive' : 'containerSubItem'"
              @click="pcatePchange(1)">
              材料/设备
            </div>
            <div :class="pcatePactive === 2 ? 'containerSubItem containerActive' : 'containerSubItem'"
              @click="pcatePchange(2)">
              智能建造装备
            </div>
            <div :class="pcatePactive === 3 ? 'containerSubItem containerActive' : 'containerSubItem'"
              @click="pcatePchange(3)">
              信息化产品/服务
            </div>
          </div>
        </div>
        <div class="containerGridbox">
          <template v-for="(item, index) in pcateZhu" :key="index">
            <img v-if="pcatePactive === 0 && item.title === '数字技术应用论证/数字实施方案论证'" :src="fileURL + item.secimg" />
            <img v-if="pcatePactive === 1 && item.title === '材料/设备'" :src="fileURL + item.secimg" />
            <img v-if="pcatePactive === 2 && item.title === '智能建造装备'" :src="fileURL + item.secimg" />
            <img v-if="pcatePactive === 3 && item.title === '信息化产品/服务'" :src="fileURL + item.secimg" />
          </template>
          <div class="containerGridMaod">
            <div class="containerGridContent">
              <div v-for="(item, index) in pcateChild" :key="index" class="containerGridItem">
                <i :class="['fa', item.theicon]"></i>
                <div class="containerGridimginfo">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 数字化解决方案 -->
      <div class="solutionsBox">
        <div class="solutionsCotent">
          <div class="solutionsTitle">数字化解决方案</div>
          <div class="solutionsHeng"></div>
          <div class="solutionsSubBoxOut">
            <div class="solutionsSubBox">
              <div v-for="(item, index) in solutionParent" :key="index"
                :class="['solutionsSubItem', item.id === solutionPactive ? 'solutionsActive' : '']"
                @click="solutionPchange(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="solutionsSubBoxOut">
            <div class="solutionsSubBox">
              <template v-for="(item, index) in solutionChild" :key="index">
                <div v-if="item.parent_id === solutionPactive" :class="[
                  'solutionsSubItem',
                  item.id === solutionCactive ? 'solutionsActive' : '',
                ]" @click="solutionCchange(item)">
                  {{ item.name }}
                </div>
              </template>
            </div>
          </div>
          <div class="solutionsImg">
            <img :src="solutionCform.img" alt="" style="width: 100%; height: 44rem" />
            <div class="solutionsImgTitleMoud">
              <div class="solutionsImgTitle1">{{ solutionCform.description1 }}</div>
              <div class="solutionsImgTitle2">{{ solutionCform.name }}</div>
              <div class="solutionsImgTitle3">{{ solutionCform.description2 }}</div>
            </div>
            <div class="solutionsImgInfo">
              <p>{{ solutionCform.description3 }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 人工智能应用 -->
      <div class="aiBox">
        <div class="aiContent">
          <div class="aiTitle">人工智能应用</div>
          <div class="aiHeng"></div>
          <div class="aiSubbox">
            <div class="aiFabox frcc">
              <i class="fa fa-cogs"></i>
            </div>
            <div class="aiSubtitle">业务管理+AI赋能组价</div>
          </div>
          <div class="aiClassbox">
            <div v-for="(item, index) in businessAi" :key="index" class="aiClassitem" @click="pageJump('ai_detail', {
              aixqid: item.id
            })">
              <div class="aiClassitemfa frcc">
                <i class="fa fa-paint-brush"></i>
              </div>
              <div class="aiClassitemtext">{{ item.name }}</div>
            </div>
          </div>
          <div class="aiSubbox">
            <div class="aiFabox2 frcc">
              <i class="fa fa-calculator"></i>
            </div>
            <div class="aiSubtitle">招标造价+AI应用服务</div>
          </div>
          <div class="aiClassbox">
            <div v-for="(item, index) in bidcostAi" :key="index" class="aiClassitem" @click="pageJump('ai_detail', {
              aixqid: item.id
            })">
              <div class="aiClassitemfa2 frcc">
                <i class="fa fa-check-circle"></i>
              </div>
              <div class="aiClassitemtext">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 鸣谢单位  -->
      <div class="mxBox">
        <div class="mxContent">
          <div class="mxTitle">鸣谢单位</div>
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

  .bannerBox {
    width: 100vw;
    height: 100%;
    background-color: #012060;

    .bannerAnchor {
      margin: 0 auto;
      position: relative;
      width: 100%;
      max-width: 1400px;

      @media (min-width: 992px) {
        height: 25.5rem;
      }

      @media (max-width: 992px) and (min-width: 768px) {
        height: 30.75rem;
      }

      @media (max-width: 768px) {
        height: 36.25rem;
      }

      .bannerImage {
        position: absolute;
        right: 2rem;
        top: 0;
        z-index: 0;
        width: auto;
        max-width: 80%;
        height: 80%;

        @media (max-width: 768px) {
          height: auto;
          right: 0;
          top: 8rem;
        }
      }

      .bannerAbsolute {
        position: absolute;
        z-index: 1;
        width: 100%;

        .bannerContent {
          margin: 0 auto;
          padding: 2rem;
          width: 100%;
          max-width: 1400px;

          @media (max-width: 768px) {
            padding: 1rem;
          }

          .bannerTitle {
            margin-bottom: 2rem;
            font-size: clamp(2rem, 4vw, 3rem);
            color: #fff;
            font-weight: 700;

            @media (max-width: 768px) {
              margin-bottom: 1.5rem;
            }
          }

          .bannerSubtitle {
            margin-bottom: 4rem;
            font-size: clamp(1.5rem, 4vw, 1.8rem);
            line-height: 3rem;
            font-weight: 500;
            color: rgb(255 255 255 / 0.9);

            @media (max-width: 768px) {
              margin-bottom: 2rem;
            }

            span {
              margin-right: 2rem;

              @media (max-width: 768px) {
                margin-right: 1rem;
              }
            }

            span:last-child {
              margin-right: 0;
            }
          }

          // .bannerJgkbtn {
          //   padding: 0.75rem 2rem;
          //   color: #fff;
          //   background-color: rgb(22 93 255);
          //   border-radius: 9999px;
          //   box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          // }

          // .bannerJjfabtn {
          //   margin-left: 20px;
          //   padding: 0.75rem 2rem;
          //   color: #fff;
          //   background-color: rgba(255 255 255 / 0.1);
          //   border: 1px solid rgba(255 255 255 / 0.3);
          //   border-radius: 9999px;
          // }

          .bannerCompany {
            margin-bottom: 1.5rem;
            font-size: clamp(1.125rem, 4vw, 1.25rem);
            line-height: 1.25rem;
            color: rgba(255 255 255 / 0.7);
          }

          .bannerGridbox {
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(103, 188, 255, 0.3);
            border-radius: 1rem;

            .bannerGriditem {
              padding: 1.5rem;
              display: flex;
              align-items: center;

              @media (min-width: 992px) {
                width: calc(25% - 1px);
              }

              @media (max-width: 992px) and (min-width: 768px) {
                width: calc(50% - 1px);
              }

              @media (max-width: 768px) {
                padding: 1rem;
                width: 100%;
              }

              .bannerFabox {
                width: 3rem;
                height: 3rem;
                background-color: rgb(22 93 255 / 0.1);
                border-radius: 0.5rem;
                --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                --tw-shadow-colored:
                  0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
                box-shadow:
                  var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
                  var(--tw-shadow);
              }

              .bannerGridright {
                margin-left: 1rem;

                .bannerGridtitle {
                  font-size: clamp(1.125rem, 4vw, 1.25rem);
                  // font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 700;
                  color: #fff;
                }

                .bannerGridinfo {
                  font-size: 1rem;
                  line-height: 1.5rem;
                  color: rgba(255 255 255 / 0.8);
                }
              }
            }

            .bannerGriditem:hover {
              @media (min-width: 768px) {
                cursor: pointer;
                box-shadow:
                  0 10px 15px -3px rgb(0 0 0 / 0.1),
                  0 4px 6px -4px rgb(0 0 0 / 0.1);
                animation: jumpUpwards 300ms ease-in-out forwards;
              }
            }

            .bannerGridshu {
              width: 1px;
              height: 5rem;
              background-image: linear-gradient(to bottom, #1627ff30);
            }
          }
        }
      }
    }
  }

  .featuresBox {
    margin: 1rem auto 0;
    width: 100%;

    .featuresImgTitleBox {
      position: relative;
      height: 200px;
      display: flex;
      justify-content: center;

      .featuresImg {
        width: 100%;
        height: 200px;
      }

      .featuresImgTitle {
        position: absolute;
        bottom: 0;
        padding: 0 2rem;
        width: 100%;
        max-width: 1400px;
        height: 120px;

        @media (max-width: 768px) {
          padding: 0;
        }

        .featuresImgTitleCentent {
          margin: 0 auto;
          padding-left: 1.5rem;
          width: 90%;
          height: 120px;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          line-height: 120px;
          font-weight: 700;
          color: #fff;
          background-color: rgba(1, 98, 105, 0.5);

          @media (max-width: 768px) {
            width: calc(100% - 2rem);
          }
        }
      }
    }

    .featuresContent {
      margin: 0 auto;
      position: relative;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0;
      }

      .featuresRounded {
        margin: 0 auto;
        padding: 2.5rem;
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 0 0 1rem 1rem;
        box-sizing:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
        background-color: rgba(230, 250, 250, 0.5);

        @media (max-width: 768px) {
          padding: 1rem;
          width: calc(100% - 2rem);
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
              background-color: #165dff;
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
              color: rgb(1 32 96);
            }
          }

          .featuresRoundedInfo1 {
            margin-bottom: 1rem;
            font-size: clamp(1rem, 4vw, 1.25rem);
            color: rgb(75 85 99);
          }

          .featuresRoundedInfo2 {
            font-size: clamp(1rem, 4vw, 1.25rem);
            color: rgb(75 85 99);
          }
        }
      }
    }
  }

  .containerBox {
    position: relative;
    margin: 6rem auto 0;
    padding: 0 2rem;
    width: 100%;
    max-width: 1400px;

    @media (max-width: 768px) {
      margin: 4rem 0;
      padding: 0 1rem;
    }

    .containerTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .containerHeng {
      margin: 1rem auto 2.5rem;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: rgb(22 93 255);
    }

    .containerSubBoxOut {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;

      .containerSubBox {
        overflow-x: auto;
        display: flex;
        flex-wrap: nowrap;

        .containerSubItem {
          flex-shrink: 0;
          margin: 0 0.5rem;
          padding: 0.5rem 1rem;
          line-height: 2rem;
          color: rgb(1 32 96);
          background-color: #fff;
          border-radius: 0.5rem;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            margin: 0 0.25rem;
          }
        }

        .containerSubItem:first-child {
          margin-left: 0;
        }

        .containerSubItem:last-child {
          margin-right: 0;
        }

        .containerSubItem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            background-color: rgb(243 244 246);
          }
        }
      }

      .containerActive {
        color: #fff !important;
        background-color: #165dff !important;
      }
    }

    .containerGridbox {
      position: relative;

      img {
        width: 100%;
        height: 700px;
        border-radius: 1rem;
      }

      .containerGridMaod {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 2rem 2rem 1rem 2rem;
        border-radius: 1rem 1rem 0 0;
        background-color: rgb(1 32 96 / 0.4);

        @media (max-width: 768px) {
          padding: 1rem 1rem 0 1rem;
        }

        .containerGridContent {
          display: flex;
          flex-wrap: wrap;

          .containerGridItem {
            margin: 0 1rem 1rem 0;
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-radius: 0.5rem;

            @media (max-width: 768px) {
              margin-right: 0;
              padding: 0.5rem;
              width: 100%;
            }

            i {
              font-size: 1.25rem;
              color: #165dff;
              margin-right: 0.75rem;
            }

            .containerGridimginfo {
              font-size: clamp(1rem, 4vw, 1.25rem);
              line-height: 2rem;
              font-weight: 500;
              color: #fff;
            }
          }

          .containerGridItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              background-color: rgb(255 255 255 / 0.1);
            }
          }
        }
      }
    }
  }

  .solutionsBox {
    margin: 6rem auto 0;
    padding: 2.5rem;
    width: 100%;
    background-color: rgb(240 247 255 / 1);

    @media (max-width: 768px) {
      margin: 4rem auto 0;
      padding: 2.5rem 0;
    }

    .solutionsCotent {
      margin: 0 auto;
      position: relative;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0 1em;
      }

      .solutionsTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .solutionsHeng {
        margin: 1rem auto 2.5rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: rgb(22 93 255);
      }

      .solutionsSubBoxOut {
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;

        .solutionsSubBox {
          overflow-x: auto;
          display: flex;
          flex-wrap: nowrap;

          div {
            flex-shrink: 0;
          }

          .solutionsSubItem {
            margin: 0 0.5rem;
            line-height: 2rem;
            color: rgb(1 32 96);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            background-color: #fff;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);

            @media (max-width: 768px) {
              margin: 0 0.25rem;
            }
          }

          // .solutionsSubItem:first-child {
          //   margin-left: 0;
          // }

          // .solutionsSubItem:last-child {
          //   margin-right: 0;
          // }

          .solutionsSubItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              background-color: rgb(243 244 246);
            }
          }
        }

        .solutionsActive {
          color: #fff !important;
          background-color: #165dff !important;
        }
      }

      .solutionsImg {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 700px;
        border-radius: 1rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        .solutionsImgTitleMoud {
          position: absolute;
          top: 2rem;
          left: 0;
          z-index: 2;
          width: 100%;

          .solutionsImgTitle1 {
            margin-bottom: 1rem;
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 2rem;
            font-weight: 500;
            text-align: center;
            color: rgb(1 32 96);
          }

          .solutionsImgTitle2 {
            margin-bottom: 1rem;
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            line-height: 2.5rem;
            font-weight: 700;
            text-align: center;
            color: rgb(1 32 96);
          }

          .solutionsImgTitle3 {
            margin-bottom: 1rem;
            font-size: clamp(1rem, 4vw, 1.25rem);
            line-height: 1.75rem;
            text-align: center;
            color: rgb(1 32 96);
          }
        }

        .solutionsImgInfo {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 2;
          width: 100%;
          padding: 2.5rem;
          border-top: 1px solid rgb(229 231 235);
          background-color: rgb(255 255 255 / 0.8);

          @media (max-width: 768px) {
            padding: 1.5rem 1rem;
          }

          p {
            text-align: center;
            line-height: 1.5rem;
            color: rgb(1 32 96);
          }
        }
      }
    }
  }

  .aiBox {
    padding: 4rem 2.5rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);

    @media (max-width: 768px) {
      padding: 4rem 0;
    }

    .aiContent {
      position: relative;
      margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0 1rem;
      }

      .aiTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .aiHeng {
        margin: 1rem auto 2.5rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: rgb(22 93 255);
      }

      .aiSubbox {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;

        .aiFabox {
          margin-right: 1rem;
          width: 3rem;
          height: 3rem;
          background-color: rgba(22 93 255 / 0.1);
          border-radius: 9999px;

          i {
            font-size: 1.25rem;
            color: #165dff;
          }
        }

        .aiFabox2 {
          margin-right: 1rem;
          width: 3rem;
          height: 3rem;
          background-color: rgb(114 46 209 / 0.1);
          border-radius: 9999px;

          i {
            font-size: 1.25rem;
            color: #722ed1;
          }
        }

        .aiSubtitle {
          font-size: clamp(1.25rem, 4vw, 1.5rem);
          line-height: 2rem;
          font-weight: 700;
          color: rgb(1 32 96);
        }
      }

      .aiClassbox {
        margin-bottom: 2.5rem;
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          margin-bottom: 1.5rem;
        }

        .aiClassitem {
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

          .aiClassitemfa {
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
              color: #165dff;
            }
          }

          .aiClassitemfa2 {
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

          .aiClassitemtext {
            line-height: 1.5rem;
            font-weight: 500;
            text-align: center;
            color: rgb(1 32 96);
          }
        }

        .aiClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }

      .aiClassbox:last-child {
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
        background-color: rgb(22 93 255);
      }

      .mxInfo {
        margin: 1rem auto 2.5rem;
        text-align: center;
        max-width: 42rem;
        color: rgb(75 85 99);
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
    margin: 6rem auto 0;
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
      background-color: rgb(22 93 255);
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
