import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/BlogList.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/editMd',
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
    }
  ]
})
