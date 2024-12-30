/**
 * Object chứa các hàm chung nhất để code gọn gàng hơn
 * @type {Object}
 */
var gnLib = {
	/**
	 * Hàm chuyển 1 mảng sang object dùng làm data Post cho ajax
	 * @param  {Object} data      [description]
	 * @param  {[type]} dataArray [description]
	 * @return {[type]}           [description]
	 */
	postData(data, dataArray){
		return dataArray.reduce((obj, item) => {
			if (data[item]) return {[item]: data[item], ...obj}
			if (gnShop[item]) return {[item]: gnShop[item], ...obj}
			return obj;
		}, {});
	},
	ajaxEvent(url, dataArray, data, callback){
		return $.ajax({
			method: "POST",
			url,
			data: this.postData(data, dataArray)
		}).done(data => {
			let dataJson = JSON.parse(data);
			return callback(event, dataJson, settings, methodSettings, action);
		}).fail((error) => {
			console.log(error);
		})
	}
}

const load_shop = () => {
	gnLib.ajaxEvent("ajax/load-shop.php", ["catId", "gt", "page"], {
		catId: 6,
		page: 1
	}, () => {
		$('')
	})
}

/**
 * Object chứa thông tin Shop
 * @type object [menuId: menu hiện tại đang mở]
 *       		[catId: catId đang show các sẩn phẩm hiện tại]
 *       		[gt: giới tính hiện tại (0:Nữ/1:Nam)]
 *       		[pathChar: ký tự dựa trên giới tính]
 *       		[menu: menu của Shop tùy chỉnh. Những object nào có activeClass thì default là mở khi load trang]
 */
var gnShop = {
	menuId: 0,
	_catId: null,
	get catId(){
		this._catId = this._catId || this.menu.data[this.menuId].data[0].catId;
		return this._catId;
	},
	set catId(val){
		this._catId = val;
	},
	gt: 1,
	_pathChar: null,
	get pathChar(){
		this._pathChar = (this.gt == 1) ? 'm' : 'f';
		return this._pathChar;
	},
	set pathChar(val){
		this._pathChar = val;
	},
	menu: {
	    data: [
	        {
	            name: "Trang bị",
	            menuId: 0,
	            activeClass: "active",
	            data: [
	                {name: "Kính", catId: 2, activeClass: "active"},
	                {name: "Áo", catId: 5},
	                {name: "Nón", catId: 1}
	            ]
	        },
	        {
	            name: "Làm đẹp",
	            menuId: 1,
	            data: [
	                {name: "Tóc", catId: 3, activeClass: "active"},
	                {name: "Mắt", catId: 6},
	                {name: "Mặt", catId: 4},
	                {name: "Bộ", catId: 13},
	                {name: "Cánh", catId: 15}
	            ]
	        }
	    ]
	}	
};

/**
 * Hàm Load Menu dựa trên mảng gnShop.menu.data
 * @param  {Array} data [danh sách các Menu]
 */
const loadMenu = (data = gnShop.menu.data) => {
	var source = data.reduce((source, menu) => {
		return [...source, $("<div>", {
			class: `btn ${menu.activeClass || ''}`, 
			menuid: menu.menuId
		}).text(menu.name)]
	}, []);
	$('Noi dat menu').html(source); // Sửa lại element trồng phần Selector
}

/** Mặc định khi load trang sẽ load 3 hàm này */
loadMenu();
loadSubMenu();
loadMainContent();

/** Set Event cho các Element vừa dom ở trên */
$('(Noi dat menu)').on("click", ".btn:not(.active)", function(){
	$('(Noi dat menu)').find('.btn').removeClass("active");
    $(this).addClass("active");
    let menuId = $(this).attr('menuid'); // lấy menuId
    loadSubMenu(menuId); // tiến hành load lại Sub Menu dựa trên menu hiện tại
    loadMainContent(); // tương tự với Main Content
})

$('(Noi dat Sub Menu)').on('click', '.btn:not(.active)', function(){
	$('(Noi dat Sub Menu)').find('.btn').removeClass('active');
    $(this).addClass("active");
    let catId = parseInt($(this).attr('catid')); // lấy catId của Sub Menu hiện tại
    loadMainContent({ catId }) // load lại Main Content theo catId
})

$('(Button Pagination)').on('click', function(){
	let page = parseInt($(this).attr('page')); // lấy page hiện tại
	loadMainContent({ page })
})

$('(Shop của bạn)').on('click', '(Vùng click ở vật phẩm)', function(){ 
	/** Xử lý hiệu ứng after Click gì tùy bạn */
	
	/** Tiến hành load nhân vật */
	let info = {
		cat: $(this).attr('cat'),
		img: $(this).attr('img'),
		pic: $(this).attr('pic')            
	} // lấy các thuộc tính về từ vật phẩm
	if(info.pic != gnAvatarInfo.suit[info.cat]){ 
		// Nếu Equip hiện tại khác với Equip vừa bấm thì tiến hành load
		gnAvatarInfo.suit[info.cat] = info.pic;
		gnAvatarHandle.load();
		enableFeature();

		/** Xử lý các frame Equip nhân vật */

		/** Create Back Object */
		gnAvatarInfo.back = {
        	...gnAvatarInfo.back,
        	[info.cat]: info // thêm info phía bên trên vào object, vì nó có chứa thông tin đầy đủ để set frame
        }; 
        // Vd : 
        // {
        //    glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'},
        //    cloth: {cat: 'cloth', img: 'http://localhost/studymake/test/equip/m/cloth/cloth2/icon_1.png', pic: 'cloth2'}
        // }
        gnAvatarInfo.backAvatar = [...gnAvatarInfo.backAvatar, gnAvatarInfo.back]; // add vào back Avatar
	}
})

// Activity:
// Vừa chọn glass1 
// -> call Event click
// -> gnAvatarInfo.back = {
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'}
// }
// -> gnAvatarInfo.backAvatar = [{
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'}
// }]

// Chọn thêm cloth2
// -> call Event click
// -> gnAvatarInfo.back = {
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'},
// 	cloth: {cat: 'cloth', img: 'http://localhost/studymake/test/equip/m/cloth/cloth2/icon_1.png', pic: 'cloth2'}
// }
// -> gnAvatarInfo.backAvatar = [{
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'}
// }, {
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'},
// 	cloth: {cat: 'cloth', img: 'http://localhost/studymake/test/equip/m/cloth/cloth2/icon_1.png', pic: 'cloth2'}
// }]

