<template>
    <div class="album bg-light">

        <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-success w-100">
                    管理
                    <button class="btn btn-sm btn-light float-right">
                        <router-link to="/cards">
                            <svg height="16" class="octicon octicon-mirror" viewBox="0 0 16 16" version="1.1" width="16"
                                 aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M15.5 4.7L8.5 0l-7 4.7c-.3.19-.5.45-.5.8V16l7.5-4 7.5 4V5.5c0-.34-.2-.61-.5-.8zm-.5 9.8l-6-3.25V10H8v1.25L2 14.5v-9l6-4V6h1V1.5l6 4v9zM6 7h5V5l3 3-3 3V9H6v2L3 8l3-3v2z"></path>
                            </svg>
                        </router-link>
                    </button>
                    <button class="btn btn-sm btn-light float-right mr-1">
                        <router-link to="/cardtrash">
                            <svg height="16" class="octicon octicon-trashcan" viewBox="0 0 12 16" version="1.1"
                                 width="16" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path>
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
                            <button class="btn btn-outline-warning" @click="deleteCard(it.id)">删除</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="theModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{isAdd?"新增":"修改"}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-group">
                                <label>视频名称</label>
                                <input type="text" class="form-control" v-model="item.title">
                            </div>
                            <div class="form-group">
                                <label>时间</label>
                                <select class="form-control" v-model="item.week">
                                    <option value="">请选择时间</option>
                                    <option value="1">周一</option>
                                    <option value="2">周二</option>
                                    <option value="3">周三</option>
                                    <option value="4">周四</option>
                                    <option value="5">周五</option>
                                    <option value="6">周六</option>
                                    <option value="7">周日</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>视频网址</label>
                                <input type="text" class="form-control" v-model="item.link">
                            </div>
                            <div class="form-group">
                                <label>图片网址</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" ref="imglink" v-model="item.img">
                                    <div class="input-group-append">
                                        <button class="btn btn-info" @click="getImgs">Search</button>
                                        <button class=" btn btn-outline-success" @click="showPreview">Preview</button>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group"   v-if="preview!==null">
                                <img class="form-control" :src="preview">
                            </div>
                            <div class="form-group"   v-if="imgs!=null">
                                <div class="row  justify-content-md-center">
                                    <div class="col-auto">
                                        <button class="btn btn-outline-info" @click="turnImg(-1)">&lt;</button>
                                        <button class="btn btn-info" @click="turnImg(0)">choose</button>
                                        <button class="btn btn-outline-success" @click="turnImg(1)">&gt;</button>
                                    </div>
                                </div>
                                <img class="form-control" :src="showImgIdx!==-1?imgs[showImgIdx]:''">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateCard" v-if="!isAdd">保存</button>
                        <button type="button" class="btn btn-primary" @click="addCard" v-if="isAdd">新增</button>
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
                isAdd: true,
                item: this.emptyItem(),
                preview:null,
                userid:-1,
                imgs:null,
                showImgIdx:-1
            };
        },
        computed: {},
        methods: {
            emptyItem(){
                return {
                    id: "",
                    img: "",
                    link: "",
                    title: "",
                    userid: "",
                    week: "",
                };
            },
            parseWeek(idx) {
                const label = [, "一", "二", "三", "四", "五", "六", "日"];
                return "周" + label[idx];
            },
            turnImg(flag) {
                switch(flag){
                    case -1 :this.showImgIdx=this.showImgIdx-1;break;
                    case 0 : this.item.img=this.imgs[this.showImgIdx]; break;
                    case 1 :this.showImgIdx=this.showImgIdx+1;break;
                }
                if(this.showImgIdx<0){
                    this.showImgIdx=0;
                }
                if(this.showImgIdx>=this.imgs.length){
                    this.showImgIdx=this.imgs.length-1;
                }
                console.log(this.showImgIdx)
            },
            getImgs(){
                this.$axios({
                    method: "post",
                    url: config.baseApiUrl + "?m=VideoController!getImgUrlByName",
                    data: "words="+this.item.title
                }).then(it => {
                    if(it.data.obj.length>0){
                        this.imgs = it.data.obj;
                        this.showImgIdx=0;
                    }else{
                        this.showImgIdx=-1;
                        this.imgs=null;
                        alert("搜索异常或查询结果为空")
                    }
                });
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
            showModal(idx) {
                this.preview=null;
                $("#theModal").modal("show");
                if (idx !== null) {
                    this.isAdd = false;
                    this.item=this.videos[idx];
                } else {
                    this.isAdd = true;
                }
            },
            deleteCard(id) {
                this.$axios({
                    method: "post",
                    url: config.baseApiUrl + "?m=VideoController!updateVideoStatusById",
                    data: "status=1&id=" + id+"&userid="+this.userid
                }).then(it => {
                    alert(it.data.message);
                    this.getList();
                });
            },
            updateCard(){
                this.$axios({
                    method: "post",
                    url: config.baseApiUrl + "?m=VideoController!updateVideoById",
                    data: $.param(this.item)
                }).then(it => {
                    alert(it.data.message);
                    this.getList();
                    if(it.data.status===200){
                        $("#theModal").modal("hide");
                    }
                });
            },
            addCard(){
                let cp=this.item;
                cp.userid=this.userid;
                this.$axios({
                    method: "post",
                    url: config.baseApiUrl + "?m=VideoController!addVideo",
                    data: $.param(cp)
                }).then(it => {
                    alert(it.data.message);
                    this.getList();
                    if(it.data.status===200){
                        $("#theModal").modal("hide");
                    }
                });
            },
            showPreview(){
                this.preview=this.item.img;
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

</style>