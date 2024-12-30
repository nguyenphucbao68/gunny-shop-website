<?php
require '../library/ajax.class.php';

if($_POST["shop"]){
	$shop = $_POST["shop"];
	$ajax = new AjaxHandle();
	echo $ajax->qa_get_html_by_catId($shop["catId"], $shop["page"], $shop["gt"], $shop["ultimate"]);
}else{
	die('1');
}
