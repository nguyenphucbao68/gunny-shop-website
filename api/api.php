<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 1);
error_reporting(E_ALL);
define("resource_url", "http://localhost/studymake/test/");

include_once 'database.php';
include_once 'utilities.php';
include_once 'item.php';
include_once 'listitem.php';
include_once 'infoitem.php';
include_once 'random.php';

class gnShopAPI{
 	private $conn;
    public function __construct()
    {
    	$database = new Database();
    	$this->conn = $database->getConnection();
    }

    private function randomAvatar()
    {
      if($_SERVER['REQUEST_METHOD'] != "GET"){
          $this->response('',406);
      }
      $randomAvatar = new randomAvatar($this->conn);
      echo json_encode($randomAvatar->load(), JSON_PRETTY_PRINT+JSON_NUMERIC_CHECK);
    }

   	private function listitem()
   	{
   		if($_SERVER['REQUEST_METHOD'] != "GET"){
        	$this->response('',406);
    	}
    	$listitem = new ListItem($this->conn);
    	echo json_encode($listitem->load(), JSON_PRETTY_PRINT+JSON_NUMERIC_CHECK);
   	}

   	private function item()
   	{
   		if($_SERVER['REQUEST_METHOD'] != "POST"){
        	$this->response('',406);
    	}
   	}

   	private function infoitem()
   	{
   		if($_SERVER['REQUEST_METHOD'] != "GET"){
        	$this->response('',406);
    	}
    	$item = new InfoItem($this->conn);
    	echo json_encode($item->load(), JSON_PRETTY_PRINT+JSON_NUMERIC_CHECK);
   	}

   	public function loadAPI()
   	{
   		$func = strtolower(trim(str_replace("/","",$_REQUEST['call'])));
   		if(method_exists($this, $func ))
   			$this->$func();
   		else
   			throw new Exception("Method khong ton tai.", 102);
   	}
}

try{
	$gnShopAPI = new gnShopAPI();
	$gnShopAPI->loadAPI();
}catch(Exception $e){
	echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ), JSON_PRETTY_PRINT);
}
