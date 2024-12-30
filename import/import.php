<?php
DEFINE("AUTHOR", "Jack098");
DEFINE("PROJECT", "GUNNY_AVATAR_CANVAS");

require "import.class.php";
/**
* Import Dữ Liệu
*/
final class ImportHandle extends GunnyHandle // kế thừa class cha là import.class.php
{
	// $idList : danh sách id cần import vào csdl
	// $table : bảng thông tin vậ phẩm
	// $alert : thông báo
	public function RunItem($idList, $table, $alert = "") // function để import các vật phẩm
	{
		$queryCheck = !($this->query("DELETE FROM `$table` WHERE 1")) || !($this->query("ALTER TABLE `$table` AUTO_INCREMENT = 1;"));
		if($queryCheck) throw new Exception("Không thể reset table `$table`");
		$time = microtime(true); // khởi động thời gian bắt đầu chạy tổng
		for ($i=0; $i < count($idList); $i++) { // chạy hết category_id có trong mảng $idList
			$start = microtime(true); // khởi động thời gian chạy cho từng category_id
			GunnyHandle::Test_Get_All_Items($idList[$i], $table, $alert);
			$time_elapsed_secs = microtime(true) - $start; // thời gian end cho category_id
			echo "TG:".$time_elapsed_secs."<br>";
			echo "------------------------------------------------<br>";
		}
		echo "Total : ".(microtime(true) - $time); // thời gian kết thúc cả chương trình
	}

	public function RunItemShop($idList, $table, $alert = "")
	{
		$start = microtime(true);
		GunnyHandle::ImportShopToSql($idList, $table, $alert);
		echo "Total:".(microtime(true) - $start)."<br>";
	}
}
try{
	$import = new ImportHandle(array(
		"itemList" => "xml/templatealllist222.xml",
		"itemShop" => "xml/shopitemlist222.xml"
	));
	// 1, 2, 3, 4, 5, 6, 13, 15 chính là các category_id cần import
	// $import->RunItem([1, 2, 3, 4, 5, 6, 13, 15], "qa_gunny_items", "Đã thêm \{name\} - \{pic\}");
	// $import->RunItemShop([1, 2, 3, 4, 5, 6, 13, 15], "qa_gunny_shop", "Đã thêm \{qa_gunny_items.name\} vào shop");
	$import->Download_All_Resources('qa_gunny_items', 'Done');
}catch(Exception $e){
	echo $e;
}

