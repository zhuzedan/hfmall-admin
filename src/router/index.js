import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/BasicLayout.vue'
import DashBoard from '@/views/dashboard/Index.vue'
import Login from '@/views/login/Login.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: '',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashBoard,
        meta: {
          requireAuth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(r => r.meta.requireAuth)) {
    if(!store.state.tokenInfo) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      return
    }
  }
  next()
})
export default router
