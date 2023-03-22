import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

// 路由器启动前,token里没有值时,localhost:8080/,跳转到login页面
router.beforeEach((to, from, next) => {
  store.commit('userToken/getToken')
  const token = store.state.userToken.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') { // 之前登录过不用再次登录
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
