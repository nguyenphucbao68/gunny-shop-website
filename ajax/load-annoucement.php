<?php
require '../library/ajax.class.php';

// if($_POST["hot"]){
// 	$hot = $_POST["hot"];
	$ajax = new AjaxHandle();
	echo $ajax->get_html_annoucement();
// }else{
	// die('1');
// }
