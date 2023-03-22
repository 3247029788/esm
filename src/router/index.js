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
        path: '/c',
        name: 'c',
        component: () => import('@/views/c')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
