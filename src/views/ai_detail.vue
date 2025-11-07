<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import pageJump from '@/hooks/pageJump'
import { fileURL } from '@/api/baseConfig'
import { aidetailsApi } from '@/api/modules/ai'
import { sysinfosApi } from '@/api/modules/basic'

// 路由信息
const route = useRoute()

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function uaipdateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 案例详情
const aixqid: any = ref('')
const aixqdetail: any = ref({})

function getAialdetail() {
  aidetailsApi({
    app_id: aixqid.value
  }).then((res: any) => {
    aixqdetail.value = res
    if (aixqdetail.value.tags) {
      aixqdetail.value.tags = aixqdetail.value.tags.split(',')
    } else {
      aixqdetail.value.tags = []
    }
  })
}

// 用户端-获取所有有效系统信息（如系统名称、版权信息等，按Key排序）
const sysInfos: any = ref({})

function getSysinfosApi() {
  sysinfosApi().then((res: any) => {
    if (res && res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        sysInfos.value[item.ky] = item.val
      }
    }
  })
}

// 联系我们 滚动到底部
function scrollBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

onMounted(() => {
  window.addEventListener('resize', uaipdateWindowWidth)
  aixqid.value = route.query.aixqid
  getAialdetail()
  getSysinfosApi()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', uaipdateWindowWidth)
})
</script>

