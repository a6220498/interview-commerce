import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router' // Added this line
import './assets/styles.scss'

Vue.config.productionTip = false

new Vue({
    store,
    router, // Added this line
    render: h => h(App)
}).$mount('#app')
