<script setup lang="ts">
import dayjs from 'dayjs'
import qrcode from 'qrcode'
import router from '@/router'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { checkTimeApi, cusedlistApi, ordercreateApi, orderstatusApi } from '@/api/interface'

const windowWidth: any = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 免费体验剩余次数
const checkInfo: any = ref({})

function getCheckTime() {
  checkTimeApi().then((res: any) => {
    if (res?.code === 0) {
      checkInfo.value = res.data
    } else {
      ElMessage.error('登录信息失效，请重新登录')
      pageJump('login')
    }
  })
}

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
function payNowClick() {
  ordercreateApi({
    spuId: usedId.value,
    channelCode: 'wx_native',
    displayMode: 'qr_code',
    returnUrl: 'https://keruimed.com/ai/buy',
  }).then(async (res: any) => {
    orderId.value = res.data.orderId
    qrCodeData.value = await qrcode.toDataURL(res.data.displayContent, { scale: 4 })
    verificationTimer.value = setInterval(() => {
      getpaystatus(orderId.value)
    }, 3000)
  })
}

// 已支付，立即返回
function paidback() {
  router.push({
    name: 'ai',
    params: {
      orderId: orderId.value
    },
  })
}

// 查询支付状态
const dialogVisible: any = ref(false)
const verificationTimer: any = ref(null)

function getpaystatus(orderId: any) {
  orderstatusApi(orderId).then((res: any) => {
    if (res.data) {
      dialogVisible.value = true
      clearInterval(verificationTimer.value)
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
  clearInterval(verificationTimer.value)
})

</script>

<template>
  <div>
    <div class="myrecordsPage">
      <div class="myrecordsContent">
        <div class="frbc">
          <div></div>
          <div class="goBack" @click="pageJump('ai')"><i class="fa fa-angle-left"></i>返回</div>
        </div>
        <div class="myrecordsContentSr">
          <div class="dialogBox">
            <div class="dialogLeft">
              <div class="dialogItem">
                <div class="dialogSubTitle">当前会员信息：</div>
                <div v-if="checkInfo.validDate" class="dialogDqhyxx">
                  有效期截止 <span>{{ dayjs(checkInfo.checkDate).format('YYYY年MM月DD日') }}</span>
                </div>
                <div v-if="!checkInfo.validDate" class="dialogDqhyxx">
                  剩余<span>{{ checkInfo.checkTime }}</span>次
                </div>
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
                    <img src="@/assets/sys/weixin.png" />
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
                <div class="dialogRlabel">
                  ￥{{ usedItem.comboRealPrice }}/{{ usedItem.comboName }}
                </div>
              </div>
              <div v-if="usedItem.comboType === '1'" class="frbc">
                <div class="dialogRlabel">有效次数</div>
                <div class="dialogRlabel">{{ usedItem.totalCheckTime }}</div>
              </div>
              <div v-if="usedItem.comboType === '2'" class="frbc">
                <div class="dialogRlabel">有效日期</div>
                <div class="dialogRlabel">
                  {{ dayjs(usedItem.nextCheckDate).format('YYYY年MM月DD日') }}
                </div>
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
              <div v-if="qrCodeData">
                <img :src="qrCodeData" class="qrCodeImg" />
                <div v-if="windowWidth > 768" style="text-align: center; margin-top: 0.5rem; color: #1f3e85;">请使用微信扫码支付
                </div>
                <div v-else style="text-align: center; margin-top: 0.5rem; color: #1f3e85;">长按识别二维码支付</div>
                <button class="dialogQdfk" @click="paidback">已支付，立即返回</button>
              </div>
              <button v-else class="dialogQdfk" @click="payNowClick">确定付款</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="" v-model="dialogVisible" width="800">
      <div class="dialogSuccess">
        <img src="@/assets/ai/successpay.png" />
        <div>
          <p style="text-align: center; font-size: 1.25rem; font-weight: 700; color: #1f3e85;">
            支付成功！
          </p>
          <p style="text-align: center; margin-top: 1rem; color: #4b5563;">
            感谢您的支持，您的会员权益已生效，快去使用吧！
          </p>
        </div>
        <button @click="paidback">立即查看</button>
      </div>
    </el-dialog>
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

    .goBack {
      display: inline-block;
      margin-bottom: 1rem;
      font-weight: 700;
      color: #1f3e85;

      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }

      i {
        margin-right: 0.5rem;
        font-weight: 700;
        font-size: 1.25rem;
      }
    }

    .myrecordsContentSr {
      padding: 1rem;
      border-radius: 1rem;
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

      .dialogBox {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .dialogLeft {
          width: 70%;

          @media (max-width: 768px) {
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
                  padding: 2rem 1rem;
                  width: calc(33.3% - 1rem);
                  color: #1f3e85;
                  border: 1px solid #ebf0fb;
                  border-radius: 0.5rem;

                  @media (max-width: 768px) {
                    padding: 1rem;
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

          @media (max-width: 768px) {
            width: 100%;
          }

          .dialogRtitle {
            margin-bottom: 1.5rem;
            padding-left: 0.5rem;
            font-size: 1.25rem;
            line-height: 1.5rem;
            border-left: 0.25rem solid #1f3e85;
          }

          .dialogRcbName {
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
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
            margin: 1rem auto;
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
    }
  }
}

.dialogSuccess {

  img {
    display: block;
    margin: 0 auto;
    width: 50%;
    margin-bottom: 2dvw;
  }

  button {
    display: block;
    margin: 2rem auto 1rem;
    width: 10rem;
    height: 40px;
    font-weight: 700;
    color: #fff;
    background-image: linear-gradient(90deg, #4ba6ff 0%, #0477ff 100%);
    border-radius: 0.5rem;
  }
}
</style>
