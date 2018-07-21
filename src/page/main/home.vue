<template>
    <div id="homediv">
        <canvas id="canvas" width="1349" height="404"></canvas>
    </div>
</template>
<script>
    import homeKeeper from '../../static/home.js'
    export default{

        data() {
            return{
                text: 'home',
                bgKeeper:null,
            }
        },
        updated() {
            this.$emit('onViewIn', this.items);
        },
        mounted(){
            this.$emit('onViewIn', this.items);
            this.showBg();
        },
        beforeDestroy(){
            this.destroyBg();
        },
        methods: {
            onmousemove(e){
                this.bgKeeper.toX = (e.clientX - this.bgKeeper.canvas.width / 2) * -0.8;
                this.bgKeeper.toY = (e.clientY - this.bgKeeper.canvas.height / 2) * 0.8;
            },
            ontouchmove(e){
                this.bgKeeper.toX = (e.touches[0].clientX - this.bgKeeper.canvas.width / 2) * -0.8;
                this.bgKeeper.toY = (e.touches[0].clientY - this.bgKeeper.canvas.height / 2) * 0.8;
            },
            onmousedown(e){
                for (var i = 0; i < 10; i++) {
                    this.bgKeeper.add();
                }
            },
            ontouchstart(e){
                for (var i = 0; i < 10; i++) {
                    this.bgKeeper.add();
                }
            },
            showBg(){
                this.bgKeeper= homeKeeper.init(document.getElementsByTagName("body")[0]);
                window.addEventListener('mousemove', this.onmousemove);
                window.addEventListener('touchmove', this.ontouchmove);
                window.addEventListener('mousedown', this.onmousedown);
                window.addEventListener('touchstart', this.ontouchstart);
            },
            destroyBg(){
                window.removeEventListener('mousemove', this.onmousemove);
                window.removeEventListener('touchmove', this.ontouchmove);
                window.removeEventListener('mousedown', this.onmousedown);
                window.removeEventListener('touchstart', this.ontouchstart);
            }
        }
    }
</script>
<style>
    html {
        height: 100%;
        cursor: move;
        background-image: -webkit-radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
        background-image: radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    }
    body {width: 100%;height: 100%;margin: 0;overflow: hidden;}
    canvas{top: 0px;left: 0px;width: 100%;height: 100%;z-index: 2;position: absolute;background: black;}
</style>