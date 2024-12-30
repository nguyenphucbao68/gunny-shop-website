<?php

error_reporting(0);
require 'handle.class.php';
require 'handleData.class.php';
/**
* Class Handle Ajax
*/
class AjaxDataHandle extends GlobalFunction
{
	use HandleData;
	public $host = "http://localhost/studymake/test/";
	public $resHost = "http://localhost/studymake/logo/gunny/";

	function __construct()
	{
		# connect database
		GlobalFunction::__construct();
	}
	
	/**
	 * get các thông tin dựa trên catId và pic
	 * @param  integer $catId [category_id]
	 * @param  string  $pic   [pic image của Equip]
	 * @param  integer $gt    [gioitinh]
	 * @param  integer $type  [loại cần Get]
	 *                        [0: link]
	 *                        [1: prefix]
	 *                        [2: tên loại]
	 */
	final private function get_config_img($catId = 0, $pic = "", $gt = 0, $type = 0)
	{
		# Hàm Get Config lấy url image hay prefix của từng id
		$pathChar = ($gt == 1) ? "m" : "f";
		$prefix = array(
			"1"=> array("link"=> "equip/$pathChar/head/$pic/icon_1.png", "prefix"=> "head", "name" => "Nón"),
			"3"=> array("link"=> "equip/$pathChar/hair/$pic/icon_1.png", "prefix"=> "hair", "name"=>"Tóc"),
			"5"=> array("link"=> "equip/$pathChar/cloth/$pic/icon_1.png", "prefix"=> "cloth", "name"=>"Áo"),
			"2"=> array("link"=> "equip/$pathChar/glass/$pic/icon_1.png", "prefix"=> "glass", "name"=>"Kính"),
			"4"=> array("link"=> "equip/$pathChar/eff/$pic/icon_1.png", "prefix"=> "eff", "name"=>"Mặt"),
			"6"=> array("link"=> "equip/$pathChar/face/$pic/icon_1.png", "prefix"=> "face", "name"=>"Mắt"),
			"13"=> array("link"=> "equip/$pathChar/suits/$pic/icon_1.png", "prefix"=> "suits", "name"=>"Bộ"),
			"15"=> array("link"=> "equip/wing/$pic/icon.png", "prefix"=> "wing", "name"=>"Cánh")
		);
		switch ($type) {
			case 0:
				return $this->host.$prefix[$catId]["link"];
				break;
			case 1:
				return $prefix[$catId]["prefix"];
				break;
			case 2:
				return $prefix[$catId]["name"];
				break;
		}
	}


	public function data_load_list_cart($suit, $gt = 1, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		$totalCost = 0;
		$count = 0;
		HandleData::init();
		foreach ($suit as $key=>$value) {
			$infoItem = $this->getInfoByKey("pic", $value);
			$infoShop = $this->getInfoByKey("template_id", $infoItem["template_id"], $tbShop);
			if(!$infoItem || !$infoShop) continue;
			$count++; 
			HandleData::createElement();
			HandleData::addElement("img", $this->get_config_img($infoItem["category_id"], $infoItem["pic"], ($key === "suits" ? 0 : $gt)));
			HandleData::addElement("dtItem", $infoItem);
			HandleData::addElement("dtShop", $infoShop);
			HandleData::addElement("attrEvent", array(
				"pic" => $value,
				"cat" => $key
			));
			$totalCost += (int) $infoShop["AValue1"];
			HandleData::doneElement();
		}
		HandleData::addAnotherProperty("totalCost", $totalCost);
		HandleData::addAnotherProperty("count", $count);
		return HandleData::exportDataJson();
	}

	final private function get_config_catId($cat){
		$array = array(
			"head" => "1",
			"glass" => "2",
			"hair" => "3",
			"eff" => "4",
			"cloth" => "5",
			"face" => "6",
			"suits" => "13",
			"wing" => "15"
		);
		return $array[$cat];
	}

