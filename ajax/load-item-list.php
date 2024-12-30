<?php
require '../library/ajax.class.php';

if($_POST["bagshop"]){
	$bagshop = $_POST["bagshop"];
	$ajax = new AjaxHandle();
	echo $ajax->qa_get_html_item_bag(isset($bagshop["list"]) ? $bagshop["list"] : array(), $bagshop["gt"], $bagshop["type"]);
}else{
	die('1');
}
