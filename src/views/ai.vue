<script setup lang="ts">
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
const positionid: any = ref('')
const bannerData: any = ref([])

function getSecpositions() {
  secpositionsApi().then((res: any) => {
    if (res && res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        if (res[i].url === window.localStorage.getItem('selectedName')) {
          positionid.value = res[i].id
          getBannerlist()
          break
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

// 人工智能应用
const businessAi: any = ref([])
const bidcostAi: any = ref([])

function getAllaiapp() {
  allaiappApi().then((res: any) => {
    businessAi.value = []
    bidcostAi.value = []
    if (res && res.length > 0) {
      res.forEach((item: any) => {
        if (item.cate_id === 2) {
          businessAi.value.push(item)
        }
        if (item.cate_id === 1) {
          bidcostAi.value.push(item)
        }
      });
    }
  })
}

// AI应用成功案例 TOP
const aialtop: any = ref([])

function getAialtop() {
  aialtopApi().then((res: any) => {
    if (res) {
      aialtop.value = res
    }
  })
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
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
      <div class="bannerBox" @click="windowOpen(bannerData.url, bannerData.istourl)">
        <img :src="fileURL + bannerData.imgurl" alt="" />
        <div class="bannerAbsolute">
          <div class="bannerContent">
            <div class="bannerTitle">{{ bannerData.maintitle }}</div>
            <div v-if="bannerData.description" class="bannerSubtitle">
              {{ bannerData.description }}
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
      <!-- 介绍区域  -->
      <!-- <div class="introaiOut">
        <div class="introaiBox">
          <p class="introaiText">
            随着新一轮科技革命和产业变革深入发展，人工智能（AI）技术突飞猛进，已成为提升产业能级的重要引擎。目前，以DeepSeeK、通义千问为代表的国产大模型正在快速发展与商业应用，人工智能（AI）将逐步渗透到各类行业。建筑业探索应用也将是必由之路，以数据、算法和算力为核心要素，驱动工程设计、工程施工和运营维护多维度创新应用，可实现优化资源配置、提升生产效率和创新组织管理新范式，为产业转型发展注入新动能。
          </p>
        </div>
      </div> -->
      <!-- 人工智能应用 -->
      <div class="applicationOut">
        <div class="applicationBox">
          <div class="applicationTitle">业务管理+AI赋能组价</div>
          <div class="applicationHeng"></div>
          <div class="applicationClassbox">
            <div v-for="(item, index) in businessAi" :key="index" class="applicationClassitem">
              <div class="applicationClassitemfa frcc">
                <i :class="item.icon"></i>
              </div>
              <div class="applicationClassitemtext">{{ item.name }}</div>
              <!-- <div class="applicationClassiteminfo">
                基于BIM模型实现工程量精准计算与动态成本管控
              </div> -->
              <button @click="pageJump('ai_detail', {
                aixqid: item.id
              })">立即体验</button>
            </div>
          </div>
        </div>
        <div class="applicationBox" style="margin-top: 2.5rem">
          <div class="applicationTitle">招标造价+AI应用服务</div>
          <div class="applicationHeng"></div>
          <div class="applicationClassbox">
            <div v-for="(item, index) in bidcostAi" :key="index" class="applicationClassitem">
              <div class="applicationClassitemfa frcc">
                <i :class="item.icon"></i>
              </div>
              <div class="applicationClassitemtext">{{ item.name }}</div>
              <!-- <div class="applicationClassiteminfo">AI自动复核工程文本，减少人为错误</div> -->
              <button @click="pageJump('ai_detail', {
                aixqid: item.id
              })">立即体验</button>
            </div>
          </div>
        </div>
      </div>
      <!-- AI应用成功案例  -->
      <div class="caseBox">
        <div class="caseTitle">AI应用成功案例</div>
        <div class="caseHeng"></div>
        <div class="caseInfo">探索建筑业AI应用的实际效果与价值</div>
        <div class="caseClassbox">
          <div v-for="(item, index) in aialtop" :key="index" class="caseClassitem" @click="pageJump('aicase_detail', {
            aialid: item.id
          })">
            <img src="@/assets/photo-1560518883-ce09059eeffa.jpg" alt="" class="caseClassitemfa" />
            <div class="caseClassitembox">
              <div v-if="item.tags" class="caseClassitemFrsc">
                <div v-for="(item2, index2) in item.tags.split(',')" :key="index2" class="caseClassitemZnsj">{{ item2 }}
                </div>
                <!-- <div class="caseClassitemSpan">2024年5月</div> -->
              </div>
              <div class="caseClassitemtext">{{ item.title }}</div>
              <div class="caseClassiteminfo">
                {{ item.description }}
              </div>
              <div class="frsc">
                <button class="caseClassitembtn">
                  查看详情<i class="fa fa-arrow-right"></i>
                </button>
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

  .introaiOut {
    padding: 6rem 1rem;
    width: 100%;

    @media (max-width: 768px) {
      padding: 1rem;
    }

    .introaiBox {
      position: relative;
      margin: 0 auto;
      padding: 1rem;
      width: 100%;
      max-width: 1400px;
      background-color: #fff;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      border-radius: 1rem;

      @media (min-width: 992px) {
        padding: 2.5rem;
      }

      .introaiText {
        font-size: clamp(1rem, 4vw, 1.25rem);
        line-height: 1.75rem;
        color: rgb(75 85 99);
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
        color: rgb(1 32 96);
      }

      .applicationHeng {
        margin: 1rem auto 2.5rem;
        width: 5rem;
        height: 0.25rem;
        border-radius: 9999px;
        background-color: rgb(22 93 255);
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
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 1rem 0;
          }

          .applicationClassitemfa {
            margin-bottom: 1rem;
            width: 4rem;
            height: 4rem;
            font-size: 1.5rem;
            line-height: 2rem;
            border-radius: 0.75rem;
            color: #fff;
            background-image: linear-gradient(to bottom right, #60a5fa, #4f46e5);
          }

          .applicationClassitemtext {
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(1 32 96);

            @media (max-width: 768px) {
              font-size: 1.125rem;
            }
          }

          .applicationClassiteminfo {
            text-align: center;
            margin-bottom: 1rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);
          }

          button {
            padding: 0.5rem 1.5rem;
            line-height: 1.5rem;
            color: #fff;
            background-color: rgb(22 93 255);
            border-radius: 0.5rem;
          }
        }

        .applicationClassitem:last-child {
          @media (max-width: 768px) {
            margin-bottom: 0;
          }
        }

        .applicationClassitem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            animation: jumpUpwards 300ms ease-in-out forwards;
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
      color: rgb(1 32 96);
    }

    .caseHeng {
      margin: 1rem auto 0;
      width: 5rem;
      height: 0.25rem;
      border-radius: 9999px;
      background-color: rgb(22 93 255);
    }

    .caseInfo {
      margin: 1rem auto 4rem;
      text-align: center;
      max-width: 42rem;
      color: rgb(75 85 99);

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
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

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
              color: rgb(22 93 255);
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
              color: rgb(107 114 128);
            }
          }

          .caseClassitemtext {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(1 32 96);
          }

          .caseClassiteminfo {
            margin-bottom: 1rem;
            line-height: 1.5rem;
            color: rgb(75 85 99);
          }

          .caseClassitembtn {
            font-weight: 500;
            line-height: 1.5rem;
            color: rgb(22 93 255);

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
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          animation: jumpUpwards 300ms ease-in-out forwards;
        }
      }
    }
  }
}
</style>
