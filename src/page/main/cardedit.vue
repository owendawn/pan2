<template>
    <div class="album bg-light">

        <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-success">管理</strong>
                <h3 class="mb-0">
                    <a class="text-dark">清单</a>
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
            <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164ac640af6%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164ac640af6%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="width: 200px; height: 250px;">
        </div>
        <div class="modal fade" :class="isShow?'show':''" id="theModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
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
            isShow: false
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
            // this.isShow = true;
            $("#theModal").modal("show");
            setTimeout(()=>{this.isShow=true},1000);
            this.$emit("onShadowBgShow", true);
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