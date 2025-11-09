<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import backToTop from '@/hooks/backToTop'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)
const windowScrollY = ref(window.scrollY)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

function handleScroll() {
  windowScrollY.value = window.scrollY
}

// 合作单位
const vippartners: any = ref([])

function getVippartners() {
  // vippartnersApi().then((res: any) => {
  //   vippartners.value = res
  // })
  vippartners.value = [
    {
      company_name: '中粮集团',
      logoimg: '/uploads/default/decc62b362c9440e856a726e2f94cc5e.png',
      istourl: false,
      url: null,
      description: null,
      remark: '',
      sort: 0,
      id: 7,
      created_at: '2025-08-20T22:02:19',
      updated_at: '2025-08-20T22:02:19',
    },
    {
      company_name: '沃尔玛公司',
      logoimg: '/uploads/default/45400411009740f8892e40610c704aea.png',
      istourl: false,
      url: null,
      description: null,
      remark: '',
      sort: 0,
      id: 6,
      created_at: '2025-08-20T22:01:08',
      updated_at: '2025-08-20T22:01:08',
    },
    {
      company_name: '三星电子',
      logoimg: '/uploads/default/aa5b299753694f03a97478a54a0ade2e.png',
      istourl: false,
      url: null,
      description: null,
      remark: '',
      sort: 0,
      id: 5,
      created_at: '2025-08-20T22:00:12',
      updated_at: '2025-08-20T22:00:12',
    },
    {
      company_name: '大众汽车',
      logoimg: '/uploads/default/99fa26b4247042dd88f003738a3024ff.png',
      istourl: true,
      url: 'https://www.vw.com.cn/',
      description: null,
      remark: '',
      sort: 2,
      id: 4,
      created_at: '2025-08-20T16:25:48',
      updated_at: '2025-08-20T16:27:37',
    },
    {
      company_name: '苹果公司',
      logoimg: '/uploads/default/70776a7a004149338907026d34922b90.png',
      istourl: true,
      url: 'https://www.apple.com.cn',
      description: null,
      remark: '',
      sort: 2,
      id: 3,
      created_at: '2025-08-20T16:25:18',
      updated_at: '2025-08-20T16:27:55',
    },
    {
      company_name: '阿里巴巴集团',
      logoimg: '/uploads/default/8c6afe3c96d8428997f827ee80ba3f81.jpg',
      istourl: false,
      url: null,
      description:
        '阿里巴巴集团控股有限公司（Alibaba Group Holding Limited）， 成立于1999年6月28日，总部位于中国浙江杭州。',
      remark: '',
      sort: 2,
      id: 2,
      created_at: '2025-08-18T12:34:51',
      updated_at: '2025-08-20T16:24:31',
    },
  ]
}

// 产品中心
const businessAi: any = ref([])

function getAllaiapp() {
  // allaiappApi().then((res: any) => {
  //   businessAi.value = []
  // })
  businessAi.value = [
    { icon: 'fa fa-github-alt', title: 'AI 驱动药物靶点发现数据库' },
    { icon: 'fa fa-medkit', title: '小分子创新药研发' },
    { icon: 'fa fa-heartbeat', title: '老药新用筛选平台' },
    { icon: 'fa fa-subscript', title: '生物制剂研发辅助系统' },
    { icon: 'fa fa-contao', title: '药物晶型预测与筛选系统' },
    { icon: 'fa fa-h-square', title: '类器官多组学数据 AI 整合分析工具' },
  ]
}

// 友情链接
const flinktop: any = ref([])

