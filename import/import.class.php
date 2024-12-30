<?php
set_time_limit(0); // bắt buộc. Vì ta cần treo để chắc chắc import hết dữ liệu. Mặc định khi ko có hàm này, file php chỉ có thể chạy tối đa là 30s
// mysqli_report(MYSQLI_REPORT_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
libxml_use_internal_errors(true);
DEFINE("PATH_RESOURCE", "http://localhost/studymake/tests/");

require '../library/handle.class.php';
/**
* HÀM XỬ LÝ AVATAR GUNNY DỰA TRÊN XML
*/
class GunnyHandle extends GlobalFunction
{
	function __construct($xml)
	{
		foreach ($xml as $key => $value) {
			$this->{$key} = simplexml_load_file($value);
			if(!$this->{$key}) throw new Exception("Không thể đọc file xml : ".$value);
		}
		GlobalFunction::__construct();
	}

	protected function GetAllItemsByCat($catId)
	{
		$array = array();
		foreach ($this->itemList->ItemTemplate->Item as  $value) {
			if($value->attributes()->CategoryID == $catId)
				$array[] = (object) $value;
		}
		return $array;
	}

	// private function stringHandle($string='')
	// {
	// 	# xử lý chuỗi thông báo
	// 	preg_match_all('/\\\{(.*?)\\\}/i', $string, $match);
	// 	return $match;
	// }

	protected function GetAllItemInShop()
	{
		$array = array();
		foreach ($this->itemShop->Store->Item as $value) {
			$array[] = $value;
		}
		return $array;
	}


	protected function GetVal($data, $key) 
	{
		# Đọc Dữ liệu trong từng attribute (thuộc tính) của từng thẻ 
		$value = $data->attributes()->$key;
		switch ($value) {
			case 'true':
				return 1;
				break;
			case 'false':
				return 0;
				break;
			default:
				return $value;
				break;
		}
	}

	private function Init_Data($data, $col)
	{
		$element = array();
		foreach ($col as $key => $value) {
			$element[$key] = $this->GetVal($data, $value);		
		}
		return $element;
	}

	public function ImportShopToSql($idList = null, $tbShop = 'qa_gunny_shop', $string = '', $table = 'qa_gunny_items')
	{
		$queryCheck = !($this->query("DELETE FROM `$tbShop` WHERE 1")) || !($this->query("ALTER TABLE `$tbShop` AUTO_INCREMENT = 1;"));
		if($queryCheck) throw new Exception("Không thể reset table `$tbShop`");
		$array = $this->GetAllItemInShop();
		foreach ($array as $value) {
			$element = $this->Init_Data($value, array(
				"template_id" => "TemplateID",
				"buy_type" => "BuyType",
				"is_bind" => "IsBind",
				"label" => "Label",
				"beat" => "Beat",
				"AUnit" => "AUnit",
				"APrice1" => "APrice1",
				"AValue1" => "AValue1",
				"APrice2" => "APrice2",
				"AValue2" => "AValue2",
				"BUnit" => "BUnit",
				"BPrice1" => "BPrice1",
				"BValue1" => "BValue1",
				"BPrice2" => "BPrice2",
				"BValue2" => "BValue2",
				"CUnit" => "CUnit",
				"CPrice1" => "CPrice1",
				"CValue1" => "CValue1",
				"CPrice2" => "CPrice2",
				"CValue2" => "CValue2",
				"LimitCount" => "LimitCount",
				"StartDate" => "StartDate",
				"EndDate" => "EndDate",
				"CanBuy" => "CanBuy"
			));
			$queryBuild = $this->Query_Handle($element);
			if($this->query("INSERT INTO `$tbShop`(".$queryBuild['key'].") VALUES (".$queryBuild['value'].")"))
				# Nếu import thành công vào csdl
				echo $this->Alert_String_Handle($element, $string)."<br/>";
		}
		if($idList && !$this->query("DELETE FROM `$tbShop` WHERE template_id IN (SELECT template_id FROM `$table` WHERE category_id NOT IN (".implode(', ', $idList)."))"))
			throw new Exception("Không thể delete các column ".implode(', ', $idList)." của `$tbShop`")
			;
	}

	private function Query_Handle($element)
	{
		$query = array();
		$query["key"] = implode(", ",array_keys($element));
		$query["value"] = array_values($element);
		foreach ($query["value"] as $idx=>$data) 
			if(!is_int($data) && !is_bool($data)) $query["value"][$idx] = "'".mysql_real_escape_string($data)."'";
		$query["value"]  = implode(", ", $query["value"]);
		return $query;
	}

	public function Alert_String_Handle($element, $string='')
	{
		preg_match_all('/\\\{(.*?)\\\}/i', $string, $alert);
		$text = $string;
		for ($i=0; $i < count($alert[0]); $i++) { 
			# Chuyển chuỗi thành các thuộc tính phủ hợp
			$strTable = strpos($alert[1][$i], '.');
			if($strTable){
				$tbStr = substr($alert[1][$i], 0, $strTable);
				$column = substr($alert[1][$i], $strTable+1, strlen($alert[1][$i])-$strTable+1);
				$row = $this->getInfoByKey("template_id", $element["template_id"], $tbStr);
				$text = str_replace($alert[0][$i], $row[$column], $text); 
			}else{
				$text = str_replace($alert[0][$i], $element[$alert[1][$i]], $text); 
			}
			
		}
		return $text; // in thông báo
	}

