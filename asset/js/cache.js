(function($){
	const configURL = "http://localhost/gunny/library/config.php";

	// var gnQuery = {};
	$.loadAvatar = function(){
		return $.ajax({
			url: configURL,
			type: "POST",
			success(data){
				const objectNotLoad = ["gnConst"];
				objectNotLoad.map(obj => 
					Object.keys(data[obj]).map(variable => eval(variable+" = data."+obj+"[variable]"))
				)
				Object.keys(data).map(objName => eval(objName+" = data[objName]"))
			},
			dataType: "JSON",
			async: false
		})
	} 
	$.loadAvatar();

	const rejectFnc = path => console.log("error", path);
	const newImage = new Image;
	const getImage = (path, obj = {}, fnc) => new Promise((resolve, reject) => 
		Object.assign(new Image, {
			...obj,
			onload(){ resolve(this) },
			onerror: () => reject(path),
			src: path
		})
	)

	var gnShop = {
		...gnShop,
		_catId: null,
		get catId(){
			this._catId = this._catId || this.menu.data[this.menuId].data[0].catId;
			return this._catId;
		},
		set catId(val){
			this._catId = val;
		},
		_pathChar: null,
		get pathChar(){
			this._pathChar = (this.gt == 1) ? 'm' : 'f';
			return this._pathChar;
		},
		set pathChar(val){
			this._pathChar = val;
		}
	};


	var gnWrite = {
		mojsShow(promise) {
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
	            onComplete: function () {
	                promise(function (resolve) {
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
	                150: -150
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
	                pathScale: [0.65, 1],
	                radius: 'rand(12, 15)',
	                direction: [-1, 1],
	                delay: 0.8 * 500,
	                isSwirl: true
	            }
	        })

	        Timeline.add(body, burst, fadeBurst, parent)
	        Timeline.play()
	    },
	    mojsClose(promise) {
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
	            onComplete: function () {
	                promise(function (resolve) {
	                    resolve()
	                })
	            }
	        }).play()
	    }, 
	    notifyText(text = '', type = 'info'){
	        new Noty({
	            text: "<span class='prefix-alert'>" + this.arrPrefix[type] + ' : </span>' + text,
	            type: type,
	            theme: 'mint',
	            layout: 'topRight',
	            timeout: 4000,
	            animation: {
	                open: fncWrite.mojsShow,
	                close: fncWrite.mojsClose
	            }
	        }).show();
	    },
	    tooltip(){
	    	return $('[tooltip]').each(function(){
				$(this).attr('style', 'z-index: 999').addClass('tooltip').append('<span class="message">'+$(this).attr("tooltip")+'</span>');
			})
	    }
	}

	$.gnSetupFnc = function(obj){
		gnWrite = Object.assign(gnWrite, obj);
	}

	const gnReadQuery = function(){
		return {
			lexing: [],
			syntaxData: $.extend(true, {}, gnQuery),
			addValue(key){
				if(this.syntaxData[key].data !== "") {
					this.lexing = [...this.lexing, {type: this.syntaxData[key].prefix, data: this.syntaxData[key].data}];
					this.syntaxData[key].data = "";
					this.syntaxData[key].state = false;
					return this;
				}
				return false;
			},
			addRunObjAndString(){
				return this.addValue("runObj") && this.addValue("string");
			},
			lex(data){
				data.split("").map(token => {
					if(token === " " && !this.syntaxData.string.state) return;
					if(!this.syntaxData.line.state){
						this.syntaxData.line.state = true;
						this.lexing = [...this.lexing, this.syntaxData.line.start];
					}				
					if(!this.syntaxData.key.data) this.syntaxData.key.state = true;
						
					if(!this.syntaxData.block.state && !this.syntaxData.key.state && token !== ","){
						this.syntaxData.block.state = true;
						this.lexing = [...this.lexing, this.syntaxData.block.start];
					}
					if(token === ":" && this.syntaxData.key.state && this.syntaxData.line.state && !this.syntaxData.runObj.state && !this.syntaxData.string.state){
						this.syntaxData.key.state = false;
						this.lexing = [...this.lexing, {type: this.syntaxData.key.prefix, data: this.syntaxData.key.data}];
					}else if(this.syntaxData.key.state){
						this.syntaxData.key.data += token;
					}else if(token === ";" && !this.syntaxData.string.state){
						this.addRunObjAndString();
						if(this.syntaxData.key.data)this.syntaxData.key.data = "";
						if(this.syntaxData.condition.doSth){
							this.syntaxData.condition.doSth = false;
							this.lexing = [...this.lexing, this.syntaxData.condition.doSthEndPrefix];
						}else if(this.syntaxData.condition.elseSth){
							this.syntaxData.condition.elseSth = false;
							this.lexing = [...this.lexing, this.syntaxData.condition.elseEndPrefix];
						}
						if(this.syntaxData.block.state) this.lexing = [...this.lexing, this.syntaxData.block.end];
						this.syntaxData.block.state = false;
						this.syntaxData.line.state = false;
						this.lexing = [...this.lexing, this.syntaxData.line.end];

					}else if(token === "," && !this.syntaxData.string.state && this.syntaxData.block.state){
						this.addRunObjAndString();
						if(this.syntaxData.condition.doSth){
							this.syntaxData.condition.doSth = false;
							this.lexing = [...this.lexing, this.syntaxData.condition.doSthEndPrefix];
						}else if(this.syntaxData.condition.elseSth){
							this.syntaxData.condition.elseSth = false;
							this.lexing = [...this.lexing, this.syntaxData.condition.elseEndPrefix];
						}
						this.lexing = [...this.lexing, this.syntaxData.block.end];
						this.syntaxData.block.state = false;
						
					}else if(token === "\'" && !this.syntaxData.runObj.state){
						if(this.syntaxData.string.state || this.syntaxData.string.data !== ""){
							this.lexing = [...this.lexing, {type: this.syntaxData.string.prefix, data: this.syntaxData.string.data}];
							this.syntaxData.string.data = "";
							this.syntaxData.string.state = false;
						}else{
							this.syntaxData.string.state = true;
						}
					}else if(token === "?" && !this.syntaxData.string.state && !this.syntaxData.condition.doSth){
						this.addRunObjAndString();
						if(this.syntaxData.condition.valueState){
							this.lexing = [...this.lexing, this.syntaxData.condition.valueEndPrefix];
						}
						this.syntaxData.condition.doSth = true;
						this.lexing = [...this.lexing, this.syntaxData.condition.doSthPrefix];
					}else if (token === "^" && this.syntaxData.condition.doSth && !this.syntaxData.condition.elseSth){
						this.addRunObjAndString();
						this.syntaxData.condition.doSth = false;
						this.lexing = [...this.lexing, this.syntaxData.condition.doSthEndPrefix];
						this.syntaxData.condition.elseSth = true;
						this.lexing = [...this.lexing, this.syntaxData.condition.elsePrefix];
					}else if(token === "=" && !this.syntaxData.string.state && !this.syntaxData.condition.valueState){
						this.addRunObjAndString();
						// this.lexing = [...this.lexing, this.syntaxData.equal.prefix];
						// this.lexing = [...this.lexing, this.syntaxData.block.end];
						
						this.lexing = [...this.lexing, this.syntaxData.condition.valuePrefix];
						this.syntaxData.condition.valueState = true;
					}else if(token === "+" && !this.syntaxData.string.state){
						this.addRunObjAndString();
					}else if(this.syntaxData.runObj.state && !this.syntaxData.string.state){
						this.syntaxData.runObj.data += token;
					}else if(this.syntaxData.string.state && !this.syntaxData.runObj.state){
						this.syntaxData.string.data += token;
					}else{
						this.syntaxData.runObj.data += token;
					}
				})
				if(this.syntaxData.runObj.data !== "") 
					this.lexing = [...this.lexing, {type: this.syntaxData.runObj.prefix, data: this.syntaxData.runObj.data}];
				else if(this.syntaxData.string.data !== "")
					this.lexing = [...this.lexing, {type: this.syntaxData.string.prefix, data: this.syntaxData.string.data}];
				if(this.syntaxData.key.data){
					// this.lexing = [...this.lexing, {type: this.syntaxData.key.prefix, data: this.syntaxData.key.data}];
					this.syntaxData.key.data = "";
				}
				
				if(this.syntaxData.condition.doSth){
					this.syntaxData.condition.doSth = false;
					this.lexing = [...this.lexing, this.syntaxData.condition.doSthEndPrefix];
				}else if(this.syntaxData.condition.elseSth){
					this.syntaxData.condition.elseSth = false;
					this.lexing = [...this.lexing, this.syntaxData.condition.elseEndPrefix];
				}
				if(this.syntaxData.block.state && this.syntaxData.line.state) {
					this.lexing = [...this.lexing, this.syntaxData.block.end];
				};
				this.lexing = [...this.lexing, this.syntaxData.line.end];
				return this.lexing;
			}
		}
	}

	const gnLib = {
		ajaxEvent(event, settings, methodSettings, action){
			return $.ajax({
				method: "POST",
				url: methodSettings.ajax,
				data: this.postData(methodSettings, methodSettings.postDataArr)
			}).done(data => {
				let dataJson = JSON.parse(data);
				if(!("afterAjaxComplete" in settings) && !("afterAjaxComplete" in methodSettings)) this.error("300", {plugin: settings.__pluginName, method: action})
				if("afterAjaxComplete" in settings){
					return settings.afterAjaxComplete(event, dataJson, settings, methodSettings, action);
				}else{
					return methodSettings.afterAjaxComplete(event, dataJson, settings, methodSettings, action);
				}
			}).fail((error) => {
				console.log(error);
			})
		},
		errorHandle(response){
			return (response.error) && $('[gnPlugin="gnMainContent"]').html(response.error.msg);
		},
		postData($this, data){
			return data.reduce((obj, item) => {
				if(item.indexOf("~") >= 0){
					let key = item.substring(1);
					if($this[key] || $this[key] == 0) {
						gnShop[key] = $this[key];
						return {[key]: $this[key], ...obj}
					}
					return {[key]: gnShop[key], ...obj}
				}
				return {[item]: $this[item], ...obj}
			}, {});
		},
		getAttributes($node){
		 	var attrs = {};
		    $.each($node[0].attributes, function(index, attribute){
		        attrs[attribute.name] = attribute.value;
		    });
		    return attrs;
		},
		createSelectorByElement($node, removeKey = []){
			$array = this.getAttributes($node);
			removeKey = removeKey.map(item => item.toLowerCase());
			// console.log()
			var selector = '';
			for(var key in $array){
				// console.log(key);
				if(removeKey.includes(key.toLowerCase())) continue;
				selector += "["+key+"='"+$array[key]+"']";
			}
			return selector;
		},
		validate(action, plugin, compul, options){
			var optionNotExist = compul.find(item => (item.includes(action) && !eval("options."+item)));
			return optionNotExist && gnLib.error("100", {plugin: plugin, var: optionNotExist[0]});
		},
		error(codeError, object){
			const doErrorMsg = {
				get compVar(){
					return `gnError(${codeError}) : Để khởi tạo plugin '${object.plugin}' bạn phải thêm giá trị cho thuộc tính '${object.var}'.`
				},
				get notExistMethod(){
					return `gnError(${codeError}) : Method '${object.method}' không tồn tại trong plugin '${object.plugin}'.`
				},
				get afterAjaxComplete(){
					return `gnError(${codeError}) : Function callBack ("afterAjaxComplete") ở method '${object.method}' trong plugin '${object.plugin}' phải khác null để call ajax.`
				},
				get notExistClass(){
					return `gnError(${codeError}) : Class cho plugin '${object.plugin}' không tồn tại để khởi tạo.`
				}
			};
			const doErrorCode = {
				"100": "compVar",
				"200": "notExistMethod",
				"400": "notExistClass"
			};
			let msgError = doErrorMsg[doErrorCode[codeError]];
			$.error(msgError);
			return msgError;
		},
		init(data, dataParams){
			if(data.options.hasOwnProperty("__"+dataParams.action)){
				data.options["__"+dataParams.action] = $.extend(data.options["__"+dataParams.action], dataParams.options);
			}else{
				data.options = $.extend(data.options, dataParams.options);
			}
			if(!this.validate(dataParams.action, data.__pluginName, data.compulsory, data.options) && (dataParams.element || data.element)) {
				data.method = dataParams.action;
				data.elem = dataParams.element || data.elem || false;
				if(data.attachEvent) data.attachEvent();
				return dataParams.element;
			}
			return;
		},
		loadPlugin(action, options, data, plugin, doFnc = {}, elem, params, callback = null, multiElem = false){
			if(action && !data[doFnc[action]] && action !== actionInit) this.error("200", {plugin: data.__pluginName, method: action})
			if(!action || action === actionInit){
				data.init(action, options);
				$(elem).data(plugin, data);
				return elem;
			}
			if(callback) callback(data, {action, options});
			// data.init(action, options);
			if(multiElem){
				data.init(action, options);
				return $(elem).each(function(){
					data.elem = this;
					if(data.attachEvent) data.attachEvent();
					return data[doFnc[action]]();
				}).data(plugin, data) && elem;
			}
			data.init(action, options, elem);
			$(elem).data(plugin, data);

			return data[doFnc[action]]();
		},
		handlePlugin(plugin, doFnc = {}, elem, params, callback = null, multiElem = false){
			let ctor = eval(plugin),
				data = $(elem).data(plugin) || (ctor ? new ctor() : this.error("400", {plugin: data.__pluginName}));
			if(params[0].includes(actionSplit)){
				params[0].split(actionSplit).reduce((posOption, action) => {
					let options = params[++posOption] || {};
					elem = this.loadPlugin(action, options, data, plugin, doFnc, elem, params, callback, multiElem);
					return posOption;
				}, 0);
				return elem;
			}
			let [action = "", options = {}, ...otherParams] = (typeof params[0] === 'string') ? params : [, params[0]];
			return this.loadPlugin(action, options, data, plugin, doFnc, elem, params, callback, multiElem);
		},
		convertDataToObject(string = "", split = optionSplit, charSplitValData = optionSplitKeyData){
			return string.split(split).reduce((object, param) => {
				let pos = param.indexOf(charSplitValData),
					key = param.substring(0, pos),
					val = param.substring(pos+1);
				return {[key]: val, ...object};
			}, {}) || console.log('error');
		},
		handleBlock(lex, data, init, settings){
			return lex.reduce((text, item) => {
				if(item.type === 'STRING') return text += item.data;
				if(item.type === 'RUN') {
					let prefix = "data";
					if(item.data.indexOf("~") == 0) item.data = item.data.substring(1), prefix = "settings";
					if(item.data.indexOf("#") == 0) item.data = item.data.substring(1), prefix = "init";
					let val = $.trim(this.getObject({prefix, data, settings, init, string: item.data}));
					return text += val;
				}
			}, "");
		},
		handleTreeLexingString(lex, data, init, settings){
			var startEnd = {
				[gnQuery.condition.valuePrefix]: gnQuery.condition.valueEndPrefix,
				[gnQuery.condition.doSthPrefix]: gnQuery.condition.doSthEndPrefix,
				[gnQuery.condition.elsePrefix]: gnQuery.condition.elseEndPrefix,
				value1: "",
				value2: "",
				doState: null
			}
			var i = 0,
				text = "";
				// var item2;
			while(i < lex.length){
				var item = lex[i++];
				if(item !== gnQuery.block.start) break;
				if (text) 
					text += ",'";
				else
					text = "'";
				
				while (i < lex.length){
					var item2 = lex[i++];
					if(item2 === gnQuery.block.end) break;
					if(startEnd.hasOwnProperty(item2)){
						let valueBlock = [];
						while(i < lex.length){
							var item3 = lex[i++];
							if(item3 === startEnd[item2]) break;
							valueBlock = [...valueBlock, item3];
						}
						let val = this.handleBlock(valueBlock, data, init, settings);
						if(item2 === gnQuery.condition.doSthPrefix && startEnd.value1 == startEnd.value2){
							if(!startEnd.Value1) continue;
							text += val;
							startEnd.value1 = "";
							startEnd.value2 = "";
						}
						if(item2 === gnQuery.condition.elsePrefix && (startEnd.value1 != startEnd.value2 || !startEnd.value1)){
							text += val;
							startEnd.value1 = "";
							startEnd.value2 = "";
						}else if(!startEnd.value2 && startEnd.value1){
							startEnd.value2 += val;
						}
						
					}else if(!startEnd.value2){
						startEnd.value1 += this.handleBlock([...[], item2], data, init, settings);
					}
				}
				if(startEnd.value1){
					text += startEnd.value1 + "'";
					startEnd.value1 = "";
				}else{
					text += "'";
				}
			}
			return text;
		},
		handleChangeMethodSettings($main, settings, action, attrData = "gnDataSettings"){
			var string = $main.attr(attrData);
			if(!string) return $main;

			var ctor = new gnReadQuery(),
				obj = ctor.lex(string),
				i = 0;
			while(i < obj.length){
				var item = obj[i++],
					key = (typeof obj[i] === 'object' && obj[i].type === "METHOD" && obj[i].data) || "";
				if(key.indexOf("$") == 0){
					key = key.substring(1);
					// console.log(obj[(i+=2, i)]);
					settings["__"+action][key] = parseInt(obj[(i+=2, i)].data);
					// console.log(settings);
					// console.log($main.data("gnMainContent"));
				}
			}

			return settings;
		},
		readDataHtml($this, $main, data, init, plugin, methodSettings, attrData = "gnData"){
			var string = $this.attr(attrData);
			if(!string) return $this;

			var ctor = new gnReadQuery(),
				obj = ctor.lex(string),
				i = 0;
			while(i < obj.length){
				var item = obj[i++];
				if(item !== 'START') break;
				var key = (typeof obj[i] === 'object' && obj[i].type === "METHOD" && obj[i].data) || "";

				if(key === "initAttr") {
					item = obj[(i += 2, i)].data;
					$this.attr(data[item]);
					i += 3;
					continue;
				}
				
				if(key === "setEvent"){
					item = obj[(i += 2, i)].data;
					i += 3;
					var prefix = "data";
					if(item.indexOf("~") == 0){
						item = item.substring(1);
						prefix = "settings";
					}			
					if(item.indexOf("#") == 0){
						item = item.substring(1);
						prefix = "init";
					}
					
					var val = this.getObject({prefix, data, settings: plugin.options, init, string: item}),
						dataEvent = plugin.event[item];
					$(this.createSelectorByElement($this, ["gnData"]))[dataEvent](function(){
						val({
							_this: this,
							_main: $main
						}, plugin.options, plugin.method); // bị lỗi
					})
					continue;
				}
				let j = ++i,
					array = [];
				while(j < obj.length){
					let item2 = obj[j++];
					if(item2 === 'END') break;
					array = [...array, item2];
				}
				let handleArray = this.handleTreeLexingString(array, data, init, plugin.options);
				eval(`$this[key](${handleArray})`);
				i = j;
			}
			return $this;
		},
		htmlHandle($this, code, init, plugin, methodSettings, state = true, attrData = "gnData"){
			var html = gnShopHtmlStore.store(code),
				htmlOther = gnShopHtmlStore.storeOther(code);
			if(typeof init.data == "object") init.data = Object.keys(init.data).map((item) => init.data[item]); 
			return html.css("display", gnShopHtmlStore.getDisplay(code))
			&& ($this.html("") && init.data.map(item => {
				var frame = html.clone().appendTo($this.selector).removeAttr("gnpluginhtml");
				frame.attr(attrData) && gnLib.readDataHtml(frame, $this, item, init, plugin, methodSettings, attrData).removeAttr(attrData); 
				frame.find(`[${attrData}]`).each(function(){
					gnLib.readDataHtml($(this), $this, item, init, plugin,methodSettings, attrData).removeAttr(attrData);
				}).end().closest(`[${attrData}]`).each(function(){
					gnLib.readDataHtml($(this), $this, item, init, plugin,methodSettings, attrData).removeAttr(attrData);
				});
			}), htmlOther && htmlOther.each(function(i){
				var frame = $(gnShopHtmlStore.getElemData(code)[i]);
				// frame.attr(attrData) && alert('t/est');
				frame.find(`[${attrData}]`).each(function(){
					gnLib.readDataHtml($(this), $this, null, init, plugin,methodSettings, attrData).removeAttr(attrData);
				});
				$(this).css("display", gnShopHtmlStore.getDisplay(code)).removeAttr("gnPluginHtml").html(frame.html());
			}))
			&& $this;
		},
		lowerCases(object){
			// var object = Object.assign({}, object);
			var object = {...object};
			return Object.keys(object).reduce((c, k) => (
				object[k] = (typeof object[k] === "object") ? this.lowerCases(object[k]) : object[k], 
				c[k.toLowerCase()] = object[k], 
				c), 
			{});
		},
		getObject(data){
			// if(data.prefix === "settings") console.log(data);
			var {prefix = "", data = null, settings = null, init = null, string = ""} = data,
				object = this.lowerCases(eval(prefix));
			if(!string) return '';
			var	run = eval("object."+string.toLowerCase());
			return run || (run == '0' ? '0' : '');
		}
	}

	var gnShopHtmlStore = {
		...gnShopHtmlStore,
		getDisplay(key){
			return this[key].display;
		},
		getElemData(key){
			return this[key].elemData;
		},
		set(key, type, value){
			this[key][type] = value;

		},
		store(key){
			this[key].data = this[key].data || $(`[gnPluginHtml="${key}"]`);
			return this[key].data;
		},
		storeOther(key, elem){
			var that = this,
				data = [];
			this[key].elem = this[key].elem || $(`[gnPluginHtml="#${key}"]`);
			this[key].elemData = this[key].elemData || ($(`[gnPluginHtml="#${key}"]`).each(function(){
				data = [...data, $(this).prop("outerHTML")];
			}), data);
			return this[key].elem;
		}
	}

	//////////////////////
	// jQuery.gnShopVal //
	//////////////////////
	/**
	 * Khởi tạo plugin gnShopVal
	 */
	var gnShopVal = function(){
		return {
			init(data, value = null){
				this.data = data;
				this.value = value;
			},
			get(){
				return eval(this.data);
			},
			set(){
				eval(this.data + " = " + this.value);
			}
		}
	}

	$.gnShopVal = function(action, data, value = null){
		var shopVal = new gnShopVal();
		shopVal.init(data, value);
		var doFnc = {
			"get": "get",
			"set": "set"
		}
		if(!action){
			return shopVal;
		}else if (shopVal[doFnc[action]]){
			return shopVal[doFnc[action]]();
		}else{
			$.error( 'Method ' +  action + ' does not exist on jQuery.gnShopVal' );
		}
		
	};

	///////////////////////////////////////////////////////////////////
	// ******************** AVATAR GUNNY HANDLE ******************** //
	///////////////////////////////////////////////////////////////////
	var gnAvatarHandle = {
		...gnAvatarHandle,
	    res: {},
	    imageloaded: {equip: {}, overlay: {}, screenshot: {}, screenshotSkin: {}, skin: {}, equipStatic: {}},
	    interval: {},
	    setPath(){
	    	var {pathChar} = gnShop,
	    		{host} = gnConfig;
	    	this.res = Object.keys(gnAvatarInfo.suit).reduce((obj, key) => {
	    		let suitKey = gnAvatarInfo.suit[key] || 0;
	    		if(key === 'hair'){
	    			if(!suitKey) return {...obj, [key]: {
	    				original: `${host}/equip/${pathChar}/${key}/default/1/B/show.png`,
	    				overlay: `${host}/equip/${pathChar}/${key}/default/2/B/show.png`
	    			}};
	    			let char = (gnAvatarInfo.suit.head && !gnAvatarInfo.hide.head) ? 'A' : 'B';
	    			return {...obj, [key]: {
	    				original: `${host}/equip/${pathChar}/${key}/${suitKey}/1/${char}/show.png`,
	    				overlay: `${host}/equip/${pathChar}/${key}/${suitKey}/2/${char}/show.png`
	    			}};
	    		} else if (key === 'suits' || key === 'wing') {
	    			return obj;
	    		} else if(!suitKey){
	    			return {...obj, [key]: {
	    				original: `${host}/equip/${pathChar}/${key}/default/1/show.png`,
	    				overlay: `${host}/equip/${pathChar}/${key}/default/3/show.png`
	    			}};
	    		} else if (key === 'cloth' || key === 'face'){
	    			return {...obj, [key]: {
	    				...obj.key,
	    				original: `${host}/equip/${pathChar}/${key}/${suitKey}/1/show.png`,
	    				overlay: `${host}/equip/${pathChar}/${key}/${suitKey}/3/show.png`
	    			}};
	    		} else if (suitKey){
	    			if(key === 'head' && !gnAvatarInfo.hide.head){
	    				let pic = gnAvatarInfo.suit.hair || 'default';
	    				obj = {...obj, hair: {
	    					original: `${host}/equip/${pathChar}/hair/${pic}/1/A/show.png`,
	    					overlay: `${host}/equip/${pathChar}/hair/${pic}/2/A/show.png`
	    				}};
	    			}
	    			return {...obj, [key]: {
	    				original: `${host}/equip/${pathChar}/${key}/${suitKey}/1/show.png`,
	    				overlay: `${host}/equip/${pathChar}/${key}/${suitKey}/2/show.png`,
	    			}};
	    		}
	    	}, this.res);
	    	this.res.face.skin = `${host}/equip/${pathChar}/face/${(gnAvatarInfo.suit.face || 'default')}/2/show.png`;
	    	this.res.cloth.skin = `${host}/equip/${pathChar}/cloth/${(gnAvatarInfo.suit.cloth || 'default')}/2/show.png`;
	  		return this;
	    },
	    ImageOriginalFulfilledLoaded: null,
        loadAvatar: null,
	    load(){
	    	console.time('loadAvatar');
	        this.setPath();
	        console.log(this.res);
	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("clearAll");
	        if(!gnAvatarInfo.hide.suits && this.loadSuits()) return this.loadWings();
	        const ImageOverlayFulfilled = (overlay) => Promise.all(
	        	overlay.map(key => 
	        		getImage(this.res[key].overlay, {
	        			key, 
	        			original: this.imageloaded.equip[key]
	        		})
	        	)
	        );
	        const ImageOriginalFulfilled = (original) => Promise.all(
	        	original.map(key => 
	        		getImage(this.res[key].original, {
	        			key
	        		})
	        	)
	        );
	        const ImageOriginal = Object.keys(this.res).filter(key => ["cloth", "hair", "face"].includes(key) || gnAvatarInfo.suit[key]);
	       	this.ImageOriginalFulfilledLoaded = ImageOriginalFulfilled(ImageOriginal);
	       	// Filter ra những equip cần draw
	       	this.ImageOriginalFulfilledLoaded
	       		.then(value => value.reduce((overlay, item) => {
		        		let key = item.key;
		            	this.imageloaded.equip[key] = item;
		            	// tổng hợp các Equip có màu (mảng Overlay)
		            	if(key in gnAvatarInfo.color && gnAvatarInfo.color[key]) return [...overlay, key];
		            	if(key === "face") return overlay;
		            	// nếu Equip không có màu thì vẽ bth
		                gnAvatarDraw.drawStaticObject({ key, original: item }); // tiến hành vẽ
		                return overlay;
		        	}, [])
				)
		        .then(ImageOverlayFulfilled) 
		        .then(value => value.map((item) => {
		        		let key = item.key;
		        		// console.log(item);
		            	this.imageloaded.overlay[key] = item;
		            	// console.log(item.src)
		            	if(key != "face") gnAvatarDraw.drawStaticObjectColor({
	            			key,
		    				overlay: item,
		    				original: item.original
		    			})
		            })
				)
				.then(() => this.loadFaceAnimation())
				.then(() => this.loadSkin())
		        .then(() => {
		        	this.loadWings();
		        	console.timeEnd('loadAvatar');
		        }).catch(rejectFnc);
	        return this;
	    },
	    loadAllObject(){
	    	if(!this.res) this.setPath();
	    	if(gnAvatarInfo.suit.suits && !gnAvatarInfo.hide.suits){
	    		getImage(`${gnConfig.host}/equip/${gnShop.pathChar}/suits/${gnAvatarInfo.suit.suits}/1/show.png`)
	    			.then(img => gnAvatarInfo.ctxStatic.drawImage(img, 0, 0, 255, 342, 50, 10, 120, 162))
	    			.then(() => gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing && gnAvatarDraw.drawStaticAllObject.wings())
	    			.then(() => {
	    				const fncRun = gnAvatarDraw.drawStaticAllObject;
	        			if(gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing) fncRun.wings();
	    				gnAvatarInfo.staticObject.level = 70;
	    				gnAvatarInfo.staticObject.circle = 5;
	    				gnAvatarInfo.staticObject.badge = 10;
	    				gnAvatarInfo.staticObject.vip = 12;
	    				gnAvatarInfo.staticObject.weapon = "boomerang";
	    				fncRun.other().object();
	    			})
	    			.catch(rejectFnc)
	    		return this;
	    	}
	    	if(!this.ImageOriginalFulfilledLoaded) this.ImageOriginalFulfilled();
	        this.ImageOriginalFulfilledLoaded
	        	.then(value => value.map(item => {
			        	let key = item.key;
			        	if(key === "face")
			    			gnAvatarInfo.ctxStatic.drawImage(this.imageloaded.equip[key], 250, 0, 250, 312, 50, 0, 130, 162);
		    			else if(!gnAvatarInfo.hide[key]) 
		    				gnAvatarInfo.ctxStatic.drawImage(this.imageloaded.equip[key], 50, 0, 130, 162);
		        	})
	        	).then(() => {
	        		const fncRun = gnAvatarDraw.drawStaticAllObject;
        			if(gnAvatarInfo.suit.wing && !gnAvatarInfo.hide.wing) fncRun.wings();
    				gnAvatarInfo.staticObject.level = 70;
    				gnAvatarInfo.staticObject.circle = 5;
    				gnAvatarInfo.staticObject.badge = 10;
    				gnAvatarInfo.staticObject.vip = 12;
    				gnAvatarInfo.staticObject.weapon = "boomerang";
    				fncRun.other().object();
	        	})
	        	.catch(rejectFnc)
	        return this;
	    },
	    loadFaceAnimation(key = 'face'){
	    	if(gnAvatarInfo.skinColor) return;

	    	if(gnAvatarInfo.color[key] && this.imageloaded.overlay[key]){
				var img = this.imageloaded.overlay[key];
				return gnAvatarDrawAnimation.drawFace("faceColor", {
    				overlay: img,
                    original: img.original,
                    key
                });
	    	}
    		return gnAvatarDrawAnimation.drawFace("faceOrignal", {
                original: this.imageloaded.equip[key],
                key
            });
	    },
	    loadSkin(){
	        if (gnAvatarInfo.skinColor) {
	        	getImage(this.res.cloth.skin, {original: this.imageloaded.equip.cloth})
	        		.then(img => {
	        			this.imageloaded.skin.cloth = img;
	        			gnAvatarDraw.drawStaticObjectSkin({
		        			key: "cloth",
		        			skin: img,
		        			original: img.original
	        			})
	        		})
	        	getImage(this.res.face.skin, {original: this.imageloaded.equip.face})
	        		.then(img => {
	        			this.imageloaded.skin.face = img;
	        			gnAvatarDrawAnimation.drawFace("faceSkinColor", {
		        			key: "face",
		        			skin: img,
		        			original: img.original
	        			})
	        		})
	        }
	        return this;
	    },
	    loadWings(){
	    	if(gnAvatarInfo.suit.wing){
	    		wingsSetting = new gnAvatarWingAnimation();
	    		wingsSetting.load();
	    	}	
	    	return this;
	    },
	    loadSuits(key="suits"){
	    	if(gnAvatarInfo.suit.suits){
	    		var info = {
	    				key,
	                    dWidth: this.widthObject,
	                    dHeight: this.heightObject,
	                    dx: this.x,
	                    dy: this.y
		        	};
		        this.imageloaded.equip.suits = 
		        	getImage(`${gnConfig.host}/equip/${gnShop.pathChar}/suits/${gnAvatarInfo.suit.suits}/1/show.png`)
		        	.then(img => {
		        		gnAvatarDrawAnimation.drawFace("suits", {
		        			original: img,
		        			...info
	        			})
		        	}, rejectFnc)
		       return this;
	    	}	
	    	return false;
	    }
	}
	var wingsSetting;

	/**
	 * Hàm chứa thông tin nhân vật
	 * @type {Object}
	 */
	var gnAvatarInfo = {
		...gnAvatarInfo,
		// ...gnAvatarInfoDefault,
		ctx: {},
		doc: {},
		canvasWidth: {},
		canvasHeight: {},
		backAvatar: [],
		back: {},
		ctxStatic: null,
		ctxStaticDoc: null,
	}
	gnAvatarInfo.ctxStaticDoc = document.getElementById('image-object-all'); 
	gnAvatarInfo.ctxStatic = gnAvatarInfo.ctxStaticDoc.getContext('2d');
	gnAvatarInfo = $.extend(true, {}, gnAvatarInfo, gnAvatarInfoDefault);

	var gnAvatarDraw = {
	    drawStaticObjectSkin(data){
	    	$(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
	        gnAvatarInfo.ctx[data.key].drawImage(data.skin, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
	        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.skinColor;
	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("fill", {cat: data.key});
	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
	        var imageDoc = new Image;
	        imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
	        imageDoc.onload = function () {
	            gnAvatarHandle.imageloaded.screenshotSkin[data.key] = this;
	        }
	        if (gnAvatarInfo.color[data.key] && gnAvatarInfo.suit[data.key] && gnAvatarHandle.imageloaded.screenshot[data.key])
	            gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshot[data.key], 0, 0);
	        else
	            gnAvatarInfo.ctx[data.key].drawImage(data.original, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
	    },
	    drawStaticObjectColor(data){
	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
	        gnAvatarInfo.ctx[data.key].drawImage(data.overlay, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
	        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.color[data.key];
	        $(`[gnPlugin="gnAvatar"]`).gnAvatar("fill", {cat: data.key});
	        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
	        gnAvatarInfo.ctx[data.key].drawImage(data.original, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
	        
	   		if(data.key === "cloth"){
	   			var imageDoc = new Image;
	            imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
	            imageDoc.onload = function () {
	                gnAvatarHandle.imageloaded.screenshot[data.key] = this;
	                if (gnAvatarInfo.skinColor) {
	                    $(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
	                    gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-over';
	                    gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshotSkin[data.key], 0, 0);
	                    gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
	                    gnAvatarInfo.ctx[data.key].drawImage(this, 0, 0);
	                }
	            }
	   		}
	    },
	    drawStaticObject(data){
	        gnAvatarInfo.ctx[data.key].drawImage(data.original, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
	    },
	    drawStaticAllObject: {
	    	widthDoubleWings: 90,
	    	heightDoubleWings: 120,
	    	widthSingleWings: 170,
	    	heightSingleWings: 140,
	    	other(){
	    		const resOther = {
	    			level: `${gnConfig.host}/equip/level/${gnAvatarInfo.staticObject.level}.png`,
	    			vip: `${gnConfig.host}/equip/vip/${gnAvatarInfo.staticObject.vip}.png`,
	    			badge: `${gnConfig.host}/equip/badge/${gnAvatarInfo.staticObject.badge}/icon.png`,
	    			love: `${gnConfig.host}/equip/icon/${gnAvatarInfo.staticObject.love}.png`,
	    			masPractitioners: `${gnConfig.host}/equip/icon/${gnAvatarInfo.staticObject.masPractitioners}.png`
	    		}
	    		var image, 
	    			that = this;
	    		Object.keys(resOther).reduce((pos, key) => {
	    			if(gnAvatarInfo.staticObject[key] == gnAvatarInfoDefault.staticObject[key]) return pos;
    				image = Object.assign(new Image, {
    					src: resOther[key],
    					onload(){
    						gnAvatarInfo.ctxStatic.drawImage(this, 1, pos, 28, 28);
    					}
    				})
    				return pos += 38;
	    		}, -38);
	    		return this;
	    	},
	    	object(){
	    		const resOther = {
	    			operation: "source-over",
	    			circle: {
	    				src: `${gnConfig.host}/equip/circlelight/${gnAvatarInfo.staticObject.circle}.png`,
	    				dX: 29,
	    				dY: 7,
	    				dWidth: 150,
	    				dHeight: 150,
	    				operation: "destination-over"
	    			},
	    			weapon: {
	    				src: `${gnConfig.host}/equip/arm/${gnAvatarInfo.staticObject.weapon}/1/0/show.png`,
	    				dX: 50,
	    				dY: 0,
	    				dWidth: 130,
	    				dHeight: 162,
	    				operation: "source-over"
	    			}
	    		}
	    		var image;
	    		Object.keys(resOther).map(key => {
	    			if(gnAvatarInfo.staticObject[key] == gnAvatarInfoDefault.staticObject[key]) return;
    				image = Object.assign(new Image, {
    					src: resOther[key].src,
    					onload(){
    						gnAvatarInfo.ctxStatic.globalCompositeOperation = resOther[key].operation;
    						gnAvatarInfo.ctxStatic.drawImage(this, resOther[key].dX, resOther[key].dY, resOther[key].dWidth, resOther[key].dHeight);
    						gnAvatarInfo.ctxStatic.globalCompositeOperation = resOther.operation;
    					}
    				})
	    		});
	    		return this;
	    	},
	    	x: 0,
	    	y: 0,
	    	wings(){
	    		// const wingsSetting = new gnAvatarWingAnimation(); 
	    		const count = Math.ceil(wingsSetting.readSprite.length / 2);
	    		var that = this;
	    		getImage(`${gnConfig.host}/equip/wing/${gnAvatarInfo.suit.wing}/img.png`)
	    			.then(img => {
	    				gnAvatarInfo.ctxStatic.globalCompositeOperation = 'destination-over';
				        let {srcX, srcY, width, height} = wingsSetting.readSprite[count];
				       	if(wingsSetting.wingDouble.indexOf(gnAvatarInfo.suit.wing) >= 0){
					        gnAvatarInfo.ctxStatic.translate(100, 40) // vị trí 1/2 cánh trước
					        gnAvatarInfo.ctxStatic.drawImage(img, srcX, srcY, width, height, 0, 0, that.widthDoubleWings, that.heightDoubleWings)
					        gnAvatarInfo.ctxStatic.scale(-1, 1) // flip horizontally
					        gnAvatarInfo.ctxStatic.drawImage(img, srcX, srcY, width, height, 0, 0, that.widthDoubleWings, that.heightDoubleWings)
					        gnAvatarInfo.ctxStatic.setTransform(1, 0, 0, 1, 0, 0);
				       	}else{
				       		gnAvatarInfo.ctxStatic.translate(0, 0) // vị trí 1/2 cánh trước
					        gnAvatarInfo.ctxStatic.drawImage(img, srcX, srcY, width, height, 0, 0, that.widthSingleWings, that.heightSingleWings)
				       		gnAvatarInfo.ctxStatic.setTransform(1, 0, 0, 1, 0, 0);
				       	}
				        gnAvatarInfo.ctxStatic.globalCompositeOperation = 'source-over';
	    			})
	    		return this;
	    	}
	    }
	}
	// console.log(gnAvatarWingAnimation);
	var gnAvatarWingAnimation = function(){
		return {
			...gnAvatarWingAnimationObject,
			key: "wing",
			readSprite: [],
			get wing(){ return gnAvatarInfo.suit[this.key]; },
			get xmlLink(){ return `${gnConfig.host}/equip/${this.key}/${this.wing}/img.xml`; },
			image: null,
			_image(){
				this.image = new Image;
				this.image.src = `${gnConfig.host}/equip/${this.key}/${this.wing}/img.png`;
				return this;
			},
			ajaxCall(){
				return $.ajax({
		            type: 'GET',
		            url: this.xmlLink,
		            dataType: 'xml',
		        })
			},
			load: function(){
				// var that = this;
				this.ajaxCall()
					.done((xml) => {
						this.readSprite = $(xml).find('SubTexture').map((key, item) => ({
							get srcX(){ return $(item).attr('x') },
							get srcY(){ return $(item).attr('y') },
							get width(){ return $(item).attr('width') },
							get height(){ return $(item).attr('height') }
						}))
						this._image().start();
					})
					.fail((error) => {
						console.log("error");
					});
				return this;
			},
			start(){
				// console.log(gnAvatarWingAnimation);
				clearInterval(gnAvatarHandle.interval[this.typeName]);
				gnAvatarHandle.interval[this.typeName] = setInterval(() => this.draw(), 40)
			},
			get draw(){ return (this.wingDouble.indexOf(this.wing) > -1) ? this.drawWingDouble : this.drawWingSingle; },
			drawWingDouble(){
				$('[gnPlugin="gnAvatar"]').gnAvatar("clear", {cat: this.key});
		        let {srcX, srcY, width, height} = this.readSprite[this.curFrame];
		        if (!this.reverse){
		        	// this.curFrame++;
		            if (++this.curFrame > this.readSprite.length - 1) this.curFrame = this.readSprite.length - 1, this.reverse = true
		        }else{
		        	// this.curFrame--;
		            if (--this.curFrame < 0) this.curFrame = 0, this.reverse = false;
		        }
		        gnAvatarInfo.ctx[this.key].clearRect(0,0,1000,1000);
		        gnAvatarInfo.ctx[this.key].translate(160, 95) // vị trí 1/2 cánh trước
		        gnAvatarInfo.ctx[this.key].drawImage(this.image, srcX, srcY, width, height, this.x, this.y, 90, 120)
		        gnAvatarInfo.ctx[this.key].scale(-1, 1) // flip horizontally
		        gnAvatarInfo.ctx[this.key].drawImage(this.image, srcX, srcY, width, height, this.x, this.y, 90, 120)
		        gnAvatarInfo.ctx[this.key].setTransform(1, 0, 0, 1, 0, 0);
			},
			drawWingSingle(){
        		$('[gnPlugin="gnAvatar"]').gnAvatar("clear", {cat: this.key});
		        let {srcX, srcY, width, height} = this.readSprite[this.curFrame];
		        // this.curFrame++;
		        if (++this.curFrame > this.readSprite.length - 1) this.curFrame = 0;
		        gnAvatarInfo.ctx[this.key].translate(0, 0);
		        gnAvatarInfo.ctx[this.key].drawImage(this.image, srcX, srcY, width, height, this.x, this.y, 280, 190);
		        gnAvatarInfo.ctx[this.key].setTransform(1, 0, 0, 1, 0, 0);
			}
		}
	}

	var gnAvatarDrawAnimation = {
		...gnAvatarDrawAnimation,
	    drawType: {
	    	suits(data, srcX, srcY, widthOnceFrame, heightOnceFrame){
	    		$(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
	    		gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, gnAvatarDrawAnimation.widthOnceFrameSuit, gnAvatarDrawAnimation.heightOnceFrameSuit, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
	    	},
	        faceOrignal(data, srcX, srcY, widthOnceFrame, heightOnceFrame){
	        	$(`[gnPlugin="gnAvatar"]`).gnAvatar("clear", {cat: data.key});
	            gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
	        },
	        faceColor(data, srcX, srcY, widthOnceFrame, heightOnceFrame, count, checkSkin = false){
	        	console.log('test');
	        	var $selector = $(`[gnPlugin="gnAvatar"]`);
	        	$selector.gnAvatar("clear", {cat: data.key});
	            gnAvatarInfo.ctx[data.key].drawImage(data.overlay, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
	            gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
	            gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.color[data.key];
	            $selector.gnAvatar("fill", {cat: data.key});
	            gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
	            gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
	     		gnAvatarHandle.imageloaded.screenshot[data.key] = {
	     			...gnAvatarHandle.imageloaded.screenshot[data.key],
	     			pic: gnAvatarInfo.suit[data.key]
	     		} || {};
	     		var imageDoc = new Image;
		        imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
		        imageDoc.onload = function () {

		            if (!(count in gnAvatarHandle.imageloaded.screenshot[data.key])) 
		            	gnAvatarHandle.imageloaded.screenshot[data.key][count] = this;
		            if (gnAvatarInfo.skinColor && !checkSkin) {
		                $selector.gnAvatar("clear", {cat: data.key});
		                gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-over'
		                gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshotSkin[data.key][count], 0, 0)
		                gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity'
		                gnAvatarInfo.ctx[data.key].drawImage(this, 0, 0)
		            }
		        }
	        },
	        faceSkinColor(data, srcX, srcY, widthOnceFrame, heightOnceFrame, count){
	        	gnAvatarHandle.imageloaded.screenshot[data.key] = gnAvatarHandle.imageloaded.screenshot[data.key] || {};
	        	if(gnAvatarHandle.imageloaded.screenshot[data.key].pic != gnAvatarInfo.suit[data.key]){
	        		gnAvatarHandle.imageloaded.screenshot[data.key] = {};
	        	}
	        	if(gnAvatarInfo.color[data.key] && !(count in gnAvatarHandle.imageloaded.screenshot[data.key])){
	        		this.faceColor({...data, overlay: gnAvatarHandle.imageloaded.overlay[data.key]}, srcX, srcY, widthOnceFrame, heightOnceFrame, count, true);
	        	}
	        	var $selector = $(`[gnPlugin="gnAvatar"]`);
	        	$selector.gnAvatar("clear", {cat: data.key});
		       	gnAvatarInfo.ctx[data.key].drawImage(data.skin, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight);
		        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'source-atop';
		        gnAvatarInfo.ctx[data.key].fillStyle = gnAvatarInfo.skinColor;
		        $selector.gnAvatar("fill", {cat: data.key});
		        gnAvatarInfo.ctx[data.key].globalCompositeOperation = 'luminosity';
		       	gnAvatarHandle.imageloaded.screenshotSkin[data.key] = gnAvatarHandle.imageloaded.screenshotSkin[data.key] || {};
		        if (!(count in gnAvatarHandle.imageloaded.screenshotSkin[data.key])) {
		            var imageDoc = new Image;
		            imageDoc.src = gnAvatarInfo.doc[data.key].toDataURL();
		            imageDoc.onload = function () {
		                gnAvatarHandle.imageloaded.screenshotSkin[data.key][count] = this;
		            }
		        }
		       
		        if (gnAvatarInfo.color[data.key] && gnAvatarHandle.imageloaded.screenshot[data.key].hasOwnProperty(count)) 
		            gnAvatarInfo.ctx[data.key].drawImage(gnAvatarHandle.imageloaded.screenshot[data.key][count], 0, 0)
		        else
		           	gnAvatarInfo.ctx[data.key].drawImage(data.original, srcX, srcY, widthOnceFrame, heightOnceFrame, gnAvatarHandle.dx, gnAvatarHandle.dy, gnAvatarHandle.dWidth, gnAvatarHandle.dHeight)
	        }
	    },
	    drawFace(typeName, data){
	        this.reset();
	        gnAvatarHandle.interval[typeName] = setInterval(() => {
	            this.cEAction++;
	            switch(this.cEAction){
	            	case 1: case 5:
	            		this.drawType[typeName](data, 0, 0, this.widthOnceFrame, this.heightOnceFrame, '0');
	            		break;
	            	case 2: case 4:
	            		this.drawType[typeName](data, 750, 0, this.widthOnceFrame, this.heightOnceFrame, '1');
	            		break;
	            	case 3:
	            		this.drawType[typeName](data, 500, 0, this.widthOnceFrame, this.heightOnceFrame, '2');
	                    this.cEClose++;
	                    break;
	                case 6:
	                	if(this.cEClose == 2)
	                        setTimeout(() => {this.cEAction = 0, this.cEClose = 0}, this.timeDelay);
	                    else
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
	        for (let key in gnAvatarHandle.interval) {
	        	clearInterval(gnAvatarHandle.interval[key])
	        	delete gnAvatarHandle.interval[key];
	        };
	        return this;
	    }
	}

	var gnHtmlHandle = function(){
		return {
			__pluginName: "gnHtmlHandle",
			options: {
				attr: {
					data: "gnData"
				},
				__load: {
					response: null,
					plugin: null,
					key: null,
					methodSettings: null
				}
			},
			compulsory: [],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				let state = true;
				if(this.options.__load.key.indexOf("#") == 0) this.options.__load.key = this.options.__load.key.substring(1), state = false;
				return gnLib.htmlHandle(this.elem, this.options.__load.key, this.options.__load.response, this.options.__load.plugin, this.options.__load.methodSettings, state, this.options.attr.data);
			}
		}
	}

	$.fn.gnHtmlHandle = function(...params){
		return gnLib.handlePlugin("gnHtmlHandle", {
			"load": "load"
		}, this, params)
	}


	var gnAvatar = function(){
		return {
			__pluginName: "gnAvatar",
			options: {
				suit: gnAvatarInfo.suit,
				attr: {
					object: "gnobjectcanvas"
				},
				__read: {canvas},
				__hideAvatar: {
					cat: null
				},
				__showAvatar: {
					cat: null
				},
				__clear: {
					cat: null
				},
				__fill: {
					cat: null
				},
				__clearIntVal: null,
				__clearAll: null,
				__fillAll: null,
				__resetAllObject: null,
				__resetDefaultColor: {
					cat: null
				},
				__resetDefaultObject: {
					cat: null
				},
				__setColor: {
					cat: null,
					hex: null
				},
				__setColorSkin: {
					hex: null
				},
				__setObject: {
					cat: null,
					pic: null
				},
				__addBackAvatar: [],	
				__backAvatar: {
					callback(event, suitResponse){
						gnWrite.frame.removeAll();
						if(suitResponse) Object.keys(suitResponse).map(item => gnWrite.frame.set(suitResponse[item]));
					}
				},
				__gtAvatar: {
					data: {
						gnMale: 1,
						gnFemale: 2
					},
					sGt: null
				},
				__randomAvatar: {
					ajax: "ajaxData/ajaxRandomObject.php",
					postDataArr: ["suitRan", "~ultimate", "~gt"],
					suitRan: ["cloth", "head", "hair", "wing", "eff", "glass", "face"],
					gt: null,
					ultimate: null,
					afterAjaxComplete(event, response, settings, methodSettings, action){
						if(gnLib.errorHandle(response)) return;
						gnWrite.enableFeature();
						let $gnAvatarFrame = $('[gnPlugin="gnAvatarFrame"]');
						gnAvatarInfo.back = {};
						$('[gnPlugin="gnAvatar"]').gnAvatar("resetAllObject");
						$gnAvatarFrame.gnAvatarFrame("removeAll");
						response.data.map(item => {
							gnAvatarInfo.back = {
								...gnAvatarInfo.back,
								[item.cat]: item
							}
							item.removeFocusClass = 'disable';
							$gnAvatarFrame.gnAvatarFrame("set", item);
							$('[gnPlugin="gnAvatar"]').gnAvatar("setObject", item);
						})
						gnAvatarInfo.backAvatar = [...gnAvatarInfo.backAvatar, gnAvatarInfo.back];
						$('[gnPlugin="gnAvatar"]').gnAvatar("load");
					}
				},
				__skinAvatar: {
					color: null
				},
				__colorEquipAvatar: {
					color: null
				},
				__resetColorEquipAvatar: {
					cat: null
				},
				__resetAllColorEquipAvatar: null,
				__loadAllObject: null,
				__removeLastBackAvatar: null
			},
			compulsory: ["__hideAvatar.cat", "__showAvatar.cat", "__clear.cat", "__fill.cat", "__resetDefaultColor.cat", "__resetDefaultObject.cat", "__setColor.cat", "__setObject.cat", "__setObject.pic"],
			init(action, options, element){
				return gnLib.init(this, {action, options, element});
			},
			read(){
				return canvas.map((value, key, array) => {
					gnAvatarInfo.doc[value] = $(`${$(this.elem).selector}[${this.options.attr.object}="${value}"]`)[0];
					gnAvatarInfo.canvasWidth[value] = gnAvatarInfo.doc[value].width;
					gnAvatarInfo.canvasHeight[value] = gnAvatarInfo.doc[value].height;
					gnAvatarInfo.ctx[value] = gnAvatarInfo.doc[value].getContext("2d");
				}) && this.elem;
			},
			loadAllObject(){
				return gnAvatarHandle.loadAllObject() && this.elem;
			},
			load(){
				return gnAvatarHandle.load() && this.elem;
			},
			resetAllObject(){
				gnAvatarInfo.suit = $.extend(true, {}, gnAvatarInfoDefault.suit);
				return this.elem;
			},
			resetDefaultObject(cat){
				var cat = cat || this.options.__resetDefaultObject.cat;
				gnAvatarInfo.suit[cat] = gnAvatarInfoDefault.suit[cat];
				return this.elem;
			},
			resetDefaultColor(cat){
				var cat = cat || this.options.__resetDefaultColor.cat;
				gnAvatarInfo.color[cat] = gnAvatarInfoDefault.color[cat];
				return this.elem;
			},
			resetColorEquipAvatar(cat){
				var cat = cat || this.options.__resetColorEquipAvatar.cat;
				gnAvatarInfo.color[cat] = gnAvatarInfoDefault.color[cat];
				this.load();
				return this.elem;
			},
			resetAllColorEquipAvatar(cat){
				Object.keys(this.res).map(cat => gnAvatarInfo.color[cat] = gnAvatarInfoDefault.color[cat]);
				this.load();
				return this.elem;
			},
			setColor(cat, hex){
				gnAvatarInfo.color[cat || this.options.__setColor.cat] = "#"+(hex || this.options.__setColor.hex);
				return this.elem;
			},
			setColorSkin(hex){
				gnAvatarInfo.skinColor = "#"+(hex || this.options.__setColorSkin.hex);
				return this.elem;
			},
			setObject(cat, pic){
				// console.log(gnAvatarInfoDefault.suit);
				gnAvatarInfo.suit[cat || this.options.__setObject.cat] = pic || this.options.__setObject.pic;
				// console.log(gnAvatarInfoDefault.suit);
				return this.elem;
			},
			hideAvatar(cat){
				var cat = cat || this.options.__hideAvatar.cat;
				gnAvatarInfo.hide[cat] = 1;
				$(gnAvatarInfo.doc[cat]).hide()
				this.load();
				return this.elem;
			},
			showAvatar(cat){
				var cat = cat || this.options.__showAvatar.cat;
				gnAvatarInfo.hide[cat] = 0;
				$(gnAvatarInfo.doc[cat]).show();
				this.load();
				return this.elem;
			},
			clear(cat){
				var cat = cat || this.options.__clear.cat;
				gnAvatarInfo.ctx[cat].clearRect(0, 0, gnAvatarInfo.canvasWidth[cat], gnAvatarInfo.canvasHeight[cat]);
				return this.elem;
			},
			clearIntVal(){
				return gnAvatarDrawAnimation.reset() && this.elem;
			},
			fill(cat){
				var cat = cat || this.options.__fill.cat;
				gnAvatarInfo.ctx[cat].fillRect(0, 0, gnAvatarInfo.canvasWidth[cat], gnAvatarInfo.canvasHeight[cat]);
				return this.elem;
			},
			clearAll(){
				return Object.keys(gnAvatarInfo.ctx).map(cat => this.clear(cat)) && this.clearIntVal() && this.elem;
			},
			fillAll(){
				return Object.keys(gnAvatarInfo.ctx).map(cat => this.fill(cat)) && this.elem;
			},
			addBackAvatar(info){
				var info = info || this.options.__addBackAvatar;
				return gnAvatarInfo.backAvatar.push(info) && this.elem;
			},
			removeLastBackAvatar(){
				return gnAvatarInfo.backAvatar.pop() && this.elem;
			},
			backAvatar(){
				let nearLastPos = gnAvatarInfo.backAvatar.length - 2,
					suit = nearLastPos >= 0 && gnAvatarInfo.backAvatar[nearLastPos],
					callback = this.options.__backAvatar.callback,
					$this = $(this.elem);
				this.removeLastBackAvatar();
				this.resetAllObject();
				if(suit) 
					Object.keys(suit).map(item => this.setObject(item, suit[item].pic))
				this.load();
				if(callback) callback({_main: this.elem}, suit);
				return this.elem;
			},
			randomAvatar(){
				return gnLib.ajaxEvent({
					_main: this.elem,
					_this: this.elem
				}, this.options, this.options["__"+this.method], this.method) && this.elem;
			},
			gtAvatar(sGt){
				var sGt = sGt || this.options.__gtAvatar.sGt,
					method = gnShop.keyword ? "loadSearch" : "loadShop";
			 	gnShop.gt = this.options.__gtAvatar.data[sGt] || 1;
				gnWrite.disableFeature();
				gnWrite.frame.removeAll();
				$('[gnPlugin="gnMainContent"]').gnMainContent(method, {
					page: 1
				}) 
				this.resetAllObject();
				this.load();
				return this.elem;
			},
			skinAvatar(color){
				var color = color || this.options.__skinAvatar.color;
				gnAvatarInfo.skinColor = "#"+color;
				this.load();
				return this.elem;
			},
			colorEquipAvatar(color){
				var frame = $('[gnPlugin="gnAvatarFrame"]').data("gnAvatarFrame"),
					color = color || this.options.__colorEquipAvatar.color;
				$(`[gnPlugin="gnAvatarFrame"].${frame.options.activeClass}.${frame.options.focusClass}`).each(function(){
					let cat = $(this).attr('cat');
					if(cat === "wing" || cat === "suits") return;
					gnAvatarInfo.color[cat] = "#"+color;
				});
				this.load();
			}
		}
	}

	$.fn.gnAvatar = function(...params){
		return gnLib.handlePlugin("gnAvatar", {
			"load": "load",
			"loadAllObject": "loadAllObject",
			"read": "read",
			"hideAvatar": "hideAvatar",
			"showAvatar": "showAvatar",
			"clear": "clear",
			"fill": "fill",
			"clearAll": "clearAll",
			"fillAll": "fillAll",
			"resetAllObject": "resetAllObject",
			"resetDefaultObject": "resetDefaultObject",
			"resetDefaultColor": "resetDefaultColor",
			"setColor": "setColor",
			"setColorSkin": "setColorSkin",
			"setObject": "setObject",
			"addBackAvatar": "addBackAvatar",
			"backAvatar": "backAvatar",
			"gtAvatar": "gtAvatar",
			"randomAvatar": "randomAvatar",
			"skinAvatar": "skinAvatar",
			"colorEquipAvatar": "colorEquipAvatar",
			"resetColorEquipAvatar": "resetColorEquipAvatar",
			"resetAllColorEquipAvatar": "resetAllColorEquipAvatar",
			"removeLastBackAvatar": "removeLastBackAvatar",
		}, this, params, function(data, info){
			if(info.action !== "read" && (!Object.keys(gnAvatarInfo.suit).length || !Object.keys(gnAvatarInfo.ctx).length)) data.read();
			data.options.__addBackAvatar = data.options.__addBackAvatar && [];
		});
	}

	var gnAvatarGt = function(){
		return {
			__pluginName: "gnAvatarGt",
			options: {
				attr: {
					gt: "gnGtText"
				},
				data: {
					gnMale: 1,
					gnFemale: 2
				},
				activeClass: "active",
				__load: {
					gtText: null
				},
				clickEvent(event, settings, action){
				 	let sGt = $(event._this).attr(settings.attr.gt),
				 		method = gnShop.keyword ? "loadSearch" : "loadShop";
				 	$(event._main).removeClass(settings.activeClass);
				 	$(event._this).addClass(settings.activeClass);
				 	gnShop.gt = settings.data[sGt] || 1;
					gnWrite.disableFeature();
					gnWrite.frame.removeAll();
					return $('[gnPlugin="gnMainContent"]').gnMainContent(method, {
						page: 1
					}) 
					// && $('[gnPlugin="gnAvatarFrame"]').gnAvatarFrame("removeAll") 
					&& $('[gnPlugin="gnAvatar"]').gnAvatar("resetAllObject;load");
				}
			},
			compulsory: [],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				var self = this;
				return $(self.elem).off("click").click(function(){
					return self.options.clickEvent({
		                _main: self.elem,
		                _this: this
		            }, self.options, self.method);
				}) && this.elem;
			}
		}
	}

	$.fn.gnAvatarGt = function(...params){
		return gnLib.handlePlugin("gnAvatarGt", {
			"load": "load"
		}, this, params);
	}

	var gnAvatarSkin = function(){
		return {
			__pluginName: "gnAvatarSkin",
			options: {
				inputColor: null,
				__load: {
					clickEvent(event, settings, action){
						var hex = $(settings.inputColor).val();
						// alert('test');
						$("[gnPlugin='gnAvatar']").gnAvatar("setColorSkin;load", {hex});
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
		}
	}

	$.fn.gnAvatarSkin = function(...params){
		return gnLib.handlePlugin("gnAvatarSkin", {
			"load": "load"
		}, this, params);
	}

	var gnAvatarRandom = function(){
		return {
			__pluginName: "gnAvatarRandom",
			options: {
				__load: {
					ajax: "ajaxData/ajaxRandomObject.php",
					postDataArr: ["suitRan", "~ultimate", "~gt"],
					suitRan: ["cloth", "head", "hair", "wing", "eff", "glass", "face"],
					gt: null,
					ultimate: null
				},
				afterAjaxComplete(event, response, settings, methodSettings, action){
					if(gnLib.errorHandle(response)) return;
					gnWrite.enableFeature();
					let $gnAvatarFrame = $('[gnPlugin="gnAvatarFrame"]');
					gnAvatarInfo.back = {};
					$('[gnPlugin="gnAvatar"]').gnAvatar("resetAllObject");
					$gnAvatarFrame.gnAvatarFrame("removeAll");
					
					response.data.map(item => {
						gnAvatarInfo.back = {
							...gnAvatarInfo.back,
							[item.cat]: item
						}
						item.removeFocusClass = 'disable';
						// console.log(item);
						return $gnAvatarFrame.gnAvatarFrame("set", item) 
							&& $('[gnPlugin="gnAvatar"]').gnAvatar("setObject", item)
					})
					let suitCurrent = $gnAvatarFrame.gnAvatarFrame("readAll");
					gnAvatarInfo.backAvatar = [...gnAvatarInfo.backAvatar, gnAvatarInfo.back];
					// $('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;load", suitCurrent);
					$('[gnPlugin="gnAvatar"]').gnAvatar("load");
				},
				clickEvent(event, settings, action){
					return gnLib.ajaxEvent(event, settings, settings["__"+action], action);
				}
			},
			compulsory: [],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				var self = this;
				return $(self.elem).off("click").click(function(){
					return self.options.clickEvent({
		                _main: self.elem,
		                _this: this
		            }, self.options, self.method);
				}) && this.elem;
			}
		}
	}

	$.fn.gnAvatarRandom = function(...params){
		return gnLib.handlePlugin("gnAvatarRandom", {
			"load": "load"
		}, this, params);
	}

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

	$.fn.gnAvatarColor = function(...params){
		return gnLib.handlePlugin("gnAvatarColor", {
			"load": "load",
			"reset": "reset"
		}, this, params);
	}

	var gnAvatarHide = function(){
		return {
			__pluginName: "gnAvatarHide",
			options: {
				attr: {
					object: "gnObjectHide"
				},
				__load: {
					gtText: null
				},
				clickEvent(event, settings, action){
					let $this = $(event._this), 
						cat = $this.attr(settings.attr.object);
					if(!cat || !(cat in gnAvatarInfo.suit)) return;
					let method = ($this.find("input").is(':checked') || $this.is(":checked")) ? "hideAvatar" : "showAvatar";
					return $('[gnPlugin="gnAvatar"]').gnAvatar(method+";load", {cat});
				}
			},
			compulsory: ["attr.object"],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				var self = this;
				return $(self.elem).off("click").click(function(){
					return self.options.clickEvent({
		                _main: self.elem,
		                _this: this
		            }, self.options, self.method);
				}) && self.elem;
			}
		}
	}

	$.fn.gnAvatarHide = function(...params){
		return gnLib.handlePlugin("gnAvatarHide", {
			"load": "load"
		}, this, params);
	}

//#region ShopHandle
	///////////////////////////////////////////////////////////////////
	// ************************ SHOP HANDLE ************************ //
	///////////////////////////////////////////////////////////////////

	var gnItemListCart = function(){
		return {
			__pluginName: "gnItemListCart",
			options: {
				__load: {
					ajax: "ajaxData/ajaxItemListCart.php",
					postDataArr: ["suit", "~gt"],
					suit: gnAvatarInfo.suit,
					gt: null
				},
				afterAjaxComplete(event, response, settings, methodSettings, action){
					if(gnLib.errorHandle(response)) return;
					// console.log(methodSettings);
					$("[gnPlugin='gnItemListCart']").gnHtmlHandle("load", {
						key: "gnItemListCart",
						response,
						plugin: gnItemListCart(),
						methodSettings
					})
				},
				removeClickEvent(event, settings, action){
					var parent = $(event._this).parents("."+settings.recordClass),
						info = {
							cat: parent.attr('cat')
						};
					$('[gnPlugin="gnAvatarFrame"]').gnAvatarFrame("remove", info.cat);
					$('[gnPlugin="gnAvatar"]').gnAvatar("resetDefaultObject;load", info);
				}
			},
			compulsory: [],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method);
			}
		}
	}

	$.fn.gnItemListCart = function(...params){
		return gnLib.handlePlugin("gnItemListCart", {
			"load": "load"
		}, this, params);
	}

	/////////////////////////
	// jQuery.gnPagination //
	/////////////////////////
	var gnPagination = function(){
		return {
			__pluginName: "gnPagination",
			options: {
				areaBtn: "gnBtnPage",
				areaInp: "gnInpPage",
				areaPage: "gnPage",
				catId: null,
				__load: {
					first: null,
					end: null,
					current: null,
					get left(){ return ((this.current == this.first) ? this.first : this.current-1);},
					get right(){ return ((this.current == this.end) ? this.end : this.current+1);},
					get curPage(){ return [this.current, "/", this.end].join("");},
				}
			},
			compulsory: ["__load.first", "__load.end", "__load.current"],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				let $elem = $(this.elem),
					areaInp = $elem.attr(this.options.areaInp);
				if(areaInp){
					$elem.val(this.options.__load[areaInp]);
				}else{
					let area = $elem.attr(this.options.areaBtn); 
					$elem.attr(this.options.areaPage, this.options.__load[area]);
				}
				return this.elem;
			},
			attachEvent(){
				var self = this;
				$(self.elem).off("click").on("click", function(){
					let method = gnShop.keyword ? "loadSearch" : "loadShop";
					$('[gnPlugin="gnMainContent"]').gnMainContent(method, {
						page: parseInt($(this).attr(self.options.areaPage))
					});
				})
			}
		}
	}

	$.fn.gnPagination = function(...params){
		return gnLib.handlePlugin("gnPagination", {
			"load": "load"
		}, this, params, null, true);
	}

	///////////////////////
	// jQuery.gnSearchDw //
	///////////////////////
	
	/**
	 * Khởi tạo plugin gnSearchDw
	 */
	var gnSearchDW = function(){
		return {
			__pluginName: "gnSearchDW",
			options: {
				infoImage: "enable",
				recordClass: "frame",
				__load: {
					ajax: "ajaxData/ajaxSearchDropDown.php",
					postDataArr: ["~keyword", "~gt", "limit", "~ultimate"],
					keyword: null,
					ultimate: null,
					gt: null,
					limit: 6
				},
				afterAjaxComplete(event, response, settings, methodSettings, action){
					if(gnLib.errorHandle(response)) return;
					$("[gnPlugin='gnSearchDW']").attr("keyword", methodSettings.keyword).gnHtmlHandle("load", {
						key: "gnSearchDW",
						response,
						plugin: gnSearchDW(),
						methodSettings
					})
				},
				clickItemEvent(event, settings){
	            	let info = {
		            	cat: $(event._this).attr('cat'),
		            	img: $(event._this).attr('img'),
		            	pic: $(event._this).attr('pic')            
		            }
		            var $frameSelector = $('[gnPlugin="gnAvatarFrame"]');
		           	if(!$frameSelector.gnAvatarFrame("exist", info)){
		            	var suitCurrent = $frameSelector.gnAvatarFrame("removeAllEffect;set;readAll", null, info);
			            $('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;setObject;load", suitCurrent, info);
			            gnWrite.enableFeature();
		            }
	            }
			},
			compulsory: ["__load.ajax"],
			event: {
				"clickItemEvent": "click"
			},
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method);
			},
			attachEvent(){
				var self = this;
				$(self.elem).parent().off("click").on("click", self.options.loadClick, function(){
					gnShop.keyword = $("[gnPlugin='gnSearchDW']").attr("keyword") || gnShop.keyword;
					$('[gnPlugin="gnMainContent"]').gnMainContent("clearMainContent;loadSearch", null, {
				        page: 1,
				        catId: null
				    });
				})
			}
		}
	}

	$.fn.gnSearchDW = function(...params) {
		return gnLib.handlePlugin("gnSearchDW", {
			"load": "load"
		}, this, params);
	};

	//////////////////////
	// jQuery.gnSubMenu //
	//////////////////////
	/**
	 * Khởi tạo plugin gnSubMenu
	 */
	var gnSubMenu = function(){
		return {
			__pluginName: "gnSubMenu",
			options: {
				menuId: null,
				data: $.extend(true, {}, gnShop.menu.data),
	            activeClass: "active",
	            recordClass: "btn",
	            clickItemEvent(event, settings){
	            	$('[gnPlugin="gnSubMenu"]').find('.'+settings.recordClass).removeClass(settings.activeClass);
		            $(event._this).addClass(settings.activeClass);
		            gnShop.catId = parseInt($(event._this).attr('catid'));
		            $('[gnPlugin="gnMainContent"]').gnMainContent("loadShop", {
		                page: 1
		            });
	            }
			},
			compulsory: [],
			event: {
				"clickItemEvent": "click"
			},
			init(action, options, element = null){
				this.options = $.extend(this.options, options);
				this.elem = element;
			},
			load(){
				if(this.options.menuId) gnShop.menuId = this.options.menuId;
				return $(this.elem).gnHtmlHandle("load", {
					key: "gnSubMenu",
					response: this.options.data[gnShop.menuId],
					plugin: this
				})
			},
			reset(data){
				this.options.data = data || $.extend(true, {}, gnShop.menu.data);
				return this.elem;
			}
		}
	}

	$.fn.gnSubMenu = function(...params) {
		return gnLib.handlePlugin("gnSubMenu", {
			"load": "load",
			"reset": "reset"
		}, this, params);
	};

	///////////////////
	// jQuery.gnMenu //
	///////////////////
	/**
	 * Khởi tạo plugin gnMenu
	 */
	var gnMenu = function(){
		return {
			__pluginName: "gnMenu",
			options: {
				data: $.extend(true, {}, gnShop.menu.data),
	            recordClass: "btn",
	            activeClass: "active",
	            clickItemEvent(event, settings){
	            	$('[gnPlugin="gnMenu"]').find('.'+settings.recordClass).removeClass(settings.activeClass);
		            $(event._this).addClass(settings.activeClass);
		            let menuId = $(event._this).attr('menuid');
		            $('[gnPlugin="gnSubMenu"]').gnSubMenu(";load", {menuId});
		            $('[gnPlugin="gnMainContent"]').gnMainContent("clearMainContent;loadShop", null,{
		            	page: 1	            
		            });
	            }
			},
			event: {
				"clickItemEvent": "click"
			},
			init(action, options, element = null){
				this.options = $.extend(this.options, options);
				this.elem = element;
				this.method = action;
				// this.attachEvent();
			},
			load(){
				// console.log(this);
				return $(this.elem).gnHtmlHandle("load", {
					key: "gnMenu",
					response: this.options,
					plugin: this
				})
			},
			reset(data){
				this.options.data = data || $.extend(true, {}, gnShop.menu.data);
				return this.elem;
			},
			rSearch(){
				return $(this.elem).html(shop.html.menuSearch(this.options));
			}
		}
	}

	$.fn.gnMenu = function(...params) {
		return gnLib.handlePlugin("gnMenu", {
			"load": "load",
			"resultSearch": "rSearch",
			"reset": "reset"
		}, this, params);
	};

	//////////////////////
	// jQuery.gnHotItem //
	//////////////////////
	/**
	 * Khởi tạo plugin gnHotItem
	 */
	var gnHotItem = function(){
		return {
			__pluginName: "gnHotItem",
			options: {				
				eventDemo: "enable",
				info: "disable",
				afterAjaxComplete(event, response, methodSettings, settings){
					return gnLib.errorHandle(response) || $('[gnPlugin="gnHotItem"]').gnHtmlHandle("load", {
						key: "gnHotItem", 
						response,
						plugin: gnHotItem(),
						methodSettings
					});
				},
				clickItemEvent(event, settings){
		            let info = {
		            	cat: $(event._this).attr('cat'),
		            	img: $(event._this).attr('img'),
		            	pic: $(event._this).attr('pic')            
		            }
		            var $frameSelector = $('[gnPlugin="gnAvatarFrame"]');
		           	if(!$frameSelector.gnAvatarFrame("exist", info)){
		            	var suitCurrent = $frameSelector.gnAvatarFrame("removeAllEffect;set;readAll", null, info);
			            $('[gnPlugin="gnAvatar"]').gnAvatar("addBackAvatar;setObject;load", suitCurrent, info);
			            gnWrite.enableFeature();
		            }
				},
				__load: {
					ajax: "ajaxData/ajaxHotItem.php",
					postDataArr: ["~gt", "limit"],
					gt: null,
					limit: 6
				}
			},
			compulsory: [],
			event: {
				"clickItemEvent": "click"
			},
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method);
			}
		}
	}

	/**
	 * [Plugin DOM Các Hot Item Gunny]
	 * @param  {object} options [Các thuộc tính cài đặt]
	 * @return {object}         [Các thuộc tính]                  
	 */
	$.fn.gnHotItem = function(...params) {
		return gnLib.handlePlugin("gnHotItem", {
			"load": "load"
		}, this, params);
	};

	//////////////////////////
	// jQuery.gnAvatarFrame //
	//////////////////////////
	/**
	 * Khởi tạo plugin gnAvatarFrame
	 */
	var gnAvatarFrame = function(){
		return {
			__pluginName: "gnAvatarFrame",
			options: {
				__exist: null,
				__set: {
					removeFocusClass: "enable"
				},
				imgClass: "icon",
				htmlEffectAfterClick: "<div class='animate-border-blink'></div>",
				__remove: null,
				activeClass: "active",
				focusClass: "focus",
				attr: {
					cat: "cat",
					img: "img",
					pic: "pic"
				},
			},
			compulsory: [],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			load(){
				var self = this;
				return $('body').off("click").on("click", `${$(self.elem).selector}.${self.options.activeClass}`, function(){
					if($(this).find("."+self.options.imgClass).length){
						let area = $(this).attr(self.options.attr.cat);
						$(self.elem).each(function(){
							$(this).removeClass(self.options.focusClass).find(gnLib.createSelectorByElement($(self.options.htmlEffectAfterClick))).remove();
						})
						
						$(this).addClass(self.options.focusClass).append(self.options.htmlEffectAfterClick);
					}
				}) && self.elem; 
			},
			exist(){
				return this.options.__exist.pic == $(`${$(this.elem).selector}[${this.options.attr.cat}="${this.options.__exist.cat}"]`).attr(this.options.attr.pic) && this.elem;
			},
			readAll(){
				var self = this,
					data = [];
	        	$(`${$(self.elem).selector}.${self.options.activeClass}`).each(function(){
	        		data = [{
		            	cat: $(this).attr(self.options.attr.cat),
		            	img: $(this).attr(self.options.attr.img),
		            	pic: $(this).attr(self.options.attr.pic)            
		            },...data];
	        	});
	        	return data;
			},
			set(){
				if(gnAvatarInfoDefault.frame[this.options.__set.cat]){
					// this.options.__set.removeFocusClass = this.options.__set.removeFocusClass || 'enable';
					if(this.options.__set.removeFocusClass === 'enable') $(`${$(this.elem).selector}`).removeClass(this.options.focusClass);
					return $(`${$(this.elem).selector}[${this.options.attr.cat}="${this.options.__set.cat}"]`)
					.attr(this.options.attr.img, this.options.__set.img)
					.attr(this.options.attr.pic, this.options.__set.pic)
					.addClass(this.options.activeClass+" "+this.options.focusClass)
					.html(gnAvatarInfoDefault.frame[this.options.__set.cat])
					.append($("<div>").css({"background-image": "url("+this.options.__set.img+")", "background-repeat":  "no-repeat"}).addClass(this.options.imgClass))
					.append(this.options.htmlEffectAfterClick) && this.elem;
				}
				return;
			},
			remove(){
				console.log('remove');
				return $(`${$(this.elem).selector}[${this.options.attr.cat}="${this.options.__remove}"]`)
				.removeClass(this.options.activeClass+" "+this.options.focusClass)
				.html(gnAvatarInfoDefault.frame[this.options.__remove])
				.removeAttr(self.options.attr.pic)
				.removeAttr(self.options.attr.img) && this.elem;
			},
			removeAll(){
				var self = this;
				return $(`${$(self.elem).selector}.${self.options.activeClass}`).each(function(){
					let $this = $(this),
						area = $this.attr(self.options.attr.cat);
					$this.removeClass(self.options.activeClass+" "+self.options.focusClass)
					.html(gnAvatarInfoDefault.frame[area])
					.removeAttr(self.options.attr.pic)
					.removeAttr(self.options.attr.img)
				}) && self.elem;
			},
			removeAllEffect(){
				var self = this;
				return $(`${$(self.elem).selector}.${self.options.activeClss}.${self.options.focusClass}`).each(function(){
					let $this = $(this);
					let cat = $this.attr(self.options.attr.cat);
					let style = $this.find("."+self.options.imgClass).attr('style');
					$this.html(gnAvatarInfoDefault.frame[cat]).append($("<div>").attr("style", style).addClass(self.options.imgClass));
				}) && self.elem;
			}
		}
	}
	
	/**
	 * [Plugin DOM Frame Avatar Gunny]
	 * @param  {string} action  [Các action muốn gọi trong plugin]
	 * @param  {object} options [Các thuộc tính cài đặt tương ứng với từng action]
	 * @return {object}         [Tùy từng loại action mà trả về từng thông tin phù hợp]                  
	 */
	$.fn.gnAvatarFrame = function(...params) {
		return gnLib.handlePlugin("gnAvatarFrame", {
			"load": "load",
			"exist": "exist",
			"readAll": "readAll",
			"set": "set",
			"remove": "remove",
			"removeAll": "removeAll",
			"removeAllEffect": "removeAllEffect"
		}, this, params);
	};
	//////////////////////////
	// jQuery.gnMainContent //
	//////////////////////////
	var gnMainContent = function(){
		return {
			__pluginName: "gnMainContent",
			options: {
				activeClass: "active",
				showResultSearch(response, keyword){
					
				},
				// htmlEffectAfterHover: "<div class='animate-border-blink'></div><div class='select-item'><span><img src='"+infoConfig.resourceIcon+"/trywear-icon.png'></span></div>",
				afterAjaxComplete(event, response, settings, methodSettings, action){
					if(gnLib.errorHandle(response)) return;

					$('[gnPlugin="gnMainContent"]').gnHtmlHandle("load", {
						key: "gnMainContent", 
						response,
						plugin: gnMainContent(),
						methodSettings
					})
					$('[gnPlugin="gnPagination"]').gnPagination("load", {
						current: response.current,
						first: 1,
						end: response.end					
					});
					if(action === "loadSearch"){
						this.showResultSearch(response, gnShop.keyword);
						// if(!settings.close.parentClass) settings.close.parentClass = shop.areaClass.subMenu;
						// $(settings.close.parentClass).html("<p id='result-txt'>Từ khóa: " + gnShop.keyword + " - " + response.totalRecord + " kết quả  "+settings.close.html+"</p>");
						// $('[gnPlugin="gnMenu"]').gnMenu("resultSearch");
						// $(shop.areaClass.menu).html("<div class='"+shop.settingDefault.menu.recordClass+" "+shop.settingDefault.menu.activeClass+"'>Search</div>")
					}
				},
				clickItemEvent(event, settings, action){
					if (!$(event._this).parents("."+settings.recordClass).hasClass(settings.activeClass)) {
			            $('.'+settings.recordClass).removeClass(settings.activeClass)
			            $(event._this).parents("."+settings.recordClass).addClass(settings.activeClass)
			        }
		            let info = {
		            	cat: $(event._this).attr('cat'),
		            	img: $(event._this).attr('img'),
		            	pic: $(event._this).attr('pic')            
		            }
		            var $frameSelector = $('[gnPlugin="gnAvatarFrame"]');
		            if(!gnAvatarInfo.back[info.cat] || (gnAvatarInfo.back[info.cat] && gnAvatarInfo.back[info.cat].pic != info.pic)){
		            	gnAvatarInfo.back = {
			            	...gnAvatarInfo.back,
			            	[info.cat]: info
			            };
			            gnAvatarInfo.backAvatar = [...gnAvatarInfo.backAvatar, gnAvatarInfo.back];
			            $('[gnPlugin="gnAvatar"]').gnAvatar("setObject;load", info);
		            	$frameSelector.gnAvatarFrame("removeAllEffect");
			            gnWrite.frame.set(info);
			            gnWrite.enableFeature();
		            }
				},
				__loadShop: {
					ajax: "ajaxData/ajaxData.php",
					postDataArr: ["~catId", "page", "~gt", "limit", "~ultimate"],
					page: 1,
					limit: 8,
					gt: null,
					keyword: null,
					ultimate: null,
					catId: null
				},
				__clearSMenu: null,
				__clearMainContent: null,
				__clearSearch: null,
				__clearAll: null,
				__loadSearch: {
					ajax: "ajaxData/ajaxSearchMainContent.php",
					postDataArr: ["~keyword", "page", "~gt", "limit", "~ultimate"],
					page: 1,
					limit: 8,
					gt: null,
					keyword: null,
					ultimate: null
				}
			},
			event: {
				"clickItemEvent": "click"
			},
			searchOptions: {
				close: {
					parentClass: null,
					btnClass: "btn-close",
					html: "<span class='btn-close filter-btn'>X</span>"
				},
				closeEvent(event, settings, action){
					$('[gnPlugin="gnMainContent"]').gnMainContent("clearAll");
					$('[gnPlugin="gnMenu"]').gnMenu("load");
					$('[gnPlugin="gnSubMenu"]').gnSubMenu("load");
					$('[gnPlugin="gnMainContent"]').gnMainContent("loadShop", {
						page: 1
					});
				},

				__loadSearch: {
					ajax: "ajaxData/ajaxSearchMainContent.php",
					postDataArr: ["~keyword", "page", "~gt", "limit", "~ultimate"],
					page: 1,
					limit: 8,
					gt: null,
					keyword: null,
					ultimate: null
				}
			},
			compulsory: [],
			init(action, options, element = null){
				return gnLib.init(this, {action, options, element});
			},
			clearSMenu(){
				gnShop.menuId = 0;
				return this.elem;
			},
			clearMainContent(){
				gnShop.catId = null;
				return this.elem;
			},
			clearSearch(){
				gnShop.keyword = null;
				return this.elem;
			},
			clearAll(){
				return this.clearSMenu() && this.clearMainContent() && this.clearSearch();
			},
			load(){
				if(this.method === "loadShop") this.clearSearch();
				return gnLib.ajaxEvent({_main: this.elem}, this.options, this.options["__"+this.method], this.method) && this.elem;
			},
			resetShop(){
				$('[gnPlugin="gnMainContent"]').gnMainContent("clearAll");
				// $('[gnPlugin="gnMenu"]').gnMenu("load");
				// $('[gnPlugin="gnSubMenu"]').gnSubMenu("load");
				$('[gnPlugin="gnMainContent"]').gnMainContent("loadShop", {
					page: 1
				});
				return this.elem;
			}
		}
	}
	$.fn.gnMainContent = function(...params) {
		return gnLib.handlePlugin("gnMainContent", {
			"loadShop": "load", 
			"loadSearch": "load",
			"clearSMenu": "clearSMenu",
			"clearMainContent": "clearMainContent",
			"clearSearch": "clearSearch",
			"clearAll": "clearAll",
			"resetShop": "resetShop"
		}, this, params);
	};
//#endregion ShopHandle
}) (jQuery);