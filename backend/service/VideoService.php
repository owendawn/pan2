<?php
require_once(dirname(__DIR__)."/utils/SqliteUtil.php");

class VideoService{
    public function getVideosByStatus($status):array{
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        $re =$db->query("select * from videos where status=".$status." order by week");
        return $sqliteUtil->fetchList($re);
    }

    public function updateVideoStatusById($status,$id){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        return $db->exec("update videos set status=".$status." where id=".$id);
    }
}