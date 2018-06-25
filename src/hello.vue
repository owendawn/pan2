<template>
    <div>
        <h1>hello</h1>
        <div>{{text}}</div>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                text: 'haha'
            }
        },
        mounted() {
            this.$emit('onViewIn', this.items);
        },
    }
</script>
<style>

</style>