	public function data_load_random_object($suit, $gt = 1, $ultimate = false, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		$catId = array();
		$catIdSuitWing = array();
		for ($i=0; $i < count($suit); $i++) { 
			$catIdConfig = $this->get_config_catId($suit[$i]);
			if($catIdConfig == 13 || $catIdConfig == 15)
				$catIdSuitWing[] = $catIdConfig;
			else
				$catId[] = $catIdConfig;
		}
		$listcatId = implode(",", $catId);
		$listcatIdSuitWing = implode(",", $catIdSuitWing);
		if($ultimate == false)
			// chỉ lấy các item trong shop
			$array = $this->query("SELECT * FROM  ( SELECT * FROM `$table` ORDER BY RAND()) rs  WHERE (rs.NeedSex=$gt AND rs.category_id IN ($listcatId)) ".(count($catIdSuitWing) > 0 ? "OR (rs.NeedSex=0 AND rs.category_id IN (".$listcatIdSuitWing."))" : "")." AND rs.template_id IN (SELECT template_id FROM `$tbShop`) GROUP BY rs.category_id;"); 
		else
			$array = $this->query("SELECT * FROM  ( SELECT * FROM `$table` ORDER BY RAND()) rs  WHERE (rs.NeedSex=$gt AND rs.category_id IN ($listcatId)) ".(count($catIdSuitWing) > 0 ? "OR (rs.NeedSex=0 AND rs.category_id IN (".$listcatIdSuitWing."))" : "")." GROUP BY rs.category_id;");
		HandleData::init();
		While($rows = $array->fetch_assoc()){
			HandleData::createElement();
			HandleData::addElement("pic", $rows["pic"]);
			HandleData::addElement("img", $this->get_config_img($rows["category_id"], $rows["pic"], $gt));
			HandleData::addElement("cat", $this->get_config_img($rows["category_id"], "", $gt, 1));
			HandleData::doneElement();
		}
		return HandleData::exportDataJson();
	}

	public function data_load_list_hot_item($gt = 1, $limit = 6, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		$array = $this->query("SELECT * FROM `$table` WHERE template_id IN (SELECT template_id FROM `$tbShop` WHERE label = 1) AND NeedSex = $gt ORDER BY RAND() LIMIT $limit");
		$c = 0;
		HandleData::init();
		While($rows = $array->fetch_assoc()){
			if($c == $limit) break;
			HandleData::createElement();
			$init = $this->info_init_frame(array(
				"selector" => "hot_item",
				"dtItem" => $rows,
				"dtShop" => $this->getInfoByKey('template_id', $rows["template_id"], $tbShop),
				"c" => ++$c,
				"catId" => $rows["category_id"],
				"gt" => $gt,
				"quality" => array("Thô", "Thường", "Ưu tú", "Hoàn mỹ", "Siêu việt")
			));
			foreach($init as $key => $value) HandleData::addElement($key, $value);

			HandleData::doneElement();
		}
		return HandleData::exportDataJson();	
	}

	public function data_load_list_drop_down($string = "", $gt = 1, $limit = 6, $ultimate = false,  $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		$string = trim($string);
		
		if($ultimate) 
			$array = $this->query("SELECT * FROM `$table` WHERE name LIKE '%$string%' AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13))) AND pic <> 'default'");
		else
			$array = $this->query("SELECT * FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13))) AND pic <> 'default'");
		
		$source = '';
		$c = 0;
		HandleData::init();
		While($rows = $array->fetch_assoc()){
			if($c == $limit) break;
			$c++;
			HandleData::createElement();
			$info = $this->getInfoByKey('template_id', $rows["template_id"], $tbShop);
			$linkImg = $this->get_config_img($rows["category_id"], $rows["pic"], $gt);
			$init = array(
				"attrEvent" => array(
					"img" => $linkImg,
					"cat" => $this->get_config_img($rows["category_id"], "", 0, 1),
					"pic" => $rows["pic"],
					"catid" => $rows["category_id"],
					"state" => $info ? 1 : 0
				),
				"label" => $info["label"] == 1 ? "<span>(Hot)</span>" : ($info["label"] == 2 ? "<span>(New)</span>": ""),
				"name" => $rows["name"],
				"checkSold" => ((!$ultimate || $info) ? '$'.$info["AValue1"] : '<span id="sold">Sold Out</span>'),
				"desc" => $rows["description"],
				"img" => $linkImg
			);
			foreach($init as $key => $value) HandleData::addElement($key, $value);
			HandleData::doneElement();
		}
		HandleData::addAnotherProperty("totalRecord", (int) $array->num_rows);
		return HandleData::exportDataJson();
	}

