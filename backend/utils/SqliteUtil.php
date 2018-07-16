<?php
class MySqlite extends SQLite3{
    function __construct()
    {
       $this->open(dirname(__DIR__).'/app.db');
    }
 }

class SqliteUtil{

    public function getDB(){
        $db = new MySqlite();
        if(!$db){
           echo $db->lastErrorMsg();
           return null;
        } else {
           return $db;
        }
    }

 }
