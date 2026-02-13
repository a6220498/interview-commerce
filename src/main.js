import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/styles.scss'
// 引入非vue層的組件與js相關功能
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
