import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import axios from 'axios'
import VueGoodTablePlugin from 'vue-good-table'
import XLSX from 'xlsx'
import 'vue-good-table/dist/vue-good-table.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
const base = axios.create({
  baseURL: 'http://localhost/tableApi/'
  //baseURL: 'https://microprobe.hi.is/aold/my-app/tableApi/',
  //headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
})

library.add(faHandPointRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$http = base

Vue.use(VueGoodTablePlugin)
Vue.config.productionTip = false
//refer to as $XLSX
Object.defineProperty(Vue.prototype, '$xlsx', { value: XLSX })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
