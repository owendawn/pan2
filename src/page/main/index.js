import Vue from 'vue'

import router from './router.js'
import componentLibs from '../../component/component.js'

import App from '../app-main.vue'

componentLibs.install(Vue)

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios

const root=document.createElement("div")
root.id="root"
document.body.appendChild(root)

new Vue({
    el:'#root',
    router,
    render:(h)=>h(App)
})