// Thay kính khác glass60
// -> call Event click
// -> gnAvatarInfo.back = {
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass60/icon_1.png', pic: 'glass60'},
// 	cloth: {cat: 'cloth', img: 'http://localhost/studymake/test/equip/m/cloth/cloth2/icon_1.png', pic: 'cloth2'}
// }
// -> gnAvatarInfo.backAvatar = [{
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'}
// }, {
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass1/icon_1.png', pic: 'glass1'},
// 	cloth: {cat: 'cloth', img: 'http://localhost/studymake/test/equip/m/cloth/cloth2/icon_1.png', pic: 'cloth2'}
// }, {
// 	glass: {cat: 'glass', img: 'http://localhost/studymake/test/equip/m/glass/glass60/icon_1.png', pic: 'glass60'},
// 	cloth: {cat: 'cloth', img: 'http://localhost/studymake/test/equip/m/cloth/cloth2/icon_1.png', pic: 'cloth2'}
// }]

/**
 * Tạo Object POST data cho ajax (tự lấy dữ liệu)
 * @param  {[type]} dataArray [danh sách các params cho data]
 * @param  {[type]} data      [data cần lấy]
 * Vd tham số truyền vào như sau : 
 * dataArray là ["gt", "catId"]
 * data là {catId: 6}
 * mà gnShop là {catId: 2, gt: 3}
 * thì kết quả return về là : { gt: 3, catId: 6 }
 */
const postData = (dataArray, data) => {
	return dataArray.reduce((obj, item) => {
		if (data[item]) return {[item]: data[item], ...obj}
		if (gnShop[item]) return {[item]: gnShop[item], ...obj}
		return obj;
	}, {});
}

/**
 * Hàm Call Ajax
 * @param  {String}   url       [path]
 * @param  {Function} callback  [hàm callback sau khi load xong ajax]
 */
const ajaxEvent = (url, dataArray, data, callback) => {
	return $.ajax({
		method: "POST",
		url,
		data: this.postData(dataArray, data)
	}).done(dataResult => {
		return callback(dataResult);
	}).fail(error => {
		console.log(error);
	})
}

/**
 * Hàm Load Pagination cho Shop
 * @param  {Int} current [trang hiện tại]
 * @param  {Int} first   [trang đầu]
 * @param  {Int} end     [trang cuối]
 */
const setPagination = (current, first, end) => {
	const loadNumPageFromArea = {
		first,
		end,
		current,
		get left(){ return ((this.current == this.first) ? this.first : this.current-1);},
		get right(){ return ((this.current == this.end) ? this.end : this.current+1);}
	}
	// Đặt Số Page cho từng button để thuận tiện cho việc get khi người dùng click
	Object.keys(loadNumPageFromArea).map(item => 
		$(`Button Pagination[area="${item}"]`).attr("page", loadNumPageFromArea[item])
	);
	// Button Pagination .Vd : .pagination .btn
	 
	$("Input Trang hiện tại[area='curPage']").val([loadNumPageFromArea.current, "/", loadNumPageFromArea.end].join(""));
}

// HTML Pagination code sẵn của ta phải thuộc dạng sau
// <div class="pagination">
// 	<div class="btn dau" area="first" page="1"></div>
// 	<div class="btn trai" area="left" page="1"></div>
// 	<div class="state">
// 		<input type="text" area="curPage">
// 	</div>
// 	<div class="btn phai" area="right" page="1"></div>
// 	<div class="btn cuoi" area="end" page="1"></div>
// </div>

/**
 * Load Main Content
 * @param  {Object} objParams [chứa các object để get trong post data]
 * Các thuộc tính có thể nhận trong objParams là : gt, catId, page
 */
const loadMainContent = (objParams) => {
	objParams.limit = objParams.limit || 8; 
	objParams.page = objParams.page || 1;
	return ajaxEvent("ajax/load-shop.php", ["gt", "catId", "page", "limit"], objParams, (data) => {
		$("Nơi show Main Content").html(data[0]);
		setPagination(Number(data[2]), 1, Number(data[1])); // set lại Pagination cho trang hiện tại
	})
}
loadMainContent();

/**
 * Load Item Hot
 * @param  {[type]} objParams [limit: số sản phẩm ở hot item]
 *                            [gt: giới tính]
 * @return {[type]}           [description]
 */
const loadItemHot = (objParams) => {
	objParams.limit = objParams.limit || 6; 
	return ajaxEvent("ajax/load-item-hot.php", ["gt", "limit"], objParams, (data) => {
		$("(Nơi show Hot Item)").html(data);
	})
}
loadItemHot();

/**
	 * Hàm Load Sub Menu dựa trên mảng gnShop.menu.data[menuId].data
	 * @param  {Array} data   [danh sách các Menu]
	 * @param  {Int}   menuId [id của Menu]
	 */
	const loadSubMenu = (data = gnShop.menu.data, menuId = 0) => {
		var source = data[menuId].data.reduce((source, subMenu) => {
			return [...source, $("<div>", {
				class: `btn ${subMenu.activeClass || ''}`, 
				catid: subMenu.catId
			}).text(subMenu.name)]
		}, [])
		$('Noi dat Sub Menu').html(source); // Sửa lại element trồng phần Selector
	}

/**
 * Hàm catch lỗi khi ảnh không load được
 * @param  {String} path [đường dẫn]
 */
const rejectFnc = path => console.log("error", path);

/**
 * Hàm để load các hình ảnh vả quản lý lỗi load ảnh. 
 * @param  {String} path [đường dẫn]
 * @param  {Object} obj  [object thêm vào trong img]
 */
const getImage = (path, obj = {}) => new Promise((resolve, reject) => {
	let img = Object.assign(new Image, obj);
	img.onload = () => resolve(img);
	img.onerror = () => reject(path);
	img.src = path;		
})

/**
 * Đường dẫn resource gunny
 * @type {String}
 */
const gnConfigURL = "http://localhost/studymake/test";

/**
 * Object chứa thông tin nhân vật
 * @type {Object}
 * ctx : object đọc thông tin và tạo method cho từng canvas
 * doc : object selector của từng canvas 
 * canvasWidth : chiều rộng của từng canvas
 * canvasHeight : chiều cao của từng canvas
 * suit : pic (path) của nhân vật
 * gt : giới tính nhân vật (mặc định : nam)
 */
var gnAvatarInfo = {
	ctx: {},
	doc: {},
	canvasWidth: {},
	canvasHeight: {},
	suit: {face: 0, hair: 0, head: 0, cloth: 0, glass: 0, eff: 0, wing: 0, suits: 0},
	color: {face: 0, hair: 0, head: 0, cloth: 0, glass: 0, eff: 0},
	gt: 1,
	_pathChar: null,
	get pathChar(){
		this._pathChar = (this.gt == 1) ? 'm' : 'f';
		return this._pathChar;
	},
	set pathChar(val){
		this._pathChar = val;
	},
}

