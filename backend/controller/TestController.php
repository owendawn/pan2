<?php
include_once dirname(__DIR__)."/JsonResult.php";
class TestController{
    public function test(){
        var_dump($_GET);
        $re=new JsonResult();
        $re->setMessage("hello")->setStatus(200);
        var_dump($re);
        return $re;
    }
}

?>