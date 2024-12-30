// (function($){
// 	// 'use strict';
// 	const actionSplit = optionSplit = dataSplit = ";";
// 	const optionSplitKeyData = "=";
// 	const dataHtmlSplit = ":"
// 	const actionInit = "init";

// 	var gnShop = {
// 		ultimate: true,
// 		menuId: 0,
// 		keyword: null,
// 		_catId: null,
// 		get catId(){
// 			this._catId = this._catId || this.menu.data[this.menuId].data[0].catId;
// 			return this._catId;
// 		},
// 		set catId(val){
// 			this._catId = val;
// 		},
// 		gt: 1,
// 		_pathChar: null,
// 		get pathChar(){
// 			this._pathChar = (this.gt == 1) ? 'm' : 'f';
// 			return this._pathChar;
// 		},
// 		set pathChar(val){
// 			this._pathChar = val;
// 		},
// 		menu: {
// 		    data: [
// 		        {
// 		            name: "Trang bị",
// 		            menuId: 0,
// 		            activeClass: "active",
// 		            data: [
// 		                {name: "Kính", catId: 2, activeClass: "active"},
// 		                {name: "Áo", catId: 5},
// 		                {name: "Nón", catId: 1}
// 		            ]
// 		        },
// 		        {
// 		            name: "Làm đẹp",
// 		            menuId: 1,
// 		            data: [
// 		                {name: "Tóc", catId: 3, activeClass: "active"},
// 		                {name: "Mắt", catId: 6},
// 		                {name: "Mặt", catId: 4},
// 		                {name: "Bộ", catId: 13},
// 		                {name: "Cánh", catId: 15}
// 		            ]
// 		        }
// 		    ]
// 		}	
// 	};

// 	var gnWrite = {
// 		mojsShow: function (promise) {
// 	        var n = this
// 	        var Timeline = new mojs.Timeline()
// 	        var body = new mojs.Html({
// 	            el: n.barDom,
// 	            x: {
// 	                500: 0,

// 	                delay: 0,
// 	                duration: 500,
// 	                easing: 'elastic.out'
// 	            },
// 	            isForce3d: true,
// 	            onComplete: function () {
// 	                promise(function (resolve) {
// 	                    resolve()
// 	                })
// 	            }
// 	        })

// 	        var parent = new mojs.Shape({
// 	            parent: n.barDom,
// 	            width: 200,
// 	            height: n.barDom.getBoundingClientRect().height,
// 	            radius: 0,
// 	            x: {
// 	                150: -150
// 	            },
// 	            duration: 1.2 * 500,
// 	            isShowStart: true
// 	        })

// 	        n.barDom.style['overflow'] = 'visible'
// 	        parent.el.style['overflow'] = 'hidden'

// 	        var burst = new mojs.Burst({
// 	            parent: parent.el,
// 	            count: 10,
// 	            top: n.barDom.getBoundingClientRect().height + 75,
// 	            degree: 90,
// 	            radius: 75,
// 	            angle: {
// 	                [-90]: 40
// 	            },
// 	            children: {
// 	                fill: '#EBD761',
// 	                delay: 'stagger(500, -50)',
// 	                radius: 'rand(8, 25)',
// 	                direction: -1,
// 	                isSwirl: true
// 	            }
// 	        })

// 	        var fadeBurst = new mojs.Burst({
// 	            parent: parent.el,
// 	            count: 2,
// 	            degree: 0,
// 	            angle: 75,
// 	            radius: {
// 	                0: 100
// 	            },
// 	            top: '90%',
// 	            children: {
// 	                fill: '#EBD761',
// 	                pathScale: [0.65, 1],
// 	                radius: 'rand(12, 15)',
// 	                direction: [-1, 1],
// 	                delay: 0.8 * 500,
// 	                isSwirl: true
// 	            }
// 	        })

// 	        Timeline.add(body, burst, fadeBurst, parent)
// 	        Timeline.play()
// 	    },
// 	    mojsClose: function (promise) {
// 	        var n = this
// 	        new mojs.Html({
// 	            el: n.barDom,
// 	            x: {
// 	                0: 500,
// 	                delay: 10,
// 	                duration: 500,
// 	                easing: 'cubic.out'
// 	            },
// 	            isForce3d: true,
// 	            onComplete: function () {
// 	                promise(function (resolve) {
// 	                    resolve()
// 	                })
// 	            }
// 	        }).play()
// 	    }, 
// 	    notifyText(text = '', type = 'info'){
// 	        new Noty({
// 	            text: "<span class='prefix-alert'>" + this.arrPrefix[type] + ' : </span>' + text,
// 	            type: type,
// 	            theme: 'mint',
// 	            layout: 'topRight',
// 	            timeout: 4000,
// 	            animation: {
// 	                open: fncWrite.mojsShow,
// 	                close: fncWrite.mojsClose
// 	            }
// 	        }).show();
// 	    },
// 	    tooltip(){
// 	    	return $('[tooltip]').each(function(){
// 				$(this).attr('style', 'z-index: 999').addClass('tooltip').append('<span class="message">'+$(this).attr("tooltip")+'</span>');
// 			})
// 	    },
// 	    enableFeature(){
// 	        $('.avatar-view .btn-save').removeClass('disabled')
// 	        $('.btn-buy, .action .button').removeClass('disabled')
// 	        $('.action .button .btn, .action .button .btn-ask').addClass('flight')
// 	        $('#tabs').tabs('enable', '#tabs-2').tabs('enable', '#tabs-3')
// 	    },
// 		disableFeature(){
// 			$('.btn-buy, .action .button').addClass('disabled')
// 			$('.action .button .btn, .action .button .btn-ask').removeClass('flight')
// 			$('#tabs').tabs('disable', '#tabs-2').tabs('disable', '#tabs-3')
// 			$('#gio-hang').dialog('close')
// 			$('.avatar-view .btn-save').addClass('disabled')
// 		}
// 	}

// 	const gnLib = {
// 		ajaxEvent(event, settings, methodSettings, action){
// 			return $.ajax({
// 				method: "POST",
// 				url: methodSettings.ajax,
// 				data: this.postData(methodSettings, methodSettings.postDataArr),
// 				success(data){
// 					let dataJson = JSON.parse(data);
// 					if(!("afterAjaxComplete" in settings)) this.error("300", {plugin: settings.__pluginName, method: action})
// 					return settings.afterAjaxComplete(event, dataJson, settings, methodSettings, action);
// 				}
// 			})
// 		},
// 		errorHandle(response){
// 			return (response.error) && $('[gnPlugin="gnMainContent"]').html(response.error.msg);
// 		},
// 		postData($this, data){
// 			return data.reduce((obj, item) => {
// 				if(item.indexOf("~") >= 0){
// 					let key = item.substring(1);
// 					if($this[key]) {
// 						gnShop[key] = $this[key];
// 						return {[key]: $this[key], ...obj}
// 					}
// 					return {[key]: gnShop[key], ...obj}
// 				}
// 				return {[item]: $this[item], ...obj}
// 			}, {});
// 		},
// 		getAttributes($node){
// 		 	var attrs = {};
// 		    $.each($node[0].attributes, function(index, attribute){
// 		        attrs[attribute.name] = attribute.value;
// 		    });
// 		    return attrs;
// 		},
// 		createSelectorByElement($node, removeKey = []){
// 			$array = this.getAttributes($node);
// 			removeKey = removeKey.map(item => item.toLowerCase());
// 			// console.log()
// 			var selector = '';
// 			for(var key in $array){
// 				// console.log(key);
// 				if(removeKey.includes(key.toLowerCase())) continue;
// 				selector += "["+key+"='"+$array[key]+"']";
// 			}
// 			return selector;
// 		},
// 		validate(action, plugin, compul, options){
// 			var optionNotExist = compul.find(item => (item.includes(action) && !eval("options."+item)));
// 			return optionNotExist && gnLib.error("100", {plugin: plugin, var: optionNotExist[0]});
// 		},
// 		error(codeError, object){
// 			const doErrorMsg = {
// 				get compVar(){
// 					return `gnError(${codeError}) : Để khởi tạo plugin '${object.plugin}' bạn phải thêm giá trị cho thuộc tính '${object.var}'.`
// 				},
// 				get notExistMethod(){
// 					return `gnError(${codeError}) : Method '${object.method}' không tồn tại trong plugin '${object.plugin}'.`
// 				},
// 				get afterAjaxComplete(){
// 					return `gnError(${codeError}) : Function callBack ("afterAjaxComplete") ở method '${object.method}' trong plugin '${object.plugin}' phải khác null để call ajax.`
// 				},
// 				get notExistClass(){
// 					return `gnError(${codeError}) : Class cho plugin '${object.plugin}' không tồn tại để khởi tạo.`
// 				}
// 			}, 	doErrorCode = {
// 				"100": "compVar",
// 				"200": "notExistMethod",
// 				"400": "notExistClass"
// 			};
// 			let msgError = doErrorMsg[doErrorCode[codeError]];
// 			$.error(msgError);
// 			return msgError;
// 		},
// 		init(data, dataParams){
// 			if("__"+dataParams.action in data.options){
// 				data.options["__"+dataParams.action] = $.extend(data.options["__"+dataParams.action], dataParams.options);
// 			}else{
// 				data.options = $.extend(data.options, dataParams.options);
// 			}
// 			if(!this.validate(dataParams.action, data.__pluginName, data.compulsory, data.options) && (dataParams.element || data.element)) {
// 				data.method = dataParams.action;
// 				data.elem = dataParams.element || data.elem || false;
// 				if(data.attachEvent) data.attachEvent();
// 				return dataParams.element;
// 			}
// 			return;
// 		},
// 		loadPlugin(action, options, data, plugin, doFnc = {}, elem, params, callback = null, multiElem = false){
// 			if(action && !data[doFnc[action]] && action !== actionInit) this.error("200", {plugin: data.__pluginName, method: action})
// 			if(!action || action === actionInit){
// 				data.init(action, options);
// 				$(elem).data(plugin, data);
// 				return elem;
// 			}else{
// 				if(callback) callback(data, {action, options});
// 				data.init(action, options);
// 				if(multiElem){
// 					data.init(action, options);
// 					return $(elem).each(function(){
// 						data.elem = this;
// 						if(data.attachEvent) data.attachEvent();
// 						return data[doFnc[action]]();
// 					}).data(plugin, data) && elem;
// 				}else{
// 					data.init(action, options, elem);
// 					$(elem).data(plugin, data);
// 					return data[doFnc[action]]();
// 				}
// 			}
// 		},
// 		handlePlugin(plugin, doFnc = {}, elem, params, callback = null, multiElem = false){
// 			let ctor = eval(plugin),
// 				data = $(elem).data(plugin) || (ctor ? new ctor() : this.error("400", {plugin: data.__pluginName}));
// 			if(params[0].includes(actionSplit)){
// 				params[0].split(actionSplit).reduce((posOption, action) => {
// 					let options = params[++posOption] || {};
// 					elem = this.loadPlugin(action, options, data, plugin, doFnc, elem, params, callback, multiElem);
// 					return posOption;
// 				}, 0);
// 				return elem;
// 			}else{
// 				let [action = "", options = {}, ...otherParams] = (typeof params[0] === 'string') ? params : [, params[0]];
// 				return this.loadPlugin(action, options, data, plugin, doFnc, elem, params, callback, multiElem);
// 			}	
// 		},
// 		extractAllText(str){
// 		  	const re = /'(.*?)'/g,
// 		  		  re2 = /"(.*?)"/g,
// 		  		  result = [];
// 		  	let current;
// 		  	while (current = re.exec(str)) {
// 		    	result.push(current.pop());
// 		  	}
// 		  	while (current = re2.exec(str)) {
// 		  		result.push(current.pop());
// 		  	}
// 		  	return result.length > 0 ? result : [str];
// 		},
// 		convertDataToObject(string = "", split = optionSplit, charSplitValData = optionSplitKeyData){
// 			return string.split(split).reduce((object, param) => {
// 				let pos = param.indexOf(charSplitValData),
// 					key = param.substring(0, pos),
// 					val = param.substring(pos+1);
// 				return {[key]: val, ...object};
// 			}, {}) || console.log('error');
// 		},
// 		lexingString(gnData){
// 			var token = "",
// 				lexing = {
// 					block: {
// 						start: 'STARTBLOCK',
// 						state: false,
// 						end: 'ENDBLOCK'					
// 					},
// 					string: {
// 						state: false,
// 						prefix: 'STRING',
// 						data: ''
// 					},
// 					runObj: {
// 						state: false,
// 						prefix: 'RUN',
// 						data: ''
// 					}
// 				};
// 			splitLexing = gnData.split("").reduce((splitLexing, char) => {
// 				token += char;
// 				if(!lexing.block.state){
// 					lexing.block.state = true;
// 					splitLexing = [...splitLexing, lexing.block.start];
// 				}
// 				if(token === "," && !lexing.runObj.state && !lexing.string.state){
// 					if(lexing.block.state){
// 						splitLexing = [...splitLexing, lexing.block.end];
// 						lexing.block.state = false;
// 					}else{
// 						splitLexing = [...splitLexing, lexing.block.start];
// 						lexing.block.state = true;
// 					}
// 					token = "";
// 				}else if(token === "\'" && !lexing.runObj.state){
// 					if(lexing.string.data !== ""){
// 						splitLexing = [...splitLexing, {type: lexing.string.prefix, data: lexing.string.data}];
// 						lexing.string.data = "";
// 						lexing.string.state = false;
// 					}else{
// 						lexing.string.state = true;
// 					}
// 					token = "";
// 				}else if(token === "+" && !lexing.string.state){
// 					if(lexing.runObj.data !== ""){
// 						splitLexing = [...splitLexing, {type: lexing.runObj.prefix, data: lexing.runObj.data}];
// 						lexing.runObj.data = "";
// 						lexing.runObj.state = false;
// 					}else{
// 						lexing.runObj.state = true;
// 					}
// 					token = "";
// 				}else if(token === ";"){
// 					if(lexing.runObj.data !== "") 
// 						splitLexing = [...splitLexing, {type: lexing.runObj.prefix, data: lexing.runObj.data}];
// 					else if(lexing.string.data !== "")
// 						splitLexing = [...splitLexing, {type: lexing.string.prefix, data: lexing.string.data}];
// 					return splitLexing;
// 				}else if(lexing.runObj.state && !lexing.string.state){
// 					lexing.runObj.data += token;
// 					token = "";
// 				}else if(lexing.string.state && !lexing.runObj.state){
// 					lexing.string.data += token;
// 					token = "";
// 				}else{
// 					lexing.runObj.data += token;
// 					token = "";
// 				}
// 				return splitLexing;
// 			}, [])
// 			if(lexing.runObj.data !== "") 
// 				splitLexing = [...splitLexing, {type: lexing.runObj.prefix, data: lexing.runObj.data}];
// 			else if(lexing.string.data !== "")
// 				splitLexing = [...splitLexing, {type: lexing.string.prefix, data: lexing.string.data}];
// 			if(lexing.block.state) splitLexing = [...splitLexing, lexing.block.end];
// 			return splitLexing;
// 		},
// 		handleTreeLexingString(lex, data, init, settings){
// 			return lex.reduce((text, item) => {
// 				if(item === 'STARTBLOCK') return text ? text += ",'" : text = "'";
// 				if(item === 'ENDBLOCK') return text += "'";
// 				if(item.type === 'STRING') return text += item.data;
// 				if(item.type === 'RUN') {
// 					let prefix = "data";
// 					if(item.data.indexOf("~") == 0) item.data = item.data.substring(1), prefix = "settings";
// 					if(item.data.indexOf("#") == 0) item.data = item.data.substring(1), prefix = "init";
// 					return text += $.trim(this.getObject({prefix, data, settings, init, string: item.data}));
// 				}
// 			}, "");
// 		},
// 		readDataHtml($this, $main, data, init, plugin, attrData = "gnData"){
// 			var string = $this.attr(attrData);
// 			if(!string) return $this;

