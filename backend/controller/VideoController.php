<?php
include_once dirname(__DIR__)."/JsonResult.php";
include_once dirname(__DIR__)."/service/VideoService.php";

include_once(dirname(__DIR__) . "/utils/simple_html_dom.php");

class VideoController{
    public function getVideosByStatus(){
        $status=$_POST["status"];
        $userid=$_POST["userid"];
        $videoService=new VideoService();
        $videos=$videoService->getVideosByStatus($status,$userid);
        $re=new JsonResult();
        return $re->setStatus(200)->setObj($videos);
    }

    public function updateVideoStatusById(){
        $id=$_POST["id"];
        $status=$_POST["status"];
        $userid=$_POST["userid"];
        $videoService=new VideoService();
        $change=$videoService->updateVideoStatusById($status,$id,$userid);
        $re=new JsonResult();
        return $re->setStatus($change>0?200:500)->setMessage($change>0?"操作成功":"操作失败，请重试");
    }

    public function updateVideoById(){
        $id=$_POST["id"];
        $userid=$_POST["userid"];
        $link=$_POST["link"];
        $img=$_POST["img"];
        $title=$_POST["title"];
        $week=$_POST["week"];
        $videoService=new VideoService();
        $change=$videoService->updateVideoById($id,$userid,$link,$img,$title,$week);
        $re=new JsonResult();
        return $re->setStatus($change>0?200:500)->setMessage($change>0?"操作成功":"操作失败，请重试");
    }

    public function addVideo(){
        $userid=$_POST["userid"];
        $link=$_POST["link"];
        $img=$_POST["img"];
        $title=$_POST["title"];
        $week=$_POST["week"];
        $videoService=new VideoService();
        $change=$videoService->addVideo($userid,$link,$img,$title,$week);
        $re=new JsonResult();
        return $re->setStatus($change>0?200:500)->setMessage($change>0?"操作成功":"操作失败，请重试");
    }

    public function getImgUrlByName(){
        $html = new simple_html_dom();
        $words = $_POST["words"];
        $re=new JsonResult();
        if ($words == "") {
            return $re->setStatus(500)->setMessage("异常关键词");
        } else {
            $html->load_file('http://v.baidu.com/v?ct=301989888&rn=20&pn=0&db=0&s=25&ie=utf-8&word=' . urlencode($words));
            $imgs = $html->find("#content>.main-content .sp-cont-show>.detail-info>.poster>.poster-link>img");
            $imgsall = $imgs;
            $srcs = [];
            foreach ($imgsall as $img) {
                $src = $img->src;
                if (strpos($src, "hiphotos.baidu") == false&&strpos($src, "qiyipic.com") == false) {
                    array_push($srcs, $src);
                }
            }
            return $re->setStatus(200)->setObj($srcs);
        }
    }
}