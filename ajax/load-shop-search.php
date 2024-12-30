<?php
require '../library/ajax.class.php';

if($_POST["search"]){
	$search = $_POST["search"];
	$ajax = new AjaxHandle();
	echo $ajax->qa_get_html_search($search["text"], $search["page"], $search["gt"], $search["ultimate"]);
}else{
	die('1');
}
