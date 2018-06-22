import Vue from 'vue'
import VueRouter from 'vue-router'

import Navbar from './component/nav.vue'

import App from './app.vue'
import Home from './home.vue'
import Hello from './hello.vue'

Vue.use(VueRouter)

const routes=[
    {
        path: '/',
        component:App,
        components: {
            default: Home,
        }
    },
    {
        path: '/home',
        component:Home
    },
    {
        path: '/hello',
        component:Hello
    },
    // // 重定向
    // {
    //     path: '/',
    //     redirect: '/home'
    // }
]

const router=new VueRouter({routes})

export default router