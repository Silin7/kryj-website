<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import useDebounce from '@/utils/useDebounce'
import { fileURL } from '@/api/baseConfig'
import { sysprovincesApi, syscitiesApi } from '@/api/modules/basic'
import { suppliercompaniesApi } from '@/api/modules/supplier'
import { bannerlistApi, secpositionsApi, syspseoApi } from '@/api/modules/basic'

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
        ],
      })
    }
  })
}

// 省 列表
const province_id: any = ref('')
const provincesList: any = ref([])
const city_id: any = ref('')
const citiesList: any = ref([])
const company_name: any = ref('')

function getSysprovinces() {
  sysprovincesApi().then((res: any) => {
    if (res) {
      provincesList.value = res
    }
  })
}

function provinceChange(value: any) {
  citiesList.value = []
  city_id.value = ''
  if (value) {
    syscitiesApi(value).then((res: any) => {
      if (res) {
        citiesList.value = res
      }
    })
  }
}

// 供应商公司列表
const currentPage: any = ref(1)
const pageSize: any = ref(10)
const total: any = ref(0)
const suppliercompanies: any = ref([])

// 用户端-获取供应商公司列表（含完整字段，按创建时间倒序）
function getSuppliercompanies() {
  suppliercompaniesApi({
    page: currentPage.value,
    pageSize: pageSize.value,
    province_id: province_id.value,
    city_id: city_id.value,
    company_name: company_name.value,
  }).then((res: any) => {
    console.log(res.data)
    if (res) {
      suppliercompanies.value = res.data
      total.value = res.total
    }
  })
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
  getSysprovinces()
  getSuppliercompanies()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="supplierPage">
    <!-- BANNER -->
    <div class="bannerBox" @click="windowOpen(bannerData.url, bannerData.istourl)">
      <img :src="fileURL + bannerData.imgurl" alt="" />
      <div class="bannerAbsolute">
        <div class="bannerContent">
          <div class="bannerTitle">{{ bannerData.maintitle }}</div>
          <div v-if="bannerData.subtitle" class="bannerSubtitle">
            {{ bannerData.subtitle }}
          </div>
          <div class="frsc">
            <button v-if="bannerData.leftbtn && !bannerData.leftbtn_url" class="bannerLeftBtn">
              {{ bannerData.leftbtn }}
            </button>
            <button v-if="bannerData.leftbtn && bannerData.leftbtn_url" class="bannerLeftBtn"
              @click.stop="pageJump(bannerData.leftbtn_url)">
              {{ bannerData.leftbtn }}
            </button>
            <button v-if="bannerData.rightbtn && !bannerData.rightbtn_url" class="bannerRightBtn">
              {{ bannerData.rightbtn }}
            </button>
            <button v-if="bannerData.rightbtn && bannerData.rightbtn_url" class="bannerRightBtn"
              @click.stop="pageJump(bannerData.rightbtn_url)">
              {{ bannerData.rightbtn }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="supplierBox">
      <!-- 供应商筛选 -->
      <div class="supplierClass">
        <div class="supplierClassTitle">供应商筛选</div>
        <div class="supplierClassFx">
          <div class="supplierClassFxItem">
            <div class="supplierClassText">所在省份</div>
            <el-select v-model="province_id" placeholder="Select" size="large" clearable @change="provinceChange">
              <el-option v-for="(item, index) in provincesList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </div>
          <div class="supplierClassFxItem">
            <div class="supplierClassText">所在城市</div>
            <el-select v-model="city_id" placeholder="Select" size="large" clearable @change="getSuppliercompanies">
              <el-option v-for="(item, index) in citiesList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </div>
        </div>
        <!-- <div class="supplierClassText">类别</div>
        <div class="supplierClassRow">
          <button class="supplierClassColActive">全部</button>
          <button class="supplierClassCol">数字技术应用论证/数字实施方案论证</button>
          <button class="supplierClassCol">材料/设备</button>
          <button class="supplierClassCol">智能建造装备</button>
          <button class="supplierClassCol">信息化产品/服务</button>
        </div> -->
        <el-input v-model="company_name" style="width: 100%; height: 40px; font-size: 1rem" placeholder="搜索供应商名称..."
          :prefix-icon="Search" @input="useDebounce().fn(getSuppliercompanies)" />
      </div>
      <!-- 供应商列表 -->
      <div class="supplierProducts">
        <div class="supplierProductsTitle">
          <div class="supplierProductsTitleText">供应商列表</div>
        </div>
        <div class="supplierProductsBox">
          <div class="supplierProductsItem" v-for="(item, index) in suppliercompanies" :key="index"
            @click="pageJump('supplier_detail', { supplierid: item.id })">
            <div class="supplierPiContent">
              <div class="supplierPiImgBox">
                <img v-if="item.company_imgs" :src="fileURL + item.company_imgs[0]" alt="企业图片" class="supplierPiImg" />
                <!-- <img src="@/assets/photo-1560518883-ce09059eeffa.jpg" /> -->
                <!-- <div class="supplierPiImgTag">政策</div> -->
              </div>
              <div class="supplierPiBox">
                <div class="supplierPiTop">
                  <div class="supplierPiTitle">{{ item.company_name }}</div>
                  <!-- <div class="supplierPingFen">
                    <i class="fa fa-star"></i>
                    <span>4.8</span>
                  </div> -->
                </div>
                <div class="supplierPiInfo">
                  <i class="fa fa-tags"></i>
                  主营：{{ item.main_business }}
                </div>
                <div class="supplierPiInfo">
                  <i class="fa fa-map-marker"></i>
                  所在地：{{ item.province_name }}{{ item.city_name }}
                  <i class="fa fa-building-o"></i>
                  成立时间：{{ item.establish_time_str }}
                </div>
                <div class="supplierPiTags">
                  <div v-for="(item2, index2) in item.tags" :key="index2" class="supplierPiTag">
                    {{ item2 }}
                  </div>
                </div>
                <!-- <div class="supplierPiFuwu">
                  <i class="fa fa-check-circle"></i>
                  {{ item.company_intro }}
                </div> -->
              </div>
            </div>
            <div class="supplierPiClass">
              <div class="supplierPiCitrm">
                <i class="fa fa-phone"></i>
                <span class="supplierPiClassSpan">{{ item.tel }}</span>
              </div>
              <div class="supplierPiCright">
                <button>查看详情</button>
                <i class="fa fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="supplierPagination">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" size="default" background
            layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="total"
            @current-change="getSuppliercompanies" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.supplierPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .supplierBox {
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;

    @media (min-width: 992px) {
      padding: 4rem 1rem;
    }

    .supplierClass {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border-radius: 1rem;
      color: rgb(1 32 96);
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      @media (max-width: 992px) {
        padding: 1rem;
      }

      .supplierClassTitle {
        margin-bottom: 1.5rem;
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.75rem;
      }

      .supplierClassFx {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;

        .supplierClassFxItem {
          width: calc(50% - 0.5rem);
        }
      }

      .supplierClassText {
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: rgb(55 65 81);
      }

      .supplierClassRow {
        margin-bottom: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        line-height: 1.5rem;

        .supplierClassCol {
          margin: 0 0.75rem 0.75rem 0;
          padding: 0.5rem 1.25rem;
          color: rgb(1 32 96);
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
          border: 1px solid rgb(243 244 246);
          border-radius: 9999px;

          @media (max-width: 768px) {
            margin: 0 0.5rem 0.5rem 0;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
        }

        .supplierClassCol:hover {
          @media (min-width: 768px) {
            background-color: rgb(243 244 246);
          }
        }

        .supplierClassColActive {
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
    }

    .supplierProducts {
      padding: 2rem;
      border-radius: 1rem;
      color: rgb(1 32 96);
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      @media (max-width: 992px) {
        padding: 1rem;
      }

      .supplierProductsTitle {
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .supplierProductsTitleText {
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .supplierProductsTitlePxfs {
          display: flex;
          align-items: center;

          span {
            color: rgb(75 85 99);
          }
        }
      }

      .supplierProductsBox {
        @media (min-width: 992px) {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .supplierProductsItem {
          flex-shrink: 0;
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
          border-radius: 0.75rem;
          width: calc(50% - 1rem);

          @media (max-width: 992px) {
            padding: 1rem;
            width: 100%;
          }

          .supplierPiContent {
            @media (min-width: 992px) {
              display: flex;
              justify-content: space-between;
            }

            .supplierPiImgBox {
              position: relative;

              .supplierPiImg {
                width: 5rem;
                height: 5rem;
                border-radius: 0.5rem;

                @media (max-width: 992px) {
                  width: 100%;
                  height: 12rem;
                }
              }

              // .supplierPiImgTag {
              //   position: absolute;
              //   top: 1rem;
              //   left: 1rem;
              //   z-index: 10;
              //   border-radius: 9999px;
              //   padding-left: 0.75rem;
              //   padding-right: 0.75rem;
              //   padding-top: 0.25rem;
              //   padding-bottom: 0.25rem;
              //   font-size: 0.75rem;
              //   line-height: 1rem;
              //   font-weight: 700;
              //   color: #fff;
              //   background-color: rgb(59 130 246);
              // }
            }

            .supplierPiBox {
              width: calc(100% - 6rem);

              @media (max-width: 992px) {
                margin-top: 1rem;
                width: 100%;
              }

              .supplierPiTop {
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .supplierPiTitle {
                  max-width: calc(100% - 3rem);
                  font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 700;
                  color: rgb(1 32 96);
                }

                .supplierPingFen {
                  display: flex;
                  align-items: center;
                  color: rgb(245 158 11);

                  i {
                    font-size: 0.875rem;
                    margin-right: 0.25rem;
                  }
                }
              }

              .supplierPiInfo {
                margin-bottom: 0.5rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);

                i:first-child {
                  margin-right: 0.5rem;
                  font-size: 1rem;
                  color: #1f3e85;
                }

                i:nth-child(2) {
                  margin: 0 0.25rem 0 0.75rem;
                  font-size: 0.85rem;
                  color: rgb(75 85 99);
                }
              }

              .supplierPiTags {
                margin: 0.75rem 0 0.25rem;
                display: flex;
                flex-wrap: wrap;

                .supplierPiTag {
                  margin-right: 0.5rem;
                  margin-bottom: 0.5rem;
                  padding: 0.25rem 0.5rem;
                  font-size: 0.75rem;
                  line-height: 1rem;
                  color: #1f3e85;
                  background-color: rgb(22 93 255 / 0.1);
                  border-radius: 0.25rem;
                }
              }

              .supplierPiFuwu {
                font-size: 0.85rem;
                color: rgb(107 114 128);

                i {
                  margin-right: 0.25rem;
                  color: rgb(34 197 94);
                }
              }
            }
          }

          .supplierPiClass {
            margin-top: 1rem;
            padding-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgb(243 244 246);

            .supplierPiCitrm {
              margin-right: 1rem;
              display: flex;
              align-items: center;
              color: #6b7280;
              font-size: 0.875rem;

              .supplierPiClassSpan {
                margin-left: 0.25rem;
              }
            }

            .supplierPiCright {
              display: flex;
              align-items: center;
              font-weight: 500;
              line-height: 1.5rem;
              color: #1627ff;

              button {
                color: #1627ff;
                margin-right: 0.25rem;
              }
            }
          }
        }

        .supplierProductsItem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }
    }

    .supplierPagination {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .supplierFx {
    padding: 4rem 1rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
.supplierPage {
  .el-input__wrapper {
    border-radius: 0.5rem;
  }

  .btn-prev {
    color: rgb(107 114 128) !important;
    font-weight: 500 !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    padding: 0.5rem 0.75rem !important;
    background-color: #fff !important;
    border: 1px solid rgb(209 213 219) !important;
    border-radius: 0.25rem !important;
  }

  .btn-next {
    color: rgb(107 114 128) !important;
    font-weight: 500 !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    padding: 0.5rem 0.75rem !important;
    background-color: #fff !important;
    border: 1px solid rgb(209 213 219) !important;
    border-radius: 0.25rem !important;
  }
}

.supplierClass {
  .el-select__wrapper {
    border-radius: 0.5rem;
  }

  .el-select__selected-item {
    color: rgb(1 32 96);
  }

  .el-select__icon {
    color: rgb(1 32 96);
  }
}

.supplierProducts {
  .el-select__wrapper {
    background-color: #e9e9ed;
    border-radius: 0.5rem;
  }

  .el-select__selected-item {
    color: rgb(1 32 96);
  }

  .el-select__icon {
    color: rgb(1 32 96);
  }
}
</style>
