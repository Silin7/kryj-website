<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { requirementsbycateApi, solutionordersApi } from '@/api/modules/datasolution'

// 路由信息
const route = useRoute()

const datasolutionid: any = ref('')
const datasolutionData: any = ref({})

// init 获取基本信息
function getRequirementsbycate() {
  requirementsbycateApi({
    cate_id: datasolutionid.value,
  }).then((res: any) => {
    if (res) {
      datasolutionData.value = res
      datasolutionData.value.product_name = datasolutionData.value.name
    }
  })
}

// 提交需求
function tijiaoxuqiu() {
  if (!datasolutionData.value.product_name) {
    ElMessage({
      type: 'error',
      message: '请填写标的名称',
    })
    return
  }
  if (!datasolutionData.value.thetype) {
    ElMessage({
      type: 'error',
      message: '请选择类别',
    })
    return
  }
  if (!datasolutionData.value.description) {
    ElMessage({
      type: 'error',
      message: '请填写应用简述',
    })
    return
  }
  if (!datasolutionData.value.company_name) {
    ElMessage({
      type: 'error',
      message: '请填写公司名称',
    })
    return
  }
  if (!datasolutionData.value.contact_person) {
    ElMessage({
      type: 'error',
      message: '请填写公司联系人',
    })
    return
  }
  if (!datasolutionData.value.tel) {
    ElMessage({
      type: 'error',
      message: '请填写联系人电话',
    })
    return
  }
  if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(datasolutionData.value.tel)) {
    ElMessage({
      type: 'error',
      message: '联系人电话格式错误',
    })
    return
  }
  datasolutionData.value.requirements = {}
  const requirements: any = ref({})
  for (let i = 0; i < datasolutionData.value.multiitems.length; i++) {
    const item = datasolutionData.value.multiitems[i]
    if (!item.value) {
      ElMessage({
        type: 'error',
        message: `请选择第${i + 1}条技术需求信息`,
      })
      return
    }
    item.value3 = Array.from(new Set(item.value))
    item.value3.push(`其他(${item.remark || ''})`)
    requirements.value[item.name] = item.value3
  }
  solutionordersApi({
    thetype: datasolutionData.value.thetype,
    cate_id: datasolutionData.value.cate_id,
    product_name: datasolutionData.value.product_name,
    description: datasolutionData.value.description,
    requirements: requirements.value,
    memo: datasolutionData.value.memo,
    company_name: datasolutionData.value.company_name,
    tel: datasolutionData.value.tel,
    contact_person: datasolutionData.value.contact_person,
    user_id: window.localStorage.getItem('userinfo')
      ? JSON.parse(window.localStorage.getItem('userinfo') || '').id
      : '',
  }).then((res: any) => {
    ElMessage({
      type: 'success',
      message: '需求提交成功',
    })
    datasolutionData.value = {}
  })
}

onMounted(() => {
  datasolutionid.value = route.query.id
  getRequirementsbycate()
})
</script>

