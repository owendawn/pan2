<?php
require_once(dirname(__DIR__)."/utils/SqliteUtil.php");
class UserService{

    public function getUserByName($name){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        $re=$db->query("select * from user where name='".$name."'");
        return $re->fetchArray();
    }

    public function addUser($name,$email,$pwd){
        $sqliteUtil=new SqliteUtil();
        $db=$sqliteUtil->getDB();
        return $db->exec("insert into user(id,name,email,password,createdtime,updatedtime)values(null,'".$name."','".$email."','".$pwd."', datetime('now'),datetime('now'))");
    }
}