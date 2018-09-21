import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 封装Axios
import { getRequest, postRequestBody, postRequestParam } from './axios/http'
// use
Vue.use(mavonEditor)
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequestBody = postRequestBody
Vue.prototype.postRequestParam = postRequestParam

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
