import Vue from 'vue'

import router from './router.js'
import componentLibs from './component'

import App from './app.vue'

componentLibs.install(Vue)

import axios from 'axios'
Vue.prototype.$ajax = axios

const root=document.createElement("div")
root.id="root"
document.body.appendChild(root)

new Vue({
    el:'#root',
    router,
    render:(h)=>h(App)
})
