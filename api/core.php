<?php
// show error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);
DEFINE("resource_url", "http://localhost/studymake/test/");
// home page url
$home_url="http://localhost/gunny/library/";
// page given in URL parameter, default page is one
$paramsGET = array(
	"page" => isset($_GET['page']) ? $_GET['page'] : 1,
	"ultimate" => isset($_GET["ultimate"]) ? filter_var($_GET["ultimate"], FILTER_VALIDATE_BOOLEAN) : false,
	"filter" => isset($_GET['filter']) ? $_GET['filter'] : false,
	"nofilter" => isset($_GET['nofilter']) ? $_GET['nofilter'] : false,
	"keyword" => isset($_GET['s']) ? $_GET['s'] : '',
	"addProperty" => isset($_GET['addProperty']) ? $_GET['addProperty'] : false,
	"stateEquipSort" => isset($_GET["stateEquipSort"]) ? filter_var($_GET["stateEquipSort"], FILTER_VALIDATE_BOOLEAN) : false,
	"random" => isset($_GET["random"]) ? filter_var($_GET["random"], FILTER_VALIDATE_BOOLEAN) : false,
	"group" => isset($_GET['group']) ? $_GET['group'] : false,
	"addPlugin" => isset($_GET['addPlugin']) ? $_GET['addPlugin'] : false,
	"limit" => isset($_GET["limit"]) ? (int) $_GET["limit"] : 10,
	"start" => 0,
	"search" => isset($_GET["search"]) ? $_GET["search"] : false,
);
$paramsGET["start"] = isset($_GET["start"]) ? $_GET["start"] : ($paramsGET["limit"] * $paramsGET["page"] - $paramsGET["limit"]);
// $page = isset($_GET['page']) ? $_GET['page'] : 1;
// $ultimate = isset($_GET["ultimate"]) ? filter_var($_GET["ultimate"], FILTER_VALIDATE_BOOLEAN) : false;
// $filter = isset($_GET['filter']) ? json_decode($_GET['filter']) : false;
// $nofilter = isset($_GET['nofilter']) ? json_decode($_GET['nofilter']) : false;
// $keyword = isset($_GET['s']) ? $_GET['s'] : '';
// $addProperty = isset($_GET['addProperty']) ? $_GET['addProperty'] : false; 
// $stateEquipSort = isset($_GET["stateEquipSort"]) ? filter_var($_GET["stateEquipSort"], FILTER_VALIDATE_BOOLEAN) : false;
// $random = isset($_GET["random"]) ? filter_var($_GET["random"], FILTER_VALIDATE_BOOLEAN) : false;
// $group = isset($_GET['group']) ? $_GET['group'] : false; 

// // set number of records per page
// $records_per_page = isset($_GET["limit"]) ? (int) $_GET["limit"] : 10;
// // calculate for the query LIMIT clause
// $from_record_num = ($records_per_page * $paramsGET["page"]) - $records_per_page;