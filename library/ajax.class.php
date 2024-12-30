<?php
require 'handle.class.php';
/**
* Class Handle Ajax
*/
class AjaxHandle extends GlobalFunction
{
	public $host = "http://localhost/studymake/test/";
	public $resHost = "http://localhost/studymake/logo/gunny/";

	function __construct()
	{
		# connect database
		GlobalFunction::__construct();
	}

	// /**
	//  * Load Danh sách các Equip
	//  * @param  array   $suit      [danh sách các loại Equip cần random]
	//  * @param  integer $gt        [gioi tinh]
	//  */
	// public function data_load_random_object($suit, $gt = 1, $ultimate = false, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	// {
	// 	$catId = array();
	// 	$catIdSuitWing = array();
	// 	for ($i=0; $i < count($suit); $i++) { 
	// 		$catIdConfig = $this->get_config_catId($suit[$i]);
	// 		if($catIdConfig == 13 || $catIdConfig == 15)
	// 			$catIdSuitWing[] = $catIdConfig;
	// 		else
	// 			$catId[] = $catIdConfig;
	// 	}
	// 	$listcatId = implode(",", $catId);
	// 	$listcatIdSuitWing = implode(",", $catIdSuitWing);
		$array = $this->query("SELECT * FROM  ( SELECT * FROM `$table` ORDER BY RAND()) rs  WHERE (rs.NeedSex=$gt AND rs.category_id IN ($listcatId)) ".(count($catIdSuitWing) > 0 ? "OR (rs.NeedSex=0 AND rs.category_id IN (".$listcatIdSuitWing."))" : "")." AND rs.template_id IN (SELECT template_id FROM `$tbShop`) GROUP BY rs.category_id;"); 
	// 	$suit = array();
	//     while($rows = $array->fetch_assoc()){
	//         $prefix = $this->get_config_img($rows["category_id"], "", $gt, 1); // prefix
	//         $suit[$prefix] = array(
	//         	"pic" => $rows["pic"],
	//         	"cat" => $prefix,
	//         	"img" => $this->get_config_img($rows["category_id"], $rows["pic"], $gt)
	//         )
	//     }
	// 	return json_encode($suit);
	// }

	public function loadWeapon($tbWeapon = 'qa_gunny_weapons')
	{
		# code...
		$array = $this->query("SELECT * FROM `$tbWeapon` WHERE category_id = 7 OR category_id = 27");
		$object = (object) array("data" => []);
		While($rows = $array->fetch_assoc()){
			$element = [];
			$element[] = '<img src="'.$this->host.'equip/arm/'.$rows["pic"].'/1/icon.png" width="40px" height="40px" style="text-align: center"/>';
			$element[] = $rows["name"]; 
			$element[] = $rows["pic"];
			$object->data[] = $element;
		}
		return json_encode($object);
	}

	// $ultimate = true : mở giới hạn ra tất cả các item có trong csdl (qa_gunny_items)
	// $ultimate = false : chỉ có các item trong shop (qa_gunny_shop)
	public function getRandomSuit($gt = 1, $ultimate = 'false', $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		# Lấy Ngẫu nhiên trang bị
		
		// lấy tất cả item
		// đối với cánh thì không cần giới tính (15)
		// không random bộ (13)
		if($ultimate == 'false')
			// chỉ lấy các item trong shop
			$array = $this->query("SELECT * FROM  ( SELECT * FROM `$table` ORDER BY RAND()) rs  WHERE (rs.NeedSex=$gt OR (rs.NeedSex=0 AND rs.category_id=15))  AND rs.category_id!=13 AND rs.template_id IN (SELECT template_id FROM `$tbShop`) GROUP BY rs.category_id;"); 
		else
			$array = $this->query("SELECT * FROM  ( SELECT * FROM `$table` ORDER BY RAND()) rs  WHERE (rs.NeedSex=$gt OR (rs.NeedSex=0 AND rs.category_id=15)) AND rs.category_id!=13 GROUP BY rs.category_id;");
	

		// mảng chứa dữ liệu
		$suit = array();
		While($rows = $array->fetch_assoc()){
			$prefix = $this->get_config_img($rows["category_id"], "", $gt, 1); // prefix
			$suit[$prefix]["pic"] = $rows["pic"];
			$suit[$prefix]["catid"] = $rows["category_id"];
			$suit[$prefix]["link"] = $this->get_config_img($rows["category_id"], $rows["pic"], $gt); // link icon trang bị
			$suit[$prefix]["name"] = $this->get_config_img($rows["category_id"], "", $gt, 2); // tên category
		}
		return json_encode($suit);
	}

