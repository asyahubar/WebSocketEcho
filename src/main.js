import Vue from 'vue'
import App from './App.vue'
import ws from 'ws'

Vue.config.productionTip = false
Vue.prototype.ws = ws

new Vue({
  render: h => h(App)
}).$mount('#app')
