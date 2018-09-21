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
    } else if (err.response.status === 403) {
      Message.error({ message: '权限不足,请联系管理员!' })
    } else {
      Message.error({ message: '未知错误!' })
    }
    return Promise.resolve(err)
  }
)

let base = '/api'

const postRequest = (url, params) => {
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

const getRequest = url => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}

export { postRequest, getRequest }
