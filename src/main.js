import Vue from 'vue'
import App from './App.vue'
import { isWeiXin } from '@/utils'
import vConsole from 'vconsole'

if (isWeiXin) {
  new vConsole()
}

Vue.config.productionTip = false
console.log(process.env)
new Vue({
  render: h => h(App)
}).$mount('#app')
