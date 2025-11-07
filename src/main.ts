import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'
const app = createApp(App)

// Vue Meta seo优化
const head = createHead()
app.use(head)

// 自定义样式 custom style
import '@/styleSheet/animate.min.css'
import '@/styleSheet/index.scss'

// font-awesome style
import 'font-awesome/css/font-awesome.min.css'

// vue3-seamless-scroll
import vue3SeamlessScroll from 'vue3-seamless-scroll'
app.use(vue3SeamlessScroll, {
  name: 'vue3-seamless-scroll',
})

// 路由 router
import router from './router'
app.use(router)

// 状态管理工具 pinia
import pinia from './store'
app.use(pinia)

// UI Element Plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css'
app.use(ElementPlus, { locale: zhCn });

// 图标 Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
