<template>
    <div class="album bg-light">
        <nav aria-label="breadcrumb row">
            <div class="form-inline  breadcrumb">
                <div class="form-group row pl-5" style="margin-bottom: 0;">
                    <div class="col-xs-9">
                        <input ref="searchDiv" class="form-control" type="search" placeholder="Search" aria-label="Search">
                    </div>
                    <button class="btn btn-outline-success col-xs-2" type="submit" @click="searchClick()">Search</button>
                    &nbsp;

                    <button class="btn btn-link btn-sm col-xs-1">
                        <router-link to="/cardedit">
                            <svg height="24" class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="18" aria-hidden="true"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                        </router-link>
                    </button>
                </div>
            </div>
        </nav>
        <div class="container my-3">

            <div class="row justify-content-md-center">
                <div class="col-xs-12 col-md-8 " v-for="it in videos" v-bind:key="it.id">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" alt="*v*" style=" width: 100%; display: block;" :src="it.img">
                        <div class="card-body">
                            <p class="card-text">{{it.title}}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="viewClick(it.img)">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goClick(it.link)">Go</button>
                                </div>
                                <small class="text-muted">{{parseWeek(it.week)}}</small>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import config from "../../asserts/util/config";
    import loginUtil from "../../asserts/util/loginUtil";
    export default {
        data() {
            return {
                videos: [],
                userid:-1
            };
        },
        computed: {},
        methods: {
            parseWeek(idx) {
                const label = [, "一", "二", "三", "四", "五", "六", "日"];
                return "周" + label[idx];
            },
            getList() {
                this.$axios({
                    method: "post",
                    url: config.baseApiUrl + "?m=VideoController!getVideosByStatus",
                    data: "status=0&userid="+this.userid
                }).then(it => {
                    this.videos = it.data.obj;
                });
            },
            goClick(url) {
                window.open(url);
            },
            viewClick(url) {
                window.open(url);
            },
            searchClick() {
                var v = this.$refs.searchDiv.value;
                if (v && v.trim().length > 0) {
                    window.open("http://v.baidu.com/v?word=" + encodeURIComponent(v) + "&ie=utf-8");
                }
            }
        },
        beforeMount(){
            if(!loginUtil.checkLogined()){
                window.location.href=config.baseUrl+"/simple.html#/login";
            }else{
                this.userid=loginUtil.getJWTValue("id");
            }
        },
        mounted() {
            this.$emit("onViewIn", this.items);
            this.getList();
        }
    };
</script>
<style>
    .card-body .card-text {
        color: #1a8c9b;
    }
    .text-muted {
        color: #be60bd !important;
    }
</style>