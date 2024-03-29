import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/BasicLayout.vue'
import DashBoard from '@/views/dashboard/Index.vue'
import Login from '@/views/login/Login.vue'
import store from '@/store/index'
import MenuIndex from '@/views/menu/Index.vue'
import ProductIndex from '@/views/product/Index.vue'
import OrderIndex from '@/views/order/Index.vue'
import RuleIndex from '@/views/role/Index.vue'
import UserIndex from '@/views/user/Index.vue'
import Category from '@/views/category/Index.vue'
import SwiperIndex from '@/views/swiper/Index.vue'
import ActivityIndex from '@/views/activity/Index.vue'
import NewsIndex from '@/views/news/Index.vue'

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
      },
      // 设置菜单列表的路由
      {
        path: '/menus',
        name: 'menus',
        component: MenuIndex
      },
      {
        path: '/roles',
        name: 'roles',
        component: RuleIndex
      },
      {
        path: '/products',
        name: 'products',
        component: ProductIndex
      },
      {
        path: '/orders',
        name: 'orders',
        component: OrderIndex
      },
      {
        path: '/users',
        name: 'users',
        component: UserIndex
      },
      {
        path: '/category',
        name: 'category',
        component: Category
      },
      {
        path: '/swiper',
        name: 'swiper',
        component: SwiperIndex
      },
      {
        path: '/activity',
        name: 'activity',
        component: ActivityIndex
      },
      {
        path: '/news',
        name: 'news',
        component: NewsIndex
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
