<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../database.php';
include_once '../item/item.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$product = new Product($db);
 
// set ID property of product to be edited
$product->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of product to be edited
$product->readOne();
 
// create array
if(isset($_GET['fields'])){
	$product_arr = (object) array();
	$fields = explode(",", $_GET['fields']);
	for ($i=0; $i < count($fields); $i++) { 
		$field = $fields[$i];
		if(!isset($product->$field)) continue;
		$product_arr->$field = $product->$field;
	}
}else{
	$product_arr = array(
	    "id" =>  $product->id,
	    "name" => $product->name
	);
}

 
// make it json format
echo json_encode($product_arr, JSON_PRETTY_PRINT);
