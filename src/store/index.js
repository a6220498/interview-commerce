import Vue from 'vue'
import Vuex from 'vuex'
import productsData from '../data/products.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: productsData,
        cart: [],
        isDialogOpen: false,
        selectedProduct: null
    },
    mutations: {
        OPEN_DIALOG(state, product) {
            state.selectedProduct = product
            state.isDialogOpen = true
        },
        CLOSE_DIALOG(state) {
            state.isDialogOpen = false
            state.selectedProduct = null
        },
        ADD_TO_CART(state, item) {
            const existingItem = state.cart.find(p => p.id === item.product.id)
            if (existingItem) {
                existingItem.quantity += parseInt(item.quantity)
            } else {
                state.cart.push({ ...item.product, quantity: parseInt(item.quantity) })
            }
        },
        CLEAR_CART(state) {
            state.cart = []
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(item => item.id !== productId)
        }
    },
    actions: {
        openAddToCartDialog({ commit }, product) {
            commit('OPEN_DIALOG', product)
        },
        closeAddToCartDialog({ commit }) {
            commit('CLOSE_DIALOG')
        },
        addToCart({ commit }, payload) {
            commit('ADD_TO_CART', payload)
            commit('CLOSE_DIALOG')
        }
    },
    getters: {
        cartCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),
        cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    }
})
