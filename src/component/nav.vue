<template>

    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <!-- Brand -->
        <a class="navbar-brand" href="#">Navbar</a>

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item" v-bind:class="{ 'active':isActive('#/home') }">
                    <router-link to="/home"  :class="['nav-link',{ 'active':isActive('#/home') }]">首页</router-link>
                </li>
                <li class="nav-item" v-bind:class="{ 'active':isActive('#/hello') }">
                    <router-link to="/cards" :class="['nav-link',{ 'active':isActive('#/hello') }]">卡片组</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    data(){
        return{
            href:window.location.href,
            isShow:false
        }
    },
    methods: {
        isActive(path){
            return this.href.indexOf(path) !== -1;
        },
        collapse(){
           $("#collapsibleNavbar").removeClass("show");
           this.href=window.location.href;
        }
    },
    events:{

    }
}
</script>
<style>
nav{z-index: 999}
.bg-dark {
    background-color: rgba(52, 58, 64,0.9)!important;
}
</style>