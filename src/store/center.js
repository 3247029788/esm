const center = {
  namespaced: true,
  state: {
    noRead: '',
    language: localStorage.getItem("lang") || "zh", // 默认语言为中文
  },
  mutations: {
    setNoRead (state, data) {
      state.noRead = data
    },
    setLanguage (state, data) {
      state.language = data
      localStorage.setItem("lang", data); // 将当前语言保存到本地存储中
    },
  },
  actions: {}
}

export default center
