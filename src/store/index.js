import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import router from '../router'
import userToken from './userToken'
import chatroom from './chatroom'
import center from './center'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userToken,
    chatroom,
    center
  }
})
