<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>SHOP GUNNY V1.0</title>
	<link rel="stylesheet" href="./asset/css/bootstrap.min.css">
	<link rel="stylesheet" href="./asset/css/bs.css">
	<link rel="stylesheet" href="./asset/css/gnShopAvatar.css">
	<!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"> -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">


</head>
<body>

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
	<div class="jumbotron">
		<h1>SHOP GUNNY - Demo nhân vật Gunnny</h1>
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
				<div class="card panel-primary border-primary mb-3">
					<div class="card-header pr-2">
						<i class="fas fa-user"></i> Avatar Demo 
						<div class="float-right">
							<button type="button" class="btn btn-primary btn-sm"><i class="fas fa-male"></i> Nam</button>
							<button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-female"></i> Nữ</button>
						</div>

					</div>
					<div class="card-body pt-2 pb-2">
						<div class="row ">
							<div class="col-md-2 p-0">
								<div class="d-flex flex-column text-center w-100">
									<div class="p-0 gnShop-frame rounded active border-primary bg-warning"><img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" class="gnShop-frame-img"/></div>
									<div class="pt-2 gnShop-frame rounded">Tóc</div>
									<div class="pt-2 gnShop-frame rounded">Áo</div>
									<div class="pt-2 gnShop-frame rounded">Set</div>
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
										<div class="pt-2 gnShop-frame rounded">Nón</div>
										<div class="pt-2 gnShop-frame rounded">Tóc</div>
										<div class="pt-2 gnShop-frame rounded">Áo</div>
										<div class="pt-2 gnShop-frame rounded">Set</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 p-0">
									<button class="btn btn-primary btn-block"><i class="fas fa-save"></i> Save</button>
								</div>
								<div class="col-md-4 pl-1 pr-1">
									<button class="btn btn-secondary btn-block"><i class="fas fa-undo-alt"></i> Back</button>
								</div>
								<div class="col-md-4 p-0">
									<button class="btn btn-success btn-block"><i class="fas fa-random"></i> Random</button>
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
											<div class="bg-primary text-center gnShop-hide pt-2 text-light">Nón</div>	
										</div>
										<div class="col-md-3">
											<div class="bg-warning text-center gnShop-hide pt-2 text-dark border border-primary">Kính</div>
										</div>
										<div class="col-md-3">
											<div class="bg-primary text-center gnShop-hide pt-2 text-light">Set</div>
										</div>
										<div class="col-md-3">
											<div class="bg-primary text-center gnShop-hide pt-2 text-light">Cánh</div>
										</div>

									</div>
									<p class="text-warning mb-0"><strong>Chú ý</strong> : Ẩn Trang bị bằng cách click vào nó</p>
								</div>
								<div class="tab-pane fade" id="color-equip" role="tabpanel" aria-labelledby="color-equip">
									sds
								</div>
							</div>

						</div>
					</div>
					<div id="gnShop-carousel" class="carousel slide mb-3 carousel-fade rounded" data-ride="carousel">
						<ol class="carousel-indicators">
							<li data-target="#gnShop-carousel" data-slide-to="0" class="active"></li>
							<li data-target="#gnShop-carousel" data-slide-to="1"></li>
							<li data-target="#gnShop-carousel" data-slide-to="2"></li>
							<li data-target="#gnShop-carousel" data-slide-to="3"></li>
							<li data-target="#gnShop-carousel" data-slide-to="4"></li>
						</ol>
						<div class="carousel-inner">
							<div class="carousel-item active">
								<img class="d-block w-100" src="./asset/img/feature-shop-jack098-blogspot-com.png" alt="Third slide">
								<div class="carousel-caption d-none d-md-block">
									<h1 class="title">Xây dựng chức năng Shop</h1>
								</div>
							</div>
							<div class="carousel-item ">
								<img class="d-block w-100" src="./asset/img/shop-gunny-slide.png" alt="First slide">
								<div class="carousel-caption d-none d-md-block">
									<h1 class="title">Giới thiệu Shop Gunny</h1>
								</div>
							</div>
							<div class="carousel-item">
								<img class="d-block w-100" src="./asset/img/analyse-resource-gunny-jack098-blogspot-com.png" alt="Second slide">
							</div>
							<div class="carousel-item">
								<img class="d-block w-100" src="./asset/img/feature-avatar-jack098-blogspot-com.png" alt="Third slide">
							</div>

							<div class="carousel-item">
								<img class="d-block w-100" src="./asset/img/load-avatar-jack098-blogspot-com.png" alt="Third slide">
							</div>
						</div>
						<a class="carousel-control-prev" href="#gnShop-carousel" role="button" data-slide="prev">
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="carousel-control-next" href="#gnShop-carousel" role="button" data-slide="next">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>
				</div>
				<div class="col-md-8">
					<div class="row">
						<div class="col-md-9 ">
							<div class="card card-primary border-primary">
								<!-- Show Shop -->
								<div class="card-header">
									<ul class="nav nav-tabs card-header-tabs">
										<li class="nav-item">
											<a class="nav-link active" href="#">Kính</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" href="#">Áo</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" href="#">Nón</a>
										</li>
									</ul>
								</div>
								<div class="card-body">
									<div class="tab-content" id="myTabContent">
										<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
											<div class="p-0 bg-danger text-white w-25 pl-3">
												<span id="dot">
													<span id="ping"></span>
												</span> Hot Item
											</div>

											<div class="border border-danger  mb-2 p-2  d-flex flex-row-reverse" gnPlugin="gnHotItem" style="padding-left: 14px!important">
												<div class="p-0 bd-highlight pr-2" gnPluginHtml="gnHotItem" gnData="">
													<img alt="..." class="img-thumbnail gnInfo-icon hot w-80" gnData="attr:'src',img">
												</div>
												<!-- <div class="p-0 bd-highlight pr-2">
													<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon hot w-80">
												</div>
												<div class="p-0 bd-highlight pr-2">
													<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon hot w-80">
												</div>
												<div class="p-0 bd-highlight pr-2">
													<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon hot w-80">
												</div>
												<div class="p-0 bd-highlight pr-2">
													<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon hot w-80">
												</div>
												<div class="p-0 bd-highlight pr-2">
													<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon hot w-80">
												</div> -->
											</div>
											<hr>
											<!-- 	<p class="text-warning text-sm">Các bạn vui lòng chuẩn bị tiền đầy đủ và không chen lấn xô đấy nhé ! Thanks ^^</p> -->
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
												<!-- <div class="card p-0 border-0 gnShop-item mb-1">
													<div class="card-body p-1">
														<div class="row">
															<div class="col-md-5 pr-3">
																<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																<p class='mb-0'><strong>May mắn</strong>: 5</p>
																<hr>
																<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true">
																<a href="#" class="badge badge-secondary w-100">Hot Item</a>
															</div>
															<div class="col-md-7 pl-0">
																<p class="mb-0 text-danger">Kính Hacker</p>
																<p class="mb-0 font-weight-normal gnInfo-desc">sdsdsds</p>
																<p class="font-weight-bold mb-0 gnInfo-cost text-danger">125G</p>
																<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																</p>
															</div>
														</div>
													</div>
												</div>
												<div class="card p-0 border-0 gnShop-item mb-1">
													<div class="card-body p-1">
														<div class="row">
															<div class="col-md-5 pr-3">
																<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																<p class='mb-0'><strong>May mắn</strong>: 5</p>
																<hr>
																<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true">
																<a href="#" class="badge badge-secondary w-100">Hot Item</a>
															</div>
															<div class="col-md-7 pl-0">
																<p class="mb-0 text-danger">Kính Hacker</p>
																<p class="mb-0 font-weight-normal gnInfo-desc">sdsdsds</p>
																<p class="font-weight-bold mb-0 gnInfo-cost text-danger">125G</p>
																<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																</p>
															</div>
														</div>
													</div>
												</div> -->
											</div>
											<div class="col-md-6" gnPlugin="gnMainContent" gnFrame="2">
												<!-- <div class="card p-0 border-0 gnShop-item mb-1">
													<div class="card-body p-1">
														<div class="row">
															<div class="col-md-5 pr-3">
																<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																<p class='mb-0'><strong>May mắn</strong>: 5</p>
																<hr>
																<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true">
																<a href="#" class="badge badge-secondary w-100">Hot Item</a>
															</div>
															<div class="col-md-7 pl-0">
																<p class="mb-0 text-danger">Kính Hacker</p>
																<p class="mb-0 font-weight-normal gnInfo-desc">sdsdsds</p>
																<p class="font-weight-bold mb-0 gnInfo-cost text-danger">125G</p>
																<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																</p>
															</div>
														</div>
													</div>
												</div>
												<div class="card p-0 border-0 gnShop-item mb-1">
													<div class="card-body p-1">
														<div class="row">
															<div class="col-md-5 pr-3">
																<img src="http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png" alt="..." class="img-thumbnail gnInfo-icon w-100"  data-toggle="popover" data-trigger="hover" title="Kính Hacker" data-content="<p class='mb-0'><strong>Phẩm chất</strong>: Hoàn mỹ</p><p><strong>Loại hình</strong>: Kính</p><hr>
																<p class='mb-0'><strong>Thông minh</strong>: 5</p>
																<p class='mb-0'><strong>Phong cách</strong>: 5</p>
																<p class='mb-0'><strong>Nhanh nhẹn</strong>: 5</p>
																<p class='mb-0'><strong>May mắn</strong>: 5</p>
																<hr>
																<p class='mb-0'><strong>Giới tính</strong>: Nam</p>" data-html="true">
																<a href="#" class="badge badge-secondary w-100">Hot Item</a>
															</div>
															<div class="col-md-7 pl-0">
																<p class="mb-0 text-danger">Kính Hacker</p>
																<p class="mb-0 font-weight-normal gnInfo-desc">sdsdsds</p>
																<p class="font-weight-bold mb-0 gnInfo-cost text-danger">125G</p>
																<p class="mb-0 text-right"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus"></i></button>
																</p>
															</div>
														</div>
													</div>
												</div> -->
											</div>
										</div>
										
									</div>
									<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
								</div>
							</div>
							<div class="card-footer">
								<nav aria-label="Page navigation example">
									<ul class="pagination justify-content-center mb-0">
										<li class="page-item disabled">
											<a class="page-link" href="#" tabindex="-1">Previous</a>
										</li>
										<li class="page-item"><a class="page-link" href="#">1</a></li>
										<li class="page-item"><a class="page-link" href="#">2</a></li>
										<li class="page-item"><a class="page-link" href="#">3</a></li>
										<li class="page-item">
											<a class="page-link" href="#">Next</a>
										</li>
									</ul>
								</nav>
							</div>
							<!-- End Show Shop -->
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-primary border-primary mb-3">
							<div class="card-body p-0">
								<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
									<a class="nav-link active rounded-0" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa fa-tshirt"></i> Trang bị</a>
									<a class="nav-link rounded-0" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fa fa-grin-stars"></i> Làm đẹp</a>
								</div>
							</div>
						</div>

						<div class="input-group mb-3">
							<input type="text" class="form-control mb-2" placeholder="Keyword" aria-label="Username" aria-describedby="basic-addon1">
							<button type="button" class="btn btn-block"><i class="fa fa-search"></i> Search</button>

						</div>
						<div class="card card-primary">

							<div class="card-body p-1">
								<div class="input-group mb-1">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1">G</span>
									</div>
									<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="9.999" disabled>
								</div>
								<button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#cart-modal"><i class="fa fa-cart"></i> CART <span class="badge badge-light">3</span></button>
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
	<div class="footer m-0">
		<div class="container">
			<p class="m-0 text-copyright">© 2018 Jack098. Blog : <a href="#">Xem thêm</a></p>
		</div>
	</div>
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
			$('[gnPlugin="gnAvatar"]').gnAvatar("load");
			$('[data-toggle="popover"]').popover({
				container: $(".container")
			})
			
			$('.gnShop-hide').click(function(){
				if($(this).is('.bg-primary, .text-light')){
					$(this).removeClass('bg-primary text-light');
					$(this).addClass('bg-warning text-dark border border-primary');
				}else{
					$(this).removeClass('bg-warning text-dark border border-primary');
					$(this).addClass('bg-primary text-light');
				}
			})
			$('.container').on("mouseenter", ".gnShop-item", function() {
				$(this).addClass("shadow rounded");
			}).on('mouseleave', ".gnShop-item", function(){
				$(this).removeClass("shadow rounded");
			})
			$('.container').on('click', ".gnShop-item", function(){
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

			$.gnSetupAPI("listitem", {
				addProperty: ["img"],
				limit: 6,
				filter: {NeedSex: 1, label: 1},
				jointable: ["template_id"]
			}, function(data){
				console.log(data);
				// alert('test');
				$('[gnPlugin="gnHotItem"]').gnHtmlHandle("load", {
					key: "gnHotItem",
					response: data,
					display: "inline-block"
				});
			})

			$.gnSetupAPI("listitem", {
				addProperty: ["img", "nameLabel", "cat"],
				limit: 8,
				filter: {NeedSex: 1},
				jointable: ["template_id"]
			}, function(data){
				// console.log(data);
				$('[gnPlugin="gnMainContent"]').gnHtmlHandle("load", {
					key: "gnMainContent",
					response: data,
					display: "block"
				});
			})
			
		})
	</script>
	<script src='./asset/js/feature/gunny.shop.edit.js' type="text/javascript" charset="utf-8"></script>
</body>
</html>