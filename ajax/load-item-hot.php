<?php
require '../library/ajax.class.php';

if($_POST["hot"]){
	$hot = $_POST["hot"];
	$ajax = new AjaxHandle();
	echo $ajax->qa_get_html_hot_item($hot["limit"], $hot["gt"]);
}else{
	die('1');
}
