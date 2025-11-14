<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { checkrecordApi } from '@/api/interface'

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

const pageNo: any = ref(1)
const pageSize: any = ref(10)
const total: any = ref(0)
const tableData = ref([])

function getOrderpage() {
  checkrecordApi({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }).then((res: any) => {
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
  getOrderpage()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div>
    <div class="myrecordsPage">
      <div class="myrecordsContent">
        <div v-if="tableData?.length > 0" class="myrecordsContentSr">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="60" label="序号" align="center" />
            <el-table-column prop="diseaseName" label="疾病名称" />
            <el-table-column label="化合物名称">
              <template #default="{ row }">
                {{ row.diseaseNo }}-{{ row.drugName }}
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template #default="{ row }">
                <span v-if="row.status === 0" style="color: #1f3e85;">{{ row.message }}</span>
                <span v-else-if="row.status === 1" style="color: #f56c6c;">{{ row.message }}</span>
                <span v-else style="color: #909399;">{{ row.message }}</span>
              </template>
            </el-table-column>
            <el-table-column label="检测时间">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.myrecordsPage {
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;

  @media (max-width: 768px) {
    min-height: calc(100vh - 112px);
  }

  .myrecordsContent {
    position: relative;
    margin: 100px auto 0;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;

    .myrecordsContentSr {
      // min-height: calc(100vh - 188px - 2rem);
      padding: 1rem;
      border-radius: 1rem;
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      // @media (max-width: 768px) {
      //   min-height: calc(100vh - 212px - 2rem);
      // }
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
}
</style>
