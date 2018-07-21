<template>
    <div id="app">
        <PNav ref="navbar"></PNav>
        <!-- 对应的组件内容渲染到router-view中 -->
        <router-view @onViewIn="viewIned" @onShadowBgShow="shadowBgShow"> </router-view>
        <div v-if="showShadowBg" class="modal-backdrop fade show" @click="showShadowBg(false)"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            text: "app",
            showShadowBg:false
        };
    },
    methods: {
        viewIned() {
            this.$refs.navbar.collapse();
        },
        shadowBgShow(isOk){
            console.log(isOk)
            this.showShadowBg=isOk;
        }
    },
    mounted() {}
};
</script>
<style>
#app {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>