function getAttributes($node) {
    var attrs = {};
    $.each( $node[0].attributes, function(index, attribute){
        attrs[attribute.name] = attribute.value;
    });
    return attrs;
}

function createSelectorByElement($node) {
	$array = getAttributes($node);
	var selector = '';
	for(var key in $array){
		selector += "["+key+"='"+$array[key]+"']";
	}
	return selector;
}
(function( $ ){
	// $.fn.gnFrameObject = function(action, options){
	// 	if(action === "load" || action === ""){
	// 		var settings = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject, options);
	// 		shop.saveOptions("frameObject", options);
	// 		shop.saveArea("frameObject", this.selector);
	// 		$(this).off("click").on("click","."+settings.nameClass+"."+settings.activeClass, function(){
	// 			if($(this).find("."+settings.imgClass).length){
	// 				var area = $(this).attr(settings.catAttr);
	// 				// console.log();
	// 				$(shop.areaClass.frameObject+" ."+settings.nameClass).each(function(){
	// 					$(this).removeClass(settings.focusClass).find(createSelectorByElement($(settings.htmlEffectAfterClick))).remove();
	// 				})
					
	// 				$(this).addClass(settings.focusClass).append(settings.htmlEffectAfterClick);
	// 			}
	// 		})
	// 	}
	// 	if(action === "exist"){
	// 		var settings = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
	// 		return options.pic == $(shop.areaClass.frameObject+" ."+settings.nameClass+"."+settings.activeClass+"["+settings.catAttr+"='"+options.cat+"']").attr('pic');
	// 	}
	// 	if(action === "readAll"){
	// 		var settingFrame = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
 //        	var data = [];
 //        	$(shop.areaClass.frameObject+" ."+settingFrame.nameClass+"."+settingFrame.activeClass).each(function(){
 //        		let info = {
	//             	cat: $(this).attr(settingFrame.catAttr),
	//             	img: $(this).attr('img'),
	//             	pic: $(this).attr('pic')            
	//             };
	//             data.push(info);
 //        	});
 //        	return data;
	// 	}
	// 	if(action === "set"){
	// 		if(typeof options.cat === "undefined" || typeof options.img === "undefined" || typeof options.pic === "undefined") {
	// 			console.log("");
	// 			return;
	// 		}
	// 		if(ctxProperties.frame[options.cat]){
	// 			options.removeFocusClass = options.removeFocusClass || 'enable';
	// 			var settings = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
	// 			if(options.removeFocusClass === 'enable') $(shop.areaClass.frameObject+" ."+settings.nameClass).removeClass(settings.focusClass);
	// 			$(this).find("."+settings.nameClass+"["+settings.catAttr+"='"+options.cat+"']")
	// 			.attr({img: options.img, pic: options.pic})
	// 			.addClass(settings.activeClass+" "+settings.focusClass)
	// 			.html(ctxProperties.frame[options.cat])
	// 			.append($("<div>").css({"background-image": "url("+options.img+")", "background-repeat":  "no-repeat"}).addClass(settings.imgClass))
	// 			.append(settings.htmlEffectAfterClick);
	// 		}
	// 		return settings || {};
	// 	}
	// 	if(action === "remove"){
	// 		if(typeof options === "string") {
	// 			var settings = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
	// 			$(this).find("."+settings.nameClass+"["+settings.catAttr+"='"+options+"']")
	// 			.removeClass(settings.activeClass+" "+settings.focusClass)
	// 			.html(ctxProperties.frame[options])
	// 		}else{
	// 			console.log("Method gnFrameObject in action 'remove' must be string.");
	// 			return;
	// 		}
			
	// 	}
	// 	if(action === "removeAll"){
	// 		if(typeof options === "object") {
	// 			console.log("Method gnFrameObject in action 'removeAll' don't need to pass param");
	// 			return;
	// 		}
	// 		var settings = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
	// 		$(this).find("."+settings.nameClass).each(function(){
	// 			var area = $(this).attr(settings.catAttr);
	// 			$(this).removeClass(settings.activeClass+" "+settings.focusClass)
	// 			.html(ctxProperties.frame[area])
	// 		})
	// 	}
	// 	if(action === "removeAllEffectAfterClick"){
	// 		var settings = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
	// 		$(shop.areaClass.frameObject+" ."+settings.nameClass+"."+settings.activeClass).each(function(){
	// 			var cat = $(this).attr(settings.catAttr);
	// 			var style = $(this).find("."+settings.imgClass).attr('style');
	// 			$(this).html(ctxProperties.frame[cat]).append($("<div>").attr("style", style).addClass(settings.imgClass));
	// 		})
	// 	}
	// 	return settings || settingFrame;
	// }

	$.fn.fnSkinAvatar = function(action, options){

	}

	$.fn.gnColorObject = function(action, options){
		var settingFrame = $.extend({}, shop.settingDefault.frameObject, shop.options.frameObject);
		if(action === "color"){
			var settings = $.extend({}, shop.settingDefault.colorObject, shop.options.colorObject, options);
			shop.saveOptions("colorObject", options);
			shop.saveArea("btnColorObject", this.selector); 
			$(this).off("click").click(function(){
				var hex = '#' + $(settings.inputColor).val();
				$(shop.areaClass.frameObject+" ."+settingFrame.nameClass+"."+settingFrame.focusClass).each(function(){
					var cat = $(this).attr(settingFrame.catAttr);
					if(cat == "wing" || cat == "suits"){
						console.log("");
						return;
					}
					avatarGunny.setColor(cat, hex);
					avatarGunny.loadObject(cat);
				})
			})
		}
		if(action === "reset"){
			shop.saveArea("btnResetColorObject", this.selector);
			$(this).off("click").click(function(){
				$(shop.areaClass.frameObject+" ."+settingFrame.nameClass+"."+settingFrame.activeClass).each(function(){
					var cat = $(this).attr(settingFrame.catAttr);
					if(cat == "wing" || cat == "suits"){
						console.log("");
						return;
					}
					avatarGunny.resetColor(cat);
				})
				avatarGunny.load();
			})
		}
	}

	$.fn.gnHideObject = function(options){
		var settings = $.extend({}, shop.settingDefault.hideObject, shop.options.hideObject, options);
		shop.saveOptions("hideObject", options);
		shop.saveArea("hideObject", this.selector); 
		$(this).find("."+settings.recordClass).off("click").click(function(){
			var area = $(this).attr(settings.catAttr);
			if ($(this).find('input').is(':checked')) 
				ctxProperties.hideCanvas(area);
			else
				ctxProperties.showCanvas(area);
			avatarGunny.load();
		})
	}

	$.fn.gnLoadSelectGt = function(gt, options){
		var settings = $.extend({}, shop.settingDefault.gtSelect, shop.options.selectgt, options);
		shop.saveOptions("selectgt", options);
		if(gt == 'male'){
			$(this).attr(settings.attrGt, settings.maleVal);
			shop.saveArea("chooseMale", this.selector);
		}else if(gt == 'female'){
			$(this).attr(settings.attrGt, settings.femaleVal);
			shop.saveArea("chooseFemale", this.selector);
		}
		$(this).off("click").click(function(){
			$(shop.areaClass.chooseMale+", "+shop.areaClass.chooseFemale).removeClass(settings.activeClass);
			$(this).addClass(settings.activeClass);
			var sGt = $(this).attr(settings.attrGt);
			if(sGt == settings.maleVal){
				infoCurrent.gt = 1
			}else if (sGt == settings.femaleVal){
				infoCurrent.gt = 2
			}
			$(shop.areaClass.mainContent).gnLoadMainContent(shop.keyword ? "search" : "shop", {
				page: 1,
				gt: infoCurrent.gt	
			});		
			$(shop.areaClass.frameObject).gnFrameObject("removeAll");
			avatarGunny.resetAllObject();
			avatarGunny.load();
		});
		return settings;
	};

	$.fn.gnBackObject = function(action, options){
		var settings = $.extend({}, shop.settingDefault.backObject, shop.options.backObject, options);
		shop.saveOptions("backObject", options);
		shop.saveArea("backObject", this.selector);
		$(this).off("click").click(function(){
			if(backObject.suitLoad.length === 0){
				console.log("Method gnBackObject in array 'back' is empty.");
				return;
			}
			var nearLastPos = backObject.suitLoad.length - 2;
			var nearlastObject = backObject.suitLoad[nearLastPos];
			var lastPos = backObject.suitLoad.length - 1;
			$(shop.areaClass.frameObject).gnFrameObject("removeAll");
			if(nearLastPos >= 0){
				for (var i = 0; i < nearlastObject.length; i++) {
					avatarGunny.setObject(nearlastObject[i].cat, nearlastObject[i].pic);
					$(shop.areaClass.frameObject).gnFrameObject("set", nearlastObject[i]);
				}
			}else{
				avatarGunny.resetAllObject();
			}
			backObject.suitLoad.splice(lastPos, 1); // delete LastPos
			avatarGunny.load();
			
		})
		return settings;
	};

	$.fn.gnRandomObject = function(action, options){
		var settings = $.extend({}, shop.settingDefault.randomObject, shop.options.randomObject, options);
		shop.saveOptions("randomObject", options);
		shop.saveArea("randomObject", this.selector);
		$(this).off("click").click(function(){
			$.ajax({
				method: "POST",
				url: settings.ajax,
				data: settings.postData(),
				success: function(data){
					var dataJson = JSON.parse(data);
					if(dataJson.error){
						$(shop.areaClass.mainContent).html(dataJson.error.msg);
					}else{
						fncWrite.enableFeature();
						var suitRanData = [];
						for (var i = 0; i < dataJson.data.length; i++){
							let info = {
								cat: dataJson.data[i].cat,
								img: dataJson.data[i].img,
								pic: dataJson.data[i].pic,
								removeFocusClass: 'disable'
							}
							avatarGunny.setObject(info.cat, info.pic);
							$(shop.areaClass.frameObject).gnFrameObject("set", info);
							suitRanData.push(info);
						}
						// backObject.suitLoad.ranSuit = backObject.suitLoad.ranSuit || []
						backObject.suitLoad.push(suitRanData);
						avatarGunny.load();
					}
				}
			})
		})
		return settings;
	}
}) (jQuery);

var backObject = {
	suitRanAll: [],
	suitLoad: []
}