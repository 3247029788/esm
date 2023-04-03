import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/visualization',
        name: 'visualization',
        component: () => import('@/views/visualization')
      },
      {
        path: '/b',
        name: 'b',
        component: () => import('@/views/b')
      },
      {
        path: '/center',
        name: 'center',
        component: () => import('@/views/center')
      }
    ]
  },
  {
    path: '/temperatureRegistration',
    name: 'temperatureRegistration',
    component: () => import('@/views/home/TemperatureRegistration.vue'),
  },
  {
    name: 'abnormalReport',
    path: '/abnormalReport',
    component: () => import('@/views/home/AbnormalReport'),
  },
  {
    name: 'healthCode',
    path: '/healthCode',
    component: () => import('@/views/home/HealthCode'),
  },
  {
    name: 'userInfo',
    path: '/userInfo',
    component: () => import('@/views/center/userInfo'),
  },
]

const router = new VueRouter({
  routes
})

export default router
