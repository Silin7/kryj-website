<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import pageJump from '@/hooks/pageJump'
import { fileURL } from '@/api/baseConfig'
import { articlescateApi, suppliercasescertidApi } from '@/api/modules/supplier'

// 路由信息
const route = useRoute()

const alid: any = ref('')
const alDetails: any = ref({})

function getSupplierdetail() {
  // 案例详情
  suppliercasescertidApi(alid.value).then((res: any) => {
    if (res) {
      alDetails.value = res.data
    }
  })
}
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  alid.value = route.query.alid
  getSupplierdetail()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="sdPage">
    <div class="sdHbox">
      <div class="sdHcontent">
        <div class="sdNavigation">
          <span @click="pageJump('home')">首页</span>
          <span class="sdNavigationXg">/</span>
          <span @click="pageJump('supplier')">供应商列表</span>
          <span class="sdNavigationXg">/</span>
          <span class="sdNavigationXg" @click="pageJump('supplier_detail', { supplierid: alDetails.company_id })">
            {{ alDetails.company_name }}
          </span>
          <span class="sdNavigationXg">/</span>
          <span class="sdNavigationSp">
            {{ alDetails.name }}
          </span>
        </div>

        <div class="sdhGys">
          <img v-if="alDetails.case_imgs" :src="fileURL + alDetails.case_imgs[0]" alt="企业图片" class="supplierPiImg" />
          <div class="sdhgCenter">
            <div class="sdhgcTop">
              <div class="sdhgctTitle">{{ alDetails.name }}</div>
              <!-- <div class="sdhgctInfo">
                <i class="fa fa-star"></i>
                <span>4.8</span>
                <span>|</span>
                <span>优质供应商</span>
              </div> -->
            </div>
            <div class="sdhgcCbox">
              <div class="sdhgcCitem">
                <i class="fa fa-calendar"></i>
                <span>项目周期：{{ alDetails.start_time_str }} 至 {{ alDetails.end_time_str }}</span>
              </div>
              <div class="sdhgcCitem">
                <i class="fa fa-building-o"></i>
                <span>服务企业：{{ alDetails.company_name }}</span>
              </div>
            </div>
            <div class="sdhgcTags">
              <div v-for="(item, index) in alDetails.case_tags" :key="index" class="sdhgcTag">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sdCbox">
      <div class="sdcIContent">
        <div class="sdclGsjj">
          <div class="sdclxTitle">案例简介</div>
          <div class="sdclxSub">{{ alDetails.description }}</div>
          <div class="fengebox"></div>
          <div class="sdclxTitle">项目概况</div>
          <div class="sdclxSub" v-html="alDetails.content"></div>
          <div class="fengebox"></div>
          <div class="frcc">
            <div class="gobackcompany" @click="pageJump('supplier_detail', { supplierid: alDetails.company_id })">
              <i class="fa fa-arrow-left mr-2"></i>
              返回到{{ alDetails.company_name }}详情页
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sdPage {
  min-height: calc(100vh - 120px);
  background-color: #f9fafb;
  overflow-x: hidden;

  .sdHbox {
    background-color: #f0f7ff;
    border-bottom: 1px solid #e0e7ff;

    .sdHcontent {
      margin: 0 auto;
      padding: 6rem 2rem 2rem;
      width: 100%;
      max-width: 1400px;
      color: rgb(1 32 96);

      @media (max-width: 992px) {
        padding: 5rem 1rem 1rem;
      }

      .sdNavigation {
        margin: 0 auto 1.5rem;

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

        .sdNavigationXg {
          margin: 0 0.5rem;
        }

        .sdNavigationSp {
          color: #1f3e85;
        }
      }

      .sdhGys {
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
        }

        img {
          padding: 0.25rem;
          width: calc(100% - 0.5rem);
          height: 8rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

          @media (min-width: 992px) {
            width: 18%;
          }
        }

        .sdhgCenter {
          margin-top: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            margin-top: 0;
            width: calc(100% - 20rem);
          }

          .sdhgcTop {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .sdhgctTitle {
              font-weight: 700;
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              color: rgb(1 32 96);
            }

            .sdhgctInfo {
              margin-top: 1rem;
              font-weight: 500;
              font-size: 0.875rem;
              line-height: 1.25rem;
              padding: 0.25rem 0.75rem;
              color: rgb(255 255 255);
              background-color: rgb(131 203 172);
              border-radius: 9999px;

              @media (min-width: 992px) {
                margin-top: 0;
                margin-left: 1rem;
              }

              span {
                margin-left: 0.25rem;
              }
            }
          }

          .sdhgcCbox {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .sdhgcCitem {
              width: 100%;
              height: 3rem;
              display: flex;
              align-items: center;

              @media (min-width: 992px) {
                width: calc(50% - 0.5rem);
              }

              i {
                flex-shrink: 0;
                font-size: 1rem;
                width: 1rem;
                color: #1f3e85;
                margin-right: 0.5rem;
              }

              span {
                color: rgb(75 85 99);
              }
            }
          }

          .sdhgcTags {
            display: flex;
            flex-wrap: wrap;

            .sdhgcTag {
              flex-shrink: 0;
              margin-right: 0.5rem;
              margin-bottom: 0.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              padding: 0.25rem 0.75rem;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 9999px;
              color: #1f3e85;
            }
          }
        }

        .sdhgRight {
          margin-top: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            margin-top: 0;
            width: 10rem;
          }

          .sdhgcLxgys {
            padding: 0.75rem 1rem;
            width: 100%;
            text-align: center;
            font-weight: 500;
            line-height: 1.5rem;
            color: #fff;
            background-color: rgb(22 93 255 / 0.9);
            border-radius: 0.5rem;

            i {
              margin-right: 0.5rem;
            }
          }

          .sdhgcJrgwc {
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            width: 100%;
            text-align: center;
            font-weight: 500;
            line-height: 1.5rem;
            color: rgb(55 65 81);
            border: 1px solid rgb(209 213 219);
            border-radius: 0.5rem;

            i {
              margin-right: 0.5rem;
            }
          }
        }
      }
    }
  }

  .sdCbox {
    position: relative;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 1400px;
    color: rgb(1 32 96);

    @media (max-width: 768px) {
      padding: 1rem;
    }

    .sdcIContent {
      width: 100%;

      .sdclFl {
        overflow-x: auto;
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 2rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (max-width: 768px) {
          margin-bottom: 1rem;
        }

        button {
          flex-shrink: 0;
          font-size: 1.125rem;
          line-height: 1.75rem;
          padding: 1rem 1.5rem;
          color: rgb(55 65 81);
        }

        .sdclflAc {
          color: #1f3e85;
          border-bottom: 2px solid #1f3e85;
        }
      }

      .sdclGsjj {
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
        }

        .fengebox {
          width: 100%;
          height: 1rem;
        }

        .gobackcompany {
          margin: 0 auto;
          display: inline-block;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          border-radius: 0.5rem;
          line-height: 30px;
          color: #1f3e85;
          border: 1px solid #1f3e85;
        }

        .gobackcompany:hover {
          @media (min-width: 768px) {
            cursor: pointer;
            color: rgb(255 255 255);
            background-color: #1f3e85;
          }
        }

        .sdclxTitle {
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
          border-bottom: 1px solid rgb(243 244 246);
        }

        .sdclxSub {
          margin-bottom: 1rem;
          line-height: 1.625;
          font-size: 1.125rem;
          color: rgb(55 65 81);
        }

        .sdclxItem {
          margin-top: 1.5rem;

          .sdclxiTitle {
            margin-bottom: 0.75rem;
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.75rem;
          }

          .sdclxiIbox {
            @media (min-width: 992px) {
              display: flex;
              justify-content: space-between;
            }
          }

          .sdclxiInfo {
            margin-bottom: 1rem;
            padding: 1rem;
            line-height: 1.5rem;
            background-color: rgb(240 247 255);
            border-radius: 0.75rem;

            @media (min-width: 992px) {
              padding: 1.5rem;
              width: calc(33.3% - 0.5rem);
            }

            .sdclxiFa {
              margin-bottom: 1rem;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 3rem;
              height: 3rem;
              color: #1f3e85;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 0.5rem;
            }

            .sdclxiTt {
              font-weight: 700;
              font-size: 1.125rem;
              line-height: 1.75rem;
              margin-bottom: 0.5rem;
            }

            .sdclxiSt {
              color: rgb(75 85 99);
            }
          }

          .sdclxiCgBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .sdclxiCgItem {
              overflow: hidden;
              margin-bottom: 1rem;
              width: 100%;
              background-color: rgb(255 255 255);
              border-radius: 0.5rem;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
              border: 1px solid rgb(229 231 235);

              @media (min-width: 992px) {
                margin-bottom: 0;
                width: calc(25% - 0.5rem);
              }

              img {
                width: 100%;
                height: 10rem;
              }

              .sdclxicIp {
                font-size: 0.875rem;
                line-height: 1.25rem;
                text-align: center;
                padding: 0.75rem;
              }
            }

            .sdclxiCgItem:last-child {
              margin-bottom: 0;
            }

            .sdclxiCgItem:hover {
              @media (min-width: 768px) {
                cursor: pointer;
              }
            }
          }
        }

        .sdLxfsBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .sdLxfsItem {
            margin-bottom: 1rem;
            width: calc(100%);
            padding: 1rem;
            background-color: rgb(240 247 255);
            border-radius: 0.75rem;

            @media (min-width: 992px) {
              padding: 1.5rem;
            }

            .sdLxfsIbox {
              flex-shrink: 0;
              width: 3rem;
              height: 3rem;
              color: #1f3e85;
              background-color: rgb(22 93 255 / 0.1);
              border-radius: 0.5rem;
            }

            .sdLxfsGsdz {
              margin-left: 1rem;

              p:first-child {
                font-weight: 700;
                font-size: 1.125rem;
                line-height: 1.75rem;
                margin: 0 0 0.5rem;
              }

              p:last-child {
                color: rgb(55 65 81);
                margin: 0;
              }
            }

            .sdLxfsFsdz {
              box-sizing: border-box;
              margin-top: 1rem;
              width: 100%;
              height: 12rem;
              border-width: 1px;
              border-radius: 0.5rem;

              @media (min-width: 992px) {
                margin: 1rem 0 0 4rem;
                width: calc(100% - 8rem);
              }
            }

            .sdLxfsRi {
              display: flex;
              margin-bottom: 1.5rem;

              .sdLxfsRiFa {
                flex-shrink: 0;
                width: 2.5rem;
                height: 2.5rem;
                color: #1f3e85;
                background-color: rgb(22 93 255 / 0.1);
                border-radius: 9999px;
              }

              .sdLxfsRiCt {
                margin-left: 1rem;

                p {
                  margin-bottom: 0.25rem;
                  font-weight: 500;
                  line-height: 1.5rem;
                  color: rgb(55 65 81);
                }

                p:first-child {
                  color: rgb(1 32 96);
                }

                a {
                  display: inline-block;
                  margin-bottom: 0.25rem;
                  font-weight: 500;
                  line-height: 1.5rem;
                  color: #1f3e85;
                }
              }

              .sdLxfsEwm {
                box-sizing: border-box;
                padding: 0.25rem;
                width: 7rem;
                height: 7rem;
                border-radius: 0.5rem;
                background-color: #fff;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
              }

              .sdLxfsEbox {
                margin-left: 1rem;
                height: 7rem;
                display: flex;
                flex-flow: column;
                justify-content: center;

                p:first-child {
                  line-height: 1.5rem;
                  font-weight: 500;
                  margin-bottom: 0.25rem;
                  color: rgb(1 32 96);
                }

                p:last-child {
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
                }
              }
            }

            .sdLxfsRi:last-child {
              margin-bottom: 0;
            }
          }

          .sdLxfsItem:last-child {
            margin-bottom: 0;

            @media (min-width: 992px) {
              width: calc(50% - 1rem);
            }
          }
        }
      }

      .sdclHzal {
        padding: 1rem;
        background-color: rgb(255 255 255);
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        @media (min-width: 992px) {
          padding: 1.5rem;
        }

        .sdclHzalRow {
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .sdclHzalCol {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: rgb(1 32 96);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid rgb(243 244 246);
            border-radius: 9999px;

            @media (max-width: 768px) {
              margin: 0 0.5rem 0.5rem 0;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }

          .sdclHzalCol:hover {
            @media (min-width: 768px) {
              background-color: rgb(243 244 246);
            }
          }

          .sdclHzalColActive {
            margin: 0 0.75rem 0.75rem 0;
            padding: 0.5rem 1.25rem;
            color: #fff;
            background-color: #1f3e85;
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

        .sdclHzalBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .sdclHzalItem {
            overflow: hidden;
            margin-bottom: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid rgb(229 231 235);

            @media (min-width: 992px) {
              width: calc(50% - 0.75rem);
            }

            .sdclHzalImgBox {
              position: relative;
              width: 100%;

              .sdclHzalImg {
                width: 100%;
                height: 14rem;
              }

              .sdclHzalImgTag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                z-index: 2;
                border-radius: 0.25rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 700;
                color: #fff;
                background-color: #1f3e85;
              }
            }

            .sdclHzalBox {
              width: 100%;
              padding: 1rem;

              @media (min-width: 992px) {
                padding: 1.5rem;
              }

              .sdclHzalTitle {
                width: 100%;
                margin-bottom: 1rem;
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: 700;
                color: rgb(1 32 96);
              }

              .sdclHzalInfo {
                margin-bottom: 1rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);
              }

              .sdclHzalClass {
                margin-bottom: 1rem;
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .sdclHzalCitrm {
                  margin-right: 0.5rem;
                  padding: 0.25rem 0.5rem;
                  font-size: 0.875rem;
                  line-height: 1rem;
                  color: rgb(75 85 99);
                  background-color: rgb(243 244 246);
                  border-radius: 0.25rem;
                }

                .sdclHzalCitrm:last-child {
                  margin-right: 0;
                }
              }

              .sdclHzalCright {
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

          .sdclHzalItem:last-child {
            @media (max-width: 992px) {
              margin-bottom: 0;
            }
          }

          .sdclHzalItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
            }
          }
        }

        .sdclCplbBox {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .sdclCplbItem {
            overflow: hidden;
            margin-bottom: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid rgb(229 231 235);

            @media (min-width: 992px) {
              width: calc(33.3% - 0.75rem);
            }

            .sdclCplbImgBox {
              position: relative;
              width: 100%;

              .sdclCplbImg {
                width: 100%;
                height: 12rem;
              }

              .sdclCplbImgTag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                z-index: 2;
                border-radius: 0.25rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 700;
                color: #fff;
                background-color: #1f3e85;
              }
            }

            .sdclCplbBox2 {
              width: 100%;
              padding: 1rem;

              @media (min-width: 992px) {
                padding: 1.5rem;
              }

              .sdclCplbTitle {
                margin-bottom: 1rem;
                font-size: 1.125rem;
                line-height: 1.75rem;
                font-weight: 700;
                color: rgb(1 32 96);
              }

              .sdclCplbInfo {
                margin-bottom: 1rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: rgb(75 85 99);
              }

              .sdclCplbCbtm {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .sdclCplbCprice {
                  font-weight: 700;
                  color: #1f3e85;
                }

                .sdclCplbCright {
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

          .sdclCplbItem:last-child {
            @media (max-width: 992px) {
              margin-bottom: 0;
            }
          }

          .sdclCplbItem:hover {
            @media (min-width: 768px) {
              cursor: pointer;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            }

            .sdclCplbImg {
              transform: scale(1.05);
            }

            .sdclCplbTitle {
              color: #1f3e85;
            }
          }
        }
      }
    }
  }
}
</style>

<style>
/* 评分 style */
.el-rate {
  padding-bottom: 0.25rem !important;
}

.sdcrTop .el-rate__icon {
  margin-right: 0 !important;
}
</style>
