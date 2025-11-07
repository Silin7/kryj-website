<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import pageJump from '@/hooks/pageJump'
import formatCurrency from '@/hooks/formatCurrency'
import { fileURL } from '@/api/baseConfig'
import { articlescateApi, suppliercompaniescertificatesApi, suppliercompaniescasesApi, suppliercompaniesproductsApi } from '@/api/modules/supplier'

// 路由信息
const route = useRoute()

const tabstate = ref('gsjs')
const supplierid: any = ref("")
const supplierDetails: any = ref({})
const gyszzList: any = ref([])
const gysalList: any = ref([])
const gyscpState = ref('')
const gyscpList: any = ref([])

function getSupplierdetail() {
  // 供应商详情
  articlescateApi(supplierid.value).then((res: any) => {
    if (res) {
      supplierDetails.value = res.data
    }
    // 供应商资质
    suppliercompaniescertificatesApi(supplierid.value).then((res: any) => {
      if (res) {
        gyszzList.value = res.data
      }
    })
    // 供应商案例
    suppliercompaniescasesApi(supplierid.value).then((res: any) => {
      if (res) {
        gysalList.value = res.data
      }
    })
    // 供应商产品
    suppliercompaniesproductsApi(supplierid.value).then((res: any) => {
      if (res) {
        gyscpList.value = res.data
      }
    })
  })
}

// 产品状态切换
function gyscpStateChange(state: string) {
  gyscpState.value = state
  // 供应商产品
  suppliercompaniesproductsApi(supplierid.value).then((res: any) => {
    if (res) {
      if (state === '') {
        gyscpList.value = res.data
      } else {
        gyscpList.value = res.data.filter((item: any) => {
          return item.product_type.toString() === state
        })
      }
    }
  })
}

// 产品详情
function gyscpDetail(item: any) {
  const query = {
    id: item.id,
    name: '',
  }
  if (item.product_type === 0) {
    query.name = 'scheme'
  } else if (item.product_type === 1) {
    query.name = 'materials'
  } else if (item.product_type === 2) {
    query.name = 'sale'
  } else if (item.product_type === 3) {
    query.name = 'products'
  }
  pageJump('products_detail', query)
}

