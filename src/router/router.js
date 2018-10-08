import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/editMd/:blogId',
      name: 'editMd',
      component: () => import('../views/EditMd.vue')
    },
    {
      path: '/blogList',
      name: 'blogList',
      component: () => import('../views/BlogList.vue')
    },
    {
      path: '/blogDetail/:blogId',
      name: 'blogDetail',
      component: () => import('../views/BlogDetail.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ],
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      x: 0,
      y: 0
    }
  }
})