var gnAvatarHandle = {
	res: {},
	dx: 23,
    dy: 25,
    dWidth: 130,
    dHeight: 162,
	getPathEquip(){
    	var {pathChar} = gnShop;
    	this.res = Object.keys(gnAvatarInfo.suit).reduce((obj, key) => {
    		let suitKey = gnAvatarInfo.suit[key] || 0;
    		if(key === 'hair'){
    			if(!suitKey) return {...obj, [key]: {
    				original: `${gnConfigURL}/equip/${pathChar}/${key}/default/1/B/show.png`,
    				overlay: `${gnConfigURL}/equip/${pathChar}/${key}/default/2/B/show.png`
    			}}; // set default cho tóc, theo dạng tóc nguyên vẹn
    			let char = (gnAvatarInfo.suit.head && !gnAvatarInfo.hide.head) ? 'A' : 'B'; 
    			// ^ Kiểm tra có mũ hay chưa? nếu có ta đưa tóc về trạng thái bị cắt 1 nửa 
    			return {...obj, [key]: {
    				original: `${gnConfigURL}/equip/${pathChar}/${key}/${suitKey}/1/${char}/show.png`,
    				overlay: `${gnConfigURL}/equip/${pathChar}/${key}/${suitKey}/2/${char}/show.png`
    			}};
    		} else if (key === 'suits' || key === 'wing') {
    			// nếu là bộ và cánh thì bỏ, vì sẽ được xử lý ở những hàm khác
    			return obj;
    		} else if(!suitKey){
    			// nếu pic = 0 (default) ta set đường dẫn mặc định cho trang bị
    			return {...obj, [key]: {
    				original: `${gnConfigURL}/equip/${pathChar}/${key}/default/1/show.png`,
    				overlay: `${gnConfigURL}/equip/${pathChar}/${key}/default/3/show.png`
    			}};
    		} else if (key === 'cloth' || key === 'face'){
    			// nếu là áo và mặt ta chạy path 1 và 3
    			return {...obj, [key]: {
    				...obj.key,
    				original: `${gnConfigURL}/equip/${pathChar}/${key}/${suitKey}/1/show.png`,
    				overlay: `${gnConfigURL}/equip/${pathChar}/${key}/${suitKey}/3/show.png`
    			}};
    		} else if (suitKey){
    			if(key === 'head' && !gnAvatarInfo.hide.head){
    				// nếu là mũ và không bị ẩn đi ta chuyển tóc sang dạng bị cắt 1 nửa
    				let pic = gnAvatarInfo.suit.hair || 'default';
    				obj = {...obj, hair: {
    					original: `${gnConfigURL}/equip/${pathChar}/hair/${pic}/1/A/show.png`,
    					overlay: `${gnConfigURL}/equip/${pathChar}/hair/${pic}/2/A/show.png`
    				}};
    			}
    			// các trường hợp còn lại
    			return {...obj, [key]: {
    				original: `${gnConfigURL}/equip/${pathChar}/${key}/${suitKey}/1/show.png`,
    				overlay: `${gnConfigURL}/equip/${pathChar}/${key}/${suitKey}/2/show.png`,
    			}};
    		}
    	}, this.res);
  		return this;
    },
	load(){
	    this.getPathEquip().resetCanvas(); // lấy đường dẫn trang bị -> reset canvas
	   	if(this.loadSuits()) return this.loadWings();
	    // bắt đầu draw
	    Object.keys(this.res).map(key => {
	    	this.imageloaded.equip[key] = getImage(this.res[key].original)
	    		.then(original => {
	    			// sau khi ảnh đã load xong
	    			if(key === "face") return false; // nếu là mặt thì bỏ vì sẽ xử lý ở phần animation
	            	if(!gnAvatarInfo.color[key] &&!gnAvatarInfo.suit[key]){
	            		// nếu trang bị khác 0 (có pic)
	                    gnAvatarDraw.drawStaticObject({ original, key }); // tiến hành vẽ
	                }else if(gnAvatarInfo.color[key]){
	                	return this.imageloaded.overlay[key] = getImage(this.res[key].overlay, {original});
	                }
	    		}).then(overlay => {
	    			gnAvatarDraw.drawStaticObjectColor({
	    				overlay,
	    				original: overlay.original,
	    			})
	    		}).catch(rejectFnc);
	    })
	    this.loadFaceAnimation();
	    return this;
	},
	loadAllObject(){
		if(!this.ImageOriginalFulfilledLoaded) return; // nếu chưa có biến lưu các Equip Original Fullfiled thì thoát hàm
    	if(!this.res) this.setPath(); // nếu chưa có path, ta tiến hành set Path
        this.ImageOriginalFulfilledLoaded
        	.then(value => value.map(item => {
        			// tiên hành vẽ lại
		        	let key = item.key;
		        	if(key === "face")
		        		/**
		        		 * Đối với mắt, thuộc tính là : 
		        		 * dx: 250, dY: 0, dWidth: 250, dHeight: 312
		        		 * sX, sY, sWidth, sHeight: giống các Equip khác (đều draw tại cùng 1 chỗ)
		        		 */
		    			gnAvatarInfo.ctxStatic.drawImage(this.imageloaded.equip[key], 250, 0, 250, 312, 50, 0, 130, 162);
	    			else if(!gnAvatarInfo.hide[key]) 
	    				gnAvatarInfo.ctxStatic.drawImage(this.imageloaded.equip[key], 50, 0, 130, 162);
	        	})
        	).then(() => {
        		// check xem có mang Cánh hay không? và nếu nó không bị ẩn thì tiến hành draw
    			if(gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing) {
    				gnAvatarDraw.drawStaticAllObject.wings();
    			}
        	})
        return this;
    },
	loadSuits(){
    	if(gnAvatarInfo.suit.suits){
	        this.imageloaded.equip.suits = getImage(`${gnConfigURL}/equip/${gnAvatarInfo.pathChar}/suits/${gnAvatarInfo.suit.suits}/1/show.png`)
	        	.then(original => {
	        		gnAvatarDrawAnimation.drawFace("suits", { original });
	        	}, rejectFnc)
	       return this;
    	}	
    	return false;
    },
	loadFaceAnimation(){
        this.imageloaded.equip.face = getImage(this.res.face.original)
        	.then(original => {
        		gnAvatarDrawAnimation.drawFace("faceOrignal", { original });
        	}, rejectFnc)
        return this;
    },
    loadWings(){
    	if(gnAvatarInfo.suit.wing){
    		let wingsSetting = new gnAvatarWingAnimation();
    		wingsSetting.load();
    	}	
    	return this;
    },
    clear(cat){
    	gnAvatarInfo.ctx[cat].clearRect(0, 0, gnAvatarInfo.canvasWidth[cat], gnAvatarInfo.canvasHeight[cat]);
    	return this;
    },
    resetCanvas(){
    	Object.keys(gnAvatarInfo.ctx).map(cat => this.clear(cat)) 
    	return this;
    },
    /**
     * Back Avatar : Quay lại avatar trước
     * @param  {Function} callback [hàm xử lý sau khi load xong avatar]
     */
    back(callback){
    	let nearLastPos = gnAvatarInfo.backAvatar.length - 2, // n - 2, vị trí gần cuối
			suit = nearLastPos >= 0 && gnAvatarInfo.backAvatar[nearLastPos]; // lấy object của vị trí đó
		this.removeLastBackAvatar().resetAllObject(); // xóa object cuối cùng (n - 1) và reset Object 
		if(suit) Object.keys(suit).map(item => gnAvatarInfo.suit[item] = suit[item].pic); // set object đó vào gnAvatarInfo.suit
		this.load(); // load
		if(callback) callback(suit); // xong khi load xong nhân vật, làm gì tiếp theo phụ thuộc vào hàm callback
    	return this;
    },
    /**
     * Reset object trong canvas
     */
    resetAllObject(){
    	Object.keys(this.res).map(item => this.clear(item));
    	return this;
    },
    /**
     * Xóa phần tử cuối cùng của mảng gnAvatarInfo.backAvatar
     */
    removeLastBackAvatar(){
    	gnAvatarInfo.backAvatar.pop();
    	return this;
    },
    /**
     * Đổi giới tính nhân vật
     * @param  {String} area [Thuộc tính đọc từ button]
     *                       [male: Nam]
     *                       [female: Nữ]
     */
    changeSex(area){
	 	gnShop.gt = gtVal[area] || 1;
		return this.load();
    },
    hideEquip(){
    	gnAvatarInfo.doc[cat].hide();
    	return this;
    },
    showEquip(){
    	gnAvatarInfo.doc[cat].show();
    	return this;
    }
}

