// 二次封装axios 拦截器

import axios from 'axios'
import config from '../config/index'
import store from '@/store'
// 设置配置 根据开发 和 生产环境不一样
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
class HttpRequst {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config
  }
  interceptors (instance) {
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
      }
      // console.log('拦截处理请求')
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    instance.interceptors.response.use(function (response) {
      // console.log('处理响应')
      // 对响应数据做点什么
      return response.data
    }, function (error) {
      console.log(error)
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  request (options) {
    const instanse = axios.create()
    options = { ...(this.getInsideConfig()), ...options }
    this.interceptors(instanse)
    return instanse(options)
  }
}
export default new HttpRequst(baseUrl)
