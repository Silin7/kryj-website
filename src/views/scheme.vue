<script setup lang="ts">
import dayjs from 'dayjs'
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import formatCurrency from '@/hooks/formatCurrency'
import { fileURL } from '@/api/baseConfig'
import {
  bannerlistApi,
  secpositionsApi,
  syspseoApi,
  sysprovincesApi,
  syscitiesApi,
} from '@/api/modules/basic'
import { productpcatechildrenApi, producthrsearchApi } from '@/api/modules/product'

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

// 一级分类
const pcateOne: any = ref([])
const pcateOneId: any = ref('')

function getPcateOne(pid: any = 0) {
  productpcatechildrenApi({
    page: 1,
    pageSize: 999,
    parent_id: pid,
  }).then((res: any) => {
    if (res && res.items.length > 0) {
      const levelone = res.items.filter((element: any) => element.item_id === 0)
      pcateOne.value = levelone
    }
  })
}

function pcateOneClick(id: any) {
  pcateOneId.value = id
  pcateTwo.value = []
  pcateTwoId.value = ''
  if (id !== '') {
    getPcateTwo(id)
  }
  getProductmaterialssearch()
}

// 二级分类
const pcateTwo: any = ref([])
const pcateTwoId: any = ref('')

function getPcateTwo(pid: any) {
  productpcatechildrenApi({
    page: 1,
    pageSize: 999,
    parent_id: pid,
  }).then((res: any) => {
    if (res && res.items.length > 0) {
      pcateTwo.value = res.items
    }
  })
}

function pcateTwoClick(id: any) {
  pcateTwoId.value = id
  pcateThree.value = []
  pcateThreeId.value = ''
  if (id !== '') {
    getPcateThree(id)
  }
  getProductmaterialssearch()
}

// 三级分类
const pcateThree: any = ref([])
const pcateThreeId: any = ref('')

function getPcateThree(pid: any) {
  productpcatechildrenApi({
    page: 1,
    pageSize: 999,
    parent_id: pid,
  }).then((res: any) => {
    if (res && res.items.length > 0) {
      pcateThree.value = res.items
    }
  })
}

function pcateThreeClick(id: any) {
  pcateThreeId.value = id
  getProductmaterialssearch()
}

// 高级搜索状态
const searchState: any = ref(false)
const searchForm: any = ref({})

function searchStateClick() {
  searchState.value = !searchState.value
}

// 省 列表
const provincesList: any = ref([])
const citiesList: any = ref([])

function getSysprovinces() {
  sysprovincesApi().then((res: any) => {
    if (res) {
      provincesList.value = res
    }
  })
}

function provinceChange(value: any) {
  citiesList.value = []
  searchForm.value.city_id = null
  if (value) {
    syscitiesApi(value).then((res: any) => {
      if (res) {
        citiesList.value = res
      }
    })
  }
}

// 数据查询
const tableLoading = ref(false)
const currentPage: any = ref(1)
const pageSize: any = ref(10)
const total: any = ref(0)
const productDataList: any = ref([])

// function getProductmaterialssearch() {
//   tableLoading.value = true
//   productmaterialsApi({
//     page: currentPage.value,
//     pageSize: pageSize.value,
//   }).then((res: any) => {
//     if (res) {
//       total.value = res.total
//       productDataList.value = res.items
//     }
//   }).finally(() => {
//     tableLoading.value = false
//   })
// }

function getProductmaterialssearch() {
  tableLoading.value = true
  if (searchForm.value.province_id && !searchForm.value.city_id) {
    ElMessage.error('请选择所在城市')
    tableLoading.value = false
    return
  }
  let parameter: any = {
    page: currentPage.value,
    pageSize: pageSize.value,
    ...searchForm.value,
  }
  if (pcateOneId.value !== '') {
    parameter.cate_id = pcateOneId.value
  }
  if (pcateTwoId.value !== '') {
    parameter.sub_cate_id = pcateTwoId.value
  }
  if (pcateThreeId.value !== '') {
    parameter.three_cate_id = pcateThreeId.value
  }
  producthrsearchApi(parameter)
    .then((res: any) => {
      if (res) {
        total.value = res.total
        productDataList.value = res.items
      }
    })
    .finally(() => {
      tableLoading.value = false
    })
}

