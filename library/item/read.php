<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../core.php';
include_once '../shared/utilities.php';
include_once '../database.php';
include_once '../item/item.php';

$utilities = new Utilities();
$database = new Database();
$db = $database->getConnection();
 
$product = new Product($db);

try{
    $time = microtime(true);
    $stmt = $product->read(
        $paramsGET["ultimate"], 
        $paramsGET["start"], 
        $paramsGET["limit"], 
        $paramsGET["filter"] ? $utilities->getFilter($paramsGET["filter"]) : ($paramsGET["nofilter"] ? $utilities->getFilter($paramsGET["nofilter"], false) : array()), 
        $paramsGET["stateEquipSort"], 
        $paramsGET["random"], 
        $paramsGET["group"]
    );

    $num = $stmt->rowCount();
    if($num <= 0) throw new Exception("No Item Found.", 101);
    $products_arr=array();
    $products_arr["data"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        if(isset($_GET['fields'])){
            $product_item = $utilities->getFields($_GET['fields'], (object) $row);
        }else{
            extract($row);
            $product_item=array(
                "id" => $id,
                "name" => $name,
                "category_id" => $category_id,
                "template_id" => $template_id,
                "description" => html_entity_decode($description),
                "pic" => $pic,
                "quality" => $quality,
                "clever" => $clever,
                "style" => $style,
                "agility" => $agility,
                "luck" => $luck,
                "NeedSex" => $NeedSex
            );
        }
        if($paramsGET["stateEquipSort"]){
            $product_item = array_merge($product_item, array(
                "state" => (int) $paramsGET["state"]
            ));
        }
        if($paramsGET["addProperty"]){
            $product_item = array_merge($product_item, $utilities->getProperty($paramsGET["addProperty"], $product_item));
        }
        array_push($products_arr["data"], $product_item);
    }
    $total_rows = $product->count(
        $paramsGET["ultimate"], 
        $paramsGET["filter"] ? $utilities->getFilter($paramsGET["filter"]) : ($paramsGET["nofilter"] ? $utilities->getFilter($paramsGET["nofilter"], false) : array()), 
        $paramsGET["random"], 
        $paramsGET["group"]
    );

    if($num >= $paramsGET["limit"]){
        $products_arr["paging"] = array();
        // echo $total_rows;
        $page_url="{$home_url}item/read_paging.php?";
        $paging=$utilities->getPaging($paramsGET["page"], $total_rows, $paramsGET["limit"], $page_url);
        $products_arr["paging"]=$paging;
    }

    if($paramsGET["addPlugin"]){
        $products_arr = array_merge($products_arr, $utilities->getPlugin($paramsGET["addPlugin"], array(
            "time" => $time
        )));
    }

    echo json_encode($products_arr, JSON_PRETTY_PRINT+JSON_NUMERIC_CHECK);
} catch (Exception $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ), JSON_PRETTY_PRINT);
}