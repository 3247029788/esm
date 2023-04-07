import { getItem, setItem, removeItem } from '@/utils/storage'

const userToken = {
  namespaced: true,
  state: {
    token: '',
    expirationDate: '',
    expiresTime: '',
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      // 防止刷新丢失将数据备份到本地
      setItem('token', state.token)
    },
    setExpiresTime (state, data) {
      state.expiresTime = data
      setItem('expiresTime', state.expiresTime)
    },
    clearToken (state) {
      removeItem('token')
      state.token = ''
    },
    getToken (state) {
      state.token = state.token || getItem('token')
      state.expirationDate = state.expirationDate || getItem('expiration_date')
    },
    getExpiresTime (state){
      state.expiresTime = state.expiresTime || getItem('expiresTime')
    }
  },
  actions: {}
}

export default userToken
