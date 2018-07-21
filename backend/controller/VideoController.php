<?php
include_once dirname(__DIR__)."/JsonResult.php";
include_once dirname(__DIR__)."/service/VideoService.php";

class VideoController{
    public function getVideosByStatus(){
        $status=$_POST["status"];
        $videoService=new VideoService();
        $videos=$videoService->getVideosByStatus($status);
        $re=new JsonResult();
        return $re->setStatus(200)->setObj($videos);
    }

    public function updateVideoStatusById(){
        $id=$_POST["id"];
        $status=$_POST["status"];
        $videoService=new VideoService();
        $change=$videoService->updateVideoStatusById($status,$id);
        $re=new JsonResult();
        return $re->setStatus($re>0?200:500)->setMessage($re>0?"操作成功":"操作失败，请重试");
    }

}