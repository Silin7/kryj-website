<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { upaywycyxApi, upayszcApi, upachildysxyApi } from '@/api/interface'

// 路由信息
const route = useRoute()

// 可视窗口宽度
const windowWidth: any = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 文章详情
const theurl: any = ref('')
const articledetail: any = ref({})

function getArticlebyurl() {
  if (theurl.value === 'upaywycyxApi') {
    upaywycyxApi().then((res: any) => {
      articledetail.value = res.data
    })
  }
  if (theurl.value === 'upayszcApi') {
    upayszcApi().then((res: any) => {
      articledetail.value = res.data
    })
  }
  if (theurl.value === 'upachildysxyApi') {
    upachildysxyApi().then((res: any) => {
      articledetail.value = res.data
    })
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  theurl.value = route.query.theurl
  getArticlebyurl()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="adPage">
    <div class="adCbox">
      <div class="adCFuwb">
        <div v-html="articledetail.contentDetails"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adPage {
  overflow-x: hidden;
  min-height: calc(100vh - 88px);
  background: #fff;

  @media (max-width: 768px) {
    min-height: calc(100vh - 112px);
  }

  .adCbox {
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
    padding: 2.5rem 1rem;
    width: 100%;
    max-width: 1400px;
    min-height: calc(100vh - 562px);

    @media (max-width: 768px) {
      margin-top: 100px;
      padding: 1rem;
    }

    .adCFuwb {
      padding: 1rem 0;
      word-break: break-all;
    }
  }
}
</style>