// 			var obj = this.convertDataToObject(string, dataSplit, dataHtmlSplit);
// 			return Object.keys(obj).map(key => {
// 				var gnData = obj[key];
// 				if(key === "initAttr") return $this.attr(data[gnData]);
// 				var lex = this.lexingString(gnData),
// 					val = this.handleTreeLexingString(lex, data, init, plugin.options);
// 				if(!gnData.includes(",") && !gnData.includes("\'")){
// 					var prefix = "data";
// 					if(gnData.indexOf("~") == 0){
// 						gnData = gnData.substring(1);
// 						prefix = "settings";
// 					}			
// 					if(gnData.indexOf("#") == 0){
// 						gnData = gnData.substring(1);
// 						prefix = "init";
// 					}		
// 					var val = this.getObject({prefix, data, settings: plugin.options, init, string: gnData});
// 					if(key === "setEvent"){
// 						var dataEvent = plugin.event[gnData];
// 						$main.off(dataEvent).on(dataEvent, this.createSelectorByElement($this, ["gnData"]), function(){
// 							val({
// 								_this: this,
// 								_main: $main
// 							}, plugin.options, plugin.method); // bị lỗi
// 						});
// 						return true;
// 					}
// 					eval(`$this[key]('${$.trim(val)}')`);
// 					return true;
// 				}
// 				eval(`$this[key](${val})`);
// 				return true;
// 			}) && $this;
// 		},
// 		htmlHandle($this, code, init, plugin, state = true, attrData = "gnData"){
// 			var html = gnShopHtmlStore.store(code),
// 				htmlOther = gnShopHtmlStore.storeOther(code);
// 			if(typeof init.data == "object") init.data = Object.keys(init.data).map((item) => init.data[item]); 
// 			return html.css("display", gnShopHtmlStore.getDisplay(code))
// 			&& ($this.html("") && init.data.map(item => {
// 				var frame = html.clone().appendTo($this.selector).removeAttr("gnpluginhtml");
// 				frame.attr(attrData) && gnLib.readDataHtml(frame, $this, item, init, plugin, attrData).removeAttr(attrData); 
// 				frame.find(`[${attrData}]`).each(function(){
// 					gnLib.readDataHtml($(this), $this, item, init, plugin, attrData).removeAttr(attrData);
// 				}) || frame.closest(`[${attrData}]`).each(function(){
// 					gnLib.readDataHtml($(this), $this, item, init, plugin, attrData).removeAttr(attrData);
// 				});
// 			}), htmlOther && htmlOther.each(function(i){
// 				var frame = $(gnShopHtmlStore.getElemData(code)[i]);
// 				frame.attr(attrData) && gnLib.readDataHtml
// 				frame.find(`[${attrData}]`).each(function(){
// 					gnLib.readDataHtml($(this), $this, null, init, plugin, attrData).removeAttr(attrData);
// 				});
// 				$(this).css("display", gnShopHtmlStore.getDisplay(code)).removeAttr("gnPluginHtml").html(frame.html());
// 			}))
// 			&& $this;
// 		},
// 		lowerCases(object){
// 			var object = Object.assign({}, object);
// 			return Object.keys(object).reduce((c, k) => (
// 				object[k] = (typeof object[k] === "object") ? this.lowerCases(object[k]) : object[k], 
// 				c[k.toLowerCase()] = object[k], 
// 				c), 
// 			{});
// 		},
// 		getObject(data){
// 			// if(data.prefix === "settings") console.log(data);
// 			var {prefix = "", data = null, settings = null, init = null, string = ""} = data,
// 				object = this.lowerCases(eval(prefix)),
// 				run = eval("object."+string.toLowerCase());
// 			return run || (run == '0' ? '0' : '');
// 		}
// 	}

// 	var gnShopHtmlStore = {
// 		'gnMainContent': {
// 			data: null,
// 			display: "inline-block",
// 			elem: null
// 		},
// 		'gnMenu': {
// 			data: null,
// 			display: "inline-block",
// 			elem: null
// 		},
// 		'gnSubMenu': {
// 			data: null,
// 			display: "inline-block",
// 			elem: null
// 		},
// 		'gnHotItem': {
// 			data: null,
// 			display: "block",
// 			elem: null
// 		},
// 		'gnSearchDW': {
// 			data: null,
// 			display: "block",
// 			elem: null,
// 			elemData: null
// 		},
// 		'gnItemListCart': {
// 			data: null,
// 			display: "block",
// 			elem: null
// 		},
// 		getDisplay(key){
// 			return this[key].display;
// 		},
// 		getElemData(key){
// 			return this[key].elemData;
// 		},
// 		set(key, type, value){
// 			this[key][type] = value;

// 		},
// 		store(key){
// 			this[key].data = this[key].data || $(`[gnPluginHtml="${key}"]`);
// 			return this[key].data;
// 		},
// 		storeOther(key, elem){
// 			var that = this,
// 				data = [];
// 			this[key].elem = this[key].elem || $(`[gnPluginHtml="#${key}"]`);
// 			this[key].elemData = this[key].elemData || ($(`[gnPluginHtml="#${key}"]`).each(function(){
// 				data = [...data, $(this).prop("outerHTML")];
// 			}), data);
// 			return this[key].elem;
// 		}
// 	}

// 	var gnConfig = {
// 		resourceIcon: "http://localhost/studymake/logo/gunny",
// 		host: "http://localhost/studymake/test",
// 		hostOnline: ""
// 	}
// 	// console.log(gnConfig.resourceIcon);
// 	//////////////////////
// 	// jQuery.gnShopVal //
// 	//////////////////////
// 	/**
// 	 * Khởi tạo plugin gnShopVal
// 	 */
// 	var gnShopVal = function(){
// 		return {
// 			init(data, value = null){
// 				this.data = data;
// 				this.value = value;
// 			},
// 			get(){
// 				return eval(this.data);
// 			},
// 			set(){
// 				eval(this.data + " = " + this.value);
// 			}
// 		}
// 	}

// 	$.gnShopVal = function(action, data, value = null){
// 		var shopVal = new gnShopVal();
// 		shopVal.init(data, value);
// 		var doFnc = {
// 			"get": "get",
// 			"set": "set"
// 		}
// 		if(!action){
// 			return shopVal;
// 		}else if (shopVal[doFnc[action]]){
// 			return shopVal[doFnc[action]]();
// 		}else{
// 			$.error( 'Method ' +  action + ' does not exist on jQuery.gnShopVal' );
// 		}
		
// 	};

// 	///////////////////////////////////////////////////////////////////
// 	// ******************** AVATAR GUNNY HANDLE ******************** //
// 	///////////////////////////////////////////////////////////////////
// 	var gnAvatarHandle = {
// 	    res: {},
// 	    x: 23,
// 	    y: 25,
// 	    widthObject: 130,
// 	    heightObject: 162,
// 	    imageloaded: {equip: {}, overlay: {}, screenshot: {}, screenshotSkin: {}, skin: {}, equipStatic: {}},
// 	    interval: {},
// 	    setPath(){
// 	    	var {pathChar} = gnShop,
// 	    		{host} = gnConfig;
// 	    	this.res = Object.keys(gnAvatarInfo.suit).reduce((obj, key) => {
	    		
