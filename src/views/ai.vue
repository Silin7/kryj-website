<script setup lang="ts">
import dayjs from 'dayjs'
import qrcode from 'qrcode'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { checkTimeApi, cusedlistApi, ordercreateApi, orderstatusApi } from '@/api/interface'

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

// 套餐列表
const usedId: any = ref('')
const usedItem: any = ref({})
const usedList: any = ref([])
function getCusedlist() {
  cusedlistApi().then((res: any) => {
    usedList.value = res.data
    if (res.data?.length > 0) {
      usedId.value = res.data[0].id
      usedItem.value = res.data[0]
    }
  })
}
function usedItemClick(item: any) {
  usedId.value = item.id
  usedItem.value = item
  qrCodeData.value = ''
}

// 立即支付
const orderId: any = ref('')
const qrCodeData: any = ref('')
const verificationTimer: any = ref(null)
function payNowClick() {
  ordercreateApi({
    spuId: usedId.value,
    channelCode: 'wx_native',
    displayMode: 'qr_code',
    returnUrl: 'http://localhost:3005/ai',
  }).then(async (res: any) => {
    orderId.value = res.data.orderId
    qrCodeData.value = await qrcode.toDataURL(res.data.displayContent, { scale: 4 })
    // 查询支付状态
    verificationTimer.value = setInterval(() => {
      getpayvideostatus()
    }, 3000)
  })
}

