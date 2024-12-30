<?php
require '../library/ajax.class.php';

if($_POST["ranSuit"]){
	$ranSuit = $_POST["ranSuit"];
	$ajax = new AjaxHandle();
	echo $ajax->getRandomSuit($ranSuit["gt"], $ranSuit["ultimate"]);
}else{
	die('1');
}
