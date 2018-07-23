<template>
    <div class="album bg-light">

        <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-success w-100">
                    管理
                    <button class="btn btn-sm btn-light float-right">
                        <router-link to="/cards">
                            <svg height="16" class="octicon octicon-mirror" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                                <path fill-rule="evenodd" d="M15.5 4.7L8.5 0l-7 4.7c-.3.19-.5.45-.5.8V16l7.5-4 7.5 4V5.5c0-.34-.2-.61-.5-.8zm-.5 9.8l-6-3.25V10H8v1.25L2 14.5v-9l6-4V6h1V1.5l6 4v9zM6 7h5V5l3 3-3 3V9H6v2L3 8l3-3v2z"></path>
                            </svg>
                        </router-link>
                    </button>
                    <button class="btn btn-sm btn-light float-right mr-1">
                        <router-link to="/cardtrash">
                            <svg height="16" class="octicon octicon-trashcan" viewBox="0 0 12 16" version="1.1" width="16" aria-hidden="true">
                                <path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path>
                            </svg>
                        </router-link>
                    </button>
                </strong>
                <h3 class="mb-0">
                    <a class="text-dark">清单</a>&nbsp;
                    <button class="btn btn-sm btn-outline-success float-right" @click="showModal(null)">新增</button>
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
                            <button class="btn btn-outline-info" @click="showModal(idx)">修改</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="theModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{isAdd?"新增":"修改"}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import config from "../../asserts/util/config";
    export default {
        data() {
            return {
                videos: [],
                isAdd: true
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
            showModal(idx) {
                $("#theModal").modal("show");
                if (idx !== null) {
                    this.isAdd = false;
                } else {
                    this.isAdd = true;
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
    .modal.fade.show {
        display: block;
    }
</style>