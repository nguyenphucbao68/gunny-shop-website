(function( $ ){
	$.fn.gnSearchDropDown = function(options) {
		options = options || {};
		var settings = $.extend({}, shop.settingDefault.searchDropDown, shop.options.searchDropDown, options);
		shop.saveOptions("searchDropDown", options);
		shop.saveArea('searchDropDown', this.selector);
		this.each(function(){
			var that = this;
			$(this).parent().append($("<div>", {id: settings.resultId}).hide().text("Loading..."))
			$(this).off("focus").focus(function(){
				settings.focusEvent({_main: that}, settings);
			})
			.off("blur").blur(function () {
				settings.blurEvent({_main: that}, settings);
			})
			.off("keyup").keyup(function(){
				var settings = $.extend({}, shop.settingDefault.searchDropDown, shop.options.searchDropDown, {
					gt: infoCurrent.gt,
					keyword: $(this).val()
				});
				settings.keyUpEvent({_main: that}, settings);
			})
		})
		return settings;
	}
})( jQuery );
function load_item_search(keyword, page = 1){
	shop.keyword = keyword;
	$(shop.areaClass.mainContent).gnLoadMainContent("search", {
        page: page,
        limit: 8,
        gt: infoCurrent.gt
    });
}
