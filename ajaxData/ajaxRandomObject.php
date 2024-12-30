<?php
require '../library/ajaxData.class.php';

try{
	if(isset($_POST)){
		$ajax = new AjaxDataHandle();
		echo $ajax->data_load_random_object($_POST["suitRan"], $_POST["gt"], $_POST["ultimate"]);
	}
} catch (Exception $e) {
	echo json_encode(array(
		'data' => [],
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
}