import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/BasicLayout.vue'
import DashBoard from '@/views/dashboard/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashBoard
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