// 供应商联系方式 弹框
const dialogVisible: any = ref(false)

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  supplierid.value = route.query.supplierid
  getSupplierdetail()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="sdPage">
    <div class="sdHbox">
      <div class="sdHcontent">
        <div class="sdNavigation">
          <span @click="pageJump('home')">首页</span>
          <span class="sdNavigationXg">/</span>
          <span @click="pageJump('supplier')">供应商列表</span>
          <span class="sdNavigationXg">/</span>
          <span class="sdNavigationSp">{{ supplierDetails.company_name }}</span>
        </div>

        <div class="sdhGys">
          <img v-if="supplierDetails.company_imgs" :src="fileURL + supplierDetails.company_imgs[0]" alt="企业图片"
            class="supplierPiImg" />
          <div class="sdhgCenter">
            <div class="sdhgcTop">
              <div class="sdhgctTitle">{{ supplierDetails.company_name }}</div>
              <!-- <div class="sdhgctInfo">
                <i class="fa fa-star"></i>
                <span>4.8</span>
                <span>|</span>
                <span>优质供应商</span>
              </div> -->
            </div>
            <div class="sdhgcCbox">
              <div class="sdhgcCitem">
                <i class="fa fa-tags"></i>
                <span>主营：{{ supplierDetails.main_business }}</span>
              </div>
              <div class="sdhgcCitem">
                <i class="fa fa-map-marker"></i>
                <span>{{ supplierDetails.province_name }}{{ supplierDetails.city_name }}</span>
              </div>
              <div class="sdhgcCitem">
                <i class="fa fa-building-o"></i>
                <span>成立于{{ supplierDetails.establish_time_str }}</span>
              </div>
              <div class="sdhgcCitem">
                <i class="fa fa-users"></i>
                <span>企业规模：{{ supplierDetails.scale_name }}</span>
              </div>
            </div>
            <div class="sdhgcTags">
              <div v-for="(item, index) in supplierDetails.tags" :key="index" class="sdhgcTag">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="sdhgRight">
            <button class="sdhgcLxgys" @click="dialogVisible = true">
              <i class="fa fa-phone"></i>
              <span>联系供应商</span>
            </button>
            <!-- <span><a :href="'tel:' + supplierDetails.tel">联系供应商</a></span> -->
            <button class="sdhgcJrgwc">
              <i class="fa fa-star-o"></i>
              <span>收藏</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="sdCbox">
      <div class="sdcIContent">
        <div class="sdclFl">
          <button :class="tabstate === 'gsjs' ? 'sdclflAc' : ''" @click="tabstate = 'gsjs'">
            公司简介
          </button>
          <button :class="tabstate === 'hzal' ? 'sdclflAc' : ''" @click="tabstate = 'hzal'">
            合作案例
          </button>
          <button :class="tabstate === 'cplb' ? 'sdclflAc' : ''" @click="tabstate = 'cplb'">
            产品列表
          </button>
          <button :class="tabstate === 'lxfs' ? 'sdclflAc' : ''" @click="tabstate = 'lxfs'">
            联系方式
          </button>
        </div>
        <div v-if="tabstate === 'gsjs'" class="sdclGsjj">
          <div class="sdclxTitle">公司简介</div>
          <div class="sdclxSub" v-html="supplierDetails.company_intro"></div>
          <!-- <div class="sdclxSub">
            BIM+杭州筑智信息技术有限公司成立于2015年，是国内领先的建筑行业数字化解决方案提供商。公司专注于为建筑行业客户提供BIM技术应用、工程数字化咨询、智能设计方案及数字孪生建模等全方位服务。
          </div>
          <div class="sdclxSub">
            公司拥有一支由BIM工程师、建筑设计师、软件开发工程师组成的专业团队，核心成员均具有10年以上建筑行业经验。凭借深厚的行业积累和技术实力，公司已获得甲级BIM咨询资质、ISO9001质量管理体系认证等多项资质认证。
          </div>
          <div class="sdclxSub">
            自成立以来，筑智信息始终坚持"以技术驱动建筑创新"的理念，先后为300+大型项目提供数字化服务，涵盖市政工程、商业综合体、轨道交通、医疗建筑等多个领域，服务客户包括中建、中铁、万科等知名企业。
          </div> -->
          <!-- <div class="sdclxItem">
            <div class="sdclxiTitle">核心优势</div>
            <div class="sdclxiIbox">
              <div class="sdclxiInfo">
                <div class="sdclxiFa">
                  <i class="fa fa-lightbulb-o"></i>
                </div>
                <div class="sdclxiTt">技术领先</div>
                <div class="sdclxiSt">
                  拥有自主研发的BIM协同平台，掌握数字孪生核心技术，技术实力行业领先
                </div>
              </div>
              <div class="sdclxiInfo">
                <div class="sdclxiFa">
                  <i class="fa fa-lightbulb-o"></i>
                </div>
                <div class="sdclxiTt">专业团队</div>
                <div class="sdclxiSt">
                  100+专业技术人员，核心成员均有10年以上行业经验，服务经验丰富
                </div>
              </div>
              <div class="sdclxiInfo">
                <div class="sdclxiFa">
                  <i class="fa fa-lightbulb-o"></i>
                </div>
                <div class="sdclxiTt">品质保障</div>
                <div class="sdclxiSt">
                  严格的质量管理体系，标准化服务流程，确保项目交付质量与效率
                </div>
              </div>
            </div>
          </div> -->
          <div v-if="gyszzList && gyszzList.length > 0" class="sdclxItem">
            <div class="sdclxiTitle">资质证书</div>
            <div class="sdclxiCgBox">
              <div v-for="(item, index) in gyszzList" :key="index" class="sdclxiCgItem">
                <img v-if="item.qualification_imgs" :src="fileURL + item.qualification_imgs[0]" alt="企业图片"
                  class="supplierPiImg" />
                <div class="sdclxicIp">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabstate === 'hzal'" class="sdclHzal">
          <!-- <div class="sdclHzalRow">
            <button class="sdclHzalColActive">全部案例</button>
            <button class="sdclHzalCol">商业综合体</button>
            <button class="sdclHzalCol">市政工程</button>
            <button class="sdclHzalCol">轨道交通</button>
            <button class="sdclHzalCol">医疗建筑</button>
          </div> -->
          <div class="sdclHzalBox">
            <div class="sdclHzalItem" v-for="(item, index) in gysalList" :key="index" @click="pageJump('supplier_al', {
              alid: item.id
            })">
              <div class="sdclHzalImgBox">
                <img v-if="item.case_imgs" :src="fileURL + item.case_imgs[0]" alt="企业案例" class="sdclHzalImg" />
                <div class="sdclHzalImgTag">{{ item.case_type_name }}</div>
              </div>
              <div class="sdclHzalBox">
                <div class="sdclHzalTitle">{{ item.name }}</div>
                <div class="sdclHzalInfo">
                  {{ item.description }}
                  <!-- 近日，住房和城乡建设部正式发布《建筑业数字化转型发展指南》，提出到2025年，建筑业数字化转型取得明显进展，打造一批建筑产业互联网平台，培育一批行业级、企业级数字建造解决方案。指南明确了数字化转型的重点任务和保障措施，为行业发展指明方向。 -->
                </div>

                <div class="sdclHzalClass">
                  <div v-for="(item2, index2) in item.case_tags" :key="index2" class="sdclHzalCitrm">
                    <span class="sdclHzalClassSpan">{{ item2 }}</span>
                  </div>
                </div>
                <div class="sdclHzalCright">
                  <button>查看详情</button>
                  <i class="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabstate === 'cplb'" class="sdclHzal">
          <div class="sdclHzalRow">
            <button :class="gyscpState === '' ? 'sdclHzalColActive' : 'sdclHzalCol'"
              @click="gyscpStateChange('')">全部产品</button>
            <button :class="gyscpState === '0' ? 'sdclHzalColActive' : 'sdclHzalCol'"
              @click="gyscpStateChange('0')">数字技术应用论证/数字实施方案论证</button>
            <button :class="gyscpState === '1' ? 'sdclHzalColActive' : 'sdclHzalCol'"
              @click="gyscpStateChange('1')">材料/设备</button>
            <button :class="gyscpState === '2' ? 'sdclHzalColActive' : 'sdclHzalCol'"
              @click="gyscpStateChange('2')">智能建造装备</button>
            <button :class="gyscpState === '3' ? 'sdclHzalColActive' : 'sdclHzalCol'"
              @click="gyscpStateChange('3')">信息化产品/服务</button>
          </div>
          <div class="sdclCplbBox">
            <div class="sdclCplbItem" v-for="(item, index) in gyscpList" :key="index" @click="gyscpDetail(item)">
              <div class="sdclCplbImgBox">
                <img v-if="item.imgs" :src="fileURL + item.imgs[0]" alt="产品图片" class="sdclCplbImg" />
                <div class="sdclCplbImgTag">{{ item.product_type_name }}</div>
              </div>
              <div class="sdclCplbBox2">
                <div v-if="item.product_type === 0" class="sdclCplbTitle">{{ item.servicename }}</div>
                <div v-if="item.product_type === 1" class="sdclCplbTitle">{{ item.materialname }}</div>
                <div v-if="item.product_type === 2" class="sdclCplbTitle">{{ item.equipmentname }}</div>
                <div v-if="item.product_type === 3" class="sdclCplbTitle">{{ item.itname }}</div>
                <div class="sdclCplbInfo">
                  {{ item.description }}
                </div>
                <div class="sdclCplbCbtm">
                  <div class="sdclCplbCprice">¥ {{ formatCurrency(item.pretaxprice, 2) }}</div>
                  <div class="sdclCplbCright">
                    <button>详情</button>
                    <i class="fa fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabstate === 'lxfs'" class="sdclGsjj">
          <div class="sdclxTitle">联系方式</div>
          <div class="sdLxfsBox">
            <div class="sdLxfsItem">
              <div class="frsc">
                <div class="sdLxfsIbox frcc">
                  <i class="fa fa-map-marker"></i>
                </div>
                <div class="sdLxfsGsdz">
                  <p>公司地址</p>
                  <p>山东省杭州市滨江区江南大道1000号智慧大厦15层</p>
                </div>
              </div>
              <!-- <img src="https://picsum.photos/600/300?random=701" alt="公司位置地图" class="sdLxfsFsdz" /> -->
            </div>
            <div class="sdLxfsItem">
              <div class="sdLxfsRi">
                <div class="sdLxfsRiFa frcc">
                  <i class="fa fa-map-marker"></i>
                </div>
                <div class="sdLxfsRiCt">
                  <p>联系电话</p>
                  <p>{{ supplierDetails.tel }}</p>
                </div>
              </div>
              <div class="sdLxfsRi">
                <div class="sdLxfsRiFa frcc">
                  <i class="fa fa-map-marker"></i>
                </div>
                <div class="sdLxfsRiCt">
                  <p>电子邮箱</p>
                  <p>{{ supplierDetails.email }}</p>
                </div>
              </div>
              <div class="sdLxfsRi">
                <div class="sdLxfsRiFa frcc">
                  <i class="fa fa-map-marker"></i>
                </div>
                <div class="sdLxfsRiCt">
                  <p>官方平台</p>
                  <a :href="supplierDetails.official_website" target="_blank">{{ supplierDetails.official_website }}</a>
                  <!-- <p>微信公众号：筑智信息服务平台</p> -->
                </div>
              </div>
              <!-- <div class="sdLxfsRi">
                <img src="https://picsum.photos/600/300?random=701" alt="二维码" class="sdLxfsEwm" />
                <div class="sdLxfsEbox">
                  <p>扫码关注</p>
                  <p>获取最新产品及服务信息</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="供应商联系方式" width="320px">
      <div style="padding: 1rem 0;">
        <i class="fa fa-phone mr-2" style="color: #2d6dff;"></i>
        {{ supplierDetails.tel }}
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.sdPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .sdHbox {
    background-color: #f0f7ff;
    border-bottom: 1px solid #e0e7ff;

    .sdHcontent {
      margin: 0 auto;
      padding: 6rem 2rem 2rem;
      width: 100%;
      max-width: 1400px;
      color: rgb(1 32 96);

      @media (max-width: 992px) {
        padding: 5rem 1rem 1rem;
      }

      .sdNavigation {
        margin: 0 auto 1.5rem;

        span {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(107 114 128);
        }

        span:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            color: #1f3e85;
          }
        }

        .sdNavigationXg {
          margin: 0 0.5rem;
        }

        .sdNavigationSp {
          color: #1f3e85;
        }
      }

      .sdhGys {
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
        }

        img {
          padding: 0.25rem;
          width: calc(100% - 0.5rem);
          height: 8rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (min-width: 992px) {
            width: 8rem;
          }
        }

        .sdhgCenter {
          margin-top: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            margin-top: 0;
            width: calc(100% - 20rem);
          }

          .sdhgcTop {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .sdhgctTitle {
              font-weight: 700;
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              color: rgb(1 32 96);
            }

            .sdhgctInfo {
              margin-top: 1rem;
              font-weight: 500;
              font-size: 0.875rem;
              line-height: 1.25rem;
              padding: 0.25rem 0.75rem;
              color: rgb(255 255 255);
              background-color: rgb(131 203 172);
              border-radius: 9999px;

              @media (min-width: 992px) {
                margin-top: 0;
                margin-left: 1rem;
              }

              span {
                margin-left: 0.25rem;
              }
            }
          }

          .sdhgcCbox {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .sdhgcCitem {
              width: 100%;
              height: 3rem;
              display: flex;
              align-items: center;

              @media (min-width: 992px) {
                width: calc(50% - 0.5rem);
              }

              i {
                flex-shrink: 0;
                font-size: 1rem;
                width: 1rem;
                color: #1f3e85;
                margin-right: 0.5rem;
              }

              span {
                color: rgb(75 85 99);
              }
            }
          }

          .sdhgcTags {
            display: flex;
            flex-wrap: wrap;

            .sdhgcTag {
              flex-shrink: 0;
              margin-right: 0.5rem;
              margin-bottom: 0.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              padding: 0.25rem 0.75rem;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 9999px;
              color: #1f3e85;
            }
          }
        }

        .sdhgRight {
          margin-top: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            margin-top: 0;
            width: 10rem;
          }

          .sdhgcLxgys {
            padding: 0.75rem 1rem;
            width: 100%;
            text-align: center;
            font-weight: 500;
            line-height: 1.5rem;
            color: #fff;
            background-color: rgb(22 93 255 / 0.9);
            border-radius: 0.5rem;

            i {
              margin-right: 0.5rem;
            }
          }

          .sdhgcJrgwc {
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            width: 100%;
            text-align: center;
            font-weight: 500;
            line-height: 1.5rem;
            color: rgb(55 65 81);
            border: 1px solid rgb(209 213 219);
            border-radius: 0.5rem;

            i {
              margin-right: 0.5rem;
            }
          }
        }
      }
    }
  }

  .sdCbox {
    position: relative;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 1400px;
    color: rgb(1 32 96);

    @media (max-width: 768px) {
      padding: 1rem;
    }

    .sdcIContent {
      width: 100%;

      .sdclFl {
        overflow-x: auto;
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 2rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          margin-bottom: 1rem;
        }

        button {
          flex-shrink: 0;
          font-size: 1.125rem;
          line-height: 1.75rem;
          padding: 1rem 1.5rem;
          color: rgb(55 65 81);
        }

        .sdclflAc {
          color: #1f3e85;
          border-bottom: 2px solid #1f3e85;
        }
      }

      .sdclGsjj {
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
        }

        .sdclxTitle {
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
          border-bottom: 1px solid rgb(243 244 246);
        }

        .sdclxSub {
          margin-bottom: 1rem;
          line-height: 1.625;
          font-size: 1.125rem;
          color: rgb(55 65 81);
        }

        .sdclxItem {
          margin-top: 1.5rem;

          .sdclxiTitle {
            margin-bottom: 0.75rem;
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.75rem;
          }

          .sdclxiIbox {
            @media (min-width: 992px) {
              display: flex;
              justify-content: space-between;
            }
          }

          .sdclxiInfo {
            margin-bottom: 1rem;
            padding: 1rem;
            line-height: 1.5rem;
            background-color: rgb(240 247 255);
            border-radius: 0.75rem;

            @media (min-width: 992px) {
              padding: 1.5rem;
              width: calc(33.3% - 0.5rem);
            }

            .sdclxiFa {
              margin-bottom: 1rem;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 3rem;
              height: 3rem;
              color: #1f3e85;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 0.5rem;
            }

            .sdclxiTt {
              font-weight: 700;
              font-size: 1.125rem;
              line-height: 1.75rem;
              margin-bottom: 0.5rem;
            }

            .sdclxiSt {
              color: rgb(75 85 99);
            }
          }

          .sdclxiCgBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .sdclxiCgItem {
              overflow: hidden;
              margin-bottom: 1rem;
              width: 100%;
              background-color: rgb(255 255 255);
              border-radius: 0.5rem;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
              border: 1px solid rgb(229 231 235);

              @media (min-width: 992px) {
                margin-bottom: 0;
                width: calc(25% - 0.5rem);
              }

              img {
                width: 100%;
                height: 10rem;
              }

              .sdclxicIp {
                font-size: 0.875rem;
                line-height: 1.25rem;
                text-align: center;
                padding: 0.75rem;
              }
            }

            .sdclxiCgItem:last-child {
              margin-bottom: 0;
            }

            .sdclxiCgItem:hover {
              @media (min-width: 768px) {
                cursor: pointer;
              }
            }
          }
        }

        .sdLxfsBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .sdLxfsItem {
            margin-bottom: 1rem;
            width: calc(100%);
            padding: 1rem;
            background-color: rgb(240 247 255);
            border-radius: 0.75rem;

            @media (min-width: 992px) {
              padding: 1.5rem;
            }

            .sdLxfsIbox {
              flex-shrink: 0;
              width: 3rem;
              height: 3rem;
              color: #1f3e85;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 0.5rem;
            }

            .sdLxfsGsdz {
              margin-left: 1rem;

              p:first-child {
                font-weight: 700;
                font-size: 1.125rem;
                line-height: 1.75rem;
                margin: 0 0 0.5rem;
              }

              p:last-child {
                color: rgb(55 65 81);
                margin: 0;
              }
            }

            .sdLxfsFsdz {
              box-sizing: border-box;
              margin-top: 1rem;
              width: 100%;
              height: 12rem;
              border-width: 1px;
              border-radius: 0.5rem;

              @media (min-width: 992px) {
                margin: 1rem 0 0 4rem;
                width: calc(100% - 8rem);
              }
            }

            .sdLxfsRi {
              display: flex;
              margin-bottom: 1.5rem;

              .sdLxfsRiFa {
                flex-shrink: 0;
                width: 2.5rem;
                height: 2.5rem;
                color: #1f3e85;
                background-color: rgb(22 93 255 / 0.1);
                border-radius: 9999px;
              }

              .sdLxfsRiCt {
                margin-left: 1rem;

                p {
                  margin-bottom: 0.25rem;
                  font-weight: 500;
                  line-height: 1.5rem;
                  color: rgb(55 65 81);
                }

                p:first-child {
                  color: rgb(1 32 96);
                }

                a {
                  display: inline-block;
                  margin-bottom: 0.25rem;
                  font-weight: 500;
                  line-height: 1.5rem;
                  color: #1f3e85;
                }
              }

              .sdLxfsEwm {
                box-sizing: border-box;
                padding: 0.25rem;
                width: 7rem;
                height: 7rem;
                border-radius: 0.5rem;
                background-color: #fff;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
              }

              .sdLxfsEbox {
                margin-left: 1rem;
                height: 7rem;
                display: flex;
                flex-flow: column;
                justify-content: center;

                p:first-child {
                  line-height: 1.5rem;
                  font-weight: 500;
                  margin-bottom: 0.25rem;
                  color: rgb(1 32 96);
                }

                p:last-child {
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
                }
              }
            }

            .sdLxfsRi:last-child {
              margin-bottom: 0;
            }
          }

          .sdLxfsItem:last-child {
            margin-bottom: 0;

            @media (min-width: 992px) {
              width: calc(50% - 1rem);
            }
          }
        }
      }

      .sdclHzal {
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
        }

        .sdclHzalRow {
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .sdclHzalCol {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: rgb(1 32 96);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid rgb(243 244 246);
            border-radius: 9999px;

            @media (max-width: 768px) {
              margin: 0 0.5rem 0.5rem 0;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }

          .sdclHzalCol:hover {
            @media (min-width: 768px) {
              background-color: rgb(243 244 246);
            }
          }

          .sdclHzalColActive {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: #fff;
            background-color: #1f3e85;
            border: 1px solid rgb(243 244 246);
            border-radius: 9999px;

            @media (max-width: 768px) {
              margin: 0 0.5rem 0.5rem 0;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }
        }

        .sdclHzalBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .sdclHzalItem {
            overflow: hidden;
            margin-bottom: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid rgb(229 231 235);

            @media (min-width: 992px) {
              width: calc(50% - 0.75rem);
            }

            .sdclHzalImgBox {
              position: relative;
              width: 100%;

              .sdclHzalImg {
                width: 100%;
                height: 14rem;
              }

              .sdclHzalImgTag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                z-index: 10;
                border-radius: 0.25rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 700;
                color: #fff;
                background-color: #1f3e85;
              }
            }

            .sdclHzalBox {
              width: 100%;
              padding: 1rem;

              @media (min-width: 992px) {
                padding: 1.5rem;
              }

              .sdclHzalTitle {
                width: 100%;
                margin-bottom: 1rem;
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: 700;
                color: rgb(1 32 96);
              }

              .sdclHzalInfo {
                margin-bottom: 1rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);
              }

              .sdclHzalClass {
                margin-bottom: 1rem;
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .sdclHzalCitrm {
                  margin-right: 0.5rem;
                  padding: 0.25rem 0.5rem;
                  font-size: 0.875rem;
                  line-height: 1rem;
                  color: rgb(75 85 99);
                  background-color: rgb(243 244 246);
                  border-radius: 0.25rem;
                }

                .sdclHzalCitrm:last-child {
                  margin-right: 0;
                }
              }

              .sdclHzalCright {
                display: flex;
                align-items: center;
                font-weight: 500;
                line-height: 1.5rem;
                font-size: 0.875rem;
                color: #1f3e85;

                button {
                  margin-right: 0.5rem;
                  font-size: 0.875rem;
                  color: #1f3e85;
                }
              }
            }
          }

          .sdclHzalItem:last-child {
            @media (max-width: 992px) {
              margin-bottom: 0;
            }
          }

          .sdclHzalItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
            }
          }
        }

        .sdclCplbBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .sdclCplbItem {
            overflow: hidden;
            margin-bottom: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid rgb(229 231 235);

            @media (min-width: 992px) {
              width: calc(33.3% - 0.75rem);
            }

            .sdclCplbImgBox {
              position: relative;
              width: 100%;

              .sdclCplbImg {
                width: 100%;
                height: 12rem;
              }

              .sdclCplbImgTag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                z-index: 10;
                border-radius: 0.25rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 700;
                color: #fff;
                background-color: #1f3e85;
              }
            }

            .sdclCplbBox2 {
              width: 100%;
              padding: 1rem;

              @media (min-width: 992px) {
                padding: 1.5rem;
              }

              .sdclCplbTitle {
                margin-bottom: 1rem;
                font-size: 1.125rem;
                line-height: 1.75rem;
                font-weight: 700;
                color: rgb(1 32 96);
              }

              .sdclCplbInfo {
                margin-bottom: 1rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);
              }

              .sdclCplbCbtm {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .sdclCplbCprice {
                  font-weight: 700;
                  color: #1f3e85;
                }

                .sdclCplbCright {
                  display: flex;
                  align-items: center;
                  font-weight: 500;
                  line-height: 1.5rem;
                  font-size: 0.875rem;
                  color: #1f3e85;

                  button {
                    margin-right: 0.5rem;
                    font-size: 0.875rem;
                    color: #1f3e85;
                  }
                }
              }
            }
          }

          .sdclCplbItem:last-child {
            @media (max-width: 992px) {
              margin-bottom: 0;
            }
          }

          .sdclCplbItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            }

            .sdclCplbImg {
              transform: scale(1.05);
            }

            .sdclCplbTitle {
              color: #1f3e85;
            }
          }
        }
      }
    }
  }
}
</style>

<style>
/* 评分 style */
.el-rate {
  padding-bottom: 0.25rem !important;
}

.sdcrTop .el-rate__icon {
  margin-right: 0 !important;
}
</style>
