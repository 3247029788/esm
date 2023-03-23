import axios from '@/utils/axios'

// 获取省市数据
export const getProvince = (params) => {
    return axios.request({
      url: 'my/getProvince',
      method: 'GET',
      params
    })
}

// 获取省市疫情数据
export const getProvinceNcov = (params) => {
    return axios.request({
      url: 'my/getProvinceNcov',
      method: 'GET',
      params
    })
}
  