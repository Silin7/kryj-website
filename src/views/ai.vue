<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import { checkTimeApi, cusedlistApi } from '@/api/interface'

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 免费体验剩余次数
const checkTime: any = ref(0)
const notLogin: any = ref(false)

function getCheckTime() {
  checkTimeApi().then((res: any) => {
    if (res?.code === 0) {
      checkTime.value = res.data
    } else if (res?.code === 401) {
      notLogin.value = true
    }
  })
}

// 查询条件
const searchForm: any = ref({})
const searchClick: any = ref(false)

function ksycClick() {
  searchClick.value = true
}

// 套餐 pay dialog
const dialogVisible: any = ref(true)
const dialogData: any = ref({
  orderNo: 'WX_VIDEO_8_1762740007_JNU8T6',
  qrCodeData: 'https://www.silin7.cn/media/erweima.png',
})

// 套餐列表
const usedList: any = ref([])
function getCusedlist() {
  cusedlistApi().then(res => {
    usedList.value = res.data
  })
}

// 选择套餐
const usedActive: any = ref(0)
function usedItemClick(index: any) {
  usedActive.value = index
}

// 立即支付
const usedPay: any = ref(false)
function payNowClick() {
  usedPay.value = true
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getCheckTime()
  getCusedlist()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div>
    <div class="aiPage">
      <div v-if="notLogin && searchClick" class="messageMask">
        <div class="messageBox">
          <div class="messageTitle">温馨提示</div>
          <div class="messageContent">AI预测平台 需要登录后才可以体验<br />是否前往登录</div>
          <div class="massageBtns">
            <button class="messageCancel" @click="searchClick = false">取消</button>
            <button class="messageQuery" @click="pageJump('login')">去登录</button>
          </div>
        </div>
      </div>
      <!-- BANNER -->
      <div class="aibannerBox">
        <img v-if="windowWidth <= 768" src="@/assets/ai/banner-ai-m.jpg" alt="" />
        <img v-else src="@/assets/ai/banner-ai.jpg" alt="" />
        <div class="aibannerAbsolute">
          <div class="aibannerContent">
            <div class="aibannerTitle">AI赋能医疗行业 开启智能建造新时代</div>
            <div class="aibannerSubtitle">
              以DeepSeek、通义千问等为代表的国产大模型加速发展，推动AI深度融入医疗行业，实现创新应用，助力优化资源配置、提升生产效率，加速行业智能化转型与产业升级。
            </div>
          </div>
        </div>
      </div>
      <div class="aiTbox">
        <div class="aiTitle">AI预测基础版（精度约65%）</div>
      </div>
      <div class="aiContent">
        <div class="aiContentSr">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
              <div class="supplierClassText">疾病名称：</div>
              <el-input v-model="searchForm.jb_name" placeholder="请输入疾病名称" clearable
                style="width: 100%; height: 40px" />
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb-4">
              <div class="supplierClassText">化合物名称：</div>
              <el-input v-model="searchForm.hhw_name" placeholder="请输入化合物名称" clearable
                style="width: 100%; height: 40px" />
            </el-col>
          </el-row>
          <div class="searchBox">
            <div></div>
            <button class="searchBtn" @click="ksycClick">
              <i class="fa fa-search"></i>开始预测
            </button>
            <div v-if="notLogin" class="aiTimes">
              新用户注册可免费体验3次，立即
              <span @click="pageJump('login')">登录/注册</span>
            </div>
            <div v-else class="aiTimes">
              免费体验剩余<span>{{ checkTime }}</span>次
            </div>
          </div>
        </div>
        <div class="aiContentSc">
          <div class="aiContentScTitle">【预测结果】</div>
          <div class="aiContentScText">
            <img src="@/assets/ai/Bot.png" class="aiCstImg" />
            <!-- <p class="aiCstSubstance">输入疾病名称和化合物名称，点击开始预测...</p> -->
          </div>
          <div class="aiContentScTips">
            注：本结果为AI基础版预测，仅供参考，实际有效性请以临床实验为准。
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="选择购买方案" v-model="dialogVisible" :width="windowWidth <= 768 ? 'calc(100% - 2rem)' : '600'">
      <div class="paymentMethod">
        <div v-if="!usedPay" class="usedBox">
          <div v-for="(item, index) in usedList" :key="index"
            :class="['usedItem', usedActive === index ? 'usedItemActive' : '']" @click="usedItemClick(index)">
            <div class="usedComboName">
              <span>{{ item.comboName }}</span>
            </div>
            <div class="usedRealPrice">
              ￥<span>{{ item.comboRealPrice }}</span>
            </div>
            <div v-if="item.comboPrice !== item.comboRealPrice" class="usedPrice">
              原价￥{{ item.comboPrice }}
            </div>
            <div v-if="item.discountPrice" class="usedDisPrice">
              立减<span>{{ item.discountPrice }}</span>
            </div>
            <div v-if="item.discountPercent" class="usedDisPrice">
              享<span>{{ (100 - item.discountPercent) / 10 }}</span>折
            </div>
          </div>
        </div>
        <div v-else class="weixinPayBox">
          <div class="methodHeader">
            <i class="fa fa-chevron-left" @click="usedPay = false"></i>
            <div class="frcc">
              <img src="@/assets/user/weixin.png" alt="微信支付" class="methodIcon" />
              <span>请使用微信扫码支付</span>
            </div>
            <div style="width: 1.5rem; height: 1.5rem;"></div>
          </div>
          <div class="courseBox">
            <img :src="dialogData.qrCodeData" style="width: 100%; height: 100%;" />
          </div>
          <div class="usedRealPrice">
            ￥<span>{{ usedList[usedActive].comboRealPrice }}</span>
          </div>
        </div>
        <button v-if="!usedPay" class="payBtn" @click="payNowClick">立即支付</button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.aiPage {
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;

  .aibannerBox {
    position: relative;
    padding-top: 100px;
    width: 100vw;
    height: 500px;

    img {
      width: 100vw;
      height: 400px;
    }

    .aibannerAbsolute {
      position: absolute;
      top: 100px;
      left: 0;
      z-index: 2;
      width: 100vw;

      .aibannerContent {
        margin: 0 auto;
        padding: 0 2rem;
        width: 100%;
        max-width: 1400px;
        height: 400px;
        display: flex;
        flex-flow: column;
        justify-content: center;

        .aibannerTitle {
          margin-bottom: 1rem;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.5;
          color: rgb(255 255 255);
        }

        .aibannerSubtitle {
          max-width: 1000px;
          font-size: clamp(1rem, 4vw, 1.25rem);
          font-weight: 500;
          line-height: 1.5;
          color: rgb(255 255 255 / 0.9);
        }
      }
    }
  }

  .aiTbox {
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 1400px;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }

    .aiTitle {
      font-weight: 700;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      line-height: clamp(1.5rem, 4vw, 2.5rem);
      color: #1f3e85;
    }
  }

  .aiContent {
    position: relative;
    margin: 0 auto;
    padding: 0 1rem 1rem;
    width: 100%;
    max-width: 1400px;

    .aiContentSr {
      margin-bottom: 2rem;
      padding: 2rem 1rem;
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

      .searchBox {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-end;

        div {
          width: calc(50% - 120px);

          @media (max-width: 768px) {
            width: 100%;
          }
        }

        .searchBtn {
          margin: 0 1rem;
          display: block;
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

          @media (max-width: 768px) {
            opacity: 1;
          }
        }

        .aiTimes {
          font-size: 0.875rem;
          color: #4b5563;

          @media (max-width: 768px) {
            margin-top: 1rem;
          }

          span {
            margin: 0 0.25rem;
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f3e85;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

    .aiContentSc {
      padding: 2rem 1rem;
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

          @media (max-width: 768px) {
            margin: 1rem 0;
            width: 60%;
            height: auto;
          }
        }
      }

      .aiContentScTips {
        text-align: right;
        color: #a8abb2;
        font-size: 0.875rem;

        @media (max-width: 768px) {
          text-align: center;
        }
      }
    }
  }
}

.paymentMethod {
  padding: 1rem 0;
  font-size: 1rem;
  border: 1px solid #ebf0fb;
  border-radius: 0.5rem;

  .usedBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .usedItem {
      position: relative;
      margin: 0 0.5rem 1rem;
      width: 130px;
      height: 160px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      color: #1f3e85;
      border: 1px solid #ebf0fb;
      border-radius: 0.5rem;

      &:hover {
        cursor: pointer;
        background-image: linear-gradient(0deg, #e7f0fd 0%, #accbee 100%);
      }

      div {
        margin: 0.25rem 0;
      }

      .usedComboName {
        margin: 0.25rem 0;
        font-weight: 700;
      }

      .usedDisPrice {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0 1rem 0 0.5rem;
        font-size: 0.75rem;
        line-height: 1.25rem;
        color: #fff;
        background-color: #fd5485;
        border-radius: 0.5rem 0 1.5rem 0;
      }
    }

    .usedItemActive {
      background-image: linear-gradient(0deg, #e7f0fd 0%, #accbee 100%);
      // background-image: linear-gradient(0deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)
    }
  }

  .usedRealPrice {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 0.875rem;
    color: #e44343;
    text-align: center;

    span {
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: 700;
    }
  }

  .usedPrice {
    margin: 0.25rem auto;
    font-size: 0.875rem;
    line-height: 0.875rem;
    text-decoration: line-through;
    color: #4b5563;
    opacity: 0.6;
    text-align: center;
  }

  .weixinPayBox {
    padding: 0 1rem;

    .methodHeader {
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #4b5563;

      i {
        cursor: pointer;
        width: 1.25rem;
        height: 1.25rem;
        line-height: 1.25rem;
      }

      .methodIcon {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.5rem;
      }
    }

    .courseBox {
      margin: 0 auto 1rem;
      padding: 0.875rem;
      width: 16rem;
      height: 16rem;
      background-color: #ebf0fb;
      // background-color: #fd548520;
      border-radius: 0.5rem;
    }
  }

  .payBtn {
    display: block;
    margin: 0 auto;
    width: 7.5rem;
    height: 2.5rem;
    color: #fff;
    background-color: #fd5485;
    border-radius: 0.5rem;
  }
}
</style>