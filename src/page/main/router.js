import Vue from 'vue'
import VueRouter from 'vue-router'

import MainApp from '../app-main.vue'
import OnlyApp from '../app-only.vue'

import Home from './home.vue'
import Cards from './cards.vue'
import CardEdit from './cardedit.vue'
import CardTrash from './cardtrash.vue'


Vue.use(VueRouter)

const routes=[
    {path: '/', component:MainApp, components: {default: Home}},


    {path: '/home', component:Home},
    {path: '/cards', component:Cards},
    {path: '/cardedit', component:CardEdit},
    {path: '/cardtrash', component:CardTrash},
    // // 重定向
    // {
    //     path: '/',
    //     redirect: '/home'
    // }
]

const router=new VueRouter({routes})

export default router