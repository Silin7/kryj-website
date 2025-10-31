<script setup lang="ts">
import dayjs from 'dayjs'
import qrcode from 'qrcode'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { fileURL } from '@/api/baseConfig'
// import formatCurrency from '@/hooks/formatCurrency'
import { videodetailApi } from '@/api/modules/video'
import {
  wxpayvideocreateApi,
  alipayvideocreateApi,
  payvideostatusApi,
  videoplayApi,
  videodownloadApi,
} from '@/api/modules/pay'

// 路由信息
const route = useRoute()
const videoid: any = ref('')
const videoDetails: any = ref({})

function getVideodetail() {
  videodetailApi(videoid.value).then((res: any) => {
    if (res) {
      videoDetails.value = res
    }
  })
}

// 用户端-创建视频购买支付订单（item_id=0），生成微信支付二维码
const payStatus: any = ref()
const dialogVisible: any = ref(false)
const qrCodeData = ref('')
const payvideocreate: any = ref({})
const verificationTimer: any = ref(null)

// 微信支付
function getWxpayvideocreate() {
  wxpayvideocreateApi(videoid.value).then(async (res: any) => {
    if (res) {
      dialogVisible.value = true
      payvideocreate.value = res
      qrCodeData.value = await qrcode.toDataURL(payvideocreate.value.qr_code, { scale: 4 })
      console.log('微信支付 -------->', res)
      // 查询支付状态
      verificationTimer.value = setInterval(() => {
        getpayvideostatus()
      }, 3000)
    }
  })
}

// {"code":400,"msg":"创建支付宝订单失败：'AlipayTradeCreateRequest' object has no attribute（请稍后重试）","data":null}
// 支付宝支付
function getAlpayvideocreate() {
  alipayvideocreateApi(videoid.value).then((res: any) => {
    if (res) {
      console.log('支付宝支付 -------->', res)
    }
  })
}

// 查询支付状态 -- 0待支付 1已支付 -1已过期 -2未支付
function getpayvideostatus() {
  payvideostatusApi('0', videoid.value).then((res: any) => {
    if (res) {
      payStatus.value = res.status
      if (res.status === -1 || res.status === -2) {
        clearInterval(verificationTimer.value)
      } else if (res.status === 1) {
        dialogVisible.value = false
        isBuy.value = true
        // getVideoPlay()
        getVideoDownload()
        clearInterval(verificationTimer.value)
      }
    }
  })
}

// // 获取视频播放地址
// function getVideoPlay() {
//   videoplayApi(videoid.value).then((res: any) => {
//     if (res) {
//       console.log('获取播放地址 -------->', res)
//       // videoDetails.value.vurl = res.play_url
//     }
//   })
// }

// 获取视频下载地址
const videoLink: any = ref(false)
function getVideoDownload() {
  videodownloadApi(videoid.value).then((res: any) => {
    if (res) {
      videoLink.value = res
    }
  })
}

function downloadMp4() {
  ElMessage({
    message: '开始下载',
    type: 'warning',
  })
  let url = videoLink.value.download_url //下载的文件URL
  // let fileName = url.slice(url.lastIndexOf("/") + 1); //下载的文件名换成自己的
  let fileName = videoLink.value.title //下载的文件名字
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob' // 返回类型blob
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let blob = xhr.response
      let downLoadUrl = window.URL.createObjectURL(
        new Blob([blob], {
          // type: item.type === "video" ? "video/mp4" : "image/jpeg",
          type: 'video/mp4', //这里限制了视频，上面的可以放开限制下载图片
          // type: videoLink.value.format, //这里限制了视频，上面的可以放开限制下载图片
        }),
      )
      let a = document.createElement('a')
      a.download = fileName
      a.href = downLoadUrl
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
  xhr.send()
}

onMounted(() => {
  videoid.value = route.query.id
  getVideodetail()
  // 查询支付状态
  getpayvideostatus()
  verificationTimer.value = setInterval(() => {
    getpayvideostatus()
  }, 3000)
})

onUnmounted(() => {
  clearInterval(verificationTimer.value)
})

// 时分秒过滤器
function convertSecondsToHMS(seconds: any) {
  var hours = Math.floor(seconds / 3600)
  var minutes = Math.floor((seconds % 3600) / 60)
  var remainingSeconds = seconds % 60
  var returnStr = ''
  if (hours) {
    returnStr += hours + '小时'
  }
  returnStr += minutes + '分钟'
  if (remainingSeconds) {
    returnStr += remainingSeconds + '秒 '
  }
  return returnStr
}

