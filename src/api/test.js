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

// 修改个人信息
export const updateUserInfo = (data) => {
  return axios.request({
    url: 'my/updateUserInfo',
    method: 'POST',
    data
  })
}

// 修改密码
export const updatePassword = (data) => {
  return axios.request({
    url: 'my/updatePassword',
    method: 'POST',
    data
  })
}

// 获取提交记录
export const getRecord = (params) => {
  return axios.request({
    url: 'my/getRecord',
    method: 'GET',
    params
  })
}

// 获取所有用户
export const getAllUser = (params) => {
  return axios.request({
    url: 'my/getAllUser',
    method: 'GET',
    params
  })
}

// 获取所有用户信息
export const getAllUserInfo = (params) => {
  return axios.request({
    url: 'my/getAllUserInfo',
    method: 'GET',
    params
  })
}

// 获取所有用户信息
export const updateVIPUserInfo = (data) => {
  return axios.request({
    url: 'my/updateVIPUserInfo',
    method: 'POST',
    data
  })
}

// 获取所有用户信息
export const getLeaveInfo = (params) => {
  return axios.request({
    url: 'my/getLeaveInfo',
    method: 'GET',
    params
  })
}

// 获取所有用户信息
export const getReturnInfo = (params) => {
  return axios.request({
    url: 'my/getReturnInfo',
    method: 'GET',
    params
  })
}