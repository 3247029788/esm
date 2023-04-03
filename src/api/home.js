import axios from '@/utils/axios'

// 获取菜单信息
export const getHomeList = (params) => {
  return axios.request({
    url: 'my/getHomeList',
    method: 'GET',
    params
  })
}

// 提交打卡信息
export const postClockin = (data) => {
  return axios.request({
    url: 'my/postClockin',
    method: 'POST',
    data
  })
}

// 获取打卡天数
export const getCardDays = () => {
  return axios.request({
    url: 'my/getCardDays',
    method: 'GET',
  })
}

// 异常上报
export const abnormalReport = (data) => {
  return axios.request({
    url: 'my/abnormalReport',
    method: 'POST',
    data
  })
}

// 获取健康码信息
export const getHealthcode = (data) => {
  return axios.request({
    url: 'my/getHealthcode',
    method: 'GET',
    data
  })
}