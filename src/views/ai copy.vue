<script setup lang="ts">
import dayjs from 'dayjs'
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'
import { bannerlistApi, secpositionsApi, syspseoApi } from '@/api/modules/basic'
import { allaiappApi } from '@/api/modules/common'
import { aialtopApi } from '@/api/modules/ai'

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 用户端-获取所有启用的板块位置（含完整字段，按排序升序、创建时间倒序）
const bannerData: any = ref({
  page_id: 7,
  title: 'AI赋能应用banner',
  imgurl: '/uploads/default/33a587d1d8eb4fa8b57048d87f7a3e43.jpg',
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

// 人工智能应用
const businessAi: any = ref([])

function getAllaiapp() {
  // allaiappApi().then((res: any) => {
  //   businessAi.value = []
  // })
  businessAi.value = [
    {
      id: 15,
      name: '智能生成招标文件',
      cate_id: 1,
      cate_name: '招标造价+AI应用服务',
      img: '',
      icon: 'mdi:file-download',
      description: '',
      appurl: '',
      sort: 0,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-09-22 10:51:09',
      updated_at: '2025-10-31 15:51:56',
      tags: null,
      content: '<p><br></p>',
      sec_content_ids: [],
    },
    {
      id: 14,
      name: '全过程造价数据追溯',
      cate_id: 1,
      cate_name: '招标造价+AI应用服务',
      img: '',
      icon: 'material-symbols-light:database-search',
      description: '',
      appurl: '',
      sort: 0,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-09-22 10:50:42',
      updated_at: '2025-10-31 15:50:37',
      tags: null,
      content: '<p><br></p>',
      sec_content_ids: [],
    },
    {
      id: 13,
      name: '智能管控动态成本',
      cate_id: 1,
      cate_name: '招标造价+AI应用服务',
      img: '',
      icon: 'teenyicons:cost-estimate-outline',
      description: '',
      appurl: '',
      sort: 0,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-09-22 10:50:19',
      updated_at: '2025-10-31 15:49:55',
      tags: null,
      content: '<p><br></p>',
      sec_content_ids: [],
    },
    {
      id: 12,
      name: '智能分析模型计量结果',
      cate_id: 1,
      cate_name: '招标造价+AI应用服务',
      img: '',
      icon: 'hugeicons:analysis-text-link',
      description: '',
      appurl: '',
      sort: 0,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-09-22 10:49:52',
      updated_at: '2025-10-31 15:49:11',
      tags: null,
      content: '<p><br></p>',
      sec_content_ids: [],
    },
    {
      id: 11,
      name: '智能识别工程量与计算',
      cate_id: 1,
      cate_name: '招标造价+AI应用服务',
      img: '',
      icon: 'material-symbols-light:calculate',
      description: '',
      appurl: '',
      sort: 0,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-09-22 10:49:30',
      updated_at: '2025-10-31 15:48:26',
      tags: null,
      content: '<p><br></p>',
      sec_content_ids: [],
    },
    {
      id: 10,
      name: '智能校对设计施工图',
      cate_id: 1,
      cate_name: '招标造价+AI应用服务',
      img: '',
      icon: 'material-symbols-light:pinch-zoom-in-outline',
      description: '',
      appurl: '',
      sort: 0,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-09-22 10:49:03',
      updated_at: '2025-10-31 15:47:38',
      tags: null,
      content: '<p><br></p>',
      sec_content_ids: [],
    },
    {
      id: 1,
      name: '智能化设计',
      cate_id: 2,
      cate_name: '业务管理+AI赋能组价',
      img: '/uploads/default/20c2068fa472426c9efa9ff334ac166d.png',
      icon: 'hugeicons:computer-programming-01',
      description: '111',
      appurl: 'https://www.adddd.com',
      sort: 1,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-08-13 18:17:17',
      updated_at: '2025-11-05 14:09:56',
      tags: null,
      content:
        '<p style="text-align: start;">利用先进的人工智能技术，实现建筑设计方案的自动化生成与优化。通过分析用户需求、环境因素等多维度数据，提供高效、环保且美观的设计方案。</p><p style="text-align: start;"><br></p>',
      sec_content_ids: [],
    },
    {
      id: 2,
      name: '辅助设计工具',
      cate_id: 2,
      cate_name: '业务管理+AI赋能组价',
      img: '/uploads/default/510303526f8b431387e6e47c7702361c.png',
      icon: 'ic:outline-design-services',
      description: 'dddd',
      appurl: 'https://fontawesome.dashgame.com/',
      sort: 2,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-08-14 11:39:28',
      updated_at: '2025-11-05 14:14:35',
      tags: null,
      content:
        '<p>基于AI图像识别与参数化建模技术，智能辅助设计师完成图纸绘制、构件选型与规范校验，显著提升设计效率与成果标准化水平。</p>',
      sec_content_ids: [],
    },
    {
      id: 3,
      name: '建筑机器人',
      cate_id: 2,
      cate_name: '业务管理+AI赋能组价',
      img: '/uploads/default/b68c56028a0c464f9dcbbade3e1773dd.png',
      icon: 'material-symbols-light:robot-2',
      description: '',
      appurl: '',
      sort: 3,
      status: 1,
      status_name: 'ENABLED',
      created_at: '2025-08-21 15:15:06',
      updated_at: '2025-11-05 14:11:03',
      tags: null,
      content:
        '<p style="text-align: start;">结合人工智能与机械工程技术，开发用于建筑现场的机器人助手。它们能够执行从基础施工到精细装饰的各种任务，大幅提高工作效率和安全性。<br></p>',
      sec_content_ids: [],
    },
  ]
}

// AI应用成功案例 TOP
const aialtop: any = ref([])

function getAialtop() {
  // aialtopApi().then((res: any) => {
  //   if (res) {
  //     aialtop.value = res
  //   }
  // })
  aialtop.value = [
    {
      id: 2,
      title: '杭州某公司AI优化设计',
      keywords: '22222,7777',
      description: '应用AI辅助设计工具，优化结构，节省材料成本12%，缩短设计周期30%',
      imgs: ['/uploads/default/eb8d650494a04290a18055b134cfb24d.jpg'],
      tags: '智能设计,智能医疗',
      partner: 'ffff',
      content: '<p>111</p>',
      sort: 0,
      status: 1,
      cate_id: 1,
      tem_id: 1,
      cate_name: 'BIM',
      tem_name: '模版一',
      project_background:
        '杭州某商业综合体项目总建筑面积约12万平方米，包含商业购物中心、办公塔楼及配套设施。项目初期面临三大核心挑战：\n传统设计流程周期长，各专业协同效率低，易出现设计冲突\n建筑能耗模拟不准确，难以满足绿色建筑标准要求\n空间布局不合理，影响后期商业运营效率和用户体验\n为解决上述问题，项目团队引入AI辅助设计工具，通过智能算法优化设计方案，实现设计效率与建筑性能的双重提升。',
      project_overview:
        '项目名称：杭州某商业综合体\n建设地点：杭州市西湖区\n建筑面积：约12万平方米\n建设单位：杭州某置业有限公司\n设计单位：浙江某建筑设计研究院\nAI技术支持：杭州筑智信息技术有限公司\n应用AI工具：AI协同设计平台、智能能耗模拟系统、空间优化算法',
      application_solution:
        '应用AI协同设计平台，实现建筑、结构、机电各专业模型的实时整合与碰撞检测。AI系统可自动识别85%以上的设计冲突，并提供优化建议，减少人工排查时间。\n通过自然语言处理技术，将设计规范转化为算法规则，在设计过程中实时校验，确保方案符合国家及地方规范要求。\n利用AI能耗模拟工具，结合杭州气候数据与建筑形态参数，构建能耗预测模型。与传统模拟方法相比，AI模型的预测精度提升40%，计算时间缩短70%。\n通过遗传算法优化建筑朝向、窗墙比及围护结构参数，最终实现建筑综合能耗降低12%，达到绿色建筑二星级标准。',
      created_at: '2025-08-10T18:55:06',
      updated_at: '2025-09-22T17:30:54',
    },
    {
      id: 1,
      title: '宁波某公司项目AI施工管理',
      keywords: '221,123',
      description: '应用AI施工管理系统，减少人工误差，提升效率25%，降低安全风险',
      imgs: ['/uploads/default/b3952e716f514b928e6e253f5dcda8be.jpg'],
      tags: '智能设计,智能医疗',
      partner: '合作企业',
      content:
        '<p>详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容</p>',
      sort: 1,
      status: 1,
      cate_id: 1,
      tem_id: 1,
      cate_name: 'BIM',
      tem_name: '模版一',
      project_background:
        '项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景项目背景',
      project_overview:
        '项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览项目概览',
      application_solution:
        '应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案应用方案',
      created_at: '2025-08-10T18:03:32',
      updated_at: '2025-09-19T08:29:24',
    }, {
      id: 2,
      title: '某医院项目AI造价管理',
      keywords: '22222,7777',
      description: '应用AI造价分析系统，减少造价误差8%，缩短预算审核时间40%，提高决策效率',
      imgs: ['/uploads/default/33a587d1d8eb4fa8b57048d87f7a3e43.jpg'],
      tags: '智能设计,智能医疗',
      partner: 'ffff',
      content: '<p>111</p>',
      sort: 0,
      status: 1,
      cate_id: 1,
      tem_id: 1,
      cate_name: 'BIM',
      tem_name: '模版一',
      project_background:
        '杭州某商业综合体项目总建筑面积约12万平方米，包含商业购物中心、办公塔楼及配套设施。项目初期面临三大核心挑战：\n传统设计流程周期长，各专业协同效率低，易出现设计冲突\n建筑能耗模拟不准确，难以满足绿色建筑标准要求\n空间布局不合理，影响后期商业运营效率和用户体验\n为解决上述问题，项目团队引入AI辅助设计工具，通过智能算法优化设计方案，实现设计效率与建筑性能的双重提升。',
      project_overview:
        '项目名称：杭州某商业综合体\n建设地点：杭州市西湖区\n建筑面积：约12万平方米\n建设单位：杭州某置业有限公司\n设计单位：浙江某建筑设计研究院\nAI技术支持：杭州筑智信息技术有限公司\n应用AI工具：AI协同设计平台、智能能耗模拟系统、空间优化算法',
      application_solution:
        '应用AI协同设计平台，实现建筑、结构、机电各专业模型的实时整合与碰撞检测。AI系统可自动识别85%以上的设计冲突，并提供优化建议，减少人工排查时间。\n通过自然语言处理技术，将设计规范转化为算法规则，在设计过程中实时校验，确保方案符合国家及地方规范要求。\n利用AI能耗模拟工具，结合杭州气候数据与建筑形态参数，构建能耗预测模型。与传统模拟方法相比，AI模型的预测精度提升40%，计算时间缩短70%。\n通过遗传算法优化建筑朝向、窗墙比及围护结构参数，最终实现建筑综合能耗降低12%，达到绿色建筑二星级标准。',
      created_at: '2025-08-10T18:55:06',
      updated_at: '2025-09-22T17:30:54',
    },
  ]
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getAllaiapp()
  getAialtop()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div>
    <div class="aiPage">
      <!-- BANNER -->
      <div class="aibannerBox" @click="windowOpen(bannerData.url, bannerData.istourl)">
        <img :src="fileURL + bannerData.imgurl" alt="" />
        <div class="aibannerAbsolute">
          <div class="aibannerContent">
            <div class="aibannerTitle">{{ bannerData.maintitle }}</div>
            <div v-if="bannerData.description" class="aibannerSubtitle">
              {{ bannerData.description }}
            </div>
          </div>
        </div>
      </div>
      <!-- 介绍区域  -->
      <div class="introaiOut">
        <div class="introaiBox">
          随着新一轮科技革命和产业变革深入发展，人工智能（AI）技术突飞猛进，已成为提升产业能级的重要引擎。目前，以DeepSeeK、通义千问为代表的国产大模型正在快速发展与商业应用，人工智能（AI）将逐步渗透到各类行业。建筑业探索应用也将是必由之路，以数据、算法和算力为核心要素，驱动工程设计、工程施工和运营维护多维度创新应用，可实现优化资源配置、提升生产效率和创新组织管理新范式，为产业转型发展注入新动能。
        </div>
      </div>
      <!-- 人工智能应用 -->
      <div class="applicationOut">
        <div class="applicationBox">
          <div class="applicationTitle">业务管理+AI赋能组价</div>
          <div class="applicationHeng"></div>
          <div class="applicationClassbox">
            <div v-for="(item, index) in businessAi" :key="index" class="applicationClassitem">
              <div class="applicationClassitemfa frcc">
                <i class="fa fa-cog"></i>
                <!-- <i :class="item.icon"></i> -->
              </div>
              <div class="applicationClassitemtext">{{ item.name }}</div>
              <button>立即体验</button>
            </div>
          </div>
        </div>
      </div>
      <!-- AI应用成功案例  -->
      <div class="caseBox">
        <div class="caseTitle">AI应用成功案例</div>
        <div class="caseHeng"></div>
        <div class="caseInfo">探索AI应用的实际效果与价值</div>
        <div class="caseClassbox">
          <div v-for="(item, index) in aialtop" :key="index" class="caseClassitem">
            <img v-if="item.imgs" :src="fileURL + item.imgs[0]" class="caseClassitemfa" />
            <div class="caseClassitembox">
              <div v-if="item.tags" class="caseClassitemFrsc">
                <div v-for="(item2, index2) in item.tags.split(',')" :key="index2" class="caseClassitemZnsj">
                  {{ item2 }}
                </div>
                <div class="caseClassitemSpan">{{ dayjs(item.created_at).format('YYYY年MM月DD日') }}</div>
              </div>
              <div class="caseClassitemtext">{{ item.title }}</div>
              <div class="caseClassiteminfo">
                {{ item.description }}
              </div>
              <div class="frsc">
                <button class="caseClassitembtn">查看详情<i class="fa fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aiPage {
  overflow-x: hidden;
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;

  .aibannerBox {
    position: relative;
    padding-top: 100px;
    width: 100vw;
    height: 550px;

    @media (max-width: 768px) {
      padding-top: 100px;
    }

    img {
      width: 100vw;
      height: 450px;
    }

    .aibannerAbsolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100vw;

      .aibannerContent {
        margin: 0 auto;
        padding: 100px 2rem 0;
        width: 100%;
        max-width: 1400px;
        height: 550px;
        display: flex;
        flex-flow: column;
        justify-content: center;

        .aibannerTitle {
          margin-bottom: 1.5rem;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.25;
          color: rgb(255 255 255);
        }

        .aibannerSubtitle {
          margin-bottom: 2rem;
          max-width: 60rem;
          font-size: clamp(1rem, 4vw, 1.25rem);
          font-weight: 500;
          color: rgb(255 255 255 / 0.9);
        }

        .aibannerLeftBtn {
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

        .aibannerLeftBtn:hover {
          @media (min-width: 768px) {
            transform: scale(1.05);
            box-shadow: 2px 2px 10px 0 #1f3e85;
          }
        }

        .aibannerRightBtn {
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

        .aibannerRightBtn:hover {
          @media (min-width: 768px) {
            transform: scale(1.05);
            box-shadow: 2px 2px 10px 0 rgba(255 255 255 / 0.2);
          }
        }
      }
    }
  }

  .introaiOut {
    padding: 6rem 1rem;
    width: 100%;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }

    .introaiBox {
      position: relative;
      margin: 0 auto;
      padding: 2rem;
      width: 100%;
      max-width: 1400px;
      font-size: clamp(1rem, 4vw, 1.25rem);
      line-height: 1.75rem;
      color: #4b5563;
      background-color: #fff;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      border-radius: 1rem;

      @media (max-width: 768px) {
        padding: 1rem;
      }

    }
  }

  .applicationOut {
    padding: 2.5rem 0;
    width: 100%;
    background-color: #f0f7ff;

    @media (max-width: 768px) {
      padding: 2rem 0;
    }

    .applicationBox {
      position: relative;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
      max-width: 1400px;

      .applicationTitle {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 700;
        text-align: center;
        color: #1f3e85;
      }

      .applicationHeng {
        margin: 1rem auto 2.5rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: #1f3e85;
      }

      .applicationClassbox {
        width: calc(100% + 1rem);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        @media (max-width: 768px) {
          width: 100%;
        }

        .applicationClassitem {
          margin: 0 1rem 1rem 0;
          padding: 1.5rem;
          width: calc(33.3% - 1rem);
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          border-radius: 0.75rem;
          box-shadow:
            0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 1rem 0;
          }

          &:last-child {
            @media (max-width: 768px) {
              margin-bottom: 0;
            }
          }

          &:hover {
            cursor: pointer;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            animation: jumpUpwards 300ms ease-in-out forwards;

            .applicationClassitemfa {
              opacity: 1;
            }

            .applicationClassitemtext {
              opacity: 1;
            }

            button {
              opacity: 1;
            }
          }

          .applicationClassitemfa {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            font-size: 1.5rem;
            line-height: 2rem;
            border-radius: 0.75rem;
            color: #fff;
            background-color: #1f3e85;
            opacity: 0.6;

            @media (max-width: 768px) {
              opacity: 1;
            }
          }

          .applicationClassitemtext {
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: #1f3e85;
            opacity: 0.6;

            @media (max-width: 768px) {
              // font-size: 1.125rem;
              opacity: 1;
            }
          }

          .applicationClassiteminfo {
            text-align: center;
            margin-bottom: 1rem;
            line-height: 1.5rem;
            color: #4c659d;
          }

          button {
            padding: 0.5rem 1.5rem;
            line-height: 1.5rem;
            color: #fff;
            background-color: #1f3e85;
            border-radius: 0.5rem;
            opacity: 0.6;

            @media (max-width: 768px) {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .caseBox {
    position: relative;
    margin: 4rem auto 0;
    padding: 0 1rem 4rem;
    width: 100%;
    max-width: 1400px;

    @media (max-width: 768px) {
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .caseTitle {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      color: #1f3e85;
    }

    .caseHeng {
      margin: 1rem auto 0;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: #1f3e85;
    }

    .caseInfo {
      margin: 1rem auto 4rem;
      text-align: center;
      max-width: 42rem;
      color: #4c659d;

      @media (max-width: 768px) {
        margin: 1rem auto 2.5rem;
      }
    }

    .caseClassbox {
      width: calc(100% + 1rem);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      @media (max-width: 768px) {
        width: 100%;
      }

      .caseClassitem {
        overflow: hidden;
        margin: 0 1rem 1rem 0;
        width: calc(33.3% - 1rem);
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 0.75rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          width: 100%;
          margin: 0 0 1rem 0;
        }

        .caseClassitemfa {
          width: 100%;
          height: 12rem;
        }

        .caseClassitembox {
          width: 100%;
          padding: 1.5rem;

          @media (max-width: 768px) {
            padding: 1rem;
          }

          .caseClassitemFrsc {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 1rem;

            .caseClassitemZnsj {
              margin-right: 0.5rem;
              padding: 0.25rem 0.75rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              font-weight: 500;
              color: #1f3e85;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 9999px;
            }

            .caseClassitemZnsj:last-child {
              margin-right: 0;
            }

            .caseClassitemSpan {
              margin-left: 1rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              // color: rgb(107 114 128);
              color: #4b5563;
            }
          }

          .caseClassitemtext {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: #1f3e85;
          }

          .caseClassiteminfo {
            margin-bottom: 1rem;
            line-height: 1.5rem;
            color: #4b5563;
          }

          .caseClassitembtn {
            font-weight: 500;
            line-height: 1.5rem;
            color: #1f3e85;

            i {
              margin-left: 0.5rem;
            }
          }
        }
      }

      .caseClassitem:last-child {
        @media (max-width: 768px) {
          margin-bottom: 0;
        }
      }

      .caseClassitem:hover {
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