<template>
  <div class="requirementsPage">
    <div class="requirementsHead">
      <div class="requHtitle">{{ datasolutionData.cate_name }}</div>
      <div class="requirementsCont">
        <div class="supplierClassFx">
          <div class="supplierClassFxItem">
            <div class="supplierClassText"><span style="color: #f56c6c">*</span>标的名称</div>
            <el-input v-model="datasolutionData.product_name" style="width: 100%; height: 40px" placeholder="标的名称" />
          </div>
          <div class="supplierClassFxItem">
            <!--  -->
            <div class="supplierClassText"><span style="color: #f56c6c">*</span>类别</div>
            <el-select v-model="datasolutionData.thetype" placeholder="请选择类别" size="large" clearable
              style="width: 100%; height: 40px">
              <el-option label="产品" value="0" />
              <el-option label="服务" value="1" />
            </el-select>
          </div>
        </div>
        <div class="supplierClassFx" style="margin-top: 2rem">
          <div class="supplierClassFxItem2">
            <div class="supplierClassText">
              <span style="color: #f56c6c">*</span>应用简述
            </div>
            <el-input type="textarea" v-model="datasolutionData.description" :autosize="{ minRows: 3, maxRows: 3 }"
              style="width: 100%" placeholder="请描述应用场景、目标及预期效果等" />
          </div>
        </div>
        <div class="requCstitle">技术需求（可多选）</div>
        <div v-for="(item, index) in datasolutionData.multiitems" :key="index">
          <div class="requCstimu">{{ index + 1 }}. {{ item.name }}</div>
          <div class="requCstibox">
            <div class="requCstiItems">
              <el-radio-group v-if="item.thetype === '单选'" v-model="item.value" style="margin-right: 1rem">
                <el-radio v-for="(item2, index2) in item.items" :key="index2" :value="item2.label">
                  {{ item2.label }}
                </el-radio>
              </el-radio-group>
              <el-checkbox-group v-if="item.thetype === '多选'" v-model="item.value" style="margin-right: 1rem">
                <el-checkbox v-for="(item2, index2) in item.items" :key="index2" :label="item2.label"
                  :value="item2.label" />
              </el-checkbox-group>
              <!-- <div v-for="(item2, index2) in item.items" :key="index2" class="requCstiItem frcc">
                  <input type="checkbox" v-model="item2.isOther" />
                  <span>{{ item2.label }}</span>
                </div> -->
            </div>
            <el-input v-if="item.haveother === 1" v-model="item.remark" class="requCstiElInput" placeholder="请注明" />
          </div>
        </div>
        <div class="supplierClassFx2">
          <div class="supplierClassFxItem">
            <div class="supplierClassText"><span style="color: #f56c6c">*</span>公司名称</div>
            <el-input v-model="datasolutionData.company_name" style="width: 100%; height: 40px" placeholder="请填写公司名称" />
          </div>
          <div class="supplierClassFxItem">
            <div class="supplierClassText"><span style="color: #f56c6c">*</span>公司联系人</div>
            <el-input v-model="datasolutionData.contact_person" style="width: 100%; height: 40px"
              placeholder="请填写公司联系人" />
          </div>
          <div class="supplierClassFxItem">
            <div class="supplierClassText"><span style="color: #f56c6c">*</span>联系人电话</div>
            <el-input v-model="datasolutionData.tel" style="width: 100%; height: 40px" placeholder="请填写联系人电话" />
          </div>
        </div>
        <div class="supplierClassFx2">
          <div class="supplierClassFxItem2">
            <div class="supplierClassText">其他要求</div>
            <el-input type="textarea" v-model="datasolutionData.memo" :autosize="{ minRows: 3, maxRows: 3 }"
              style="width: 100%" placeholder="请填写其他特殊需求或补充说明" />
          </div>
        </div>
        <button class="btmTjxq" @click="tijiaoxuqiu">提交需求</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.requirementsPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .requirementsHead {
    padding: 6rem 2rem 2rem;
    margin: 0 auto;
    position: relative;
    width: 100%;
    max-width: 1400px;

    @media (max-width: 768px) {
      padding: 5rem 1rem 1rem;
    }

    .requHtitle {
      margin-bottom: 1rem;
      font-size: 1.875rem;
      line-height: 2.25rem;
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .requHsub {
      text-align: center;
      color: rgb(75 85 99);
      max-width: 48rem;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .requirementsCont {
    margin-top: 2rem;
    padding: 2.5rem;
    background-color: rgb(255 255 255);
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 1rem;

    @media (max-width: 768px) {
      padding: 2rem 0.5rem;
    }

    .requCtitle {
      text-align: center;
      color: rgb(1 32 96);
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2rem;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 1.25rem;
      }
    }

    .supplierClassFx {
      height: 100%;
      margin-bottom: 1rem;
      padding-bottom: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-bottom: 1px solid rgb(229 231 235);
    }

    .supplierClassFx2 {
      height: 100%;
      padding-top: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-top: 1px solid rgb(229 231 235);
    }

    .supplierClassFxItem {
      flex-shrink: 0;
      margin-bottom: 1rem;
      width: calc(50% - 0.25rem);

      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .supplierClassFxItem2 {
      flex-shrink: 0;
      margin-bottom: 1rem;
      width: 100%;
    }

    .supplierClassText {
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: rgb(55 65 81);
    }

    .requCstitle {
      color: rgb(1 32 96);
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.75rem;
      margin: 2rem 0 1rem;
    }

    .requCstimu {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: rgb(55 65 81);
    }

    .requCstibox {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 1.25rem;
      padding: 0.75rem;
      border-radius: 0.5rem;

      .requCstiItems {
        margin-bottom: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .requCstiItem {
          margin-right: 1rem;

          @media (max-width: 768px) {
            margin-right: 0.5rem;
          }

          input {
            width: 1.25rem;
            height: 1.25rem;

            @media (max-width: 768px) {
              width: 1rem;
              height: 1rem;
            }
          }

          span {
            color: rgb(55 65 81);
            margin-left: 0.5rem;
          }
        }
      }

      .requCstiElInput {
        margin-bottom: 0.5rem;
        width: 14rem;
        height: 34px;
      }
    }

    .btmTjxq {
      display: block;
      margin: 2rem auto 0;
      padding: 0.75rem 2rem;
      color: #fff;
      background-color: #1f3e85;
      border-radius: 9999px;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    .btmTjxq:hover {
      transform: scale(1.05);
    }
  }
}
</style>

<style lang="scss">
.requirementsPage {
  .el-input__wrapper {
    border-radius: 0.5rem;
  }

  .el-input.is-disabled .el-input__inner {
    -webkit-text-fill-color: rgb(1 32 96) !important;
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