$("(Checkbox Hide Equip)").click(function(){
	let area = $(this).attr("area"),
		method = ($(this).find("input").is(':checked') || $(this).is(":checked")) ? "hideEquip" : "showEquip";
	gnAvatarHandle[method]().load(); 
})


$("(Button Random Avatar)").click(function(){
	ajaxEvent("ajax/load-ran-suit.php", ["suitRan", "gt"], {
		suitRan: ["cloth", "head", "hair", "wing", "eff", "glass", "face"] // mình chọn các loại Equip sau để random
	}, (data) => {
		let obj = JSON.parse(data);
		if(obj.error) return console.log("Error Load Avatar");
		gnAvatarInfo.back = obj; // reset lại các Equip hiện tại
		gnAvatarInfo.backAvatar = [...gnAvatarInfo.backAvatar, gnAvatarInfo.back];

		/** Reset nhân vật */
		gnAvatarHandle.resetAllObject();
		
		/** Reset tất cả frame */

		/** Set lại các thuộc tính back và mảng backAvatar */
		Object.keys(obj).map(item => {
			gnAvatarInfo.suit[obj[item].cat] = obj[item].pic;

			/** Set lại frame dựa trên icon (.img) có trong item */
			// Vd : setFrame(obj[item].cat, obj[item].img); 
		})
		gnAvatarHandle.load(); // loại nhân vật
		enableFeature();
	})
})

/**
 * Giá trị gt của từng area
 * @type {Object}
 */
const gnGtVal = {
   male: 1,
   female: 2
}

$("(Button Gioi tinh)").click(function(){
	/** Xử lý hiệu ứng button gì đó tùy bạn */

	/** Reset lại các frame */

	/** Đổi giới tính nhân vật */
	let area = $(this).attr("area");
	gnAvatarHandle.resetAllObject().changeSex(area); // reset tất cả của nhân vật rồi đổi giới tính

	/** Load lại cả shop */
	loadMainContent();
	loadItemHot();
	disableFeature();
})

$("(Button Back Avatar)").click(function(){
	gnAvatarHandle.back((suit) => {
		console.log(suit);
		/** Remove tất cả các frame */
				
		/** Tiến hành set lại từng frame */
		
	})
})

