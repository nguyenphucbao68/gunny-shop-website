<?php
require '../library/ajaxData.class.php';

try{
	if(isset($_POST)){
		$ajax = new AjaxDataHandle();
		echo $ajax->data_load_search_main_content($_POST["keyword"], $_POST["page"], $_POST["gt"], $_POST["limit"], $_POST["ultimate"]);
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