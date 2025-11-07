<script setup lang="ts">
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { baseURL, fileURL } from '@/api/baseConfig'
import formatCurrency from '@/hooks/formatCurrency'
import {
  producthridApi,
  productmaterialsidApi,
  productequipmentsidApi,
  producteitidApi,
  producthrrelatedApi,
  productmaterialsrelatedApi,
  productequipmentsrelatedApi,
  producteitrelatedApi,
} from '@/api/modules/product'
import { checkloinApi } from '@/api/modules/login'

// 路由信息
const route = useRoute()

// 产品信息
const pathname: any = ref('')
const productid: any = ref('')
const productDetails: any = ref({})
const productRelated: any = ref([])

// 材料/设备
function getProductDetailsid() {
  if (pathname.value === 'scheme') {
    producthridApi(productid.value).then((res: any) => {
      if (res) {
        productDetails.value = res
      }
    })
    producthrrelatedApi(productid.value).then((res: any) => {
      if (res) {
        productRelated.value = res.items
      }
    })
  }
  if (pathname.value === 'materials') {
    productmaterialsidApi(productid.value).then((res: any) => {
      if (res) {
        productDetails.value = res
      }
    })
    productmaterialsrelatedApi(productid.value).then((res: any) => {
      if (res) {
        productRelated.value = res.items
      }
    })
  }
  if (pathname.value === 'sale') {
    productequipmentsidApi(productid.value).then((res: any) => {
      if (res) {
        productDetails.value = res
      }
    })
    productequipmentsrelatedApi(productid.value).then((res: any) => {
      if (res) {
        productRelated.value = res.items
      }
    })
  }
  if (pathname.value === 'products') {
    producteitidApi(productid.value).then((res: any) => {
      if (res) {
        productDetails.value = res
      }
    })
    producteitrelatedApi(productid.value).then((res: any) => {
      if (res) {
        productRelated.value = res.items
      }
    })
  }
}

// 相关产品 查看详情
function xgcpDetailClick(item: any) {
  // 新建页面打开
  const url = window.location.href.split('?id=')[0] + `?id=${item.id}&name=${pathname.value}`
  window.open(url, '_blank')
  // 当前页面打开
  // pageJump('products_detail', {
  //   id: item.id,
  //   name: pathname.value,
  // })
  // setTimeout(() => {
  //   location.reload()
  // }, 200)
}

// 购物车
const gwcdata: any = ref(window.localStorage.getItem('gwcdata') ? JSON.parse(window.localStorage.getItem('gwcdata') || '') : [])
const gwcVisible: any = ref(false)

function gwcVisibleShow() {
  gwcVisible.value = true
}

// 加入购物车
function addToCart() {
  // 这里可以添加加入购物车的逻辑
  const data = {
    product_type: pathname.value,
    id: productDetails.value.id,
    name: '',
    type: '',
    brand: productDetails.value.brand,
    pretaxprice: productDetails.value.pretaxprice,
    afertaxprice: productDetails.value.afertaxprice,
    taxrate: productDetails.value.taxrate,
    supplier_name: productDetails.value.supplier_name,
  }
  if (pathname.value === 'scheme') {
    data['name'] = productDetails.value.servicename
    data['type'] = '0'
  }
  if (pathname.value === 'materials') {
    data['name'] = productDetails.value.materialname
    data['type'] = '1'
  }
  if (pathname.value === 'sale') {
    data['name'] = productDetails.value.equipmentname
    data['type'] = '2'
  }
  if (pathname.value === 'products') {
    data['name'] = productDetails.value.itname
    data['type'] = '3'
  }
  gwcdata.value.push(data)
  window.localStorage.setItem('gwcdata', JSON.stringify(gwcdata.value))
  ElMessage({
    message: '已加入询价单',
    type: 'success',
  })
}

function gwcDelete(index: number) {
  gwcdata.value.splice(index, 1)
  window.localStorage.setItem('gwcdata', JSON.stringify(gwcdata.value))
  ElMessage({
    message: '已删除',
    type: 'success',
  })
}

