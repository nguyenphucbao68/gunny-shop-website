<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Shop Gunny V1.0</title>
	<link rel="stylesheet" href="./asset/css/shop.css">
	<link rel="stylesheet" href="./asset/css/jquery-ui.css">
	<link rel="stylesheet" href="./asset/css/animate.min.css">
	<link rel="stylesheet" href="./asset/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="./asset/css/noty.css">
	<style>
		* {
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}
		body{
			margin: 0px;
			font-family: "Open Sans", "Ubuntu", "Helvetica", "Arial", "FreeSans", sans-serif;
			font-size: 15px;
			line-height: 1.5;
			position: relative;
			padding: 0px;
			color: #34495e;
		}
		input{
			background-color: #f5f7f7;
			font-family: "Open Sans", "Ubuntu", "Helvetica", "Arial", "FreeSans", sans-serif;
			padding: 5px;
			margin-top: 5px;
			margin-bottom: 5px;
			border: 1px solid #e6ebed;
			-webkit-transition: all 0.3s;
			transition: all 0.3s;
		}
		input:focus{
			background-color: #fff;
			border-color: #3498db;
			outline: 0;
		}
		input::-moz-focus-inner{
			padding: 0;
			border: 0;
			outline: 0;
		}
		
		p {
			margin: 0 0 1em 0;
		}
		img {
			vertical-align: bottom;
			max-width: 100%;
			height: auto !important;
		}
		input[type="submit"], button {
			cursor: pointer;
			text-align: center;
		}
		.wrapper{
			background: #2c3e50;
			
			height: 60px;
		}
		.wrapper p, .wrapper p a{
			font-weight: bold;
			font-size: 30px;
			color: #fff!important;
			text-shadow: 2px 2px #777;
			text-align: center;
			text-decoration: none;
		}
		.footer{
			background: #34495e;
			color: #fff;
			padding: 10px;
		}
		.body-wrapper{
			margin: 10px auto;
			padding: 0 10px;
			*zoom: 1;
		}
		@media (min-width: 1044px) {
			.body-wrapper {
				width: 1170px;
			}
		}
		@media (min-width: 980px) {
			.main-wrapper{
				width: 100%;
			}
		}
		.main-shop{
			background-color: #8c7142;
			width: 100%;
			overflow: hidden;
			position: relative;
			padding: 20px;
			margin-bottom: 5px;
		}
	</style>