var gnAvatarDraw = {
	/**
	 * Hàm vẽ Object có màu
	 * @param  {Object} data [chứa các dữ liệu cần thiết để draw : key, overlay, original]
	 */
	drawStaticObjectColor(data){
        gnAvatarHandle.clear(data.key);
        gnAvatarInfo.ctx[data.key].drawImage(data.overlay, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.color[data.key];
        gnAvatarInfo.ctx[data.key].fillRect(0, 0, gnAvatarInfo[data.key].width, gnAvatarInfo[data.key].heightObject)
    	
    	gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
	    gnAvatarInfo.ctx[data.key].drawImage(data.original, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
    }
}

var gnAvatarDrawAnimation = {
    cEAction: 0, // từng hoạt động của mắt
    cEClose: 0, // trạng thái đóng của mắt
    timeDelay: 4000, // delay sau khi đóng, mở mắt
    timeCloseDelay: 2000, // delay sau khi đóng mắt
    timeIntervalDelay: 50, // delay interval
    widthOnceFrame: 250, // sWidth của frame
    heightOnceFrame: 312, // sHeight của frame
    drawType: {
    	// các hàm vẽ từng loại mặt được đặt trong object này
    	/**
    	 * Vẽ mặt gốc có màu
    	 * @param  {Object} data            [overlay, original, key]
    	 * @param  {int}    srcX            [dX]
    	 * @param  {int}    srcY            [dY]
    	 * @param  {int}    widthOnceFrame  [dWidth]
    	 * @param  {int}    heightOnceFrame [dHeight]
    	 */
    	faceColor(data, srcX, srcY, widthOnceFrame, heightOnceFrame, count){
        	gnAvatarHandle.clear(data.key);
            gnAvatarInfo.ctx[data.key].drawImage(data.overlay, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
            gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
            gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.color[data.key];
            gnAvatarInfo.ctx[data.key].fillRect(0, 0, gnAvatarInfo[data.key].width, gnAvatarInfo[data.key].heightObject)
            gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
            gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
        },
    	/**
    	 * Vẽ mặt gốc không màu
    	 * @param  {Object} data            [description]
    	 * @param  {int}    srcX            [dX]
    	 * @param  {int}    srcY            [dY]
    	 * @param  {int}    widthOnceFrame  [dWidth]
    	 * @param  {int}    heightOnceFrame [dHeight]
    	 */
        faceOrignal(data, srcX, srcY, widthOnceFrame, heightOnceFrame){
        	gnAvatarHandle.clear(data.key); // clear Canvas Mặt trước khi draw
            gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, data.dx, data.dy, data.dWidth, data.dHeight)
        }
    },
    drawFace(typeName, data){
        this.reset();
        gnAvatarHandle.interval[typeName] = setInterval(() => {
            this.cEAction++;
            switch(this.cEAction){
            	case 1: case 5: 
            		// mở mắt hoàn toàn
            		this.drawType[typeName](data, 0, 0, this.widthOnceFrame, this.heightOnceFrame, '0');
            		break;
            	case 2: case 4:
            		// mở hoặc đóng nửa (1/2) mắt
            		this.drawType[typeName](data, 750, 0, this.widthOnceFrame, this.heightOnceFrame, '1');
            		break;
            	case 3:
            		// nhắm mắt, tăng biến eClose để timeOut bên dưới chuẩn bị cho việc mở mắt
            		this.drawType[typeName](data, 500, 0, this.widthOnceFrame, this.heightOnceFrame, '2');
                    this.cEClose++;
                    break;
                case 6:
                	if(this.cEClose == 2)
                		// đã mở mắt lại, hoàn tất 1 loop Interval, ta reset ban đầu
                        setTimeout(() => {this.cEAction = 0, this.cEClose = 0}, this.timeDelay);
                    else
                    	// mới đóng mắt chưa mở mắt
                        setTimeout(() => {this.cEAction = 0}, this.timeCloseDelay);
                    break;

            }
        }, this.timeIntervalDelay);
    },
    reset(){
        this.cEAction = this.cEClose = 0;
        this.clear();
        return this;
    },
    clear(){
    	Object.keys(gnAvatarHandle.interval).map(key => clearInterval(gnAvatarHandle.interval[key]));
        return this;
    }
}

/**
 * Class load animation cánh
 * {Int}        dx         [dx]
 * {Int}        dy         [dy]
 * {Int}        dWidth     [dWidth]
 * {Int}        dHeight    [dHeight]
 * {Int}        curFrame   [thứ tự frame hiện tại]
 * {Bool}       reverse    [biến quyết định chuyển động đập ngươc cánh]
 * {String}     key        [key của cánh trong gnAvatarInfo.suit]
 * {String}     typeName   [tùy ý đặt, là 1 key interval]
 * {Array}      wingDouble [những pic 1/2 cánh]
 * {Array}      readSprite [mảng object có được từ việc đọc các element, chứa các thuộc tính sX, sY, sWidth, sHeight]
 * {Object}     image      [ảnh loaded của cánh]
 * {Int|String} wing       [suit cánh]
 * {String}     xmlLink    [link xml của riêng cánh đó]
 * {Function}   draw       [trả về function vẽ cánh phù hợp]
 */
var gnAvatarWingAnimation = function(){
	return {
		dx: 0,
		dy: 0,
		dWidth: 90,
		dHeight: 120,
		curFrame: 0,
		reverse: false,
		key: "wing",
		typeName: "wing",
		wingDouble: ['wing002', 'wing003', 'wing004', 'wing005', 'wing006', 'wing007', 'wing008', 'wing009', 'wing018', 'wing019', 'wing020', 'wing021', 'wing022', 'wing023', 'wing024', 'wing025', 'wing026', 'wing027', 'wing028', 'wing029', 'wing030', 'wing31', 'wing32', 'wing33', 'wing34', 'wing61', 'wing63', 'wing64', 'wing65', 'wing66', 'wing70', 'wing75', 'wing76', 'wing79', 'wing81', 'wing86', 'wing87', 'wing93', 'wing94', 'wing100'],
		readSprite: [],
		image: null,
		get wing(){ return gnAvatarInfo.suit[this.key]; },
		get xmlLink(){ return `${gnConfigURL}/equip/${this.key}/${this.wing}/img.xml`; },
		get draw(){ return (this.wingDouble.indexOf(this.wing) > -1) ? this.drawWingDouble : this.drawWingSingle; },

		loadImage(){
			this.image = new Image;
			this.image.src = `${gnConfigURL}/equip/${this.key}/${this.wing}/img.png`;
			return this;
		},
		ajaxCall(){
			return $.ajax({
	            type: 'GET',
	            url: this.xmlLink,
	            dataType: 'xml',
	        })
		},
		load(){
			this.ajaxCall()
				.done(xml => {
					// đọc từng element XML và đưa vào mảng this.readSprite
					this.readSprite = $(xml).find('SubTexture').map((key, item) => ({
						get sX(){ return $(item).attr('x') },
						get sY(){ return $(item).attr('y') },
						get sWidth(){ return $(item).attr('width') },
						get sHeight(){ return $(item).attr('height') }
					}))
					this.loadImage().start();
				})
				.fail(error => {
					console.log("error");
				});
			return this;
		},
		start(){
			clearInterval(gnAvatarHandle.interval[this.typeName]);
			gnAvatarHandle.interval[this.typeName] = setInterval(() => this.draw(), 40)
		},
		drawWingDouble(){
			// draw 1/2 cánh
	        let {sX, sY, sWidth, sHeight} = this.readSprite[this.curFrame];
	        if (!this.reverse){
	        	// đập cánh tới
	            if (++this.curFrame > this.readSprite.length - 1) this.curFrame = this.readSprite.length - 1, this.reverse = true
	        }else{
	        	// đập cánh lùi
	            if (--this.curFrame < 0) this.curFrame = 0, this.reverse = false;
	        }
	        gnAvatarInfo.ctx[this.key].clearRect(0, 0, gnAvatarInfo.canvasWidth[this.key], gnAvatarInfo.canvasHeight[this.key]);
	        gnAvatarInfo.ctx[this.key].translate(160, 95) // vị trí 1/2 cánh trước
	        gnAvatarInfo.ctx[this.key].drawImage(this.image, sX, sY, sWidth, sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
	        gnAvatarInfo.ctx[this.key].scale(-1, 1) // flip horizontally
	        gnAvatarInfo.ctx[this.key].drawImage(this.image, sX, sY, sWidth, sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
	        gnAvatarInfo.ctx[this.key].setTransform(1, 0, 0, 1, 0, 0);
		},
		drawWingSingle(){
			// draw cả cánh
	        let {sX, sY, sWidth, sHeight} = this.readSprite[this.curFrame];
	        if (++this.curFrame > this.readSprite.length - 1) this.curFrame = 0;
	        gnAvatarInfo.ctx[this.key].clearRect(0, 0, gnAvatarInfo.canvasWidth[this.key], gnAvatarInfo.canvasHeight[this.key]);
	        gnAvatarInfo.ctx[this.key].translate(0, 0);
	        gnAvatarInfo.ctx[this.key].drawImage(this.image, sX, sY, sWidth, sHeight, this.x, this.y, 280, 190);
	        gnAvatarInfo.ctx[this.key].setTransform(1, 0, 0, 1, 0, 0);
		}
	}
}

var gnAvatarHandle = {
    load() {
        /** Xử lý các promise của Equip */
      	ImageOriginalFulfilled(ImageOriginal)
         	.then(value => ...) // phần trước
         	.then(this.loadFaceAnimation)
         	.catch(rejectFnc); // bắt lỗi
      	return this;
  	},
  	/**
  	 * Hàm Load Mặt Animation
  	 */
   	loadFaceAnimation() {
      	return gnAvatarDrawAnimation.drawFace("faceOrignal", {
            original: this.imageloaded.equip.face, // ảnh mặt trong trạng thái fullfilled
            key
        });
   	}
}


	        // console.log(test);
	       //  Object.keys(this.res).map(key => {
	       //  	var info = {
        //     		key,
        //     		dWidth: that.widthObject,
        //     		dHeight: that.heightObject,
        //     		dx: that.x,
        //     		dy: that.y
        //     	}
	       //  	getImage(this.res[key].original)
		    		// .then(original => {
		    		// 	// sau khi ảnh đã load xong
		    		// 	if(key === "face") return original; // nếu là mặt thì bỏ vì sẽ xử lý ở phần animation
		      //       	this.imageloaded.equip[key] = original;
		      //       	if(!gnAvatarInfo.color[key] || !gnAvatarInfo.suit[key]){
		      //       		// nếu trang bị khác 0 (có pic)
		      //               gnAvatarDraw.drawStaticObject({ original, ...info }); // tiến hành vẽ
		      //               return original;
		      //           }else if(key in gnAvatarInfo.color && gnAvatarInfo.color[key]){
		      //           	return this.imageloaded.overlay[key] = getImage(this.res[key].overlay, {original});
		      //           }
		    		// }).then(overlay => {
		    		// 	// console.log(overlay0.original);
		    		// 	if(!overlay || !overlay.hasOwnProperty("original")) return overlay;
		    		// 	gnAvatarDraw.drawStaticObjectColor({
		    		// 		overlay,
		    		// 		original: overlay.original,
		    		// 		...info
		    		// 	})
		    		// 	return overlay;
		    		// }).then(() => {
		    		// 	this.loadFaceAnimation().loadSkin().loadWings();
		    		// }).catch(rejectFnc);
	       //  })
	        // console.log(this.imageloaded.equip);
	        // this.imageloaded.equip.then(item => {
	        // 	console.log(item);
	        // });
	        
	        // Object.keys(this.res).map(key => {
	        // 	this.imageloaded.equip[key] = Object.assign(new Image, {
	        // 		src: this.res[key].original,
	        // 		onload(){
	        // 			if(key === "face") return;
		       //      	var info = {
		       //      		key,
		       //      		dWidth: that.widthObject,
		       //      		dHeight: that.heightObject,
		       //      		dx: that.x,
		       //      		dy: that.y
		       //      	}
		       //      	if(!gnAvatarInfo.color[key] || !gnAvatarInfo.suit[key]){
		       //              gnAvatarDraw.drawStaticObject({
		       //                  original: this,
		       //                  ...info
		       //              });
		       //          }else if (key in gnAvatarInfo.color && gnAvatarInfo.color[key]){
		       //          	that.imageloaded.overlay[key] = Object.assign(new Image, {
		       //          		src: that.res[key].overlay,
		       //          		original: this,
		       //          		onload(){
		       //          			gnAvatarDraw.drawStaticObjectColor({
		       //          				overlay: this,
		       //          				original: this.original,
		       //          				...info
		       //          			})
		       //          		}
		       //          	})
		       //          }
		       //          that.loadFaceAnimation().loadSkin().loadWings();
		       //          console.timeEnd('loadAvatar');
	        // 		}
	        // 	})
	        // })
var gnAvatarHandle = {
	load(){
		this.getPathEquip().resetCanvas(); // lấy đường dẫn trang bị -> reset canvas

		/** 
		 * Filter ra những equip cần draw
		 * Chỉ filter những Equip bắt buộc có như (tóc, áo, mặt). Còn Mặt xử lý riêng
		 * Hay các trang bị khác default (0)
		 */
		const ImageOriginal = Object.keys(this.res).filter(key => 
			["cloth", "hair"].includes(key) || gnAvatarInfo.suit[key]
		);
       	
       	/**
       	 * Load hết các promise của các equip cần draw (chuyển sang trạng thái Fulfilled) - resolve
       	 * @param  {Array}   original  [danh sách các equip cần draw]
       	 * @return {Promise}           [các promise của từng equip]
       	 */
		const ImageOriginalFulfilled = (original) => Promise.all(
				original.map(key => 
					getImage(this.res[key].original, {
	        			key
	        		})
	        	)
	        );

       	/** Xử lý các promise của Equip */
       	ImageOriginalFulfilled(ImageOriginal)
       		.then(value => value.map(item => {
	       			// ta tiến hành draw Equip
	        		let key = item.key;
	            	this.imageloaded.equip[key] = item;
	                gnAvatarDraw.drawStaticObject({ key, original: item });
	       	 	})
	        )
	        .then(() => {
	        	this.loadFaceAnimation().loadWings();
	        })
			.catch(rejectFnc); // bắt lỗi
		return this;
	},
	loadWings(){
    	if(gnAvatarInfo.suit.wing){
    		wingsSetting = new gnAvatarWingAnimation();
    		wingsSetting.load();
    	}	
    	return this;
    },
}
var gnAvatarHandle = {
	load(){
		this.getPathEquip().resetCanvas(); // lấy đường dẫn trang bị -> reset canvas

		/** 
		 * Filter ra những equip cần draw
		 * Chỉ filter những Equip bắt buộc có như (tóc, áo, mặt). Còn Mặt xử lý riêng
		 * Hay các trang bị khác default (0)
		 */
		const ImageOriginal = Object.keys(this.res).filter(key => 
			["cloth", "hair"].includes(key) || gnAvatarInfo.suit[key]
		);
       	
       	/**
       	 * Load hết các promise của các equip cần draw (chuyển sang trạng thái Fulfilled) - resolve
       	 * @param  {Array}   original  [danh sách các equip cần draw]
       	 * @return {Promise}           [các promise của từng equip]
       	 */
		const ImageOriginalFulfilled = (original) => Promise.all(
				original.map(key => 
					getImage(this.res[key].original, {
	        			key
	        		})
	        	)
	        );

		/**
       	 * Load hết các promise của các phôi equip (overlay) cần draw (chuyển sang trạng thái Fulfilled) - resolve
       	 * @param  {Array}   overlay   [danh sách các phôi equip cần draw]
       	 * @return {Promise}           [các promise của từng phôi]
       	 */
		const ImageOverlayFulfilled = (overlay) => Promise.all(
	        	overlay.map(key => 
	        		getImage(this.res[key].overlay, {
	        			key, 
	        			original: this.imageloaded.equip[key] // phải truyền vào ảnh Original Equip đã fullfiled
	        		})
	        	)
	        );

       	/** Xử lý các promise của Equip */
       	ImageOriginalFulfilled(ImageOriginal)
       		.then(value => value.reduce((overlay, item) => {
		        		let key = item.key;
		            	this.imageloaded.equip[key] = item;
		            	// tổng hợp các Equip có màu (mảng Overlay)
		            	if(key in gnAvatarInfo.color && gnAvatarInfo.color[key]) return [...overlay, key];
		            	// nếu Equip không có màu thì vẽ bth
		                gnAvatarDraw.drawStaticObject({ key, original: item }); // tiến hành vẽ
		                return overlay;
		        	}, [])
			)
			.then(ImageOverlayFulfilled) 
			.then(value => value.map((item) => {
					// sau khi đã load ta tiến hành lưu lại giá trị fulfilled của ảnh (sau này dùng) và draw nó
	        		let key = item.key;
	            	this.imageloaded.overlay[key] = item;
            		gnAvatarDraw.drawStaticObjectColor({
            			key,
	    				overlay: item,
	    				original: item.original
	    			})
	            })
			)
	        .then(() => {
	        	this.loadFaceAnimation().loadWings();
	        })
			.catch(rejectFnc); // bắt lỗi
		return this;
	},
	loadWings(){
    	if(gnAvatarInfo.suit.wing){
    		wingsSetting = new gnAvatarWingAnimation();
    		wingsSetting.load();
    	}	
    	return this;
    },
}


// var gnAvatarHandle = {
// 	load(){
// 		this.getPathEquip().resetCanvas();
// 		const ImageOriginal = Object.keys(this.res).filter(key => ["cloth", "hair"].includes(key) || gnAvatarInfo.suit[key]);	        
// 		ImageOriginal.map(key => {
// 			this.imageloaded.equip[key] = Object.assign(new Image, {
// 				src: this.res[key].original,
// 				onload(){
// 		        	gnAvatarDraw.drawStaticObject({ original: this, key });
// 				},
// 				onerror(){
// 					console.log("error", this.src);
// 				}
// 			})
// 		})
// 		return this;
// 	}
// }
// this.imageloaded.equip[key] = Object.assign(new Image, {
// 	src: this.res[key].original,
// 	onload(){
//     	gnAvatarDraw.drawStaticObject({ original: this, key });
// 	},
// 	onerror(){
// 		console.log("error", this.src);
// 	}
// })]
// 
var gnAvatarHandle = {
   loadAllObject() {
      if (!this.ImageOriginalFulfilledLoaded) return; // nếu chưa có biến lưu các Equip Original Fullfiled thì thoát hàm
      if(gnAvatarInfo.suit.suits && !gnAvatarInfo.hide.suits){
      	// nếu có bộ và không bị ẩn, ta vẽ bộ
	    		getImage(`${gnConfig.host}/equip/${gnShop.pathChar}/suits/${gnAvatarInfo.suit.suits}/1/show.png`)
	    			.then(img => gnAvatarInfo.ctxStatic.drawImage(img, 0, 0, 255, 342, 50, 10, 120, 162))
	    			.then(() => gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing && gnAvatarDraw.drawStaticAllObject.wings());
	    		return this;
	    	}
      if (!this.res) this.setPath(); // nếu chưa có path, ta tiến hành set Path
      this.ImageOriginalFulfilledLoaded
         .then(value => value.map(item => {
            // tiên hành vẽ lại
            let key = item.key;
            if (key === "face")
            /**
             * Đối với mắt, thuộc tính là : 
             * dx: 250, dY: 0, dWidth: 250, dHeight: 312
             * sX, sY, sWidth, sHeight: giống các Equip khác (đều draw tại cùng 1 chỗ)
             */
               gnAvatarInfo.ctxStatic.drawImage(this.imageloaded.equip[key], 250, 0, 250, 312, 50, 0, 130, 162);
            else if (!gnAvatarInfo.hide[key])
            /**
             * Các trường hợp còn lại thì vẽ tại cùng 1 chỗ (tại 1 tọa độ)
             */
               gnAvatarInfo.ctxStatic.drawImage(this.imageloaded.equip[key], 50, 0, 130, 162);
         })).then(() => {
            // check xem có mang Cánh hay không? và nếu nó không bị ẩn thì tiến hành draw
            if (gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing) {
               gnAvatarDraw.drawStaticAllObject.wings(); // hàm vẽ cánh
            }
         })
      return this;
   }
}

var gnAvatarDraw = {
	...
	widthDoubleWings: 90,
	heightDoubleWings: 120,
	widthSingleWings: 170,
	heightSingleWings: 140,
	drawStaticWing(){
		// wingsSetting chính là biến lưu lại class khởi tạo cánh animation ở phần trước
		const count = Math.ceil(wingsSetting.readSprite.length / 2);
		const pathWing = `${gnConfig.host}/equip/wing/${gnAvatarInfo.suit.wing}/img.png`;
		getImage(pathWing)
			.then(img => {
				gnAvatarInfo.ctxStatic.globalCompositeOperation = 'destination-over';
		        let {srcX, srcY, width, height} = wingsSetting.readSprite[count];
		       	if(wingsSetting.wingDouble.indexOf(gnAvatarInfo.suit.wing) >= 0){
			        gnAvatarInfo.ctxStatic.translate(100, 40) // vị trí 1/2 cánh trước
			        gnAvatarInfo.ctxStatic.drawImage(img, srcX, srcY, width, height, 0, 0, this.widthDoubleWings, this.heightDoubleWings)
			        gnAvatarInfo.ctxStatic.scale(-1, 1) // flip horizontally
			        gnAvatarInfo.ctxStatic.drawImage(img, srcX, srcY, width, height, 0, 0, this.widthDoubleWings, this.heightDoubleWings)
			        gnAvatarInfo.ctxStatic.setTransform(1, 0, 0, 1, 0, 0);
		       	}else{
		       		gnAvatarInfo.ctxStatic.translate(0, 0) // vị trí 1/2 cánh trước
			        gnAvatarInfo.ctxStatic.drawImage(img, srcX, srcY, width, height, 0, 0, this.widthSingleWings, this.heightSingleWings)
		       		gnAvatarInfo.ctxStatic.setTransform(1, 0, 0, 1, 0, 0);
		       	}
		        gnAvatarInfo.ctxStatic.globalCompositeOperation = 'source-over';
			})
		return this;
	}
}

var exampleSyntax = {
	ten: "Trần Đình Tủn",
	tuoi: 17,
	sinhnhat: {
		ngay: 31,
		thang: 2,
		nam: 2002
	},
	get sinhNhatXuly(){
		return Object.keys(this.sinhnhat).map(loai => this.sinhnhat[loai]).join("/");
		// <=> return Object.values(this.sinhnhat).join("/");  
	},
	thongBaoCoVanDe: (alert) => $.error("alert"),
	chuanBiPhoi: (obj) => new Promise((sauKhiSanXuatXong, xuLyVanDe) => 
		Object.assign(new SanXuatPhoi, {
			...obj,
			onload(){ return sauKhiSanXuatXong(this) },
			onerror: () => xuLyVanDe("Hết Phôi cmnr, Cháu đợi thêm 1 tuần nữa")
		})
	),
	inThongTin(phoi){
		return phoi.in({
			...this, 
			soCancuoc: this.taoSoCanCuoc(),
			thoiGianTao: this.getNgayThangNam()
		});
	},
	dsDacDiemMaHoNhinThay: ["đẹp trai", "6 múi", "tóc vuốt vuốt", "có 1 cái sẹo trên mũi", "có 1 cục mụn dưới hông"]
	dacDiemNhanDang(){
		return this.dsDacDiem.filter(dacdiem => NeuLaDacDiemTieuBieuKhongThamVaoDauDuoc(dacdiem));
		return this.dsDacDiem.reduce((dacDiemTieuBieu, dacdiem) =>
			NeuLaDacDiemTieuBieuKhongThamVaoDauDuoc(dacdiem) &&
			[...dacDiemTieuBieu, dacdiem] 
		, []);
		// 1 cái sẹo trên mũi
	},
	duaCmnd(cccd){
		if(CoDangKyDichVuChuyenPhatNhanh()) return this.chuyen((tien) => traTien(tien));
		return new Promise((coDuocCccd, duaTheVaoKho) => 
			Object.assign(new DoiLay, {
				onload(){ return coDuocCccd(cccd) },
				onerror: () => duaTheVaoKho("Cccd đã được cất vào kho")
			})
		)
	},
	lamCanCuocCongDan(){
		if(this.age < 14) return this.Error("Cháu chưa đủ tuổi làm cccd");
		this.chuanBiPhoi({
			anhThe: this.chupAnh(),
			vanTay: this.dacDiemNhanDang(),
			qrCode: this.taoQrCode()
		})
			.then(() => this.inThongTin())
			.then(this.duaCmnd)
			.catch(thongBaoCoVanDe);
	}
}

{
   name: "Jack098",
   get getName() {
      return this.name
   },
   set setName(val) {
      this.name = val
   }
}
get, set (using in Object) : dùng để wrap lại các gói dữ liệu
----------------------------------
{...exampleSyntax, isHandSome: true} : ... 1 syntax khá hay trong es8, nó thay 
thế cho method Object.assign(obj, {jack: '098'});
Có thể tạo mới 1 object bằng cách : obj = {...obj}
----------------------------------
`Jack098 is ${exampleSyntax.isHandSome ? "handsome" : "ugly"}` : 1 cách shortage 
của việc insert vào String
----------------------------------
() => {} : arrow function. Nhưng trong Object, method thì không nên sử dụng nó. 
Giả sử nếu bạn không tạo scope mà return về thẳng sau arrow. Như này
{
   name: "Jack098",
   example: () => this.name
}
giá trị this lúc này sẽ undefined, vì Nó chỉ có giá trị khi scope được tạo ra để 
get được chính Object đang được gọi thực thi
Thay vào đó, ta phải sử dụng : 
{
   name: "Jack098",
   example() {
      return this.name
   };
}
----------------------------------
(function() {
   let {
      name
   } = exampleSyntax;
   var example = function() {
      console.log(name) // underfined
   }
   console.log(name) // Jack098
})
console.log(name); // underfined

{name} = exampleSyntax <=> name = exampleSyntax.name : tránh việc trùng tên và thuộc 
tính gây mất thẩm mỹ
let : khai báo cho biến chỉ hoạt động trong 1 scope nhất định
----------------------------------
Giả sử ta có 1 danh sách học sinh với số điểm như sau :
var fruits = [{
   name: "táo",
   weight: 5
}, {
   name: "xoài",
   weight: 4
} {
   name: "cam",
   weight: 6
}, {
   name: "quýt",
   weight: 2
}, {
   name: "mận",
   weight: 5
}, ]
Hãy thực hiện các yêu cầu sau : 
1. Lọc ra những loại trái cây có nhiều hơn hoặc bằng 5 kg 
fruits.filter(fruit => fruit.weight >= 5);
// [{name: "táo", weight: 5}, {name: "cam", weight: 6}, {name: "mận", weight: 5}]
2. Thu về 1 mảng các số ký của từng loại trái cây
fruits.map(fruit => fruit.weight);
// [5, 4, 6, 2, 5]
3. Tính tổng số ký của tất cả chúng
fruits.reduce((totalWeight, fruit) => totalWeight += fruit.weight, 0);
// 22
4. Tìm loại trái cây nào có số kỳ bằng 5
fruits.find(fruit => fruit.weight == 5);
// {name: "táo", weight: 5}
Mặc định find sẽ trả về kết quả đầu tiên sau đó thì thoát không tìm nữa
----------------------------------
Object.assign(new Image, obj) : như các bạn đã biết class trong js thực chất chỉ là 
object. (nói trắng ra thì cả ngôn ngữ đều hoạt động dựa trên object), nên mình assign 
nó class với object khác là 1 điều dễ hiểu. Ở đây mình thêm parameter obj vì sau này 
sẽ có ích đấy, mà lúc sau bạn sẽ rõ (bây giờ bạn không cần quan tâm)
----------------------------------
callback function: như mình đã nói trên js thực chất hoạt động bằng Object. function 
cũng vậy nó là 1 object, nó có thể nhận function như 1 tham số cũng có thể trả về là 
1 function, vì thề ta có thể gọi nó ngược lại trong function đó. Ở đây đồng bộ hay bất 
đồng bộ tùy thuộc vào cách bạn call ngược lại trong hàm chính. Với hàm mình đưa trên 
thì là bất đồng bộ.
----------------------------------
Promise mình sẽ giải thích ngay khi sử dụng