// 询价单下载
function dolwnloadXjd() {
  checkloinApi().then(async (res: any) => {
    if (res && res.status) {
      const inquiry_items: any = ref([])
      for (let i = 0; i < gwcdata.value.length; i++) {
        inquiry_items.value.push({
          product_id: gwcdata.value[i].id,
          product_type: gwcdata.value[i].type,
        })
      }
      const user_id = window.localStorage.getItem('userinfo') ? JSON.parse(window.localStorage.getItem('userinfo') || '').id : ''
      try {
        const response = await axios({
          method: 'POST',
          url: baseURL + '/api/client/inquiry/download-from-cart',
          responseType: 'blob',
          data: {
            user_id: user_id,
            inquiry_items: inquiry_items.value,
          },
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            token: `Bearer ${localStorage.getItem('token') ?? ''}`,
            Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
          },
        })

        // 验证响应数据是否为Blob
        if (!(response.data instanceof Blob)) {
          const errorText: any = await new Promise(resolve => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.readAsText(response.data)
          })
          throw new Error(`响应数据格式错误，内容：${errorText.slice(0, 100)}...`)
        }

        // 验证Excel文件类型
        const validContentTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'application/octet-stream'
        ]
        const contentType = response.headers['content-type'] || ''
        if (!validContentTypes.some(type => contentType.includes(type))) {
          throw new Error(`响应类型不合法：${contentType}，预期Excel文件`)
        }

        // 解析文件名
        let filename = `询价单_${new Date().getTime()}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.xlsx`
        const disposition = response.headers['content-disposition'] || ''
        if (disposition) {
          const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i)
          if (utf8Match && utf8Match[1]) {
            filename = decodeURIComponent(utf8Match[1])
          } else {
            const quoteMatch = disposition.match(/filename="([^"]+)"/i)
            if (quoteMatch && quoteMatch[1]) {
              filename = quoteMatch[1]
            } else {
              const plainMatch = disposition.match(/filename=([^;]+)/i)
              if (plainMatch && plainMatch[1]) {
                filename = plainMatch[1].trim()
              }
            }
          }
        }
        // 处理文件名特殊字符（避免系统无法识别）
        filename = filename.replace(/[\\/:*?"<>|]/g, '-')

        // 触发浏览器下载
        const urlObject = URL.createObjectURL(response.data)
        const a = document.createElement('a')
        a.href = urlObject
        a.download = filename
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()

        // 延迟清理下载资源（给浏览器足够时间触发下载）
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(urlObject)
        }, 1000)

        // // 3. 关键修正：先销毁加载提示，再显示成功提示
        // loadingInstance.destroy()
        // message.success(`询价单导出成功，文件名：${filename}`, { key: loadingKey })

        gwcdata.value = []
        window.localStorage.setItem('gwcdata', JSON.stringify(gwcdata.value))
        gwcVisible.value = false

        ElMessage({
          message: '正在下载询价单，请稍后...',
          type: 'success',
        })
      } catch (error) {
        ElMessage({
          message: '询价单下载失败',
          type: 'error',
        })
      }
    }
  })
}

onMounted(() => {
  productid.value = route.query.id
  pathname.value = route.query.name
  getProductDetailsid()
})

const value1 = ref(4.8)
</script>