</head>
<body>
	<div class="wrapper"><p>[SHOP GUNNY - <a href="https://facebook.com/jack098.dev/" target="_blank">JACK098</a>]</p></div>
	<div class="body-wrapper">
		<div class="main-wrapper">
		<!-- 	<div class="main-alert">
				<div class="ig-annouce" type="bought"></div>
			</div> -->
			<div class="main-shop">
				<div class="alert-panel" style="display: none">
					<p>Người dùng <span class="animated flash">deptrai098</span> vừa mua tổng trang bị trị giá 245G.</p>
					<div class="view-equip">
						(Xem trang bị) 
						<div class="list">
							<div class="item">Kính quân dụng <span>(125G)</span></div>
							<div class="item">Áo chống đạn <span>(120G)</span></div>
						</div>
					</div>
					<span class="close-btn">X</span>
				</div>
				<div class="phong-thu-img"></div>
				<div class="panel left">
					<div class="panel2">
						<div class="avatar">
							<div class="info">
								<span>jack098</span>
								<div class="choosesex">
									<div class="active" id="male" gnPlugin="gnAvatarGt" gnGtText="gnMale"></div>
									<div id="female" gnPlugin="gnAvatarGt" gnGtText="gnFemale"></div>
								</div>
							</div>
							<div class="avatar-view">
								<?php
	$canvas = ["wing", "face", "eff", "hair", "head", "cloth", "glass", "suits"];
	$canvasString = '';
	foreach ($canvas as $value) 
		if($value == 'wing') 
			$canvasString .= "<canvas id='$value' width='350' height='300' gnPlugin='gnAvatar' gnObjectCanvas='$value'></canvas>";
		else
			$canvasString .= "<canvas id='$value' width='150' height='210' gnPlugin='gnAvatar' gnObjectCanvas='$value'></canvas>";
	echo $canvasString;
								 ?>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="head" cat="head">Nón</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="hair" cat="hair">Tóc</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="cloth" cat="cloth">Áo</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="suits" cat="suits">Set</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="glass" cat="glass">Kính</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="eff" cat="eff">Mặt</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="face" cat="face">Mắt</div>
								<div class="frame" gnPlugin="gnAvatarFrame" gnObjectFrame="wing" cat="wing">Cánh</div>
								<div class="btn-save disabled" >
									<div class="text-save"></div>
									<div class="animate"></div>
								</div>
								<div gnPlugin="gnAvatarBack" class="btn-back filter-btn" tooltip="Trở về hình tượng trươc"></div>
								<div class="btn-random filter-btn" tooltip="Phối hợp ngẫu nhiên 1 tạo hình" gnPlugin="gnAvatarRandom">Ngẫu nhiên</div>
								<span class="ultimate-check"><input type="checkbox" checked>ULTIMATE</span>
								<p id="hidden-text">Ẩn</p>
								<div class="hidden">
									<div class="row">
										<span class="hide" area="head" gnPlugin="gnAvatarHide" gnObjectHide="head"><input type="checkbox">Nón</span>
										<span class="hide" area="glass" gnPlugin="gnAvatarHide" gnObjectHide="glass"><input type="checkbox">Kính</span>
									</div>
									<div class="row">
										<span class="hide" area="suits" gnPlugin="gnAvatarHide" gnObjectHide="suits"><input type="checkbox">Set</span>
										<span class="hide" area="wing" gnPlugin="gnAvatarHide" gnObjectHide="wing"><input type="checkbox">Cánh</span>
									</div>
								</div>
							</div> 

						</div>
						<div class="action">

							<div class="bag-money" id="tabs">
								<ul class="tab">
									<li class="ui-tabs-active"><a href="#tabs-1">Money</a></li>
									<li><a href="#tabs-2">Color</a></li>
									<li><a href="#tabs-3">Skin</a></li>
								</ul>
								<div id="tabs-1">
									<div class="frame-money">
										<div class="asset-span"><span class="asset-icon" style="background-image: url(http://localhost/studymake/logo/gunny/xu.png);"></span> 99.345.200</div>
										<div class="asset-span"><span class="asset-icon" style="background-image: url(http://localhost/studymake/logo/gunny/xukhoa.png);"></span> 0</div>
										<div class="asset-span"><span class="asset-icon" style="background-image: url(http://localhost/studymake/logo/gunny/huanchuong.png);"></span>0</div>
									</div>
									<p id="taisan-text">Hiện tại bạn có</p>
									<div class="btn-buy disabled"></div>
								</div>
								<div id="tabs-2">
									<input class="jscolor" id="equip" value="AB2D11">
									<div class="btn2 btn-color-make" tooltip="Đổi màu trang bị" gnPlugin="gnAvatarColor" gnPluginMethod="color">Đổi màu</div>
									<div class="btn2 btn-color-reset" tooltip="Reset màu tất cả trang bị"  gnPlugin="gnAvatarColor" gnPluginMethod="reset">Reset All</div>
								</div>
								<div id="tabs-3">
									<input class="jscolor" id="skin" value="7BAB00">
									<div class="btn2 btn-color-make" tooltip="Đổi màu da" gnPlugin="gnAvatarSkin">Đổi màu</div>
									<div class="btn2 btn-color-reset" tooltip="Reset màu da về mặc định">Reset All</div>
								</div>
							</div>
							<div class="button disabled">
								<div class="btn give"><div></div></div>
								<div class="btn-ask" ></div>
								<div class="btn buy"><div></div></div>
							</div>
						</div>	
					</div>
				</div>
				<div class="shop-img"></div>
				<div class="panel right">
					<div class="panel2">
						<div class="shop-item">
							<div class="tab-cat" gnPlugin="gnMenu">
								<div class="btn" gnPluginHtml="gnMenu" gnData="attr:'menuid',menuid;append:name;addClass:activeClass;setEvent:~clickItemEvent"></div>
							</div>
							<div class="item-show">
								<div class="sub-tab" gnPlugin="gnSubMenu">
									<div class="btn" gnPluginHtml="gnSubMenu" gnData="attr:'catid',catid;append:name;addClass:activeClass;setEvent:~clickItemEvent"></div>
								</div>
								<div class="border"></div>
								<div class="show"><div gnPlugin="gnMainContent">
									<div class="item-frame" gnPluginHtml="gnMainContent">
										<div class="img" gnData="initAttr:attrEvent;setEvent:~clickItemEvent">
											<div class="animate-border-blink"></div>
											<div class="select-item">
												<span><img src="http://localhost/studymake/logo/gunny/trywear-icon.png"></span>
											</div>
											<span class="span-state" gnData="addClass:init.label"></span>
										</div>
										<div class="info">
											<p class="name-item" gnData="append:dtItem.name"></p>
											<p class="cost" gnData="prepend:dtShop.AValue1?dtShop.AValue1^'Sold Out'"><span class="currency" style="background-image: url(http://localhost/studymake/logo/gunny/xu2.png);"></span></p>
											<div class="btn">
												<div class="action-btn" id="give" style="background-image: url(http://localhost/studymake/logo/gunny/shop/btn-give-2.png);"></div>
												<div class="action-btn" id="ask" style="background-image: url(http://localhost/studymake/logo/gunny/shop/btn-ask-2.png);"></div>
												<div class="action-btn" id="buy" style="background-image: url(http://localhost/studymake/logo/gunny/shop/btn-buy-2.png);"></div>
											</div>
										</div>
										<div class="zzInfo" gnData="addClass:'d'+dtItem.quality;attr:'id',init.position">
											<div class="power-item">
												<p id="name" gnData="append:dtItem.name"></p>
												<p class="field-main" id="quality">
													<span>Phẩm chất</span>
													<strong gnData="append:quality"></strong>
												</p>
												<p class="field-main"><span>Loại hình</span><strong gnData="append:init.loaihinh"></strong></p>
												<div class="border-info"></div>
												<p class="properties">Thông minh:<span gnData="append:dtItem.clever"></span></p>
												<p class="properties">Phong cách:<span gnData="append:dtItem.style"></span></p>
												<p class="properties">Nhanh nhẹn:<span gnData="append:dtItem.agility"></span></p>
												<p class="properties">May mắn:<span gnData="append:dtItem.luck"></span></p>
												<div class="border-info"></div>
												<p id="state-item" gnData="append:init.gioitinh">Giới tính:</p>
												<div class="border-info" gnData="attr:'style',dtItem.description?^'display:none'"></div>
												<p id="description" gnData="append:dtItem.description"></p>
											</div>
										</div>
									</div>

								</div></div>
							</div>
							<div class="phantrang">
								<div class="btn dau" gnPlugin="gnPagination" gnBtnPage="first"></div>
								<div class="btn trai" gnPlugin="gnPagination" gnBtnPage="left"></div>
								<div class="state">
									<input type="text" gnPlugin="gnPagination" gnInpPage="curPage">
								</div>
								<div class="btn phai" gnPlugin="gnPagination" gnBtnPage="right"></div>
								<div class="btn cuoi" gnPlugin="gnPagination" gnBtnPage="end"></div>
							</div>
						</div>
						<div class="hot-item">
							<div class="bg">
								<div class="show-item" gnPlugin="gnHotItem">		
									<!-- <p id="loading">Loading...</p> -->
									<div class="item-frame" gnPluginHtml="gnHotItem">
										<div class="img" gnData="initAttr:attrEvent;setEvent:~clickItemEvent">
											<div class="animate-border-blink"></div>
											<div class="select-item">
												<span><img src="http://localhost/studymake/logo/gunny/trywear-icon.png"></span>
											</div>
										</div>
										<div class="info">
											<p class="name-item" gnData="append:dtItem.name"></p>
											<p class="cost" gnData="prepend:dtShop.AValue1"><span class="currency" style="background-image: url(http://localhost/studymake/logo/gunny/xu2.png);"></span></p>
											<div class="btn">
												<div class="action-btn" id="give" style="background-image: url(http://localhost/studymake/logo/gunny/shop/btn-give-2.png);"></div>
												<div class="action-btn" id="ask" style="background-image: url(http://localhost/studymake/logo/gunny/shop/btn-ask-2.png);"></div>
												<div class="action-btn" id="buy" style="background-image: url(http://localhost/studymake/logo/gunny/shop/btn-buy-2.png);"></div>
											</div>
										</div>
									</div> 
								</div>	
							</div>
							<div class="tab-bg">
								<div class="tab-nav">
									<div id="buy-many-txt"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="search-item">
					
					<div id="search-box">
						<input type="text" placeholder="Nhập tên vật phẩm">
						<div id="result" style="display: none;">
							<div gnPlugin="gnSearchDW">
								Loading...
								<div class="frame" gnPluginHtml="gnSearchDW" gnData="initAttr:attrEvent;setEvent:~clickItemEvent" >
									<div class="name-result" gnData="prepend:name"> <span gnData="append:label"></span> - <span gnData="append:checkSold"></span></div>
									<div class="picture" gnData="attr:'style','background-image: url('+img+')'">
										<div class="arrow"></div>
									</div>
								</div>
							</div>	
							<hr><p id='other-result' gnPluginHtml="#gnSearchDW"><span gnData="text:#totalRecord">0</span> kết quả. <a style='cursor: pointer;'>Xem ngay</a></p>
						</div>
					</div>
					<div class="btn-search">Tìm</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		Copyright by Jack098...
	</div>
	<div id="gio-hang" title="Giỏ hàng">
	<div class="item-frame">
		<div class="list-item" gnPlugin="gnItemListCart">
			<div class="item-show-shop" gnPluginHtml="gnItemListCart" gnData="initAttr:attrEvent">
				<div class="img-item" gnData="attr:'style','background-image: url('+img+')'"></div>
				<p class="name-item" gnData="text:dtItem.name+' - '+dtShop.AValue1+'G'">Phúc Long Bào</p>
				<div class="border-info"></div>
				<div class="info-item">
					<table>
						<tr><td>Thông minh : <span gnData="text:dtItem.clever"></span></td><td>May mắn : <span gnData="text:dtItem.luck"></span></td></tr>
						<tr><td>Nhanh nhẹn : <span gnData="text:dtItem.agility"></span></td><td>Phong cách : <span gnData="text:dtItem.style"></span></tr>
					</table>
				</div>
				<button class="btn-remove-item">x</button>
			</div>
		</div>
		<p id="total-item-num" gnPluginHtml="#gnItemListCart">Tổng <strong gnData="text:#count">5</strong> vật phẩm</p>
		<div class="total-cost">
			<span class="title-cost">Cần chi trả</span>
			<div class="frame-cost">
				<span class="cost-span" gnPluginHtml="#gnItemListCart"><span class="input-cost-span" gnData="text:#totalCost">1.000</span> Vàng</span>
			</div>
		</div>
		<div class="buy-frame"><button class="buy-confirm">Xác nhận mua</button></div>
	</div>
	<div id="weapon-select" title="Chọn Vũ Khí">
		<div id="loading">Loading...</div>
		<table id="weapon-data" class="display" style="width:100%">
			<thead>
				<tr><th>Image</th>
				<th>Name</th>
				<th>Pic</th></tr>
			</thead>
		</table>
	</div>
	<div id="save-image" title="Avatar">
		<br/>
		<canvas id="image-object-all" width="200" height="200"></canvas>
		<a id="setting-image">Tùy chỉnh nâng cao</a>
		<div class="options">
			<table>
				<tr>
					<td>Circle Setting : </td>
					<td>
						<select id="circle-setting">
							<option value="0">Không</option>
							<option value="1">Loại 1</option>
							<option value="2">Loại 2</option>
							<option value="3">Loại 3</option>
							<option value="4">Loại 4</option>
							<option value="5">Loại 5 (VIP)</option>
						</select>
					</td>
					<td></td>
					<td>Badge Setting : </td>
					<td>
						<select id="badge-setting">
							<option value="0">Không</option>
							<option value="1">Loại 1</option>
							<option value="2">Loại 2</option>
							<option value="3">Loại 3</option>
							<option value="4">Loại 4</option>
							<option value="5">Loại 5</option>
							<option value="6">Loại 6</option>
							<option value="7">Loại 7</option>
							<option value="8">Loại 8 (VIP)</option>
							<option value="9">Loại 9 (VIP)</option>
							<option value="10">Loại 10 (VIP)</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Level Setting : </td>
					<td>
						<input type="number" max="70" min="0" id="level-setting" value="0">
					</td>
					<td></td>
					<td>Another Setting : </td>
					<td>
						<select id="student-setting">
							<option value="0">Không</option>
							<option value="master">Sư phụ</option>
							<option value="practitioners">Đệ tử</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>VIP Setting : </td>
					<td>
						<input type="number" max="12" min="0" id="vip-setting" value="0">
					</td>
					<td></td>
					<td>Love Setting : </td>
					<td>
						<input type="checkbox" id="love-setting" value="love"/>
					</td>
				</tr>
				<tr>
					<td>Weapon : </td>
					<td><p id="weapon-setting">Chưa chọn</p></td>
				</tr>
			</table>
		</div>
		<a class="btn-save-me" download="avatar-gunny.png">Download Image</a>
	</div>