// 	    		let suitKey = gnAvatarInfo.suit[key] || 0;
// 	    		// console.log(suitKey);
// 	    		if(key === 'hair'){
// 	    			if(!suitKey) return {...obj, [key]: {
// 	    				original: `${host}/equip/${pathChar}/${key}/default/1/B/show.png`,
// 	    				overlay: `${host}/equip/${pathChar}/${key}/default/2/B/show.png`
// 	    			}};
// 	    			let char = (gnAvatarInfo.suit.head && !gnAvatarInfo.hide.head) ? 'A' : 'B';
// 	    			return {...obj, [key]: {
// 	    				original: `${host}/equip/${pathChar}/${key}/${suitKey}/1/${char}/show.png`,
// 	    				overlay: `${host}/equip/${pathChar}/${key}/${suitKey}/2/${char}/show.png`
// 	    			}};
// 	    		} else if (key === 'suits' || key === 'wing') {
// 	    			return obj;
// 	    		} else if(!suitKey){

// 	    			return {...obj, [key]: {
// 	    				original: `${host}/equip/${pathChar}/${key}/default/1/show.png`,
// 	    				overlay: `${host}/equip/${pathChar}/${key}/default/3/show.png`
// 	    			}};
// 	    		} else if (key === 'cloth' || key === 'face'){
// 	    			return {...obj, [key]: {
// 	    				original: `${host}/equip/${pathChar}/${key}/${suitKey}/1/show.png`,
// 	    				overlay: `${host}/equip/${pathChar}/${key}/${suitKey}/3/show.png`
// 	    			}};
// 	    		} else if (suitKey){
// 	    			console.log(key);
// 	    			obj = {...obj, [key]: {
// 	    				original: `${host}/equip/${pathChar}/${key}/${suitKey}/1/show.png`,
// 	    				overlay: `${host}/equip/${pathChar}/${key}/${suitKey}/2/show.png`
// 	    			}};
// 	    			if(key === 'head' && !gnAvatarInfo.hide.head){
// 	    				let pic = gnAvatarInfo.suit.hair || 'default';
// 	    				return {...obj, hair: {
// 	    					original: `${host}/equip/${pathChar}/hair/${pic}/1/A/show.png`,
// 	    					overlay: `${host}/equip/${pathChar}/hair/${pic}/2/A/show.png`
// 	    				}};
// 	    			}
// 	    			return obj;
// 	    		}
// 	    	}, this.res);
// 	        // for (let key in gnAvatarInfo.suit) {
// 	        //     this.res[key] = this.res[key] || {};
// 	        //     let suitKey = gnAvatarInfo.suit[key] || 0;
// 	        //     if (key === 'hair') {
// 	        //         if (suitKey == 0) {
// 	        //             // set default cho tóc, theo dạng 1 tóc
// 	        //             this.res[key].original = infoConfig.host + 'equip/' + pathChar + '/' + key + '/default/1/B/show.png'
// 	        //             this.res[key].overlay = infoConfig.host + 'equip/' + pathChar + '/' + key + '/default/2/B/show.png'
// 	        //         } else {
// 	        //             // Kiem tra co head (mũ) hay chưa. Nếu có ta xài object 1/2 tóc
// 	        //             var char = (gnAvatarInfo.suit.head != 0 && gnAvatarInfo.hide.head == 0) ? 'A' : 'B' // A là có nón
// 	        //             this.res[key].original = infoConfig.host + 'equip/' + pathChar + '/' + key + '/' + suitKey + '/1/' + char + '/show.png'
// 	        //             this.res[key].overlay = infoConfig.host + 'equip/' + pathChar + '/' + key + '/' + suitKey + '/2/' + char + '/show.png'
// 	        //         }
// 	        //     } else if (key === 'suits' || key === 'wing') {
// 	        //         delete this.res[key];
// 	        //         continue;
// 	        //         // nếu là bộ và cánh thì bỏ, vì đã xử lý ở phần handle trong shop mà mình sẽ nói ở phần tiếp theo
// 	        //     } else if (suitKey == 0) {
// 	        //         // nếu = 0 ta set path default cho object
// 	        //         this.res[key].original = infoConfig.host + 'equip/' + pathChar + '/' + key + '/default/1/show.png'
// 	        //         this.res[key].overlay = infoConfig.host + 'equip/' + pathChar + '/' + key + '/default/3/show.png'
// 	        //     } else if (key == 'cloth' || key == 'face') {
// 	        //         // nếu là áo và mặt ta chạy path 1 và 3
// 	        //         this.res[key].original = infoConfig.host + 'equip/' + pathChar + '/' + key + '/' + suitKey + '/1/show.png'
// 	        //         this.res[key].overlay = infoConfig.host + 'equip/' + pathChar + '/' + key + '/' + suitKey + '/3/show.png'
// 	        //     } else if (suitKey != 0) {
// 	        //         // như bình thường (ko nằm trong mấy trường hợp trên) ta set như sau
// 	        //         this.res[key].original = infoConfig.host + 'equip/' + pathChar + '/' + key + '/' + suitKey + '/1/show.png'
// 	        //         this.res[key].overlay = infoConfig.host + 'equip/' + pathChar + '/' + key + '/' + suitKey + '/2/show.png'
// 	        //         if (key === 'head' && gnAvatarInfo.hide.head == 0) {
// 	        //             var pic = (gnAvatarInfo.suit.hair == 0) ? 'default' : gnAvatarInfo.suit.hair
// 	        //             this.res.hair.original = infoConfig.host + 'equip/' + pathChar + '/hair/' + pic + '/1/A/show.png'
// 	        //             this.res.hair.overlay = infoConfig.host + 'equip/' + pathChar + '/hair/' + pic + '/2/A/show.png'
// 	        //         }
// 	        //     }
// 	        // };
// 	        this.res.face = this.res.face || {};
// 	        this.res.face.skin = infoConfig.host + 'equip/' + pathChar + '/face/' + (gnAvatarInfo.suit.face == 0 ? 'default' : gnAvatarInfo.suit.face) + '/2/show.png';
// 	        this.res.cloth = this.res.cloth || {};
// 	        this.res.cloth.skin = infoConfig.host + 'equip/' + pathChar + '/cloth/' + (gnAvatarInfo.suit.cloth == 0 ? 'default' : gnAvatarInfo.suit.cloth) + '/2/show.png';
// 	  		return this;
// 	    },
// 	    load(){
// 	        this.setPath();
// 	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("clearAll");
// 	        if(!gnAvatarInfo.hide.suits && this.loadSuits()) return this.loadWings();
// 	        var that = this;
// 	        Object.keys(this.res).map(key => {
// 	        	this.imageloaded.equip[key] = Object.assign(new Image, {
// 	        		src: this.res[key].original,
// 	        		onload(){
// 	        			if(key === "face") return;
// 		            	var info = {
// 		            		key,
// 		            		dWidth: that.widthObject,
// 		            		dHeight: that.heightObject,
// 		            		dx: that.x,
// 		            		dy: that.y
// 		            	}
// 		            	if(!gnAvatarInfo.color[key] || !gnAvatarInfo.suit[key]){
// 		                    gnAvatarDraw.drawStaticObject({
// 		                        original: this,
// 		                        ...info
// 		                    });
// 		                }else if (key in gnAvatarInfo.color && gnAvatarInfo.color[key]){
// 		                	that.imageloaded.overlay[key] = Object.assign(new Image, {
// 		                		src: that.res[key].overlay,
// 		                		original: this,
// 		                		onload(){
// 		                			gnAvatarDraw.drawStaticObjectColor({
// 		                				overlay: this,
// 		                				original: this.original,
// 		                				...info
// 		                			})
// 		                		}
// 		                	})
// 		                }
// 	        		}
// 	        	})
// 	        })
// 	        this.loadFaceAnimation().loadSkin().loadWings();
// 	        return this;
// 	    },
// 	    loadAllObject(){
// 	    	if(!this.res) this.setPath();
// 	    	var that = this;
// 	    	Object.keys(this.res).map((key, index) => {
// 	        	this.imageloaded.equipStatic[key] = Object.assign(new Image, {
// 	        		src: this.res[key].original,
// 	        		onload(){
// 	        			if(key === "face"){
// 	        				gnAvatarInfo.ctxStatic.drawImage(this, 250, 0, 250, 312, 50, 0, 130, 162);
// 	        			}else if(!gnAvatarInfo.hide[key]) {
// 	        				gnAvatarInfo.ctxStatic.drawImage(this, 50, 0, 130, 162);
// 	        			}
// 	        			if(index == Object.keys(that.res).length - 1){
// 	        				const fncRun = gnAvatarDraw.drawStaticAllObject;
// 	        				if(gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing) fncRun.wings();
// 	        				fncRun.circle().level().vip().badge().love().masPractitioners();
// 	        			}
	        			
// 	        		}
// 	        	})
// 	        })
// 	        return this;
// 	    },
// 	    loadFaceAnimation(key = 'face'){
// 	        var that = this,
// 	        	info = {
// 	        		key,
//                     dWidth: that.widthObject,
//                     dHeight: that.heightObject,
//                     dx: that.x,
//                     dy: that.y
// 	        	};
// 	        if (!gnAvatarInfo.color[key]) {
// 	        	this.imageloaded.equip[key] = Object.assign(new Image, {
// 	        		src: this.res[key].original,
// 	        		onload(){
// 	        			gnAvatarDrawAnimation.drawFace("faceOrignal", {
// 		                    original: this,
// 		                    ...info
// 		                });
// 	        		}
// 	        	})
// 	        	return this;
// 	        }
// 	        this.imageloaded.equip[key] = Object.assign(new Image, {
// 	        	src: this.res[key].overlay,
// 	        	original: this.imageloaded.equip[key],
//         		onload(){
//         			gnAvatarDrawAnimation.drawFace("faceColor", {
//         				overlay: this,
// 	                    original: this.original,
// 	                    ...info
// 	                });
//         		}
//         	})
// 	        return this;
// 	    },
// 	    loadSkin(){
// 	        if (gnAvatarInfo.skinColor) {
// 	        	var that = this;
// 	            this.imageloaded.skin.cloth = new Image;
// 	            this.imageloaded.skin.cloth.src = this.res.cloth.skin;
// 	            this.imageloaded.skin.cloth.original = this.imageloaded.equip.cloth;
// 	            this.imageloaded.skin.cloth.onload = function () {
// 	                gnAvatarDraw.drawStaticObjectSkin({
// 	                    key: "cloth",
// 	                    skin: this,
// 	                    original: this.original,
// 	                    dx: that.x,
// 	                    dy: that.y,
// 	                    dWidth: that.widthObject,
// 	                    dHeight: that.heightObject
// 	                })
// 	            };
// 	            this.imageloaded.skin.face = new Image;
// 	            this.imageloaded.skin.face.src = this.res.face.skin;
// 	            this.imageloaded.skin.face.original = this.imageloaded.equip.face;
// 	            this.imageloaded.skin.face.onload = function () {
// 	                gnAvatarDrawAnimation.drawFace("faceSkinColor", {
// 	                    key: "face",
// 	                    skin: this,
// 	                    original: this.original,
// 	                    dx: that.x,
// 	                    dy: that.y,
// 	                    dWidth: that.widthObject,
// 	                    dHeight: that.heightObject
// 	                });
// 	            }
// 	        }
// 	        return this;
// 	    },
// 	    loadWings(){

// 	    	if(gnAvatarInfo.suit.wing){
// 	    		wingsSetting = new gnAvatarWingAnimation();
// 	    		wingsSetting.load();
// 	    	}	
// 	    	return this;
// 	    },
// 	    loadSuits(){
// 	    	if(gnAvatarInfo.suit.suits){
// 	    		var that = this;
// 	    		this.imageloaded.equip.suits = new Image;
// 	            this.imageloaded.equip.suits.src = `${gnConfig.host}/equip/${gnShop.pathChar}/suits/${gnAvatarInfo.suit.suits}/1/show.png`;
// 	            this.imageloaded.equip.suits.onload = function () { 
// 	                gnAvatarDrawAnimation.drawFace("suits", {
// 	                    key: "suits",
// 	                    original: this,
// 	                    dWidth: that.widthObject,
// 	                    dHeight: that.heightObject,
// 	                    dx: that.x,
// 	                    dy: that.y
// 	                });
// 	            };
// 	            return this;
// 	    	}	
// 	    	return;
// 	    }
// 	}
// 	var wingsSetting;

