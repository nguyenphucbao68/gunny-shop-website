<?php
/**
* Class Handle Ajax
*/
class AjaxHandle
{
	public $servername = "localhost"; // host
	public $username = "root"; // user
	public $password = "123456"; // pass
	public $database = "gunny"; // database
	public $conn; // connect database
	public $host = "http://localhost/studymake/test/";
	public $resHost = "http://localhost/studymake/logo/gunny/";

	function __construct()
	{
		# connect database
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
		if ($this->conn->connect_error) {
    		die("Connection failed: " . $this->conn->connect_error);
		} 
		$this->conn->set_charset("utf8");
	}

	public function get_config_img($catId = 0, $pic = "", $gt = 0, $type = 0)
	{
		# Hàm Get Config lấy url image hay prefix của từng id
		$pathChar = ($gt == 1) ? "m" : "f";
		$prefix = array(
			"1"=> array(
				"link"=> "equip/".$pathChar."/head/".$pic."/icon_1.png",
				"prefix"=> "head",
				"name" => "Nón"
			),
			"3"=> array(
				"link"=> "equip/".$pathChar."/hair/".$pic."/icon_1.png","prefix"=> "hair", "name"=>"Tóc"
			),
			"5"=> array(
				"link"=> "equip/".$pathChar."/cloth/".$pic."/icon_1.png","prefix"=> "cloth", "name"=>"Áo"
			),
			"2"=> array(
				"link"=> "equip/".$pathChar."/glass/".$pic."/icon_1.png","prefix"=> "glass", "name"=>"Kính"
			),
			"4"=> array(
				"link"=> "equip/".$pathChar."/eff/".$pic."/icon_1.png","prefix"=> "eff","name"=>"Mặt"
			),
			"6"=> array(
				"link"=> "equip/".$pathChar."/face/".$pic."/icon_1.png","prefix"=> "face","name"=>"Mắt"
			),
			"13"=> array(
				"link"=> "equip/".$pathChar."/suits/".$pic."/icon_1.png","prefix"=> "suits","name"=>"Bộ"
			),
			"15"=> array(
				"link"=> "equip/wing/".$pic."/icon.png","prefix"=> "wing","name"=>"Cánh"
			)
		);
		return ($type == 0) ? $this->host.$prefix[$catId]["link"] : (($type == 1) ? $prefix[$catId]["prefix"] : $prefix[$catId]["name"]);
	}

	public function get_html_menu_content_shop($area = "trang-bi", $gt)
	{
		# Hàm Get Sub-Menu và content sau khi click menu
		// $menu_tab = array menu thuận lợi cho việc chỉnh sửa
		$menu_tab = array(
			"trang-bi" => array(
				"name" => "Trang bị",
				"menu_id" => 1,
				"tab" => [
					array(
						"cat_id" => 2,
						"name" => "Kính"
					),
					array(
						"cat_id" => 5,
						"name" => "Áo"
					),
					array(
						"cat_id" => 1,
						"name" => "Nón"
					)
				]
			),
			"lam-dep" => array(
				"name" => "Làm đẹp",
				"menu_id" => 2,
				"tab" => [
					array(
						"cat_id" => 3,
						"name" => "Tóc"
					),
					array(
						"cat_id" => 6,
						"name" => "Mắt"
					),
					array(
						"cat_id" => 4,
						"name" => "Mặt"
					),
					array(
						"cat_id" => 13,
						"name" => "Bộ"
					),
					array(
						"cat_id" => 15,
						"name" => "Cánh"
					)
				]
			)
		);

		$source = '';
		$data = '';
		$c = 0;
		foreach ($menu_tab[$area]["tab"] as $key => $value2) {
			# tạo menu dựa trên array $menu_tab
			$c++;
			$data .= '<div class="btn '.($c == 1 ? "active" : "").'" catId="'.$value2["cat_id"].'">'.$value2["name"].'</div>';
			// $c == 1 thêm class .active : sau khi click menu thì tất nhiên submenu đầu tiên sẽ được focus
		}

		$shop_frame = $this->qa_get_html_by_catId($menu_tab[$area]["tab"][0]["cat_id"], 1, $gt);
		$tab_content = explode("\n", $shop_frame);
		
		// xuất ra $source
		$source = '
			<div class="sub-tab">
				'.$data.'
			</div>
			<div class="border"></div>
			<div class="show">
				<div>
					'.$tab_content[0].'
				</div>
				
			</div>
			';
		return preg_replace( "/\r|\n/", "", $source )."\n".$tab_content[1]."\n".$tab_content[2]."\n".$menu_tab[$area]["tab"][0]["cat_id"];
	}

	private function getInfoByKey($key = '', $value = '', $table = 'qa_gunny_items')
	{
		if($value == '' && $key == '') return false;
		$array = $this->conn->query("SELECT * FROM $table WHERE $key='$value'");
		if($array->num_rows > 0) return $array->fetch_assoc();
		return false;
	}