// 视频源
const isBuy: any = ref(false)
const videoPlayer: any = ref(null)
const showTimeLimitMessage: any = ref(false)
const timeLimit: any = 3 // 限制播放时间（秒）
const isTimeLimited: any = ref(false)

// 处理视频时间更新
const handleTimeUpdate = () => {
  if (!videoPlayer.value || isTimeLimited.value) return

  // 当播放时间超过限制时暂停视频
  console.log(
    '当播放时间超过限制时暂停视频 -------->',
    videoPlayer.value.currentTime >= timeLimit && !isBuy.value,
  )
  if (videoPlayer.value.currentTime >= timeLimit && !isBuy.value) {
    videoPlayer.value.pause()
    isTimeLimited.value = true
    showTimeLimitMessage.value = true
  }
}

// 处理播放事件
const handlePlay = () => {
  // 如果已经达到时间限制，则不允许继续播放
  if (isTimeLimited.value) {
    videoPlayer.value.pause()
    showTimeLimitMessage.value = true
  }
}

// 处理视频结束事件
const handleEnded = () => {
  showTimeLimitMessage.value = false
  isTimeLimited.value = false
}

// // 重新播放
// const resetVideo = () => {
//   if (videoPlayer.value) {
//     videoPlayer.value.currentTime = 0;
//     isTimeLimited.value = false;
//     showTimeLimitMessage.value = false;
//   }
// };
</script>

