<template>
    <div id="text">
        <h1>{{text}}</h1>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                text: 'home'
            }
        }
    }
</script>
<style>
    #text{
        color:red;
    }
</style>