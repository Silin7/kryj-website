<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue'
import { useHead } from '@vueuse/head'
import pageJump from '@/hooks/pageJump'
import backToTop from '@/hooks/backToTop'
import windowOpen from '@/hooks/windowOpen'
import { zhhomeApi, friendlinkApi } from '@/api/interface'
import sideTop from '@/components/sideTop.vue'

// 可视窗口宽度 + 滚动
const windowWidth: any = ref(window.innerWidth)
const windowHeight: any = ref(window.innerHeight)
const windowScrollY: any = ref(window.scrollY)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

const domShow01: any = ref(false)
const domShow02: any = ref(false)
const domShow03: any = ref(false)
const domShow04: any = ref(false)

// 元素引用
const featuresBoxRef: any = ref(null)
const platformsBoxRef: any = ref(null)
const wtkfaiBoxRef: any = ref(null)
const pyBoxRef: any = ref(null)

// 计算元素是否应该显示
function checkElementVisibility(element: HTMLElement | null, offset: number = 100): boolean {
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  // 当元素顶部距离视口顶部的距离小于 (视口高度 - offset) 时显示
  // offset 表示提前显示的偏移量，默认100px，使元素在完全进入视口前就开始显示动画
  return rect.top < windowHeight - offset && rect.bottom > 0
}

function handleScroll() {
  windowScrollY.value = window.scrollY

  // 检查每个元素是否应该显示
  if (!domShow01.value && checkElementVisibility(featuresBoxRef.value)) {
    domShow01.value = true
  }
  if (!domShow02.value && checkElementVisibility(platformsBoxRef.value)) {
    domShow02.value = true
  }
  if (!domShow03.value && checkElementVisibility(wtkfaiBoxRef.value)) {
    domShow03.value = true
  }
  if (!domShow04.value && checkElementVisibility(pyBoxRef.value)) {
    domShow04.value = true
  }
}

function pageScroll() {
  window.scrollTo({
    top: windowHeight.value,
    behavior: 'smooth',
  })
}

// 首页数据
const homeData: any = ref({})

function getZhhome() {
  zhhomeApi().then((res: any) => {
    homeData.value = res.data
    if (res.data.seo) {
      useHead({
        meta: [
          { name: 'description', content: res.data.seo.categoryDescrip },
          { name: 'keywords', content: res.data.seo.categoryKeyword },
        ],
      })
    }
  })
}

// 友情链接
const flinktop: any = ref([])

function getFlinktop() {
  friendlinkApi().then((res: any) => {
    flinktop.value = res.data
  })
}

