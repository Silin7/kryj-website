<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pageJump from '@/hooks/pageJump'
import windowOpen from '@/hooks/windowOpen'
import { fileURL } from '@/api/baseConfig'
import { bannerlistApi, secpositionsApi, syspseoApi } from '@/api/modules/basic'
import { articlescatesApi, articlesApi, articlescateApi } from '@/api/modules/article'

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

// 用户端-获取所有启用的文章分类（公开接口）
const articlescates: any = ref([])

function getArticlescates() {
  articlescatesApi().then((res: any) => {
    articlescates.value = res
  })
}

// 文章分类 active
const articlesAid: any = ref('')

function articlesChange(id: string) {
  articlesAid.value = id
  if (id === '') {
    getArticles()
  } else {
    getArticlescate()
  }
}

const currentPage: any = ref(1)
const pageSize: any = ref(10)
const total: any = ref(0)
const articles: any = ref([])

// 用户端-文章列表
function getArticles() {
  articlesApi({
    page: currentPage.value,
    pageSize: pageSize.value,
    cateId: articlesAid.value,
    // IN DOUBT cateId 查询条件无效
  }).then((res: any) => {
    if (res) {
      total.value = res.total
      articles.value = res.items
    }
  })
}

// 用户端-按分类ID获取文章列表
function getArticlescate() {
  articlescateApi(articlesAid.value, {
    page: currentPage.value,
    pageSize: pageSize.value,
  }).then((res: any) => {
    if (res) {
      total.value = res.total
      articles.value = res.items
    }
  })
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  getSecpositions()
  getArticlescates()
  getArticles()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="newsPage">
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

    <div class="newsBox">
      <div class="newsLeft">
        <!-- 资讯分类 -->
        <div class="newsClass">
          <div class="newsClassRow">
            <button :class="articlesAid === '' ? 'newsClassColActive' : 'newsClassCol'" @click="articlesChange('')">
              全部
            </button>
            <button v-for="(item, index) in articlescates" :key="index"
              :class="articlesAid === item.id ? 'newsClassColActive' : 'newsClassCol'" @click="articlesChange(item.id)">
              {{ item.name }}
            </button>
          </div>
        </div>
        <!-- 资讯列表 -->
        <div class="newsProducts">
          <div class="newsProductsTitle">
            <div class="newsProductsTitleText">最新资讯</div>
          </div>
          <div v-if="total > 0" class="newsProductsBox">
            <div class="newsProductsItem" v-for="(item, index) in articles" :key="index" @click="
              pageJump('news_detail', {
                articlesid: item.id,
              })
              ">
              <div class="newsPiImgBox">
                <img :src="fileURL + item.thumbnail" class="newsPiImg" />
                <div class="newsPiImgTag">政策</div>
              </div>
              <div class="newsPiBox">
                <div class="newsPiTitle">{{ item.title }}</div>
                <div class="newsPiInfo">
                  {{ item.description }}
                </div>
                <div class="newsPiClass">
                  <div class="newsPiCleft">
                    <div class="newsPiCitrm">
                      <i class="fa fa-calendar"></i>
                      <span class="newsPiClassSpan">{{ item.created_at }}</span>
                    </div>
                    <div class="newsPiCitrm">
                      <i class="fa fa-eye"></i>
                      <span class="newsPiClassSpan">{{ item.views }}次预览</span>
                    </div>
                    <!-- <div class="newsPiCitrm">
                      <i class="fa fa-comment-o"></i>
                      <span class="newsPiClassSpan">42条评论</span>
                    </div> -->
                  </div>
                  <div v-if="windowWidth > 480" class="newsPiCright">
                    <button>阅读全文</button>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </div>
                <div v-if="windowWidth <= 480" class="newsPiClass" style="margin-top: 1rem">
                  <div class="newsPiCleft">
                    <div class="newsPiCright">
                      <button>阅读全文</button>
                      <i class="fa fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="newsPagination">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" size="default" background
                layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="total"
                @current-change="getArticles" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.newsPage {
  background-color: #f9fafb;
  min-height: calc(100vh - 120px);
  overflow-x: hidden;

  .newsBox {
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    max-width: 1400px;

    @media (min-width: 992px) {
      padding: 4rem 1rem;
    }

    .newsLeft {
      width: 100%;

      .newsClass {
        margin-bottom: 2rem;
        padding: 1.5rem 1.5rem 0.75rem 1.5rem;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          padding: 1rem 1rem 0.5rem;
        }

        .newsClassRow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          line-height: 1.5rem;

          .newsClassCol {
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

          .newsClassCol:hover {
            @media (min-width: 768px) {
              background-color: rgb(243 244 246);
            }
          }

          .newsClassColActive {
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

      .newsProducts {
        // margin-bottom: 2rem;
        padding: 2rem;
        border-radius: 1rem;
        color: rgb(1 32 96);
        background-color: #fff;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          padding: 1rem;
        }

        .newsProductsTitle {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .newsProductsTitleText {
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .newsProductsTitlePxfs {
            display: flex;
            align-items: center;

            span {
              color: rgb(75 85 99);
            }
          }
        }

        .newsProductsBox {
          .newsProductsItem {
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            box-shadow:
              0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            border-radius: 0.75rem;

            @media (max-width: 768px) {
              padding: 1rem;
              display: block;
            }

            .newsPiImgBox {
              position: relative;
              width: calc(25% - 0.75rem);

              @media (max-width: 768px) {
                width: 100%;
              }

              .newsPiImg {
                width: 100%;
                height: 200px;
              }

              .newsPiImgTag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                z-index: 10;
                border-radius: 9999px;
                padding-left: 0.75rem;
                padding-right: 0.75rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 700;
                color: #fff;
                background-color: rgb(59 130 246);
              }
            }

            .newsPiBox {
              width: calc(75% - 0.75rem);

              @media (max-width: 768px) {
                margin-top: 1rem;
                width: 100%;
              }

              .newsPiTitle {
                margin-bottom: 1rem;
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: 700;
                color: rgb(1 32 96);
              }

              .newsPiInfo {
                margin-bottom: 1rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);

                @media (min-width: 768px) {
                  min-height: 7rem;
                }
              }

              .newsPiClass {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .newsPiCleft {
                  display: flex;
                  align-items: center;

                  .newsPiCitrm {
                    margin-right: 1rem;
                    display: flex;
                    align-items: center;
                    color: rgb(107 114 128);
                    font-size: 0.875rem;

                    .newsPiClassSpan {
                      margin-left: 0.25rem;
                    }
                  }
                }

                .newsPiCright {
                  display: flex;
                  align-items: center;
                  font-weight: 500;
                  line-height: 1.5rem;
                  font-size: 0.875rem;
                  color: rgb(22 93 255);

                  button {
                    margin-right: 0.5rem;
                    font-size: 0.875rem;
                    color: rgb(22 93 255);
                  }
                }
              }
            }
          }

          .newsProductsItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              animation: jumpUpwards 300ms ease-in-out forwards;
            }
          }

          .newsPagination {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }

  .newsFx {
    padding: 4rem 1rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
.newsPage {
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
