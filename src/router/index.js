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
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat')
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
  {
    name: 'updateUserInfo',
    path: '/updateUserInfo',
    component: () => import('@/views/center/update/UpdateUserInfo'),
  },
  {
    name: 'updatePassword',
    path: '/updatePassword',
    component: () => import('@/views/center/update/UpdatePassword'),
  },
  {
    name: 'setting',
    path: '/setting',
    component: () => import('@/views/center/settings'),
  },
  {
    name: 'inAndOut',
    path: '/inAndOut',
    component: () => import('@/views/home/InAndOut'),
  },
  {
    name: 'returnApplication',
    path: '/returnApplication',
    component: () => import('@/views/home/returnApplication'),
  },
  {
    name: 'manageException',
    path: '/manageException',
    component: () => import('@/views/home/manage'),
  },
  {
    name: 'submitRecord',
    path: '/submitRecord',
    component: () => import('@/views/center/submitRecord'),
  },
  {
    name: 'message',
    path: '/message',
    component: () => import('@/views/home/message'),
  },
  {
    name: 'messageList',
    path: '/messageList',
    component: () => import('@/views/center/messageList'),
  },
  {
    name: 'userManagement',
    path: '/userManagement',
    component: () => import('@/views/home/userManage'),
  },
  {
    name: 'approve',
    path: '/approve',
    component: () => import('@/views/home/approve'),
  },
  {
    name: 'detail',
    path: '/detail/:news',
    component: () => import('@/views/chat/detail'),
  },
]

const router = new VueRouter({
  routes
})

export default router
