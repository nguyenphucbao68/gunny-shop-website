<?php
require '../library/ajax.class.php';

if($_POST["menu"]){
	$menu = $_POST["menu"];
	$ajax = new AjaxHandle();
	echo $ajax->get_html_menu_content_shop($menu["area"], $menu["gt"], $menu["data"], $menu["ultimate"]);
}else{
	die('1');
}
