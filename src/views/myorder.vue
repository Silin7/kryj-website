<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import useDebounce from '@/utils/useDebounce'
import formatCurrency from '@/hooks/formatCurrency'
import { orderpageApi } from '@/api/interface'

const windowWidth: any = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

function handleScroll() {
  if (windowWidth.value <= 768 && total.value > tableData.value.length) {
    useDebounce().fn(() => {
      pageNo.value += 1
      orderpageApi({
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      }).then((res: any) => {
        total.value = res.data.total
        tableData.value = tableData.value.concat(res.data.list)
      })
    })
  }
}

const pageNo: any = ref(1)
const pageSize: any = ref(10)
const total: any = ref(0)
const tableData: any = ref([])

function getOrderpage() {
  orderpageApi({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }).then((res: any) => {
    if (res.code === 401) {
      ElMessage.error('登录信息失效，请重新登录')
      pageJump('login')
      return
    }
    total.value = res.data.total
    tableData.value = res.data.list
  })
}

// current-page 改变时触发
function handleCurrentChange(val: number) {
  pageNo.value = val
  getOrderpage()
}

// page-size 改变时触发
function handleSizeChange(val: number) {
  pageSize.value = val
  getOrderpage()
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  window.addEventListener('scroll', handleScroll)
  getOrderpage()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div class="myorderPage">
      <div v-if="windowWidth > 768" class="myorderPageContent">
        <div v-if="tableData?.length > 0" class="myorderPageContentSr">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column prop="id" label="订单编号" />
            <el-table-column prop="spuName" label="商品" />
            <el-table-column label="价格" header-align="left" align="right">
              <template #default="{ row }">
                ¥{{ formatCurrency((row.price / 100), 2) }}
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template #default="{ row }">
                <el-tag v-if="row.payStatus" type="success">已支付</el-tag>
                <el-tag v-else type="danger">未支付</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="支付方式">
              <template #default>
                <div class="frsc">
                  <img src="@/assets/sys/weixin.png" style="width: 1rem; height: 1rem; margin-right: 0.25rem;" />
                  <span>微信支付</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="下单时间">
              <template #default="{ row }">
                {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="containerPagination">
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20]"
              size="default" background layout="sizes, prev, pager, next, total" prev-text="上一页" next-text="下一页"
              :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
        <img v-else src="@/assets/sys/zwsj01.png" alt="暂无数据" class="zwsjImg">
      </div>
      <div v-else class="myorderPageContent">
        <div v-if="tableData?.length > 0">
          <div v-for="(item, index) in tableData" :key="index" class="tableItem"
            :style="index + 1 === tableData.length ? 'margin-bottom: 0;' : ''">
            <div class="tableItemRow">
              <div class="tableItemLabel">序号</div>
              <div class="tableItemValue">{{ index + 1 }}</div>
            </div>
            <div class="tableItemRow">
              <div class="tableItemLabel">订单编号</div>
              <div class="tableItemValue">{{ item.id }}</div>
            </div>
            <div class="tableItemRow">
              <div class="tableItemLabel">商品</div>
              <div class="tableItemValue">{{ item.spuName }}</div>
            </div>
            <div class="tableItemRow">
              <div class="tableItemLabel">价格</div>
              <div class="tableItemValue">¥{{ formatCurrency((item.price / 100), 2) }}</div>
            </div>
            <div class="tableItemRow">
              <div class="tableItemLabel">状态</div>
              <div class="tableItemValue">
                <el-tag v-if="item.payStatus" type="success">已支付</el-tag>
                <el-tag v-else type="danger">未支付</el-tag>
              </div>
            </div>
            <div class="tableItemRow">
              <div class="tableItemLabel">支付方式</div>
              <div class="tableItemValue">
                <img src="@/assets/sys/weixin.png" style="width: 1rem; height: 1rem; margin-right: 0.25rem;" />
                <span>微信支付</span>
              </div>
            </div>
            <div class="tableItemRow">
              <div class="tableItemLabel">下单时间</div>
              <div class="tableItemValue">{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </div>
            <!-- 
            <el-table-column label="">
              <template #default="{ row }">
            
              </template>
            </el-table-column>
            <el-table-column label="">
              <template #default>
                <div class="frsc">
                  <img src="@/assets/sys/weixin.png" style="width: 1rem; height: 1rem; margin-right: 0.25rem;" />
                  <span>微信支付</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="下单时间">
              <template #default="{ row }">
                {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column> -->
          </div>
        </div>
        <img v-else src="@/assets/sys/zwsj01.png" alt="暂无数据" class="zwsjImg">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.myorderPage {
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;

  @media (max-width: 768px) {
    min-height: calc(100vh - 112px);
  }

  .myorderPageContent {
    position: relative;
    margin: 100px auto 0;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;

    .myorderPageContentSr {
      padding: 1rem;
      border-radius: 1rem;
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }

  .containerPagination {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .zwsjImg {
    display: block;
    margin: 10rem auto 0;
    width: 40%;

    @media (max-width: 768px) {
      margin: 8rem auto 0;
      width: 100%;
    }
  }

  .tableItem {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #fff;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);

    .tableItemRow {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tableItemLabel {
        color: #646566;
        font-size: 0.875rem;
      }

      .tableItemValue {
        font-size: 1rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
