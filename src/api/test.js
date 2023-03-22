import axios from '@/utils/axios'

// 注册
export const reguser = (data) => {
  return axios.request({
    url: 'api/reguser',
    method: 'POST',
    data
  })
}

// 登录
export const login = (data) => {
  return axios.request({
    url: 'api/login',
    method: 'POST',
    data
  })
}

// 获取个人信息
export const getUserinfo = (params) => {
  return axios.request({
    url: 'my/getUserinfo',
    method: 'GET',
    params
  })
}

// 获取疫情数据
export const getNcovinfo = (params) => {
  return axios.request({
    url: 'my/getNcovinfo',
    method: 'GET',
    params
  })
}
