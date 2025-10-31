<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { articlebyurlApi } from '@/api/modules/article'

// 路由信息
const route = useRoute()

// 可视窗口宽度
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

// 文章详情
const theurl: any = ref('')
const articledetail: any = ref({})

function getArticlebyurl() {
  articlebyurlApi(theurl.value).then((res: any) => {
    articledetail.value = res
    useHead({
      title: res.title,
      meta: [
        { name: 'description', content: res.keywords },
      ]
    })
  })
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
        <div v-html="articledetail.content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adPage {
  overflow-x: hidden;
  min-height: calc(100vh - 120px);
  background: #fff;

  .adCbox {
    position: relative;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 2.5rem 1rem;
    width: 100%;
    max-width: 1400px;
    min-height: calc(100vh - 562px);

    @media (max-width: 768px) {
      margin-top: 4rem;
      padding: 1rem;
    }

    .adCFuwb {
      padding: 1rem 0;
      word-break: break-all;
    }
  }
}
</style>