<template>
  <div class="pdPage">
    <div class="pdCbox">
      <div class="pdcLeft">
        <div class="pdclJbcs">
          <div class="pdclJbcsVideo">
            <video v-if="videoDetails.vurl" ref="videoPlayer" :poster="fileURL + videoDetails.thumbnail" controls="true"
              preload="metadata" @timeupdate="handleTimeUpdate" @play="handlePlay" @ended="handleEnded">
              <source :src="videoDetails.vurl" type="video/mp4" />
              您的浏览器不支持HTML5视频播放，请升级浏览器
            </video>
            <!-- 超时提示 -->
            <div v-if="showTimeLimitMessage" class="timeLimitMessage">
              <p>视频已播放1分钟，如需继续观看，请解锁完整版本</p>
              <!-- <button @click="resetVideo" class="resetBtn">重新播放</button> -->
              <button @click="getWxpayvideocreate" class="resetBtn">立即购买</button>
            </div>
          </div>
          <div class="videoInfoBox">
            <div class="videoTitle">{{ videoDetails.title }}</div>
            <div class="videoTags">
              <div class="videoTagItem">
                <i class="fa fa-clock-o mr-2 text-primary"></i>
                <span>总时长：{{ convertSecondsToHMS(videoDetails.vlength) }}</span>
              </div>
              <!-- <div class="videoTagItem">
                <i class="fa fa-eye mr-2 text-primary"></i>
                <span>播放量：12,840次</span>
              </div> -->
              <div class="videoTagItem">
                <i class="fa fa-calendar mr-2 text-primary"></i>
                <span>更新时间：{{ dayjs(videoDetails.updated_at).format('YYYY-MM-DD') }}</span>
              </div>
              <div v-if="videoDetails.keywords" class="videoTagItem">
                <i class="fa fa-tag mr-2 text-primary"></i>
                <span>分类：
                  <span v-for="(item, index) in videoDetails.keywords.split(' ')" :key="index">
                    <span>{{ item }}</span>
                    <span v-if="index < videoDetails.keywords.split(' ').length - 1"> / </span>
                  </span>
                </span>
              </div>
            </div>
            <button v-if="payStatus === 1" @click="downloadMp4">
              <i class="fa fa-download"></i>
              <span>立即下载</span>
            </button>
            <button v-else @click="getWxpayvideocreate">
              <i class="fa fa-shopping-cart"></i>
              <span>立即购买 ¥{{ videoDetails.price }}</span>
            </button>
          </div>
        </div>
        <!-- <div class="pdclXq">
          <div class="pdclxTitle">介绍</div>
          <div class="" v-html="videoDetails.content"></div>
        </div> -->
      </div>
      <div class="pdcRight">
        <div class="pdcrTitle"><i class="fa fa-info-circle"></i>视频信息</div>
        <div class="pdcrItem">
          <p>时长：</p>
          <p>{{ convertSecondsToHMS(videoDetails.vlength) }}</p>
        </div>
        <div class="pdcrItem">
          <p>视频供方：</p>
          <p>{{ videoDetails.source }}</p>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="选择支付方式" width="600">
      <div class="payment-methods">
        <div class="payment-method wechat">
          <div class="method-header">
            <img src="@/assets/user/weixin.png" alt="微信支付" class="icon" />
            <span>微信支付</span>
          </div>
          <div class="course-box">
            <img :src="qrCodeData" :alt="payvideocreate.qr_code" style="width: 100%" />
          </div>
          <div class="course-info">
            <p>BIM建模基础与实战</p>
            <p>
              支付金额：<span class="price">¥{{ videoDetails.price }}</span>
            </p>
            <p>请用微信扫码支付，支付后可下载视频</p>
          </div>
        </div>
        <div class="payment-method alipay">
          <div class="method-header">
            <img src="@/assets/user/alipay.png" alt="支付宝支付" class="icon" />
            <span>支付宝支付</span>
          </div>
          <button class="pay-btn" @click="getAlpayvideocreate">去支付宝支付</button>
          <div class="course-info">
            <p>BIM建模基础与实战</p>
            <p>
              支付金额：<span class="price">¥{{ videoDetails.price }}</span>
            </p>
            <p>点击按钮后，页面将跳转到支付宝官网完成支付</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.pdPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .pdCbox {
    position: relative;
    margin: 0 auto;
    padding: 5rem 1rem 1rem;
    width: 100%;
    max-width: 1400px;
    color: rgb(1 32 96);

    @media (min-width: 992px) {
      padding: 6rem 2rem 2rem;
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
        overflow: hidden;
        margin-bottom: 2rem;
        background-color: rgb(255 255 255);
        border-radius: 1rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        .pdclJbcsVideo {
          position: relative;

          video {
            width: 100%;
          }

          .timeLimitMessage {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            width: 80%;
            max-width: 500px;

            .resetBtn {
              margin-top: 15px;
              padding: 8px 16px;
              background-color: rgb(22 93 255 / 0.6);
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.3s;
            }

            .resetBtn:hover {
              background-color: rgb(22 93 255);
            }
          }
        }

        .videoInfoBox {
          padding: 1.5rem;

          @media (max-width: 768px) {
            padding: 1rem;
          }

          .videoTitle {
            margin-bottom: 1rem;
            color: rgb(1 32 96 / var(--tw-text-opacity, 1));
            font-weight: 700;
            font-size: clamp(1.5rem, 3vw, 2.25rem);
          }

          .videoTags {
            color: rgb(107 114 128 / var(--tw-text-opacity, 1));
            display: flex;
            flex-wrap: wrap;

            i {
              margin-right: 0.5rem;
              color: rgb(22 93 255 / var(--tw-text-opacity, 1));
            }

            .videoTagItem {
              margin-bottom: 1rem;
              margin-right: 1rem;
            }
          }

          button {
            padding: 0.75rem 1.5rem;
            color: #fff;
            background-color: rgb(22 93 255 / 0.9);
            border-radius: 0.5rem;

            i {
              margin-right: 0.5rem;
            }
          }

          button:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              transform: scale(1.05);
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
              color: rgb(22 93 255);
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
              background-color: rgb(22 93 255);
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
                color: rgb(22 93 255);
              }

              button {
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: rgb(22 93 255);
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

        i {
          margin-right: 0.5rem;
          color: rgb(22 93 255 / var(--tw-text-opacity, 1));
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
        justify-content: space-between;
        align-items: center;
        line-height: 1.5rem;
        padding-bottom: 1rem;

        p:first-child {
          color: rgb(107 114 128 / var(--tw-text-opacity, 1));
        }
      }
    }
  }
}
</style>

<style>
.payment-methods {
  display: flex;
  gap: 20px;
}

.payment-method {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.method-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.course-box {
  margin-bottom: 2rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

.course-cover {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

.course-info p {
  margin: 1rem 0;
  text-align: center;
}

.course-info p:first-child {
  color: rgb(1 32 96);
}

.price {
  color: red;
  font-weight: bold;
}

.pay-btn {
  display: block;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin: 0 auto 2rem;
}

.pay-btn:hover {
  background-color: #0e66d4;
}
</style>