// 	var gnAvatarInfoDefault = {
// 		get color(){ return {face: 0, hair: 0, head: 0, cloth: 0, glass: 0, eff: 0}},
// 		get suit(){ return {face: 0, hair: 0, head: 0, cloth: 0, glass: 0, eff: 0, wing: 0, suits: 0}},
// 		get frame(){ return {head: "Nón", glass: "Kính", face: "Mắt", eff: "Mặt", cloth: "Áo", suits: "Bộ", wing: "Cánh", hair: "Tóc"}},
// 		get hide(){ return {head: 0, glass: 0, suits: 0, wing: 0}},
// 	}

// 	var gnAvatarInfo = {
// 		ctx: {},
// 		doc: {},
// 		canvasWidth: {},
// 		canvasHeight: {},
// 		backAvatar: [],
// 		suit: gnAvatarInfoDefault.suit,
// 		frame: gnAvatarInfoDefault.frame,
// 		hide: gnAvatarInfoDefault.hide,
// 		color: gnAvatarInfoDefault.color,
// 		skinColor: "#7500AB",
// 		ctxStatic: null,
// 		ctxStaticDoc: null,
// 		staticObject: {
// 			circle: 5,
// 			level: 70,
// 			vip: 12,
// 			badge: 10,
//  			masPractitioners: "master",
//  			love: "love",
//  			weapon: null
// 		}
// 	}
// 	gnAvatarInfo.ctxStaticDoc = document.getElementById('image-object-all'); 
// 	gnAvatarInfo.ctxStatic = gnAvatarInfo.ctxStaticDoc.getContext('2d');
	
// 	var gnAvatarDraw = {
// 	    drawStaticObjectSkin(data){
// 	    	$(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
// 	        gnAvatarInfo.ctx[data.key].drawImage(data.skin, data.dx, data.dy, data.dWidth, data.dHeight);
// 	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
// 	        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.skinColor;
// 	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("fill", {cat: data.key});
// 	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
// 	        var imageDoc = new Image;
// 	        imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
// 	        imageDoc.onload = function () {
// 	            gnAvatarHandle.imageloaded.screenshotSkin[data.key] = this;
// 	        }
// 	        if (gnAvatarInfo.color[data.key] && gnAvatarInfo.suit[data.key] && gnAvatarHandle.imageloaded.screenshot[data.key])
// 	            gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshot[data.key], 0, 0);
// 	        else
// 	            gnAvatarInfo.ctx[data.key].drawImage(data.original, data.dx, data.dy, data.dWidth, data.dHeight);
// 	    },
// 	    drawStaticObjectColor(data){
// 	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
// 	        gnAvatarInfo.ctx[data.key].drawImage(data.overlay, data.dx, data.dy, data.dWidth, data.dHeight);
// 	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
// 	        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.color[data.key];
// 	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("fill", {cat: data.key});
// 	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
// 	        gnAvatarInfo.ctx[data.key].drawImage(data.original, data.dx, data.dy, data.dWidth, data.dHeight);
// 	   		if(data.key === "cloth"){
// 	   			var imageDoc = new Image;
// 	            imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
// 	            imageDoc.onload = function () {
// 	                gnAvatarHandle.imageloaded.screenshot[data.key] = this;
// 	                if (gnAvatarInfo.skinColor) {
// 	                    $(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
// 	                    gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-over';
// 	                    gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshotSkin[data.key], 0, 0);
// 	                    gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
// 	                    gnAvatarInfo.ctx[data.key].drawImage(this, 0, 0);
// 	                }
// 	            }
// 	   		}
// 	    },
// 	    drawStaticObject(data){
// 	        gnAvatarInfo.ctx[data.key].drawImage(data.original, data.dx, data.dy, data.dWidth, data.dHeight);
// 	    },
// 	    drawStaticAllObject: {
// 	    	widthDoubleWings: 90,
// 	    	heightDoubleWings: 120,
// 	    	widthSingleWings: 170,
// 	    	heightSingleWings: 140,
// 	    	masPractitioners(){
// 	    		var image = Object.assign(new Image, {
// 	    			src: `${gnConfig.host}/equip/icon/${gnAvatarInfo.staticObject.masPractitioners}.png`,
// 	    			onload(){
// 		                gnAvatarInfo.ctxStatic.drawImage(this, 4, 105);
// 	    			}
// 	    		});
// 	    		return this;
// 	    	},
// 	    	love(){
// 	    		var image = Object.assign(new Image, {
// 	    			src: `${gnConfig.host}/equip/icon/${gnAvatarInfo.staticObject.love}.png`,
// 	    			onload(){
// 		                gnAvatarInfo.ctxStatic.drawImage(this, 8, 130);
// 	    			}
// 	    		});
// 	    		return this;
// 	    	},
// 	    	badge(){
// 				var image = Object.assign(new Image, {
// 	    			src: `${gnConfig.host}/equip/badge/${gnAvatarInfo.staticObject.badge}/icon.png`,
// 	    			onload(){
// 		                gnAvatarInfo.ctxStatic.drawImage(this, 7, 70, 27, 27);
// 	    			}
// 	    		});
// 	    		return this;
// 	    	},
// 	    	vip(){
// 	    		var image = Object.assign(new Image, {
// 	    			src: `${gnConfig.host}/equip/vip/${gnAvatarInfo.staticObject.vip}.png`,
// 	    			onload(){
// 		                gnAvatarInfo.ctxStatic.drawImage(this, 7, 38, 25, 25);
// 	    			}
// 	    		});
// 	    		return this;
// 	    	},
// 	    	level(){
// 	    		var image = Object.assign(new Image, {
// 	    			src: `${gnConfig.host}/equip/level/${gnAvatarInfo.staticObject.level}.png`,
// 	    			onload(){
// 		                gnAvatarInfo.ctxStatic.drawImage(this,  1, 0, 34, 33);
// 	    			}
// 	    		});
// 	    		return this;
// 	    	},
// 	    	circle(){
// 	    		var image = Object.assign(new Image, {
// 	    			src: `${gnConfig.host}/equip/circlelight/${gnAvatarInfo.staticObject.circle}.png`,
// 	    			onload(){
// 	    				gnAvatarInfo.ctxStatic.globalCompositeOperation = 'destination-over';
// 		                gnAvatarInfo.ctxStatic.drawImage(this, 29, 7, 150, 150);
// 		                gnAvatarInfo.ctxStatic.globalCompositeOperation = 'source-over';
// 	    			}
// 	    		});
// 	    		return this;
// 	    	},
// 	    	wings(){
// 	    		// const wingsSetting = new gnAvatarWingAnimation(); 
// 	    		const count = Math.ceil(wingsSetting.readSprite.length / 2);
// 	    		var that = this,
// 	    			image = Object.assign(new Image, {
// 		    			src: `${gnConfig.host}/equip/wing/${gnAvatarInfo.suit.wing}/img.png`,
// 		    			onload(){
// 		    				gnAvatarInfo.ctxStatic.globalCompositeOperation = 'destination-over';
// 					        let {srcX, srcY, width, height} = wingsSetting.readSprite[count];
// 					       	if(wingsSetting.wingDouble.indexOf(gnAvatarInfo.suit.wing) >= 0){
// 						        gnAvatarInfo.ctxStatic.translate(100, 40) // vị trí 1/2 cánh trước
// 						        gnAvatarInfo.ctxStatic.drawImage(this, srcX, srcY, width, height, this.x, this.y, that.widthDoubleWings, that.heightDoubleWings)
// 						        gnAvatarInfo.ctxStatic.scale(-1, 1) // flip horizontally
// 						        gnAvatarInfo.ctxStatic.drawImage(this, srcX, srcY, width, height, this.x, this.y, that.widthDoubleWings, that.heightDoubleWings)
// 						        gnAvatarInfo.ctxStatic.setTransform(1, 0, 0, 1, 0, 0);
// 					       	}else{
// 					       		gnAvatarInfo.ctxStatic.translate(0, 0) // vị trí 1/2 cánh trước
// 						        gnAvatarInfo.ctxStatic.drawImage(this, srcX, srcY, width, height, this.x, this.y, that.widthSingleWings, that.heightSingleWings)
// 					       		gnAvatarInfo.ctxStatic.setTransform(1, 0, 0, 1, 0, 0);
// 					       	}
// 					        gnAvatarInfo.ctxStatic.globalCompositeOperation = 'source-over';
// 		    			}
// 		    		});
// 	    	}
// 	    }
// 	}
	
// 	var gnAvatarWingAnimation = function(){
// 		return {
// 			x: 0,
// 			y: 0,
// 			curFrame: 0,
// 			reverse: false,
// 			key: "wing",
// 			typeName: "wing",
// 			wingDouble: ['wing002', 'wing003', 'wing004', 'wing005', 'wing006', 'wing007', 'wing008', 'wing009', 'wing018', 'wing019', 'wing020', 'wing021', 'wing022', 'wing023', 'wing024', 'wing025', 'wing026', 'wing027', 'wing028', 'wing029', 'wing030', 'wing31', 'wing32', 'wing33', 'wing34', 'wing61', 'wing63', 'wing64', 'wing65', 'wing66', 'wing70', 'wing75', 'wing76', 'wing79', 'wing81', 'wing86', 'wing87', 'wing93', 'wing94', 'wing100'],
// 			readSprite: [],
// 			get wing(){
// 				return gnAvatarInfo.suit[this.key];
// 			},
// 			get xmlLink(){
// 				return `${gnConfig.host}/equip/${this.key}/${this.wing}/img.xml`;
// 			},
// 			image: null,
// 			_image(){
// 				this.image = new Image;
// 				this.image.src = `${gnConfig.host}/equip/${this.key}/${this.wing}/img.png`;
// 				return this;
// 			},
// 			load: function(){
// 				var that = this;
// 				$.ajax({
// 		            type: 'GET',
// 		            url: this.xmlLink,
// 		            dataType: 'xml',
// 		            success(xml){
// 		            	that.readSprite = $(xml).find('SubTexture').map((key, item) => ({
// 							get srcX(){ return $(item).attr('x') },
// 							get srcY(){ return $(item).attr('y') },
// 							get width(){ return $(item).attr('width') },
// 							get height(){ return $(item).attr('height') }
// 						}))
// 						that._image().start();
// 		            }
// 		        });
// 				return this;
// 			},
// 			start(){
// 				clearInterval(gnAvatarHandle.interval[this.typeName]);
// 				gnAvatarHandle.interval[this.typeName] = setInterval(() => this.draw(), 40)
// 			},
// 			get draw(){
// 				return (this.wingDouble.indexOf(this.wing) > -1) ? this.drawWingDouble : this.drawWingSingle;
// 			},
// 			drawWingDouble(){
// 				$('[gnPlugin="gnAvatar"]').gnAvatar("clear", {cat: this.key});
// 		        let {srcX, srcY, width, height} = this.readSprite[this.curFrame];
// 		        if (!this.reverse){
// 		        	// this.curFrame++;
// 		            if (++this.curFrame > this.readSprite.length - 1) this.curFrame = this.readSprite.length - 1, this.reverse = true
// 		        }else{
// 		        	// this.curFrame--;
// 		            if (--this.curFrame < 0) this.curFrame = 0, this.reverse = false;
// 		        }
// 		        gnAvatarInfo.ctx[this.key].clearRect(0,0,1000,1000);
// 		        gnAvatarInfo.ctx[this.key].translate(160, 95) // vị trí 1/2 cánh trước
// 		        gnAvatarInfo.ctx[this.key].drawImage(this.image, srcX, srcY, width, height, this.x, this.y, 90, 120)
// 		        gnAvatarInfo.ctx[this.key].scale(-1, 1) // flip horizontally
// 		        gnAvatarInfo.ctx[this.key].drawImage(this.image, srcX, srcY, width, height, this.x, this.y, 90, 120)
// 		        gnAvatarInfo.ctx[this.key].setTransform(1, 0, 0, 1, 0, 0);
// 			},
// 			drawWingSingle(){
//         		$('[gnPlugin="gnAvatar"]').gnAvatar("clear", {cat: this.key});
// 		        let {srcX, srcY, width, height} = this.readSprite[this.curFrame];
// 		        // this.curFrame++;
// 		        if (++this.curFrame > this.readSprite.length - 1) this.curFrame = 0;
// 		        gnAvatarInfo.ctx[this.key].translate(0, 0);
// 		        gnAvatarInfo.ctx[this.key].drawImage(this.image, srcX, srcY, width, height, this.x, this.y, 280, 190);
// 		        gnAvatarInfo.ctx[this.key].setTransform(1, 0, 0, 1, 0, 0);
// 			}
// 		}
// 	}