	// $current_page : trang hiện tại
	// $gt : giới tính
	// $table : bảng chứa thông tin sản phẩm
	// $tbShop : bảng chứa giá trị vật phẩm trong shop
	// $tbCat : bẳng chứa id category
	public function qa_get_html_by_catId($catId, $current_page = 1, $gt = 1, $table = 'qa_gunny_items', $tbShop = 'qa_gunny_shop', $tbCat = 'qa_gunny_cat_id')
	{
		# Xuất ra html cho shop bằng category_id
		$limit = 8; // giới hạn mỗi trang
		if($catId == 13 || $catId == 15) $gt = 0; // nếu category thuộc id 13(set quần áo) hay 15(cánh) thì ko cần giới tính
		$array = $this->conn->query("SELECT * FROM $tbShop WHERE template_id IN (SELECT template_id FROM $table WHERE category_id = $catId AND NeedSex = $gt AND pic <> 'default')"); // lấy số lượng item có trong shop theo category_id
		$total_page = ceil(($array->num_rows) / $limit); // tổng trang
		if(!$total_page) $total_page = 0;
		if($current_page < 1) $current_page = 1;
		if($current_page > $total_page) $current_page = $total_page;
		$start = ($current_page - 1) * $limit; // vị trí bắt đầu để get trong csdl
		$quality = array("Thô", "Thường", "Ưu tú", "Hoàn mỹ", "Siêu việt"); // phẩm chát vật phẩm
		$array = $this->conn->query("SELECT * FROM $tbShop WHERE template_id IN (SELECT template_id FROM $table WHERE category_id = $catId AND NeedSex = $gt) LIMIT $start, $limit"); // lấy tất cả các item từ vị trí thứ $start và $limit rows
		if($array->num_rows > 0){
			$c = 0;
			$source = "";
			foreach ($array as $row) {
				$rows = $this->getInfoByKey('template_id', $row["template_id"]); // lấy thông tin vật phẩm đó
				if($rows == false) continue;
				$c++;
				$state_text = "";

				// 6 lines bên dưới ko cần cũng dc
				if($rows["CanStrengthen"]==true && $rows["CanCompose"]==true) 
					$state_text = '<p id="state-item">Có thể ghép và cường hóa</p>';
				else if($rows["CanCompose"]==1)
					$state_text = '<p id="state-item">Có thể ghép</p>';
				else if($rows["CanStrengthen"]==1)
					$state_text = '<p id="state-item">Có thể cường hóa</p>';

				// lấy tên category dựa trên id
				$loaihinh = $this->get_config_img($catId, "", $gt, 2);
				//$this->conn->query('SELECT * FROM $tbCat WHERE id='.$rows["category_id"]);
				
				// lấy link image icon
				$linkImg = $this->get_config_img($catId, $rows["pic"], $gt);

				// giới tính
				$needSex = ($rows["NeedSex"] == 1) ? '<p id="state-item">Giới tính: Nam</p>' : (($rows["NeedSex"] == 2) ? '<p id="state-item">Giới tính: Nữ</p>': '');

				// lấy prefix theo $category_id
				$prefix = $this->get_config_img($catId, "", 0, 1);

				// nhãn cho item : hot và new
				$label = "";
				if($row["label"] == 1)
					$label = '<span class="span-state hot"></span>';
				elseif($row["label"] == 2)
					$label = '<span class="span-state new"></span>';

				$border = '<div class="border-info"></div>';
				if($needSex == "" && $state_text == "") $border = "";

				// xử lý ví trí khung thông tin sản phẩm
				if($c <= 4) 
					$position = "bottom";
				else if($c <= 6 ) 
					$position = "center";
				else if($c <= 8)
					$position = "top";
	$source .= '
<div class="item-frame">
	<div class="img" style="background-image: url('.$linkImg.')" img="'.$linkImg.'" cat="'.$prefix.'" pic="'.$rows["pic"].'" catid="'.$catId.'">
		<div class="animate-border-blink"></div>
		<div class="select-item">
			<span><img src="'.$this->resHost.'trywear-icon.png"></span>
		</div>
		
		'.$label.'
	</div>

	<div class="info">
		<p class="name-item">'.$rows["name"].'</p>
		<p class="cost">'.$row["AValue1"].'<span class="currency" style="background-image: url('.$this->resHost.'xu2.png);"></span>
		</p>
		<div class="btn">
			<div class="action-btn" id="give" style="background-image: url('.$this->resHost.'shop/btn-give-2.png);"></div>
			<div class="action-btn" id="ask" style="background-image: url('.$this->resHost.'shop/btn-ask-2.png);"></div>
			<div class="action-btn" id="buy" style="background-image: url('.$this->resHost.'shop/btn-buy-2.png);"></div>
		</div>
	</div>

	<div class="zzInfo d'.$rows["quality"].'" id="'.$position.'">
		<div class="power-item">
			<p id="name">'.$rows["name"].'</p>
			<p class="field-main" id="quality">
				<span>Phẩm chất</span>
				<strong>'.$quality[$rows["quality"]-1].'</strong>
			</p>
			<p class="field-main">
			<span>Loại hình</span>
			<strong>'.$loaihinh.'</strong></p>
			<div class="border-info"></div>
			<p class="properties">Thông minh:'.$rows["clever"].'</p>
			<p class="properties">Phong cách:'.$rows["style"].'</p>
			<p class="properties">Nhanh nhẹn:'.$rows["agility"].'</p>
			<p class="properties">May mắn:'.$rows["luck"].'</p>
			<div class="border-info"></div>
			'.$needSex.$state_text.$border.'
			
			';
			if(!empty($rows["description"])){
				$source .= '<p id="description">'.$rows["description"].'</p><div class="border-info"></div>';
			};
$source .='
			
			
		</div>
	</div>
</div>
				';

			}
			
			return preg_replace( "/\r|\n/", "", $source )."\n".$total_page."\n".$current_page;
		}
	}
};