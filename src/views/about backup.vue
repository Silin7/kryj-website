<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'

// 可视窗口宽度
const windowWidth: any = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 用户端-获取所有启用的板块位置（含完整字段，按排序升序、创建时间倒序）
const bannerData: any = ref({
  page_id: 7,
  title: 'AI赋能应用banner',
  imgurl: '/uploads/default/cba299972a0d4c8394b0efe4fcee1d06.jpg',
  istourl: false,
  url: '',
  sort: 0,
  havechar: 0,
  maintitle: 'AI赋能建筑业 开启智能建造新时代',
  subtitle: '',
  description:
    '当前，以DeepSeek、通义千问等为代表的国产大模型加速发展，推动AI深度融入建筑业，在工程设计、施工建造和运营维护等环节实现创新应用，助力优化资源配置、提升生产效率，加速行业智能化转型与产业升级。',
  leftbtn: '',
  leftbtn_url: '',
  rightbtn: '',
  rightbtn_url: '',
  id: 3,
  page_name: 'AI赋能应用',
  created_at: '2025-08-22T15:56:17',
  updated_at: '2025-10-25T15:32:57',
  deleted_at: null,
})

const seccontentList1: any = ref([
  {
    touxiang: 'https://www.healthcarecapital.com.cn/upload/files/default/image/202109/1b674ac0-cfe0-4d2a-a47f-ab2b8e21d11c.jpg',
    xingming: '测试名',
    zhiwei: '董事长兼CEO',
    jianjie: ' 在中国医疗健康行业有超过20年的医疗健康项目投资和医院运营管理经验。2014年1月创立浩悦资本，在生物医药、创新医疗器械、IVD与生命科学、健康服务与智慧医疗等领域完成了上百个私募融资与并购重组项目。曾任华兴资本医疗健康行业负责人和远东宏信医疗健康部门投资管理部负责人。比利时根特大学市场分析荣誉硕士。 ',
  },
  {
    touxiang: 'https://www.healthcarecapital.com.cn/upload/files/default/image/202109/3716d07c-a5d1-4e0d-bbf4-e609131a17b6.jpg',
    xingming: '测试名',
    zhiwei: '董事长兼CEO',
    jianjie: ' 在中国医疗健康行业有超过20年的医疗健康项目投资和医院运营管理经验。2014年1月创立浩悦资本，在生物医药、创新医疗器械、IVD与生命科学、健康服务与智慧医疗等领域完成了上百个私募融资与并购重组项目。曾任华兴资本医疗健康行业负责人和远东宏信医疗健康部门投资管理部负责人。比利时根特大学市场分析荣誉硕士。 ',
  }, {
    touxiang: 'https://www.healthcarecapital.com.cn/upload/files/default/image/202404/954ab4b7-cb84-4bfd-9663-810138918d95.jpg',
    xingming: '测试名',
    zhiwei: '董事长兼CEO',
    jianjie: ' 在中国医疗健康行业有超过20年的医疗健康项目投资和医院运营管理经验。2014年1月创立浩悦资本，在生物医药、创新医疗器械、IVD与生命科学、健康服务与智慧医疗等领域完成了上百个私募融资与并购重组项目。曾任华兴资本医疗健康行业负责人和远东宏信医疗健康部门投资管理部负责人。比利时根特大学市场分析荣誉硕士。 ',
  }, {
    touxiang: 'https://www.healthcarecapital.com.cn/upload/files/default/image/202109/1b674ac0-cfe0-4d2a-a47f-ab2b8e21d11c.jpg',
    xingming: '测试名',
    zhiwei: '董事长兼CEO',
    jianjie: ' 在中国医疗健康行业有超过20年的医疗健康项目投资和医院运营管理经验。2014年1月创立浩悦资本，在生物医药、创新医疗器械、IVD与生命科学、健康服务与智慧医疗等领域完成了上百个私募融资与并购重组项目。曾任华兴资本医疗健康行业负责人和远东宏信医疗健康部门投资管理部负责人。比利时根特大学市场分析荣誉硕士。 ',
  }
])

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div>
    <div class="aboutPage">
      <!-- BANNER -->
      <div class="abbannerBox" @click="windowOpen(bannerData.url, bannerData.istourl)">
        <img :src="fileURL + bannerData.imgurl" alt="abbanner" />
        <div class="abbannerAbsolute">
          <div class="abbannerContent">
            <div class="abbannerTitle">山东科睿易晶生物技术有限公司</div>
            <div class="abbannerSubtitle">工程项目数字化服务与产品的国家高新技术企业</div>
          </div>
        </div>
      </div>
      <!-- 公司简介 -->
      <div class="introtOut">
        <div class="introtBox">
          <div class="introtTitle">公司简介</div>
          <div class="introtHeng"></div>
          <div class="introtContent">
            <div class="introtLeft">
              <div class="introtInfo">
                <p>
                  山东科睿易晶生物技术有限公司自2022年成立，致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化。核心团队由临床医学、合成化学、生物信息工程、人工智能大数据及算法等多领域专家组成。
                </p>
                <p>
                  自主研发了医学人工智能药物筛选数据库平台、AI辅助药物验证模拟系统、智能药物分子对接与体内过程模拟分析等产品。同时将AI与类器官技术深度绑定，创新性地构建了"多组学-AI-人工降噪-类器官"多位一体的智能药物研发体系，彻底解决创新药研发过程中的药物发现困难、研发周期长、实验花费高以及成功率低的问题，结合专家团队进一步确认，提供高效、精准的一站式创新药物研发解决方案。
                </p>
              </div>
              <ul>
                <li class="licolor1">国家高新技术企业</li>
                <li class="licolor2">信用认证企业</li>
                <li class="licolor3">行业科学技术奖</li>
                <li class="licolor1">20+专业书籍参编</li>
                <!-- <li class="licolor2">主流毕业院校&从业经历</li> -->
              </ul>
              <div class="frsc">
                <i class="fa fa-bullseye"></i>
                <div>
                  <div class="introtLt">企业愿景</div>
                  <div class="introtLst">
                    成为工程项目数字化服务的引领者，推动建筑行业智能化转型，构建和谐共生的数字生态。
                  </div>
                </div>
              </div>
            </div>
            <div class="introtRight">
              <div class="introtRightTitle">发展历程</div>
              <div class="introtRightItem">
                <div class="introtRightItemD"></div>
                <div class="introtRightItemY">2024年6月</div>
                <div class="introtRightItemT">公司成立，专注于工程造价咨询服务</div>
              </div>
              <div class="introtRightItem">
                <div class="introtRightItemD"></div>
                <div class="introtRightItemY">2024年8月</div>
                <div class="introtRightItemT">拓展BIM咨询服务，完成首个大型BIM项目</div>
              </div>
              <div class="introtRightItem">
                <div class="introtRightItemD"></div>
                <div class="introtRightItemY">2024年12月</div>
                <div class="introtRightItemT">参编首部BIM专业书籍，获得国家高新技术企业认证</div>
              </div>
              <div class="introtRightItem">
                <div class="introtRightItemD"></div>
                <div class="introtRightItemY">2025年1月</div>
                <div class="introtRightItemT">开展CIM咨询业务，开发智慧管理软件平台</div>
              </div>
              <div class="introtRightItem">
                <div class="introtRightItemD"></div>
                <div class="introtRightItemY">2025年7月</div>
                <div class="introtRightItemT">获得国家行业科学技术奖，被多家主流毕业院校&从业经历</div>
              </div>
              <div class="introtRightItem">
                <div class="introtRightItemD"></div>
                <div class="introtRightItemY">2025年至今</div>
                <div class="introtRightItemT">聚焦BIM、CIM技术，全面实施数字化转型</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 我们的团队 -->
      <div class="achievementBox">
        <div class="achievementTitle">我们的团队</div>
        <div class="achievementHeng"></div>
        <div class="achievementInfo">平均15年产业研究、基金投资和企业管理经验 </div>
        <div class="achievementRidbox">
          <div v-for="(item, index) in seccontentList1" :key="index" class="achievementRiditem">
            <img :src="item.touxiang" alt="" style="width: 100%; height: 20rem" />
            <div class="achievementRidimgbox">
              <div class="achievementRidimgfx">
                <div class="achievementRidimgFrsc">
                  <div v-if="index % 4 == 1" class="achievementFabox"
                    style="color: rgb(37 99 235); background-color: rgb(219 234 254)">
                    <i class="fa fa-building"></i>
                  </div>
                  <div v-if="index % 4 == 2" class="achievementFabox"
                    style="color: rgb(22 163 74); background-color: rgb(220 252 231)">
                    <i class="fa fa-book"></i>
                  </div>
                  <div v-if="index % 4 == 3" class="achievementFabox"
                    style="color: rgb(147 51 234); background-color: rgb(243 232 255)">
                    <i class="fa fa-trophy"></i>
                  </div>
                  <div v-if="index % 4 == 0" class="achievementFabox"
                    style="color: rgb(22 163 74); background-color: rgb(220 252 231)">
                    <i class="fa fa-certificate"></i>
                  </div>
                  <div class="achievementRidtitle">{{ item.xingming }}</div>
                </div>
                <div class="achievementGridinfo">
                  {{ item.jianjie }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 核心业务 -->
      <!-- <div class="businessOut">
        <div class="businessBox">
          <div class="businessTitle">核心业务</div>
          <div class="businessHeng"></div>
          <div class="businessInfo">立足应用视角，提供切实可行的数字化解决方案</div>
          <div class="serviceCardBox">
            <el-row :gutter="16">
              <el-col v-for="(item, index) in seccontentList2" :key="index" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="serviceCardItem">
                  <div class="frsc">
                    <img :src="fileURL + item.secimg" alt=""
                      style="margin-right: 1rem; width: 4rem; height: 4rem; border-radius: 0.75rem;" />
                    <div class="serviceCardItemTt">{{ item.title }}</div>
                  </div>
                  <div class="serviceCardItemSub">
                    {{ item.descriptioncontent }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div> -->
      <!-- 未来展望 -->
      <div class="futureOut">
        <div class="futureBox">
          <div class="futureTitle">未来展望</div>
          <div class="futureHeng"></div>
          <div class="futureCardBox">
            <div class="futureCardItem">
              进入"十四五"公司自2022年成立，致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化。核心团队由临床医学、合成化学、生物信息工程、人工智能大数据及算法等多领域专家组成。
            </div>
            <div class="futureCardItem">
              自主研发了医学人工智能药物筛选数据库平台、AI辅助药物验证模拟系统、智能药物分子对接与体内过程模拟分析等产品。同时将AI与类器官技术深度绑定，创新性地构建了"多组学-AI-人工降噪-类器官"多位一体的智能药物研发体系，彻底解决创新药研发过程中的药物发现困难、研发周期长、实验花费高以及成功率低的问题，结合专家团队进一步确认，提供高效、精准的一站式创新药物研发解决方案。
            </div>
          </div>
          <div class="futureRow">
            <div class="futureColBox">
              <div class="futureColNum">100+</div>
              <div class="futureColText">专业团队</div>
            </div>
            <div class="futureColBox">
              <div class="futureColNum">99+</div>
              <div class="futureColText">服务项目</div>
            </div>
            <div class="futureColBox">
              <div class="futureColNum">20+</div>
              <div class="futureColText">专业书籍</div>
            </div>
            <div class="futureColBox">
              <div class="futureColNum">3年+</div>
              <div class="futureColText">行业深耕</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 毕业院校&从业经历 -->
      <div class="mediaBox">
        <div class="mediaTitle">毕业院校&从业经历</div>
        <div class="mediaHeng"></div>
        <!-- <el-row :gutter="16" class="mediaRow">
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <img src="@/assets/renminnet.png" alt="" />
          </el-col>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <img src="@/assets/zhejiangtv.png" alt="" />
          </el-col>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <img src="@/assets/xinhua.png" alt="" />
          </el-col>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <img src="@/assets/zhejiangdaily.png" alt="" />
          </el-col>
        </el-row> -->
        <!-- <div class="mediaCard">
          <p>
            "山东科睿易晶生物技术有限公司致力于医学人工智能技术研发与应用，以提高药物研发效率及准确度为目标，加速创新药研发智能化。核心团队由临床医学、合成化学、生物信息工程、人工智能大数据及算法等多领域专家组成。"
          </p>
          <div class="frsc">
            <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="" class="mediaAvatal" />
            <div>
              <div class="mediaName">张记者</div>
              <div class="mediaTv">山东电视台经济频道</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aboutPage {
  overflow-x: hidden;
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;

  .abbannerBox {
    position: relative;
    padding-top: 100px;
    width: 100vw;
    height: 550px;

    @media (max-width: 768px) {
      padding-top: 64px;
    }

    img {
      width: 100vw;
      height: 450px;
    }

    .abbannerAbsolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100vw;

      .abbannerContent {
        margin: 0 auto;
        padding: 100px 2rem 0;
        width: 100%;
        max-width: 1400px;
        height: 550px;
        display: flex;
        flex-flow: column;
        justify-content: center;

        .abbannerTitle {
          margin-bottom: 1.5rem;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.25;
          color: rgb(255 255 255);
        }

        .abbannerSubtitle {
          margin-bottom: 2rem;
          max-width: 60rem;
          font-size: clamp(1rem, 4vw, 1.25rem);
          font-weight: 500;
          color: rgb(255 255 255 / 0.9);
        }

        .abbannerJgkbtn {
          padding: 0.75rem 2rem;
          color: #fff;
          background-color: #1f3e85;
          border-radius: 9999px;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            padding: 0.75rem 1.5rem;
          }
        }

        .abbannerJgkbtn:hover {
          @media (min-width: 768px) {
            transform: scale(1.05);
            box-shadow: 2px 2px 10px 0 #1f3e85;
          }
        }

        .abbannerJjfabtn {
          margin-left: 20px;
          padding: 0.75rem 2rem;
          color: #fff;
          background-color: rgba(255 255 255 / 0.2);
          border: 1px solid rgba(255 255 255 / 0.3);
          border-radius: 9999px;

          @media (max-width: 768px) {
            padding: 0.75rem 1.5rem;
          }
        }

        .abbannerJjfabtn:hover {
          @media (min-width: 768px) {
            transform: scale(1.05);
            box-shadow: 2px 2px 10px 0 rgba(255 255 255 / 0.2);
          }
        }
      }
    }
  }

  .introtOut {
    padding: 6.25rem 0 2rem;
    width: 100vw;
    background-color: #fff;

    .introtBox {
      position: relative;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
      max-width: 1536px;

      .introtTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .introtHeng {
        margin: 1rem auto 4rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;

        @media (max-width: 768px) {
          margin: 1rem auto 2rem;
        }
      }

      .introtContent {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .introtLeft {
          margin-right: 2rem;
          width: calc(50% - 1rem);

          @media (max-width: 768px) {
            margin-right: 0;
            width: 100%;
          }

          .introtInfo {
            margin-bottom: 2rem;
            padding: 2rem;
            border-radius: 1rem;
            background-color: rgb(243 244 246);

            @media (max-width: 768px) {
              padding: 1rem;
            }

            p {
              font-size: 1.125rem;
              line-height: 1.75rem;
              color: rgb(55 65 81);
            }

            p:first-child {
              margin-bottom: 1rem;
            }
          }

          ul {
            margin-bottom: 2rem;
            display: flex;
            flex-wrap: wrap;

            li {
              margin-right: 0.5rem;
              margin-bottom: 0.5rem;
              display: inline-flex;
              align-items: center;
              border-radius: 9999px;
              padding-left: 0.75rem;
              padding-right: 0.75rem;
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              font-weight: 500;
            }

            .licolor1 {
              color: rgb(30 64 175);
              background-color: rgb(219 234 254);
            }

            .licolor2 {
              color: rgb(22 101 52);
              background-color: rgb(220 252 231);
            }

            .licolor3 {
              color: rgb(107 33 168);
              background-color: rgb(243 232 255);
            }
          }

          i {
            margin-right: 1rem;
            font-size: 2.25rem;
            line-height: 2.5rem;
            color: #1f3e85;
          }

          .introtLt {
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.75rem;
            margin-bottom: 0.5rem;
            color: rgb(1 32 96);
          }

          .introtLst {
            line-height: 1.5rem;
            color: rgb(75 85 99);
          }
        }

        .introtRight {
          width: calc(50% - 1rem);
          padding: 2rem;
          background-color: rgb(249 250 251);
          border-radius: 1rem;

          @media (max-width: 768px) {
            margin-top: 2rem;
            padding: 1rem;
            width: 100%;
          }

          .introtRightTitle {
            font-weight: 700;
            font-size: 1.5rem;
            line-height: 2rem;
            text-align: center;
            margin-bottom: 1.5rem;
            color: rgb(1 32 96);
          }

          .introtRightItem {
            position: relative;
            padding-left: 2rem;
            padding-bottom: 2rem;
            border-left: 2px solid #1f3e85;

            .introtRightItemD {
              position: absolute;
              left: -9px;
              top: 0px;
              height: 1rem;
              width: 1rem;
              border-radius: 9999px;
              background-color: #1f3e85;
            }

            .introtRightItemY {
              font-weight: 700;
              font-size: 1.25rem;
              line-height: 1.75rem;
              margin-bottom: 0.5rem;
              color: rgb(1 32 96);
            }

            .introtRightItemT {
              line-height: 1.5rem;
              color: rgb(75 85 99);
            }
          }
        }
      }
    }
  }

  .achievementBox {
    position: relative;
    margin: 0 auto;
    padding: 4rem 1rem 5rem;
    width: 100%;
    max-width: 1536px;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }

    .achievementTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .achievementHeng {
      margin: 1rem auto 0;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: #1f3e85;
    }

    .achievementInfo {
      margin: 1rem auto 0;
      text-align: center;
      max-width: 42rem;
      color: rgb(75 85 99);
    }

    .achievementRidbox {
      overflow: hidden;
      padding-top: 2.5rem;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      align-items: center;

      .achievementRiditem {
        margin-bottom: 1rem;
        overflow: hidden;
        background-color: #fff;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          margin-right: 1rem;
          width: calc(25% - 1rem);
        }

        @media (max-width: 992px) and (min-width: 768px) {
          width: calc(50% - 0.5rem);
        }

        @media (max-width: 768px) {
          width: 100%;
        }

        .achievementRidimgfx {
          padding: 1.5rem;

          @media (max-width: 768px) {
            padding: 1rem;
          }

          .achievementRidimgFrsc {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;

            .achievementFabox {
              flex-shrink: 0;
              margin-right: 0.5rem;
              width: 2rem;
              height: 2rem;
              border-radius: 9999px;
              font-size: 1.25rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .achievementRidtitle {
              font-weight: 700;
              font-size: 1.25rem;
              line-height: 1.75rem;
              height: 1.75rem;
              color: rgb(1 32 96);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .achievementGridinfo {
            font-size: 1rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);
            // height: 3rem;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 3;
            // line-clamp: 3;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
        }
      }

      .achievementRiditem:last-child {
        @media (max-width: 768px) {
          margin-bottom: 0;
        }
      }


      .achievementRiditem:hover {
        @media (min-width: 768px) {
          cursor: pointer;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          animation: jumpUpwards 300ms ease-in-out forwards;
        }
      }

      .achievementGridshu {
        width: 1px;
        height: 5rem;
        background-image: linear-gradient(to bottom, #1627ff30);
      }
    }
  }

  .businessOut {
    padding: 4rem 0;
    width: 100vw;
    background-color: #fff;

    @media (max-width: 768px) {
      padding: 2rem 0 1rem;
    }

    .businessBox {
      position: relative;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
      max-width: 1536px;

      .businessTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: rgb(1 32 96);
      }

      .businessHeng {
        margin: 1rem auto 0;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;
      }

      .businessInfo {
        margin: 1rem auto 2.5rem;
        text-align: center;
        max-width: 42rem;
        color: rgb(75 85 99);
      }

      .serviceCardBox {
        display: flex;
        flex-wrap: wrap;

        .serviceCardItem {
          margin-bottom: 1rem;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            padding: 1rem;
          }

          .serviceCardItemIcon {
            margin-right: 1rem;
            width: 4rem;
            height: 4rem;
            font-size: 1.5rem;
            line-height: 2rem;
            color: rgb(37 99 235);
            background-color: rgb(219 234 254);
            border-radius: 0.75rem;

            @media (max-width: 768px) {
              width: 3rem;
              height: 3rem;
            }
          }

          .serviceCardItemTt {
            font-weight: 700;
            font-size: 1.5rem;
            line-height: 2rem;
            color: rgb(1 32 96);

            @media (max-width: 768px) {
              font-size: 1.25rem;
            }
          }
        }

        .serviceCardItemSub {
          margin: 1rem 0;
          line-height: 1.5rem;
          color: rgb(75 85 99);
        }

        .serviceCardItemYycj {
          font-weight: 700;
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin-bottom: 0.75rem;
          color: rgb(1 32 96);
        }

        .serviceCardItemJsbox {
          margin-bottom: 1.5rem;

          .serviceCardItemJsitem {
            margin-bottom: 0.5rem;
            line-height: 1.5rem;
            display: flex;
            align-items: center;

            i {
              color: rgb(34 197 94);
              margin-right: 0.5rem;
            }

            span {
              color: rgb(1 32 96);
            }
          }
        }

        button {
          font-weight: 500;
          color: #1f3e85;

          i {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }

  .futureOut {
    padding: 6rem 0;
    width: 100vw;
    background-image: linear-gradient(to bottom right, #165dff, #012060);

    @media (max-width: 768px) {
      padding: 2rem 0;
    }

    .futureBox {
      position: relative;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
      max-width: 1536px;

      .futureTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: #fff;
      }

      .futureHeng {
        margin: 1rem auto 2.5rem;
        margin-bottom: 2rem;
        width: 6rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: rgb(255 255 255);
      }

      .futureCardBox {
        margin: 0 auto 2.5rem;
        padding: 2rem;
        max-width: 52rem;
        border-radius: 1rem;
        background-color: rgb(255 255 255 / 0.1);

        @media (max-width: 768px) {
          padding: 1rem;
        }

        .futureCardItem {
          font-size: 1.25rem;
          line-height: 1.625;
          text-align: center;
          color: #fff;

          @media (max-width: 768px) {
            font-size: 1.125rem;
          }
        }

        :first-child {
          margin-bottom: 1.5rem;
        }
      }

      .futureRow {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .futureColBox {
          margin: 0 1rem 1rem;

          .futureColNum {
            margin-bottom: 0.5rem;
            font-weight: 700;
            font-size: 2.25rem;
            line-height: 2.5rem;
            text-align: center;
            color: #fff;
          }

          .futureColText {
            text-align: center;
            color: #fff;
          }
        }
      }

    }
  }

  .mediaBox {
    position: relative;
    margin: 0 auto;
    padding: 6rem 1rem;
    width: 100%;
    max-width: 1536px;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }

    .mediaTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: rgb(1 32 96);
    }

    .mediaHeng {
      margin: 1rem auto 2.5rem;
      width: 6rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: #1f3e85;
    }

    .mediaRow img {
      display: block;
      margin: 0 auto 2rem;
      width: 6rem;
      height: 3rem;
      opacity: 0.8;
    }

    .mediaCard {
      margin: 2rem auto 0;
      padding: 2rem;
      max-width: 48rem;
      border-radius: 1rem;
      background-color: rgb(255 255 255);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

      @media (max-width: 768px) {
        margin-top: 0;
        padding: 2rem 1rem;
      }

      p {
        margin-top: 0;
        margin-bottom: 1.5rem;
        font-style: italic;
        font-size: 1.25rem;
        line-height: 1.75rem;
        color: rgb(55 65 81);

        @media (max-width: 768px) {
          font-size: 1.125rem;
        }
      }

      .mediaAvatal {
        margin-right: 1rem;
        width: 4rem;
        height: 4rem;
        border-radius: 9999px;
      }

      .mediaName {
        font-weight: 700;
        line-height: 1.5rem;
        color: rgb(1 32 96);
      }

      .mediaTv {
        line-height: 1.5rem;
        color: rgb(75 85 99);
      }
    }
  }
}
</style>
