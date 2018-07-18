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

}