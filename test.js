var gioi_tinh = 1;
var searchText = '';
$(document).ready(function() {
    var ctx = {};
    var ctxDoc = {};
    for (var i = 0; i < canvas.length; i++) {
        ctx[i] = ctxDoc[i] = document.getElementById(canvas[i]);
        var canvasWidth = ctx[i].width;
        var canvasHeight = ctx[i].height;
        ctx[i] = ctx[i].getContext("2d");
    }
    for(var object in canvas){
        ctx[object] = ctxDoc[object] document.getElementById(canvas[i]);
        var canvasWidth = ctx[object].width;
        var canvasHeight = ctx[object].height;
        ctx[object] = ctx[object].getContext("2d");
    }
    var aAll_canvas = aAll_canvas_Doc = document.getElementById('image-object-all');
    aAll_canvas = window.aAll_canvas = aAll_canvas.getContext("2d");
    var suitArr = [];
    var suitImage = [];
    var suitColor = [0, 0, 0, 0, 0, 0];
    var suit = {
        "face": 0,
        "hair": 0,
        "head": 0,
        "cloth": 0,
        "glass": 0,
        "eff": 0,
        "wing": 0,
        "suits": 0
    };
    var count2 = 0;
    var posEquip = {
        "head": {
            "x": 0,
            "y": 0
        },
        "hair": {
            "x": 0,
            "y": 0
        },
        "cloth": {
            "x": 0,
            "y": 0
        },
        "suits": {
            "x": 23,
            "y": 41
        },
        "glass": {
            "x": 0,
            "y": 0
        },
        "eff": {
            "x": 0,
            "y": 0
        },
        "face": {
            "x": 23,
            "y": 25
        }
    };
    var resSuit = {
        "face": {
            "original": 0,
            "overlay": 0
        },
        "hair": {
            "original": 0,
            "overlay": 0
        },
        "head": {
            "original": 0,
            "overlay": 0
        },
        "cloth": {
            "original": 0,
            "overlay": 0
        },
        "glass": {
            "original": 0,
            "overlay": 0
        },
        "eff": {
            "original": 0,
            "overlay": 0
        }
    };
    var item_equip = {};
    var iCount = 0;

    var tamImage = 0;
    var eff_run = false;
    var test = false;
    var suits_run = false;
    var wing_run = false;
    var colorSkin = 0;
    var item_bag = {};
    var idtoarea = ["face", "eff", "hair", "head", "cloth", "glass", "suits"];
    var idObject = {
        "1": idtoarea.indexOf("head"),
        "2": idtoarea.indexOf("glass"),
        "3": idtoarea.indexOf("hair"),
        "4": idtoarea.indexOf("eff"),
        "5": idtoarea.indexOf("cloth"),
        "6": idtoarea.indexOf("face"),
        "13": idtoarea.indexOf("suits")
    };


    var menu_tab = {
        "trang-bi": {
            "kinh": {
                "name": "Kính",
                "cat": 2
            },
            "ao": {
                "name": "Áo",
                "cat": 5
            },
            "non": {
                "name": "Nón",
                "cat": 1
            }
        },
        'lam-dep': {
            "toc": {
                "name": "Tóc",
                "cat": 3
            },
            "emat": {
                "name": "Mắt",
                "cat": 6
            },
            "fmat": {
                "name": "Mặt",
                "cat": 4
            },
            "bo": {
                "name": "Bộ",
                "cat": 13
            },
            "canh": {
                "name": "Cánh",
                "cat": 15
            }
        }
    };
    var menuArr = {};
    $('.shop-item').on('click', '.tab-cat .btn:not(.active)', function() {
        $('.tab-cat .btn').removeClass('active');
        $(this).addClass('active');
        var area = $(this).attr('area');
        load_sub_menu(area);
    })
    var params = {"catId": 0};
    var wingsImage = 0;
    var imgSuit = 0;
    load_avatar();
    load_sub_menu('trang-bi');
    load_item_hot();

    function load_sub_menu(area = "trang-bi") {
        menuArr = {}, menuArr.area = area, menuArr.gt = gioi_tinh, menuArr.data = JSON.stringify(menu_tab), menuArr.ultimate = $('.ultimate-check input').is(':checked');
        if(area in menu_tab) params.catId = menu_tab[area][Object.keys(menu_tab[area])[0]]["cat"];
        // Object.keys(menu_tab[area])[0] : sub-menu đầu tiên (key) trong menu
        $.post('ajax/load-menu.php', {
            menu: menuArr
        }, function(data) {
            lines = data.split('\n');
            if (lines[0] != '1') {
                $('.item-show').html(lines[0]);
                setPagination(Number(lines[2]), 1, Number(lines[1]));
            }
        })
    }

    $('.avatar-view .frame:not(.active)').click(function() {
        if ((!$(this).has('.animate-border-blink').length && $(this).has('div[style]').length) 
        	|| $(this).has('.animate-border-blink').length) {
            $('.avatar-view .frame.active .animate-border-blink').remove();
            $(this).append('<div class="animate-border-blink"></div>');
        }
    });

    $('.buy-confirm').click(function(){
        var allInfoBag = {cost: 0, itemBag: []};
        
        $('.list-item .item-show-shop').each(function(){
            allInfoBag['itemBag'].push($(this).attr('pic'));
        })
        allInfoBag['cost'] = allCost;
        notifyText('Chức năng này chưa được xây dựng.', 'error');
        notifyText('Tổng số tiền cần chi trả là : <strong>'+ allCost +'G</strong>', 'success');
        console.log(allInfoBag);
    })

    $('.ultimate-check input').click(function(){
        if($(this).is(':checked'))
            notifyText('Bạn vừa bật chế độ ultimate trang bị Shop.');
        else
            notifyText('Bạn vừa bỏ chế độ ultimate trang bị Shop.');
        load_shop(params.catId, params.page, gioi_tinh);
    })
    var arrPrefix = {"info": "Thông tin", "warning": "Cảnh báo", "error": "Lỗi", "success": "Thành công"};
    function notifyText(text = '', type = 'info'){
        new Noty({
            text: "<span class='prefix-alert'>"+arrPrefix[type]+" : </span>"+text,
            type: type,
            theme: 'mint',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: mojsShow,
                close: mojsClose
            }
        }).show();
    }

    $('.info .choosesex div').click(function() {
        $('.choosesex div').removeClass('active');
        $(this).addClass('active');
        var sGt = $(this).attr('id');
        gioi_tinh = sGt == 'male' ? 1 : 2;
        suit = {"face": 0,"hair": 0,"head": 0,"cloth": 0,"glass": 0,"eff": 0,"wing": 0,"suits": 0};
        $('.frame.active').find('div').remove();
        load_avatar(gioi_tinh - 1), load_wings();
        load_shop(params.catId, params.page, gioi_tinh), load_item_hot(), disableFeature();
        notifyText('Bạn vừa đổi nhân vật của mình sang : <strong>' + (gioi_tinh == 1 ? 'Nam' : 'Nữ') + '</strong>');
    })

    $('#tabs-2 .btn-color-make').click(function() {
        var hex = '#' + $('.jscolor#equip').val();
        $('.avatar-view .frame.active:not(#wing)').has('.animate-border-blink').each(function() {
            var idTest = $(this).attr('catid');
            if(idTest == '13' || idTest == '15'){
                notifyText('Trang bị này không thể đổi màu. Vui lòng chọn trang bị khác.', 'error');
            }
            var cat = $(this).attr('cat');
            suitColor[idObject[idTest]] = hex;
            var overlay = new Image;
            overlay.src = resSuit[cat]['overlay'];
            overlay.onload = function() {
                if(colorSkin != 0){
                    if (cat == "face") {
                        drawEMatAnimation(ctx[2 + idObject[idTest]], overlay, item_equip[idObject[idTest]], hex, cat, idObject[idTest]);
                    } else if (cat != "suits"){
                        draw(ctx[2 + idObject[idTest]], overlay, item_equip[idObject[idTest]], hex, cat, idObject[idTest]);
                    }
                }else{
                    if (cat == "face") {
                        drawEMatAnimation(ctx[2 + idObject[idTest]], overlay, item_equip[idObject[idTest]], hex);
                    } else if (cat != "suits"){
                        draw(ctx[2 + idObject[idTest]], overlay, item_equip[idObject[idTest]], hex);
                    }
                }
                
            }
        });
    })

    $('.btn-color-reset').click(function() {
        $('.avatar-view .frame').has('div[style]').each(function() {
            var idTest = $(this).attr('catid');
            var cat = $(this).attr('cat');
            suitColor[idObject[idTest]] = 0;
        });
        load_avatar(gioi_tinh - 1);
        load_wings();
    })

    $('.shop-item').on('click', '.item-show .sub-tab .btn', function() {
            $('.item-show .sub-tab .btn').removeClass('active');
            $(this).addClass('active');
            var catId = $(this).attr('catid');
            load_shop(catId, 1, gioi_tinh);
        })
        // load_shop(1,2,1,2);

    $('.phantrang .btn').not('.disabled').click(function() {
        var page = $(this).attr('page');
        if (searchText != '') 
            load_item_search(searchText, page);
        else 
            load_shop(params.catId, page, gioi_tinh);
    })

    $('.search-item input').focus(function() {
        $(this).siblings('#result').fadeIn('fast');
    })
    $('.search-item input').blur(function() {
        $(this).siblings('#result').fadeOut('fast');
    })
    $('.search-item input').keyup(function() {
        if(!$(this).val()) return;
        searchKw = {}, searchKw.text = $(this).val(), searchKw.gt = gioi_tinh, searchKw.limit = 6, searchKw.ultimate = $('.ultimate-check input').is(':checked');
        $.post('ajax/load-search.php', {
            search: searchKw
        }, function(html) {
            $('#search-box #result').html(html);
            $('#search-box #result #other-result a').attr('onclick', 'load_item_search("'+searchKw.text+'")')
        })
    })
    var delayAlert = 50000;
    var timerAlert = 5000; 
    setAlert();
   	setInterval(function(){
   		setAlert();
   	}, delayAlert);

    function setAlert(time = timerAlert){
    	$.get('ajax/load-annoucement.php', function(html){
    		$('.alert-panel').html(html).show().addClass('animated bounceIn').delay(time).queue(function() {
	      		$(this).removeClass('bounceIn').addClass('bounceOut').delay(1000).queue(function(){
	      			$(this).hide().removeClass('animated bounceOut').dequeue();
	      		}).dequeue();
			});
    	})
	}

    function load_item_hot() {
        item_hot = {}, item_hot.limit = 6, item_hot.gt = gioi_tinh;
        $.post('ajax/load-item-hot.php', {
            hot: item_hot
        }, function(html) {
            $('.hot-item .show-item').html(html);
        })
    }

    function load_shop(catId, page = 1, gt = 1) {
        // load main-content shop
        params = {}, params.catId = catId, params.gt = gt, params.page = page, params.ultimate = $('.ultimate-check input').is(':checked');
        $.post('ajax/load-shop.php', {
            shop: params
        }, function(data) {
            lines = data.split('\n');
            if (lines[0] != '1') {
                $('.item-show .show div').html(lines[0]);
                setPagination(Number(lines[2]), 1, Number(lines[1]));
            }
        })
    }

    var itemHide = {"head": 0, "glass": 0, "suits": 0, "wing": 0};
    var keyItemHide = {"head": "nón", "glass": "kính", "suits": "bộ", "wing": "cánh"};
    $('.hidden span.hide').click(function() {
        area = $(this).attr('area');
        if($(this).find("input").is(':checked')) 
            $('canvas#' + area).hide(), itemHide[area] = 1, notifyText('Bạn vừa tắt hiện <strong>' + keyItemHide[area] + '</strong> khỏi demo nhân vật');
        else 
            $('canvas#' + area).show(), itemHide[area] = 0, notifyText('Bạn vừa bật hiện <strong>' + keyItemHide[area] + '</strong> trên demo nhân vật');
        
        if(itemHide["suits"] == 0 && suit["suits"] != 0){
        	resetCanvas();
        	load_suits();
        	load_wings();
        }else{
            load_avatar(gioi_tinh-1);
            load_wings();
        }
    })

    var suitRanAll = [];
    $('.btn-random').click(function() {
        suit['suits'] = 0;
        $('.frame#suits').find('div[style], .animate-border-blink').remove();
        ranSuit = {}, ranSuit.gt = gioi_tinh, ranSuit.ultimate = $('.ultimate-check input').is(':checked');
        $.post("ajax/load-ran-suit.php", {
            ranSuit: ranSuit
        }, function(html) {
            suitTam = JSON.parse(html);
            suitRanAll.push(suitTam);
            for (var key in suitTam) {
                suit[key] = suitTam[key]['pic'];
                $('.avatar-view .frame#' + key).html(suitTam[key]["name"] + '<div style=\"background-image: url(' + suitTam[key]["link"] + ');background-repeat:  no-repeat;\"></div><div class=\"animate-border-blink\"></div>').addClass('active').attr('cat', key).attr('catid', suitTam[key]["catid"]);
            }
            load_avatar(gioi_tinh - 1, 1), load_wings(), enableFeature();
        })
    })

    $('.panel2').on('click', '.btn-close', function() {
        load_menu_all();
        load_sub_menu('trang-bi');
        searchText = '';
    })

    $('.btn-back').click(function() {
        if (suitRanAll.length == 1) {
            for (var key in suitRanAll[0]) {
                suit[key] = 0;
                $('.avatar-view .frame#' + key).html(suitRanAll[0][key]["name"]).removeClass('active').removeAttr('cat').removeAttr('catid');
            }
            load_avatar(gioi_tinh - 1), load_wings(), disableFeature();
            suitRanAll.splice(1, 1);
        } else if (suitRanAll.length > 1) {
            len = (suitRanAll.length == 1) ? 0 : (suitRanAll.length - 2);
            for (var key in suitRanAll[len]) {
                if (suitRanAll[len][key]['pic'] == "undefined") continue;
                suit[key] = suitRanAll[len][key]['pic'];
                text = $('.avatar-view .frame#' + key).text();
                $('.avatar-view .frame#' + key).html(text + '<div style=\"background-image: url(' + suitRanAll[len][key]["link"] + ');background-repeat:  no-repeat;\"></div><div class=\"animate-border-blink\"></div>').addClass('active').attr('cat', key).attr('catid', suitRanAll[len][key]["catid"]);
            }
            load_avatar(gioi_tinh - 1), load_wings();
            suitRanAll.splice(suitRanAll.length == 1 ? 0 : (suitRanAll.length - 1), 1); // xóa phần tử cuối cùng
        } else {
            len = (suitArr.length == 1) ? 0 : (suitArr.length - 2);
            suit = JSON.parse(suitArr[len]); // lấy mảng last object trong suitArr
            load_avatar(gioi_tinh - 1, 1), load_wings();
            var len2 = (suitImage.length == 1) ? 0 : (suitImage.length - 1); // vị trí cần handle cho object
            if (len2 != 0) {
                eImgSuit = JSON.parse(suitImage[len2 - 1]);
                eImgSuit2 = JSON.parse(suitImage[len2]);
                if (eImgSuit['catId'] != eImgSuit2['catId']) {
                    var cat2 = eImgSuit2['cat'],
                        text2 = eImgSuit2['text'];
                    $('.avatar-view .frame#' + cat2).html(text2).removeClass('active').removeAttr('cat').removeAttr('catid');
                }
                var cat = eImgSuit['cat'], 
                    img = eImgSuit['img'], 
                    pic = eImgSuit['pic'],
                    catId = eImgSuit['catid'],
                    text = eImgSuit['text'];
                $('.avatar-view .frame#' + cat).html(text + '<div style=\"background-image: url(' + img + ');background-repeat:  no-repeat;\"></div><div class=\"animate-border-blink\"></div>').addClass('active').attr('cat', cat).attr('catid', catId);
                suitImage.splice(len2, 1);
            } else {
                // trường hợp còn 1 object cuối cùng trong mảng để trống tất cả
                eImgSuit = JSON.parse(suitImage[len2]);
                var cat = eImgSuit['cat'], 
                    text = eImgSuit['text'];
                $('.avatar-view .frame#' + cat).html(text).removeClass('active').removeAttr('cat').removeAttr('catid');
                suitImage.splice(len2, 1);
                disableFeature();
            }
            suitArr.splice(suitArr.length == 1 ? 0 : (suitArr.length - 1), 1); // xóa phần tử cuối cùng
        }
    })


    var wingType1 = ["wing002", "wing003", "wing004", "wing005", "wing006", "wing007", "wing008", "wing009", "wing018", "wing019", "wing020", "wing021", "wing022", "wing023", "wing024", "wing025", "wing026", "wing027", "wing028", "wing029", "wing030", "wing31", "wing32", "wing33", "wing34", "wing61", "wing63", "wing64", "wing65", "wing66", "wing70", "wing75", "wing76", "wing79", "wing81", "wing86", "wing87", "wing93", "wing94", "wing100"];
    $('.shop-item').on('click', '.item-frame .img', function() {
        if (!$(this).parent().hasClass('active')) {
            $('.item-frame').removeClass('active');
            $(this).parent().addClass('active');
        }
        ($(this).attr('state') == '1') && notifyText('Trang bị vừa chọn đã hết hàng hoặc không thể mua được, chỉ có thể xem demo.', 'warning');
        var cat = $(this).attr('cat'),
            img = $(this).attr('img'),
            pic = $(this).attr('pic'),
            catId = $(this).attr('catid'),
            text = $('.avatar-view .frame#' + cat).text();
        $('.avatar-view .frame .animate-border-blink').remove();
        suitImage.push(JSON.stringify({"text": text, "img": img, "cat": cat, "pic": pic, "catId": catId}));
        $('.avatar-view .frame#' + cat).html(text + '<div style=\"background-image: url(' + img + ');background-repeat:  no-repeat;\"></div><div class=\"animate-border-blink\"></div>').addClass('active').attr('cat', cat).attr('catid', catId);
        suit[cat] = pic;
        if (cat == "suits") 
            load_suits(), load_wings();
        else if (cat == "wing") 
            load_wings();
        else if(suit["suits"] == 0)
            load_avatar(gioi_tinh - 1), load_wings();
        enableFeature();
    })

    $('.search-item').on('click', '.frame', function() {
        var cat = $(this).attr('cat'),
            img = $(this).attr('img'),
            pic = $(this).attr('pic'),
            catId = $(this).attr('catid'),
            text = $('.avatar-view .frame#' + cat).text();
        $('.avatar-view .frame .animate-border-blink').remove();
        suitImage.push(JSON.stringify({"text": text, "img": img, "cat": cat, "pic": pic, "catId": catId}));
        $('.avatar-view .frame#' + cat).html(text + '<div style=\"background-image: url(' + img + ');background-repeat:  no-repeat;\"></div><div class=\"animate-border-blink\"></div>').addClass('active').attr('cat', cat).attr('catid', catId);
        suit[cat] = pic;
        if (cat == "suits") 
            load_suits(gioi_tinh - 1);
        else if (cat == "wing")
            load_wings();
        else if(suit["suits"] == 0)
            load_avatar(gioi_tinh - 1), load_wings();
        enableFeature();
    })

    $('#gio-hang .list-item').on('click', '.btn-remove-item', function() {
        pic = $(this).parents('.item-show-shop').attr('pic'), cat = $(this).parents('.item-show-shop').attr('typeequip');
        delete item_bag[cat], suit[cat] = 0; // xóa trang bị đó khỏi giỏ đồ và khỏi nhân vật
        $('.frame#' + cat).removeClass('active').removeAttr('cat').removeAttr('catid').find('div[style], .animate-border-blink').remove();
        if (Object.keys(item_bag).length === 0) {
        	$(this).parents('.item-show-shop').fadeOut("slow");
            disableFeature();
        } else {
            $(this).parents('.item-show-shop').fadeOut("slow");
            updateListItemInCart(1);
        }
        check = $('#gio-hang .list-item .item-show-shop[typeequip="suits"]').is(":visible") ;
        if(check && cat != 'suits')
        	load_suits();
        else if(!check || cat == 'suits' || Object.keys(item_bag).length == 0)
        	load_avatar(gioi_tinh - 1, 1), load_wings(); 
    })

    $('.avatar-view').on('click', '.btn-save .text-save', function() {
        aAll_canvas.clearRect(0, 0, 200, 200);
        // (suit["wing"] != 0 && !$('.hide[area="wing"] input').prop('checked')) && drawImageWings();
        (suits_run && !$('.hide[area="suits"] input').prop('checked')) ? getImageSuit() : getImageAllObject();

        $('#save-image').dialog('open');
    })

    $('#weapon-data').on('click', 'tr', function(){
        var data = weaponTable.row($(this)).data();
        $('#weapon-setting').attr('pic', data[2]);
        callDrawObject();
        // getImageAllObject();
        drawAnotherObject('weapon', data[2]);

        (data[1].length >= 9) ? $('#weapon-setting').text(data[1].substring(0, 7) + '...') : $('#weapon-setting').text(data[1]); 
        
    })

    $('#circle-setting').change(function(){
        (suits_run && !$('.hide[area="suits"] input').is(':checked')) ? getImageSuit(this) : getImageAllObject(this);
    })

    $('#badge-setting, #student-setting').change(function(){
        callDrawObject();
    })
    $('#level-setting, #vip-setting, #text-setting').blur(function(){
        callDrawObject();
    })

    $('#love-setting').click(function(){
        callDrawObject();
    })
    
    function callDrawObject(check = true){
        if(check && $('#circle-setting').val() != '0'){
            (suits_run && !$('.hide[area="suits"] input').prop('checked')) ? getImageSuit($('#circle-setting')) : getImageAllObject($('#circle-setting'));
        }else if(check){
            (suits_run && !$('.hide[area="suits"] input').prop('checked')) ? getImageSuit() : getImageAllObject();
        }
        if($('#text-setting').val() != ''){
            drawAnotherObject('text', $('#text-setting').val());
        }
        if($('#vip-setting').val() != '0'){
            drawAnotherObject('vip', $('#vip-setting').val());
        }
        if($('#level-setting').val() != '0'){
            drawAnotherObject('level', $('#level-setting').val());
        }
        if($('#badge-setting').val() != '0'){
            drawAnotherObject('badge', $('#badge-setting').val());
        }
        if($('#student-setting').val() != '0'){
            drawAnotherObject('student', $('#student-setting').val());
        }
        if($('#love-setting').is(':checked')){
            drawAnotherObject('love', $('#love-setting').val());
        }
        if($('#weapon-setting').attr('pic')){
            drawAnotherObject('weapon', $('#weapon-setting').attr('pic'));
        }
    }

    var imgSuit2 = 0;
    function getImageSuit(e = 0, domain = 'http://localhost/studymake/test/') {
        if(e != 0){
            var circleSetting = $(e).val();
            if(circleSetting != 0){
                if(!resSuit['circle'] )
                    resSuit = {...{'circle': {'original': domain + '/equip/circlelight/'+circleSetting+'.png'}}, ...resSuit};
                else
                    resSuit['circle'] = {'original': domain + '/equip/circlelight/'+circleSetting+'.png'};
            }
        }

        imgSuit2 = new Image;
        imgSuit2.src = domain + "equip/f/suits/" + suit['suits'] + "/1/show.png";
        imgSuit2.onload = function(){
            aAll_canvas.clearRect(0, 0, 200, 200);
            aAll_canvas.drawImage(imgSuit2, 0, 0, 255, 342, 50, 10, 120, 162);
            (suit["wing"] != 0 && !$('.hide[area="wing"] input').prop('checked')) && drawImageWings();
            drawAnotherObject('sinple', 1);
            if(e != 0) callDrawObject(false); 
            if(resSuit['circle']) drawAnotherObject("circle", resSuit['circle']['original']);
            aAll_canvas.font = "10px Arial";
            aAll_canvas.textAlign = "right";
            aAll_canvas.strokeText("Avatar Gunny By Jack098", 200, 10);
        }
    }

    // var item_equip2 = 0;
    var dataObject = 0, dataObject2 = 0;
    function getImageAllObject(e = 0, domain = 'http://localhost/studymake/test') {
        var cItem = 0;
        var iCount2 = 0;  
        var item_equip2 = [];
        var overlay2 = [];
        var addNum = 0;
        if(e != 0){
            var circleSetting = $(e).val();
            if(circleSetting != 0){
                if(!resSuit['circle'] )
                    resSuit = {...{'circle': {'original': domain + '/equip/circlelight/'+circleSetting+'.png'}}, ...resSuit};
                else
                    resSuit['circle'] = {'original': domain + '/equip/circlelight/'+circleSetting+'.png'};
            }
            addNum = 1;
        }
        
        $.each(resSuit, function(key, value) {
            item_equip2[iCount2] = new Image;  
            item_equip2[iCount2].src = value.original;   
            item_equip2[iCount2].key = key;
            // console.log(item_equip2[iCount2].key);
            item_equip2[iCount2].onload = function() {
                if(cItem == 5 + addNum){
                    
                    aAll_canvas.clearRect(0, 0, 200, 200);
                    for (var i = addNum; i <= cItem; i++) {
                        if(i == addNum){
                            aAll_canvas.drawImage(item_equip2[i], 250, 0, 250, 312, 50, 0, 130, 162);
                        }else if(!(item_equip2[i].key in itemHide) || itemHide[item_equip2[i].key] == 0){
                            aAll_canvas.drawImage(item_equip2[i], 50, 0, 130, 162);
                        }
                    }
                    // dataObject = aAll_canvas_Doc.toDataURL();
                    
                    (suit["wing"] != 0 && !$('.hide[area="wing"] input').prop('checked')) && drawImageWings();
                    drawAnotherObject('sinple', 1);
                    if(e != 0) callDrawObject(false); 
                    if(resSuit['circle']){
                        drawAnotherObject("circle", resSuit['circle']['original']);
                    }
                    aAll_canvas.font = "10px Arial";
                    aAll_canvas.textAlign = "right";
                    aAll_canvas.strokeText("Avatar Gunny By Jack098", 200, 10);
                    
                }
                cItem++;
            }
            iCount2++;
        });    

        // callDrawObject(false);   
    }

    var object = {};
    function drawAnotherObject(type = "level", value = 1, domain = 'http://localhost/studymake/test'){
        object.type = new Image;
        // object.type.crossOrigin = "Anonymous";
        switch(type){
            case "circle":
                object.type.onload = function(){
                    aAll_canvas.globalCompositeOperation = 'destination-over';
                    aAll_canvas.drawImage(object.type, 29, 7, 150, 150);
                    aAll_canvas.globalCompositeOperation = 'source-over';
                }
                object.type.src = value;
                break;
            case "sinple": 
                object.type.onload = function(){
                    // aAll_canvas.save();
                    // aAll_canvas.globalAlpha = 0.7;
                    aAll_canvas.globalCompositeOperation = 'source-atop';
                    aAll_canvas.drawImage(this, 47,94);
                    aAll_canvas.globalCompositeOperation = 'source-over';
                    // aAll_canvas.restore();
                }
                object.type.src = domain + '/equip/icon/sinple.png';
                break;
            case "level":
                object.type.onload = function(){
                    aAll_canvas.drawImage(this, 1,0, 34, 33);
                }
                object.type.src = domain + '/equip/level/' + value + '.png';
                break;
            case "vip":
                object.type.onload = function(){
                    aAll_canvas.drawImage(this, 7,38, 25, 25);
                }
                object.type.src = domain + '/equip/vip/' + value + '.png';
                break;
            case "badge":
                object.type.onload = function(){
                    aAll_canvas.drawImage(this, 7,70, 27, 27);
                }
                object.type.src = domain + '/equip/badge/' + value + '/icon.png';
                break;
            case "student": 
                object.type.onload = function(){
                    aAll_canvas.drawImage(this, 4, 105);
                }
                object.type.src = domain + '/equip/icon/' + value + '.png';
                break;
            case "love":
                object.type.onload = function(){
                    aAll_canvas.drawImage(this, 8, 130);
                }
                object.type.src = domain + '/equip/icon/' + value + '.png';
                break;
            case "weapon":
                object.type.onload = function(){
                    aAll_canvas.drawImage(this, 50, 0, 130, 162);
                }
                object.type.src = domain + '/equip/arm/' + value + '/1/0/show.png';
                break;
        }
    }
    var image = 0;
    function drawImageWings(x=0, y=0, domain = 'http://localhost/studymake/test') {
        count = Math.ceil(wingsImage.length / 2);
        image = new Image;
        image.src = domain + "/equip/wing/" + suit["wing"] + "/img.png";
        image.onload = function(){
            aAll_canvas.globalCompositeOperation = 'destination-over';                
            if(wingType1.indexOf(suit["wing"]) > -1){
                aAll_canvas.translate(100, 40); // vị trí 1/2 cánh trước
                aAll_canvas.drawImage(image, wingsImage[count].srcX, wingsImage[count].srcY, wingsImage[count].width, wingsImage[count].height, x, y, 90, 120);
                aAll_canvas.scale(-1, 1); // flip horizontally
                aAll_canvas.drawImage(image, wingsImage[count].srcX, wingsImage[count].srcY, wingsImage[count].width, wingsImage[count].height, x, y, 90, 120);
                aAll_canvas.setTransform(1, 0, 0, 1, 0, 0); 
            }else{
                aAll_canvas.translate(0, 0);
                aAll_canvas.drawImage(image, wingsImage[count].srcX, wingsImage[count].srcY, wingsImage[count].width, wingsImage[count].height, x, y, 170, 140);
                aAll_canvas.setTransform(1, 0, 0, 1, 0, 0);
            }
            aAll_canvas.globalCompositeOperation = 'source-over';
        }
    }

    $('.btn-save-me').click(function() {
        var image = document.getElementById("image-object-all").toDataURL("image/png").replace("image/png", "image/octet-stream");
        $(this).attr('href', image);
    })

    $('.item-show').on('click', '.item-frame .info .btn .action-btn#buy', function(){
        var img = $(this).parents('.item-frame').find('.img');
        data = {};
        data.key = img.attr('cat');
        data.value = img.attr('pic');
        updateListItemInCart(0, 2, data);
    })

    $('.action').on('click', '.btn-buy:not(.disabled)', function() {
        updateListItemInCart();
    })

    $('#gio-hang').on('click', '.item-show-shop .time-renew', function() {
        $(this).parents('.item-show-shop').find('.time-renew').removeClass('active');
        $(this).addClass('active');
    })

    function enableFeature() {
        $('.avatar-view .btn-save').removeClass('disabled');
        $('.btn-buy, .action .button').removeClass('disabled');
        $('.action .button .btn, .action .button .btn-ask').addClass('flight');
        $('#tabs').tabs("enable", "#tabs-2").tabs("enable", "#tabs-3");
    }

    function disableFeature() {
        $('.btn-buy, .action .button').addClass('disabled');
        $('.action .button .btn, .action .button .btn-ask').removeClass('flight');
        $('#tabs').tabs("disable", "#tabs-2").tabs("disable", "#tabs-3");
        $("#gio-hang").dialog('close');
        $('.avatar-view .btn-save').addClass('disabled');
    }
    var allCost = 0;
    // data : thông tin 1 loại trang bị bất kỳ ở TH2 nếu type khác 1
    function updateListItemInCart(setHtmlList = 0, type = 1, data = {}) {
        if (type == 1){
            // xử lý trường hợp 1
            for (var key in suit) if (suit[key] != 0) item_bag[key] = suit[key];
            // chứa danh sách các trang bị đã được chọn
        }else{
            // xử lý trường hợp 2
            item_bag = {}; // reset lại item_bag để chắc chắn chỉ có 1 trang bị trong giỏ
            item_bag[data.key] = data.value;
        }
        if(Object.keys(item_bag).length === 0) { disableFeature(); return; };
        // Nếu không có trang bị nào trong shop (đã xóa hết) thì tắt nó đi và các button liên quan
        
        listItem = {}, listItem.list = item_bag, listItem.gt = gioi_tinh, listItem.type = type;
        $.post("ajax/load-item-list.php", {
            bagshop: listItem
        }, function(data) {
            lines = data.split('\n');
            if (lines[0] != '1') {
                (setHtmlList == 0 || lines[1] == 0) && $('#gio-hang .list-item').html(lines[0]);
                $('#gio-hang #total-item-num strong').text(lines[1]); // số lượng trang bị
                $('#gio-hang .input-cost-span').text(lines[2]); // tổng tiền
                allCost = lines[2];
                $("#gio-hang").dialog('open'); // mở popup
            }
        })
    }

    function resetCanvas() {
        for (var i = 0; i < canvas.length; i++) {
            ctx[i].clearRect(0, 0, 1000, 1000); // clear tất cả các Object trong từng Canvas
        }
        clearInterval(eff_run); // xóa Interval Mắt
        clearInterval(test); // xóa Interval Mắt có Màu
        clearInterval(suits_run); // xóa Interval bộ
        clearInterval(wing_run); // xóa Interval Cánh
        clearInterval(matSkin);
    }

    function load_suits(sex = 0, type = 0, domain = "http://resstagging.gn.zing.vn/image/") {
    	// có thể lấy host này cho nhanh : http://resstagging.gn.zing.vn/image/
        if (type == 0) suitArr.push(JSON.stringify(suit));
        resetCanvas();
        var pathChar = "f";
        imgSuit = new Image;
        imgSuit.ctx = ctx[2 + Number(idtoarea.indexOf("suits"))];
        imgSuit.src = domain + "equip/" + pathChar + "/suits/" + suit['suits'] + "/1/show.png";
        imgSuit.onload = function() {
            draw_suits(this.ctx, imgSuit, 120, 162);
        }
    }

    function draw_suits(context, img, width, height) {
        var count = 0,
            eClose = 0;
        suits_run = setInterval(function() {

            count++;
            if (count == 1 || count == 5) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(img, 0, 0, 255, 342, posEquip['suits']['x'], posEquip['suits']['y'], width, height);
            } else if (count == 2 || count == 4) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(img, 750, 0, 255, 342, posEquip['suits']['x'], posEquip['suits']['y'], width, height);
            } else if (count == 3) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(img, 500, 0, 255, 342, posEquip['suits']['x'], posEquip['suits']['y'], width, height);
                eClose++;
            } else if (count == 6) {
                if (eClose == 2) {
                    // ctx[2].clearCanvas(0,0,250,312);
                    setTimeout(function() {
                        count = 0;
                    }, 3000);
                    eClose = 0;
                } else {
                    // ctx[2].clearCanvas(0,0,250,312);
                    setTimeout(function() {
                        count = 0;
                    }, 2000);
                }

            }
        }, 50);
    }

    function load_avatar(sex = 0, type = 0, domain = "http://localhost/studymake/test/") {
        if (type == 0) suitArr.push(JSON.stringify(suit)); // lưu trữ suit sau khi load_avatar
        resetCanvas();
        pathChar = (sex == 0) ? "m" : "f";
        resSuit = {"face": {"original": 0, "overlay": 0, "skin": 0}, "eff": {"original": 0, "overlay": 0}, "hair": {"original": 0, "overlay": 0}, "head": {"original": 0, "overlay": 0}, "cloth": {"original": 0, "overlay": 0, "skin": 0}, "glass": {"original": 0, "overlay": 0}};
        for (var key in suit) {
            if (key == "hair") {
                if (suit[key] == 0) {
                	// set default cho tóc, theo dạng 1 tóc
                    resSuit[key]['original'] = domain + "equip/" + pathChar + "/" + key + "/default/1/B/show.png";
                    resSuit[key]['overlay'] = domain + "equip/" + pathChar + "/" + key + "/default/2/B/show.png";
                } else {
                    // Kiem tra co head (mũ) hay chưa. Nếu có ta xài object 1/2 tóc
                    char = (suit['head'] != 0 && itemHide['head'] == 0) ? 'A' : 'B'; // A là có nón
                    resSuit[key]['original'] = domain + "equip/" + pathChar + "/" + key + "/" + suit[key] + "/1/" + char + "/show.png";
                    resSuit[key]['overlay'] = domain + "equip/" + pathChar + "/" + key + "/" + suit[key] + "/2/" + char + "/show.png";
                }
            } else if (key == "suits" || key == "wing") {
            	// nếu là bộ và cánh thì bỏ, vì đã xử lý ở phần handle trong shop mà mình sẽ nói ở phần tiếp theo
                continue;
            } else if (suit[key] == 0) {
            	// nếu = 0 ta set path default cho object
                resSuit[key]['original'] = domain + "equip/" + pathChar + "/" + key + "/default/1/show.png";
                resSuit[key]['overlay'] = domain + "equip/" + pathChar + "/" + key + "/default/3/show.png";
            } else if (key == "cloth" || key == "face") {
            	// nếu là áo và mặt ta chạy path 1 và 3
                resSuit[key]['original'] = domain + "equip/" + pathChar + "/" + key + "/" + suit[key] + "/1/show.png";
                resSuit[key]['overlay'] = domain + "equip/" + pathChar + "/" + key + "/" + suit[key] + "/3/show.png";
            } else if (suit[key] != 0) {
            	// như bình thường (ko nằm trong mấy trường hợp trên) ta set như sau
                resSuit[key]['original'] = domain + "equip/" + pathChar + "/" + key + "/" + suit[key] + "/1/show.png";
                resSuit[key]['overlay'] = domain + "equip/" + pathChar + "/" + key + "/" + suit[key] + "/2/show.png";
                if (key == "head" && itemHide['head'] == 0){
                    pic = (suit['hair'] == 0) ? "default" : suit['hair'];
                    resSuit['hair']['original'] = domain + "equip/" + pathChar + "/hair/" + pic + "/1/A/show.png";
                    resSuit['hair']['overlay'] = domain + "equip/" + pathChar + "/hair/" + pic + "/2/A/show.png";
                }
            }
        };
        resSuit['face']['skin'] = domain + "equip/" + pathChar + "/face/" + (suit['face'] == 0 ? "default" : suit['face']) + "/2/show.png";
        resSuit['cloth']['skin'] = domain + "equip/" + pathChar + "/cloth/" + (suit['cloth'] == 0 ? "default" : suit['cloth']) + "/2/show.png";
        // Draw tất cả các object. Ở đây mình tạo 1 mảng để chứa từng phương thức Image
        cItem = 1;
        item_equip = {};
        iCount = 0;
        iColor = 0;
        for (var key in resSuit) {
            if (!resSuit[key]) continue;
            item_equip[iCount] = new Image;
            item_equip[iCount].src = resSuit[key]['original'];
            item_equip[iCount].onload = function() {
                if(cItem == 0) {
                    cItem++; 
                    return;
                }
                if (suitColor[cItem] == 0) {
                    ctx[2 + cItem].drawImage(this, 23, 25, 130, 162);
                } else {
                    iColor++;
                    console.log(idtoarea[cItem]);
                    overlay2[iColor] = new Image;
                    overlay2[iColor].src = resSuit[idtoarea[cItem]]['overlay'];
                    overlay2[iColor].ctx = ctx[2 + cItem];
                    overlay2[iColor].item = item_equip[cItem];
                    overlay2[iColor].color = suitColor[cItem];
                    overlay2[iColor].onload = function() {
                        draw(this.ctx, this, this.item, this.color);
                    }
                }
                cItem++;
                // (cItem == 7) && drawAll();
            }
            iCount++;
        };

        // Draw face;
        if(suitColor[0] != 0){
            var img2 = new Image;
            img2.src = resSuit["face"]["overlay"];
            img2.onload = function(){
                drawEMatAnimation(ctx[2], this, item_equip[idObject["6"]], suitColor[0], "face", idObject["6"]);
            }
        }else{
            var img2 = new Image;
            img2.src = resSuit["face"]["original"];
            img2.onload = function() {
                drawface(img2, 130, 162);
            }
        }
        
        if(colorSkin != 0){
            var skin = new Image;
            skin.src = resSuit["cloth"]["skin"];
            skin.item = item_equip[idObject["5"]];
            skin.ctx = ctx[2 + idObject["5"]];
            skin.onload = function(){
                drawSkinColor(this.ctx, this.item, this, colorSkin, "cloth", idObject["5"]);
            }
            skin = new Image;
            skin.src = resSuit["face"]["skin"];
            skin.item = item_equip[idObject["6"]];
            skin.ctx = ctx[2 + idObject["6"]];
            skin.onload = function(){
                drawEMatSkinAnimation(this.ctx, this.item, this, colorSkin, "face", idObject["6"])
            }
        }
    }
    
    function load_wings() {
        // Draw Wings
        clearInterval(wing_run);
        var drawClass = new drawAnimation(suit["wing"], "w");
        var readSprite = drawClass.getSprite();
        readSprite.success(function(xml) {
            $xml = $(xml);
            var sprite = [];
            subTexture = $xml.find("SubTexture").each(function() {
                var element = {}
                element.srcX = $(this).attr('x');
                element.srcY = $(this).attr('y');
                element.width = $(this).attr('width');
                element.height = $(this).attr('height');
                sprite.push(element);
            }); 
            wingsImage = sprite;
            drawClass.start(ctx[1], sprite);
        });
    }

    function drawAnimation(name, type, x = 0, y = 0, srcX = 5, srcY = 5, domain = "http://localhost/studymake/test") {
        var self = this;
        this.image = new Image;
        this.image.src = domain + "/equip/wing/" + name + "/img.png";
        this.x = x;
        this.y = y;
        this.srcX = srcX;
        this.srcY = srcY;
        this.ang = 0;
        this.curFrame = 0;
        this.xmlLink = domain + "/equip/wing/" + name + "/img.xml";
        self.getSprite = getSprite;
        this.nguoc = false;
        this.start = function(context, readSprite) {
            wing_run = setInterval(function() {
                self.draw(context, readSprite);
            }, 40);
        };
        self.draw = (wingType1.indexOf(suit["wing"]) > -1) ? drawWings : drawWings2;
        // self.draw = (type == "p") ? drawPet : ((type == "c") ? drawCircle : ((wingType1.indexOf(suit["wing"]) > -1) ? drawWings : drawWings2));
    }

    function drawWings2(context, readSprite) {
    	// draw cả cánh
        context.clearRect(0, 0, 350, 300);
        this.srcX = readSprite[this.curFrame].srcX;
        this.srcY = readSprite[this.curFrame].srcY;
        this.width = readSprite[this.curFrame].width;
        this.height = readSprite[this.curFrame].height;
        this.curFrame++;
        if (this.curFrame > readSprite.length - 1) this.curFrame = 0; 
        context.translate(0, 0);
        context.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, 280, 190);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    function drawWings(context, readSprite) {
    	// draw 1/2 cánh
        context.clearRect(0, 0, 350, 300);
        this.srcX = readSprite[this.curFrame].srcX;
        this.srcY = readSprite[this.curFrame].srcY;
        this.width = readSprite[this.curFrame].width;
        this.height = readSprite[this.curFrame].height;

        if (!this.nguoc) {
        	// mới call thì chạy phần này trước, đập cánh tới
            this.curFrame++;
            if (this.curFrame > readSprite.length - 1) this.curFrame = readSprite.length - 1, this.nguoc = true;
        } else {
        	// đập cánh lùi
            this.curFrame--;
            if (this.curFrame < 0) this.curFrame = 0, this.nguoc = false;
        }
        context.translate(160, 95); // vị trí 1/2 cánh trước
        context.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, 90, 120);
        context.scale(-1, 1); // flip horizontally
        context.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, 90, 120); // draw phần 1/2 cánh sau
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    $('#tabs-3 .btn-color-make').click(function(){
        colorSkin = '#' + $('.jscolor#skin').val();
        var skin = new Image;
        skin.src = resSuit["cloth"]["skin"];
        skin.item = item_equip[idObject["5"]];
        skin.ctx = ctx[2 + idObject["5"]];
        skin.onload = function(){
            drawSkinColor(this.ctx, this.item, this, colorSkin, "cloth", idObject["5"]);
        }
        skin = new Image;
        skin.src = resSuit["face"]["skin"];
        skin.item = item_equip[idObject["6"]];
        skin.ctx = ctx[2 + idObject["6"]];
        skin.onload = function(){
            drawEMatSkinAnimation(this.ctx, this.item, this, colorSkin, "face", idObject["6"])
        }
    })

    var matSkin = false;
    var screenshotSkin = {};
    screenshotSkin['face'] = {};
    function drawEMatSkinAnimation(context, original, skin, hex = '#e7d013', key = '', idCtx = 0) {
        var countSkin = 0,
            eCloseSkin = 0;
        clearInterval(eff_run);
        clearInterval(test);
        clearInterval(matSkin);
        matSkin = setInterval(function() {
            countSkin++;
            if (countSkin == 1 || countSkin == 5) {
                drawEmatSkinOnces(context, original, skin, hex, 0,0,'0',key, idCtx);
            } else if (countSkin == 2 || countSkin == 4) {
                drawEmatSkinOnces(context, original, skin, hex, 750,0,'1',key, idCtx);
            } else if (countSkin == 3) {
                drawEmatSkinOnces(context, original, skin, hex, 500,0,'2',key, idCtx);
                eCloseSkin++;
            } else if (countSkin == 6) {
                if (eCloseSkin == 2) {
                    setTimeout(function() {
                        countSkin = 0;
                    }, 3000);
                    eCloseSkin = 0;
                } else {
                    setTimeout(function() {
                        countSkin = 0;
                    }, 1000);
                }
            }
        }, 50);
    }

    function drawEmatSkinOnces(context, original, skin, hex = '#e7d013', x, y, count, key='', idCtx = 0) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawEMatCount(context, skin, x, y, 130, 162);
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = hex;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = 'luminosity';
        if(!(count in screenshotSkin[key])){
            imageDoc = new Image;
            imageDoc.src = ctxDoc[2+idCtx].toDataURL();
            imageDoc.onload = function(){
               screenshotSkin[key][count] = this;
            }
        } 
        if(suitColor[idCtx] != 0){
            context.drawImage(screenshot[key][count], 0, 0);
        }else{
            drawEMatCount(context, original, x, y, 130, 162);
        }
    }

    
    function drawSkinColor(context, original, skin, hex = '#e7d013', key='', idCtx = 0) {        
        context.clearRect(0, 0, canvasWidth, canvasHeight);    
        context.drawImage(skin, 23, 25, 130, 162);
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = hex;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = 'luminosity';
        var imageDoc = new Image;
        imageDoc.src = ctxDoc[2+idCtx].toDataURL();
        imageDoc.onload = function(){
            screenshotSkin[key] = this;
        }
        if(suitColor[idCtx] != 0){
            context.drawImage(screenshot[key], 0, 0);
        }else{
            context.drawImage(original, 23,25, 130,162);
        }
        
    }

    var overlay2 = [];
    var iColor = 0;

    function drawAll() {
        iColor = 0;
        for (var i = 1; i < iCount; i++) {
            if (suitColor[i] == 0) {
                ctx[2 + i].drawImage(item_equip[i], 23, 25, 130, 162);
            } else {
                iColor++;
                overlay2[iColor] = new Image;
                overlay2[iColor].src = resSuit[idtoarea[i]]['overlay'];
                overlay2[iColor].ctx = ctx[2 + i];
                overlay2[iColor].item = item_equip[i];
                overlay2[iColor].color = suitColor[i];
                overlay2[iColor].onload = function() {
                    draw(this.ctx, this, this.item, this.color);
                }
            }

        }
    }

    var overlayLoaded = {};
    var screenshot = {};
    screenshot['face'] = {};
    function draw(context, overlay, original, hex = '#e7d013', key = '', idCtx = 0) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(overlay, 23, 25, 130, 162);
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = hex;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = 'luminosity';
        context.drawImage(original, 23, 25, 130, 162);
        if(key != ''){
            var imageDoc = new Image;
            imageDoc.src= ctxDoc[2+idCtx].toDataURL();
            imageDoc.key = key;
            imageDoc.onload = function(){
                screenshot[key] = this;
                if(colorSkin != 0){
                    context.clearRect(0, 0, canvasWidth, canvasHeight);
                    context.globalCompositeOperation = 'source-over';
                    context.drawImage(screenshotSkin[key],0,0);
                    context.globalCompositeOperation = 'luminosity';
                    context.drawImage(this,0,0);
                }
            }
        };
    }
    var debug = 0;
    function drawEMatAnimation(context, overlay, original, hex, key = '', idCtx = 0) {
        var count = 0,
            eClose = 0;
        
        clearInterval(eff_run);
        clearInterval(test);
        clearInterval(matSkin);
        test = setInterval(function() {
            count++;
            if (count == 1 || count == 5) {
                drawEmatOnces(context, overlay, original, hex, 0, 0, '0', key, idCtx);
            } else if (count == 2 || count == 4) {
                drawEmatOnces(context, overlay, original, hex, 750, 0, '1', key, idCtx);
            } else if (count == 3) {
                drawEmatOnces(context, overlay, original, hex, 500, 0, '2', key, idCtx);
                eClose++;
            } else if (count == 6) {
                if (eClose == 2) {
                    setTimeout(function() {
                        count = 0;
                    }, 3000);
                    eClose = 0;
                } else {
                    setTimeout(function() {
                        count = 0;
                    }, 1000);
                }
            }

        }, 50);
    }

    function drawEmatOnces(context, overlay, original, hex = '#e7d013', x, y, count, key='', idCtx = 0){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawEMatCount(context, overlay, x, y, 130, 162);
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = hex;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = 'luminosity';
        drawEMatCount(context, original, x, y, 130, 162);
        var imageDoc = new Image;
        imageDoc.src= ctxDoc[2+idCtx].toDataURL();
        imageDoc.key = key;
        imageDoc.onload = function(){
            if(!(count in screenshot[key])) screenshot[key][count] = this;
            if(colorSkin != 0){
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.globalCompositeOperation = 'source-over';
                context.drawImage(screenshotSkin[key][count],0,0);
                context.globalCompositeOperation = 'luminosity';
                context.drawImage(this,0,0);
            }
        }
    }

    function drawEMatCount(context, img, x, y, width, height) {
        console.log(img);
        context.drawImage(img, x, y, 250, 312, 23, 25, width, height);
    }

    function drawface(img, width, height) {

        var count = 0,
            eClose = 0;

        eff_run = setInterval(function() {

            count++;
            if (count == 1 || count == 5) {
                ctx[2].clearRect(0, 0, canvasWidth, canvasHeight);
            	// mở mắt hoàn toàn
                ctx[2].drawImage(img, 0, 0, 250, 312, posEquip['face']['x'], posEquip['face']['y'], width, height);
            } else if (count == 2 || count == 4) {
                ctx[2].clearRect(0, 0, canvasWidth, canvasHeight);
            	// mở hoặc đóng nửa (1/2) mắt
                ctx[2].drawImage(img, 750, 0, 250, 312, posEquip['face']['x'], posEquip['face']['y'], width, height);
            } else if (count == 3) {
                ctx[2].clearRect(0, 0, canvasWidth, canvasHeight);
            	// nhắm mắt, tăng biến eClose để timeOut bên dưới chuẩn bị cho việc mở mắt
                ctx[2].drawImage(img, 500, 0, 250, 312, posEquip['face']['x'], posEquip['face']['y'], width, height);
                eClose++;
            } else if (count == 6) {
                if (eClose == 2) {
                	// đã mở mắt lại, hoàn tất 1 loop Interval, ta reset ban đầu
                    setTimeout(function() {
                        count = 0;
                    }, 3000);
                    eClose = 0;
                } else {
                	// mới đóng mắt chưa mở mắt
                    setTimeout(function() {
                        count = 0;
                    }, 2000);
                }
            }

        }, 50);
    }

    function drawCircle(context, readSprite) {
        x = readSprite['x'];
        y = readSprite['y'];
        width = readSprite['width'];
        height = readSprite['height'];
        context.save(); //saves the state of canvas
        //clear the canvas
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.translate(x, y); //let's translate
        context.rotate(Math.PI / 180 * (this.ang += 1)); //increment the angle and rotate the image 
        context.drawImage(this.image, -width / 2, -height / 2, width, height); //draw the image ;)
        context.restore(); //restore the state of canvas
    }


    function getSprite() {
        return $.ajax({
            type: "GET",
            url: this.xmlLink,
            dataType: "xml"
        });
    }


    var mojsShow = function(promise) {
        var n = this
        var Timeline = new mojs.Timeline()
        var body = new mojs.Html({
            el: n.barDom,
            x: {
                500: 0,
                delay: 0,
                duration: 500,
                easing: 'elastic.out'
            },
            isForce3d: true,
            onComplete: function() {
                promise(function(resolve) {
                    resolve()
                })
            }
        })

        var parent = new mojs.Shape({
            parent: n.barDom,
            width: 200,
            height: n.barDom.getBoundingClientRect().height,
            radius: 0,
            x: {
                [150]: -150
            },
            duration: 1.2 * 500,
            isShowStart: true
        })

        n.barDom.style['overflow'] = 'visible'
        parent.el.style['overflow'] = 'hidden'

        var burst = new mojs.Burst({
            parent: parent.el,
            count: 10,
            top: n.barDom.getBoundingClientRect().height + 75,
            degree: 90,
            radius: 75,
            angle: {
                [-90]: 40
            },
            children: {
                fill: '#EBD761',
                delay: 'stagger(500, -50)',
                radius: 'rand(8, 25)',
                direction: -1,
                isSwirl: true
            }
        })

        var fadeBurst = new mojs.Burst({
            parent: parent.el,
            count: 2,
            degree: 0,
            angle: 75,
            radius: {
                0: 100
            },
            top: '90%',
            children: {
                fill: '#EBD761',
                pathScale: [.65, 1],
                radius: 'rand(12, 15)',
                direction: [-1, 1],
                delay: .8 * 500,
                isSwirl: true
            }
        })

        Timeline.add(body, burst, fadeBurst, parent)
        Timeline.play()
    }

    var mojsClose = function(promise) {
        var n = this
        new mojs.Html({
            el: n.barDom,
            x: {
                0: 500,
                delay: 10,
                duration: 500,
                easing: 'cubic.out'
            },
            isForce3d: true,
            onComplete: function() {
                promise(function(resolve) {
                    resolve()
                })
            }
        }).play()
    }

});

