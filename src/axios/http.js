import axios from 'axios'
import { Message } from 'element-ui'

// 请求前拦截
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    Message.error({ message: '请求超时!' })
    return Promise.resolve(err)
  }
)

// 返回后拦截
axios.interceptors.response.use(
  data => {
    if (data.status && data.status === 200 && data.data.status === 'error') {
      Message.error({ message: data.data.msg })
      return
    }
    return data
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
    } else if (err.response.status === 401) {
      Message.error({ message: '登录信息失效⊙﹏⊙∥' })
      // window.location.href = 'http://65.49.209.221/#/login'
    } else if (err.response.status === 500) {
      Message.error({ message: '服务器开小差了⊙﹏⊙∥' })
    }
    return Promise.reject(err)
  }
)

let base = '/api'

// @RequestBody请求
const postRequestBody = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8'
    }
  })
}

// @RequsetParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const getRequest = url => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}

const multipleRequest = function (requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback))
}

export { getRequest, postRequestBody, postRequestParam, multipleRequest }
