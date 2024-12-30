<?php
require '../library/ajaxData.class.php';

try{
	if(isset($_POST)){
		$ajax = new AjaxDataHandle();
		echo $ajax->data_load_list_hot_item($_POST["gt"], $_POST["limit"]);
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