// 	var gnAvatarDrawAnimation = {
// 	    cEAction: 0,
// 	    cEClose: 0,
// 	    timeDelay: 4000,
// 	    timeCloseDelay: 2000,
// 	    timeIntervalDelay: 50,
// 	    widthOnceFrame: 250,
// 	    heightOnceFrame: 312,
// 	    widthOnceFrameSuit: 255, 
// 	    heightOnceFrameSuit: 342,
// 	    stopInterval: false,
// 	    drawType: {
// 	    	suits(data, srcX, srcY, widthOnceFrame, heightOnceFrame){
// 	    		$(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
// 	    		gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, gnAvatarDrawAnimation.widthOnceFrameSuit, gnAvatarDrawAnimation.heightOnceFrameSuit, data.dx, data.dy, data.dWidth, data.dHeight)
// 	    	},
// 	        faceOrignal(data, srcX, srcY, widthOnceFrame, heightOnceFrame){
// 	        	$(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
// 	            gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, data.dx, data.dy, data.dWidth, data.dHeight)
// 	        },
// 	        faceColor(data, srcX, srcY, widthOnceFrame, heightOnceFrame, count){
// 	        	var $selector = $(`[gnPlugin="gnAvatar"]`);
// 	        	$selector.gnAvatar("clear", {cat: data.key});
// 	            gnAvatarInfo.ctx[data.key].drawImage(data.overlay, srcX, srcY, widthOnceFrame, heightOnceFrame, data.dx, data.dy, data.dWidth, data.dHeight)
// 	            gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
// 	            gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.color[data.key];
// 	            $selector.gnAvatar("fill", {cat: data.key});
// 	            gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
// 	            gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, data.dx, data.dy, data.dWidth, data.dHeight)
// 	     		var imageDoc = new Image;
// 		        imageDoc.src = gnAvatarInfo.doc[key].toDataURL();
// 		        imageDoc.onload = function () {
// 		            if (!(count in gnAvatarHandle.imageloaded.screenshot[key])) gnAvatarHandle.imageloaded.screenshot[key][count] = this
// 		            if (gnAvatarInfo.skinColor != 0) {
// 		                $selector.gnAvatar("clear", {cat: data.key});
// 		                gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-over'
// 		                gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshotSkin[key][count], 0, 0)
// 		                gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity'
// 		                gnAvatarInfo.ctx[data.key].drawImage(this, 0, 0)
// 		            }
// 		        }
// 	        },
// 	        faceSkinColor(data, srcX, srcY, widthOnceFrame, heightOnceFrame, count){
// 	        	var $selector = $(`[gnPlugin="gnAvatar"]`);
// 	        	$selector.gnAvatar("clear", {cat: data.key});
// 		       	gnAvatarInfo.ctx[data.key].drawImage(data.skin, srcX, srcY, widthOnceFrame, heightOnceFrame, data.dx, data.dy, data.dWidth, data.dHeight);
// 		        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
// 		        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.skinColor;
// 		        $selector.gnAvatar("fill", {cat: data.key});
// 		        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
// 		       	gnAvatarHandle.imageloaded.screenshotSkin[data.key] = gnAvatarHandle.imageloaded.screenshotSkin[data.key] || [];
// 		        if (!(count in gnAvatarHandle.imageloaded.screenshotSkin[data.key])) {
// 		            var imageDoc = new Image;
// 		            imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
// 		            imageDoc.onload = function () {
// 		                gnAvatarHandle.imageloaded.screenshotSkin[data.key][count] = this;
// 		            }
// 		        }
// 		        if (gnAvatarInfo.color[data.key]) 
// 		            gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshot[data.key][count], 0, 0)
// 		        else
// 		           	gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, data.dx, data.dy, data.dWidth, data.dHeight)
// 	        }
// 	    },
// 	    drawFace(typeName, data){
// 	        this.reset();
// 	        gnAvatarHandle.interval[typeName] = setInterval(() => {
// 	            if(this.stopInterval) return;
// 	            this.cEAction++;
// 	            switch(true){
// 	                case (this.cEAction == 1 || this.cEAction == 5):
// 	                    eval(this.drawType[typeName])(data, 0, 0, this.widthOnceFrame, this.heightOnceFrame, '0');
// 	                    break;
// 	                case (this.cEAction == 2 || this.cEAction == 4):
// 	                    eval(this.drawType[typeName])(data, 750, 0, this.widthOnceFrame, this.heightOnceFrame, '1');
// 	                    break;
// 	                case this.cEAction == 3:
// 	                    eval(this.drawType[typeName])(data, 500, 0, this.widthOnceFrame, this.heightOnceFrame, '2');
// 	                    this.cEClose++;
// 	                    break;
// 	                case this.cEAction == 6:
// 	                    if(this.cEClose == 2)
// 	                        setTimeout(() => this.cEAction = 0, this.timeDelay), this.cEClose = 0;
// 	                    else
// 	                        setTimeout(() => this.cEAction = 0, this.timeCloseDelay);
// 	                    break;
// 	            }
// 	        }, this.timeIntervalDelay);
// 	    },
// 	    reset(){
// 	        this.stopInterval = true;
// 	        this.cEAction = this.cEClose = 0;
// 	        this.clear();
// 	        return this;
// 	    },
// 	    clear(){
// 	        for (let key in gnAvatarHandle.interval) clearInterval(gnAvatarHandle.interval[key]);
// 	        this.stopInterval = false;
// 	        return this;
// 	    }
// 	}

// 	var gnHtmlHandle = function(){
// 		return {
// 			__pluginName: "gnHtmlHandle",
// 			options: {
// 				attr: {
// 					data: "gnData"
// 				},
// 				__load: {
// 					response: null,
// 					plugin: null,
// 					key: null
// 				}
// 			},
// 			compulsory: [],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				let state = true;
// 				if(this.options.__load.key.indexOf("#") == 0) this.options.__load.key = this.options.__load.key.substring(1), state = false;
// 				return gnLib.htmlHandle(this.elem, this.options.__load.key, this.options.__load.response, this.options.__load.plugin, state, this.options.attr.data);
// 			}
// 		}
// 	}

// 	$.fn.gnHtmlHandle = function(...params){
// 		return gnLib.handlePlugin("gnHtmlHandle", {
// 			"load": "load"
// 		}, this, params)
// 	}


// 	var gnAvatar = function(){
// 		return {
// 			__pluginName: "gnAvatar",
// 			options: {
// 				suit: gnAvatarInfo.suit,
// 				attr: {
// 					object: "gnobjectcanvas"
// 				},
// 				__read: {canvas},
// 				__hideCanvas: {
// 					cat: null
// 				},
// 				__showCanvas: {
// 					cat: null
// 				},
// 				__clear: {
// 					cat: null
// 				},
// 				__fill: {
// 					cat: null
// 				},
// 				__clearIntVal: null,
// 				__clearAll: null,
// 				__fillAll: null,
// 				__resetAllObject: null,
// 				__resetDefaultColor: {
// 					cat: null
// 				},
// 				__resetDefaultObject: {
// 					cat: null
// 				},
// 				__setColor: {
// 					cat: null,
// 					hex: null
// 				},
// 				__setColorSkin: {
// 					hex: null
// 				},
// 				__setObject: {
// 					cat: null,
// 					pic: null
// 				},
// 				__addBackAvatar: [],	
// 				__backAvatar: {
// 					callback(event, suitResponse){
// 						let $frame = $('[gnPlugin="gnAvatarFrame"]').gnAvatarFrame("removeAll");
// 						if(suitResponse) suitResponse.map(item => {$frame.gnAvatarFrame("set", item)});
// 					}
// 				},
// 				__loadAllObject: null,
// 				__removeLastBackAvatar: null
// 			},
// 			compulsory: ["__hideCanvas.cat", "__showCanvas.cat", "__clear.cat", "__fill.cat", "__resetDefaultColor.cat", "__resetDefaultObject.cat", "__setColor.cat", "__setObject.cat", "__setObject.pic"],
// 			init(action, options, element){
// 				if("__"+action in this.options){
// 					this.options["__"+action] = $.extend(this.options["__"+action], options);
// 				}else{
// 					this.options = $.extend(this.options, options);
// 				}
// 				if(!gnLib.validate(action, this.__pluginName, this.compulsory, this.options) && element) {
// 					this.method = action;
// 					this.elem = element;
// 					return element;
// 				} else {
// 					return;
// 				}
// 			},
// 			read(){
// 				return canvas.map((value, key, array) => {
// 					// gnAvatarInfo.suit[value] = 0;
// 					gnAvatarInfo.doc[value] = $(`${$(this.elem).selector}[${this.options.attr.object}="${value}"]`)[0];
// 					gnAvatarInfo.canvasWidth[value] = gnAvatarInfo.doc[value].width;
// 					gnAvatarInfo.canvasHeight[value] = gnAvatarInfo.doc[value].height;
// 					gnAvatarInfo.ctx[value] = gnAvatarInfo.doc[value].getContext("2d");
// 				}) && this.elem;
// 			},
// 			loadAllObject(){
// 				return gnAvatarHandle.loadAllObject() && this.elem;
// 			},
// 			load(){
// 				// console.log('load()');
// 				return gnAvatarHandle.load() && this.elem;
// 			},
// 			resetAllObject(){
// 				gnAvatarInfo.suit = gnAvatarInfoDefault.suit;
// 				return this.elem;
// 			},
// 			resetDefaultObject(cat){
// 				var cat = cat || this.options.__resetDefaultObject.cat;
// 				gnAvatarInfo.suit[cat] = gnAvatarInfoDefault.suit[cat];
// 				return this.elem;
// 			},
// 			resetDefaultColor(cat){
// 				var cat = cat || this.options.__resetDefaultColor.cat;
// 				gnAvatarInfo.color[cat] = gnAvatarInfoDefault.color[cat];
// 				return this.elem;
// 			},
// 			setColor(cat, hex){
// 				gnAvatarInfo.color[cat || this.options.__setColor.cat] = "#"+(hex || this.options.__setColor.hex);
// 				return this.elem;
// 			},
// 			setColorSkin(hex){
// 				gnAvatarInfo.skinColor = "#"+(hex || this.options.__setColorSkin.hex);
// 				return this.elem;
// 			},
// 			setObject(cat, pic){
// 				gnAvatarInfo.suit[cat || this.options.__setObject.cat] = pic || this.options.__setObject.pic;
// 				return this.elem;
// 			},
// 			hideCanvas(cat){
// 				var cat = cat || this.options.__hideCanvas.cat;
// 				gnAvatarInfo.hide[cat] = 1;
// 				return $(gnAvatarInfo.doc[cat]).hide() && this.elem;
// 			},
// 			showCanvas(cat){
// 				var cat = cat || this.options.__showCanvas.cat;
// 				gnAvatarInfo.hide[cat] = 0;
// 				return $(gnAvatarInfo.doc[cat]).show() && this.elem;
// 			},
// 			clear(cat){
// 				var cat = cat || this.options.__clear.cat;
// 				gnAvatarInfo.ctx[cat].clearRect(0, 0, gnAvatarInfo.canvasWidth[cat], gnAvatarInfo.canvasHeight[cat]);
// 				return this.elem;
// 			},
// 			clearIntVal(){
				