// current-page 改变时触发
function handleCurrentChange(val: number) {
  currentPage.value = val
  getProductmaterialssearch()
}

// page-size 改变时触发
function handleSizeChange(val: number) {
  pageSize.value = val
  getProductmaterialssearch()
}

// 产品详情
function goProductsDetail(row: any) {
  pageJump('products_detail', {
    id: row.id,
    name: 'scheme',
  })
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
  getPcateOne()
  getSysprovinces()
  getProductmaterialssearch()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="materialsPage">
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

    <div class="containerBox">
      <div class="containerLeft">
        <div class="containerClass">
          <div class="containerClassRow">
            <button class="containerClassColActive">数字技术应用论证/数字实施方案论证</button>
            <button class="containerClassCol" @click="pageJump('materials')">材料/设备</button>
            <button class="containerClassCol" @click="pageJump('sale')">智能建造装备</button>
            <button class="containerClassCol" @click="pageJump('products')">信息化产品/服务</button>
          </div>
          <!-- 一级分类 -->
          <div class="containerClassRow">
            <button :class="[pcateOneId === '' ? 'containerClassColActive' : 'containerClassCol']"
              @click="pcateOneClick('')">
              全部
            </button>
            <button v-for="(item, index) in pcateOne" :key="index" :class="[
              pcateOneId === item.id ? 'containerClassColActive' : 'containerClassCol',
            ]" @click="pcateOneClick(item.id)">
              {{ item.name }}
            </button>
          </div>
          <!-- 二级分类 -->
          <div v-if="pcateOneId !== '' && pcateTwo.length > 0" class="containerClassRow">
            <button :class="[pcateTwoId === '' ? 'containerClassColActive' : 'containerClassCol']"
              @click="pcateTwoClick('')">
              全部
            </button>
            <button v-for="(item, index) in pcateTwo" :key="index" :class="[
              pcateTwoId === item.id ? 'containerClassColActive' : 'containerClassCol',
            ]" @click="pcateTwoClick(item.id)">
              {{ item.name }}
            </button>
          </div>
          <!-- 三级分类 -->
          <div v-if="pcateTwoId !== '' && pcateThree.length > 0" class="containerClassRow">
            <button :class="[pcateThreeId === '' ? 'containerClassColActive' : 'containerClassCol']"
              @click="pcateThreeClick('')">
              全部
            </button>
            <button v-for="(item, index) in pcateThree" :key="index" :class="[
              pcateThreeId === item.id ? 'containerClassColActive' : 'containerClassCol',
            ]" @click="pcateThreeClick(item.id)">
              {{ item.name }}
            </button>
          </div>
          <div class="containerGjss">
            <button v-if="searchState" class="" @click="searchStateClick">
              <i class="fa fa-search-minus"></i>
              <span>收起高级搜索</span>
            </button>
            <button v-if="!searchState" class="" @click="searchStateClick">
              <i class="fa fa-search-plus"></i>
              <span>展开高级搜索</span>
            </button>
            <div v-if="searchState">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
                  <div class="supplierClassText">所在省份</div>
                  <el-select v-model="searchForm.province_id" placeholder="Select" size="large" clearable
                    @change="provinceChange">
                    <el-option v-for="(item, index) in provincesList" :key="index" :label="item.name"
                      :value="item.id" />
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
                  <div class="supplierClassText">所在城市</div>
                  <el-select v-model="searchForm.city_id" placeholder="Select" size="large" clearable>
                    <el-option v-for="(item, index) in citiesList" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
                  <div class="supplierClassText">材料名称</div>
                  <el-input v-model="searchForm.product_name" style="width: 100%; height: 40px" placeholder="请输入材料名称..."
                    clearable />
                </el-col>
                <!-- <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb-4">
                  <div class="supplierClassText">规格型号</div>
                  <el-input v-model="searchForm.specification" style="width: 100%; height: 40px"
                    placeholder="请输入规格型号..." clearable />
                </el-col> -->
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
                  <div class="supplierClassText">品牌名称</div>
                  <el-input v-model="searchForm.brand" style="width: 100%; height: 40px" placeholder="请输入品牌名称..."
                    clearable />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb-4">
                  <div class="supplierClassText">报价开始日期</div>
                  <el-date-picker v-model="searchForm.quote_time_start" type="date" placeholder="yyyy/mm/dd"
                    value-format="x" style="width: 100%; height: 40px" />
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb-4">
                  <div class="supplierClassText">报价结束日期</div>
                  <el-date-picker v-model="searchForm.quote_time_end" type="date" placeholder="yyyy/mm/dd"
                    value-format="x" style="width: 100%; height: 40px" />
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb-4">
                  <div class="supplierClassText">价格区间</div>
                  <div class="frbc">
                    <el-input-number v-model="searchForm.price_min" :min="0"
                      style="width: calc(50% - 0.5rem); height: 40px" placeholder="最低价" />
                    -
                    <el-input-number v-model="searchForm.price_max" :min="0"
                      style="width: calc(50% - 0.5rem); height: 40px" placeholder="最高价" />
                  </div>
                </el-col>
              </el-row>
              <button class="searchBtn" @click="getProductmaterialssearch">
                <i class="fa fa-search"></i>搜索
              </button>
            </div>
          </div>
        </div>
        <div class="containerProducts">
          <!-- 数据表格 -->
          <el-table v-loading="tableLoading" :data="productDataList" highlight-current-row>
            <el-table-column align="center" label="服务名称">
              <template #default="scope">
                <span @click="goProductsDetail(scope.row)" style="color: #165dff; cursor: pointer;">
                  {{ scope.row.servicename }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" prop="scene" label="场景" />
            <el-table-column :show-overflow-tooltip="true" align="center" prop="dimension" label="论证维度" />
            <el-table-column :show-overflow-tooltip="true" align="center" prop="brand" label="品牌" />
            <el-table-column :show-overflow-tooltip="true" align="center" prop="unit_name" label="单位" />
            <el-table-column align="center" label="除税价">
              <template #default="scope">
                <span style="color: #165dff; font-weight: 700">¥{{ formatCurrency(scope.row.pretaxprice, 2) }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="未含税价">
              <template #default="scope">
                <span style="color: #00b42a; font-weight: 700">¥{{ formatCurrency(scope.row.afertaxprice, 2) }}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="税率">
              <template #default="scope">
                <span>{{ scope.row.taxrate }}%</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" prop="supplier_name" label="供应商" />
            <el-table-column align="center" label="报价时间">
              <template #default="scope">
                <span>{{ dayjs(scope.row.quote_time).format('YYYY-MM-DD') }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" prop="memo" label="备注" />
          </el-table>
          <!-- 分页 -->
          <div class="containerPagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20]"
              size="default" background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="total"
              @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.materialsPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;

  .containerBox {
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;

    @media (min-width: 1140px) {
      padding: 4rem 1rem;
      display: flex;
      justify-content: space-between;
    }

    .containerLeft {
      width: 100%;

      // @media (min-width: 1140px) {
      //   width: calc(66.7% - 1rem);
      // }

      .containerClass {
        margin-bottom: 2rem;
        padding: 1.5rem;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 1140px) {
          padding: 1rem;
        }

        .containerClassRow {
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          line-height: 1.5rem;

          .containerClassCol {
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

          .containerClassCol:hover {
            @media (min-width: 768px) {
              background-color: rgb(243 244 246);
            }
          }

          .containerClassColActive {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: #fff;
            background-color: rgb(22 93 255);
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

        .containerGjss {
          button {
            margin-bottom: 1rem;
            color: rgb(22 93 255);

            i {
              margin-right: 0.5rem;
            }
          }

          .supplierClassText {
            margin-bottom: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(55 65 81);
          }

          .searchBtn {
            margin-bottom: 0;
            display: block;
            margin: 0 auto;
            color: #fff;
            background-color: rgb(22 93 255 / 0.9);
            width: 7.5rem;
            height: 2.5rem;
            border-radius: 0.5rem;
          }
        }
      }

      .containerProducts {
        margin-bottom: 2rem;
        padding: 1.5rem;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 1140px) {
          padding: 1rem;
        }

        .containerPagination {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.materialsPage {
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

  .containerProductsTitlePxfs {
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

  .containerGjss {
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
}
</style>
