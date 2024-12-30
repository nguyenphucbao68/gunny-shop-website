(function( $ ){
	$.fn.gnLoadMainContent = function(action, options) {
		options = options || {};
		var that = this;
		if(action === "shop"){
			var settings = $.extend({}, shop.settingDefault.mainContent, shop.options.mainContent, options);
			shop.saveOptions("mainContent", options);
			shop.saveArea("mainContent", this.selector);
			shop.keyword = null;
		}
		if(action === "search"){
			var settings = $.extend({}, shop.settingDefault.mainContent, shop.settingDefault.searchMainContent, shop.options.searchMainContent, options);
			shop.saveOptions("searchMainContent", options);
		}
		gnLib.ajaxEvent({_main: this}, settings, action);
		if(action === "search"){
			let btnClose = createSelectorByElement($(settings.close.html));
			$(shop.areaClass.subMenu).off("click").on("click", btnClose, function(){
				settings.closeEvent({
					_this: this,
					_main: that
				}, settings, action);
			})
		}
		$(this).off("click").on('click', '.'+settings.recordClass+' .'+settings.eventClickDemoClass, function(){ 
			settings.clickItemEvent({
				_main: that,
				_this: this
			}, settings, action)
		})
		return settings;
	}


	$.fn.loadPagination = function(options){
		var settings = $.extend({}, shop.settingDefault.loadPagination, shop.options.pagination, options);
		shop.saveOptions("pagination", options);
		shop.saveArea("pagination", this.selector);
		this.each(function(){
			$(this).append($("<div>", {class: settings.btnClass + " " + settings.btnSettingClass.first}));
			$(this).append($("<div>", {class: settings.btnClass + " " + settings.btnSettingClass.left}));
			$(this).append($("<div>", {class: settings.btnSettingClass.showDataInput}).append($("<input>", {type: "text"})));
			$(this).append($("<div>", {class: settings.btnClass + " " + settings.btnSettingClass.right}));
			$(this).append($("<div>", {class: settings.btnClass + " " + settings.btnSettingClass.end}));
			$(this).not('.disabled').find('.'+settings.btnClass).off("click").click(function(){
				// console.log($(shop.areaClass.mainContent).data("gnMainContent"));
				var object = $(shop.areaClass.mainContent).gnMainContent(shop.keyword ? "loadSearch" : "loadShop", {
					page: parseInt($(this).attr('page')),
					catId: settings.catId,
					gt: infoCurrent.gt
				});
				console.log(object);
			})
		})
		return settings;
	}

	$.fn.setPagination = function(className = "phantrang", options, settingClass){
		var settings = $.extend({}, shop.settingDefault.setPagination, options);
		$('.'+className+' '+settingClass.btnFist).attr('page', settings.start)
	    $('.'+className+' '+settingClass.btnEnd).attr('page', settings.end)
	    if (settings.current != settings.start && settings.current != settings.end) {
	        $('.'+className+' '+settingClass.btnLeft).attr('page', settings.current - 1).removeClass('disabled')
	        $('.'+className+' '+settingClass.btnRight).attr('page', settings.current + 1).removeClass('disabled')
	    } else if (settings.current == settings.start) {
	        $('.'+className+' '+settingClass.btnLeft).attr('page', settings.current).addClass('disabled')
	        $('.'+className+' '+settingClass.btnRight).attr('page', settings.current + 1).removeClass('disabled')
	    } else if (settings.current == settings.end) {
	        $('.'+className+' '+settingClass.btnLeft).attr('page', settings.current - 1).removeClass('disabled')
	        $('.'+className+' '+settingClass.btnRight).attr('page', settings.current).addClass('disabled')
	    }
	    $('.'+className+' '+settingClass.showDataInput).val(settings.current + '/' + settings.end);
	    return settings;
	}
	
})( jQuery );