	public function Test_Get_All_Items($catId, $table = 'qa_gunny_items', $string = '')
	{
		$allItems = $this->GetAllItemsByCat($catId);
		foreach ($allItems as $value) {
			$element = $this->Init_Data($value, array(
				"name" => "Name",
				"category_id" => "CategoryID",
				"template_id" => "TemplateID",
				"description" => "Description",
				"pic" => "Pic",
				"quality" => "Quality",
				"clever" => "Attack",
				"style" => "Defence",
				"agility" => "Agility",
				"luck" => "Luck",
				"CanCompose" => "CanCompose",
				"CanDelete" => "CanDelete",
				"CanDrop" => "CanDrop",
				"CanEquip" => "CanEquip",
				"CanStrengthen" => "CanStrengthen",
				"CanUse" => "CanUse",
				"CanTransfer" => "CanTransfer",
				"MaxCount" => "MaxCount",
				"NeedLevel" => "NeedLevel",
				"NeedSex" => "NeedSex"
			));
			$queryBuild = $this->Query_Handle($element);
			if($this->query("INSERT INTO `$table`(".$queryBuild['key'].") VALUES (".$queryBuild['value'].")")) {
				echo $this->Alert_String_Handle($element, $string)."<br/>";
			}
		}
	}

	// $filepath : đường dẫn
	// $message : nội dung đọc image down về
	final private function forceFilePutContents($filepath, $message){
	    try {
	        $isInFolder = preg_match("/^(.*)\/([^\/]+)$/", $filepath, $filepathMatches);
	        if($isInFolder) {
	            $folderName = $filepathMatches[1];
	            $fileName = $filepathMatches[2];
	            if (!is_dir($folderName)) {
	                mkdir($folderName, 0777, true);
	            }
	        }
	        file_put_contents($filepath, $message);
	    } catch (Exception $e) {
	        throw new Exception("ERR: error writing '$message' to '$filepath', ". $e->getMessage());
	    }
	}

	// $table : bảng chứa các thông tin vật phẩm
	// $string : thông báo
	// $dir : path sau khi download
	// $folder : folder muốn bỏ ảnh vào 
	// $host : $host chứa server ảnh
	public function Download_All_Resources($table = 'qa_gunny_items', $string = '', $folder = 'img_thieu', $host='http://resstagging.gn.zing.vn/image/')
	{
		# Download tất cả resource trong $host
		// $prefix dùng để get các link kiểm tra object đó có tồn tại trong resource ko?
		$prefix = array("1"=> "head", "3"=> "hair", "5"=> "cloth", "2"=> "glass", "4"=> "eff", "6"=> "face", "13"=> "suits", "15"=> "wing");
		// những đường link cần download dựa trên category_id
		$downRes = [
			array( 
				"id" => [1,2,4],
				"download" => [
					"equip/{pathChar}/{prefix}/{pic}/icon_1.png",
					"equip/{pathChar}/{prefix}/{pic}/icon_2.png",
					"equip/{pathChar}/{prefix}/{pic}/1/show.png",
					"equip/{pathChar}/{prefix}/{pic}/2/show.png"
				]
			),
			array(
				"id" => [5,6],
				"download" => [
					"equip/{pathChar}/{prefix}/{pic}/icon_1.png",
					"equip/{pathChar}/{prefix}/{pic}/icon_2.png",
					"equip/{pathChar}/{prefix}/{pic}/icon_3.png",
					"equip/{pathChar}/{prefix}/{pic}/1/show.png",
					"equip/{pathChar}/{prefix}/{pic}/2/show.png",
					"equip/{pathChar}/{prefix}/{pic}/3/show.png"
				] 
			),
			array(
				"id" => [3],
				"download" => [
					"equip/{pathChar}/{prefix}/{pic}/icon_1.png",
					"equip/{pathChar}/{prefix}/{pic}/icon_2.png",
					"equip/{pathChar}/{prefix}/{pic}/1/A/show.png",
					"equip/{pathChar}/{prefix}/{pic}/1/B/show.png",
					"equip/{pathChar}/{prefix}/{pic}/2/A/show.png",
					"equip/{pathChar}/{prefix}/{pic}/2/B/show.png",
				]
			),
			array(
				"id"=> [13],
				"download" => [
					"equip/{pathChar}/{prefix}/{pic}/icon_1.png",
					"equip/{pathChar}/{prefix}/{pic}/1/show.png",
				]
			),
			array(
				"id"=>[15],
				"download" => [
					"equip/{prefix}/{pic}/icon.png",
					"equip/{prefix}/{pic}/wings.swf",
				]
			)
		];
		foreach ($downRes as $value) {
			foreach ($value["id"] as $catId) {
				$array = $this->query("SELECT name, pic, NeedSex FROM `$table` WHERE category_id = $catId");
				if($array->num_rows > 0){
					foreach ($array as $row) {
						$sPrefix = $this->StringHandleReplace($value["download"][0], array(
							"pathChar" => ($row["NeedSex"] == 1) ? "m": "f",
							"pic" => $row["pic"],
							"prefix" => $prefix[$catId]
						));
						if(!@getimagesize(PATH_RESOURCE.$sPrefix)){
							foreach ($value["download"] as $pathDownload) {
								$pathDownload = $this->StringHandleReplace($pathDownload, array(
									"pathChar" => ($row["NeedSex"] == 1) ? "m": "f",
									"pic" => $row["pic"],
									"prefix" => $prefix[$catId]
								));
								if(@getimagesize($host.$pathDownload))
									$this->forceFilePutContents($folder."/".$pathDownload, file_get_contents($host.$pathDownload)); // nếu có thì tải về
							}
						}
					}
				}else throw new Exception("Không thể lấy được các vật phẩm có category_id = $catId");
			}
		}
		echo $string;
	}

	final private function StringHandleReplace($string, $element=null)
	{
		foreach ($element as $key => $value) 
			$string = str_replace("{".$key."}", $value, $string);
		return $string;
	}
}