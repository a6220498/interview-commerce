import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout-success',
    name: 'CheckoutSuccess',
    component: () => import('../views/CheckoutSuccess.vue')
  }
]

const router = new VueRouter({
  // 使用 hash 模式以確保在 GitHub Pages 等靜態主機上重新整理時不會出現 404 錯誤
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes
})

export default router