function getFlinktop() {
  // flinktopApi().then((res: any) => {
  //   if (res && res.length > 0) {
  //     flinktop.value = res
  //   }
  // })
  flinktop.value = [
    {
      name: '建筑信息研究院',
      logo: '/uploads/default/b04eb8e30b3c48beaf82aefd80430d7c.png',
      link_url: 'http://xincai.duoqixin.com/v2/index.html',
      remark: '建筑信息研究应用',
      is_recommend: 0,
      sort: 0,
      status: 1,
      id: 29,
      is_recommend_name: '否',
      status_name: '启用',
      created_at: '2025-08-22T17:07:26',
      updated_at: '2025-08-22T17:07:26',
      deleted_at: null,
    },
    {
      name: '智慧城市科技',
      logo: '/uploads/default/ae25eb791ebf4bce98238448538b61c0.png',
      link_url: 'http://xincai.duoqixin.com/v2/index.html',
      remark: '智慧城市解决方案',
      is_recommend: 0,
      sort: 0,
      status: 1,
      id: 28,
      is_recommend_name: '否',
      status_name: '启用',
      created_at: '2025-08-22T17:06:53',
      updated_at: '2025-08-22T17:06:53',
      deleted_at: null,
    },
    {
      name: '数字工程设计院',
      logo: '/uploads/default/7c82a4d37694426a819e859bebe2e46c.jpg',
      link_url: 'http://xincai.duoqixin.com/v2/index.html',
      remark: '数字化工程设计',
      is_recommend: 0,
      sort: 0,
      status: 1,
      id: 27,
      is_recommend_name: '否',
      status_name: '启用',
      created_at: '2025-08-22T17:06:38',
      updated_at: '2025-08-22T17:06:38',
      deleted_at: null,
    },
    {
      name: '绿色建材协会',
      logo: '/uploads/default/bb3371da3896417a99906fb08877f752.jpg',
      link_url: 'https://www.baidu.com/',
      remark: '推广绿色建筑材料',
      is_recommend: 0,
      sort: 0,
      status: 1,
      id: 26,
      is_recommend_name: '否',
      status_name: '启用',
      created_at: '2025-08-22T17:06:11',
      updated_at: '2025-08-22T17:06:11',
      deleted_at: null,
    },
    {
      name: '建筑科技有限公司',
      logo: '/uploads/default/defa3f33b03d46c2b91765fdbfd09d92.jpg',
      link_url: 'http://www.abc.com/',
      remark: '专注建筑科技创新',
      is_recommend: 0,
      sort: 0,
      status: 1,
      id: 25,
      is_recommend_name: '否',
      status_name: '启用',
      created_at: '2025-08-18T15:39:38',
      updated_at: '2025-08-22T17:08:07',
      deleted_at: null,
    },
    {
      name: '智能建造研究院',
      logo: '/uploads/default/2907d6142d394b81b6bb0ae373a82137.jpg',
      link_url: 'https://www.chanjet.com/',
      remark: '建筑智能化研究',
      is_recommend: 0,
      sort: 0,
      status: 1,
      id: 24,
      is_recommend_name: '否',
      status_name: '启用',
      created_at: '2025-08-18T11:39:22',
      updated_at: '2025-08-22T17:08:16',
      deleted_at: null,
    },
  ]
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  window.addEventListener('scroll', handleScroll)
  getVippartners()
  getAllaiapp()
  getFlinktop()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div class="homePage">
      <!-- video -->
      <video v-if="windowWidth > 768" loop muted preload="auto" autoplay poster="" data-setup="{}"
        style="width: 100vw; height: auto">
        <source src="http://www.silin7.cn/media/kryj-banner.mp4" type="video/mp4" />
      </video>
      <video v-else loop muted preload="auto" autoplay poster="" data-setup="{}" style="width: 100vw; height: 100vh">
        <source src="http://www.silin7.cn/media/kryj-banner.mp4" type="video/mp4" />
      </video>
      <!-- 公司简介
       :class="['featuresBox', windowScrollY > 600 ? 'animate__animated animate__flipInX' : '']"
      -->
      <div class="featuresBox">
        <img src="@/assets/home/gongsi.jpg" class="featuresGsImg">
        <div class="featuresRounded">
          <div class="featuresRoundedTitle">山东科睿易晶生物技术有限公司</div>
          <div class="featuresRoundedInfo">
            公司自2022年成立，致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化。核心团队由临床医学、合成化学、生物信息工程、人工智能大数据及算法等多领域专家组成。
            自主研发了医学人工智能药物筛选数据库平台、AI辅助药物验证模拟系统、智能药物分子对接与体内过程模拟分析等产品。同时将AI与类器官技术深度绑定，创新性地构建了"多组学-AI-人工降噪-类器官"多位一体的智能药物研发体系，彻底解决创新药研发过程中的药物发现困难、研发周期长、实验花费高以及成功率低的问题，结合专家团队进一步确认，提供高效、精准的一站式创新药物研发解决方案。
          </div>
        </div>
      </div>

      <div class="platformsBox">
        <el-carousel :interval="4000" :type="windowWidth > 768 ? 'card' : ''" :pause-on-hover="false"
          :height="windowWidth > 768 ? '34rem' : '38rem'">
          <el-carousel-item>
            <div class="platformsItem">
              <img src="@/assets/home/platforms-1.png">
              <div>
                <p class="platformsItitle">医学人工智能药物筛选数据库平台</p>
                <p class="platformsIinfo">
                  医学人工智能药物筛选数据库平台是面向全球药企、科研机构的核心研发基础设施，以“打破数据孤岛、AI赋能精准筛选”为核心，整合多维度生物医学数据与前沿算法模型，为创新药研发提供从靶点验证到候选药物筛选的全链条数据支撑与智能分析服务，彻底解决传统筛选“数据零散、效率低下、命中率低”的行业痛点。
                </p>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="platformsItem">
              <img src="@/assets/home/platforms-2.png">
              <div>
                <p class="platformsItitle">AI辅助药物验证模拟系统</p>
                <p class="platformsIinfo">
                  AI 辅助药物验证模拟系统是衔接药物筛选与实体实验的关键技术平台，聚焦创新药临床前验证环节，融合多物理场模拟、机器学习与多组学数据，构建 “虚拟验证 - 风险预判 -
                  实验指导”的全流程辅助体系。通过替代部分高成本、高耗时的实体实验，解决传统验证 “周期长、成本高、风险难预判” 的痛点，为药企、科研机构提供高效、精准的临床前验证解决方案，助力候选药物快速推进至实验阶段。
                </p>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="platformsItem">
              <img src="@/assets/home/platforms-3.png">
              <div>
                <p class="platformsItitle">智能药物分子对接与体内过程模拟分析</p>
                <p class="platformsIinfo">
                  在创新药研发的关键环节中，药物分子能否精准结合靶点蛋白、进入人体后能否有效发挥作用且规避毒性，是决定研发成败的核心。我司自主研发的智能药物分子对接与体内过程模拟分析系统，依托多领域技术融合优势，构建从
                  “分子互作” 到 “体内代谢” 的全链条模拟体系，为药物研发提供 “提前预判、精准优化” 的核心支撑，大幅降低实验试错成本，加速候选药物筛选进程。</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 委托开发 AI平台 -->
      <div class="wtkfaiBox">
        <div class="wtkfaiItem animate__animated">
          <div class="wtkfaiTitle">委托开发</div>
          <img src="@/assets/home/wtkf.png" alt="" />
        </div>
        <div class="wtkfaiItem animate__animated">
          <img src="@/assets/home/aipt.png" alt="" />
          <div class="wtkfaiTitle">AI平台</div>
        </div>
      </div>

      <!-- 产品中心 -->
      <div class="cpzxBox">
        <div class="cpzxContent">
          <div class="cpzxTitle">产品中心</div>
          <div class="cpzxHeng"></div>
          <div class="cpzxClassbox">
            <div class="cpzxClassitem" v-for="(item, index) in businessAi" :key="index">
              <div class="cpzxClassitemfa frcc">
                <i :class="item.icon"></i>
              </div>
              <div class="cpzxClassitemtext">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 合作单位  -->
      <div class="mxBox">
        <div class="mxContent">
          <div class="mxTitle">合作单位</div>
          <div class="mxHeng"></div>
          <div class="mxInfo">感谢以下单位对本平台的大力支持与合作</div>
          <div class="mxClassbox">
            <div v-for="(item, index) in vippartners" :key="index" class="mxClassitem" @click="windowOpen(item.url)">
              <img :src="fileURL + item.logoimg" alt="" class="mxClassitemfa" />
              <div class="mxClassitemtext">{{ item.company_name }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 友情链接  -->
      <div class="pyBox">
        <div class="pyTitle">友情链接</div>
        <div class="pyHeng"></div>
        <div class="pyClassbox">
          <div v-for="(item, index) in flinktop" :key="index" class="pyClassitem"
            @click="windowOpen(item.link_url, true)">
            <img :src="fileURL + item.logo" alt="" class="pyClassitemfa" />
            <div class="pyClassitemtext">{{ item.name }}</div>
            <div class="pyClassiteminfo">{{ item.remark }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homePage {
  background-color: #f9fafb;
  overflow-x: hidden;

  video {
    margin: 0;
    padding: 0;
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
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      margin-top: 2rem;
      padding: 0 1rem;
    }

    .wtkfaiItem {
      cursor: pointer;
      width: calc(50% - 2rem);
      background-color: #ebf0fb;
      border-radius: 10px;
      display: flex;
      flex-flow: column;
      align-items: center;

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

      img {
        width: 60%;
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
    background-image: url('../assets/about00.jpg');

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