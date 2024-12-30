(function( $ ){
	$.fn.gnLoadHotItem = function(options){
		var that = this;
		var settings = $.extend({}, shop.settingDefault.hotItem, shop.options.hotItem, options);
		shop.saveOptions("hotItem", options);
		shop.saveArea("hotItem", this.selector);
		gnLib.ajaxEvent({_main: that}, settings)
		if(settings.eventDemo == "enable"){
			$(this).off("click").on('click', '.'+settings.recordClass+' .'+settings.eventClickDemoClass, function(){ 
	            settings.clickItemEvent({
	            	_main: that,
	            	_this: this
	            }, settings)
			})
		}
		return settings;
	}
}) (jQuery);