var gnLib = {
	ajaxEvent: function(event, settings, action){
		return $.ajax({
			method: "POST",
			url: settings.ajax,
			data: settings.postData(),
			success: function(data){
				let dataJson = JSON.parse(data);
				return settings.afterAjaxComplete(event, dataJson, settings, action);
			}
		})
	},
	errorHandle: function(response){
		return (response.error) && $(shop.areaClass.mainContent).html(response.error.msg);
	},
	postData: function($this, data){
		var element = {};
		for (var i = 0; i < data.length; i++){
			var pos = data[i].indexOf("~");
			if(pos >= 0){
				var key = data[i].substring(1, data[i].length);
				if(!$this[key])
					element[key] = (typeof gnShop[key] === 'function') ? gnShop.call(key) : gnShop[key];
				else
					element[key] = (typeof $this[key] === 'function') ? $this.call(key) : $this[key];
			} else {
				element[data[i]] = (typeof gnShop[data[i]] === 'function') ? $this.call(data[i]) : $this[data[i]];
			}
		};
		return element;
	}
}