<template>
  <div class="aidPage">
    <div class="aidHbox">
      <div class="aidHcontent">
        <div class="aidNavigation">
          <span @click="pageJump('home')">首页</span>
          <span class="aidNavigationXg">/</span>
          <span @click="pageJump('ai')">AI赋能应用</span>
          <span class="aidNavigationXg">/</span>
          <span class="aidNavigationSp">{{ aixqdetail.name }}</span>
        </div>
      </div>
    </div>
    <div class="aidCbox">
      <div class="adicTopOut">
        <div class="adicTop">
          <div class="adictTitle">{{ aixqdetail.name }}</div>
          <div class="adictTags">
            <span v-for="(item, index) in aixqdetail.tags" :key="index"
              :class="['adictTag', index % 3 === 0 ? 'adictTag1' : index % 3 === 1 ? 'adictTag2' : 'adictTag3']">
              {{ item }}
            </span>
          </div>
        </div>
        <button @click="scrollBottom">联系我们</button>
      </div>
      <div class="adicCpjj">
        <div class="adicCpjjLeft">
          <div class="adicCpjjLeftTitle">产品简介</div>
          <div v-html="aixqdetail.content" class="adicCpjjLeftInfo"></div>
        </div>
        <img :src="fileURL + aixqdetail.img" alt="" class="caseClassitemfa" />
      </div>
      <div class="adicHxgn">
        <div class="adicHxgnTitle">核心功能</div>
        <div v-if="aixqdetail?.sec_contents_by_mode?.[1]" class="adicHxgnContent">
          <div v-for="(item, index) in aixqdetail.sec_contents_by_mode[1]" :key="index" class="adicHxgnItem">
            <img :src="fileURL + item.secimg" alt="" class="adicHxgnItemFa">
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">{{ item.title }}</div>
              <div class="adicHxgnItemI">{{ item.description }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="adicHxgnContent">
          <div class="adicHxgnItem">
            <div class="adicHxgnItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">智能方案生成</div>
              <div class="adicHxgnItemI">根据用户输入的设计需求和约束条件，自动生成多个优化设计方案供选择。</div>
            </div>
          </div>
          <div class="adicHxgnItem">
            <div class="adicHxgnItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">参数化建模</div>
              <div class="adicHxgnItemI">实时对照最新行业规范和标准，自动识别设计违规点并给出优化建议。</div>
            </div>
          </div>
          <div class="adicHxgnItem">
            <div class="adicHxgnItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">参数化建模</div>
              <div class="adicHxgnItemI">支持全参数化建模，修改任一参数即可自动更新整个模型，大幅提升设计灵活性。</div>
            </div>
          </div>
          <div class="adicHxgnItem">
            <div class="adicHxgnItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">性能优化分析</div>
              <div class="adicHxgnItemI">自动进行结构性能、能耗、采光等多维度分析，提供优化方向和解决方案。</div>
            </div>
          </div>
          <div class="adicHxgnItem">
            <div class="adicHxgnItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">多格式导出</div>
              <div class="adicHxgnItemI">支持导出CAD、BIM、PDF等多种格式文件，无缝对接后续设计和施工流程。</div>
            </div>
          </div>
          <div class="adicHxgnItem">
            <div class="adicHxgnItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicHxgnItemRight">
              <div class="adicHxgnItemT">自然语言交互</div>
              <div class="adicHxgnItemI">支持通过自然语言描述设计需求，AI自动理解并转化为设计参数和方案。</div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="adicSycj">
        <div class="adicSycjTitle">适用场景</div>
        <div v-if="aixqdetail?.sec_contents_by_mode?.[2]" class="adicSycjContent">
          <div v-for="(item, index) in aixqdetail.sec_contents_by_mode[2]" :key="index" class="adicSycjItem">
            <img :src="fileURL + item.secimg" alt="" class="adicSycjItemFa">
            <div class="adicSycjItemT">{{ item.title }}</div>
            <div class="adicSycjItemI">{{ item.description }}</div>
          </div>
        </div>
        <!-- <div class="adicSycjContent">
          <div class="adicSycjItem">
            <div class="adicSycjItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicSycjItemT">建筑方案设计</div>
            <div class="adicSycjItemI">住宅、商业、办公等各类建筑的概念设计和方案设计阶段。</div>
          </div>
          <div class="adicSycjItem">
            <div class="adicSycjItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicSycjItemT">市政工程设计</div>
            <div class="adicSycjItemI">道路、桥梁、管网等市政基础设施的设计和优化。</div>
          </div>
          <div class="adicSycjItem">
            <div class="adicSycjItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicSycjItemT">室内装修设计</div>
            <div class="adicSycjItemI">住宅、商业空间等室内装修方案设计和施工图生成。</div>
          </div>
          <div class="adicSycjItem">
            <div class="adicSycjItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicSycjItemT">城市规划设计</div>
            <div class="adicSycjItemI">片区规划、控制性详细规划等城市规划设计工作。</div>
          </div>
        </div> -->
      </div>
      <div class="adicJsys">
        <div class="adicJsysTitle">技术优势</div>
        <div v-if="aixqdetail?.sec_contents_by_mode?.[3]" class="adicJsysContent">
          <div v-for="(item, index) in aixqdetail.sec_contents_by_mode[3]" :key="index" class="adicJsysItem">
            <img :src="fileURL + item.secimg" alt="" class="adicJsysItemFa">
            <div class="adicJsysItemT">{{ item.title }}</div>
            <div class="adicJsysItemI">{{ item.description }}</div>
          </div>
        </div>
        <!-- <div class="adicJsysContent">
          <div class="adicJsysItem">
            <div class="adicJsysItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicJsysItemT">深度学习算法</div>
            <div class="adicJsysItemI">基于海量设计数据训练的深度学习模型，具备强大的设计理解和生成能力。</div>
          </div>
          <div class="adicJsysItem">
            <div class="adicJsysItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicJsysItemT">海量数据支撑</div>
            <div class="adicJsysItemI">整合了10万+优质设计案例和最新行业规范，确保设计方案的专业性和合规性。</div>
          </div>
          <div class="adicJsysItem">
            <div class="adicJsysItemFa">
              <i class="fa fa-weibo"></i>
            </div>
            <div class="adicJsysItemT">无缝集成能力</div>
            <div class="adicJsysItemI">可与主流设计软件无缝集成，不改变现有工作流程，降低学习和使用成本。</div>
          </div>
        </div> -->
      </div>
      <div class="adicLxwm">
        <div class="adicLxwmTitle">联系我们</div>
        <div class="adicLxwmInfo">如需了解更多AI辅助设计工具的详细信息，或预约产品演示，欢迎通过以下方式联系我们，专业顾问将为您提供一对一服务。</div>
        <div class="adicLxwmContent">
          <div class="adicLxwmItem">
            <div class="adicLxwmItemFa">
              <i class="fa fa-phone"></i>
            </div>
            <div class="adicLxwmItemI1">咨询热线</div>
            <div class="adicLxwmItemI2">{{ sysInfos.sys_tel }}</div>
            <div class="adicLxwmItemI3">{{ sysInfos.sys_worktime }}</div>
          </div>
          <div class="adicLxwmItem">
            <div class="adicLxwmItemFa">
              <i class="fa fa-envelope"></i>
            </div>
            <div class="adicLxwmItemI1">咨询邮箱</div>
            <div class="adicLxwmItemI2">{{ sysInfos.sys_email }}</div>
            <div class="adicLxwmItemI3">24小时内回复邮件咨询</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aidPage {
  overflow-x: hidden;
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;

  .aidHbox {
    .aidHcontent {
      margin: 0 auto;
      padding: 6rem 2rem 1rem;
      width: 100%;
      max-width: 1400px;
      color: rgb(1 32 96);

      @media (max-width: 992px) {
        padding: 5rem 1rem 1rem;
      }

      .aidNavigation {
        margin: 0 auto;

        span {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(107 114 128);
        }

        span:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            color: #1f3e85;
          }
        }

        .aidNavigationXg {
          margin: 0 0.5rem;
        }

        .aidNavigationSp {
          color: #1f3e85;
        }
      }
    }
  }

  .aidCbox {
    position: relative;
    margin: 0 auto;
    padding: 1rem 2rem;
    width: 100%;
    max-width: 1400px;
    color: rgb(1 32 96);

    @media (max-width: 768px) {
      padding: 0 1rem 1rem;
    }

    .adicTopOut {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        padding: 1rem 0;
      }

      .adicTop {
        width: calc(100% - 160px);

        @media (max-width: 768px) {
          width: 100%;
        }

        .adictTitle {
          margin-bottom: 1rem;
          font-size: 1.875rem;
          font-weight: 700;
          color: rgb(1 32 96);
        }

        .adictTags {
          // margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;

          .adictTag {
            margin: 0 1rem 0.5rem 0;
            padding: 0.25rem 0.75rem;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.25rem;
            border-radius: 9999px;

            @media (max-width: 768px) {
              margin: 0 0.5rem 0.5rem 0;
            }
          }

          .adictTag1 {
            color: #1f3e85;
            background-color: rgb(22 93 255 / 0.1);
          }

          .adictTag2 {
            color: rgb(54 207 201);
            background-color: rgb(54 207 201 / 0.1);
          }

          .adictTag3 {
            color: rgb(114 46 209);
            background-color: rgb(114 46 209 / 0.1);
          }
        }

        .adictImgs {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          img {
            margin-bottom: 1rem;
            width: calc(50% - 1rem);
            height: 20rem;
            border-radius: 0.75rem;

            @media (max-width: 768px) {
              width: 100%;
            }
          }

          img:last-child {
            margin-bottom: 0;
          }
        }
      }

      button {
        padding: 0.75rem 2rem;
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: #fff;
        background-color: rgb(22 93 255 / 0.9);
        border-radius: 9999px;

        @media (max-width: 768px) {
          margin-top: 1rem;
        }
      }

      button:hover {
        @media (min-width: 768px) {
          cursor: pointer;
          box-shadow: 0 10px 15px -3px rgb(22 93 255 / 0.1), 0 4px 6px -4px rgb(22 93 255 / 0.1);
          animation: jumpUpwards 300ms ease-in-out forwards;
        }
      }
    }

    .adicCpjj {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .adicCpjjLeft {
        width: calc(100% - 480px);

        @media (max-width: 768px) {
          width: 100%;
        }

        .adicCpjjLeftTitle {
          color: rgb(1 32 96);
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2rem;
          margin-bottom: 1.5rem;
        }

        .adicCpjjLeftInfo {
          margin-bottom: 1rem;
          font-size: 1.125rem;
          line-height: 1.725;
          color: rgb(75 85 99);
        }
      }

      img {
        width: 460px;
        height: 280px;
        border-radius: 0.75rem;

        @media (max-width: 768px) {
          width: 100%;
          height: auto;
        }
      }
    }

    .adicHxgn {
      margin-top: 2rem;
      padding: 2rem;
      border-radius: 1rem;
      background-color: rgb(240 247 255);

      @media (max-width: 768px) {
        padding: 1rem 0;
      }

      .adicHxgnTitle {
        text-align: center;
        color: rgb(1 32 96);
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1.5rem;
      }

      .adicHxgnContent {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          width: 100%;
        }

        .adicHxgnItem {
          overflow: hidden;
          margin: 0 1rem 1rem 0;
          padding: 1.5rem;
          width: calc(33.3% - 1rem);
          display: flex;

          @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 1rem 0;
            padding: 1rem;
          }

          .adicHxgnItemFa {
            width: 40px;
            height: 40px;
            margin-right: 1rem;
            border-radius: 999px;
            background-color: rgb(22 93 255 / 0.1);
            display: flex;
            justify-content: center;
            align-items: center;

            i {
              font-size: 1.25rem;
              color: #1f3e85;
            }
          }

          .adicHxgnItemRight {
            width: calc(100% - 40px - 1rem);

            .adicHxgnItemT {
              margin-bottom: 0.75rem;
              font-size: 1.25rem;
              line-height: 1.75rem;
              font-weight: 700;
              color: rgb(1 32 96);
            }

            .adicHxgnItemI {
              font-size: 1rem;
              line-height: 1.5rem;
              color: rgb(75 85 99);
            }
          }
        }
      }
    }

    .adicSycj {
      margin-top: 2rem;
      padding: 2rem;
      border-radius: 1rem;

      @media (max-width: 768px) {
        padding: 1rem 0;
      }

      .adicSycjTitle {
        text-align: center;
        color: rgb(1 32 96);
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1.5rem;
      }

      .adicSycjContent {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          width: 100%;
        }

        .adicSycjItem {
          overflow: hidden;
          margin: 0 1rem 1rem 0;
          padding: 1.5rem;
          width: calc(25% - 1rem);
          display: flex;
          flex-flow: column;
          background-color: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 1rem 0;
            padding: 1rem;
          }

          .adicSycjItemFa {
            width: 3rem;
            height: 3rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            background-color: rgb(22 93 255 / 0.1);
            display: flex;
            justify-content: center;
            align-items: center;

            i {
              font-size: 1.25rem;
              color: #1f3e85;
            }
          }

          .adicSycjItemT {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(1 32 96);
          }

          .adicSycjItemI {
            font-size: 1rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);
          }
        }
      }
    }

    .adicJsys {
      margin-top: 2rem;
      padding: 2rem;
      border-radius: 1rem;
      background-color: #fff;

      @media (max-width: 768px) {
        padding: 1rem;
      }

      .adicJsysTitle {
        text-align: center;
        color: rgb(1 32 96);
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1.5rem;
      }

      .adicJsysContent {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          width: 100%;
        }

        .adicJsysItem {
          overflow: hidden;
          margin: 0 1rem 1rem 0;
          padding: 1.5rem;
          width: calc(33.3% - 1rem);
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          border-radius: 0.75rem;
          border: 1px solid rgb(243 244 246);

          @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 1rem 0;
            padding: 1rem;
          }

          .adicJsysItemFa {
            width: 4rem;
            height: 4rem;
            margin-bottom: 1rem;
            border-radius: 999px;
            background-color: rgb(22 93 255 / 0.1);
            display: flex;
            justify-content: center;
            align-items: center;

            i {
              font-size: 1.25rem;
              color: #1f3e85;
            }
          }

          .adicJsysItemT {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(1 32 96);
          }

          .adicJsysItemI {
            font-size: 1rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);
            text-align: center;
          }
        }
      }
    }

    .adicLxwm {
      margin-top: 2rem;
      padding: 2rem;
      border-radius: 1rem;
      color: #fff;
      background-color: #1f3e85;

      @media (max-width: 768px) {
        padding: 1rem;
      }

      .adicLxwmTitle {
        text-align: center;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1.5rem;
      }

      .adicLxwmInfo {
        line-height: 1.625;
        color: rgb(255 255 255 / 0.9);
        text-align: center;

        @media (min-width: 768px) {
          margin-bottom: 2rem;
        }
      }

      .adicLxwmContent {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .adicLxwmItem {
        width: 30%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        @media (max-width: 768px) {
          width: 100%;
          margin-top: 2rem;
        }

        .adicLxwmItemFa {
          width: 4rem;
          height: 4rem;
          margin-bottom: 1rem;
          border-radius: 999px;
          background-color: rgb(255 255 255 / 0.2);
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 1.5rem;
            color: #fff;
          }
        }

        .adicLxwmItemI1 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 700;
        }

        .adicLxwmItemI2 {
          margin-bottom: 0.5rem;
          line-height: 1.5rem;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .adicLxwmItemI3 {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(255 255 255 / 0.7);
        }
      }
    }
  }
}
</style>
