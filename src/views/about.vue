<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'
import { bannerlistApi, secpositionsApi, syspseoApi, seccontentlistApi } from '@/api/modules/basic'

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 用户端-获取所有启用的板块位置（含完整字段，按排序升序、创建时间倒序）
const positionid: any = ref('')
const bannerData: any = ref([])

function getSecpositions() {
  secpositionsApi().then((res: any) => {
    if (res && res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        if (item.url === window.localStorage.getItem('selectedName')) {
          positionid.value = item.id
          getBannerlist()
        }
        // 代表成果
        if (item.url === 'aboutresult') {
          getSeccontentlist1(item.id)
        }
        // 核心业务
        if (item.url === 'corebusiness') {
          getSeccontentlist2(item.id)
        }
      }
    }
  })
}

function getBannerlist() {
  // 用户端-按板块位置ID获取所有启用的Banner（含位置名称）
  bannerlistApi(positionid.value).then((res: any) => {
    bannerData.value = res[0]
  })
  // 用户端-根据页面ID（page_id）获取启用的SEO配置详情（含页面名称）
  syspseoApi(positionid.value).then((res: any) => {
    if (res) {
      useHead({
        title: res.page_name,
        meta: [
          { name: 'description', content: res.description },
          { name: 'keywords', content: res.keywords },
        ]
      })
    }
  })
}

// 代表成果
const seccontentList1: any = ref([])

function getSeccontentlist1(id: any) {
  seccontentlistApi(id).then((res: any) => {
    seccontentList1.value = res
  })
}

// 核心业务
const seccontentList2: any = ref([])

function getSeccontentlist2(id: any) {
  seccontentlistApi(id).then((res: any) => {
    seccontentList2.value = res
  })
}


onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div>
    <div class="aboutPage">
      <!-- BANNER -->
      <div class="bannerBox" @click="windowOpen(bannerData.url, bannerData.istourl)">
        <img :src="fileURL + bannerData.imgurl" alt="" />
        <div class="bannerAbsolute">
          <div class="bannerContent">
            <div class="bannerTitle">{{ bannerData.maintitle }}</div>
            <div v-if="bannerData.subtitle" class="bannerSubtitle">
              {{ bannerData.subtitle }}
            </div>
            <div class="frsc">
              <button v-if="bannerData.leftbtn && !bannerData.leftbtn_url" class="bannerLeftBtn">
                {{ bannerData.leftbtn }}
              </button>
              <button v-if="bannerData.leftbtn && bannerData.leftbtn_url" class="bannerLeftBtn"
                @click.stop="pageJump(bannerData.leftbtn_url)">
                {{ bannerData.leftbtn }}
              </button>
              <button v-if="bannerData.rightbtn && !bannerData.rightbtn_url" class="bannerRightBtn">
                {{ bannerData.rightbtn }}
              </button>
              <button v-if="bannerData.rightbtn && bannerData.rightbtn_url" class="bannerRightBtn"
                @click.stop="pageJump(bannerData.rightbtn_url)">
                {{ bannerData.rightbtn }}
              </button>
            </div>
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
                  杭州三才工程信息科技有限公司成立于2014年5月，总部位于浙江省杭州市，专注于提供工程项目数字化服务与产品的国家高新技术企业。公司主营工程造价咨询、BIM咨询、CIM咨询及智慧管理软件开发，以“网络强国”和“数字中国”思想建设为指引，致力于推动AI、BIM等新一代信息技术深度融入工程咨询全过程，打造可视化、智能化、动态化的数字化服务新模式。
                </p>
                <p>
                  目前，公司正积极推进人工智能技术在工程建设领域的深度应用，开展AI智能体的研发与探索，聚焦智能算量、智能审图、智能审价等典型场景，依托数据驱动与AI模型提升工程管理效率与决策水平，助力行业实现智能化升级与高质量发展。
                </p>
              </div>
              <ul>
                <li class="licolor1">国家高新技术企业</li>
                <li class="licolor2">信用认证企业</li>
                <li class="licolor3">行业科学技术奖</li>
                <li class="licolor1">20+专业书籍参编</li>
                <li class="licolor2">主流媒体报道</li>
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
            <img src="@/assets/aboutUs.png" alt="" class="aboutUs" />
          </div>
          <div v-if="windowWidth > 768" class="introtRight">
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2014年</div>
              <div class="introtRightItemT">公司成立，专注于工程造价咨询服务</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY introtRightopacity">2016年</div>
              <div class="introtRightItemT introtRightopacity">拓展BIM咨询服务，完成首个大型BIM项目</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2018年</div>
              <div class="introtRightItemT">参编首部BIM专业书籍，获得国家高新技术企业认证</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY introtRightopacity">2020年</div>
              <div class="introtRightItemT introtRightopacity">开展CIM咨询业务，开发智慧管理软件平台</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2021年</div>
              <div class="introtRightItemT">获得国家行业科学技术奖，被多家主流媒体报道</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY introtRightopacity">2023年</div>
              <div class="introtRightItemT introtRightopacity">聚焦BIM、CIM技术，全面实施数字化转型</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2025年至今</div>
              <div class="introtRightItemT">研发AI智能体，加速AI与建筑业深度融合</div>
            </div>
          </div>
          <div v-if="windowWidth > 768" class="introtRight">
            <div class="introtRightItem2">
              <div class="introtRightItemY introtRightopacity">2014年</div>
              <div class="introtRightItemT introtRightopacity">公司成立，专注于工程造价咨询服务</div>
            </div>
            <div class="introtRightItem2">
              <div class="introtRightItemY">2016年</div>
              <div class="introtRightItemT">拓展BIM咨询服务，完成首个大型BIM项目</div>
            </div>
            <div class="introtRightItem2">
              <div class="introtRightItemY introtRightopacity">2018年</div>
              <div class="introtRightItemT introtRightopacity">参编首部BIM专业书籍，获得国家高新技术企业认证</div>
            </div>
            <div class="introtRightItem2">
              <div class="introtRightItemY">2020年</div>
              <div class="introtRightItemT">开展CIM咨询业务，开发智慧管理软件平台</div>
            </div>
            <div class="introtRightItem2">
              <div class="introtRightItemY introtRightopacity">2021年</div>
              <div class="introtRightItemT introtRightopacity">获得国家行业科学技术奖，被多家主流媒体报道</div>
            </div>
            <div class="introtRightItem2">
              <div class="introtRightItemY">2023年</div>
              <div class="introtRightItemT">聚焦BIM、CIM技术，全面实施数字化转型
              </div>
            </div>
            <div class="introtRightItem2">
              <div class="introtRightItemY introtRightopacity">2025年至今</div>
              <div class="introtRightItemT introtRightopacity">研发AI智能体，加速AI与建筑业深度融合</div>
            </div>
          </div>
          <div v-else class="introtRight2">
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2014年</div>
              <div class="introtRightItemT">公司成立，专注于工程造价咨询服务</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2016年</div>
              <div class="introtRightItemT">拓展BIM咨询服务，完成首个大型BIM项目</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2018年</div>
              <div class="introtRightItemT">参编首部BIM专业书籍，获得国家高新技术企业认证</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2020年</div>
              <div class="introtRightItemT">开展CIM咨询业务，开发智慧管理软件平台</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2021年</div>
              <div class="introtRightItemT">获得国家行业科学技术奖，被多家主流媒体报道</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2023年</div>
              <div class="introtRightItemT">聚焦BIM、CIM技术，全面实施数字化转型</div>
            </div>
            <div class="introtRightItem">
              <div class="introtRightItemD"></div>
              <div class="introtRightItemY">2025年至今</div>
              <div class="introtRightItemT">研发AI智能体，加速AI与建筑业深度融合</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 代表成果 -->
      <div class="achievementBox">
        <div class="achievementTitle">代表成果</div>
        <div class="achievementHeng"></div>
        <div class="achievementInfo">在实践探索中，我们不断突破创新，取得了丰硕成果</div>
        <div class="achievementRidbox">
          <div v-for="(item, index) in seccontentList1" :key="index" class="achievementRiditem">
            <img :src="fileURL + item.secimg" alt="" style="width: 100%; height: 12rem" />
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
                  <div class="achievementRidtitle">{{ item.title }}</div>
                </div>
                <div class="achievementGridinfo">
                  {{ item.descriptioncontent }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 核心业务 -->
      <div class="businessOut">
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
                    <!-- <div class="serviceCardItemIcon frcc">
                      <i class="fa fa-video-camera"></i>
                    </div> -->
                    <div class="serviceCardItemTt">{{ item.title }}</div>
                  </div>
                  <div class="serviceCardItemSub">
                    {{ item.descriptioncontent }}
                  </div>
                  <!-- <div class="serviceCardItemYycj">应用场景：</div>
                  <div class="serviceCardItemJsbox">
                    <div class="serviceCardItemJsitem">
                      <i class="fa fa-check-circle"></i>
                      <span>工程新技术普及教育视频</span>
                    </div>
                    <div class="serviceCardItemJsitem">
                      <i class="fa fa-check-circle"></i>
                      <span>BIM软件实操教学系列</span>
                    </div>
                    <div class="serviceCardItemJsitem">
                      <i class="fa fa-check-circle"></i>
                      <span>工程数字化案例解析视频</span>
                    </div>
                    <div class="serviceCardItemJsitem">
                      <i class="fa fa-check-circle"></i>
                      <span>行业标准解读视频课程</span>
                    </div>
                  </div>
                  <button>
                    <span>查看案例</span>
                    <i class="fa fa-arrow-right"></i>
                  </button> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 未来展望 -->
      <div class="futureOut">
        <div class="futureBox">
          <div class="futureTitle">未来展望</div>
          <div class="futureHeng"></div>
          <div class="futureCardBox">
            <div class="futureCardItem">
              进入"十四五"发展新阶段，杭州三才工程信息科技有限公司将以加快数字化发展为契机，聚焦BIM、CIM技术，实施全面数字化转型。
            </div>
            <div class="futureCardItem">
              我们将继续走智能化和智慧化发展道路，为推进和谐共生的数字生态，贡献匠心智造的力量，助力建筑行业实现高质量发展。
            </div>
          </div>
          <div class="futureRow">
            <div class="futureColBox">
              <div class="futureColNum">100+</div>
              <div class="futureColText">专业团队</div>
            </div>
            <div class="futureColBox">
              <div class="futureColNum">500+</div>
              <div class="futureColText">服务项目</div>
            </div>
            <div class="futureColBox">
              <div class="futureColNum">20+</div>
              <div class="futureColText">专业书籍</div>
            </div>
            <div class="futureColBox">
              <div class="futureColNum">9年+</div>
              <div class="futureColText">行业深耕</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 媒体报道 -->
      <div class="mediaBox">
        <div class="mediaTitle">媒体报道</div>
        <div class="mediaHeng"></div>
        <el-row :gutter="16" class="mediaRow">
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
        </el-row>
        <div class="mediaCard">
          <p>
            "杭州三才工程信息科技有限公司在新型城市基础设施建设领域崭露头角，其工程数字化解决方案为传统建筑行业注入了新的活力。"
          </p>
          <div class="frsc">
            <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="" class="mediaAvatal" />
            <div>
              <div class="mediaName">张记者</div>
              <div class="mediaTv">浙江电视台经济频道</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aboutPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .introtOut {
    padding: 6rem 0;
    width: 100vw;
    background-color: #fff;

    @media (max-width: 768px) {
      padding: 2rem 0;
    }

    .introtBox {
      position: relative;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
      max-width: 1400px;

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
        background-color: rgb(22 93 255);

        @media (max-width: 768px) {
          margin: 1rem auto 2rem;
        }
      }

      .introtContent {
        margin-bottom: 2rem;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;

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
            color: rgb(22 93 255);
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

        .aboutUs {
          width: calc(50% - 1rem);

          @media (max-width: 768px) {
            margin-top: 2rem;
            width: 100%;
          }
        }
      }

      .introtRight2 {
        margin-top: 2rem;
        padding: 1rem;
        width: 100%;

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
          border-left: 2px solid rgb(22 93 255);

          .introtRightItemD {
            position: absolute;
            left: -9px;
            top: 0px;
            height: 1rem;
            width: 1rem;
            border-radius: 9999px;
            background-color: rgb(22 93 255);
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

      .introtRight {
        display: flex;

        @media (max-width: 768px) {
          margin-top: 2rem;
          padding: 1rem;
          width: 100%;
        }

        .introtRightopacity {
          opacity: 0;
        }

        .introtRightItem {
          position: relative;
          padding: 0 1rem 2rem;
          border-bottom: 2px solid rgb(22 93 255);
        }

        .introtRightItem2 {
          position: relative;
          padding: 2rem 1rem 0;
        }

        .introtRightItemD {
          position: absolute;
          left: -9px;
          bottom: -9px;
          height: 1rem;
          width: 1rem;
          border-radius: 9999px;
          background-color: rgb(22 93 255);
        }

        .introtRightItemY {
          text-align: center;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
          margin-bottom: 0.5rem;
          color: rgb(1 32 96);
        }

        .introtRightItemT {
          text-align: center;
          line-height: 1.5rem;
          color: rgb(75 85 99);
        }
      }
    }
  }

  .achievementBox {
    position: relative;
    margin: 0 auto;
    padding: 4rem 1rem 5rem;
    width: 100%;
    max-width: 1400px;

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
      background-color: rgb(22 93 255);
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
            height: 3rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
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
      max-width: 1400px;

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
        background-color: rgb(22 93 255);
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
          color: rgb(22 93 255);

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
      max-width: 1400px;

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
    max-width: 1400px;

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
      background-color: rgb(22 93 255);
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