// 查询支付状态
function getpayvideostatus() {
  orderstatusApi(orderId.value).then((res: any) => {
    if (res.data) {
      dialogVisible.value = false
      ElMessage({
        type: 'success',
        message: '付款成功',
      })
      // setTimeout(() => {
      //   window.reload()
      // }, 2000)
    }
  })
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
    <el-dialog title="" v-model="dialogVisible" :width="windowWidth <= 768 ? 'calc(100% - 2rem)' : '1200'">
      <div class="dialogBox">
        <div class="dialogLeft">
          <div class="dialogItem">
            <div class="dialogSubTitle">当前会员信息：</div>
            <div class="dialogDqhyxx">{{ usedItem.comboName }}</div>
          </div>
          <div class="dialogItem">
            <div class="dialogSubTitle">订阅方式：</div>
            <div class="paymentMethod">
              <div class="usedBox">
                <div v-for="(item, index) in usedList" :key="index"
                  :class="['usedItemDom', usedId === item.id ? 'usedItemActive' : '']" @click="usedItemClick(item)">
                  <div class="usedComboName">
                    <span>{{ item.comboName }}</span>
                  </div>
                  <div class="usedRealPrice">
                    ￥<span class="realPriceText">{{ item.comboRealPrice }}</span>
                    <span v-if="item.comboPrice !== item.comboRealPrice" class="usedPrice">
                      原价￥{{ item.comboPrice }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dialogItem">
            <div class="dialogSubTitle">支付方式：</div>
            <div class="weixinPay">
              <div class="weixinCard">
                <img src="@/assets/user/weixin.png" />
                <span>微信支付</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialogRight">
          <div class="dialogRtitle">您选择的购买方案</div>
          <div class="dialogRcbName">{{ usedItem.comboName }}</div>
          <div class="frbc">
            <div class="dialogRlabel">价格</div>
            <div class="dialogRlabel">￥{{ usedItem.comboRealPrice }}/{{ usedItem.comboName }}</div>
          </div>
          <div v-if="usedItem.comboType === '1'" class="frbc">
            <div class="dialogRlabel">有效次数</div>
            <div class="dialogRlabel">{{ usedItem.totalCheckTime }}</div>
          </div>
          <div v-if="usedItem.comboType === '2'" class="frbc">
            <div class="dialogRlabel">有效日期</div>
            <div class="dialogRlabel">{{ dayjs(usedItem.nextCheckDate).format('YYYY年MM月DD日') }}</div>
          </div>
          <div class="dialogRddje">
            <div class="dialogDdjelabel">订单金额</div>
            <div class="dialogDdjeval">
              <div v-if="usedItem.discountPrice || usedItem.discountPercent" class="dialogYhmx">
                <div v-if="usedItem.discountPrice">
                  立减<span>{{ usedItem.discountPrice }}</span>
                </div>
                <div v-if="usedItem.discountPercent">
                  享<span>{{ (100 - usedItem.discountPercent) / 10 }}</span>折
                </div>
              </div>
              <div class="dialogDdjevalPrice">
                ￥<span>{{ usedItem.comboRealPrice }}</span>
              </div>
            </div>
          </div>
          <img v-if="qrCodeData" :src="qrCodeData" class="qrCodeImg" />
          <button v-else class="dialogQdfk" @click="payNowClick">确定付款</button>
        </div>
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

.dialogBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .dialogLeft {
    width: 70%;

    @media (max-width:768px) {
      width: 100%;
    }

    .dialogItem {
      font-size: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;

      .dialogSubTitle {
        flex-shrink: 1;
        min-width: 110px;
        margin-bottom: 1rem;
        line-height: 1.25rem;
        color: #4b5563;
      }

      .dialogDqhyxx {
        margin-bottom: 2rem;
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.25rem;
        color: #1f3e85;
      }

      .paymentMethod {
        margin-bottom: 2rem;
        padding-top: 1rem;
        font-size: 1rem;
        border: 1px solid #ebf0fb;
        border-radius: 0.5rem;

        .usedBox {
          padding-right: 1rem;
          display: flex;
          flex-wrap: wrap;

          .usedItemDom {
            position: relative;
            margin: 0 0 1rem 1rem;
            padding: 1rem;
            width: calc(33.3% - 1rem);
            color: #1f3e85;
            border: 1px solid #ebf0fb;
            border-radius: 0.5rem;

            @media (max-width: 768px) {
              width: 100%;
            }

            &:hover {
              cursor: pointer;
              background-image: linear-gradient(0deg, #e7f0fd 0%, #4ba6ff80 100%);
            }

            .usedComboName {
              font-weight: 700;
              line-height: 1rem;
            }

            .usedRealPrice {
              margin-top: 1rem;
              font-size: 0.875rem;
              line-height: 0.875rem;
              color: #0477ff;

              .realPriceText {
                font-weight: 700;
                font-size: 1.5rem;
                line-height: 1.5rem;
              }

              .usedPrice {
                text-decoration: line-through;
                opacity: 0.6;
                color: #4b5563;
              }
            }
          }

          .usedItemActive {
            background-image: linear-gradient(0deg, #e7f0fd 0%, #4ba6ff80 100%);
          }
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

      .weixinPay {
        margin-bottom: 2rem;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        background-color: #ebf0fb;
        border-radius: 0.25rem;

        .weixinCard {
          padding: 0.25rem 0.5rem;
          display: flex;
          align-items: center;
          background-color: #fff;
          border-radius: 0.25rem;

          img {
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            margin-right: 0.5rem;
          }

          span {
            font-size: 1rem;
            line-height: 1.25rem;
          }
        }
      }
    }
  }

  .dialogRight {
    width: calc(30% - 1rem);
    background-color: #ebf0fb;
    border-radius: 0.5rem;
    padding: 1rem;

    @media (max-width:768px) {
      width: 100%;
    }

    .dialogRtitle {
      margin-bottom: 1.5rem;
      padding-left: 0.5rem;
      font-size: 1.5rem;
      line-height: 1.5rem;
      border-left: 0.25rem solid #1f3e85;
    }

    .dialogRcbName {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      line-height: 1.5rem;
      color: #1f3e85;
    }

    .dialogRlabel {
      margin-bottom: 1rem;
      line-height: 1;
      color: #4b5563;
    }

    .dialogRddje {
      padding: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f4f9;

      .dialogDdjelabel {
        line-height: 1;
        color: #4b5563;
      }

      .dialogDdjeval {
        display: flex;
        align-items: center;

        .dialogYhmx {
          margin-right: 0.5rem;
          padding: 0 0.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          font-weight: 700;
          color: #f68e06;
          background-color: #f6e8ca;
          border-radius: 0.25rem;
        }

        .dialogDdjevalPrice {
          font-weight: 700;
          color: #0477ff;

          span {
            font-size: 1.25rem;
          }
        }
      }
    }

    .qrCodeImg {
      display: block;
      margin: 0 auto;
      width: 8rem;
      height: 8rem;
    }

    .dialogQdfk {
      display: block;
      margin: 2rem auto 0;
      width: 100%;
      height: 40px;
      font-weight: 700;
      color: #fff;
      background-image: linear-gradient(90deg, #4ba6ff 0%, #0477ff 100%);
      border-radius: 0.5rem;
    }
  }
}
</style>