// 				return gnAvatarDrawAnimation.reset() && this.elem;
// 			},
// 			fill(cat){
// 				var cat = cat || this.options.__fill.cat;
// 				gnAvatarInfo.ctx[cat].fillRect(0, 0, gnAvatarInfo.canvasWidth[cat], gnAvatarInfo.canvasHeight[cat]);
// 				return this.elem;
// 			},
// 			clearAll(){
// 				return Object.keys(gnAvatarInfo.ctx).map(cat => this.clear(cat)) && this.clearIntVal() && this.elem;
// 			},
// 			fillAll(){
// 				return Object.keys(gnAvatarInfo.ctx).map(cat => this.fill(cat)) && this.elem;
// 			},
// 			addBackAvatar(info){
// 				var info = info || this.options.__addBackAvatar;
// 				return gnAvatarInfo.backAvatar.push(info) && this.elem;
// 			},
// 			removeLastBackAvatar(){
// 				return gnAvatarInfo.backAvatar.pop() && this.elem;
// 			},
// 			backAvatar(){
// 				let nearLastPos = gnAvatarInfo.backAvatar.length - 2,
// 					suit = nearLastPos >= 0 && gnAvatarInfo.backAvatar[nearLastPos],
// 					callback = this.options.__backAvatar.callback,
// 					$this = $(this.elem);
// 				this.removeLastBackAvatar();
// 				this.resetAllObject();
// 				if(suit) suit.map(item => this.setObject(item.cat, item.pic));
// 				this.load();
// 				if(callback) callback({_main: this.elem}, suit);
// 				return this.elem;
// 			}
// 		}
// 	}

// 	$.fn.gnAvatar = function(...params){
// 		return gnLib.handlePlugin("gnAvatar", {
// 			"load": "load",
// 			"loadAllObject": "loadAllObject",
// 			"read": "read",
// 			"hideCanvas": "hideCanvas",
// 			"showCanvas": "showCanvas",
// 			"clear": "clear",
// 			"fill": "fill",
// 			"clearAll": "clearAll",
// 			"fillAll": "fillAll",
// 			"resetAllObject": "resetAllObject",
// 			"resetDefaultObject": "resetDefaultObject",
// 			"resetDefaultColor": "resetDefaultColor",
// 			"setColor": "setColor",
// 			"setColorSkin": "setColorSkin",
// 			"setObject": "setObject",
// 			"addBackAvatar": "addBackAvatar",
// 			"backAvatar": "backAvatar",
// 			"removeLastBackAvatar": "removeLastBackAvatar",
// 		}, this, params, function(data, info){
// 			if(info.action !== "read" && (!Object.keys(gnAvatarInfo.suit).length || !Object.keys(gnAvatarInfo.ctx).length)) data.read();
// 			data.options.__addBackAvatar = data.options.__addBackAvatar && [];
// 		});
// 	}

// 	var gnAvatarGt = function(){
// 		return {
// 			__pluginName: "gnAvatarGt",
// 			options: {
// 				attr: {
// 					gt: "gnGtText"
// 				},
// 				data: {
// 					gnMale: 1,
// 					gnFemale: 2
// 				},
// 				activeClass: "active",
// 				__load: {
// 					gtText: null
// 				},
// 				clickEvent(event, settings, action){
// 				 	let sGt = $(event._this).attr(settings.attr.gt),
// 				 		method = gnShop.keyword ? "loadSearch" : "loadShop";
// 				 	$(event._main).removeClass(settings.activeClass);
// 				 	$(event._this).addClass(settings.activeClass);
// 				 	gnShop.gt = settings.data[sGt] || 1;
// 					gnWrite.disableFeature();
// 					return $('[gnPlugin="gnMainContent"]').gnMainContent(method, {
// 						page: 1
// 					}) 
// 					&& $('[gnPlugin="gnAvatarFrame"]').gnAvatarFrame("removeAll") 
// 					&& $('[gnPlugin="gnAvatar"]').gnAvatar("resetAllObject;load");
// 				}
// 			},
// 			compulsory: [],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				var self = this;
// 				return $(self.elem).off("click").click(function(){
// 					return self.options.clickEvent({
// 		                _main: self.elem,
// 		                _this: this
// 		            }, self.options, self.method);
// 				}) && this.elem;
// 			}
// 		}
// 	}

// 	$.fn.gnAvatarGt = function(...params){
// 		return gnLib.handlePlugin("gnAvatarGt", {
// 			"load": "load"
// 		}, this, params);
// 	}

// 	var gnAvatarSkin = function(){
// 		return {
// 			__pluginName: "gnAvatarSkin",
// 			options: {
// 				inputColor: null,
// 				__load: {
// 					clickEvent(event, settings, action){
// 						var hex = $(settings.inputColor).val();
// 						// alert('test');
// 						$("[gnPlugin='gnAvatar']").gnAvatar("setColorSkin;load", {hex});
// 					}
// 				}
// 			},
// 			compulsory: ["inputColor"],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				var self = this;
// 				$(self.elem).off("click").on("click", function(){
// 					self.options.__load.clickEvent({
// 						_this: this,
// 						_main: self.elem
// 					}, self.options, self.method);
// 				})
// 				return self.elem;
// 			},
// 		}
// 	}

// 	$.fn.gnAvatarSkin = function(...params){
// 		return gnLib.handlePlugin("gnAvatarSkin", {
// 			"load": "load"
// 		}, this, params);
// 	}

// 	var gnAvatarRandom = function(){
// 		return {
// 			__pluginName: "gnAvatarRandom",
// 			options: {
// 				__load: {
// 					ajax: "ajaxData/ajaxRandomObject.php",
// 					postDataArr: ["suitRan", "~ultimate", "~gt"],
// 					suitRan: ["cloth", "head", "hair", "wing", "eff", "glass", "face"],
// 					gt: null,
// 					ultimate: null
// 				},
// 				afterAjaxComplete(event, response, settings, methodSettings, action){
// 					if(gnLib.errorHandle(response)) return;
// 					gnWrite.enableFeature();
// 					let $gnAvatarFrame = $('[gnPlugin="gnAvatarFrame"]');
// 					response.data.map(item => {
// 						item.removeFocusClass = 'disable';
// 						return $gnAvatarFrame.gnAvatarFrame("set", item) 
// 							&& $('[gnPlugin="gnAvatar"]').gnAvatar("setObject", item)
// 					})
// 					let suitCurrent = $gnAvatarFrame.gnAvatarFrame("readAll");
// 					$('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;load", suitCurrent);
// 				},
// 				clickEvent(event, settings, action){
// 					return gnLib.ajaxEvent(event, settings, settings["__"+action], action);
// 				}
// 			},
// 			compulsory: [],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				var self = this;
// 				return $(self.elem).off("click").click(function(){
// 					return self.options.clickEvent({
// 		                _main: self.elem,
// 		                _this: this
// 		            }, self.options, self.method);
// 				}) && this.elem;
// 			}
// 		}
// 	}

// 	$.fn.gnAvatarRandom = function(...params){
// 		return gnLib.handlePlugin("gnAvatarRandom", {
// 			"load": "load"
// 		}, this, params);
// 	}

// 	var gnAvatarColor = function(){
// 		return {
// 			__pluginName: "gnAvatarColor",
// 			options: {
// 				inputColor: null,
// 				__reset: {
// 					clickEvent(event, settings, action){
// 						var $event = $(event._main),
// 							frame = $('[gnPlugin="gnAvatarFrame"]').data("gnAvatarFrame");
// 						$(`[gnPlugin="gnAvatarFrame"].${frame.options.activeClass}.${frame.options.focusClass}`).each(function(){
// 							let cat = $(this).attr('cat');
// 							if(cat === "wing" || cat === "suits") return;
// 							$event.gnAvatar("resetDefaultColor", {cat});
// 						});
// 						$event.gnAvatar("load");
// 					}
// 				},
// 				__load: {
// 					clickEvent(event, settings, action){
// 						var $event = $(event._main),
// 							frame = $('[gnPlugin="gnAvatarFrame"]').data("gnAvatarFrame"),
// 							hex = $(settings.inputColor).val();
// 						$(`[gnPlugin="gnAvatarFrame"].${frame.options.activeClass}.${frame.options.focusClass}`).each(function(){
// 							let cat = $(this).attr('cat');
// 							if(cat === "wing" || cat === "suits") return;
// 							$event.gnAvatar("setColor", {cat, hex: hex});
// 						});
// 						$event.gnAvatar("load");
// 					}
// 				}
// 			},
// 			compulsory: ["inputColor"],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				var self = this;
// 				$(self.elem).off("click").on("click", function(){
// 					self.options.__load.clickEvent({
// 						_this: this,
// 						_main: self.elem
// 					}, self.options, self.method);
// 				})
// 				return self.elem;
// 			},
// 			reset(){
// 				var self = this;
// 				$(self.elem).off("click").on("click", function(){
// 					self.options.__reset.clickEvent({
// 						_this: this,
// 						_main: self.elem
// 					}, self.options, self.method);
// 				})
// 				return self.elem;
// 			}
// 		}
// 	}

// 	$.fn.gnAvatarColor = function(...params){
// 		return gnLib.handlePlugin("gnAvatarColor", {
// 			"load": "load",
// 			"reset": "reset"
// 		}, this, params);
// 	}

// 	var gnAvatarHide = function(){
// 		return {
// 			__pluginName: "gnAvatarHide",
// 			options: {
// 				attr: {
// 					object: "gnObjectHide"
// 				},
// 				__load: {
// 					gtText: null
// 				},
// 				clickEvent(event, settings, action){
// 					let $this = $(event._this), 
// 						cat = $this.attr(settings.attr.object);
// 					if(!cat || !(cat in gnAvatarInfo.suit)) return;
// 					let method = ($this.find("input").is(':checked') || $this.is(":checked")) ? "hideCanvas" : "showCanvas";
// 					return $('[gnPlugin="gnAvatar"]').gnAvatar(method+";load", {cat});
// 				}
// 			},
// 			compulsory: ["attr.object"],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				var self = this;
// 				return $(self.elem).off("click").click(function(){
// 					return self.options.clickEvent({
// 		                _main: self.elem,
// 		                _this: this
// 		            }, self.options, self.method);
// 				}) && self.elem;
// 			}
// 		}
// 	}

// 	$.fn.gnAvatarHide = function(...params){
// 		return gnLib.handlePlugin("gnAvatarHide", {
// 			"load": "load"
// 		}, this, params);
// 	}

// //#region ShopHandle
// 	///////////////////////////////////////////////////////////////////
// 	// ************************ SHOP HANDLE ************************ //
// 	///////////////////////////////////////////////////////////////////