function load_menu_all() {
    $('.tab-cat').html('<div class="btn active" area="trang-bi">Trang bị</div><div class="btn" area="lam-dep">Làm đẹp</div>');
}

function load_item_search(string, page = 1) {
    searchText = string; // lưu lại giá trị của input
    searchKw = {}, searchKw.text = string, searchKw.gt = gioi_tinh, searchKw.page = page, searchKw.ultimate = $('.ultimate-check input').is(':checked');
    $.post('ajax/load-shop-search.php', {
        search: searchKw
    }, function(data) {
        console.log(data);
        lines = data.split('\n');
        if (lines[0] != '1') {
            $('.item-show .show div').html(lines[0]);
            $('.item-show .sub-tab').html('<p id="result-txt">Từ khóa: ' + searchText + ' - ' + lines[3] + ' kết quả  <span class="btn-close filter-btn">X</span></p>');
            $('.shop-item .tab-cat').html('<div class="btn active" area="search">Search</div>');
            setPagination(Number(lines[2]), 1, Number(lines[1]));
        }
    })
}

function setPagination(current = 1, start = 1, end = 1){
    $('.phantrang .btn.dau').attr('page', 1);
    $('.phantrang .btn.cuoi').attr('page', end);
    if (current != start && current != end) {
        $('.phantrang .btn.trai').attr('page', current - 1).removeClass('disabled');
        $('.phantrang .btn.phai').attr('page', current + 1).removeClass('disabled');
    } else if (current == 1) {
        $('.phantrang .btn.trai').attr('page', current).addClass('disabled');
        $('.phantrang .btn.phai').attr('page', current + 1).removeClass('disabled');
    } else if (current == end) {
        $('.phantrang .btn.trai').attr('page', current - 1).removeClass('disabled');
        $('.phantrang .btn.phai').attr('page', current).addClass('disabled');
    }
    $('.phantrang .state input').val(current + '/' + end);
}