<template>
  <div class="pdPage">
    <div class="pdHbox">
      <div class="pdHcontent">
        <div class="pdNavigation">
          <span @click="pageJump('home')">首页</span>
          <span class="pdNavigationXg">/</span>
          <span v-if="pathname === 'scheme'" @click="pageJump('scheme')"> 数字技术应用论证/数字实施方案论证 </span>
          <span v-if="pathname === 'materials'" @click="pageJump('materials')"> 材料/设备 </span>
          <span v-if="pathname === 'sale'" @click="pageJump('sale')"> 智能建造装备 </span>
          <span v-if="pathname === 'products'" @click="pageJump('products')">
            信息化产品/服务
          </span>
          <span class="pdNavigationXg">/</span>
          <span v-if="pathname === 'scheme'" class="pdNavigationSp">{{
            productDetails.servicename
            }}</span>
          <span v-if="pathname === 'materials'" class="pdNavigationSp">{{
            productDetails.materialname
            }}</span>
          <span v-if="pathname === 'sale'" class="pdNavigationSp">{{
            productDetails.equipmentname
            }}</span>
          <span v-if="pathname === 'products'" class="pdNavigationSp">{{
            productDetails.itname
            }}</span>
        </div>
        <div v-if="pathname === 'scheme'" class="pdHtitle">{{ productDetails.servicename }}</div>
        <div v-if="pathname === 'materials'" class="pdHtitle">
          {{ productDetails.materialname }}
        </div>
        <div v-if="pathname === 'sale'" class="pdHtitle">{{ productDetails.equipmentname }}</div>
        <div v-if="pathname === 'products'" class="pdHtitle">{{ productDetails.itname }}</div>
        <!-- <div class="pdHsubTitle">全专业模型整合与碰撞检测，提前规避施工风险</div> -->
      </div>
    </div>
    <div class="pdCbox">
      <div class="pdcLeft">
        <div class="pdclJbcs">
          <img v-if="productDetails.imgs" :src="fileURL + productDetails.imgs[0]" alt="产品图片" />
          <img v-else src="" alt="产品图片" />
          <div class="pdcljCenter">
            <div class="pdcljcTop">
              <div class="pdcljctItem">
                <span>除税价：</span>
                <span class="pdcljctiSp1">¥{{ formatCurrency(productDetails.afertaxprice, 2) }}</span>
              </div>
              <div class="pdcljctItem">
                <span>含税价：</span>
                <span class="pdcljctiSp2">¥{{ formatCurrency(productDetails.pretaxprice, 2) }}</span>
              </div>
              <div class="pdcljctItem">
                <span>税率：</span>
                <span class="pdcljctiSp1">{{ productDetails.taxrate }}%</span>
              </div>
            </div>
            <button class="pdcljcLxgys">
              <i class="fa fa-phone"></i>
              <span>联系供应商</span>
            </button>
            <button class="pdcljcJrgwc" @click="addToCart">
              <i class="fa fa-shopping-cart"></i>
              <span>加入询价单</span>
            </button>
          </div>
          <div class="pdcljRight">
            <div class="pdcljrTitle">基本参数</div>
            <div v-if="pathname !== 'scheme'" class="pdcljrItem">
              <span>规格型号：</span>
              <span>{{ productDetails.specification }}</span>
            </div>
            <div class="pdcljrItem">
              <span>品牌名称：</span>
              <span>{{ productDetails.brand }}</span>
            </div>
            <!-- <div class="pdcljrItem">
              <span>服务周期：</span>
              <span>5-7个工作日</span>
            </div>
            <div class="pdcljrItem">
              <span>服务方式：</span>
              <span>线上+线下结合</span>
            </div>
            <div class="pdcljrItem">
              <span>交付成果：</span>
              <span>碰撞检查报告+优化建议</span>
            </div> -->
            <div class="pdcljrItem">
              <span>报价时间：</span>
              <span>{{ dayjs(productDetails.quote_time).format('YYYY-MM-DD') }}</span>
            </div>
          </div>
        </div>
        <div class="pdclXq">
          <div class="pdclxTitle">详情</div>
          <div class="" v-html="productDetails.description"></div>
          <!-- <div class="pdclxSub">
            BIM+多专业碰撞检查服务是基于建筑信息模型（BIM）技术，对建筑、结构、机电等各专业模型进行整合分析，提前发现并解决设计中的碰撞冲突，减少施工阶段的返工和变更，降低工程成本。
          </div>
          <div class="pdclxItem">
            <div class="pdclxiTitle">服务内容</div>
            <div class="pdclxiInfo">
              <span class="pdclxiDian"></span>
              <span>各专业BIM模型整合与校验（建筑、结构、给排水、电气、暖通等）</span>
            </div>
            <div class="pdclxiInfo">
              <span class="pdclxiDian"></span>
              <span>多维度碰撞检测（硬碰撞、间隙碰撞、净空碰撞等）</span>
            </div>
            <div class="pdclxiInfo">
              <span class="pdclxiDian"></span>
              <span>碰撞点可视化标注与分类统计</span>
            </div>
            <div class="pdclxiInfo">
              <span class="pdclxiDian"></span>
              <span>优化方案建议与模型调整指导</span>
            </div>
            <div class="pdclxiInfo">
              <span class="pdclxiDian"></span>
              <span>详细碰撞检查报告编制与解读</span>
            </div>
            <div class="pdclxiInfo">
              <span class="pdclxiDian"></span>
              <span>1次线上成果汇报与问题解答</span>
            </div>
          </div>
          <div class="pdclxItem">
            <div class="pdclxiTitle">服务优势</div>
            <div class="">
              <div class="pdclxiInfo alignCenter">
                <div class="pdclxiIbox frcc">
                  <i class="fa fa-check"></i>
                </div>
                <div class="pdclxiPbox">
                  <p>提前规避风险</p>
                  <p>施工前发现设计问题，减少现场返工</p>
                </div>
              </div>
              <div class="pdclxiInfo alignCenter">
                <div class="pdclxiIbox frcc">
                  <i class="fa fa-check"></i>
                </div>
                <div class="pdclxiPbox">
                  <p>专业分析团队</p>
                  <p>5年以上BIM工程师团队全程服务</p>
                </div>
              </div>
              <div class="pdclxiInfo alignCenter">
                <div class="pdclxiIbox frcc">
                  <i class="fa fa-check"></i>
                </div>
                <div class="pdclxiPbox">
                  <p>可视化成果</p>
                  <p>三维可视化碰撞点展示，直观易懂</p>
                </div>
              </div>
              <div class="pdclxiInfo alignCenter">
                <div class="pdclxiIbox frcc">
                  <i class="fa fa-check"></i>
                </div>
                <div class="pdclxiPbox">
                  <p>优化建议</p>
                  <p>提供专业解决方案，不止于发现问题</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pdclxItem">
            <div class="pdclxiTitle">服务流程</div>
            <div class="">
              <div class="pdclxiInfo fwlcBorder">
                <div class="pdclxiNbox frcc">1</div>
                <div class="pdclxiPbox">
                  <p>需求沟通与资料收集</p>
                  <p>确认服务范围，收集各专业BIM模型及相关资料</p>
                </div>
              </div>
              <div class="pdclxiInfo fwlcBorder">
                <div class="pdclxiNbox frcc">2</div>
                <div class="pdclxiPbox">
                  <p>模型整合与校验</p>
                  <p>对接收的模型进行检查、修复与整合</p>
                </div>
              </div>
              <div class="pdclxiInfo fwlcBorder">
                <div class="pdclxiNbox frcc">3</div>
                <div class="pdclxiPbox">
                  <p>碰撞检测与分析</p>
                  <p>运用专业软件进行全专业碰撞检测与分类</p>
                </div>
              </div>
              <div class="pdclxiInfo fwlcBorder">
                <div class="pdclxiNbox frcc">4</div>
                <div class="pdclxiPbox">
                  <p>报告编制与优化建议</p>
                  <p>生成详细报告并提供专业优化方案</p>
                </div>
              </div>
              <div class="pdclxiInfo fwlcBorder" style="padding-bottom: 0px">
                <div class="pdclxiNbox frcc">5</div>
                <div class="pdclxiPbox">
                  <p>成果交付与答疑</p>
                  <p>交付报告并进行线上成果解读与答疑</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pdclxItem">
            <div class="pdclxiTitle">交付成果示例</div>
            <div class="pdclxiCgBox">
              <div class="pdclxiCgItem">
                <img
                  src="https://fastly.picsum.photos/id/905/400/400.jpg?hmac=w2m1CjOADMCbUtrQDbyCuKR7_PNl9koTsKiL89xet5c"
                  alt="" />
                <div class="pdclxicIp">碰撞检查报告（PDF版）</div>
              </div>
              <div class="pdclxiCgItem">
                <img
                  src="https://fastly.picsum.photos/id/905/400/400.jpg?hmac=w2m1CjOADMCbUtrQDbyCuKR7_PNl9koTsKiL89xet5c"
                  alt="" />
                <div class="pdclxicIp">碰撞点可视化模型（BIM格式）</div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="pdcCptj">
          <div class="pdccTitle">相关产品推荐</div>
          <div class="pdccCgBox">
            <div v-for="(item, index) in productRelated" :key="index" class="pdccCgItem">
              <img v-if="item.imgs" :src="fileURL + item.imgs[0]" alt="产品图片" />
              <div class="pdccgiContent">
                <div v-if="pathname === 'scheme'" class="pdccgicTitle">{{ item.servicename }}</div>
                <div v-if="pathname === 'materials'" class="pdccgicTitle">
                  {{ item.materialname }}
                </div>
                <div v-if="pathname === 'sale'" class="pdccgicTitle">{{ item.equipmentname }}</div>
                <div v-if="pathname === 'products'" class="pdccgicTitle">{{ item.itname }}</div>
                <!-- <div class="pdccgicSub">4D进度模拟与关键节点可行性分析</div> -->
                <div class="frbc">
                  <div class="pdccgicPice">¥{{ formatCurrency(item.pretaxprice, 2) }}</div>
                  <button @click="xgcpDetailClick(item)">查看详情</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pdcRight">
        <div class="pdcrTitle">供应商信息</div>
        <div class="pdcrTop frsc">
          <img v-if="productDetails.supplier_info && productDetails.supplier_info.company_imgs"
            :src="fileURL + productDetails.supplier_info.company_imgs[0]" alt="" />
          <div>
            <div v-if="productDetails.supplier_info" class="pdcrtTitle">
              {{ productDetails.supplier_info.company_name }}
            </div>
            <!-- <div class="pdcrtRate">
              <el-rate v-model="value1" allow-half />
              <span> 4.8</span>
            </div> -->
            <div v-if="productDetails.supplier_info" class="pdcrtTag">
              <span v-for="(item, index) in productDetails.supplier_info.tags" :key="index">{{
                item
                }}</span>
              <span v-for="(item, index) in productDetails.supplier_info.tags" :key="index" class="pdcrtagShu">|</span>
            </div>
          </div>
        </div>
        <div class="pdcrItem">
          <div class="pdcrIbox frcc">
            <i class="fa fa-check"></i>
          </div>
          <div class="pdcrPbox">
            <p>公司地址</p>
            <p v-if="productDetails.supplier_info">
              {{ productDetails.supplier_info.company_address }}
            </p>
          </div>
        </div>
        <div class="pdcrItem">
          <div class="pdcrIbox frcc">
            <i class="fa fa-check"></i>
          </div>
          <div class="pdcrPbox">
            <p>联系电话</p>
            <p v-if="productDetails.supplier_info">{{ productDetails.supplier_info.tel }}</p>
          </div>
        </div>
        <div class="pdcrItem">
          <div class="pdcrIbox frcc">
            <i class="fa fa-check"></i>
          </div>
          <div class="pdcrPbox">
            <p>电子邮箱</p>
            <p v-if="productDetails.supplier_info">{{ productDetails.supplier_info.email }}</p>
          </div>
        </div>
        <div class="pdcrItem">
          <div class="pdcrIbox frcc">
            <i class="fa fa-check"></i>
          </div>
          <div class="pdcrPbox">
            <p>成立时间</p>
            <p v-if="productDetails.supplier_info">
              {{ dayjs(productDetails.supplier_info.establish_time).format('YYYY年MM月DD日') }}
            </p>
          </div>
        </div>
        <button class="pdcrGysxq" @click="pageJump('supplier_detail', { supplierid: productDetails.supplier_info.id })">
          <span>查看供应商详情</span>
        </button>
        <button class="pdcrZxzx">
          <i class="fa fa-comment"></i>
          <span>在线咨询</span>
        </button>
      </div>
    </div>
    <div class="gwcBox frcc" @click="gwcVisibleShow">
      <el-badge :value="gwcdata.length">
        <i class="fa fa-cart-plus"></i>
      </el-badge>
    </div>
    <el-dialog v-model="gwcVisible" title="我的询价单" width="80%">
      <div v-if="gwcdata && gwcdata.length > 0" class="frec">
        <button class="xjgDolwnload" @click="dolwnloadXjd">
          <i class="fa fa-cloud-download mr-2"></i>
          <span>下载询价单</span>
        </button>
      </div>
      <el-table :data="gwcdata" border highlight-current-row>
        <el-table-column :show-overflow-tooltip="true" align="center" prop="name" label="产品名称" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="brand" label="品牌" />
        <el-table-column align="center" label="税前价格" width="120">
          <template #default="scope">
            <span>¥{{ formatCurrency(scope.row.pretaxprice) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="税后价格" width="120">
          <template #default="scope">
            <span>¥{{ formatCurrency(scope.row.afertaxprice) }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" prop="supplier_name" label="供应商" />
        <el-table-column align="center" label="操作" width="80">
          <template #default="scope">
            <div class="table-operate">
              <el-button text type="danger" @click="gwcDelete(scope.$index)"> 删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.pdPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .pdHbox {
    background-color: #f0f7ff;
    border-bottom: 1px solid #e0e7ff;

    .pdHcontent {
      margin: 0 auto;
      padding: 6rem 2rem 2rem;
      width: 100%;
      max-width: 1400px;
      color: rgb(1 32 96);

      @media (max-width: 768px) {
        padding: 5rem 1rem 1rem;
      }

      .pdNavigation {
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

        .pdNavigationXg {
          margin: 0 0.5rem;
        }

        .pdNavigationSp {
          color: #1f3e85;
        }
      }

      .pdHtitle {
        // margin-bottom: 0.5rem;
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        line-height: 3.75rem;
        font-weight: 700;
        color: rgb(1 32 96);
      }

      .pdHsubTitle {
        line-height: 1.5rem;
        color: rgb(75 85 99);
      }
    }
  }

  .pdCbox {
    position: relative;
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;
    color: rgb(1 32 96);

    @media (min-width: 992px) {
      padding: 2.5rem 2rem;
      display: flex;
      justify-content: space-between;
    }

    .pdcLeft {
      margin-bottom: 2rem;
      width: 100%;

      @media (min-width: 992px) {
        margin-bottom: 0;
        width: calc(66.7% - 1rem);
      }

      .pdclJbcs {
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 1rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
        }

        img {
          width: 100%;
          height: 16rem;
          border-radius: 0.5rem;

          @media (min-width: 992px) {
            width: calc(33.4% - 2rem);
            height: 16rem;
            border-radius: 0.5rem;
          }
        }

        .pdcljCenter {
          margin-top: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            margin-top: 0;
            width: calc(33.3%);
          }

          .pdcljcTop {
            padding: 1rem;
            background-color: rgb(249 250 251);
            border-radius: 0.5rem;

            .pdcljctItem {
              margin-bottom: 0.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              color: rgb(107 114 128);

              .pdcljctiSp1 {
                font-weight: 500;
                font-size: 1.125rem;
                line-height: 1.75rem;
                color: rgb(1 32 96);
              }

              .pdcljctiSp2 {
                font-weight: 700;
                font-size: 1.25rem;
                line-height: 1.75rem;
                color: #1f3e85;
              }
            }
          }

          .pdcljcLxgys {
            margin-top: 1rem;
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

          .pdcljcJrgwc {
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

        .pdcljRight {
          margin-top: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            margin-top: 0;
            width: calc(33.3%);
          }

          .pdcljrTitle {
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.75rem;
            margin-bottom: 1rem;
          }

          .pdcljrItem {
            margin-top: 0.75rem;
            display: flex;
            align-items: center;

            span:first-child {
              width: 6rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              color: rgb(107 114 128);
            }

            span:last-child {
              font-size: 0.875rem;
              line-height: 1.25rem;
              color: rgb(1 32 96);
            }
          }
        }
      }

      .pdclXq {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: rgb(255 255 255);
        border-radius: 1rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          padding: 1rem;
        }

        .pdclxTitle {
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
          border-bottom: 1px solid rgb(243 244 246);
        }

        .pdclxSub {
          line-height: 1.5rem;
        }

        .pdclxItem {
          margin-top: 1.5rem;

          .pdclxiTitle {
            margin-bottom: 0.75rem;
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.75rem;
          }

          .pdclxiInfo {
            position: relative;
            display: flex;
            line-height: 1.5rem;
            padding-bottom: 1rem;

            .pdclxiDian {
              flex-shrink: 0;
              margin-right: 10px;
              margin-top: 0.6rem;
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              background-color: rgb(1 32 96);
            }

            .pdclxiIbox {
              flex-shrink: 0;
              margin-right: 0.75rem;
              width: 2rem;
              height: 2rem;
              color: #1f3e85;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 9999px;
            }

            .pdclxiNbox {
              position: absolute;
              top: 0;
              left: -1rem;
              width: 2rem;
              height: 2rem;
              color: #fff;
              background-color: #1f3e85;
              border-radius: 9999px;
            }

            .pdclxiPbox {
              p:first-child {
                font-weight: 500;
                line-height: 1.5rem;
              }

              p:last-child {
                font-weight: 500;
                font-size: 0.875rem;
                line-height: 1.5rem;
                color: rgb(75 85 99);
              }
            }
          }

          .fwlcBorder {
            margin-left: 1rem;
            padding-left: 2rem;
            border-left: 2px solid #e5e7eb;
          }

          .alignCenter {
            align-items: center;
          }

          .pdclxiCgBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .pdclxiCgItem {
              overflow: hidden;
              margin-bottom: 1rem;
              width: 100%;
              background-color: rgb(255 255 255);
              border-radius: 0.5rem;
              box-shadow:
                0 10px 15px -3px rgb(0 0 0 / 0.1),
                0 4px 6px -4px rgb(0 0 0 / 0.1);
              border: 1px solid rgb(229 231 235);

              @media (min-width: 992px) {
                margin-bottom: 0;
                width: calc(50% - 0.5rem);
              }

              img {
                width: 100%;
                height: 10rem;
              }

              .pdclxicIp {
                font-size: 0.875rem;
                line-height: 1.25rem;
                text-align: center;
                padding: 0.75rem;
              }
            }

            .pdclxiCgItem:last-child {
              margin-bottom: 0;
            }

            .pdclxiCgItem:hover {
              @media (min-width: 768px) {
                cursor: pointer;
              }
            }
          }
        }
      }

      .pdcCptj {
        padding: 1.5rem;
        padding-bottom: 0.5rem;
        background-color: rgb(255 255 255);
        border-radius: 1rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          padding: 1rem 1rem 0 1rem;
        }

        .pdccTitle {
          margin-bottom: 1.5rem;
          // padding-bottom: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;

          @media (max-width: 768px) {
            margin-bottom: 1rem;
          }
        }

        .pdccCgBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .pdccCgItem {
            overflow: hidden;
            margin-bottom: 1rem;
            width: 100%;
            background-color: rgb(255 255 255);
            border-radius: 0.5rem;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid rgb(229 231 235);

            @media (min-width: 992px) {
              // margin-bottom: 0;
              width: calc(50% - 0.5rem);
            }

            img {
              width: 100%;
              height: 10rem;
            }

            .pdccgiContent {
              padding: 1rem;

              .pdccgicTitle {
                margin-bottom: 0.5rem;
                font-weight: 700;
                color: rgb(1 32 96);
              }

              .pdccgicSub {
                font-size: 0.875rem;
                line-height: 1.25rem;
                margin-bottom: 0.75rem;
                color: rgb(107 114 128);
              }

              .pdccgicPice {
                line-height: 1.5rem;
                font-weight: 700;
                color: #1f3e85;
              }

              button {
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: #1f3e85;
              }
            }
          }

          .pdccCgItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
            }
          }
        }
      }
    }

    .pdcRight {
      padding: 1rem;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255);
      border-radius: 1rem;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      @media (min-width: 992px) {
        padding: 1.5rem;
        width: calc(33.3% - 1rem);
      }

      .pdcrTitle {
        margin-bottom: 1.5rem;
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.75rem;

        @media (max-width: 768px) {
          margin-bottom: 1rem;
        }
      }

      .pdcrTop {
        margin-bottom: 1.5rem;

        img {
          margin-right: 1rem;
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
        }

        .pdcrtTitle {
          font-weight: 700;
          font-size: 1.125rem;
          line-height: 1.75rem;
        }

        .pdcrtRate {
          display: flex;
          align-items: center;

          span {
            margin-left: 0.25rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(75 85 99);
          }
        }

        .pdcrtTag {
          margin-top: 0.5rem;
          color: rgb(107 114 128);
          font-size: 0.875rem;
          line-height: 1.25rem;

          .pdcrtagShu {
            margin: 0.25rem;
          }

          span:last-child {
            display: none;
          }
        }
      }

      .pdcrItem {
        position: relative;
        display: flex;
        line-height: 1.5rem;
        padding-bottom: 1rem;

        .pdcrIbox {
          flex-shrink: 0;
          margin-right: 0.75rem;
          width: 2rem;
          height: 2rem;
          color: #1f3e85;
          background-color: rgb(22 93 255 / 0.1);
          border-radius: 9999px;
        }

        .pdcrPbox {
          p:first-child {
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);
          }

          p:last-child {
            font-weight: 500;
            line-height: 1.5rem;
          }
        }
      }

      .pdcrGysxq {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        width: 100%;
        text-align: center;
        font-weight: 500;
        line-height: 1.5rem;
        color: #1f3e85;
        border: 1px solid #1f3e85;
        border-radius: 0.5rem;

        i {
          margin-right: 0.5rem;
        }
      }

      .pdcrZxzx {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        width: 100%;
        text-align: center;
        font-weight: 500;
        line-height: 1.5rem;
        color: #1f3e85;
        background-color: rgb(22 93 255 / 0.2);
        border-radius: 0.5rem;

        i {
          margin-right: 0.5rem;
        }
      }
    }
  }

  .gwcBox {
    position: fixed;
    right: 20px;
    bottom: 20vh;
    // bottom: calc(-1.75rem + 50vh);
    z-index: 9999;
    width: 3.5rem;
    height: 3.5rem;
    background: linear-gradient(135deg, #165dff 0%, #36cfc9 100%);
    border-radius: 50%;

    i {
      color: #fff;
      font-size: 1.5rem;
    }
  }

  .gwcBox:hover {
    @media (min-width: 768px) {
      cursor: pointer;
      transform: scale(1.05);
    }
  }

  .xjgDolwnload {
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    text-align: center;
    font-weight: 500;
    line-height: 1.5rem;
    color: #fff;
    background-color: rgb(22 93 255 / 0.9);
    border-radius: 0.5rem;
  }
}
</style>

<style>
/* 评分 style */
.el-rate {
  padding-bottom: 0.25rem !important;
}

.pdcrTop .el-rate__icon {
  margin-right: 0 !important;
}

.gwcBox .el-badge__content {
  height: 14px !important;
  line-height: 14px !important;
  padding: 0 4px !important;
}
</style>