function onVideoError(e: any) {
  console.error('视频加载错误', e);
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  window.addEventListener('scroll', handleScroll)
  getZhhome()
  getFlinktop()
  // getVippartners()
  // getAllaiapp()

  // 等待 DOM 渲染完成后初始化检查
  nextTick(() => {
    // 延迟执行以确保所有元素都已渲染
    setTimeout(() => {
      handleScroll()
    }, 100)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="homePage">
    <!-- 返回顶部 -->
    <component v-if="windowScrollY > 500" :is="sideTop" @click="backToTop" />

    <!-- video -->
    <div class="videoBox">
      <video v-if="windowWidth > 768 && homeData?.homeBanner?.contentVideo" loop muted preload="auto" autoplay
        :poster="homeData?.homeBanner?.contentImg" data-setup="{}"
        :style="`object-fit: cover; width: 100%; height: ${windowHeight}px;`" @error="onVideoError">
        <source :src="homeData?.homeBanner?.contentVideo" type="video/mp4" />
      </video>
      <video v-else-if="windowWidth <= 768 && homeData?.homeBannerMobile?.contentVideo" loop muted preload="auto"
        autoplay :poster="homeData?.homeBannerMobile?.contentImg" data-setup="{}"
        :style="`object-fit: cover; width: 100%; height: ${windowHeight}px;`">
        <source :src="homeData?.homeBannerMobile?.contentVideo" type="video/mp4" />
      </video>
      <video v-else :poster="homeData?.homeBanner?.contentImg"
        :style="`object-fit: cover; width: 100%; height: ${windowHeight}px;`">
        <source :src="homeData?.homeBanner?.contentVideo" type="video/mp4" />
      </video>
      <div class="vbannerBox">
        <div class="vbannerContent">
          <div class="vbannerTitle">医学人工智能技术研发与应用</div>
          <button class="vbannerBtn" @click="pageJump('ai')">
            查看详情 <i class="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
      <img src="@/assets/home/downbtn.png" class="downbtnStyle" @click="pageScroll">
    </div>

    <!-- 公司简介 -->
    <div ref="featuresBoxRef" :class="['featuresBox', domShow01 ? 'animate__animated animate__backInUp' : '']">
      <img src="@/assets/home/gongsi.jpg" class="featuresGsImg" />
      <div class="featuresRounded">
        <div class="featuresRoundedTitle">{{ homeData?.homeCompany?.contentTitle }}</div>
        <div class="featuresRoundedInfo">
          {{ homeData?.homeCompany?.contentDescription }}
        </div>
      </div>
    </div>

    <!-- 产品轮播 -->
    <div ref="platformsBoxRef" :class="['platformsBox', domShow02 ? 'animate__animated animate__backInUp' : '']">
      <el-carousel :interval="2000" :type="windowWidth > 768 ? 'card' : ''" :pause-on-hover="false"
        :height="windowWidth > 768 ? '34rem' : '38rem'">
        <el-carousel-item v-for="(item, index) in homeData?.companyProduct" :key="index">
          <div class="platformsItem">
            <img :src="item.contentImg" />
            <div>
              <p class="platformsItitle">{{ item.contentTitle }}</p>
              <p class="platformsIinfo">{{ item.contentDescription }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 委托开发 AI预测平台  -->
    <div ref="wtkfaiBoxRef" :class="['wtkfaiBox', domShow03 ? 'animate__animated animate__backInUp' : '']">
      <div class="wtkfaiItem animate__animated">
        <div class="wtkfaiTitle">委托开发</div>
        <img src="@/assets/home/wtkf.png" alt="" class="wtkfaiPicture" />
        <img src="@/assets/home/jb1.png" alt="" class="ysjImg">
        <img src="@/assets/home/jb1.png" alt="" class="zxjImg">
      </div>
      <div class="wtkfaiItem animate__animated" @click="pageJump('ai')">
        <img src="@/assets/home/aipt.png" alt="" class="wtkfaiPicture" />
        <img src="@/assets/home/jb1.png" alt="" class="ysjImg">
        <img src="@/assets/home/jb1.png" alt="" class="zxjImg">
        <div class="wtkfaiTitle">AI预测平台</div>
      </div>
    </div>

    <!-- 友情链接  -->
    <div ref="pyBoxRef" :class="['pyBox', domShow04 ? 'animate__animated animate__backInUp' : '']">
      <div class="pyTitle">友情链接</div>
      <div class="pyHeng"></div>
      <div class="pyClassbox">
        <div v-for="(item, index) in flinktop" :key="index" class="pyClassitem"
          @click="windowOpen(item.contentOutLink, true)">
          <img :src="item.contentImg" alt="" class="pyClassitemfa" />
          <div class="pyClassitemtext">{{ item.contentTitle }}</div>
          <!-- <div class="pyClassiteminfo">{{ item.remark }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homePage {
  position: relative;
  background-color: #f9fafb;
  overflow-x: hidden;

  .videoBox {
    position: relative;

    video {
      margin: 0;
      padding: 0;
    }

    .vbannerBox {
      width: 100%;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;

      .vbannerContent {
        margin: 0 auto;
        width: 100%;
        max-width: 1400px;
        // height: 100vh;
      }

      .vbannerTitle {
        padding: 0 1rem;
        margin-top: calc(40vh - 3rem);
        font-size: clamp(2rem, 5vw, 3rem);
        line-height: 3rem;
        text-align: center;
        color: #ffffff;
      }

      .vbannerBtn {
        margin: 2rem auto 0;
        width: 10rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        text-align: center;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 3rem;

        i {
          margin-left: 0.5rem;
        }

        &:hover {
          i {
            margin-left: 0.75rem;
          }
        }
      }
    }

    .downbtnStyle {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 324px;
      height: 52px;
      opacity: 0.2;

      &:hover {
        cursor: pointer;
        transform: translateX(-50%) translateY(-2px);
        transition: all ease 0.3s;
        opacity: 1;
      }
    }
  }

  .featuresBox {
    margin: 6rem auto 0;
    padding: 1.5rem;
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f4f9;
    box-sizing:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 1rem;

    @media (max-width: 768px) {
      margin: 0 1rem;
      padding: 1rem;
      width: calc(100% - 2rem);
    }

    .featuresGsImg {
      width: 30rem;
      border-radius: 0.5rem;

      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .featuresRounded {
      width: calc(100% - 31.5rem);

      @media (max-width: 768px) {
        width: 100%;
      }

      .featuresRoundedTitle {
        margin-bottom: 1rem;
        font-size: clamp(1.25rem, 4vw, 1.5rem);
        line-height: 1;
        font-weight: 700;
        text-align: center;
        color: #1f3e85;

        @media (max-width: 768px) {
          margin-top: 1rem;
        }
      }

      .featuresRoundedInfo {
        font-size: clamp(1rem, 4vw, 1.25rem);
        line-height: 1.5;
        color: #4b5563;
      }
    }
  }

  .wtkfaiBox {
    position: relative;
    margin: 0 auto;
    // padding: 01rem;
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    @media (max-width: 768px) {
      margin-top: 2rem;
      padding: 0 1rem;
    }

    .wtkfaiItem {
      position: relative;
      padding: 1rem 0;
      width: 40%;
      // width: calc(50% - 2rem);
      display: flex;
      flex-flow: column;
      align-items: center;
      background-color: #ebf0fb;

      &:hover {
        cursor: pointer;

        .wtkfaiTitle {
          transform: scale(1.1);
          transition: all ease 0.2s;
        }

        .wtkfaiPicture {
          transform: scale(1.1);
          transition: all ease 0.2s;
        }

        img {
          opacity: 1;
          transition: all ease 0.2s;
        }
      }

      @media (max-width: 768px) {
        width: 100%;

        &:first-child {
          margin-bottom: 1rem;
        }
      }

      @media (min-width: 768px) {
        &:first-child {
          margin: 6rem 0 12rem;

          .wtkfaiTitle {
            border-bottom: 1px solid #fff;
          }
        }

        &:last-child {
          margin: 12rem 0 6rem;

          .wtkfaiTitle {
            border-top: 1px solid #fff;
          }
        }
      }

      .wtkfaiTitle {
        width: 100%;
        padding: 1rem 0;
        text-align: center;
        color: #1f3e85;
        font-weight: 700;
        font-size: clamp(1.25rem, 4vw, 1.75rem);
      }

      .wtkfaiPicture {
        width: 50%;
      }

      .ysjImg {
        position: absolute;
        top: -0.65rem;
        right: -0.65rem;
        width: 1.5rem;
        height: 1.5rem;
        opacity: 0;
      }

      .zxjImg {
        position: absolute;
        bottom: -0.65rem;
        left: -0.65rem;
        width: 1.5rem;
        height: 1.5rem;
        transform: rotate(180deg);
        opacity: 0;
      }
    }
  }

  .cpzxBox {
    padding: 6rem 2.5rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);

    @media (max-width: 768px) {
      padding: 4rem 0;
    }

    .cpzxContent {
      position: relative;
      margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0 1rem;
      }

      .cpzxTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .cpzxHeng {
        margin: 1rem auto 2.5rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;
      }

      .cpzxClassbox {
        margin-bottom: 2.5rem;
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          margin-bottom: 1.5rem;
        }

        .cpzxClassitem {
          margin: 0 1rem 1rem 0;
          padding: 1.25rem;
          width: calc(33.3% - 1rem);
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background-color: rgb(249 250 251);
          border-radius: 0.75rem;

          @media (max-width: 768px) {
            padding: 1.25rem 1rem;
            width: calc(50% - 1rem);
          }

          .cpzxClassitemfa {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            border-radius: 9999px;
            background-color: rgb(22 93 255 / 0.1);

            @media (max-width: 768px) {
              width: 3rem;
              height: 3rem;
            }

            i {
              font-size: 1.5rem;
              color: #1f3e85;
            }
          }

          .cpzxClassitemfa2 {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            border-radius: 9999px;
            background-color: rgb(114 46 209 / 0.1);

            @media (max-width: 768px) {
              width: 3rem;
              height: 3rem;
            }

            i {
              font-size: 1.5rem;
              color: #722ed1;
            }
          }

          .cpzxClassitemtext {
            line-height: 1.5rem;
            font-weight: 500;
            text-align: center;
            color: rgb(1 32 96);
          }
        }

        .cpzxClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }

      .cpzxClassbox:last-child {
        margin-bottom: 0rem;
      }
    }
  }

  .mxBox {
    margin: 0 auto;
    padding: 2.5rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    background-image: url('../assets/home/about00.jpg');

    @media (max-width: 768px) {
      padding: 2.5rem 0;
    }

    .mxContent {
      margin: 0 auto;
      position: relative;
      padding: 0 2rem;
      width: 100%;
      max-width: 1400px;

      @media (max-width: 768px) {
        padding: 0 1rem;
      }

      .mxTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .mxHeng {
        margin: 1rem auto 0;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;
      }

      .mxInfo {
        margin: 1rem auto 2.5rem;
        text-align: center;
        max-width: 42rem;
        color: #4b5563;
      }

      .mxClassbox {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .mxClassitem {
          margin: 0 1rem 1rem 0;
          padding: 1.25rem;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
          border-radius: 0.75rem;

          @media (min-width: 992px) {
            width: calc(16.6% - 1rem);
          }

          @media (max-width: 992px) and (min-width: 768px) {
            width: calc(33.3% - 1rem);
          }

          @media (max-width: 768px) {
            padding: 1rem 0.5rem;
            width: calc(50% - 1rem);
          }

          .mxClassitemfa {
            margin-bottom: 1rem;
            padding: 0.25rem;
            width: 5rem;
            height: 5rem;
            border-radius: 9999px;
            border: 2px solid rgb(22 93 255 / 0.2);
          }

          .mxClassitemfa2 {
            margin-bottom: 1rem;
            width: 5rem;
            height: 5rem;
            border-radius: 9999px;
            background-color: rgb(114 46 209 / 0.1);
          }

          .mxClassitemtext {
            line-height: 1.5rem;
            font-weight: 500;
            text-align: center;
            color: rgb(1 32 96);
          }
        }

        .mxClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }
      }
    }
  }

  .pyBox {
    position: relative;
    margin: 6rem auto 0;
    padding: 0 2rem 6rem;
    width: 100%;
    max-width: 1400px;

    @media (max-width: 768px) {
      margin: 4rem auto 0;
      padding: 0 1rem 4rem;
    }

    .pyTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .pyHeng {
      margin: 1rem auto 2.5rem;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: #1f3e85;
    }

    .pyClassbox {
      width: calc(100% + 1rem);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .pyClassitem {
        margin: 0 1rem 1rem 0;
        padding: 1.25rem 1rem;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 0.75rem;

        @media (min-width: 992px) {
          width: calc(16.6% - 1rem);
        }

        @media (max-width: 992px) and (min-width: 768px) {
          width: calc(33.3% - 1rem);
        }

        @media (max-width: 768px) {
          padding: 1rem 0.5rem;
          width: calc(50% - 1rem);
        }

        .pyClassitemfa1 {
          margin-bottom: 1rem;
          padding: 0.25rem;
          width: 5rem;
          height: 5rem;
          border-radius: 9999px;
          border: 2px solid rgb(22 93 255 / 0.2);
        }

        .pyClassitemfa {
          margin-bottom: 1rem;
          width: 5rem;
          height: 5rem;
          border-radius: 9999px;
          background-color: rgb(114 46 209 / 0.1);
        }

        .pyClassitemtext {
          line-height: 1.5rem;
          font-weight: 500;
          text-align: center;
          color: rgb(1 32 96);
        }

        .pyClassiteminfo {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          text-align: center;
          color: #6b7280;
        }
      }

      .pyClassitem:hover {
        @media (min-width: 768px) {
          cursor: pointer;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
          animation: jumpUpwards 300ms ease-in-out forwards;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.platformsBox {
  position: relative;
  margin: 6rem auto 0;
  width: 100%;
  max-width: 1400px;

  @media (max-width: 768px) {
    margin: 2rem auto 0;
    padding: 1rem;
  }

  .el-carousel__item {
    background-color: #f1f4f9;
    border-radius: 1rem;
  }

  .platformsItem {
    padding: 1rem 4rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color: #475669;

    @media (max-width: 768px) {
      padding: 1rem;
    }

    img {
      width: 16rem;
      height: 16rem;
    }

    .platformsItitle {
      width: 100%;
      padding: 1rem 0;
      text-align: center;
      color: #1f3e85;
      font-weight: 700;
      font-size: clamp(1.25rem, 4vw, 1.75rem);
    }

    .platformsIinfo {
      line-height: 1.5;
      color: #475669;
    }
  }
}
</style>
