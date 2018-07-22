<?php
include_once dirname(__DIR__) . "/JsonResult.php";
include_once dirname(__DIR__) . "/service/UserService.php";
include_once dirname(__DIR__) . "/utils/JwtUtil.php";

class UserController
{
    public function login()
    {
        $remember = $_POST["remember"];
        $name = $_POST["user"];
        $pwd = $_POST["password"];
        $re = new JsonResult();
        $userService = new UserService();
        $user = $userService->getUserByName($name);

        if ($user && strcmp($pwd, $user["password"]) == 0) {
            $jwtUtil = new JwtUtil();
            $day = 1;
            if ("true" == $remember) {
                $day = 30;
            }
            $time = date('Y-m-d H:i:s', strtotime(date("Y-m-d H:i:s")) + $day * 24 * 60 * 60);
            $code = $jwtUtil->createJwt($user["id"], $name, $time);
            $re->setMessage("登陆成功")->setStatus(200)->setObj($code);
            return $re;
        }
        return $re->setMessage("用户名或密码错误")->setStatus(500);
    }

    public function registry()
    {
        $name = $_POST["user"];
        $pwd = $_POST["password"];
        $email = $_POST["email"];
        $re = new JsonResult();
        $userService = new UserService();
        $user = $userService->getUserByName($name);
        if ($user) {
            return $re->setMessage("用户名已存在")->setStatus(500);
        } else {
            $change = $userService->addUser($name, $email, $pwd);
            if ($change > 0) {
                return $re->setMessage("注册成功")->setStatus(200);
            } else {
                return $re->setMessage("注册失败，请重试")->setStatus(500);
            }
        }

    }
}