// 	var gnItemListCart = function(){
// 		return {
// 			__pluginName: "gnItemListCart",
// 			options: {
// 				__load: {
// 					ajax: "ajaxData/ajaxItemListCart.php",
// 					postDataArr: ["suit", "~gt"],
// 					suit: gnAvatarInfo.suit,
// 					gt: null
// 				},
// 				afterAjaxComplete(event, response, settings, methodSettings, action){
// 					if(gnLib.errorHandle(response)) return;
// 					// console.log(methodSettings);
// 					$("[gnPlugin='gnItemListCart']").gnHtmlHandle("load", {
// 						key: "gnItemListCart",
// 						response,
// 						plugin: gnItemListCart()
// 					})
// 				},
// 				removeClickEvent(event, settings, action){
// 					var parent = $(event._this).parents("."+settings.recordClass);
// 					var info = {
// 						cat: parent.attr('cat')
// 					};
// 					$('[gnPlugin="gnAvatarFrame"]').gnAvatarFrame("remove", info.cat);
// 					$('[gnPlugin="gnAvatar"]').gnAvatar("resetDefaultObject;load", info);
// 				}
// 			},
// 			compulsory: [],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method);
// 			}
// 		}
// 	}

// 	$.fn.gnItemListCart = function(...params){
// 		return gnLib.handlePlugin("gnItemListCart", {
// 			"load": "load"
// 		}, this, params);
// 	}

// 	/////////////////////////
// 	// jQuery.gnPagination //
// 	/////////////////////////
// 	var gnPagination = function(){
// 		return {
// 			__pluginName: "gnPagination",
// 			options: {
// 				areaBtn: "gnBtnPage",
// 				areaInp: "gnInpPage",
// 				areaPage: "gnPage",
// 				catId: null,
// 				__load: {
// 					first: null,
// 					end: null,
// 					current: null,
// 					get left(){ return ((this.current == this.first) ? this.first : this.current-1);},
// 					get right(){ return ((this.current == this.end) ? this.end : this.current+1);},
// 					get curPage(){ return [this.current, "/", this.end].join("");},
// 				}
// 			},
// 			compulsory: ["__load.first", "__load.end", "__load.current"],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				let $elem = $(this.elem),
// 					areaInp = $elem.attr(this.options.areaInp);
// 				if(areaInp){
// 					$elem.val(this.options.__load[areaInp]);
// 				}else{
// 					let area = $elem.attr(this.options.areaBtn); 
// 					$elem.attr(this.options.areaPage, this.options.__load[area]);
// 				}
// 				return this.elem;
// 			},
// 			attachEvent(){
// 				var self = this;
// 				$(self.elem).off("click").on("click", function(){
// 					let method = gnShop.keyword ? "loadSearch" : "loadShop";
// 					$('[gnPlugin="gnMainContent"]').gnMainContent(method, {
// 						page: parseInt($(this).attr(self.options.areaPage))
// 					});
// 				})
// 			}
// 		}
// 	}

// 	$.fn.gnPagination = function(...params){
// 		return gnLib.handlePlugin("gnPagination", {
// 			"load": "load"
// 		}, this, params, null, true);
// 	}

// 	///////////////////////
// 	// jQuery.gnSearchDw //
// 	///////////////////////
	
// 	/**
// 	 * Khởi tạo plugin gnSearchDw
// 	 */
// 	var gnSearchDW = function(){
// 		return {
// 			__pluginName: "gnSearchDW",
// 			options: {
// 				infoImage: "enable",
// 				recordClass: "frame",
// 				loadClick: "#other-result a",
// 				__load: {
// 					ajax: "ajaxData/ajaxSearchDropDown.php",
// 					postDataArr: ["~keyword", "~gt", "limit", "~ultimate"],
// 					keyword: null,
// 					ultimate: null,
// 					gt: null,
// 					limit: 6
// 				},
// 				afterAjaxComplete(event, response, settings, methodSettings, action){
// 					if(gnLib.errorHandle(response)) return;
// 					$("[gnPlugin='gnSearchDW']").attr("keyword", methodSettings.keyword).gnHtmlHandle("load", {
// 						key: "gnSearchDW",
// 						response,
// 						plugin: gnSearchDW()
// 					})
// 				},
// 				clickItemEvent(event, settings){
// 	            	let info = {
// 		            	cat: $(event._this).attr('cat'),
// 		            	img: $(event._this).attr('img'),
// 		            	pic: $(event._this).attr('pic')            
// 		            }
// 		            var $frameSelector = $('[gnPlugin="gnAvatarFrame"]');
// 		           	if(!$frameSelector.gnAvatarFrame("exist", info)){
// 		            	var suitCurrent = $frameSelector.gnAvatarFrame("removeAllEffect;set;readAll", null, info);
// 			            $('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;setObject;load", suitCurrent, info);
// 			            gnWrite.enableFeature();
// 		            }
// 	            }
// 			},
// 			compulsory: ["ajax", "recordClass", "loadClick"],
// 			event: {
// 				"clickItemEvent": "click"
// 			},
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method);
// 			},
// 			attachEvent(){
// 				var self = this;
// 				$(self.elem).parent().off("click").on("click", self.options.loadClick, function(){
// 					gnShop.keyword = $("[gnPlugin='gnSearchDW']").attr("keyword") || gnShop.keyword;
// 					$('[gnPlugin="gnMainContent"]').gnMainContent("clearMainContent;loadSearch", null, {
// 				        page: 1,
// 				        catId: null
// 				    });
// 				})
// 			}
// 		}
// 	}

// 	$.fn.gnSearchDW = function(...params) {
// 		return gnLib.handlePlugin("gnSearchDW", {
// 			"load": "load"
// 		}, this, params);
// 	};

// 	//////////////////////
// 	// jQuery.gnSubMenu //
// 	//////////////////////
// 	/**
// 	 * Khởi tạo plugin gnSubMenu
// 	 */
// 	var gnSubMenu = function(){
// 		return {
// 			__pluginName: "gnSubMenu",
// 			options: {
// 				menuId: null,
// 				data: gnShop.menu.data,
// 	            recordClass: "btn",
// 	            activeClass: "active",
// 	            clickItemEvent(event, settings){
// 	            	$(shop.areaClass.subMenu).find('.'+settings.recordClass).removeClass(settings.activeClass);
// 		            $(event._this).addClass(settings.activeClass);
// 		            gnShop.catId = parseInt($(event._this).attr('catid'));
// 		            $('[gnPlugin="gnMainContent"]').gnMainContent("loadShop", {
// 		                page: 1
// 		            });
// 	            }
// 			},
// 			compulsory: ["recordClass"],
// 			event: {
// 				"clickItemEvent": "click"
// 			},
// 			init(action, options, element = null){
// 				this.options = $.extend(this.options, options);
// 				this.elem = element;
// 			},
// 			load(){
// 				if(this.options.menuId) gnShop.menuId = this.options.menuId;
// 				return $(this.elem).gnHtmlHandle("load", {
// 					key: "gnSubMenu",
// 					response: this.options.data[gnShop.menuId],
// 					plugin: this
// 				})
// 			}
// 		}
// 	}

// 	$.fn.gnSubMenu = function(...params) {
// 		return gnLib.handlePlugin("gnSubMenu", {
// 			"load": "load"
// 		}, this, params);
// 	};

// 	///////////////////
// 	// jQuery.gnMenu //
// 	///////////////////
// 	/**
// 	 * Khởi tạo plugin gnMenu
// 	 */
// 	var gnMenu = function(){
// 		return {
// 			__pluginName: "gnMenu",
// 			options: {
// 				data: gnShop.menu.data,
// 	            recordClass: "btn",
// 	            activeClass: "active",
// 	            clickItemEvent(event, settings){
// 	            	$('[gnPlugin="gnMenu"]').find('.'+settings.recordClass).removeClass(settings.activeClass);
// 		            $(event._this).addClass(settings.activeClass);
// 		            let menuId = $(event._this).attr('menuid');
// 		            $('[gnPlugin="gnSubMenu"]').gnSubMenu(";load", {menuId});
// 		            $('[gnPlugin="gnMainContent"]').gnMainContent("clearMainContent;loadShop", null,{
// 		            	page: 1	            
// 		            });
// 	            }
// 			},
// 			event: {
// 				"clickItemEvent": "click"
// 			},
// 			init(action, options, element = null){
// 				this.options = $.extend(this.options, options);
// 				this.elem = element;
// 				this.method = action;
// 				// this.attachEvent();
// 			},
// 			load(){
// 				// console.log(this);
// 				return $(this.elem).gnHtmlHandle("load", {
// 					key: "gnMenu",
// 					response: this.options,
// 					plugin: this
// 				})
// 			},
// 			rSearch(){
// 				return $(this.elem).html(shop.html.menuSearch(this.options));
// 			}
// 		}
// 	}

// 	$.fn.gnMenu = function(...params) {
// 		return gnLib.handlePlugin("gnMenu", {
// 			"load": "load",
// 			"resultSearch": "rSearch"
// 		}, this, params);
// 	};

// 	//////////////////////
// 	// jQuery.gnHotItem //
// 	//////////////////////
// 	/**
// 	 * Khởi tạo plugin gnHotItem
// 	 */
// 	var gnHotItem = function(){
// 		return {
// 			__pluginName: "gnHotItem",
// 			options: {				
// 				eventDemo: "enable",
// 				recordClass: "item-frame",
// 				eventClickDemoClass: "img",
// 				zzInfoClass: "zzInfo",
// 				infoClass: "info",
// 				btnBuyId: "buy",
// 				htmlEffectAfterHover: "<div class='animate-border-blink'></div><div class='select-item'><span><img src='"+infoConfig.resourceIcon+"/trywear-icon.png'></span></div>",
// 				info: "disable",
// 				afterAjaxComplete(event, response, settings){
// 					return gnLib.errorHandle(response) || $('[gnPlugin="gnHotItem"]').gnHtmlHandle("load", {
// 						key: "gnHotItem", 
// 						response,
// 						plugin: gnHotItem()
// 					});
// 				},
// 				clickItemEvent(event, settings){
// 		            let info = {
// 		            	cat: $(event._this).attr('cat'),
// 		            	img: $(event._this).attr('img'),
// 		            	pic: $(event._this).attr('pic')            
// 		            }
// 		            var $frameSelector = $('[gnPlugin="gnAvatarFrame"]');
// 		           	if(!$frameSelector.gnAvatarFrame("exist", info)){
// 		            	var suitCurrent = $frameSelector.gnAvatarFrame("removeAllEffect;set;readAll", null, info);
// 			            $('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;setObject;load", suitCurrent, info);
// 			            gnWrite.enableFeature();
// 		            }
// 				},
// 				__load: {
// 					ajax: "ajaxData/ajaxHotItem.php",
// 					postDataArr: ["~gt", "limit"],
// 					gt: null,
// 					limit: 6
// 				}
// 			},
// 			compulsory: [],
// 			event: {
// 				"clickItemEvent": "click"
// 			},
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method);
// 			}
// 		}
// 	}

// 	/**
// 	 * [Plugin DOM Các Hot Item Gunny]
// 	 * @param  {object} options [Các thuộc tính cài đặt]
// 	 * @return {object}         [Các thuộc tính]                  
// 	 */
// 	$.fn.gnHotItem = function(...params) {
// 		return gnLib.handlePlugin("gnHotItem", {
// 			"load": "load"
// 		}, this, params);
// 	};

