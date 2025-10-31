<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'
import { bannerlistApi, secpositionsApi, syspseoApi } from '@/api/modules/basic'
import { videocatesApi, videolistbycateApi } from '@/api/modules/video'

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
        ],
      })
    }
  })
}

// 登陆后的用户信息
const userInfo: any = ref({})

function getUserInfo() {
  if (window.localStorage.getItem('userinfo')) {
    userInfo.value = JSON.parse(window.localStorage.getItem('userinfo') as string)
  } else {
    userInfo.value = {}
  }
}

// 用户端-获取所有启用且未删除的视频分类（支持多级分类结构）
const videocates: any = ref([])
const videocateActive: any = ref('')

function getVideocates() {
  videocatesApi().then((res: any) => {
    if (res) {
      videocates.value = res
    }
  })
}

function videocateClick(item: any) {
  videocateActive.value = item.id
  getVideolistbycate()
}

// 用户端-根据分类ID获取视频列表（分页，返回精简信息）
const currentPage: any = ref(1)
const pageSize: any = ref(10)
const total: any = ref()
const videoList: any = ref([])

function getVideolistbycate() {
  // IN DOUBT videocateActive 传空应该查询所有的
  videolistbycateApi(videocateActive.value || '1', {
    page: currentPage.value,
    pageSize: pageSize.value,
  }).then((res: any) => {
    if (res) {
      total.value = res.total
      videoList.value = res.items
    }
  })
}

// 视频类型 change
const videosplxActive: any = ref('')

function videosplxClick(code: any) {
  videosplxActive.value = code
}

// 视频时长 change
const videospscActive: any = ref('')

