<?php
require_once(dirname(__DIR__)."/utils/SqliteUtil.php");
class TestService{

    public function test(){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        $re=$db->query("select 1 as test");
    
        return $re->fetchArray();
    }
}