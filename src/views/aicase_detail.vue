<script setup lang="ts">
import dayjs from 'dayjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import pageJump from '@/hooks/pageJump'
import { fileURL } from '@/api/baseConfig'
import { aialdetailsApi } from '@/api/modules/ai'
import { sysinfosApi } from '@/api/modules/basic'

// 路由信息
const route = useRoute()

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function uaipdateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 案例详情
const aialid: any = ref('')
const aialdetail: any = ref({})

function getAialdetail() {
  aialdetailsApi(aialid.value).then((res: any) => {
    aialdetail.value = res
    if (aialdetail.value.tags) {
      aialdetail.value.tags = aialdetail.value.tags.split(',')
    } else {
      aialdetail.value.tags = []
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

// // 用户端-获取最新6条推荐案例（公开接口）
// const aialRecommended: any = ref([])

// function getAialrecommended() {
//   aialrecommendedApi().then((res: any) => {
//     if (res) {
//       aialRecommended.value = res
//     }
//   })
// }

onMounted(() => {
  window.addEventListener('resize', uaipdateWindowWidth)
  aialid.value = route.query.aialid
  getAialdetail()
  getSysinfosApi()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', uaipdateWindowWidth)
})
</script>

<template>
  <div class="aicasePage">
    <div class="aidHbox">
      <div class="aidHcontent">
        <div class="aidNavigation">
          <span @click="pageJump('home')">首页</span>
          <span class="aidNavigationXg">/</span>
          <span @click="pageJump('ai')">AI赋能应用</span>
          <span class="aidNavigationXg">/</span>
          <span class="aidNavigationSp">{{ aialdetail.title }}</span>
        </div>
      </div>
    </div>
    <div class="aidCbox">
      <div class="adicTop">
        <div class="adictTitle">{{ aialdetail.title }}</div>
        <div class="adictTags">
          <span v-for="(item, index) in aialdetail.tags" :key="index" class="adictTag adictTag1">{{ item }}</span>
          <span class="adictTag adictTag2">
            <i class="fa fa-calendar-o mr-1"></i>
            {{ dayjs(aialdetail.created_at).format('YYYY年MM月') }}
          </span>
          <!-- <span class="adictTag adictTag2"> <i class="fa fa-map-marker mr-1"></i> 杭州市 </span>
          <span class="adictTag adictTag2"> <i class="fa fa-building-o mr-1"></i> 商业综合体 </span> -->
        </div>
        <!-- <div class="adictImgs">
          <img v-for="(item, index) in aialdetail.imgs" :key="index" :src="fileURL + item" alt="" />
        </div> -->
      </div>

      <div class="aipdCbox">
        <div class="aipdcLeft">
          <div class="aipdclXq">
            <div class="aipdclxTitle">
              <i class="fa fa-info-circle"></i>
              项目背景
            </div>
            <div class="aipdclxSub" v-html="aialdetail.project_background">
            </div>
            <!-- <div class="aipdclxSub">
              杭州某商业综合体项目总建筑面积约12万平方米，包含商业购物中心、办公塔楼及配套设施。项目初期面临三大核心挑战：
            </div>
            <div class="aipdclxUl">
              <div><span></span>传统设计流程周期长，各专业协同效率低，易出现设计冲突</div>
              <div><span></span>建筑能耗模拟不准确，难以满足绿色建筑标准要求</div>
              <div><span></span>空间布局不合理，影响后期商业运营效率和用户体验</div>
            </div>
            <div class="aipdclxSub">
              为解决上述问题，项目团队引入AI辅助设计工具，通过智能算法优化设计方案，实现设计效率与建筑性能的双重提升。
            </div> -->
          </div>
          <div class="aipdclXq">
            <div class="aipdclxTitle">
              <i class="fa fa-lightbulb-o"></i>
              AI应用方案
            </div>
            <div class="aipdclxAiyy" v-html="aialdetail.application_solution"></div>
            <!-- <div class="aipdclxAiyy">
              <div class="aipdclxAyi1">
                <div class="aipdclxAyi1t">智能协同设计</div>
                <div class="aipdclxAyi1st">基于AI的多专业模型整合与冲突检测</div>
              </div>
              <div class="aipdclxAyi2">
                <div class="aipdclxAyi2t">
                  应用AI协同设计平台，实现建筑、结构、机电各专业模型的实时整合与碰撞检测。AI系统可自动识别85%以上的设计冲突，并提供优化建议，减少人工排查时间。
                </div>
                <div class="aipdclxAyi2st">
                  通过自然语言处理技术，将设计规范转化为算法规则，在设计过程中实时校验，确保方案符合国家及地方规范要求。
                </div>
              </div>
            </div>
            <div class="aipdclxAiyy">
              <div v-if="windowWidth <= 768" class="aipdclxAyi1">
                <div class="aipdclxAyi1t">能耗智能优化</div>
                <div class="aipdclxAyi1st">AI驱动的建筑能耗模拟与优化</div>
              </div>
              <div class="aipdclxAyi2">
                <div class="aipdclxAyi2t">
                  利用AI能耗模拟工具，结合杭州气候数据与建筑形态参数，构建能耗预测模型。与传统模拟方法相比，AI模型的预测精度提升40%，计算时间缩短70%。
                </div>
                <div class="aipdclxAyi2st">
                  通过遗传算法优化建筑朝向、窗墙比及围护结构参数，最终实现建筑综合能耗降低12%，达到绿色建筑二星级标准。
                </div>
              </div>
              <div v-if="windowWidth > 768" class="aipdclxAyi1">
                <div class="aipdclxAyi1t">能耗智能优化</div>
                <div class="aipdclxAyi1st">AI驱动的建筑能耗模拟与优化</div>
              </div>
            </div>
            <div class="aipdclxAiyy">
              <div class="aipdclxAyi1">
                <div class="aipdclxAyi1t">空间智能规划</div>
                <div class="aipdclxAyi1st">基于用户行为分析的空间布局优化</div>
              </div>
              <div class="aipdclxAyi2">
                <div class="aipdclxAyi2t">
                  引入AI空间规划算法，结合同类商业项目运营数据，模拟不同布局下的人流分布与商业价值。AI系统提供3套优化方案，并量化各方案的预期运营效益。
                </div>
                <div class="aipdclxAyi2st">
                  最终采用的优化方案使商业区域有效租赁面积增加8%，预计年客流量提升15%，商铺坪效提高10%。
                </div>
              </div>
            </div> -->
          </div>
          <div class="aipdclXq">
            <div class="aipdclxTitle">
              <i class="fa fa-tasks"></i>
              实施过程
            </div>
            <div class="aipdclxItem" v-html="aialdetail.content"></div>
            <!-- <div class="aipdclxItem">
              <div class="">
                <div class="aipdclxiInfo fwlcBorder">
                  <div class="aipdclxiNbox frcc">1</div>
                  <div class="aipdclxiPbox">
                    <p>数据准备与模型训练（2周）</p>
                    <p>
                      收集同类商业建筑设计数据、杭州气候数据及商业运营数据，构建训练数据集；基于项目需求定制AI算法模型，完成参数调优。
                    </p>
                  </div>
                </div>
                <div class="aipdclxiInfo fwlcBorder">
                  <div class="aipdclxiNbox frcc">2</div>
                  <div class="aipdclxiPbox">
                    <p>AI辅助方案设计（4周）</p>
                    <p>
                      各专业团队基于AI设计平台开展协同设计，系统实时检测设计冲突并提供优化建议；每周生成设计优化报告，跟踪关键指标改善情况。
                    </p>
                  </div>
                </div>
                <div class="aipdclxiInfo fwlcBorder">
                  <div class="aipdclxiNbox frcc">3</div>
                  <div class="aipdclxiPbox">
                    <p>方案验证与迭代（2周）</p>
                    <p>
                      通过BIM技术与物理模拟验证AI优化方案的可行性；组织设计、施工、运营多方评审，基于反馈进行方案迭代优化。
                    </p>
                  </div>
                </div>
                <div class="aipdclxiInfo fwlcBorder">
                  <div class="aipdclxiNbox frcc">4</div>
                  <div class="aipdclxiPbox">
                    <p>成果交付与应用（1周）</p>
                    <p>
                      输出最终优化设计方案及技术说明；对设计与施工团队进行AI工具应用培训，确保方案落地实施。
                    </p>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <!-- <div class="aipdclXq">
            <div class="aipdclxTitle">
              <i class="fa fa-chart"></i>
              实施成果
            </div>
            <div class="aipdclxItem">
              <div class="aipdclxiCgBox">
                <div class="aipdclxiCgItem">
                  <div class="aipdclxiCgItitle"><i class="fa fa-clock-o"></i>效率提升</div>
                  <div class="aipdclxiCgItrm">
                    <div class="aipdclxiCgIlabel">设计周期</div>
                    <div class="aipdclxiCgIvalue">缩短30%（从12周至8.4周）</div>
                  </div>
                  <div class="aipdclxiCgItrm">
                    <div class="aipdclxiCgIlabel">碰撞检测效率</div>
                    <div class="aipdclxiCgIvalue">提升80%（从5天至1天）</div>
                  </div>
                  <div class="aipdclxiCgItrm">
                    <div class="aipdclxiCgIlabel">方案迭代速度</div>
                    <div class="aipdclxiCgIvalue">提升60%（平均迭代周期从7天至2.8天）</div>
                  </div>
                </div>
                <div class="aipdclxiCgItem">
                  <div class="aipdclxiCgItitle"><i class="fa fa-line-chart"></i>效益提升</div>
                  <div class="aipdclxiCgItrm">
                    <div class="aipdclxiCgIlabel">建筑能耗</div>
                    <div class="aipdclxiCgIvalue">降低12%（年节约能耗约8.5万度）</div>
                  </div>
                  <div class="aipdclxiCgItrm">
                    <div class="aipdclxiCgIlabel">有效商业面积</div>
                    <div class="aipdclxiCgIvalue">增加8%（约650平方米）</div>
                  </div>
                  <div class="aipdclxiCgItrm">
                    <div class="aipdclxiCgIlabel">预计运营收益</div>
                    <div class="aipdclxiCgIvalue">提升15%（年增加收益约280万元）</div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>

        <div class="aipdclRbox">
          <div class="aipdclRitem">
            <div class="aipdcrxTitle">
              <!-- <i class="fa fa-info-circle"></i> -->
              项目概览
            </div>
            <div class="aipdcrxUl" v-html="aialdetail.project_overview"></div>
            <!-- <div class="aipdcrxUl">
              <div>
                <span>项目名称</span>
                <span>杭州某商业综合体</span>
              </div>
              <div>
                <span>建设地点</span>
                <span>杭州市西湖区</span>
              </div>
              <div>
                <span>建筑面积</span>
                <span>约12万平方米</span>
              </div>
              <div>
                <span>建设单位</span>
                <span>杭州某置业有限公司</span>
              </div>
              <div>
                <span>设计单位</span>
                <span>山东某建筑设计研究院</span>
              </div>
              <div>
                <span>AI技术支持</span>
                <span>杭州筑智信息技术有限公司</span>
              </div>
              <div>
                <span>应用AI工具</span>
                <span>AI协同设计平台、智能能耗模拟系统、空间优化算法</span>
              </div>
            </div> -->
          </div>
          <div class="aipdclRitem">
            <div class="aipdcrxTitle">
              <!-- <i class="fa fa-info-circle"></i> -->
              相关图片
            </div>
            <div class="aipdcrxGtp">
              <img v-for="(item, index) in aialdetail.imgs" :key="index" :src="fileURL + item" alt="" />
            </div>
          </div>
          <div class="aipdclRitem">
            <div class="aipdcrxTitle">
              <i class="fa fa-comments"></i>
              咨询案例详情
            </div>
            <div class="aipdcrxSub">
              如需了解更多案例细节或AI设计解决方案，可通过以下方式联系我们
            </div>
            <div class="aipdcrxBtns">
              <button>
                <i class="fa fa-phone"></i>
                {{ sysInfos.sys_tel }}
              </button>
              <button>
                <i class="fa fa-envelope"></i>
                {{ sysInfos.sys_email }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="aipdcCptj">
        <div class="aipdccTitle">相关案例推荐</div>
        <div class="aipdccCgBox">
          <div class="aipdccCgItem">
            <img src="https://fastly.picsum.photos/id/905/400/400.jpg?hmac=w2m1CjOADMCbUtrQDbyCuKR7_PNl9koTsKiL89xet5c"
              alt="" />
            <div class="aipdccgiContent">
              <span class="aipdccgicTag">智能施工</span>
              <div class="aipdccgicTitle">宁波地铁项目AI施工管理</div>
              <div class="aipdccgicSub">
                应用AI施工管理系统，减少人工误差，提升施工效率25%，降低安全风险
              </div>
              <button>查看详情<i class="fa fa-angle-right"></i></button>
            </div>
          </div>
          <div class="aipdccCgItem">
            <img src="https://fastly.picsum.photos/id/905/400/400.jpg?hmac=w2m1CjOADMCbUtrQDbyCuKR7_PNl9koTsKiL89xet5c"
              alt="" />
            <div class="aipdccgiContent">
              <span class="aipdccgicTag">智能造价</span>
              <div class="aipdccgicTitle">施工进度模拟论证服务</div>
              <div class="aipdccgicSub">4D进度模拟与关键节点可行性分析</div>
              <button>查看详情<i class="fa fa-angle-right"></i></button>
            </div>
          </div>
          <div class="aipdccCgItem">
            <img src="https://fastly.picsum.photos/id/905/400/400.jpg?hmac=w2m1CjOADMCbUtrQDbyCuKR7_PNl9koTsKiL89xet5c"
              alt="" />
            <div class="aipdccgiContent">
              <span class="aipdccgicTag">智能运维</span>
              <div class="aipdccgicTitle">施工进度模拟论证服务</div>
              <div class="aipdccgicSub">4D进度模拟与关键节点可行性分析</div>
              <button>查看详情<i class="fa fa-angle-right"></i></button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aicasePage {
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
            color: rgb(22 93 255);
          }
        }

        .aidNavigationXg {
          margin: 0 0.5rem;
        }

        .aidNavigationSp {
          color: rgb(22 93 255);
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

    .adicTop {
      padding: 2rem 2rem 1rem;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      border-radius: 1rem;
      background-color: #fff;

      @media (max-width: 768px) {
        padding: 1rem;
      }

      .adictTitle {
        margin-bottom: 1rem;
        font-size: 1.875rem;
        font-weight: 700;
        color: #1f2937;
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
          color: rgb(22 93 255);
          background-color: rgb(22 93 255 / 0.1);
        }

        .adictTag2 {
          color: rgb(55 65 81);
          background-color: rgb(243 244 246);
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
  }

  .aipdCbox {
    position: relative;
    margin: 1rem auto 0;
    width: 100%;
    max-width: 1400px;
    color: #1f2937;

    @media (min-width: 992px) {
      margin: 2rem auto 0;
      display: flex;
      justify-content: space-between;
    }

    .aipdcLeft {
      margin-bottom: 2rem;
      width: 100%;

      @media (min-width: 992px) {
        margin-bottom: 0;
        width: calc(66.7% - 1rem);
      }

      .aipdclXq {
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

        .aipdclxTitle {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.25rem;
          border-bottom: 1px solid rgb(243 244 246);

          i {
            margin-right: 0.5rem;
            color: rgb(22 93 255);
          }
        }

        .aipdclxSub {
          line-height: 1.5rem;
        }

        .aipdclxUl {
          margin: 1rem 0;

          div {
            margin-bottom: 0.5rem;
            line-height: 1.5rem;

            span {
              margin-right: 0.5rem;
              margin-bottom: 0.125rem;
              display: inline-block;
              width: 0.4rem;
              height: 0.4rem;
              background-color: #1f2937;
              border-radius: 999px;
            }
          }

          div:last-child {
            margin-bottom: 0;
          }
        }

        .aipdclxAiyy {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .aipdclxAyi1 {
            margin-bottom: 1rem;
            padding: 1rem;
            width: 30%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            background-color: rgb(240 247 255);
            border-radius: 0.75rem;

            @media (max-width: 768px) {
              width: 100%;
            }

            .aipdclxAyi1t {
              font-weight: 700;
              font-size: 1.125rem;
              line-height: 1.75rem;
              text-align: center;
              margin-bottom: 0.5rem;
            }

            .aipdclxAyi1st {
              color: rgb(75 85 99);
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-align: center;
              margin: 0;
            }
          }

          .aipdclxAyi2 {
            margin-bottom: 1rem;
            width: calc(70% - 1rem);

            @media (max-width: 768px) {
              width: 100%;
            }

            .aipdclxAyi2t {
              margin-bottom: 0.75rem;
              line-height: 1.5rem;
            }

            .aipdclxAyi2st {
              line-height: 1.5rem;
            }
          }
        }

        .aipdclxItem {
          margin-top: 1.5rem;

          .aipdclxiTitle {
            margin-bottom: 0.75rem;
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.75rem;
          }

          .aipdclxiInfo {
            position: relative;
            display: flex;
            line-height: 1.5rem;
            padding-bottom: 1rem;

            .aipdclxiDian {
              flex-shrink: 0;
              margin-right: 10px;
              margin-top: 0.6rem;
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              background-color: rgb(1 32 96);
            }

            .aipdclxiIbox {
              flex-shrink: 0;
              margin-right: 0.75rem;
              width: 2rem;
              height: 2rem;
              color: rgb(22 93 255);
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 9999px;
            }

            .aipdclxiNbox {
              position: absolute;
              top: 0;
              left: -1rem;
              width: 2rem;
              height: 2rem;
              color: #fff;
              background-color: rgb(22 93 255);
              border-radius: 9999px;
            }

            .aipdclxiPbox {
              p:first-child {
                margin-bottom: 0.5rem;
                font-weight: 700;
                font-size: 1.125rem;
                line-height: 1.75rem;
              }

              p:last-child {
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: rgb(75 85 99);
              }
            }
          }

          .fwlcBorder {
            margin-left: 1rem;
            // margin-bottom: 1rem;
            padding-left: 2rem;
            border-left: 2px solid #e5e7eb;
          }

          // .fwlcBorder:last-child {
          //   border-left: 2px solid #fff;
          // }

          .alignCenter {
            align-items: center;
          }

          .aipdclxiCgBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .aipdclxiCgItem {
              margin-top: 1rem;
              padding: 1rem;
              width: 100%;
              background-color: rgb(240 247 255);
              border-radius: 0.75rem;

              @media (min-width: 992px) {
                margin-bottom: 0;
                width: calc(50% - 0.5rem);
              }

              .aipdclxiCgItitle {
                font-weight: 700;
                align-items: center;
                display: flex;
                margin-bottom: 0.75rem;

                i {
                  margin-right: 0.5rem;
                  color: rgb(22 93 255);
                }
              }

              .aipdclxiCgItrm {
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.875rem;
                line-height: 1.25rem;

                .aipdclxiCgIlabel {
                  width: 30%;
                  text-align: left;
                }

                .aipdclxiCgIvalue {
                  width: calc(70% - 0.5rem);
                  text-align: right;
                }
              }

              .aipdclxiCgItrm:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      .aipdclXq:last-child {
        margin-bottom: 0;
      }
    }

    .aipdclRbox {
      margin-bottom: 2rem;
      width: 100%;

      @media (min-width: 992px) {
        width: calc(33.3% - 1rem);
      }

      .aipdclRitem {
        margin-bottom: 2rem;
        padding: 1rem;
        width: 100%;
        background-color: rgb(255 255 255);
        border-radius: 1rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
        }

        .aipdcrxTitle {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.25rem;
          border-bottom: 1px solid rgb(243 244 246);

          i {
            margin-right: 0.5rem;
            color: rgb(22 93 255);
          }
        }

        .aipdcrxUl {
          margin-top: 1rem;

          div {
            margin-bottom: 1rem;
            line-height: 1.5rem;
            display: flex;

            span {
              flex-shrink: 0;
              font-size: 0.875rem;
            }

            span:first-child {
              width: 6rem;
              color: rgb(107 114 128);
            }

            span:last-child {
              width: calc(100% - 7rem);
              word-break: break-all;
            }
          }

          div:last-child {
            margin-bottom: 0;
          }
        }

        .aipdcrxGtp {
          img {
            margin-bottom: 1rem;
            width: 100%;
            height: 10rem;
            border-radius: 0.5rem;
          }

          img:last-child {
            margin-bottom: 0;
          }
        }

        .aipdcrxSub {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(75 85 99);
        }

        .aipdcrxBtns {
          button {
            margin-top: 1rem;
            padding: 0.75rem 0;
            width: 100%;
            line-height: 1.5rem;
            border-radius: 0.5rem;
          }

          button:first-child {
            color: #fff;
            background-color: rgb(22 93 255 / 0.9);
          }

          button:last-child {
            color: rgb(22 93 255 / 0.9);
            border: 1px solid rgb(22 93 255 / 0.9);
          }
        }
      }
    }
  }

  .aipdcCptj {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background-color: rgb(255 255 255);
    border-radius: 1rem;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);

    @media (max-width: 768px) {
      padding: 1rem;
    }

    .aipdccTitle {
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    .aipdccCgBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .aipdccCgItem {
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
          width: calc(33.3% - 0.5rem);
        }

        img {
          width: 100%;
          height: 10rem;
        }

        .aipdccgiContent {
          padding: 1rem;

          .aipdccgicTag {
            display: inline-block;
            margin-bottom: 0.5rem;
            padding: 0.25rem 1rem;
            font-size: 0.75rem;
            line-height: 1rem;
            color: rgb(22 93 255);
            background-color: rgb(22 93 255 / 0.1);
            border-radius: 9999px;
          }

          .aipdccgicTitle {
            margin-bottom: 0.5rem;
            font-weight: 700;
            color: rgb(1 32 96);
          }

          .aipdccgicSub {
            font-size: 0.875rem;
            line-height: 1.25rem;
            margin-bottom: 0.75rem;
            color: rgb(107 114 128);
          }

          button {
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(22 93 255);

            i {
              margin-left: 0.25rem;
            }
          }
        }
      }

      .aipdccCgItem:last-child {
        margin-bottom: 0;
      }

      .aipdccCgItem:hover {
        @media (min-width: 768px) {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
