<template>
    <div class="album bg-light">
        <nav aria-label="breadcrumb row">
            <div class="form-inline  breadcrumb">
                <div class="form-group row" style="margin-bottom: 0;">
                    <div class="col-xs-9">
                        <input ref="searchDiv" class="form-control" type="search" placeholder="Search" aria-label="Search">
                    </div>
                    <button class="btn btn-outline-success col-xs-2" type="submit" @click="searchClick()">Search</button>
                    &nbsp;

                    <button class="btn btn-link btn-sm col-xs-1">
                        <router-link to="/cardedit">
                            <svg height="24" class="octicon octicon-list-unordered" viewBox="0 0 12 16" version="1.1" width="18" aria-hidden="true">
                                <path fill-rule="evenodd" d="M2 13c0 .59 0 1-.59 1H.59C0 14 0 13.59 0 13c0-.59 0-1 .59-1h.81c.59 0 .59.41.59 1H2zm2.59-9h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1H4.59C4 2 4 2.41 4 3c0 .59 0 1 .59 1zM1.41 7H.59C0 7 0 7.41 0 8c0 .59 0 1 .59 1h.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm0-5H.59C0 2 0 2.41 0 3c0 .59 0 1 .59 1h.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm10 5H4.59C4 7 4 7.41 4 8c0 .59 0 1 .59 1h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm0 5H4.59C4 12 4 12.41 4 13c0 .59 0 1 .59 1h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01z"></path>
                            </svg>
                        </router-link>
                    </button>
                </div>
            </div>
        </nav>
        <div class="container my-3">

            <div class="row">
                <div class="col-md-4" v-for="it in videos" v-bind:key="it.id">
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
import config from "./asserts/util/config";
export default {
    data() {
        return {
            videos: []
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
                data: "status=0"
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
                window.open(
                    "http://v.baidu.com/v?word=" +
                        encodeURIComponent(v) +
                        "&ie=utf-8"
                );
            }
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