</div>
	<?php 
 		$arrayCanvas = "'".implode($canvas, "', '")."'";
	?>
	<script src='./asset/js/jquery-1.11.3.min.js'></script>
	<script src='./asset/js/jquery.dataTables.min.js'></script>
	<script src='./asset/js/noty.min.js'></script>
	<script src='./asset/js/mo.min.js'></script>
	<script>
	 	const domain = "http://localhost/studymake/";
		var canvas = [<?= $arrayCanvas ?>];
		var weaponTable = 0;
		
		$(document).ready(function(){
			// $( "#tabs" ).tabs();
			$( '#tabs').tabs().tabs( "disable", "#tabs-2").tabs( "disable", "#tabs-3");
			// $.gnShopVal("set", "gnShop.ultimate", false);
			// console.log($.gnShopVal("get", "gnShop.ultimate"));
			// $('.btn-save-me').testAction("init;load", null , {load: "bao"});
			// $.SetupShopGunny(
			// 	["gnMenu", "gnSubMenu", "gnAvatarFrame", "gnMainContent", "gnAvatar", "gnHotItem", "gnAvatarRandom", "gnAvatarHide", "gnAvatarGt"]
			// )
			$.gnSetupFnc({
				frame: {
					removeAllEffect(){
						$(`[gnPlugin="gnAvatarFrame"].active.focus`).remove(".animate-border-blink");
					},
					removeAll(){
						$(`[gnPlugin="gnAvatarFrame"].active`)
						.removeClass("active focus")
						.removeAttr("pic")
						.removeAttr("img")
						.each(function(){
							let cat = $(this).attr("cat");
							$(this).html($.gnShopVal("get", "gnAvatarInfoDefault.frame."+cat))
						})
					},
					remove(info){
						let {cat} = info;
						$(`[gnPlugin="gnAvatarFrame"][cat="${cat}"]`)
						.removeClass("active focus")
						.html($.gnShopVal("get", "gnAvatarInfoDefault.frame."+info.cat))
						.removeAttr("pic")
						.removeAttr("img")
					},
					set(info, removeFocus = true){
						let {img, pic, cat} = info;
						$(`[gnPlugin="gnAvatarFrame"][cat="${cat}"]`)
						.attr(info)
						.addClass("active focus")
						.html($.gnShopVal("get", "gnAvatarInfo.frame."+cat))
						.append(
							$("<div>")
							.css({"background-image": "url("+img+")", "background-repeat":  "no-repeat"})
							.addClass("icon")
						)
						.append("<div class='animate-border-blink'></div>");
					},
				},
				enableFeature(){
					$('.avatar-view .btn-save').removeClass('disabled');
			        $('.btn-buy, .action .button').removeClass('disabled');
			        $('.action .button .btn, .action .button .btn-ask').addClass('flight');
			        $('#tabs').tabs('enable', '#tabs-2').tabs('enable', '#tabs-3');
				},
				disableFeature(){
					$('.btn-buy, .action .button').addClass('disabled');
					$('.action .button .btn, .action .button .btn-ask').removeClass('flight');
					$('#tabs').tabs('disable', '#tabs-2').tabs('disable', '#tabs-3');
					$('#gio-hang').dialog('close');
					$('.avatar-view .btn-save').addClass('disabled');
				}
			});

			$('[gnPlugin="gnMenu"]').gnMenu("load");
			$('[gnPlugin="gnSubMenu"]').gnSubMenu("load");
			$('[gnPlugin="gnMainContent"]').gnMainContent("init;loadShop", {
				showResultSearch(response, keyword){
					$('[gnPlugin="gnSubMenu"]').html(`<p id='result-txt'>Từ khóa: "${keyword}" - ${response.totalRecord} kết quả  <span class='btn-close filter-btn'>X</span>`);
					$('[gnPlugin="gnMenu"]').gnMenu("init;load", {data: [
						{name: "Search", activeClass: "active"}
					]});
				}
			});
			$('[gnPlugin="gnHotItem"]').gnHotItem("load");

			$("body").on("click", ".btn-close", function(){
				$('[gnPlugin="gnMainContent"]').gnMainContent("resetShop");
				$('[gnPlugin="gnMenu"]').gnMenu("reset;load");
				$('[gnPlugin="gnSubMenu"]').gnSubMenu("load");
			})
			$('[gnPlugin="gnAvatar"]').gnAvatar("load");

			$('[gnPlugin="gnAvatarColor"][gnPluginMethod="color"]').click(function(){
				var color = $(".jscolor#equip").val();
				$('[gnPlugin="gnAvatarFrame"].active.focus').each(function(){
					let cat = $(this).attr('cat');
					$('[gnPlugin="gnAvatar"]').gnAvatar("colorEquipAvatar", {cat, color})
				})
				
			})
			$('[gnPlugin="gnAvatarColor"][gnPluginMethod="reset"]').click(function(){
				$("[gnPlugin='gnAvatarFrame'].active.focus").each(function(){
					var cat = $(this).attr("cat");
					$('[gnPlugin="gnAvatar"]').gnAvatar("resetColorEquipAvatar", {cat});
				})
			})			
			$('[gnPlugin="gnAvatarBack"]').click(function(){
				$('[gnPlugin="gnAvatar"]').gnAvatar("backAvatar");
			})
			$('[gnPlugin="gnAvatarRandom"]').click(function(){
				$('[gnPlugin="gnAvatar"]').gnAvatar("randomAvatar");
			})
			$('[gnPlugin="gnAvatarHide"]').click(function(){
				let	cat = $(this).attr("area"),
					method = $(this).find("input").is(":checked") ? "hideAvatar" : "showAvatar";
				$('[gnPlugin="gnAvatar"]').gnAvatar(method, {cat});
			})
			$('[gnPlugin="gnAvatarGt"]').click(function(){
				let sGt = $(this).attr("gngttext");
				$('[gnPlugin="gnAvatarGt"]').removeClass("active");
				$(this).addClass("active");
				$('[gnPlugin="gnAvatar"]').gnAvatar("gtAvatar", {sGt});
			})

			$('[gnPlugin="gnAvatarSkin"]').click(function(){
				let color = $('.jscolor#skin').val();
				$('[gnPlugin="gnAvatar"]').gnAvatar("skinAvatar", {color});
			})


			$('.avatar-view').on('click', '.btn-save .text-save', function () {
		        $('#save-image').dialog('open');
		        $("[gnPlugin='gnAvatar']").gnAvatar("loadAllObject");
		    })
			$('.action').on('click', '.btn-buy:not(.disabled)', function () {
        		$('[gnPlugin="gnItemListCart"]').gnItemListCart("load");
        		$('#gio-hang').dialog('open');
    		});
			$("#search-box input").focus(function(){
				$(this).siblings("#result").fadeIn('fast');
			}).blur(function () {
				$(this).siblings("#result").fadeOut('fast');
			}).keyup(function(){
				let $this = $(this),
				    keyword = $this.val();
				if(!keyword){
					$this.siblings("#result").fadeOut('fast');
					return;
				}else{
					$this.siblings("#result").fadeIn('fast');
					var test = $this.gnSearchDW("load", {keyword});
				}
			});

   			$('.alert-panel .close-btn').click(function(){
   				$('.alert-panel').hide();
   			})
   			// fncWrite.tooltip();
			$( '#gio-hang' ).dialog({
				autoOpen: false,
				modal: true,
				width: 450,
				position: { my: "center", at: "center", of: ".main-wrapper" }
			});
			$('#weapon-setting').click(function(){
				$('#save-image').dialog('option', 'position', { my: "center", at: "center", of: $('.main-shop') })
				$('#weapon-select').dialog('open');

				if(!weaponTable){
					$('#weapon-select #loading').show();
					weaponTable = $('#weapon-data').DataTable({
						ajax: "ajax/load-weapon.php",
						columns: [
							{name: "Image", orderable: false, className: "center-col"},
							{name: "Name", orderable: true},
							{name: "Pic", visible: false, searchable: false}
						],
						initComplete: function(settings, json) {
	    					$('#weapon-select #loading').hide();
	  					},
						paging: false,
						"dom": '<<"#search-box"fi><t>p>'
					});
				}
			})
			$('#weapon-select').dialog({
				modal: false,
				width: 450,
				height: 620,
				autoOpen: false,
				resizable: false,
				position: { my: "center",at: "center ", of: $('.main-shop')}
			})
			$('html, body').animate({
            	scrollTop: $(".main-wrapper").offset().top
        	}, 1000, function(){
        		$( '#save-image' ).dialog({
					autoOpen: false,
					modal: true,
					width: 520,
					height: 580,
					resizable: false,
					position: { my: "center", at: "center", of: $('.main-shop') }
				});
        	});
			$(document).on('mouseover','.item-frame .img', function(){
				$(this).parent().addClass('show-info');
			});
			$(document).on('mouseout','.item-frame .img', function(){
				$(this).parent().removeClass('show-info');
			})
		})

		
	</script>
	
	<script src='./asset/js/jquery-ui.min.js'></script>
	<script src='./asset/js/jscolor.min.js'></script>
	<script src='./asset/js/feature/gunny.shop.js' type="text/javascript" charset="utf-8"></script>
</body>
</html>