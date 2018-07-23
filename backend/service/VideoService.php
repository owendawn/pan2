<?php
require_once(dirname(__DIR__)."/utils/SqliteUtil.php");

class VideoService{
    public function getVideosByStatus($status,$userid):array{
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        $re =$db->query("select * from videos where status=".$status." and userid=".$userid." order by week");
        return $sqliteUtil->fetchList($re);
    }

    public function updateVideoStatusById($status,$id,$userid){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        return $db->exec("update videos set status=".$status." where id=".$id." and userid=".$userid);
    }

    public function updateVideoById($id,$userid,$link,$img,$title,$week){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        return $db->exec("update videos set link='".$link."',img='".$img."',title='".$title."',week=".$week.",updated_at=datetime('now', 'localtime') where id=".$id ." and userid=".$userid);
    }
   
    public function addVideo($userid,$link,$img,$title,$week){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        return $db->exec("insert into videos(id,userid,link,img,title,week,status,created_at,updated_at) values(null,".$userid.",'".$link."','".$img."','".$title."',".$week.",0,datetime('now', 'localtime'),datetime('now', 'localtime')) ");
    }
}