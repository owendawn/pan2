<?php
include_once dirname(__DIR__)."/JsonResult.php";
include_once dirname(__DIR__)."/service/TestService.php";

class TestController{
    public function test(){
        // var_dump($_GET);
        $testService=new TestService();
        $arr=$testService->test();
        $re=new JsonResult();
        $re->setMessage("hello")->setStatus(200)->setObj($arr);
        return $re;
    }
}

?>