<script setup lang="ts">
import dayjs from 'dayjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import pageJump from '@/hooks/pageJump'
import { fileURL } from '@/api/baseConfig'
import { articledetailApi, articlesrecommendedApi } from '@/api/modules/article'

// 路由信息
const route = useRoute()

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 文章详情
const articlesid: any = ref('')
const articledetail: any = ref({})

function getArticlesdetail() {
  articledetailApi(articlesid.value).then((res: any) => {
    articledetail.value = res
  })
}

// 用户端-获取最新6条推荐文章（公开接口）
const articlesRecommended: any = ref([])

function getArticlesrecommended() {
  articlesrecommendedApi().then((res: any) => {
    if (res) {
      articlesRecommended.value = res
    }
    // res.forEach((element: any) => {
    //   articlesRecommended.value.push(element)
    // });
  })
}

// 相关推荐 查看详情
function xgtjDetailClick(item: any) {
  // 新建页面login-banner.jpg
  const url = window.location.href.split('?articlesid=')[0] + `?articlesid=${item.id}`
  window.open(url, '_blank')
  // 当前页面login-banner.jpg
  // pageJump('products_detail', {
  //   id: item.id,
  //   name: pathname.value,
  // })
  // setTimeout(() => {
  //   location.reload()
  // }, 200)
}


onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  articlesid.value = route.query.articlesid
  getArticlesdetail()
  getArticlesrecommended()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="ndPage">
    <div class="ndHbox">
      <div class="ndHcontent">
        <div class="ndNavigation">
          <span @click="pageJump('home')">首页</span>
          <span class="ndNavigationXg">/</span>
          <span @click="pageJump('news')">热点资讯</span>
          <span class="ndNavigationXg">/</span>
          <span class="ndNavigationSp">{{ articledetail.title }}</span>
        </div>
      </div>
    </div>
    <div class="ndCbox">
      <div class="ndCtitle">{{ articledetail.title }}</div>
      <div class="ndSubtitle">
        <span>文章来源：{{ articledetail.source }}</span>
        <span>发布时间：{{ dayjs(articledetail.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <!-- <div class="ndCzuoz">
        <img src="@/assets/32.jpg" alt="" />
        <div class="zuozeInfo">
          <p>作者：李明</p>
          <p>科睿易晶工程研究院 BIM技术专家</p>
        </div>
      </div> -->
      <div class="ndCFuwb">
        <div v-html="articledetail.content"></div>
      </div>
      <div v-if="articledetail.keywords" class="ndCTags">
        <div class="ndcTagLabel">标签：</div>
        <div v-for="(item, index) in articledetail.keywords.split(',')" :key="index" class="ndcTag">{{ item }}</div>
      </div>
      <!-- <div class="ndCzuobtm">
        <img src="@/assets/32.jpg" alt="" />
        <div class="zuozeInfo">
          <p>作者：李明</p>
          <p>科睿易晶工程研究院 BIM技术专家</p>
          <p>
            李明先生是国内知名的BIM技术专家，曾参与多个国家级重点工程的BIM技术应用，包括上海中心大厦、北京大兴国际机场等项目。在BIM技术研发、标准制定和工程应用方面有丰富经验。
          </p>
        </div>
      </div> -->

      <!-- <div class="ndCtitle2">相关推荐</div>
      <div class="newsdBox">
        <div class="newsdItem" v-for="(item, index) in articlesRecommended" :key="index"
          :style="(index + 1) % 3 === 0 ? 'margin-right: 0' : ''" @click="xgtjDetailClick(item)">
          <div class="newsPiImgBox">
            <img v-if="item.thumbnail" :src="fileURL + item.thumbnail" class="newsPiImg" />
            <div class="newsPiImgTag">{{ item.cate_name }}</div>
          </div>
          <div class="newsPiBox" :style="windowWidth > 992 ? '' : 'margin-top:1rem; width: 100%;'">
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
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ndPage {
  overflow-x: hidden;
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;

  .ndHbox {
    background-color: #f0f7ff;
    border-bottom: 1px solid #e0e7ff;

    .ndHcontent {
      margin: 0 auto;
      padding: 6rem 2rem 1rem;
      width: 100%;
      max-width: 1400px;
      color: rgb(1 32 96);

      @media (max-width: 992px) {
        padding: 5rem 1rem 1rem;
      }

      .ndNavigation {
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

        .ndNavigationXg {
          margin: 0 0.5rem;
        }

        .ndNavigationSp {
          color: #1f3e85;
        }
      }
    }
  }

  .ndCbox {
    position: relative;
    margin: 1rem;
    padding: 1rem;
    max-width: 1400px;
    color: rgb(1 32 96);
    background-color: #fff;
    border-radius: 1rem;
    border: 1px solid #e0e7ff;

    @media (min-width: 768px) {
      width: 100%;
      margin: 2rem auto;
      padding: 2.5rem;
    }

    .ndCtitle {
      margin-bottom: 1.5rem;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 700;
      text-align: center;
    }

    .ndSubtitle {
      margin-bottom: 1rem;
      text-align: center;

      span {
        margin: 0 0.5rem;
        color: rgb(107 114 128);
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }

    .ndCtitle2 {
      margin-bottom: 1.5rem;
      font-size: clamp(1.25rem, 4vw, 1.5rem);
      font-weight: 700;
    }

    .ndCzuoz {
      margin-bottom: 1rem;
      display: flex;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .zuozeInfo {
        margin-left: 1rem;

        p:first-child {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }

        p:last-child {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(107 114 128);
        }
      }
    }

    .ndCFuwb {
      padding: 1rem 0;
      line-height: 180%;
      // background-color: #f1f1f1;
      // border-radius: 0.5rem;
    }

    .ndCTags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-top: 1px solid rgb(229 231 235);
      padding: 1.5rem 0 0;

      .ndcTagLabel {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: rgb(75 85 99);
      }

      .ndcTag {
        margin: 0 0.5rem 0.5rem 0;
        font-size: 0.875rem;
        line-height: 1.25rem;
        padding: 0.25rem 0.75rem;
        background-color: rgb(243 244 246);
        border-radius: 9999px;
      }

      .ndcTag:hover {
        @media (min-width: 768px) {
          cursor: pointer;
          color: #fff;
          background-color: #1f3e85;
        }
      }
    }

    .ndCzuobtm {
      margin-bottom: 3rem;
      padding: 1.5rem;
      background-color: rgb(249 250 251);
      border-radius: 0.75rem;
      display: flex;

      @media (max-width: 768px) {
        padding: 1rem;
      }

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;

        @media (max-width: 768px) {
          width: 3rem;
          height: 3rem;
        }
      }

      .zuozeInfo {
        margin-left: 1rem;

        p:nth-child(2) {
          margin-bottom: 0.75rem;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(107 114 128);
        }

        p:first-child {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }

        p:last-child {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(55 65 81);
        }
      }
    }

    .newsdBox {
      display: flex;
      flex-wrap: wrap;

      @media (min-width: 768px) {
        width: calc(100% + 1.5rem);
      }

      .newsdItem {
        margin-right: 1.5rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        width: calc(33.3% - 1rem);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        border-radius: 0.75rem;

        @media (max-width: 992px) {
          margin-right: 0;
          width: 100%;
        }

        .newsPiImgBox {
          position: relative;

          .newsPiImg {
            width: 100%;
            height: 200px;
          }

          .newsPiImgTag {
            position: absolute;
            top: 1rem;
            left: 1rem;
            z-index: 2;
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
          width: 100%;

          .newsPiTitle {
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            margin: 0.75rem 0;
            color: rgb(1 32 96);
          }

          .newsPiInfo {
            margin-bottom: 1rem;
            line-height: 1.25rem;
            color: rgb(75 85 99);
          }

          .newsPiClass {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .newsPiCleft {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .newsPiCitrm {
                margin-right: 1rem;
                display: flex;
                align-items: center;
                color: rgb(107 114 128);
                font-size: 0.875rem;

                .newsPiClassSpan {
                  margin-left: 0.25rem;
                  font-size: 0.875rem;
                  line-height: 1rem;
                }
              }
            }

            .newsPiCright {
              display: flex;
              align-items: center;
              font-weight: 500;
              line-height: 1.5rem;
              font-size: 0.875rem;
              color: #1f3e85;

              button {
                margin-right: 0.5rem;
                font-size: 0.875rem;
                color: #1f3e85;
              }
            }
          }
        }
      }

      .newsdItem:last-child {
        @media (max-width: 768px) {
          margin-bottom: 0;
        }
      }

      .newsdItem:hover {
        @media (max-width: 768px) {
          cursor: pointer;
        }
      }

    }
  }
}
</style>
