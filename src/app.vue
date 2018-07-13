<template>
    <div id="app">
        <PNav ref="navbar"></PNav>
        <!-- 对应的组件内容渲染到router-view中 -->
        <router-view @onViewIn="viewIned"> </router-view>
    </div>

</template>
<script>
    export default{
        data(){
            return {
                text:'app'
            }
        },
        methods:{
            viewIned(){
                this.$refs.navbar.collapse();
            }
        },
        mounted(){

        }
    }
</script>
<style>
#app{
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>