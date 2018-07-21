<template>
    <div class="container pt-5">
        <div class="form-signin">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">我的地盘，我做主</h1>
                <p>Enjoy every day in your life!
                    <code>^v^</code>
                </p>
            </div>

            <div class="form-label-group">
                <label> 用户名</label>
                <input type="text"  class="form-control" placeholder="用户名" required autofocus v-model="user">
            </div>

            <div class="form-label-group">
                <label >密码</label>
                <input type="password" class="form-control" placeholder="密码" required v-model="pwd">
            </div>
            <div class="form-label-group">
                <label >密码二次输入<span style="color:red;" v-if="!isSame">（密码不一致）</span></label>
                <input type="password" class="form-control" placeholder="密码二次输入" required v-model="pwd2" @change="checkPwd">
            </div>
            <div class="form-label-group">
                <label> 邮箱</label>
                <input type="email"  class="form-control" placeholder="邮箱" required autofocus v-model="email">
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="submit" @click="registryClick">注册</button>
            <p class="mt-5 mb-3 text-muted text-center">
                <router-link to="/login">已有账户，前往登陆</router-link>
            </p>
        </div>
    </div>
</template>
<script>
import config from "../../asserts/util/config";
export default {
    data(){
        return {
            user:"",
            pwd:"",
            pwd2:"",
            email:"",
            isSame:true
        }
    },
    methods: {
        checkPwd(){
            if(this.pwd===this.pwd2){
                this.isSame=true;
            }else{
                this.isSame=false;
            }
        },
        registryClick(){
            this.$axios({
                method: "post",
                url: config.baseApiUrl + "?m=UserController!registry",
                data:"user="+this.user+"&password="+this.pwd+"&email="+this.email
            }).then(it => {
                alert(it.data.message);
            });
        }
    },
    mounted() {
    }
}
</script>
<style>

</style>
