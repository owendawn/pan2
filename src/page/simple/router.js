import Vue from 'vue'
import VueRouter from 'vue-router'

import MainApp from '../app-main.vue'
import OnlyApp from '../app-only.vue'


import Login from './login.vue'
import Registry from './registry.vue'

Vue.use(VueRouter)

const routes=[
    {path: '/', component:OnlyApp, components: {default: Login}},


    {path:'/login',component:Login},
    {path:'/registry',component:Registry}



    // // 重定向
    // {
    //     path: '/',
    //     redirect: '/home'
    // }
]

const router=new VueRouter({routes})

export default router