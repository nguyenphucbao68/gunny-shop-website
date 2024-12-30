<?php 
$gnShop_config = array(
	"nameLabel" => array(
        "0" => "Normal",
        "1" => "Hot",
        "2" => "New"
    ),
    "catIdPrefix" => array(
    	"1" => array("prefix" => "head", "name" => "Nón"),
        "2" => array("prefix" => "glass", "name" => "Kính"),
        "3" => array("prefix" => "hair", "name" => "Tóc"),
        "4" => array("prefix" => "eff", "name" => "Mặt"),
        "5" => array("prefix" => "cloth", "name" => "Áo"),
        "6" => array("prefix" => "face", "name" => "Mắt"),
        "13" => array("prefix" => "suits", "name" => "Bộ"),
        "15" => array("prefix" => "wing", "name" => "Cánh")
    )
);
DEFINE("gnShop_config", serialize($gnShop_config));
