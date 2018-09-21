import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    }
  ]
})