function videospscClick(code: any) {
  videospscActive.value = code
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
  getUserInfo()
  getVideocates()
  getVideolistbycate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const input2: any = ref()

// 时分秒过滤器
function convertSecondsToHMS(seconds: any) {
  var hours = Math.floor(seconds / 3600)
  var minutes = Math.floor((seconds % 3600) / 60)
  var remainingSeconds = seconds % 60
  var returnStr = ''
  if (hours) {
    returnStr += hours + '小时'
  }
  returnStr += minutes + '分钟'
  if (remainingSeconds) {
    returnStr += remainingSeconds + '秒 '
  }
  return returnStr
}
</script>

<template>
  <div class="productsPage">
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

    <!-- CONTENT BOX -->
    <div class="containerBox">
      <div class="containerLeft">
        <!-- 筛选视频 -->
        <div class="containerClass">
          <div class="frbc mb15">
            <div class="containerClassTitle">筛选视频</div>
            <div class="containerClassNumber"><span>128</span>个视频</div>
          </div>
          <div class="containerClassTbox">
            <i class="fa fa-laptop"></i>
            <div class="containerClassText">平台分类</div>
          </div>
          <div class="containerClassRow">
            <button :class="videocateActive === '' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videocateClick({ id: '' })">
              全部
            </button>
            <button v-for="(item, index) in videocates" :key="index"
              :class="videocateActive === item.id ? 'containerClassColActive' : 'containerClassCol'"
              @click="videocateClick(item)">
              {{ item.name }}
            </button>
          </div>
          <div class="containerClassTbox">
            <div class="containerClassText">视频类型</div>
          </div>
          <div class="containerClassRow">
            <button :class="videosplxActive === '' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videosplxClick('')">
              全部
            </button>
            <button :class="videosplxActive === '01' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videosplxClick('01')">
              免费
            </button>
            <button :class="videosplxActive === '02' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videosplxClick('02')">
              付费
            </button>
          </div>
          <div class="containerClassTbox">
            <div class="containerClassText">视频时长</div>
          </div>
          <div class="containerClassRow">
            <button :class="videospscActive === '' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videospscClick('')">
              全部
            </button>
            <button :class="videospscActive === '01' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videospscClick('01')">
              10分钟以内
            </button>
            <button :class="videospscActive === '02' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videospscClick('02')">
              10-30分钟
            </button>
            <button :class="videospscActive === '03' ? 'containerClassColActive' : 'containerClassCol'"
              @click="videospscClick('03')">
              30分钟以上
            </button>
          </div>
          <el-input v-model="input2" style="width: 100%; height: 40px; font-size: 1rem" placeholder="搜索视频..."
            :prefix-icon="Search" />
        </div>
        <!-- 精选视频 -->
        <div class="containerProducts">
          <div class="containerProductsTitle">
            <div class="containerProductsTitleText">精选视频</div>
          </div>
          <div class="containerProductsBox">
            <div class="containerProductsItem" v-for="(item, index) in videoList" :key="index"
              @click="pageJump('video_detail', { id: item.id })">
              <div class="containerPiImg">
                <div v-if="index % 2 === 0" class="containerPiTime">
                  {{ convertSecondsToHMS(item.vlength) }}
                </div>
                <div v-else class="containerPiBuy"><i class="fa fa-check"></i>已购买</div>
                <img :src="fileURL + item.thumbnail" alt="" style="width: 100%; height: 100%" />
                <div class="containerPiplayerBox">
                  <div class="containerPiplayerICon">
                    <i class="fa fa-play"></i>
                  </div>
                </div>
                <div class="containerPiprogress">
                  <div class="containerPiprogressBar" style="width: 80%"></div>
                </div>
              </div>
              <div class="containerPiBox">
                <div class="supplierPiTop">
                  <div class="supplierPiTitle">{{ item.title }}</div>
                  <div v-if="index % 2 === 0" class="supplierPingFen">¥{{ item.price }}</div>
                  <div v-else class="supplierPingFen2">¥99.90</div>
                </div>
                <div class="containerPiClass">
                  <div v-for="(item2, index2) in item.tag.split(' ')" :key="index" class="containerPiCitrm">
                    {{ item2 }}
                  </div>
                </div>
                <div class="containerPiPbox">
                  <div class="containerPiPice">
                    <img src="@/assets/32.jpg" alt="" />
                    <span>张老师</span>
                  </div>
                  <div class="containerPiPice">
                    <i class="fa fa-users"></i>
                    <span style="color: rgb(107 114 128)">3421</span>
                  </div>
                </div>
              </div>
              <button v-if="index % 2 === 0" class="containerPiRbtn">立即观看</button>
              <button v-else class="containerPiRbtn2">继续观看</button>
            </div>
          </div>
          <div class="containerPagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20]"
              size="default" background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="total"
              @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
      <div class="containerRight">
        <!-- 用户登录 -->
        <div class="containerLogin">
          <div class="frsc">
            <div class="containerLoginIcon">
              <i class="fa fa-user"></i>
            </div>
            <div>
              <div class="containerLoginName">{{ userInfo.name ?? '游客' }}，您好</div>
              <div v-if="userInfo.name" class="containerLoginTips">登录成功</div>
              <div v-if="!userInfo.name" class="containerLoginTips">登录解锁更多功能</div>
            </div>
          </div>
          <button v-if="!userInfo.name" class="containerLoginBtn" @click="pageJump('login')">登录 / 注册</button>
          <!-- <div class="containerLoginMy">
            <div>
              <div class="containerLoginMn">0</div>
              <div class="containerLoginMt">我的视频</div>
            </div>
            <div>
              <div class="containerLoginMn">0</div>
              <div class="containerLoginMt">学习时长</div>
            </div>
            <div>
              <div class="containerLoginMn">0</div>
              <div class="containerLoginMt">收藏视频</div>
            </div>
          </div> -->
        </div>
        <!-- 热门视频 -->
        <div class="containerHot">
          <div class="containerHotTitle">热门视频</div>
          <div class="containerHotItem" v-for="index in 4" :key="index">
            <div class="containerHotLeft">
              <img src="@/assets/photo-1560518883-ce09059eeffa.jpg" class="containerHimg" />
              <div class="containerHcbox">
                <div class="containerHctitle">Revit建筑建模实战</div>
                <div class="containerHcinfo">BIM技术·CAD</div>
              </div>
            </div>
            <div class="containerHpice">¥499</div>
          </div>
          <div class="containerHMore">
            <button>查看更多热门视频</button>
            <i class="fa fa-angle-right" style="margin-left: 0.25rem; font-size: 1.5rem"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.productsPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .containerBox {
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;

    @media (min-width: 992px) {
      padding: 4rem 1rem;
      display: flex;
      justify-content: space-between;
    }

    .containerLeft {
      width: 100%;

      @media (min-width: 992px) {
        width: calc(66.7% - 1rem);
      }

      .containerClass {
        margin-bottom: 2rem;
        padding: 1.5rem;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 992px) {
          padding: 1rem;
        }

        .containerClassTitle {
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .containerClassNumber {
          line-height: 1.25rem;
          color: rgb(75 85 99);

          span {
            margin-right: 0.25rem;
            font-weight: 700;
            color: rgb(22 93 255);
          }
        }

        .containerClassTbox {
          align-items: center;
          display: flex;
          margin-bottom: 0.75rem;

          i {
            margin-right: 0.5rem;
            color: rgb(22 93 255);
          }

          .containerClassText {
            font-weight: 500;
            line-height: 1.5rem;
          }
        }

        .containerClassRow {
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          line-height: 1.5rem;

          .containerClassCol {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: rgb(1 32 96);
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid rgb(243 244 246);
            border-radius: 9999px;

            @media (max-width: 768px) {
              margin: 0 0.5rem 0.5rem 0;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }

          .containerClassCol:hover {
            @media (min-width: 768px) {
              background-color: rgb(243 244 246);
            }
          }

          .containerClassColActive {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: #fff;
            background-color: rgb(22 93 255);
            border: 1px solid rgb(243 244 246);
            border-radius: 9999px;

            @media (max-width: 768px) {
              margin: 0 0.5rem 0.5rem 0;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }
        }
      }

      .containerProducts {
        margin-bottom: 2rem;
        padding: 1.5rem 0;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 1140px) {
          padding: 1rem 0;
        }

        .containerProductsTitle {
          margin-bottom: 1.5rem;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .containerProductsTitleText {
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .containerProductsTitlePxfs {
            display: flex;
            align-items: center;

            span {
              color: rgb(75 85 99);
            }
          }
        }

        @media (max-width: 992px) {
          .containerProductsTitle {
            padding: 0 1rem;
          }
        }

        .containerProductsBox {
          padding: 0 0.5rem 0 1.5rem;
          display: flex;
          flex-wrap: wrap;

          @media (max-width: 992px) {
            padding: 0 1rem;
          }

          .containerProductsItem {
            overflow: hidden;
            margin-right: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            width: calc(33.3% - 1rem);
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            border-radius: 0.75rem;
            background-color: #fff;

            @media (max-width: 992px) {
              margin-right: 0;
              width: 100%;
            }

            .containerPiImg {
              position: relative;
              width: 100%;
              height: 12rem;

              .containerPiTime {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                z-index: 2;
                font-size: 0.75rem;
                line-height: 1rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                background-color: rgb(255 255 255 / 0.8);
                border-radius: 9999px;
              }

              .containerPiBuy {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                z-index: 2;
                font-size: 0.75rem;
                line-height: 1rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                color: #fff;
                background-color: rgb(22 93 255 / var(--tw-bg-opacity, 1));
                border-radius: 9999px;

                i {
                  margin-right: 0.25rem;
                }
              }

              .containerPiplayerBox {
                position: absolute;
                top: calc(50% - 1.7rem);
                left: calc(50% - 1.7rem);
                height: 3.4rem;
                width: 3.4rem;
                z-index: 2;

                .containerPiplayerICon {
                  height: 3.4rem;
                  width: 3.4rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 9999px;
                  background-color: rgb(255 255 255 / 0.8);

                  i {
                    font-size: 1.5rem;
                    line-height: 2rem;
                    color: rgb(22 93 255);
                  }
                }

                .containerPiplayerICon:hover {
                  @media (min-width: 768px) {
                    cursor: pointer;
                    background-color: rgb(255 255 255);
                    transform: scale(1.05);
                  }
                }
              }

              .containerPiprogress {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;

                .containerPiprogressBar {
                  height: 4px;
                  background-color: rgb(22 93 255);
                }
              }
            }

            .containerPiBox {
              padding: 1rem;

              .supplierPiTop {
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;

                .supplierPiTitle {
                  max-width: calc(100% - 3rem);
                  font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 700;
                  color: rgb(1 32 96);
                }

                .supplierPingFen {
                  font-weight: 700;
                  line-height: 1.75rem;
                  color: rgb(22 93 255);
                }

                .supplierPingFen2 {
                  line-height: 1.75rem;
                  text-decoration: line-through;
                  color: rgb(156 163 175);
                }
              }

              .containerPiTitle {
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
                color: rgb(1 32 96);
              }

              .containerPiInfo {
                margin-bottom: 1rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);
              }

              .containerPiClass {
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                .containerPiCitrm {
                  margin-left: 0.25rem;
                  margin-right: 0.25rem;
                  margin-bottom: 0.25rem;
                  display: inline-block;
                  border-radius: 9999px;
                  background-color: rgb(243 244 246);
                  padding-left: 0.5rem;
                  padding-right: 0.5rem;
                  padding-top: 0.25rem;
                  padding-bottom: 0.25rem;
                  font-size: 0.875rem;
                  line-height: 1rem;
                  color: rgb(55 65 81);
                }
              }
            }

            .containerPiPbox {
              margin-top: 1rem;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .containerPiPice {
                display: flex;
                align-items: center;

                i {
                  margin-right: 0.5rem;
                  font-size: 1rem;
                  color: rgb(107 114 128);
                }

                img {
                  border-radius: 9999px;
                  width: 2rem;
                  height: 2rem;
                  margin-right: 0.5rem;
                }

                span {
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                }
              }

              .containerPiUnit {
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: #6b7280;
              }
            }

            .containerPiRbox {
              width: calc(20% - 1rem);
              display: flex;
              flex-flow: column;
              justify-content: flex-end;
            }

            .containerPiRbtn {
              display: inline-block;
              margin: 0 1rem;
              width: calc(100% - 2rem);
              height: 40px;
              text-align: center;
              line-height: 40px;
              color: #fff;
              background-color: rgb(22 93 255 / 0.9);
              border-radius: 0.5rem;
            }

            .containerPiRbtn2 {
              display: inline-block;
              margin: 0 1rem;
              width: calc(100% - 2rem);
              height: 40px;
              text-align: center;
              line-height: 40px;
              color: #fff;
              background-color: rgb(54 207 201 / 0.9);
              border-radius: 0.5rem;
            }
          }
        }

        .containerPagination {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .containerRight {
      width: 100%;

      @media (min-width: 992px) {
        width: calc(33.3% - 1rem);
      }

      .containerLogin {
        margin-bottom: 2rem;
        padding: 1.5rem;
        border-radius: 1rem;
        color: #fff;
        background-image: linear-gradient(to bottom right, #165dff, #36cfc9);
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          padding: 1rem;
        }

        .containerLoginIcon {
          flex-shrink: 0;
          padding: 0.5rem;
          background-color: rgb(255 255 255 / 0.2);
          border-radius: 0.5rem;
          margin-right: 0.75rem;

          i {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }

        .containerLoginName {
          font-weight: 700;
          line-height: 1.5rem;
        }

        .containerLoginTips {
          opacity: 0.8;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }

        button {
          margin-top: 1rem;
          display: block;
          width: 100%;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          text-align: center;
          font-weight: 500;
          border-radius: 0.5rem;
          color: rgb(22 93 255);
          background-color: rgb(243 244 246);
        }

        .containerLoginMy {
          margin-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .containerLoginMn {
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2rem;
          text-align: center;
        }

        .containerLoginMt {
          opacity: 0.8;
          font-size: 0.875rem;
          line-height: 1.25rem;
          text-align: center;
        }
      }

      .containerHot {
        padding: 1.5rem;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 992px) {
          padding: 1rem;
        }

        .containerHotTitle {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 700;
        }

        .containerHotItem {
          margin-bottom: 1rem;
          padding: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgb(249 250 251);
          border-radius: 0.5rem;

          .containerHotLeft {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .containerHimg {
              width: 4rem;
              height: 4rem;
              border-radius: 0.5rem;
              margin-right: 1rem;
            }

            .containerHcbox {
              .containerHctitle {
                font-weight: 500;
                line-height: 1.5rem;
              }

              .containerHcinfo {
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: #6b7280;
              }
            }
          }

          .containerHpice {
            font-weight: 700;
            color: rgb(22 93 255);
          }
        }

        .containerHotItem:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            animation: jumpUpwards 300ms ease-in-out forwards;
          }
        }

        .containerHMore {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 500;
          color: rgb(22 93 255);

          button {
            color: rgb(22 93 255);
            line-height: 1.5rem;
          }
        }

        .containerHMore:hover {
          @media (min-width: 768px) {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.productsPage {
  .el-input__wrapper {
    border-radius: 0.5rem;
  }

  .btn-prev {
    color: rgb(107 114 128) !important;
    font-weight: 500 !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    padding: 0.5rem 0.75rem !important;
    background-color: #fff !important;
    border: 1px solid rgb(209 213 219) !important;
    border-radius: 0.25rem !important;
  }

  .btn-next {
    color: rgb(107 114 128) !important;
    font-weight: 500 !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    padding: 0.5rem 0.75rem !important;
    background-color: #fff !important;
    border: 1px solid rgb(209 213 219) !important;
    border-radius: 0.25rem !important;
  }

  .el-input__wrapper {
    border-radius: 0.5rem;
  }

  .el-select__wrapper {
    background-color: #e9e9ed;
    border-radius: 0.5rem;
  }

  .el-select__selected-item {
    color: rgb(1 32 96);
  }

  .el-select__icon {
    color: rgb(1 32 96);
  }
}
</style>
