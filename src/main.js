import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import Echarts from './plugins/echarts'
import nEcharts from './plugins/echartsNow'
import '../node_modules/echarts/map/js/china.js'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
//引入字体图标库
import './assets/iconfont/iconfont.css'
//图片预览功能
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import { i18n, vantLocales } from './lang';

vantLocales(i18n.locale)
Vue.use(Echarts)
Vue.use(nEcharts)
Vue.use(Vant)
Vue.use(preview)
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO('http://127.0.0.1:3007', {
      autoConnect: false // 自动连接     
    }),
    extraHeaders: { 'Access-Control-Allow-Origin': '*' }
  })
)

Vue.config.productionTip = false

// 路由器启动前,token里没有值时,localhost:8080/,跳转到login页面
router.beforeEach((to, from, next) => {
  store.commit('userToken/getToken')
  let token = store.state.userToken.token
  // token是否过期
  const tokenStartTime = window.localStorage.getItem('tokenStartTime')
  const expiresTime = window.localStorage.getItem('expiresTime')
  const timeOver = Number(expiresTime) * 3600 * 1000
  let date = new Date().getTime()
  // 如果大于说明是token过期了
  if(date - tokenStartTime > timeOver) {
     token = null
  }
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
  i18n,
  render: h => h(App)
}).$mount('#app')