	// $catId : category_id
	// $pic : pic equip
	// $type = 0 : return link image
	// $type = 1 : return prefix
	// $type = 2 : return name
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
		return ($type == 0) ? $this->host.$prefix[$catId]["link"] : (($type == 1) ? $prefix[$catId]["prefix"] : $prefix[$catId]["name"]);
	}

	// $area = "trang-bi" : mở đầu shop là menu trang bị
	// $data : menu từ bên js gửi qua
	public function get_html_menu_content_shop($area = "trang-bi", $gt, $data, $ultimate = 'false')
	{
		# Hàm Get Sub-Menu và content sau khi click menu
		$menu_tab = json_decode($data, true);
		$source = '';
		$data = '';
		$c = 0;
		$catFirstID = 1;
		foreach ($menu_tab[$area] as $key => $value2) {
			# tạo menu dựa trên array $menu_tab
			$c++;
			if($c == 1) $catFirstID = $value2["cat"];
			$data .= '<div class="btn '.($c == 1 ? "active" : "").'" catId="'.$value2["cat"].'">'.$value2["name"].'</div>';
		}

		$shop_frame = $this->qa_get_html_by_catId($catFirstID, 1, $gt, $ultimate);
		$tab_content = explode("\n", $shop_frame);
		$source = '<div class="sub-tab">'.$data.'</div><div class="border"></div>
			       <div class="show"><div>'.$tab_content[0].'</div></div>';
		return preg_replace( "/\r|\n/", "", $source )."\n".$tab_content[1]."\n".$tab_content[2]."\n".$catFirstID;
	}

	public function get_html_annoucement($table = 'qa_gunny_users', $tbShop = 'qa_gunny_shop', $tbAct = 'qa_gunny_activity')
	{
		# get html annoucement
		$array = $this->query("SELECT * FROM `$tbAct` ORDER BY RAND() LIMIT 1"); // lấy ngẫu nhiên thông báo
		$array = $array->fetch_assoc();
		$equipArr = explode(",", $array["activity"]); // tách các trang bị ra mảng
		$user = $this->getInfoByKey('id', $array["uid"], $table); // get thông tin user
		$source = '';
		$cost = 0;
		foreach ($equipArr as $object) {
			$row = $this->getInfoByKey('pic', $object);
			$rowShop = $this->getInfoByKey('template_id', $row["template_id"], $tbShop);
			if(!$row) return "1";
			$source .= '<div class="item">'.$row["name"].' <span>('.$rowShop["AValue1"].'G)</span></div>';
			$cost += $rowShop["AValue1"]; // cộng dồn giá trị các trang bị
		}
		return '<p>Người dùng <span class="animated flash">'.$user["name"].'</span> vừa mua tổng trang bị trị giá '.$cost.'G.</p><div class="view-equip">(Xem trang bị)<div class="list">'.$source.'</div></div><span class="close-btn">X</span>';
	}

	public function qa_get_html_item_bag($list, $gt = 1, $type = 1, $tbShop = 'qa_gunny_shop')
	{
		if(count($list) == 0) return "<p id='alert-txt'>Bạn chưa chọn mòn hàng nào...</p>\n0\n0";
		$list = array_unique($list); // xóa các object trùng lập
		$source = '';
		$totalCost = 0;
		$count = 0;
		foreach ($list as $key=>$value) {
			$info = $this->getInfoByKey("pic", $value);
			$infoShop = $this->getInfoByKey("template_id", $info["template_id"], $tbShop);
			if(!$infoShop) continue;
			$count++;
			if($key == 'suits')
				$linkImg = $this->get_config_img($info["category_id"], $info["pic"], 0);
			else
				$linkImg = $this->get_config_img( $info["category_id"], $info["pic"], $gt);
			
			$totalCost += $infoShop["AValue1"];
			$source .= '<div class="item-show-shop" pic="'.$value.'" typeEquip="'.$key.'">
				<div class="img-item" style="background-image: url('.$linkImg.')"></div>
				<p class="name-item">'.$info["name"].' - '.$infoShop["AValue1"].'G</p>
				<div class="border-info"></div>
				<div class="info-item">
					<table>
						<tr>
							<td>Thông minh: '.$info["clever"].'</td>
							<td>May mắn: '.$info["luck"].'</td>
						</tr>
						<tr>
							<td>Nhanh nhẹn: '.$info["agility"].'</td>
							<td>Phong cách: '.$info["style"].'</td>
						</tr>
					</table>
				</div>
				'.(($type == 1) ? '<button class="btn-remove-item">x</button>' : '').'
			</div>';

		}
		return ($source != '' ? preg_replace( "/\r|\n/", "", $source ) : '1')."\n".$count."\n".number_format($totalCost, 0 , '.' , '.' );
	}

	public function qa_get_html_search_ajax($string = "", $gt = 1, $limit = 6, $ultimate = 'false',  $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		$string = trim($string);
		$ultimateCheck = ($ultimate == 'true') ? true : false;
		if($ultimateCheck) 
			$array = $this->query("SELECT * FROM `$table` WHERE name LIKE '%$string%' AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))");
		else
			$array = $this->query("SELECT * FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))");
		
		$source = '';
		$c = 0;
		While($rows = $array->fetch_assoc()){
			if($c == $limit) break;
			$c++;
			$info = $this->getInfoByKey('template_id', $rows["template_id"], $tbShop);
			// lấy prefix theo $category_id
			$prefix = $this->get_config_img($rows["category_id"], "", 0, 1);

			$linkImg = $this->get_config_img($rows["category_id"], $rows["pic"], $gt);

			$source .= '<div class="frame" cat="'.$prefix.'" pic="'.$rows["pic"].'" catid="'.$rows["category_id"].'" img="'.$linkImg.'">';
			$txt = $info["label"] == 1 ? "<span>(Hot)</span>" : ($info["label"] == 2 ? "<span>(New)</span>": "");
			$source .= '	<div class="name-result">'.$rows["name"].' '.$txt.' - '.(($ultimate === 'false' || $info) ? '$'.$info["AValue1"] : '<span id="sold">Sold Out</span>').'</div>';
			$source .= ($rows["description"]) ? '<div class="desc">'.$rows["description"].'</div>' : '';
			$source .= '	<div class="picture" style="background-image: url('.$linkImg.')"><div class="arrow"></div></div>';
			$source .= '</div>';
		}
		
		if(!$source) $source .= 'Không có kết quả cho từ : '.htmlspecialchars($string, ENT_QUOTES, "UTF-8");
		if($array->num_rows == 0)
			$source .= '<hr><p id="other-result">0 kết quả.</p>';
		else
			$source .= '<hr><p id="other-result">'.$array->num_rows.' kết quả. <a style="cursor: pointer;">Xem ngay</a></p>';
		
		return $source;
	}

	// $limit : giới hạn trang bị hiển thị
	public function qa_get_html_hot_item($limit=6, $gt = 1, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		# get html hot item
		$array = $this->query("SELECT * FROM `$table` WHERE template_id IN (SELECT template_id FROM $tbShop WHERE label = 1) AND NeedSex = $gt ORDER BY RAND() LIMIT $limit");
		$source = '';
		While($rows = $array->fetch_assoc()){
			$info = $this->getInfoByKey('template_id', $rows["template_id"], $tbShop);
			$source .=  '<div class="item-frame">';
			$source .=  '<div class="img" style="background-image: url('.$this->get_config_img($rows["category_id"], $rows["pic"], $gt).')"></div>';
			$source .=  '<div class="info">
							<p class="name-item">'.$rows["name"].'</p>
							<p class="cost">'.$info["AValue1"].'<span class="currency" style="background-image: url('.$this->resHost.'xu2.png);"></span></p>
							<div class="btn">
								<div class="action-btn" id="give" style="background-image: url('.$this->resHost.'shop/btn-give-2.png);"></div>
								<div class="action-btn" id="ask" style="background-image: url('.$this->resHost.'shop/btn-ask-2.png);"></div>
								<div class="action-btn" id="buy" style="background-image: url('.$this->resHost.'shop/btn-buy-2.png);"></div>
							</div>
						</div>';
			$source .= '</div>';
		}
		return $source;
	}

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
		$init = array("label" => "", "can" => "", "loaihinh" => "", "image" => "", "gioitinh" => "", "prefix" => "", "border" => "<div class='border-info'></div>", "position" => "bottom", "desc" => "");
		// nhãn cho item : hot và new
		if($data["dtShop"]["label"] == 1) 
			$init["label"] = '<span class="span-state hot"></span>'; 
		else if($data["dtShop"]["label"] == 2) 
			$init["label"] = '<span class="span-state new"></span>';
		$state_text = "";
		// 6 lines bên dưới ko cần cũng dc
		if($data["dtItem"]["CanStrengthen"] && $data["dtItem"]["CanCompose"]) 
			$init["can"] = '<p id="state-item">Có thể ghép và cường hóa</p>';
		else if($data["dtItem"]["CanCompose"])
			$init["can"] = '<p id="state-item">Có thể ghép</p>';
		else if($data["dtItem"]["CanStrengthen"])
			$init["can"] = '<p id="state-item">Có thể cường hóa</p>';
		// lấy tên category dựa trên id
		$init["loaihinh"] = $this->get_config_img($data["catId"], "", $data["gt"], 2);
		// lấy link image icon
		$init["image"] = $this->get_config_img($data["catId"], $data["dtItem"]["pic"], $data["gt"]);
		// giới tính
		$init["gioitinh"] = ($data["dtItem"]["NeedSex"] == 1) ? '<p id="state-item">Giới tính: Nam</p>' : (($data["dtItem"]["NeedSex"] == 2) ? '<p id="state-item">Giới tính: Nữ</p>': '');
		// lấy prefix theo $category_id
		$init["prefix"] = $this->get_config_img($data["catId"], "", 0, 1);
		// border
		if($init["gioitinh"] == "" && $init["can"] == "") $init['border'] = "";
		// xử lý ví trí khung thông tin sản phẩm
		if($data["c"] <= 2) $init["position"] = "bottom"; else if($data["c"] <= 6 ) $init["position"] = "center"; else if($data["c"] <= 8) $init["position"] = "top";
		// mô tả trang bị
		if(!empty($data["dtItem"]["description"])) $init["desc"] = "<p id='description'>".$data['dtItem']['description']."</p><div class='border-info'></div>";
		$data["init"] = $init;
		return $data;
	}

	private function qa_get_html_frame($data){
		$source = '<div class="item-frame">';
		$source .= '<div class="img" style="background-image: url('.$data["init"]["image"].')" img="'.$data["init"]["image"].'" cat="'.$data["init"]["prefix"].'" pic="'.$data["dtItem"]["pic"].'" catid="'.$data["catId"].'" state="'.(isset($data["dtItem"]["state"]) ? $data["dtItem"]["state"] : '0').'">
						<div class="animate-border-blink"></div>
						<div class="select-item">
							<span><img src="'.$this->resHost.'trywear-icon.png"></span>
						</div>'.$data["init"]["label"].'
					</div>';
		$source .= '<div class="info">
						<p class="name-item">'.$data["dtItem"]["name"].'</p>
						<p class="cost">'.($data["dtShop"] ? $data["dtShop"]["AValue1"] : 'Sold Out').'<span class="currency" style="background-image: url('.$this->resHost.'xu2.png);"></span></p>
						<div class="btn">
							<div class="action-btn" id="give" style="background-image: url('.$this->resHost.'shop/btn-give-2.png);"></div>
							<div class="action-btn" id="ask" style="background-image: url('.$this->resHost.'shop/btn-ask-2.png);"></div>
							<div class="action-btn" id="buy" style="background-image: url('.$this->resHost.'shop/btn-buy-2.png);"></div>
						</div>
					</div>';
		$source .= '<div class="zzInfo d'.$data["dtItem"]["quality"].'" id="'.$data["init"]["position"].'">
						<div class="power-item">
							<p id="name">'.$data["dtItem"]["name"].'</p>
							<p class="field-main" id="quality">
								<span>Phẩm chất</span>
								<strong>'.$data["quality"][$data["dtItem"]["quality"]-1].'</strong>
							</p>
							<p class="field-main"><span>Loại hình</span><strong>'.$data["init"]["loaihinh"].'</strong></p>
							<div class="border-info"></div>
							<p class="properties">Thông minh:'.$data["dtItem"]["clever"].'</p>
							<p class="properties">Phong cách:'.$data["dtItem"]["style"].'</p>
							<p class="properties">Nhanh nhẹn:'.$data["dtItem"]["agility"].'</p>
							<p class="properties">May mắn:'.$data["dtItem"]["luck"].'</p>
							<div class="border-info"></div>'.$data["init"]["gioitinh"].$data["init"]["can"].$data["init"]["border"].$data["init"]["desc"];
		$source .='</div></div></div>';
		return $source;
	}

	public function qa_get_html_search($string = "", $current_page = 1, $gt = 1, $ultimate = 'false', $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		return $this->qa_get_html_by_catId(0, $current_page, $gt, $ultimate, array(
			"saleArray" => "SELECT count(*) as num FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))",
			"array" => "SELECT * FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))"
		));
		$query = array();
		$ultimateCheck = ($ultimate == 'true') ? true : false;
		if($ultimateCheck){
			$query["saleArray"] = "SELECT count(*) as num FROM `$table` WHERE name LIKE '%$string%' AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))";
			$query["array"] = "
			SELECT
				CASE
					WHEN template_id IN (SELECT template_id from `$tbShop`) THEN 0 ELSE 1
				END AS state, $table.*
			FROM `$table` 
			WHERE name LIKE '%$string%' AND (NeedSex = $gt  OR (NeedSex = 0 AND (category_id = 15 OR  category_id = 13)))
			ORDER BY state ASC";
		}else{
			$query["saleArray"] = "SELECT count(*) as num FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))";
			$query["array"] = "SELECT * FROM `$table` WHERE name LIKE '%$string%' AND template_id IN (SELECT template_id FROM `$tbShop`) AND (NeedSex = $gt OR (NeedSex = 0 AND (category_id = 15 OR category_id = 13)))";
		}
		return $this->qa_get_html_by_catId(0, $current_page, $gt, $ultimate, $query);
	}

	// $current_page : trang hiện tại
	// $gt : giới tính
	// $table : bảng chứa thông tin sản phẩm
	// $tbShop : bảng chứa giá trị vật phẩm trong shop
	// $tbCat : bẳng chứa id category
	public function qa_get_html_by_catId($catId, $current_page = 1, $gt = 1, $ultimate = 'false', $query = null, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop')
	{
		# Xuất ra html cho shop bằng category_id
		if($catId == 13 || $catId == 15) $gt = 0; // nếu category thuộc id 13(set quần áo) hay 15(cánh) thì ko cần giới tính
		$ultimateCheck = ($ultimate == 'true') ? true : false;
		if($ultimateCheck)
			$saleArray = $this->query($query ? $query["saleArray"] : "SELECT count(*) as num FROM `$table` WHERE pic <> 'default' AND category_id = $catId AND NeedSex = $gt");
		else
			$saleArray = $this->query($query ? $query["saleArray"] : "SELECT count(*) as num FROM `$table` WHERE template_id IN (SELECT template_id FROM `$tbShop`) AND category_id = $catId AND NeedSex = $gt AND pic <> 'default'"); // lấy số lượng item có trong shop theo category_id
		$num_sale = $saleArray->fetch_assoc();
		$pageHandle = $this->pagination_handle(array(
			"countRecord" => $num_sale['num'],
			"currentPage" => $current_page,
			"limit" => 8
		));
		if($ultimateCheck)
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
			$c = 0;
			$source = "";
			foreach ($array as $row) {
				$source .= $this->qa_get_html_frame($this->info_init_frame(array(
					"dtItem" => $row,
					"dtShop" => $this->getInfoByKey('template_id', $row["template_id"], "qa_gunny_shop"),
					"c" => ++$c,
					"catId" => $query ? $row["category_id"] : $catId,
					"gt" => $gt,
					"quality" => array("Thô", "Thường", "Ưu tú", "Hoàn mỹ", "Siêu việt")
				)));		
			}
			return preg_replace( "/\r|\n/", "", $source )."\n".$pageHandle['total']."\n".$pageHandle["currentPage"]."\n".$num_sale['num'];
		}else{
			return "1";
		}
	}
};