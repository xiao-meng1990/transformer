import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './http/index.js'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(api)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
