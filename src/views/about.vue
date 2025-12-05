<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import '@/assets/tailwindcss.js'
import { zhabouseoApi, zhaboutcontentApi } from '@/api/interface'

// 关于我们 - banner
const aboutBanner: any = ref(null)

function getzhabouSeo() {
  zhabouseoApi().then((res: any) => {
    aboutBanner.value = res.data.about
    if (res.data.seo) {
      useHead({
        meta: [
          { name: 'description', content: res.data.seo.categoryDescrip },
          { name: 'keywords', content: res.data.seo.categoryKeyword },
        ],
      })
    }
    console.log('aboutBanner.value -------->', aboutBanner.value)
  })
}

// 首页数据
const aboutData: any = ref(null)

function getZhaboutContent() {
  zhaboutcontentApi().then((res: any) => {
    aboutData.value = res.data
  })
}

// 可视窗口宽度 + 滚动
const windowWidth: any = ref(window.innerWidth)
const windowScrollY: any = ref(window.scrollY)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// resize事件处理函数
function handleResize() {
  updateWindowWidth()
  // 窗口大小变化时重新计算元素位置
  setTimeout(() => {
    calculateElementPositions()
  }, 100)
}

const domShow02: any = ref(false)
const domShow04: any = ref(false)
const domShow05: any = ref(false)

// 元素引用
const section02Ref: any = ref(null)
const section04Ref: any = ref(null)
const section05Ref: any = ref(null)

// 元素距离顶部的距离
const section02Top: any = ref(0)
const section04Top: any = ref(0)
const section05Top: any = ref(0)

// 计算元素距离顶部的距离
function calculateElementPositions() {
  const windowHeight = window.innerHeight

  if (section02Ref.value) {
    const rect = section02Ref.value.getBoundingClientRect()
    section02Top.value = rect.top + window.scrollY
  }

  if (section04Ref.value) {
    const rect = section04Ref.value.getBoundingClientRect()
    section04Top.value = rect.top + window.scrollY
  }

  if (section05Ref.value) {
    const rect = section05Ref.value.getBoundingClientRect()
    section05Top.value = rect.top + window.scrollY
  }
}

