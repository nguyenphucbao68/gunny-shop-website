<?php
include_once '../shopconfig.php';

echo json_encode(array(
	"gnShop_config" => $gnShop_config,
	"gnConfig" => array(
		"host" => "http://localhost/studymake/test"
	),
	"gnConst" => array(
		"actionSplit" => ";",
		"optionSplit" => ";",
		"dataSplit" => ";",
		"optionSplitKeyData" => "=",
		"dataHtmlSplit" => ":",
		"actionInit" => "init"
	),
	"gnShop" => array(
		"menu" => array(
			"data" => array(
				array(
					"name" => "Trang bị",
					"menuId" => 0,
					"activeClass" => "active",
					"data" => array(
						array(
							"name" => "Kính",
							"catId" => 2,
							"activeClass" => "active"
						),
						array(
							"name" => "Áo",
							"catId" => 5
						),
						array(
							"name" => "Nón",
							"catId" => 1
						)
					)
				),
				array(
					"name" => "Làm đẹp",
					"menuId" => 1,
					"data" => array(
						array("name" => "Tóc", "catId" => 3, "activeClass" => "active"),
						array("name" => "Mắt", "catId" => 6),
						array("name" => "Mặt", "catId" => 4),
						array("name" => "Bộ", "catId" => 13),
						array("name" => "Cánh", "catId" => 15)
					)
				)
			)
		),
		"ultimate" => true,
		"menuId" => 0,
		"keyword" => null,
		"gt" => 1
	),
	"gnQuery" => array(
		"line" => array("start" => "START", "state" => false, "end" => "END"),
		"condition" => array(
			"state" => false,
			"valueState" => false,
			"equal" => false,
			"doSth" => false,
			"valuePrefix" => "STARTVALUE",
			"valueEndPrefix" => "ENDVALUE",
			"doSthPrefix" => "STARTDO",
			"doSthEndPrefix" => "ENDDO",
			"elseSth" => false,
			"elsePrefix" => "STARTELSE",
			"elseEndPrefix" => "ENDELSE"
		),
		"equal" => array("prefix" => "equal"),
		"runObj" => array("state" => false, "prefix" => "RUN", "data" => ""),
		"string" => array("state" => false, "prefix" => "STRING", "data" => ""),
		"block" => array("state" => false, "start" => "STARTBLOCK", "end" => "ENDBLOCK"),
		"key" => array("state" => false, "start" => true, "data" => "", "prefix" => "METHOD")
	),
	"gnShopHtmlStore" => array(
		"gnMainContent" => array("display" => "inline-block", "data" => null, "elem" => null),
		"gnMenu" => array("display" => "inline-block", "data" => null, "elem" => null),
		"gnSubMenu" => array("display" => "inline-block", "data" => null, "elem" => null),
		"gnHotItem" => array("display" => "block", "data" => null, "elem" => null),
		"gnSearchDW" => array("display" => "block", "data" => null, "elem" => null),
		"gnItemListCart" => array("display" => "block", "data" => null, "elem" => null),
	),
	"gnAvatarWingAnimationObject" => array(
		"x" => 0,
		"y" => 0,
		"curFrame" => 0,
		"reverse" => false,
		"typeName" => "wing",
		"wingDouble" => array('wing002', 'wing003', 'wing004', 'wing005', 'wing006', 'wing007', 'wing008', 'wing009', 'wing018', 'wing019', 'wing020', 'wing021', 'wing022', 'wing023', 'wing024', 'wing025', 'wing026', 'wing027', 'wing028', 'wing029', 'wing030', 'wing31', 'wing32', 'wing33', 'wing34', 'wing61', 'wing63', 'wing64', 'wing65', 'wing66', 'wing70', 'wing75', 'wing76', 'wing79', 'wing81', 'wing86', 'wing87', 'wing93', 'wing94', 'wing100')
	),
	"gnAvatarHandle" => array(
		"dx" => 23,
	    "dy" => 25,
	    "dWidth" => 130,
	    "dHeight" => 162
	),
	"gnAvatarDrawAnimation" => array(
		"cEAction" => 0,
	    "cEClose" => 0,
	    "timeDelay" => 4000,
	    "timeCloseDelay" => 2000,
	    "timeIntervalDelay" => 50,
	    "widthOnceFrame" => 250,
	    "heightOnceFrame" => 312,
	    "widthOnceFrameSuit" => 255, 
	    "heightOnceFrameSuit" => 342
	),
	"gnAvatarInfoDefault" => array(
		"color" => array("face" => 0, "hair" => 0, "head" => 0, "cloth" => 0, "glass" => 0, "eff" => 0),
		"suit" => array("face" => 0, "hair" => 0, "head" => 0, "cloth" => 0, "glass" => 0, "eff" => 0, "wing" => 0, "suits" => 0),
		"frame" => array("head" => "Nón", "glass" => "Kính", "face" => "Mắt", "eff" => "Mặt", "cloth" => "Áo", "suits" => "Bộ", "wing" => "Cánh", "hair" => "Tóc"),
		"hide" => array("head" => 0, "glass" => 0, "suits" => 0, "wing" => 0),
		"staticObject" => array("circle" => 0, "level" => 0, "vip" => 0, "badge" => 0, "masPractitioners" => null, "love" => null, "weapon" => null, "posCtx" => -38)
	),
	"gnAvatarInfo" => array(
		"skinColor" => null
	)
));