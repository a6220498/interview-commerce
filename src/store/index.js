import Vue from 'vue'
import Vuex from 'vuex'
import productsData from '../data/products.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放商品列表
    products: productsData,
    // 購物車列表
    cart: [],
    // 彈窗是否打開
    isDialogOpen: false,
    // 正被彈窗打開的商品
    selectedProduct: null
  },
  mutations: {
    // 打開商品彈窗
    openProductDialog(state, product) {
      state.selectedProduct = product
      state.isDialogOpen = true
    },
    // 關閉商品彈窗
    closeProductDialog(state) {
      state.isDialogOpen = false
      state.selectedProduct = null
    },
    // 加入購物車
    addToCart(state, item) {
      const existingItem = state.cart.find(p => p.id === item.product.id)
      if (existingItem) {
        existingItem.quantity += parseInt(item.quantity)
      } else {
        state.cart.push({ ...item.product, quantity: parseInt(item.quantity) })
      }
    },
    // 清空購物車
    clearCart(state) {
      state.cart = []
    },
    // 移除購物車商品
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    }
  },
  actions: {
    // 打開商品彈窗
    openProductDialog({ commit }, product) {
      commit('openProductDialog', product)
    },
    // 關閉商品彈窗
    closeProductDialog({ commit }) {
      commit('closeProductDialog')
    },
    // 加入購物車
    addToCart({ commit }, payload) {
      commit('addToCart', payload)
      commit('closeProductDialog')
    },
    // 清空購物車
    clearCart({ commit }) {
      commit('clearCart')
    },
    // 移除購物車商品
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    }
  },
  getters: {
    // 購物車商品總數
    cartCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    // 購物車商品總金額
    cartTotalAmount: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }
})