function handleScroll() {
  windowScrollY.value = window.scrollY
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  // 当滚动位置 + 视口高度的80%超过元素顶部时显示
  const triggerOffset = windowHeight * 0.8

  if (section02Top.value > 0 && scrollY + triggerOffset >= section02Top.value) {
    domShow02.value = true
  }

  if (section04Top.value > 0 && scrollY + triggerOffset >= section04Top.value) {
    domShow04.value = true
  }

  if (section05Top.value > 0 && scrollY + triggerOffset >= section05Top.value) {
    domShow05.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  getzhabouSeo()
  getZhaboutContent()

  // 等待DOM渲染完成后计算元素位置
  setTimeout(() => {
    calculateElementPositions()
    // 初始检查一次，防止元素已经在视口内
    handleScroll()
  }, 300)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div v-if="aboutData" class="aboutPage">
    <!-- BANNER -->
    <div class="abbannerBox">
      <img v-if="windowWidth <= 768" :src="aboutBanner.contentImgSmall" alt="" />
      <img v-else :src="aboutBanner.contentImg" alt="" />
      <div class="abbannerAbsolute">
        <div class="abbannerContent">
          <div class="abbannerTitle">{{ aboutBanner.contentShortTitle }}</div>
          <div class="abbannerSubtitle">
            {{ aboutBanner.contentDescription }}
          </div>
        </div>
      </div>
    </div>
    <main class="aboutContent">
      <!-- 公司简介 -->
      <section class="py-16 md:py-24  animate__animated animate__backInUp">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">{{ aboutData.aboutJianjie.contentTitle }}
          </h2>
          <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <!-- <p class="text-gray-600 text-lg max-w-3xl mx-auto">
            致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化
          </p> -->
        </div>
        <div class="companyInfo">
          <img :src="aboutData.aboutJianjie.contentImg">
          <p class="companyInfoText">
            {{ aboutData.aboutJianjie.contentDescription }}
          </p>
        </div>
      </section>

      <!-- 公司使命 -->
      <section class="py-16 md:py-24 bg-white animate__animated animate__backInUp">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">
                {{ aboutData.aboutShiming.categoryTitle }}
              </h2>
              <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                {{ aboutData.aboutShiming.categoryShortTitle }}
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              <div v-for="(item, index) in aboutData.aboutShiming.contentList" :key="index"
                class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon :icon="item.contentIcon" class="text-primary text-2xl" />
                </div>
                <h3 class="text-xl font-semibold text-dark mb-3">{{ item.contentTitle }}</h3>
                <p class="text-gray-600">
                  {{ item.contentShortTitle }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心技术体系 -->
      <section ref="section02Ref"
        :class="['py-16 md:py-24 bg-gray-50', domShow02 ? 'animate__animated animate__backInUp' : '']">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">
              {{ aboutData.aboutJishu.categoryTitle }}</h2>
            <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
              {{ aboutData.aboutJishu.categoryShortTitle }}
            </p>
          </div>

          <div class="max-w-5xl mx-auto">
            <!-- 技术体系可视化 -->
            <div class="relative mb-16">
              <div
                class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2">
              </div>

              <div v-for="(item, index) in aboutData.aboutJishu.contentList" :key="index">
                <div v-if="index % 2 === 0" class="relative z-10 mb-12 md:mb-24">
                  <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <h3 class="text-2xl font-bold text-primary mb-3">{{ item.contentTitle }}</h3>
                      <p class="text-gray-600">
                        {{ item.contentShortTitle }}
                      </p>
                    </div>
                    <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg">
                      <Icon :icon="item.contentIcon" class="text-white text-3xl" />
                    </div>
                    <div class="md:w-1/2 md:pl-12 hidden md:block">
                      <div class="bg-white p-4 rounded-lg shadow-md">
                        <ul class="text-gray-600 space-y-2">
                          <li v-for="(item2, idx) in item.contentTags.split(',')" :key="idx">
                            <i class="fa fa-check text-secondary mr-2"></i>{{ item2 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="md:hidden mt-4 bg-white p-4 rounded-lg shadow-md">
                    <ul class="text-gray-600 space-y-2">
                      <li v-for="(item2, idx) in item.contentTags.split(',')" :key="idx">
                        <i class="fa fa-check text-secondary mr-2"></i>{{ item2 }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-if="index % 2 === 1" class="relative z-10 mb-12 md:mb-24">
                  <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2 md:pr-12 hidden md:block">
                      <div class="bg-white p-4 rounded-lg shadow-md">
                        <ul class="text-gray-600 space-y-2">
                          <li v-for="(item2, idx) in item.contentTags.split(',')" :key="idx">
                            <i class="fa fa-check text-secondary mr-2"></i>{{ item2 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="w-20 h-20 rounded-full bg-secondary flex items-center justify-center z-10 shadow-lg">
                      <Icon :icon="item.contentIcon" class="text-white text-3xl" />
                    </div>
                    <div class="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                      <h3 class="text-2xl font-bold text-secondary mb-3 text-left md:text-left">
                        {{ item.contentTitle }}
                      </h3>
                      <p class="text-gray-600">
                        {{ item.contentShortTitle }}
                      </p>
                    </div>
                  </div>
                  <div class="md:hidden mt-4 bg-white p-4 rounded-lg shadow-md">
                    <ul class="text-gray-600 space-y-2">
                      <li v-for="(item2, idx) in item.contentTags.split(',')" :key="idx">
                        <i class="fa fa-check text-secondary mr-2"></i>{{ item2 }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心价值 -->
      <section ref="section04Ref"
        :class="['py-16 md:py-24 bg-gradient-primary text-white', domShow04 ? 'animate__animated animate__backInUp' : '']">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6">{{ aboutData.aboutJiazhi.categoryTitle }}</h2>
            <p class="text-white/80 text-lg mb-12 max-w-3xl mx-auto">
              {{ aboutData.aboutJiazhi.categoryShortTitle }}
            </p>

            <div class="grid md:grid-cols-3 gap-8">
              <div v-for="(item, index) in aboutData.aboutJiazhi.contentList" :key="index"
                class="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-colors duration-300">
                <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 mx-auto">
                  <Icon :icon="item.contentIcon" class="text-white text-2xl" />
                </div>
                <h3 class="text-xl font-semibold mb-3">{{ item.contentTitle }}</h3>
                <p class="text-white/70">
                  {{ item.contentShortTitle }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 行业痛点解决方案 -->
      <section ref="section05Ref"
        :class="['py-16 md:py-24 bg-white', domShow05 ? 'animate__animated animate__backInUp' : '']">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">
              {{ aboutData.aboutHangye.categoryTitle }}
            </h2>
            <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
              {{ aboutData.aboutHangye.categoryShortTitle }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <!-- 痛点1 -->
            <div v-for="(item, index) in aboutData.aboutHangye.contentList" :key="index"
              class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Icon :icon="item.contentIcon" class="text-primary text-xl" />
              </div>
              <h3 class="text-xl font-semibold text-dark mb-3">{{ item.contentTitle }}</h3>
              <p class="text-gray-600 mb-4">{{ item.contentShortTitle }}</p>
              <div class="text-primary font-medium">
                <i class="fa fa-arrow-right mr-1"></i> {{ item.contentTags }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.aboutPage {
  position: relative;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;

  .abbannerBox {
    position: relative;
    padding-top: 100px;
    width: 100%;
    height: 500px;

    img {
      width: 100%;
      height: 400px;
    }

    .abbannerAbsolute {
      position: absolute;
      top: 100px;
      left: 0;
      z-index: 2;
      width: 100%;

      .abbannerContent {
        margin: 0 auto;
        padding: 0 2rem;
        width: 100%;
        max-width: 1400px;
        height: 400px;
        display: flex;
        flex-flow: column;
        justify-content: center;

        .abbannerTitle {
          margin-bottom: 1rem;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.5;
          color: rgb(255 255 255);
        }

        .abbannerSubtitle {
          max-width: 1000px;
          font-size: clamp(1rem, 4vw, 1.25rem);
          font-weight: 500;
          line-height: 1.5;
          color: rgb(255 255 255 / 0.9);
        }
      }
    }
  }

  .aboutContent {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1400px;

    .companyInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 40%;
        height: 312px;
        border-radius: 0.5rem;
      }

      .companyInfoText {
        padding: 1rem 2rem;
        width: calc(60% - 1rem);
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: #374151;
        background-color: #ffffff;
        border-radius: 0.5rem;
      }

      @media (max-width: 768px) {
        flex-direction: column;

        img {
          margin: 0 1rem 1rem;
          width: calc(100% - 2rem);
          height: auto;
        }

        .companyInfoText {
          margin: 0 1rem;
          padding: 1rem;
          width: calc(100% - 2rem);
        }
      }
    }
  }
}
</style>

<style type="text/tailwindcss">
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }

  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .bg-gradient-primary {
    background: linear-gradient(135deg, #165dff 0%, #0e42d2 100%);
  }

  .bg-blur {
    backdrop-filter: blur(8px);
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>

<style>
.bg-primary\/10 {
  background-color: rgb(22 93 255 / 0.1);
}

.bg-primary\/20 {
  background-color: rgb(22 93 255 / 0.2);
}

.bg-secondary {
  --tw-bg-opacity: 1;
  background-color: rgb(54 207 201 / var(--tw-bg-opacity, 1));
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(22 93 255 / var(--tw-bg-opacity, 1));
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(22 93 255 / var(--tw-text-opacity, 1));
}
</style>
