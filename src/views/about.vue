<script setup lang="ts">
// import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import '@/assets/tailwindcss.js'

// 可视窗口宽度 + 滚动
const windowWidth: any = ref(window.innerWidth)
const windowScrollY: any = ref(window.scrollY)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

const domShow01: any = ref(false)
const domShow02: any = ref(false)
const domShow03: any = ref(false)
const domShow04: any = ref(false)
const domShow05: any = ref(false)
function handleScroll() {
  windowScrollY.value = window.scrollY
  if (window.scrollY >= 0) {
    domShow01.value = true
  }
  if (window.scrollY > 400) {
    domShow02.value = true
  }
  if (window.scrollY > 800) {
    domShow03.value = true
  }
  if (window.scrollY > 1200) {
    domShow04.value = true
  }
  if (window.scrollY > 1600) {
    domShow05.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div class="aboutPage">
    <!-- BANNER -->
    <div class="abbannerBox">
      <img v-if="windowWidth <= 768" src="@/assets/about/about-banner-m.jpg" alt="" />
      <img v-else src="@/assets/about/about-banner.jpg" alt="" />
      <div class="abbannerAbsolute">
        <div class="abbannerContent">
          <div class="abbannerTitle">医学AI赋能 创新药研发</div>
          <div class="abbannerSubtitle">
            以AI技术为核心，构建"AI-人工降噪-类器官"多位一体智能研发体系，
            解决创新药发现难、时间长、花费高及成功率低的行业痛点
          </div>
        </div>
      </div>
    </div>
    <main class="aboutContent">
      <!-- 公司简介 -->
      <section class="py-16 md:py-24  animate__animated animate__backInUp">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">公司简介</h2>
          <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <!-- <p class="text-gray-600 text-lg max-w-3xl mx-auto">
            致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化
          </p> -->
        </div>
        <div class="companyInfo">
          <img src="@/assets/about/company-img.png">
          <p class="companyInfoText">
            公司致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化。
            自研AI算法及超算模型，不做单纯数据库整合，而是将药物机制，疾病机制，药物代谢，副产物代谢，有效作用，有效副作用，分子对接，靶点预测，化合物性质优化，多肽及蛋白质设计等信息充分喂养并训练，使AI具备完备的药物及疾病相关理解，快速筛选并设计优化化合物。
            人工专家团队则进一步降低假阳性率，提高预测精准度，同时确保成药性及市场情况。
            最后，将AI与类器官技术深度绑定，创新性地构建了"AI-人工降噪-类器官"多位一体的智能药物研发体系，确保筛选结果在人体应用的有效性，彻底排除物种隔离引起的偏倚，解决III期临床通过率低的致命问题。
            以药物有效结果为导向，以市场需求为前提，反推作用机制，有效解决创新药发现难、时间长、花费高及成功率低的问题，提供高效、精准、一站式新药物研发解决方案。
          </p>
        </div>
      </section>

      <!-- 公司使命 -->
      <section class="py-16 md:py-24 bg-white animate__animated animate__backInUp">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">我们的使命</h2>
              <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              <div
                class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i class="fa fa-rocket text-primary text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-dark mb-3">高效研发</h3>
                <p class="text-gray-600">
                  借助自研AI算法及超算模型，大幅缩短药物研发周期，降低研发成本
                </p>
              </div>

              <div
                class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i class="fa fa-bullseye text-primary text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-dark mb-3">精准预测</h3>
                <p class="text-gray-600">
                  融合多维度医学数据训练，结合人工专家降噪，显著提高药物研发成功率
                </p>
              </div>

              <div
                class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i class="fa fa-users text-primary text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-dark mb-3">临床价值</h3>
                <p class="text-gray-600">
                  解决III期临床通过率低的致命问题，为患者提供更安全有效的创新药物
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心技术体系 -->
      <section :class="['py-16 md:py-24 bg-gray-50', domShow02 ? 'animate__animated animate__backInUp' : '']">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">核心技术体系</h2>
            <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
              创新性地构建了"AI-人工降噪-类器官"多位一体的智能药物研发体系，
              确保筛选结果在人体应用的有效性，彻底排除物种隔离引起的偏倚
            </p>
          </div>

          <div class="max-w-5xl mx-auto">
            <!-- 技术体系可视化 -->
            <div class="relative mb-16">
              <div
                class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2">
              </div>

              <!-- AI层 -->
              <div class="relative z-10 mb-12 md:mb-24">
                <div class="flex flex-col md:flex-row items-center">
                  <div class="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 class="text-2xl font-bold text-primary mb-3">AI智能筛选</h3>
                    <p class="text-gray-600">
                      自研AI算法及超算模型，融合药物机制、疾病机制、分子对接、靶点预测等多维度信息，
                      快速筛选并设计优化化合物，具备完备的药物及疾病相关理解
                    </p>
                  </div>
                  <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg">
                    <i class="fa fa-chain-broken text-white text-3xl"></i>
                  </div>
                  <div class="md:w-1/2 md:pl-12 hidden md:block">
                    <div class="bg-white p-4 rounded-lg shadow-md">
                      <ul class="text-gray-600 space-y-2">
                        <li><i class="fa fa-check text-secondary mr-2"></i>药物代谢分析</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>副产物代谢预测</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>化合物性质优化</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>多肽及蛋白质设计</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="md:hidden mt-4 bg-white p-4 rounded-lg shadow-md">
                  <ul class="text-gray-600 space-y-2">
                    <li><i class="fa fa-check text-secondary mr-2"></i>药物代谢分析</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>副产物代谢预测</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>化合物性质优化</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>多肽及蛋白质设计</li>
                  </ul>
                </div>
              </div>

              <!-- 人工降噪层 -->
              <div class="relative z-10 mb-12 md:mb-24">
                <div class="flex flex-col md:flex-row items-center">
                  <div class="md:w-1/2 md:pr-12 hidden md:block">
                    <div class="bg-white p-4 rounded-lg shadow-md">
                      <ul class="text-gray-600 space-y-2">
                        <li><i class="fa fa-check text-secondary mr-2"></i>降低假阳性率</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>提高预测精准度</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>评估成药性</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>市场前景分析</li>
                      </ul>
                    </div>
                  </div>
                  <div class="w-20 h-20 rounded-full bg-secondary flex items-center justify-center z-10 shadow-lg">
                    <i class="fa fa-users text-white text-3xl"></i>
                  </div>
                  <div class="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                    <h3 class="text-2xl font-bold text-secondary mb-3 text-left md:text-left">
                      人工专家降噪
                    </h3>
                    <p class="text-gray-600">
                      专业人工专家团队对AI筛选结果进行深度分析与验证，进一步降低假阳性率，
                      提高预测精准度，同时确保成药性及市场应用前景
                    </p>
                  </div>
                </div>
                <div class="md:hidden mt-4 bg-white p-4 rounded-lg shadow-md">
                  <ul class="text-gray-600 space-y-2">
                    <li><i class="fa fa-check text-secondary mr-2"></i>降低假阳性率</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>提高预测精准度</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>评估成药性</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>市场前景分析</li>
                  </ul>
                </div>
              </div>

              <!-- 类器官层 -->
              <div class="relative z-10">
                <div class="flex flex-col md:flex-row items-center">
                  <div class="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 class="text-2xl font-bold text-primary mb-3">类器官验证</h3>
                    <p class="text-gray-600">
                      将AI与类器官技术深度绑定，在人体类器官模型中验证药物效果，
                      彻底排除物种隔离引起的偏倚，解决III期临床通过率低的致命问题
                    </p>
                  </div>
                  <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg">
                    <i class="fa fa-flask text-white text-3xl"></i>
                  </div>
                  <div class="md:w-1/2 md:pl-12 hidden md:block">
                    <div class="bg-white p-4 rounded-lg shadow-md">
                      <ul class="text-gray-600 space-y-2">
                        <li><i class="fa fa-check text-secondary mr-2"></i>人体相关性验证</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>排除物种差异</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>提高临床转化率</li>
                        <li><i class="fa fa-check text-secondary mr-2"></i>确保应用有效性</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="md:hidden mt-4 bg-white p-4 rounded-lg shadow-md">
                  <ul class="text-gray-600 space-y-2">
                    <li><i class="fa fa-check text-secondary mr-2"></i>人体相关性验证</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>排除物种差异</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>提高临床转化率</li>
                    <li><i class="fa fa-check text-secondary mr-2"></i>确保应用有效性</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心价值 -->
      <section
        :class="['py-16 md:py-24 bg-gradient-primary text-white', domShow04 ? 'animate__animated animate__backInUp' : '']">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6">核心价值主张</h2>
            <p class="text-white/80 text-lg mb-12 max-w-3xl mx-auto">
              我们提供高效、精准、一站式新药物研发解决方案， 重新定义创新药研发的效率与成功率
            </p>

            <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-colors duration-300">
                <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 mx-auto">
                  <i class="fa fa-bolt text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">高效快捷</h3>
                <p class="text-white/70">
                  AI驱动的智能研发流程，将药物研发周期缩短50%以上，大幅提升研发效率
                </p>
              </div>

              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-colors duration-300">
                <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 mx-auto">
                  <i class="fa fa-crosshairs text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">精准可靠</h3>
                <p class="text-white/70">
                  多位一体的验证体系，显著提高药物研发成功率，降低临床风险
                </p>
              </div>

              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-colors duration-300">
                <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 mx-auto">
                  <i class="fa fa-cubes text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">一站式服务</h3>
                <p class="text-white/70">
                  从靶点发现、化合物筛选到临床前验证，提供全流程药物研发解决方案
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 行业痛点解决方案 -->
      <section :class="['py-16 md:py-24 bg-white', domShow05 ? 'animate__animated animate__backInUp' : '']">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-4">
              行业痛点 精准破解
            </h2>
            <div class="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
              以药物有效结果为导向，以市场需求为前提，反推作用机制， 有效解决创新药研发四大核心痛点
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <!-- 痛点1 -->
            <div
              class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <i class="fa fa-search text-primary text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-dark mb-3">发现难</h3>
              <p class="text-gray-600 mb-4">传统药物研发靶点发现困难，候选化合物筛选效率低</p>
              <div class="text-primary font-medium">
                <i class="fa fa-arrow-right mr-1"></i> AI智能预测+多维度验证
              </div>
            </div>

            <!-- 痛点2 -->
            <div
              class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <i class="fa fa-clock-o text-primary text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-dark mb-3">时间长</h3>
              <p class="text-gray-600 mb-4">传统研发周期长达10-15年，上市时间成本极高</p>
              <div class="text-primary font-medium">
                <i class="fa fa-arrow-right mr-1"></i> 流程优化+智能加速
              </div>
            </div>

            <!-- 痛点3 -->
            <div
              class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <i class="fa fa-money text-primary text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-dark mb-3">花费高</h3>
              <p class="text-gray-600 mb-4">平均研发成本超10亿美元，资金投入风险巨大</p>
              <div class="text-primary font-medium">
                <i class="fa fa-arrow-right mr-1"></i> 精准筛选+成本控制
              </div>
            </div>

            <!-- 痛点4 -->
            <div
              class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <i class="fa fa-exclamation-triangle text-primary text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-dark mb-3">成功率低</h3>
              <p class="text-gray-600 mb-4">III期临床通过率不足10%，物种差异导致预测偏差</p>
              <div class="text-primary font-medium">
                <i class="fa fa-arrow-right mr-1"></i> 类器官验证+人工降噪
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
</style>

<style lang="scss" scoped>
.aboutPage {
  position: relative;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;

  .abbannerBox {
    position: relative;
    padding-top: 100px;
    width: 100vw;
    height: 500px;

    img {
      width: 100vw;
      height: 400px;
    }

    .abbannerAbsolute {
      position: absolute;
      top: 100px;
      left: 0;
      z-index: 2;
      width: 100vw;

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
