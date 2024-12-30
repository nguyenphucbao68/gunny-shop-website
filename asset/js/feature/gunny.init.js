var gnAvatarColor = function(){
	return {
		__pluginName: "gnAvatarColor",
		options: {
			inputColor: null,
			__reset: {
				clickEvent(event, settings, action){
					var $event = $(event._main),
						frame = $('[gnPlugin="gnAvatarFrame"]').data("gnAvatarFrame");
					$(`[gnPlugin="gnAvatarFrame"].${frame.options.activeClass}.${frame.options.focusClass}`).each(function(){
						let cat = $(this).attr('cat');
						if(cat === "wing" || cat === "suits") return;
						$event.gnAvatar("resetDefaultColor", {cat});
					});
					$event.gnAvatar("load");
				}
			},
			__load: {
				clickEvent(event, settings, action){
					var $event = $(event._main),
						frame = $('[gnPlugin="gnAvatarFrame"]').data("gnAvatarFrame"),
						hex = $(settings.inputColor).val();
					$(`[gnPlugin="gnAvatarFrame"].${frame.options.activeClass}.${frame.options.focusClass}`).each(function(){
						let cat = $(this).attr('cat');
						if(cat === "wing" || cat === "suits") return;
						$event.gnAvatar("setColor", {cat, hex: hex});
					});
					$event.gnAvatar("load");
				}
			}
		},
		compulsory: ["inputColor"],
		init(action, options, element = null){
			return gnLib.init(this, {action, options, element});
		},
		load(){
			var self = this;
			$(self.elem).off("click").on("click", function(){
				self.options.__load.clickEvent({
					_this: this,
					_main: self.elem
				}, self.options, self.method);
			})
			return self.elem;
		},
		reset(){
			var self = this;
			$(self.elem).off("click").on("click", function(){
				self.options.__reset.clickEvent({
					_this: this,
					_main: self.elem
				}, self.options, self.method);
			})
			return self.elem;
		}
	}
}