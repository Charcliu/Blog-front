import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
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

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.fullPath === '/' || to.name === 'register') {
    next()
  } else {
    axios
      .get('/api/blog/isSession')
      .then(res => {
        next()
      })
      .catch(err => {
        console.log(err)
        next({ path: '/login' })
      })
  }
})

export default router
