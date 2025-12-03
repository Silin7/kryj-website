import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import useHeaderStore from '@/store/modules/header'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
    path: '/ai',
    name: 'ai',
    component: () => import('@/views/ai.vue'),
    meta: {
      title: 'AI预测平台',
      stcode: 'ai',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/ai/buy',
    name: 'ai_buy',
    component: () => import('@/views/ai_buy.vue'),
    meta: {
      title: 'AI预测平台',
      stcode: 'ai',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: () => import('@/views/myorder.vue'),
    meta: {
      title: '我的订单',
      stcode: 'myorder',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/myrecords',
    name: 'myrecords',
    component: () => import('@/views/myrecords.vue'),
    meta: {
      title: '我的检测记录',
      stcode: 'myrecords',
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
      title: '公司介绍',
      stcode: 'about',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/article/detail',
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
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('@/views/userinfo.vue'),
    meta: {
      title: '用户中心',
      stcode: 'userinfo',
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
      title: '重置密码',
      stcode: 'rpassword',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/upassword',
    name: 'upassword',
    component: () => import('@/views/upassword.vue'),
    meta: {
      title: '修改密码',
      stcode: 'upassword',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/rmobile',
    name: 'rmobile',
    component: () => import('@/views/rmobile.vue'),
    meta: {
      title: '修改手机号',
      stcode: 'rmobile',
      website: true,
      hashead: true,
      hasfoot: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 根据路由元信息设置文档标题
  window.document.title = `科睿易晶官方网站${to.meta.title ? '-' + to.meta.title : ''}`

  if (useHeaderStore) {
    const headerStore = useHeaderStore()
    headerStore.setSelectedTab(to.meta.stcode as string)
    window.localStorage.setItem('selectedTab', to.meta.stcode as string)
    window.localStorage.setItem('selectedName', to.path as string)
  }

  // // 登录路由重定向
  // if (to?.name === 'login' && from.name === 'ai') {
  //   window.localStorage.setItem('redirectName', from.name as string)
  // } else {
  //   window.localStorage.removeItem('redirectName')
  // }

  next()
})

export default router
