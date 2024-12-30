<?php
require '../library/ajax.class.php';

if($_POST["search"]){
	$search = $_POST["search"];
	$ajax = new AjaxHandle();
	// echo $ranSuit["gt"].'<br>';
	echo $ajax->qa_get_html_search_ajax($search["text"], $search["gt"], $search["limit"], $search["ultimate"]);
}else{
	die('1');
}
