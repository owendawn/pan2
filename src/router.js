import Vue from 'vue'
import VueRouter from 'vue-router'

import Navbar from './component/nav.vue'

import App from './app.vue'
import Home from './home.vue'
import Cards from './cards.vue'

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
        path: '/cards',
        component:Cards
    },
    // // 重定向
    // {
    //     path: '/',
    //     redirect: '/home'
    // }
]

const router=new VueRouter({routes})

export default router