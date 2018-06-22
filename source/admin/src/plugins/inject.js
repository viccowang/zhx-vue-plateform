import Vue from 'vue'
import store from '@/plugins/store'
import router from '@/plugins/router'
import api from './api'
import axios from './axios'
// Element UI module & style
import ElementUI from 'element-ui'
// contextmenu
import contextmenu from '@/components/contextmenu'
// nextPage
import NextPage from '@/components/nextPage/'

Vue.use(ElementUI, { size: 'mini' })
Vue.use(NextPage, { router, store })
Vue.use(contextmenu)

export default {
  install (Vue, options) {
    Vue.prototype.$api = api
    Vue.prototype.$http = axios
  }
}