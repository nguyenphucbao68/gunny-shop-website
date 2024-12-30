<?php
require '../library/ajax.class.php';

// if($_POST["weapon"]){
	// $weapon = $_POST["weapon"];
	$ajax = new AjaxHandle();
	echo $ajax->loadWeapon();
// }else{
	// die('1');
// }
