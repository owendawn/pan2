<template>
    <div class="album bg-light">

        <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-success w-100">
                    回收站
                    <button class="btn btn-sm btn-light float-right">
                        <router-link to="/cardedit">
                            <svg height="16" class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="16" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
                            </svg>
                        </router-link>
                    </button>
                </strong>
                <h3 class="mb-0">
                    <a class="text-dark">清单</a>&nbsp;
                </h3>
                <hr>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">名称</th>
                            <th scope="col">日期</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(it,idx) in videos" :key="it.id">
                            <th scope="row">{{idx+1}}</th>
                            <td>{{it.title}}</td>
                            <td>{{parseWeek(it.week)}}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-success" @click="restoreCard(it.id)">还原</button>
                                <button class="btn btn-sm btn-outline-danger" @click="destroyCard(it.id)">销毁</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>
<script>
import config from "../../asserts/util/config";
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
                data: "status=1"
            }).then(it => {
                this.videos = it.data.obj;
            });
        },
        destroyCard(id) {
            this.$axios({
                method: "post",
                url: config.baseApiUrl + "?m=VideoController!updateVideoStatusById",
                data: "status=2&id=" + id
            }).then(it => {
                alert(it.data.message);
            });
        },
        restoreCard(id) {
            this.$axios({
                method: "post",
                url: config.baseApiUrl + "?m=VideoController!updateVideoStatusById",
                data: "status=0&id=" + id
            }).then(it => {
                alert(it.data.message);
            });
        }
    },
    mounted() {
        this.$emit("onViewIn", this.items);
        this.getList();
    }
};
</script>
<style>
</style>