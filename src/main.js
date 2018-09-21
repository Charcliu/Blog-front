import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'

// 封装Axios
import { getRequest, postRequest } from './axios/http'
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