// 	//////////////////////////
// 	// jQuery.gnAvatarFrame //
// 	//////////////////////////
// 	/**
// 	 * Khởi tạo plugin gnAvatarFrame
// 	 */
// 	var gnAvatarFrame = function(){
// 		return {
// 			__pluginName: "gnAvatarFrame",
// 			options: {
// 				__exist: null,
// 				__set: {
// 					removeFocusClass: "enable"
// 				},
// 				__remove: null,
// 				nameClass: "frame",
// 				activeClass: "active",
// 				focusClass: "focus",
// 				imgClass: "icon",
// 				htmlEffectAfterClick: "<div class='animate-border-blink'></div>",
// 				attr: {
// 					cat: "cat",
// 					img: "img",
// 					pic: "pic"
// 				},
// 			},
// 			compulsory: [],
// 			init(action, options, element = null){
// 				return gnLib.init(this, {action, options, element});
// 			},
// 			load(){
// 				var self = this;
// 				return $('body').off("click").on("click", `${$(self.elem).selector}.${self.options.activeClass}`, function(){
// 					if($(this).find("."+self.options.imgClass).length){
// 						let area = $(this).attr(self.options.attr.cat);
// 						$(self.elem).each(function(){
// 							$(this).removeClass(self.options.focusClass).find(gnLib.createSelectorByElement($(self.options.htmlEffectAfterClick))).remove();
// 						})
						
// 						$(this).addClass(self.options.focusClass).append(self.options.htmlEffectAfterClick);
// 					}
// 				}) && self.elem; 
// 			},
// 			exist(){
// 				return this.options.__exist.pic == $(`${$(this.elem).selector}[${this.options.attr.cat}="${this.options.__exist.cat}"]`).attr(this.options.attr.pic) && this.elem;
// 			},
// 			readAll(){
// 				var self = this,
// 					data = [];
// 	        	$(`${$(self.elem).selector}.${self.options.activeClass}`).each(function(){
// 	        		data = [{
// 		            	cat: $(this).attr(self.options.attr.cat),
// 		            	img: $(this).attr(self.options.attr.img),
// 		            	pic: $(this).attr(self.options.attr.pic)            
// 		            },...data];
// 	        	});
// 	        	return data;
// 			},
// 			set(){
// 				if(gnAvatarInfoDefault.frame[this.options.__set.cat]){
// 					// this.options.__set.removeFocusClass = this.options.__set.removeFocusClass || 'enable';
// 					if(this.options.__set.removeFocusClass === 'enable') $(`${$(this.elem).selector}`).removeClass(this.options.focusClass);
// 					return $(`${$(this.elem).selector}[${this.options.attr.cat}="${this.options.__set.cat}"]`)
// 					.attr(this.options.attr.img, this.options.__set.img)
// 					.attr(this.options.attr.pic, this.options.__set.pic)
// 					.addClass(this.options.activeClass+" "+this.options.focusClass)
// 					.html(gnAvatarInfoDefault.frame[this.options.__set.cat])
// 					.append($("<div>").css({"background-image": "url("+this.options.__set.img+")", "background-repeat":  "no-repeat"}).addClass(this.options.imgClass))
// 					.append(this.options.htmlEffectAfterClick) && this.elem;
// 				}
// 				return;
// 			},
// 			remove(){
// 				return $(`${$(this.elem).selector}[${this.options.attr.cat}="${this.options.__remove}"]`)
// 				.removeClass(this.options.activeClass+" "+this.options.focusClass)
// 				.html(gnAvatarInfoDefault.frame[this.options.__remove])
// 				.removeAttr(self.options.attr.pic)
// 				.removeAttr(self.options.attr.img) && this.elem;
// 			},
// 			removeAll(){
// 				var self = this;
// 				return $(`${$(self.elem).selector}.${self.options.activeClass}`).each(function(){
// 					let $this = $(this),
// 						area = $this.attr(self.options.attr.cat);
// 					$this.removeClass(self.options.activeClass+" "+self.options.focusClass)
// 					.html(gnAvatarInfoDefault.frame[area])
// 					.removeAttr(self.options.attr.pic)
// 					.removeAttr(self.options.attr.img)
// 				}) && self.elem;
// 			},
// 			removeAllEffect(){
// 				var self = this;
// 				return $(`${$(self.elem).selector}.${self.options.activeClass}.${self.options.focusClass}`).each(function(){
// 					let $this = $(this);
// 					let cat = $this.attr(self.options.attr.cat);
// 					let style = $this.find("."+self.options.imgClass).attr('style');
// 					$this.html(gnAvatarInfoDefault.frame[cat]).append($("<div>").attr("style", style).addClass(self.options.imgClass));
// 				}) && self.elem;
// 			}
// 		}
// 	}
	
// 	/**
// 	 * [Plugin DOM Frame Avatar Gunny]
// 	 * @param  {string} action  [Các action muốn gọi trong plugin]
// 	 * @param  {object} options [Các thuộc tính cài đặt tương ứng với từng action]
// 	 * @return {object}         [Tùy từng loại action mà trả về từng thông tin phù hợp]                  
// 	 */
// 	$.fn.gnAvatarFrame = function(...params) {
// 		return gnLib.handlePlugin("gnAvatarFrame", {
// 			"load": "load",
// 			"exist": "exist",
// 			"readAll": "readAll",
// 			"set": "set",
// 			"remove": "remove",
// 			"removeAll": "removeAll",
// 			"removeAllEffect": "removeAllEffect"
// 		}, this, params);
// 	};
// 	//////////////////////////
// 	// jQuery.gnMainContent //
// 	//////////////////////////
// 	var gnMainContent = function(){
// 		return {
// 			__pluginName: "gnMainContent",
// 			options: {
// 				recordClass: "item-frame",
// 				activeClass: "active",
// 				eventClickDemoClass: "img",
// 				infoClass: "info",
// 				zzInfoClass: "zzInfo",
// 				paginationClass: "phantrang",
// 				paginationClassSetting: {
// 					btn: ".btn",
// 					btnFirst: ".dau",
// 					btnEnd: ".cuoi",
// 					btnLeft: ".trai",
// 					btnRight: ".phai",
// 					showDataInput: ".state input"
// 				},
// 				btnBuyId: "buy",
// 				info: "enable",
// 				htmlEffectAfterHover: "<div class='animate-border-blink'></div><div class='select-item'><span><img src='"+infoConfig.resourceIcon+"/trywear-icon.png'></span></div>",
// 				afterAjaxComplete(event, response, settings, methodSettings, action){
// 					if(gnLib.errorHandle(response)) return;

// 					$('[gnPlugin="gnMainContent"]').gnHtmlHandle("load", {
// 						key: "gnMainContent", 
// 						response,
// 						plugin: gnMainContent()
// 					})
// 					$('[gnPlugin="gnPagination"]').gnPagination("load", {
// 						current: response.current,
// 						first: 1,
// 						end: response.end					
// 					});
// 					if(action === "loadSearch"){
// 						if(!settings.close.parentClass) settings.close.parentClass = shop.areaClass.subMenu;
// 						$(settings.close.parentClass).html("<p id='result-txt'>Từ khóa: " + gnShop.keyword + " - " + response.totalRecord + " kết quả  "+settings.close.html+"</p>");
// 						$(shop.areaClass.menu).gnMenu("resultSearch");
// 						$(shop.areaClass.menu).html("<div class='"+shop.settingDefault.menu.recordClass+" "+shop.settingDefault.menu.activeClass+"'>Search</div>")
// 					}
// 				},
// 				clickItemEvent(event, settings, action){
// 					if (!$(event._this).parents("."+settings.recordClass).hasClass(settings.activeClass)) {
// 			            $('.'+settings.recordClass).removeClass(settings.activeClass)
// 			            $(event._this).parents("."+settings.recordClass).addClass(settings.activeClass)
// 			        }
// 		            let info = {
// 		            	cat: $(event._this).attr('cat'),
// 		            	img: $(event._this).attr('img'),
// 		            	pic: $(event._this).attr('pic')            
// 		            }
// 		            var $frameSelector = $('[gnPlugin="gnAvatarFrame"]');
// 		            if(!$frameSelector.gnAvatarFrame("exist", info)){
// 		            	var suitCurrent = $frameSelector.gnAvatarFrame("removeAllEffect;set;readAll", null, info);
// 			            $('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;setObject;load", suitCurrent, info);
// 			            // $('[gnPlugin="gnAvatar"]').gnAvatar("clearAll");
// 			            // console.log('clearAll');
// 			            gnWrite.enableFeature();
// 		            }
// 				},
// 				__loadShop: {
// 					ajax: "ajaxData/ajaxData.php",
// 					postDataArr: ["~catId", "page", "~gt", "limit", "~ultimate"],
// 					page: 1,
// 					limit: 8,
// 					gt: null,
// 					keyword: null,
// 					ultimate: null
// 				},
// 				__clearSMenu: null,
// 				__clearMainContent: null,
// 				__clearSearch: null,
// 				__clearAll: null
// 			},
// 			event: {
// 				"clickItemEvent": "click"
// 			},
// 			searchOptions: {
// 				close: {
// 					parentClass: null,
// 					btnClass: "btn-close",
// 					html: "<span class='btn-close filter-btn'>X</span>"
// 				},
// 				closeEvent(event, settings, action){
// 					$('[gnPlugin="gnMainContent"]').gnMainContent("clearAll");
// 					$('[gnPlugin="gnMenu"]').gnMenu("load");
// 					$('[gnPlugin="gnSubMenu"]').gnSubMenu("load");
// 					$('[gnPlugin="gnMainContent"]').gnMainContent("loadShop", {
// 						page: 1
// 					});
// 				},
// 				__loadSearch: {
// 					ajax: "ajaxData/ajaxSearchMainContent.php",
// 					postDataArr: ["~keyword", "page", "~gt", "limit", "~ultimate"],
// 					page: 1,
// 					limit: 8,
// 					gt: null,
// 					keyword: null,
// 					ultimate: null
// 				}
// 			},
// 			compulsory: [],
// 			init(action, options, element = null){
// 				if("__"+action in this.options || "__"+action in this.searchOptions){
// 					if(action === "loadSearch"){
// 						this.options = $.extend(this.options, this.searchOptions);
// 					}
// 					this.options["__"+action] = $.extend(this.options["__"+action], options);
// 				}else{
// 					this.options = $.extend(this.options, options);
// 				}
// 				// console.log(options);
// 				this.method = action;
// 				this.elem = element;
// 				this.attachEvent();
// 				return this.elem;
// 			},
// 			clearSMenu(){
// 				gnShop.menuId = 0;
// 				return this.elem;
// 			},
// 			clearMainContent(){
// 				gnShop.catId = null;
// 				return this.elem;
// 			},
// 			clearSearch(){
// 				gnShop.keyword = null;
// 				return this.elem;
// 			},
// 			clearAll(){
// 				return this.clearSMenu() && this.clearMainContent() && this.clearSearch();
// 			},
// 			load(){
// 				if(this.method === "loadShop") this.clearSearch();
// 				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method) && this.elem;
// 			},
// 			attachEvent(){
// 				var self = this;
// 				// $(self.elem).off('click').on('click', '.'+self.options.recordClass+' .'+self.options.eventClickDemoClass, function(e){ 
// 				// 	console.log(this);
// 				// 	self.options.clickItemEvent({
// 				// 		_main: self.elem,
// 				// 		_this: this
// 				// 	}, self.options, self.method);
// 				// })
// 				if(self.method === "loadSearch"){
// 					let btnClose = gnLib.createSelectorByElement($(self.options.close.html));
// 					$(shop.areaClass.subMenu).off('click').on("click", btnClose, function(){
// 						self.options.closeEvent({
// 							_this: this,
// 							_main: self.elem
// 						}, self.options, self.method);
// 					})
// 				}
// 				return self.elem;
// 			}
// 		}
// 	}
// 	$.fn.gnMainContent = function(...params) {

// 		return gnLib.handlePlugin("gnMainContent", {
// 			"loadShop": "load", 
// 			"loadSearch": "load",
// 			"clearSMenu": "clearSMenu",
// 			"clearMainContent": "clearMainContent",
// 			"clearSearch": "clearSearch",
// 			"clearAll": "clearAll"
// 		}, this, params);
// 	};
// //#endregion ShopHandle
// }) (jQuery);