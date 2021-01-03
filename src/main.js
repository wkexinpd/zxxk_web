import Vue from 'vue'
import axios from 'axios'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import './assets/iconfont/iconfont.css'

import * as filters from './filters' // global filters

import Print from 'vue-print-nb'
Vue.use(Print);

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

//自定义
var instance = axios.create({
  timeout:5000,
  baseURL :'http://localhost:4321',
  headers:{"Content-Type" : "multipart/form-data;boundary ="+ new Date().getTime()}
});
Vue.prototype.$instance=instance;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
