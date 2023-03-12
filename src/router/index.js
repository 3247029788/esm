import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  // {
  //   path: '/',
  //   redirect: '/login',
  // }
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
        path: '/a',
        name: 'a',
        component: () => import('@/views/a')
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
