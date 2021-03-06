var jQuery = require('jquery');
// import '@/commons/scripts/autoNumeric/autoNumeric.min.js';

(function($) {
	if(typeof this["loxia"] === "undefined"){
		var _g = this;
		this.loxia = {
			SUCCESS : "success",
			ERROR : "error",				
			global : _g,	//global ref
			debug : false, //debug mode switch
			region : '', //default region info
			dateFormat: "dd/mm/yy", //default date format
			timeFormat: "hh:mm:ss",
			pageLock : true, //default page locking after submitting	
			onionPage : undefined, //customer onion page
			windowFeatures : "toolbar=no, menubar=no,scrollbars=yes, resizable=no,location=no, status=no", //default window features
			/* initiate loxia */
			init : function(settings){
				$.extend(this, settings);
                $(document).loxiatip();
				if(this.pageLock)						
						$(document).loxiaonion({layer : this.onionPage});
				this.initContext();
			},
			initContext : function(context){
				if(context === undefined) context = document.body;
				if($(context).attr("loxiaType")) this.initLoxiaWidget(context);
				else{
					$(context).find("div[loxiaType]").each(function(){
						if($(this).parents("div[loxiaType]").length > 0) return;
						loxia.initLoxiaWidget(this);
					});
					$(context).find("[loxiaType]").each(function(){						
						loxia.initLoxiaWidget(this);
					});
				}				
			},
			initLoxiaWidget : function (context){
				if($(context).attr("loxiaType") === "button"){
					this._initButton(context);
				}else
					this.hitch($(context), "loxia" + $(context).attr("loxiaType"))();
			},			
			byId : function(widgetId){				
				var $obj = this.isString(widgetId) ? $("#" + widgetId) : $(widgetId);
				if($obj && $obj.data("loxiaType"))
					return $obj.data($obj.data("loxiaType"));
				return null;
			},
			byCss : function(cssSelector,context){
				var rtnObj = [];
				if(context === undefined) context = document.body;
				$(cssSelector,context).each(function(){
					if($(this).data("loxiaType"))
						rtnObj.push($(this).data($(this).data("loxiaType")));
				});
				return rtnObj;
			},
			_initButton : function(context){
				$(context).removeAttr("loxiaType");
                $(context).button();
				var stricons = $(context).attr("icons");
				if(stricons){
					stricons = stricons.split(",");
					var icons = {primary: stricons[0]};
					if(stricons[1]) icons['secondary'] = stricons[1];
					$(context).button("option","icons", icons);
					
					if($(context).attr("showText")){
						$(context).button("option","text", !($(context).attr("showText") === "false"));
					}
				}					
			},
			/*decide whether object is one string object or not */
			isString: function(obj){
				return typeof obj === "string" || obj instanceof String;
			},
			/*get viewport */
			getViewport : function(){
				var w, h;					 
				// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight			 
				if (typeof window.innerWidth != 'undefined'){
				     w = window.innerWidth, h = window.innerHeight;
				}			 
				// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
				else if (typeof document.documentElement != 'undefined'
				    && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
				      w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
				}			 						 
				else { // older versions of IE		
				      w = document.getElementsByTagName('body')[0].clientWidth, h = document.getElementsByTagName('body')[0].clientHeight;
				}
				return {width : w, height : h};
			},	
			/* center layer in parent body */
			center : function(layer, parent){
				var d = {},top = 0,left = 0,
					scrollLeft = 0,scrollTop = 0;
				if(parent){
					d.width = $(parent).width();
					d.height = $(parent).height();	
				}else{
					d = this.getViewport();
					scrollLeft = $("html").scrollLeft();
					scrollTop = $("html").scrollTop();
				}
				if(parent){
					left = $(parent).offset().left;
					top = $(parent).offset().top;
				}
				$(layer).css({
					position: 'absolute',
					left: (scrollLeft + left + (d.width - $(layer).width())/2) + 'px',
					top: (scrollTop + top + (d.height - $(layer).height())/2) + 'px'
				});
			},
			/* add timestamp for url*/
			getTimeUrl: function(url){
				var iTime=(new Date()).getTime();
				if (url.indexOf("loxiaflag=") >= 0 ){
					url = url.replace(/loxiaflag=\d{13}/, "loxiaflag="+iTime.toString());
					return url ;
				}
				url+=(/\?/.test(url)) ? "&" : "?";
				return (url+"loxiaflag="+iTime.toString());
			},
			/* encode url with timestamp, timestamp is added in default.*/
			encodeUrl: function(url, withTimeStamp){					
			    var index = url.indexOf("?");
			    if (index === -1) 
			    	if(withTimeStamp === undefined || withTimeStamp)
			    		return this.getTimeUrl(url);
			    	else
			    		return url;

			    var result = url.substring(0, index + 1),
			    	params = url.substring(index + 1).split("&");

			    for (var i=0; i < params.length; i++){
			        if (i > 0) result += "&";
			        var param = params[i].split("=");
			        result += param[0] + "=" + encodeURIComponent(param[1]);
			    }
			    if(withTimeStamp === undefined || withTimeStamp)
			    	result = this.getTimeUrl(result);
			    return result;
			},		
			/*i18n support*/
			getLocaleMsg: function(msg, args){
				var localeMsg = this.regional[this.region][msg];
				if(localeMsg === undefined || localeMsg === null)
					localeMsg = this.regional[this.region][''];
				if(localeMsg === undefined || localeMsg === null) return msg;
				if(!args)
					return localeMsg;
				if(!$.isArray(args))
					args = [args];
				
				var params = localeMsg.match(/\{\d+\}/ig);
				if(!params || params.length === 0) return localeMsg;
				localeMsg = localeMsg.replace(/\{\d+\}/ig,"#");
				for(var i=0; i< params.length; i++){
					var index = parseInt(params[i].replace(/\{/,"").replace(/\}/,""));
					localeMsg = localeMsg.replace(/\#/,(args[index] != undefined && args[index] != null)? "" + args[index] : "");
				}
				return localeMsg;
			},
			
			getCurrentLocale: function(){
				if(this.region)
					return this.region;
				
				return "in_ID";
			},
			
			getCurrentLocaleForJSNative: function(){
				
				var jsNativeLocate = "en-US";
				
				if(this.region){
					
					if(this.region === "in_ID")
						jsNativeLocate = "id-ID"; 
					
					return jsNativeLocate;
				}
				
				return "in_ID";
			},
			
			/*get value from object*/
			getObject: function(propName, context){
				context = context || _g;
				var parts = propName.split(".");			
				for(var i=0, pn; context &&(pn = parts[i]); i++){
					context = (pn in context ? context[pn] : undefined);
				}
				return context;
			},
			/*set value to object*/
			setObject: function(propName, value, context){
				context = context || _g;
				var parts = propName.split(".");	
				var p = parts.pop();
				for(var i=0, pn; context &&(pn = parts[i]); i++){
					context = (pn in context ? context[pn] : context[pn]={});
				}
				return (context && p ? (context[p]=value) : undefined);
			},
			/*invoke method with given scope*/
			hitch : function(scope, method){
				if(!method){
					method = scope;
					scope = null;
				}
				if(this.isString(method)){
					scope = scope || _g;
					if(!scope[method]){ throw(['hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
					return function(){ return scope[method].apply(scope, arguments || []); }; // Function
				}
				return !scope ? method : function(){ return method.apply(scope, arguments || []); };
			},
			/*used in building ajax data object from one form*/
			_ajaxSetValue : function(obj, name, value){
				if(value === null) return;
				var val = obj[name];
				if(this.isString(val)){
					obj[name] = [val, value];
				}else if($.isArray(val)){
					obj[name].push(value);
				}else{
					obj[name] = value;
				}
			},
			/*used in building ajax data object from one form*/
			_ajaxFieldValue : function(domNode){
				var ret = null,
					type = (domNode.type||"").toLowerCase();
				if(domNode.name && type && !domNode.disabled){
					if(type === "radio" || type === "checkbox"){
							if(domNode.checked){ ret = domNode.value }
					}else if(domNode.multiple){
						ret = [];
						$("option",domNode).each(function(){
							if(this.selected)
								ret.push(this.value);
						});
					}else{
						ret = domNode.value;
					}
				}
				return ret;
			},
            _getForm: function(form){
                var f = form;
                if(this.isString(form)){
                    f = $("#"+form);
                    if(f.length ==0)
                        f = $("form[name='" + form +"']");
                }
                return (f instanceof jQuery)? f.get(0):f;
            },

			/*used in building ajax data object from one form*/
			_ajaxFormToObj : function (form){
                form = this._getForm(form);
                if(!form) return {};
				var ret = {},_this = this,
					exclude = "file|submit|image|reset|button|";
				$.each(form.elements,function(i,e){
					var name = e.name,
					type = (e.type||"").toLowerCase();
					if(name && type && exclude.indexOf(type) === -1 && !e.disabled){
						_this._ajaxSetValue(ret, name, _this._ajaxFieldValue(e));
					}
				});
				return ret;
			},
			/*compose ajax call options*/
			_ajaxOptions : function(url, data, args){
				var options = {};
				if(arguments.length === 1)
					options = url;
				else{
					options = args || {};						
					options["url"] = url;
					if(data){
						if(this.isString(data)||$(data).is("form")){
							//data is a form
							$.extend(options, {data: this._ajaxFormToObj(data)});
						}else
							$.extend(options,{data: data});
					}
				}
				//console.dir(options);
				return options;
			},
			/*ajax call
			 * url ajax call url
			 * data data object or form id
			 * args other options*/
			asyncXhr : function(url, data, args){
				$.ajax(this._ajaxOptions(url, data, args));
			},
			/*ajax call with GET type*/
			asyncXhrGet : function(url, data, args){
				var options = this._ajaxOptions(url, data, args);
				options["type"] = "GET";
				$.ajax(options);
			},
			/*ajax call with POST type*/
			asyncXhrPost : function(url, data, args){
				var options = this._ajaxOptions(url, data, args);
				options["type"] = "POST";
				$.ajax(options);
			},				
			/*ajax sync call*/
			syncXhr : function(url, data, args){
				var _data, options = this._ajaxOptions(url, data, args);
				$.extend(options,{
					async : false,
					success : function(data, textStatus){
						_data = data;
					},
					error : args.error? args.error: function(XMLHttpRequest, textStatus, errorThrown){
						_data = {};
						var exception = {};
						exception["message"] = "Error occurs when fetching data from url:" + this.url;
						exception["cause"] = textStatus? textStatus : errorThrown;
						_data["exception"] = exception;
					}
				});
				$.ajax(options);
				//console.dir(_data);
				return _data;
			},
			/*ajax sync call with GET type*/
			syncXhrGet : function(url, data, args){
				if(arguments.length === 1)
					url["type"] = "GET";
				else{
					args = $.extend({},args,{type:"GET"});
				}
				return this.syncXhr(url, data, args);
			},
			/*ajax sync call with POST type*/
			syncXhrPost : function(url, data, args){
				if(arguments.length === 1)
					url["type"] = "POST";
				else{
					args = $.extend({},args,{type:"POST"});
				}
				return this.syncXhr(url, data, args);
			},
			/*decide whether page is locked or not*/
			isLocked : function(){
				if(this.pageLock){
					var onion = $(document).data("ui-loxiaonion");
					return onion.isShown;
				}
				return false;
			},
			/*lock page to prevent duplicate submit*/
			lockPage : function(){
				if(this.pageLock){
					var onion = $(document).data("ui-loxiaonion");
					onion.show();
				}
			},
			/*unlock page*/
			unlockPage : function(){
				if(this.pageLock && this.isLocked()){
					var onion = $(document).data("ui-loxiaonion");
					onion.hide();
				}
			},
			tip : function(obj, message){
                if(obj && message)
                    $(document).loxiatip("show",obj, message);
                else
                    $(document).loxiatip("hide");
			},
			/*open an new page*/
			openPage : function(url, target, features, size){
				target = target || "_blank";
				features = features || this.windowFeatures;					
				
				if(size && size.length && size.length === 2){
					features = 'width=' + size[0] + ',height=' + size[1] + ',' + features;
				}
				
				return window.open(this.encodeUrl(url) ,target,features);
			},
			/*get value from the obj(widget, domNode)*/
			val : function(obj, value){
				if(obj === undefined) return null;
				var inputObj = $(obj).is("input,select,textarea") ? obj : $(obj).find("input,select,textarea").get(0);
				if(inputObj){
					if(this.isWidget(inputObj)){
						var baseClass = $(inputObj).data("loxiaType");
						if(baseClass){
							if(value)
								$(inputObj).data(baseClass).val(value);
							else
								return $(inputObj).data(baseClass).val();
						}
					}else{
						if(value)
							$(inputObj).val(value);
						else
							return $(inputObj).val();
					}
				}else{
					if(value)
						$(obj).text(value);
					else
						return $(obj).text();
				}				
			},
			/*check form's validity*/
			validateForm : function(form){
                form = this._getForm(form);
				var errorMsg = [],fieldErrorNums = 0;
				
				$.each(this.byCss("input:enabled,select:enabled,textarea:enabled", form),function(index,widget){					
					if(widget.state() === null) widget.check();
					fieldErrorNums += (widget.state()?0:1);
				});				
				
				$.each(this.byCss("input.ui-loxia-money", form),function(index,widget){					
					this.element[0].value = this.element.val();
				});	
				 
				if(fieldErrorNums > 0){
					//errorMsg.push(this.getLocaleMsg("VALIDATE_FORM_ERROR"));
					errorMsg.push(this.getLocaleMsg("VALIDATE_FIELD_ERROR",[fieldErrorNums]));
					return errorMsg;
				}
				
				var formValidateMethod = $(form).attr("validate");
				if(!formValidateMethod){
					formValidateMethod = $(form).attr("name") + "Validate";
				}
				if(_g[formValidateMethod] && $.isFunction(_g[formValidateMethod])){
					var ret = this.hitch(_g[formValidateMethod])(form);
					if(ret != this.SUCCESS){
						//errorMsg.push(this.getLocaleMsg("VALIDATE_FORM_ERROR"));
						if($.isArray(ret)){
							$.each(ret,function(i,v){errorMsg.push(v);});
						}else
							errorMsg.push(ret);				
					}
				}
				return errorMsg;
			},
			/*submit form with form check*/
			submitForm : function(form){
                form = this._getForm(form);
				var errorMsg = this.validateForm(form);
				if(errorMsg.length === 0){
					//success
					form.submit();
				}else{
					//show errors	
					$("body").trigger("formvalidatefailed", [[errorMsg,form]]);
				}
			},
			/*decide whether it is one loxia widget*/
			isWidget : function(context){
				return !!$(context).data("loxiaType");
			},
			/*common log*/
			log : function(msg){
				if(!this.debug) return;
				if(_g.console){
					_g.console.log(msg);
				}else
					alert(msg.outerHTML ? "Dom Object: " + msg.outerHTML : msg);
			}
		};
		/*loxia widgets default settings*/
		loxia.defaults = {
			required: false,
			lastRightValue : undefined,
			checkmaster : "",
			state : null,
			errorMessage : null
		};
		/*i18n messages*/
		loxia.regional = [];
		/*default i18n messages*/
		loxia.regional[''] = {
			INVALID_EMPTY_DATA : "Mandatory field",
			INVALID_DATA : "Invalid input",
			INVALID_NUMBER : "Input is not a valid number",
			INVALID_DATE : "Input is not a valid date",
			DATA_EXCEED_RANGE : "Input data exceeds range",
			
			VALIDATE_FIELD_ERROR : "{0} field error(s) found.",
			VALIDATE_FORM_ERROR : "Form validation failed:",

            VALIDATE_ERROR : "{0} field error(s) found.",

            TABLE_BARBTN_ADD : "Add",
            TABLE_BARBTN_DELETE : "Delete",
            TABLE_LOAD_ERROR : "Table Data loading error, please contact Administrator.",

            LABEL_OK : "OK",
            LABEL_CANCEL : "Cancel",
            LABEL_REFRESH : "Refresh",
            LABEL_PAGE_FIRST: "First Page",
            LABEL_PAGE_LAST: "Last Page",
            LABEL_PAGE_PREV: "Prev",
            LABEL_PAGE_NEXT: "Next",
            LABEL_PAGE_GOTO: "GO",
            LABEL_PAGE_INFO: "{0} Pages, {1} Records",
            LABEL_PAGE_COUNT: "Pages",
            LABEL_RECORD_COUNT: "Records"
		};
		
		loxia.loxiaWidget = {		
			_setValue : function(value){return this.element.val(value)}, //can be overridden
			_getValue : function(){return this.element.val()},
			_setOption: function( key, value ) {
				$.Widget.prototype._setOption.apply( this, arguments );				
				if(key === "readonly"){
					if(value)
						this.element.attr("readonly","readonly");
					else
						this.element.removeAttr("readonly");
				}else if(key === "disabled"){
					if(value)
						this.element.attr("disabled","disabled");
					else
						this.element.removeAttr("disabled");
				}
			},
			_initWidget : function(){
				this.element.data("loxiaType", "ui-" + this.widgetName);
				this.element.removeAttr("loxiaType");
				
				this.element.addClass("ui-loxia-default ui-corner-all");
				
				this.option("required", (this.element.attr("mandatory") === "true"));
				if(this.option("required"))
					this.element.addClass("ui-loxia-highlight");
				this.option("disabled", !!this.element.attr("disabled"));
				this.option("select", (this.element.attr("selectonfocus") === "true"));
				this.option("lastRightValue", this.element.val()?this.element.val():null);
				this.option("readonly", !!this.element.attr("readonly"));
				
				this.option("checkmaster",this.element.attr("checkmaster") || "");
			},
			val : function(value){
				if(value != undefined){
					this._setValue(value);
					var result = this.check();					
					return this;
				}else
					return this.option("lastRightValue");
			},
			setReadonly : function(state){
				this._setOption("readonly", state);
			},
			setEnable : function(state){
				this._setOption("disabled", !state);
				if(!state)
					this.state(null);
			},
			state : function(st, msg){
				if(st === undefined){
					if(this.option("state") === undefined) return null;
					return this.option("state");
				}else if(st === null || !!st){
					//clear state or set state to true
					this.option("state", st === null? null : !!st);
					this.option("errorMessage", null);
					this.element.removeClass("ui-loxia-error");
					//clear state
					if(st === null)
						this.option("lastRightValue", null);
				}else{
					//set error state
					this.option("state", false);
					this.option("errorMessage", msg);
					this.element.addClass("ui-loxia-error");
				}
			},
			check : function(){
				this.option("state", null);
				this.option("errorMessage", null);
				var value = this._getValue();
				if(this.option("required") && value === ""){
					this.state(false, loxia.getLocaleMsg("INVALID_EMPTY_DATA"));
					return false;
				}
				if(value === this.val()){
					this.state(true);
					return true;
				}
					
				if(this.option("checkmaster")){					
					var cms = this.option("checkmaster").split(",");
					var executed = {};
					for(var cm,i=0; cm=cms[i]; i++){
						if(cm in executed) continue;
						executed[cm] = cm;
						var result = loxia.hitch(cm)(value,this);
						if(result.indexOf(loxia.SUCCESS) != 0){
							this.state(false, result);
							return false;
						}
						if(result.length > 8){
							//set the formatted value
							value = result.substring(8);
							this._setValue(value);
						}
					}
				}
				this.state(true);
				this.option("lastRightValue", value);
				this.element.trigger("valuechanged", [value]);
				return true;
			}
		};
	}
	
	checkLoxiaMoney = function(value, obj){
		var value = $.trim(value);
		if(!value) return loxia.SUCCESS;
		var prefix = value.charAt(0);
		if(prefix === "+" || prefix === "-"){
			value = value.substring(1);
		}else
			prefix = "";
		value = value.replace(/^(0(?=\d))+/,"");
		
		var decimal = obj.option("decimal");
		var regex = new RegExp("^\\d+$");
		if(decimal){
			if(decimal > 0)
				regex = new RegExp("^\\d+\\.?\\d{0," + decimal + "}$");
			else
				regex = new RegExp("^\\d+\\.?\\d*$");
		}else{
			decimal = 0;				
		}
		if(!regex.test(value))
			return loxia.getLocaleMsg("INVALID_NUMBER");
		
		value = value.replace(/^\./,"0.");
		value = value.replace(/\.$/,".0");
		value = prefix + value;
		
		var v = parseFloat(value),
			min = obj.option("min"),
			max = obj.option("max");
		if((min != undefined && v < min) || (max != undefined && v > max))
			return loxia.getLocaleMsg("DATA_EXCEED_RANGE");
		
		if(decimal)
			return loxia.SUCCESS + "^" + v.toFixed(decimal);
		else
			return loxia.SUCCESS;
	};
	
	checkLoxiaNumber = function(value, obj){
		var value = $.trim(value);
		if(!value) return loxia.SUCCESS;
		var prefix = value.charAt(0);
		if(prefix === "+" || prefix === "-"){
			value = value.substring(1);
		}else
			prefix = "";
		value = value.replace(/^(0(?=\d))+/,"");
		
		var decimal = obj.option("decimal");
		var regex = new RegExp("^\\d+$");
		if(decimal){
			if(decimal > 0)
				regex = new RegExp("^\\d+\\.?\\d{0," + decimal + "}$");
			else
				regex = new RegExp("^\\d+\\.?\\d*$");
		}else{
			decimal = 0;				
		}
		if(!regex.test(value))
			return loxia.getLocaleMsg("INVALID_NUMBER");
		
		value = value.replace(/^\./,"0.");
		value = value.replace(/\.$/,".0");
		value = prefix + value;
		
		var v = parseFloat(value),
			min = obj.option("min"),
			max = obj.option("max");
		if((min != undefined && v < min) || (max != undefined && v > max))
			return loxia.getLocaleMsg("DATA_EXCEED_RANGE");
		
		if(decimal)
			return loxia.SUCCESS + "^" + v.toFixed(decimal);
		else
			return loxia.SUCCESS;
	};
	/*need jquery ui datepicker*/
	checkLoxiaDate = function(value,obj){
        var value = $.trim(value);
        if(!value) return loxia.SUCCESS;
		try{
			var inst = $.datepicker._getInst(obj.element[0]),
			tp_inst = $.datepicker._get(inst, 'timepicker');
			var currDate = $.datepicker.parseDate(loxia.dateFormat,value),
			minDate = obj.option("min"),
			maxDate = obj.option("max"),
			timeStr = '';

			if(tp_inst){
				currDate.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second);
				tp_inst._formatTime();
				timeStr = tp_inst._defaults.separator + tp_inst.formattedTime;
			}		
			if((minDate && currDate < minDate) ||
					(maxDate && currDate > maxDate))
				return loxia.getLocaleMsg("DATA_EXCEED_RANGE");
		}catch(e){
			return loxia.getLocaleMsg("INVALID_DATE");
		}				
		return loxia.SUCCESS + "^" + $.datepicker.formatDate(loxia.dateFormat,currDate) + timeStr;
	};
		
	var onion = {
		defaultOnion: '<div class="loxiaOnion"><div class="ui-widget-overlay"></div><div class="inner ui-corner-all"><span>LOADING...</span></div></div>',
		isShown: false,
		_create : function(){
			this.onionPage = $(this.defaultOnion).appendTo('body');
			if(this.options.layer){
				$(".inner", this.onionPage.get(0)).replaceWith($(this.options.layer).addClass("inner"));
			}
			
			this.onionPage.hide();
		},
		
		_layout : function(){
			$(".loxiaOnion .ui-widget-overlay").css({
				left : $("html").scrollLeft(),
				top : $("html").scrollTop()
			});
			loxia.center($(".loxiaOnion .inner").get(0));
		},
		
		show : function(){
			if(this.isShown) return;	
			this.onionPage.show();
			this._layout();
			$(window).bind("scroll", this._layout);
			this.isShown = true;
		},
		
		hide : function(){
			$(window).unbind("scroll", this._layout);
			this.onionPage.hide();
			this.isShown = false;
		},
		
		destory : function(){
			this.onionPage.remove();
		}
	};
	$.widget("ui.loxiaonion", onion); 
	$.ui.loxiaonion.prototype.options = {};

    var tooltip = {
        defaultTipDiv : '<div class="loxiaTip" style="position:absolute;z-index:10006"><div class="arrow"></div>' +
            '<div class="inner ui-corner-all"  style="padding: .3em .7em; width: auto;"></div></div>',
        tpSide : 't',
        isShown: false,
        _create : function(){
        	
            this.tipDiv = $(this.defaultTipDiv).appendTo('body');
            this.tipDiv.hide();
        },
        show : function(obj, message){
            //console.log("show [" + message + "]");
            this.tipDiv.find(".inner").html(message);

            var arrowDiv = this.tipDiv.removeClass("loxiaTip-l loxiaTip-r loxiaTip-t loxiaTip-b").
                addClass("loxiaTip-"+this.tpSide).find(".arrow")
                , tipDivWidth = this.tipDiv.width()
                , arrowDivLeft = (tipDivWidth - 8)/2;
            	
            arrowDiv.css('left', arrowDivLeft);
            
            this.tipDiv.css({
                opacity: 0
            });
            this.tipDiv.show();
            
            this.tipDiv.position({my:"right top-21", at:"right top", of: obj});
            // if shadow, position fixed
            if($(obj).attr("shadow")){
            	this.tipDiv.css("position", "fixed");
            }
            
            var p = this.tipDiv.position();
            this.tipDiv.animate({opacity : 1,
                left : p.left ,
                top : p.top - 8}, "fast");
            this.isShown = true;
        },
        hide : function(){
            this.tipDiv.hide();
            this.isShown = false;
        },

        destory : function(){
            this.tipDiv.remove();
        }
    };
    $.widget("ui.loxiatip", tooltip);
    $.ui.loxiatip.prototype.options = {};
})(jQuery);