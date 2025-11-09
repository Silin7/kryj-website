import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import useHeaderStore from '@/store/modules/header'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '系统首页',
      stcode: 'home',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/scheme',
    name: 'scheme',
    component: () => import('@/views/scheme.vue'),
    meta: {
      title: '数字技术应用论证/数字实施方案论证',
      stcode: 'scheme',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/materials',
    name: 'materials',
    component: () => import('@/views/materials.vue'),
    meta: {
      title: '材料/设备',
      stcode: 'materials',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/sale',
    name: 'sale',
    component: () => import('@/views/sale.vue'),
    meta: {
      title: '智能建造装备',
      stcode: 'sale',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/products.vue'),
    meta: {
      title: '信息化产品/服务',
      stcode: 'products',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/products_detail',
    name: 'products_detail',
    component: () => import('@/views/products_detail.vue'),
    meta: {
      title: '信息化产品/服务',
      stcode: 'products',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/datasolution',
    name: 'datasolution',
    component: () => import('@/views/datasolution.vue'),
    meta: {
      title: '数据方案组价',
      stcode: 'datasolution',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/requirements',
    name: 'requirements',
    component: () => import('@/views/requirements.vue'),
    meta: {
      title: '数据方案组价',
      stcode: 'datasolution',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('@/views/ai.vue'),
    meta: {
      title: 'AI赋能应用',
      stcode: 'ai',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/ai_detail',
    name: 'ai_detail',
    component: () => import('@/views/ai_detail.vue'),
    meta: {
      title: 'AI赋能应用',
      stcode: 'ai',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/aicase_detail',
    name: 'aicase_detail',
    component: () => import('@/views/aicase_detail.vue'),
    meta: {
      title: 'AI赋能应用',
      stcode: 'ai',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video.vue'),
    meta: {
      title: '视频演示',
      stcode: 'video',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/video_detail',
    name: 'video_detail',
    component: () => import('@/views/video_detail.vue'),
    meta: {
      title: '视频演示',
      stcode: 'video',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/supplier',
    name: 'supplier',
    component: () => import('@/views/supplier.vue'),
    meta: {
      title: '供应商',
      stcode: 'supplier',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/supplier_detail',
    name: 'supplier_detail',
    component: () => import('@/views/supplier_detail.vue'),
    meta: {
      title: '供应商',
      stcode: 'supplier',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/supplier_al',
    name: 'supplier_al',
    component: () => import('@/views/supplier_al.vue'),
    meta: {
      title: '供应商',
      stcode: 'supplier',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue'),
    meta: {
      title: '关于科睿易晶',
      stcode: 'about',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/news.vue'),
    meta: {
      title: '热点资讯',
      stcode: 'news',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/news_detail',
    name: 'news_detail',
    component: () => import('@/views/news_detail.vue'),
    meta: {
      title: '热点资讯',
      stcode: 'news',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/engineeringai',
    name: 'engineeringai',
    component: () => import('@/views/engineeringai.vue'),
    meta: {
      title: '工程造价+AI',
      stcode: 'engineeringai',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/article_detail',
    name: 'article_detail',
    component: () => import('@/views/article_detail.vue'),
    meta: {
      title: '文章详情',
      stcode: 'article',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      stcode: 'login',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue'),
    meta: {
      title: '注册',
      stcode: 'register',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/rpassword',
    name: 'rpassword',
    component: () => import('@/views/rpassword.vue'),
    meta: {
      title: '注册',
      stcode: 'rpassword',
      website: true,
      hashead: true,
      hasfoot: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
  {
    path: '/user/:pathMatch(.*)*',
    redirect: '/user/index',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 根据路由元信息设置文档标题
  window.document.title = (to.meta.title as string) || ''

  if (useHeaderStore) {
    const headerStore = useHeaderStore()
    headerStore.setSelectedTab(to.meta.stcode as string)
    window.localStorage.setItem('selectedTab', to.meta.stcode as string)
    window.localStorage.setItem('selectedName', to.path as string)
  }

  // 登录路由重定向
  if (to?.name === 'login' && from.name) {
    window.localStorage.setItem('redirectName', from.name as string)
  } else {
    window.localStorage.removeItem('redirectName')
  }

  next()
})

export default router
