const chatroom = {
  namespaced: true,
  state: {
    joinRoom: {},
    leaveRoom: {},
    avatar: ''
  },
  mutations: {
    setJoinRoom(state, data) {
      state.joinRoom.username = data.username
    },
    setLeaveRoom(state, data) {
      state.leaveRoom.username = data.username
    },
    setAvatar(state, data) {
      state.avatar = data
    }
  },
  actions: {},
  modules: {}
}

export default chatroom