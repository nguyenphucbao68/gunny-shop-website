<?php
require '../library/ajaxData.class.php';

try{
	if(isset($_POST)){
		$ajax = new AjaxDataHandle();
		echo $ajax->data_load_shop_main_content($_POST["catId"], $_POST["page"], $_POST["gt"], $_POST["limit"], $_POST["ultimate"]);
	}
} catch (Exception $e) {
	echo json_encode(array(
		'data' => array(),
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
}