<script setup lang="ts">
import { ref } from 'vue';

const searchForm: any = ref({})
</script>

<template>
  <div class="aiPage">
    <div class="aiTitle">AI预测基础版（精度约65%）</div>
    <div class="aiContent">
      <div class="aiContentSr">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
            <div class="supplierClassText">疾病名称：</div>
            <el-input v-model="searchForm.jb_name" placeholder="请输入疾病名称" clearable style="width: 100%; height: 40px" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
            <div class="supplierClassText">化合物名称：</div>
            <el-input v-model="searchForm.hhw_name" placeholder="请输入化合物名称" clearable
              style="width: 100%; height: 40px" />
          </el-col>
        </el-row>
        <button class="searchBtn">
          <i class="fa fa-search"></i>开始预测
        </button>
      </div>
      <div class="aiContentSc">
        <div class="aiContentScTitle">【预测结果】</div>
        <div class="aiContentScText">
          <img src="@/assets/ai/Bot.png" class="aiCstImg">
          <!-- <p class="aiCstSubstance">输入疾病名称和化合物名称，点击开始预测...</p> -->
        </div>
        <div class="aiContentScTips">注：本结果为AI基础版预测，仅供参考，实际有效性请以临床实验为准。</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aiPage {
  overflow-x: hidden;
  padding-top: 100px;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;

  .aiTitle {
    padding: 2rem 0;
    text-align: center;
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    line-height: clamp(1.5rem, 4vw, 2.5rem);
    color: #1f3e85;
  }

  .aiContent {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1400px;

    .aiContentSr {
      margin-bottom: 2rem;
      padding:  2rem 1rem;
      border-radius: 1rem;
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      .supplierClassText {
        margin-bottom: 0.5rem;
        font-weight: 500;
        // font-size: 0.875rem;
        // line-height: 1.25rem;
        color: #4c659d;
      }

      .searchBtn {
        display: block;
        margin: 1rem auto 0;
        color: #fff;
        background-color: #1f3e85;
        width: 7.5rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }

        i {
          margin-right: 0.5rem;
        }
      }
    }

    .aiContentSc {
      padding:  2rem 1rem;
      border-radius: 1rem;
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      .aiContentScTitle {
        color: #4c659d;
      }

      .aiContentScText {
        min-height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .aiCstSubstance {
          color: #1f3e85;
          text-align: center;
        }

        .aiCstImg {
          width: 30rem;
          height: 30rem;
        }
      }

      .aiContentScTips {
        text-align: right;
        color: #a8abb2;
        font-size: 0.875rem;
      }
    }
  }
}
</style>