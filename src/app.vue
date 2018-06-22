<template>
    <div id="app">
        <PNav></PNav>
        <!-- 对应的组件内容渲染到router-view中 -->
        <router-view> </router-view>
    </div>

</template>
<script>
    export default{
        data(){
            return {
                text:'app'
            }
        }
    }
</script>
<style>

</style>