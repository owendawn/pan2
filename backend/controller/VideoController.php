<?php
include_once dirname(__DIR__)."/JsonResult.php";
include_once dirname(__DIR__)."/service/VideoService.php";

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


}