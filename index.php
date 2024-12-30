<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>SHOP GUNNY V1.1</title>
	<link rel="stylesheet" href="./asset/css/bootstrap.min.css">
	<link rel="stylesheet" href="./asset/css/bs.css">
	<link rel="stylesheet" href="./asset/css/gnShopAvatar.css">
	<!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"> -->
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous"> -->
	<link rel="stylesheet" type="text/css" href="./asset/css/slick.css"/>
	<link rel="stylesheet" type="text/css" href="./asset/css/slick-theme.css"/>

</head>
<body>
	<div class="jumbotron">
		<h1>SHOP GUNNY 2 - Demo nhân vật Gunnny</h1>
	</div>
	
	<div class="photo-container">
		<div class="bg-photo"></div>
	</div>
	<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-danger">
		<div class="container mt-0">
			<a class="navbar-brand" href="#">gnShopAvatar</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarCollapse">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Author</a>
					</li>
				</ul>
				<form class="form-inline">
					<span class="pr-2 text-white">Hiện tại bạn có :  </span>
					<button class="btn btn-sm btn-secondary" type="button">999.999G</button>
				</form>
			</div>
		</div>
		
	</nav>
	<div class="position-relative overflow-hidden text-center">
		<div class="col-md-5 p-lg-5 mx-auto my-5" id="gnShop-intro">
			<h1 class="display-4 font-weight-normal">gnShopAvatar</h1>
			<hr>
			<p class="lead font-weight-normal">Lần đầu tiên trên nền Web. Hãy cùng trải nghiệm và đi vào những thuật toán của nó nhé.</p>
			<a href="#" class="btn btn-primary my-2">Login</a>
			<!-- <a class="btn btn-secondary" href="#">Login</a> -->
			<a class="btn btn-secondary my-2" href="#">View Demo Now</a>
		</div>
		<div class="product-device shadow-sm d-none d-md-block"></div>
		<div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
	</div>
	<div class="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">Home</a></li>
				<li class="breadcrumb-item active" aria-current="page">Shop Gunny</li>
			</ol>
		</nav>
		<div class="card mb-3">
			<div class="card-body p-2">
				<marquee behavior="" direction=""><i class="fa fa-newspaper"></i> Người dùng <strong>deptrai098</strong> vừa mua Nón kiền lực, Kính Hacker</marquee>
			</div>
		</div>
		<div class="row mb-4">
			<div class="col-md-4">
				<div class="card panel-primary border-primary mb-3 sticky-top">
					<div class="card-header pr-2">
						<i class="fas fa-user"></i> Avatar Demo 
						<div class="float-right">
							<button type="button" class="btn btn-primary btn-sm gnShop-gt" gnValGt="1"><i class="fas fa-male"></i> Nam</button>
							<button type="button" class="btn btn-outline-primary btn-sm gnShop-gt" gnValGt="2"><i class="fas fa-female"></i> Nữ</button>
						</div>

					</div>
					<div class="card-body pt-2 pb-2">
						<div class="row ">
							<div class="col-md-2 p-0">
								<div class="d-flex flex-column text-center w-100">
									<!-- <div class="p-0 gnShop-frame rounded active border-primary bg-warning"><img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" class="gnShop-frame-img"/></div>
									<div class="pt-2 gnShop-frame rounded" area="h">Tóc</div>
									<div class="pt-2 gnShop-frame rounded">Áo</div>
									<div class="pt-2 gnShop-frame rounded">Set</div> -->
									<div class="pt-2 gnShop-frame rounded" area="head">Nón</div>
									<div class="pt-2 gnShop-frame rounded" area="hair">Tóc</div>
									<div class="pt-2 gnShop-frame rounded" area="cloth">Áo</div>
									<div class="pt-2 gnShop-frame rounded" area="suits">Set</div>
								</div>
							</div>
							<div class="col-md-8" id="gnShop-avatar">
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
							</div>
							<div class="col-md-2 p-0">
								<div class="d-flex flex-column text-center w-100">
									<div class="pt-2 gnShop-frame rounded" area="glass">Kính</div>
									<div class="pt-2 gnShop-frame rounded" area="eff">Mặt</div>
									<div class="pt-2 gnShop-frame rounded" area="face">Mắt</div>
									<div class="pt-2 gnShop-frame rounded" area="wing">Cánh</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4 p-0">
								<button class="btn btn-primary btn-block" id="gnShop-save"><i class="fas fa-save"></i> Save</button>
							</div>
							<div class="col-md-4 pl-1 pr-1">
								<button class="btn btn-secondary btn-block" id="gnShop-back"><i class="fas fa-undo-alt"></i> Back</button>
							</div>
							<div class="col-md-4 p-0">
								<button class="btn btn-success btn-block" id="gnShop-random"><i class="fas fa-random"></i> Random</button>
							</div>
						</div>
					</div>
					<ul class="nav nav-tabs pl-1 pr-1">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#hide-equip" role="tab" aria-controls="hide-equip" aria-selected="true"><i class="fas fa-eye-slash"></i> Hide Equip</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#color-equip" role="tab" aria-controls="color-equip"><i class="fas fa-palette"></i> Color</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#skin-avatar" role="tab" aria-controls="skin-avatar"><i class="fas fa-tshirt"></i> Skin</a>
						</li>
					</ul>
					<div class="card-footer border-top-0">
						<div class="tab-content">
							<div class="tab-pane fade show active" id="hide-equip" role="tabpanel" aria-labelledby="hide-equip">
								<div class="row mb-2">
									<div class="col-md-3">
										<div class="bg-primary text-center gnShop-hide pt-2 text-light" area="head">Nón</div>	
									</div>
									<div class="col-md-3">
										<div class="bg-primary text-center gnShop-hide pt-2 text-light" area="glass">Kính</div>	
									</div>
									<div class="col-md-3">
										<div class="bg-primary text-center gnShop-hide pt-2 text-light" area="suits">Set</div>
									</div>
									<div class="col-md-3">
										<div class="bg-primary text-center gnShop-hide pt-2 text-light" area="wing">Cánh</div>
									</div>

								</div>
								<p class="text-warning mb-0"><strong>Chú ý</strong> : Ẩn Trang bị bằng cách click vào nó</p>
							</div>
							<div class="tab-pane fade" id="color-equip" role="tabpanel" aria-labelledby="color-equip">
								<p><strong>Lưu ý</strong> : Chức năng chỉ đổi màu các trang bị đang được focus.</p>

								<div class="input-group mb-2">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1"><i class="fa fa-palette"></i></span>
									</div>
									<input type="text" class="form-control jscolor" aria-label="color-equip" aria-describedby="color-equip" id="color-equip-input">

								</div>
								<button class="btn-block btn btn-primary" id="change-color">Change Color</button>
							</div>
							<div class="tab-pane fade" id="skin-avatar" role="tabpanel" aria-labelledby="skin-avatar">
								sdss
							</div>
						</div>

					</div>
				</div>
				</div>
				<div class="col-md-8 ">
					<div class="row">
						<div class="col-md-9 ">
							<div class="tab-content">
								<div class="tab-pane fade show active" id="gnMenu-equip" role="tabpanel" aria-labelledby="equip">
									<div class="card card-primary border-primary">
										<!-- Show Shop -->
										<div class="card-header">
											<ul class="nav nav-tabs card-header-tabs">
												<li class="nav-item">
													<a class="nav-link active" data-toggle="tab" href="#gnShop-submenu-glass" role="tab" aria-controls="nav-home" aria-selected="true" gnPage="1">Kính</a>
												</li>
												<li class="nav-item">
													<a class="nav-link" data-toggle="tab" href="#gnShop-submenu-cloth" role="tab" aria-controls="nav-home" aria-selected="false" gnPage="1">Áo</a>
												</li>
												<li class="nav-item">
													<a class="nav-link" data-toggle="tab" href="#gnShop-submenu-head" role="tab" aria-controls="nav-home" aria-selected="false" gnPage="1">Nón</a>
												</li>
											</ul>
										</div>
										<div class="card-body">
											<div class="tab-content">
												<div class="tab-pane fade show active gnShop-submenu" id="gnShop-submenu-glass" role="tabpanel" catid="2">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
															<!-- <li class="page-item active"><a class="page-link gnShop-page" gnAction="true">1</a></li>
															<li class="page-item"><a class="page-link gnShop-page" gnAction="true">2</a></li>
															<li class="page-item"><a class="page-link gnShop-page" gnAction="true">3</a></li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li> -->
														</ul>
													</nav>
												</div>
												<div class="tab-pane fade gnShop-submenu" id="gnShop-submenu-cloth" role="tabpanel" catid="5">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
												<div class="tab-pane fade gnShop-submenu" id="gnShop-submenu-head" role="tabpanel" catid="1">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
											</div>
										</div>
										<!-- End Show Shop -->
									</div>
								</div>
								<div class="tab-pane fade" id="gnMenu-makeup" role="tabpanel" aria-labelledby="make-up">
									<div class="card card-primary border-primary">
										<!-- Show Shop -->
										<div class="card-header">
											<ul class="nav nav-tabs card-header-tabs">
												<li class="nav-item">
													<a class="nav-link active" data-toggle="tab" href="#gnShop-submenu-hair" role="tab" aria-controls="nav-home" aria-selected="true">Tóc</a>
												</li>
												<li class="nav-item">
													<a class="nav-link" data-toggle="tab" href="#gnShop-submenu-face" role="tab" aria-controls="nav-home" aria-selected="false">Mắt</a>
												</li>
												<li class="nav-item">
													<a class="nav-link" data-toggle="tab" href="#gnShop-submenu-eff" role="tab" aria-controls="nav-home" aria-selected="false">Mặt</a>
												</li>
												<li class="nav-item">
													<a class="nav-link" data-toggle="tab" href="#gnShop-submenu-suits" role="tab" aria-controls="nav-home" aria-selected="false">Bộ</a>
												</li>
												<li class="nav-item">
													<a class="nav-link" data-toggle="tab" href="#gnShop-submenu-wing" role="tab" aria-controls="nav-home" aria-selected="false">Cánh</a>
												</li>
											</ul>
										</div>
										<div class="card-body">
											<div class="tab-content">
												<div class="tab-pane fade show active gnShop-submenu" id="gnShop-submenu-hair" role="tabpanel" catid="3">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
												<div class="tab-pane fade gnShop-submenu" id="gnShop-submenu-face" role="tabpanel" catid="6">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
												<div class="tab-pane fade gnShop-submenu" id="gnShop-submenu-eff" role="tabpanel" catid="4">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
												<div class="tab-pane fade gnShop-submenu" id="gnShop-submenu-suits" role="tabpanel" catid="13">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
												<div class="tab-pane fade gnShop-submenu" id="gnShop-submenu-wing" role="tabpanel" catid="15">
													<div class="p-0 bg-danger text-white w-25 pl-3">
														<span id="dot">
															<span id="ping"></span>
														</span> Hot Item
													</div>

													<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
														
														<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
															<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
														</div>
													</div>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
											</div>
										</div>
										<!-- End Show Shop -->
									</div>
								</div>
								<div class="tab-pane fade" id="gnMenu-search" role="tabpanel" aria-labelledby="gnMenu-search">
									<div class="card card-primary border-primary">
										<!-- Show Shop -->
										<div class="card-header">
											<ul class="nav nav-tabs card-header-tabs">
												<li class="nav-item">
													<a class="nav-link active" data-toggle="tab" href="#gnShop-submenu-search" role="tab" aria-controls="nav-home" aria-selected="true">Search</a>
												</li>
											</ul>
										</div>
										<div class="card-body">
											<div class="tab-content">
												<div class="tab-pane fade show active gnShop-submenu" id="gnShop-submenu-search" role="tabpanel" keyword="bao">
													<p>Từ Khóa : Bao</p>
													<hr>
													<div class="row mb-2">
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="1">
															<div class="card p-0 border-0 gnShop-item mb-2" gnPluginHtml="gnMainContent" gnData="attr:'cat',cat;attr:'img',img;attr:'pic',pic;attr:'catid',category_id">
																<div class="card-body p-1">
																	<div class="row">
																		<div class="col-md-5 pr-3">
																			<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																			<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																			<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																			<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																			<p class='mb-0'><strong>May mắn</strong>: 5</p>
																			<hr>
																			<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true" gnData="attr:'src',img">

																			<a href="#" class="badge badge-secondary w-100" gnData="text:nameLabel">Hot Item</a>
																		</div>
																		<div class="col-md-7 pl-0">
																			<p class="mb-0 text-danger" gnData="text:name">Kính Hacker</p>
																			<p class="mb-0 font-weight-normal gnInfo-desc" gnData="text:description?description^'--'+name"></p>
																			<p class="font-weight-bold mb-0 gnInfo-cost text-danger" gnData="prepend:AValue1">G</p>
																			<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
														</div>
													</div>
													<nav aria-label="Page navigation example">
														<ul class="pagination justify-content-center mb-0">
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="first">First</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="previous">Previous</a>
															</li>
															<input type="text" class="form-control col-md-2 rounded-0 text-center state-page" disabled value="3/11" >
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="next">Next</a>
															</li>
															<li class="page-item">
																<a class="page-link gnShop-page" gnActionPage="last">Last</a>
															</li>
														</ul>
													</nav>
												</div>
											</div>
										</div>
										<!-- End Show Shop -->
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="card card-primary border-primary mb-3">
								<div class="card-body p-0">
									<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
										<a class="nav-link active rounded-0" id="v-pills-home-tab" data-toggle="pill" href="#gnMenu-equip" role="tab" aria-controls="gnMenu-equip" aria-selected="true"><i class="fa fa-tshirt"></i> Trang bị</a>
										<a class="nav-link rounded-0" id="v-pills-profile-tab" data-toggle="pill" href="#gnMenu-makeup" role="tab" aria-controls="gnMenu-makeup" aria-selected="false"><i class="fa fa-grin-stars"></i> Làm đẹp</a>
										<a class="nav-link rounded-0" id="v-pills-profile-tab" data-toggle="pill" href="#gnMenu-search" role="tab" aria-controls="gnMenu-search" aria-selected="false" style="display: none;"><i class="fa fa-grin-stars"></i> Search</a>
									</div>
								</div>
							</div>

							<div class="input-group mb-3">
								<input type="text" class="form-control mb-2" placeholder="Keyword" id="gnShop-search-inp">
								<button type="button" class="btn btn-block" id="gnShop-search-btn"><i class="fa fa-search"></i> Search</button>

							</div>
							<div class="card card-primary">

								<div class="card-body p-1">
									<div class="input-group mb-1">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1">G</span>
										</div>
										<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="9.999" disabled>
									</div>
									<button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#cart-modal" id="gnShop-cart-btn"><i class="fa fa-cart"></i> CART <span class="badge badge-light">3</span></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="modal fade" id="cart-modal" tabindex="-1" role="dialog" aria-labelledby="cart-modal" aria-hidden="true" data-modal="true">
			<div class="modal-dialog modal-dialog-centered" role="document" style="width: 373px">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Cart</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="gnShop-listItem mb-2">
							<div class="card mb-2">
								<div class="card-body p-2">
									<button type="button" class="close" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<div class="row">
										<div class="col-md-4 pr-2">
											<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100">
										</div>
										<div class="col-md-8 pl-0">
											<p class="font-weight-bold mb-0 text-danger">Kính Hacker - 125G</p>
											<table class="mb-0 gnInfo-cart">
												<tbody>
													<tr>
														<td>Nhanh nhẹn : 5</td>
														<td></td>
														<td>Nhanh nhẹn : 5</td>
													</tr>
													<tr>
														<td>Nhanh nhẹn : 5</td>
														<td></td>
														<td>Nhanh nhẹn : 5</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="card mb-2">
								<div class="card-body p-2">
									<button type="button" class="close" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<div class="row">
										<div class="col-md-4 pr-2">
											<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100">
										</div>
										<div class="col-md-8 pl-0">
											<p class="font-weight-bold mb-0 text-danger">Kính Hacker - 125G</p>
											<table class="mb-0 gnInfo-cart">
												<tbody>
													<tr>
														<td>Nhanh nhẹn : 5</td>
														<td></td>
														<td>Nhanh nhẹn : 5</td>
													</tr>
													<tr>
														<td>Nhanh nhẹn : 5</td>
														<td></td>
														<td>Nhanh nhẹn : 5</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="card mb-2">
								<div class="card-body p-2">
									<button type="button" class="close" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<div class="row">
										<div class="col-md-4 pr-2">
											<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100">
										</div>
										<div class="col-md-8 pl-0">
											<p class="font-weight-bold mb-0 text-danger">Kính Hacker - 125G</p>
											<table class="mb-0 gnInfo-cart">
												<tbody>
													<tr>
														<td>Nhanh nhẹn : 5</td>
														<td></td>
														<td>Nhanh nhẹn : 5</td>
													</tr>
													<tr>
														<td>Nhanh nhẹn : 5</td>
														<td></td>
														<td>Nhanh nhẹn : 5</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
						<p class="mb-1 text-center">Tổng <strong>1</strong> vật phẩm</p>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="basic-addon1">G</span>
							</div>
							<input type="text" class="form-control" aria-describedby="basic-addon1" value="400" disabled="">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Buy</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="login-require" tabindex="-1" role="dialog" aria-labelledby="cart-modal" aria-hidden="true" data-modal="true">
			<div class="modal-dialog modal-dialog-centered" role="document" style="width: 500px">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Login</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="alert alert-warning" role="alert">
							Vui lòng đăng nhập để sử dụng chức năng này !!!
						</div>
						<button type="button" class="btn btn-block btn-primary">Login With Facebook</button>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="save-modal" tabindex="-1" role="dialog" aria-labelledby="save-modal" aria-hidden="true" data-modal="true">
			<div class="modal-dialog modal-dialog-centered" role="document" style="width: 500px">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Save Image...</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<canvas id="image-object-all" width="200" height="200"></canvas>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="album py-5 bg-light">
	        	<h4 class="text-center mb-0">Cùng khám phá thuật toán của chúng và nhiều thứ khác tại <button type="button" class="btn btn-outline-primary btn-lg" href="https://jack098.blogspot.com">Jack098</button></h4>
	    </div>
		<footer class="container py-5">
			<div class="row">
				<div class="col-12 col-md">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="d-block mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
					<small class="d-block mb-3 text-muted">© 2017-2018</small>
				</div>
				<div class="col-6 col-md">
					<h5>Features</h5>
					<ul class="list-unstyled text-small">
						<li><a class="text-muted" href="#">Cool stuff</a></li>
						<li><a class="text-muted" href="#">Random feature</a></li>
						<li><a class="text-muted" href="#">Team feature</a></li>
						<li><a class="text-muted" href="#">Stuff for developers</a></li>
						<li><a class="text-muted" href="#">Another one</a></li>
						<li><a class="text-muted" href="#">Last time</a></li>
					</ul>
				</div>
				<div class="col-6 col-md">
					<h5>Resources</h5>
					<ul class="list-unstyled text-small">
						<li><a class="text-muted" href="#">Resource</a></li>
						<li><a class="text-muted" href="#">Resource name</a></li>
						<li><a class="text-muted" href="#">Another resource</a></li>
						<li><a class="text-muted" href="#">Final resource</a></li>
					</ul>
				</div>
				<div class="col-6 col-md">
					<h5>Resources</h5>
					<ul class="list-unstyled text-small">
						<li><a class="text-muted" href="#">Business</a></li>
						<li><a class="text-muted" href="#">Education</a></li>
						<li><a class="text-muted" href="#">Government</a></li>
						<li><a class="text-muted" href="#">Gaming</a></li>
					</ul>
				</div>
				<div class="col-6 col-md">
					<h5>About</h5>
					<ul class="list-unstyled text-small">
						<li><a class="text-muted" href="#">Team</a></li>
						<li><a class="text-muted" href="#">Locations</a></li>
						<li><a class="text-muted" href="#">Privacy</a></li>
						<li><a class="text-muted" href="#">Terms</a></li>
					</ul>
				</div>
			</div>
		</footer>
		<div id="gnShop-notice" class="fixed-bottom text-center bg-danger text-white pt-3 ">

			<p class="mb-2">
				<span>
					Nếu có bất kỳ bất tiện hay ý tưởng đóng góp nào cho <a href="#">gnShopAvatar</a>, hãy liên hệ với chúng tôi. Xin chân thành cảm ơn !
				</span>
				<button type="button" class="btn btn-primary btn-sm">Feedback</button>
				<button type="button" class="btn btn-secondary btn-sm">Close</button>
			</p>

		</div>
		<?php 
		$arrayCanvas = "'".implode($canvas, "', '")."'";
		?>
		<script src='./asset/js/jquery-1.11.3.min.js'></script>
		<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
		<script src="./asset/js/popper.min.js"></script>
		<script src="./asset/js/bootstrap.min.js"></script>
		<script>
			const domain = "http://localhost/studymake/";
			var canvas = [<?= $arrayCanvas ?>];
			$(document).ready(function(){
				$.gnSetupFnc({
					frame: {
						set(info, removeFocus){
							console.log(removeFocus);
							if(removeFocus){
								$(`.gnShop-frame`).removeClass('border-primary bg-warning');
							}
							$(`.gnShop-frame[area="${info.cat}"]`)
							.removeClass('pt-2')
							.addClass('p-0 border-primary bg-warning')
							.html(`<img src="${info.img}" class="gnShop-frame-img"/>`)
							.attr(info);
						},
						remove(info){
							$(`.gnShop-frame[area="${info.cat}"]`).removeClass('p-0 border-primary bg-warning').addClass('pt-2').html(info.cat);
						},
						removeAll(){
							$(`.gnShop-frame`).each(function(){
								let area = $(this).attr('area'),
									config = $.gnShopVal("get", "gnShop_config");
								var findCat = Object.keys(config.catIdPrefix).find(item => config.catIdPrefix[item].prefix === area);
								var name = config.catIdPrefix[findCat].name;
								$(this).removeClass('p-0 border-primary bg-warning').addClass('pt-2').html(name);
							})
						}
					}
				})

				const loadShop = (gt = 1, page = 1, loadALl = true) => {
					let select = loadALl ? '.gnShop-submenu' : '.tab-pane.active .gnShop-submenu.active' ;
					$(select).each(function(){
						var catid = $(this).attr('catid'),
							that = this;
						if(catid){
							$.gnSetupAPI("listitem", {
								addProperty: ["img"],
								limit: 6,
								filterShop: {label: 1},
								// filter: {NeedSex: gt, category_id: catid},
								clause: {and: {NeedSex: gt, category_id: catid}},
								jointable: ["template_id"]
							}, function(data){
								$(that).find('[gnPlugin="gnHotItem"]').gnHtmlHandle("load", {
									key: "gnHotItem",
									response: data,
									display: "inline-block"
								});
							})
							let gtEdit = gt;
							if(catid == "13" || catid == "15") gtEdit = 0;
							$.gnSetupAPI("listitem", {
								addProperty: ["img", "nameLabel", "cat"],
								limit: 8,
								clause: {and: {NeedSex: gtEdit, category_id: catid}},
								page
							}, function(data){
								$(that).find('[gnPlugin="gnMainContent"]').gnHtmlHandle("load", {
									key: "gnMainContent",
									response: data,
									display: "block"
								});
								loadPage(data.paging, that, page);
							})
						}else{
							var keyword = $(this).attr('keyword');
							if(keyword){
								$.gnSetupAPI("listitem", {
									addProperty: ["img", "cat"],
									limit: 8,
									search: keyword,
									clause: {NeedSex: gt},
									page
								}, function(data){
									$(that).find('[gnPlugin="gnMainContent"]').gnHtmlHandle("load", {
										key: "gnMainContent",
										response: data,
										display: "block"
									});
									loadPage(data.paging, that, page);
								})
							}
						}
						
					})
					
				}
				const loadPage = (data, elem, current) => {
					$(elem)
					.find('.gnShop-page').each(function(){
						var area = $(this).attr('gnActionPage');
						$(this).attr('page', data[area].page);
					})
					.end()
					.find('.state-page').val(`${current}/${data.last.page}`);
				}

				$('[gnPlugin="gnAvatar"]').gnAvatar("load");
				$('[data-toggle="popover"]').popover({
					container: $(".container")
				})

				$('.gnShop-hide').click(function(){
					let area = $(this).attr('area');
					if($(this).is('.bg-primary, .text-light')){
						$(this).removeClass('bg-primary text-light');
						$(this).addClass('bg-warning text-dark border border-primary');
						$('[gnPlugin="gnAvatar"]').gnAvatar("hideAvatar", {cat: area});
					}else{
						$(this).removeClass('bg-warning text-dark border border-primary');
						$(this).addClass('bg-primary text-light');
						$('[gnPlugin="gnAvatar"]').gnAvatar("showAvatar", {cat: area});
					}
				})
				$('.container').on("mouseenter", ".gnShop-item", function() {
					$(this).addClass("shadow rounded");
				}).on('mouseleave', ".gnShop-item", function(){
					$(this).removeClass("shadow rounded");
				})
				$('.container').on('click', ".gnShop-item", function(){
					$('.gnShop-item').removeClass('bg-warning');
					$(this).addClass('bg-warning');
					$('[gnPlugin="gnAvatar"]').gnAvatar("setEquipAvatar", {
						info: {
							cat: $(this).attr('cat'),
							pic: $(this).attr('pic'),
							img: $(this).attr('img')
						}
					})
				})
				$('#gnShop-carousel').carousel();

				$('#gnShop-random').click(function(){
					var gt = $('.gnShop-gt.btn-primary').attr('gnvalgt');
					$.gnSetupAPI("randomAvatar", {gt}, function(data){
						$('[gnPlugin="gnAvatar"]').gnAvatar("randomAvatar", data);
					})
				})

				$('#gnShop-back').click(function(){
					$('[gnPlugin="gnAvatar"]').gnAvatar("backAvatar");
				})

				$('#gnShop-save').click(function(){
					$('#save-modal').modal();
					$('[gnPlugin="gnAvatar"]').gnAvatar("loadAllObject");
				})

				$('.gnShop-page').click(function(){
					let	gt = $('.gnShop-gt.btn-primary').attr('gnvalgt'),
						page = $(this).attr('page');
					loadShop(gt, page, false);
				})

				$('.gnShop-gt').click(function(){
					$('.gnShop-gt').removeClass('btn-primary').addClass('btn-outline-primary');
					var gt = $(this).addClass('btn-primary').removeClass('btn-outline-primary').attr('gnValGt');
					$('[gnPlugin="gnAvatar"]').gnAvatar("gtAvatar", {gt});
					loadShop(parseInt(gt));
				})
				loadShop();

				$('#change-color').click(function(){
					var color = $('.jscolor#color-equip-input').val();
					$('.gnShop-frame.border-primary.bg-warning').each(function(){
						$('[gnPlugin="gnAvatar"]').gnAvatar("colorEquipAvatar", {
							cat: $(this).attr('cat'),
							color
						})
					})
				})

				$('#gnShop-search-btn').click(function(){
					var kw = $('#gnShop-search-inp').val(),
						gt = $('.gnShop-gt.btn-primary').attr('gnvalgt');
					$('#gnShop-submenu-search').attr('keyword', kw);
					loadShop(gt, 1);
					$('a[href="#gnMenu-search"]').tab('show') // Select tab by name

				})

				const getListInfo = (listItem) => {
					var listInfoItem = [];
					Object.keys(listItem).map(item => {
						let pic = listItem[item].pic;
						$.gnSetupAPI("infoitem", {
							addProperty: ["img", "cat"],
							find: {pic}
						}, function(data) {
							listInfoItem = [...listInfoItem, data];
							console.log(listInfoItem);
						})
					})
					return listInfoItem;
				}

				$('#gnShop-cart-btn').click(function(){
					var itemCurrent = $.gnShopVal("get", "gnAvatarInfo"),
						listItem = [];
					if(Object.keys(itemCurrent.back).length){
						var listInfoItem = getListInfo(itemCurrent.back);
						Object.keys(listItem).map(item => {
							let pic = listItem[item].pic;
							$.gnSetupAPI("infoitem", {
								addProperty: ["img", "cat"],
								find: {pic}
							}, function(data) {
								listInfoItem = [...listInfoItem, data];
								console.log(listInfoItem);
							})
						})
					}
					
				})
			})
		</script>
		<script src='./asset/js/feature/gunny.shop.edit.js' type="text/javascript" charset="utf-8"></script>
		<script src='./asset/js/jscolor.min.js'></script>
		<!-- <script type="text/javascript" src="./asset/js/slick.min.js"></script> -->
	</body>
	</html>