	public function data_load_search_main_content($string = "", $current_page = 1, $gt = 1, $limit = 1, $ultimate = false, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		$query = array();
		if($ultimate){
			$query["saleArray"] = "SELECT count(*) as num FROM `$table` WHERE name LIKE '%$string%' AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))";
			$query["array"] = "
			SELECT
				CASE
					WHEN template_id IN (SELECT template_id from `$tbShop`) THEN 0 ELSE 1
				END AS state, $table.*
			FROM `$table` 
			WHERE name LIKE '%$string%' AND (NeedSex = $gt  OR (NeedSex = 0 AND (category_id = 15 OR  category_id = 13))) AND pic <> 'default'
			ORDER BY state ASC";
		}else{
			$query["saleArray"] = "SELECT count(*) as num FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13))) AND pic <> 'default'";
			$query["array"] = "SELECT * FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))  AND pic <> 'default'";
		}
		return $this->data_load_shop_main_content(0, $current_page, $gt, $limit, $ultimate, $query);
	}

	/**
	 * Load Main Content
	 * @param  integer $catId        [category id]
	 * @param  integer $current_page [trang hiện tại]
	 * @param  integer $gt           [gioi tính : 0 - 1]
	 * @param  integer $limit        [số sản phẩm muốn show ra]
	 * @param  string  $table        [bảng chứa các vật phẩm]
	 * @param  string  $tbShop       [bảng vật phẩm Shop]
	 */
	public function data_load_shop_main_content($catId, $current_page = 1, $gt = 1, $limit = 1, $ultimate = false, $query = null, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		# Xuất ra html cho shop bằng category_id
		if($catId == 13 || $catId == 15) $gt = 0; // nếu category thuộc id 13(set quần áo) hay 15(cánh) thì ko cần giới tính
		// $ultimateCheck = ($ultimate == 'true') ? true : false;
		if($ultimate)
			$saleArray = $this->query($query ? $query["saleArray"] : "SELECT count(*) as num FROM `$table` WHERE pic <> 'default' AND category_id = $catId AND NeedSex = $gt");
		else
			$saleArray = $this->query($query ? $query["saleArray"] : "SELECT count(*) as num FROM `$table` WHERE template_id IN (SELECT template_id FROM `$tbShop`) AND category_id = $catId AND NeedSex = $gt AND pic <> 'default'"); // lấy số lượng item có trong shop theo category_id
		$num_sale = $saleArray->fetch_assoc();
		$pageHandle = $this->pagination_handle(array(
			"countRecord" => $num_sale['num'],
			"currentPage" => $current_page,
			"limit" => $limit
		));
		if($ultimate)
			$array = $this->query(($query ? $query["array"] : "
			SELECT
				CASE
					WHEN template_id IN (SELECT template_id from `$tbShop`) THEN 0 ELSE 1
				END AS state, $table.*
			FROM `$table` 
			WHERE pic <> 'default' AND category_id = $catId AND NeedSex = $gt
			ORDER BY state ASC ")." LIMIT ".$pageHandle['start'].", ".$pageHandle['limit']);
		else
			$array = $this->query(($query ? $query["array"] : "SELECT * FROM `$table` WHERE template_id IN (SELECT template_id FROM `$tbShop`) AND category_id = $catId AND NeedSex = $gt AND pic <> 'default'")." LIMIT ".$pageHandle['start'].", ".$pageHandle['limit']); 
		if($array->num_rows > 0){
			// $object = new HandleData();
			HandleData::init();
			$c = 0;
			foreach ($array as $row) {
				HandleData::createElement();
				$init = $this->info_init_frame(array(
					"dtItem" => $row,
					"dtShop" => $this->getInfoByKey('template_id', $row["template_id"], "qa_gunny_shop"),
					"c" => ++$c,
					"catId" => $query ? $row["category_id"] : $catId,
					"gt" => $gt,
					"quality" => array("Thô", "Thường", "Ưu tú", "Hoàn mỹ", "Siêu việt")
				));
				foreach($init as $key => $value) HandleData::addElement($key, $value);
				HandleData::doneElement();
			}
			HandleData::addAnotherProperty("current", (int) $pageHandle["currentPage"]);
			HandleData::addAnotherProperty("end", (int) $pageHandle["total"]);
			HandleData::addAnotherProperty("totalRecord", (int) $array->num_rows);
			return HandleData::exportDataJson();
		}else{
			throw new Exception("Cơ sỡ dữ liệu rỗng", 0);
		}
	}

	/**
	 * Hàm xử lý Trang từ dữ liệu truyền vào
	 * @param  object $data [countRecord: số record tổng cộng]
	 *                      [currentPage: trang hiện tại]
	 *                      [limit: limit record]
	 * @return object       [total: tổng số trang thu được]
	 *                      [currentPage: trang hiện tại]
	 *                      [start: record start trong csdl]
	 *                      [limit: giới hạn record]
	 */
	final private function pagination_handle($data){
		$pagination = array("total"=>0, "currentPage"=> $data["currentPage"], "start"=>0, "limit" => $data["limit"]);
		$pagination["total"] = ceil($data["countRecord"] / $data["limit"]);
		if(!$pagination["total"]) $pagination["total"] = 0;
		if($pagination["currentPage"] < 1) $pagination["currentPage"] = 1;
		if($pagination["currentPage"] > $pagination["total"]) $pagination["currentPage"] = $pagination["total"];
		$pagination["start"] = ($pagination["currentPage"] - 1) * $data["limit"];
		return $pagination;
	}

	private function info_init_frame($data){
		$init = array("label" => "", "loaihinh" => "", "image" => "", "gioitinh" => "", "prefix" => "", "border" => "<div class='border-info'></div>", "position" => "bottom", "desc" => "");
		// nhãn cho item : hot và new
		if($data["dtShop"]["label"] == 1) 
			$init["label"] = 'hot'; 
		else if($data["dtShop"]["label"] == 2) 
			$init["label"] = 'new';
		$state_text = "";
		// lấy tên category dựa trên id
		$init["loaihinh"] = $this->get_config_img($data["catId"], "", $data["gt"], 2);
		// lấy link image icon
		$init["image"] = $this->get_config_img($data["catId"], $data["dtItem"]["pic"], $data["gt"]);
		// giới tính
		$init["gioitinh"] = ($data["dtItem"]["NeedSex"] == 1) ? 'Nam' : (($data["dtItem"]["NeedSex"] == 2) ? 'Nữ': '');
		// lấy prefix theo $category_id
		$init["prefix"] = $this->get_config_img($data["catId"], "", 0, 1);
		// border
		if($init["gioitinh"] == "" && $init["can"] == "") $init['border'] = "";
		// xử lý ví trí khung thông tin sản phẩm
		if($data["c"] <= 2) $init["position"] = "bottom"; else if($data["c"] <= 6 ) $init["position"] = "center"; else if($data["c"] <= 8) $init["position"] = "top";
		
		// mô tả trang bị
		if(!empty($data["dtItem"]["description"])) $init["desc"] = "<p id='description'>".$data['dtItem']['description']."</p><div class='border-info'></div>";
		$data["init"] = $init;
		return array(
			"init" => $init,
			"dtItem" => $data["dtItem"],
			"dtShop" => $data["dtShop"],
			"quality" => $data["quality"][$data["dtItem"]["quality"]-1],
			"attrEvent" => array(
				"style" => "background-image: url(".$init['image'].")",
				"img" => $init['image'],
				"cat" => $init['prefix'],
				"pic" => $data["dtItem"]["pic"],
				"catid" => $data['catId'],
				"state" => $data["dtShop"] ? 1 : 0
			)
		);
	}
}