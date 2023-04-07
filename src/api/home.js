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
export const getHealthcode = (params) => {
  return axios.request({
    url: 'my/getHealthcode',
    method: 'GET',
    params
  })
}

// 离校申请
export const leaveSchool = (data) => {
  return axios.request({
    url: 'my/leaveSchool',
    method: 'POST',
    data
  })
}

// 返校申请
export const returnSchool = (data) => {
  return axios.request({
    url: 'my/returnSchool',
    method: 'POST',
    data
  })
}

// 获取异常信息
export const getAbnormal = (params) => {
  return axios.request({
    url: 'my/getAbnormal',
    method: 'GET',
    params
  })
}

// 异常处理
export const updateAbnormal = (data) => {
  return axios.request({
    url: 'my/updateAbnormal',
    method: 'POST',
    data
  })
}

// 获取异常处理人信息
export const getResultMsg = (params) => {
  return axios.request({
    url: 'my/getResultMsg',
    method: 'GET',
    params
  })
}

// 发布消息
export const postMessage = (data) => {
  return axios.request({
    url: 'my/postMessage',
    method: 'POST',
    data
  })
}

// 查询消息
export const getMessage = (params) => {
  return axios.request({
    url: 'my/getMessage',
    method: 'GET',
    params
  })
}

// 更改消息读取状态(已读/未读)
export const updateRead = (data) => {
  return axios.request({
    url: 'my/updateRead',
    method: 'POST',
    data
  })
}