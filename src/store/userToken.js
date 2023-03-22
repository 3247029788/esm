import { getItem, setItem, removeItem } from '@/utils/storage'

const userToken = {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      // 防止刷新丢失将数据备份到本地
      setItem('token', state.token)
    },
    clearToken () {
      removeItem('token')
    },
    getToken (state) {
      state.token = state.token || getItem('token')
    }
  },
  actions: {}
}

export default userToken
