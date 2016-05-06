steel.d("common/form/verify", ["utils/kit/dom/parents","utils/kit/dom/parseDOM","ui/alert","common/form/regular"],function(require, exports, module) {
/**
 * 表单添加绑定事件（focus、blur、upload）返回
 * @id 
 * @param {Object} box form的页面范围
 * @param {Object} rlues 验证范围
 * @return {Object} 实例
 * @author kongbo | kongbo@staff.sina.com.cn v2.1
 * 添加button按钮，submit及其他
 * @example
 * 
 * 
 * <input type="text" value="" name="title" class="W_input ev_input" 
 * defval="默认显示文字" //for兼容ie6/7（ie6/7 getAttribute('placeholder')=null）,ie7+浏览器使用placeholder
 * vmax/vmin="10"		//最大/最小字数
 * tip="tipids"			//显示提示错误的 tipid
 * autocut="max=10&rule=截取应用的规则"//自动截取rule可在rule参数中添加
 * get="/aj/get/request"
 * post="/aj/post/request"
 * verify=""
 * 按钮：	button=submit|reset
 * 默认：	focusval=focus默认显示文字&
 * 			focusval	focus时默认文案
 * 验证：	acttype=notEmpty|max&errmsg=请输入活动标题||标题不能超过30个字&sucmsg=true&tipmsg=给你的活动起一个好名字
 * 			acttype		blur触发的事件（|）分割(common.form.regular)
 *			errmsg		错误提示信息（||）分割
 *			tipmsg		提示问案
 *			sucmsg		显示正确提示信息 true(无文字)
 * >
 * 
 * <div tipid="tipids">显示提示信息</div>
 * tip="tipids" vmax="10" verify="acttype=notEmpty|max&errmsg=请输入活动标题||标题不能超过10个字"
 * return:
 *  that.fire(el,isfocus)	//可用于触发focus|blur事件;el(提示元素||提示元素tip值)
 *  that.json(true)			//当前表单内容，有错误返回false,true滚动到最顶出错标签的位置
 *  that.clearTip			//清除所有提示
 *  that.tips(el,opts)		//提示信息;el(提示元素||提示元素tip值)opts(msg 提示信息,type 1/error 2/success 3/tips 4/loading def/null)
 *  that.setDef				//设置默认值，insertHTML或innerHTML后需要操作
 *  that.tipMsg=function	//编辑提示信息返回格式;
 * 
 * @example
 * $.common.form.verify(node,
 		{
 			rules:{
 				newRule:function(el){
					return true//发生错误
 				},
 			},
			//getTip不存在按照唯一弹层方式进行
			getTip: 'dl span[errTip]'||function(el){
				return showerr Tipid Dom
			},
			tipTemp: function(msg, type){
				return msg;
			},
			showTip: true,
			forceCheck: true  //强制check，包括disable和hidden的
 		});
 * 
 */

require("utils/kit/dom/parents");
require("utils/kit/dom/parseDOM");
require("ui/alert");
require("common/form/regular");

STK.register('common.form.verify', function($){

	//+++ 常量定义区 ++++++++++++++++++
	var hoverColor = '#ACACAC';
	//-------------------------------------------
	
	return function( box, conf){
		var rules, that = {};

		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:[],//组件容器
			errNodes: [],
			DOM_eventFun: {//DOM事件行为容器
				
			},
			//addEvent 方法添加 useCapture 参数，代理focus blur时使用
			addEvent : function(sNode, sEventType, oFunc,useCapture ) {
				var oElement = $.E(sNode);
				if(oElement == null) {
					return false;
				}
				sEventType = sEventType || 'click';
				if(( typeof oFunc).toLowerCase() != "function") {
					return;
				}
				if(oElement.attachEvent) {
					oElement.attachEvent('on' + sEventType, oFunc);
				} else if(oElement.addEventListener) {
					oElement.addEventListener(sEventType, oFunc, useCapture);
				} else {
					oElement['on' + sEventType] = oFunc;
				}
				return true;
			},
			tipTemp : function(mes, type){
				var _mes = '';
				switch (type) {
					case 1:
						_mes = '<div class="content layer_mini_info"><p class="main_txt"><i class="W_icon icon_rederrorS"></i><span class="txt S_txt1">' + mes + '</span><a class="W_ficon ficon_close S_ficon" action-type="floatTip">X</a></p><div class="W_layer_arrow"><span class="W_arrow_bor W_arrow_bor_b"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div>';
						break;
					case 2:
						_mes = '<div class="M_notice_succ"><span class="icon_succ"></span><span class="txt">'+(mes=='true'?'':mes)+'</span></div>';
						break;
					case 3:
						_mes = '<div class="M_notice_warn"><span class="icon_warn"></span><span class="txt">' + mes + '</span></div>';
						break;
					case 4:
						_mes = $L('<div class="M_notice_warn">loading...</div>');
						break;
				}
				return _mes;
			},
			/**
			 * 显示提示信息
			 * @param {Object} el 提示元素||提示元素tip值
			 * @param {String} opts{
			 * 					msg 提示信息
			 * 					type 1/error 2/success 3/tips 4/loading def/null 
			 * 					all ture	全局检测
			 */
			tips : function(el, opts){
				opts = opts || {};
				var _obj = _this.tipFun.getTip(el);
				if(!_obj){
					// $.log('没有找到对应的dom:'+el);
					return true;
				}
				!opts.type && (opts.msg = null);
				if(!_this.floatTip && opts.all){//全部验证时操作信息叠加
					opts.baseType = opts.type;
					var _newMsg = (opts.msg == 'true' && opts.type == 2)?'':opts.msg;
					_newMsg = _this.tipFun.addMsg(_newMsg,_obj.innerHTML);
					opts.type = _newMsg?1:opts.type;
					opts.msg = _newMsg?_newMsg:opts.msg;
				}
				_obj.innerHTML = opts.msg?_this.tipTemp(opts.msg, opts.type):'';
				_obj.style.display = opts.msg?'':'none';
				opts.dom = el;
				opts.tipDom = _obj;
				if(_this.floatTip){
					//定位
					var _pos = $.position(el);
					var _size = $.core.dom.getSize(_this.floatTip);
					_this.floatTip.style.left = _pos.l + 'px';
					_this.floatTip.style.top = (_pos.t - _size.height - 10) + 'px';
				}
				$.custEvent.fire(that, 'tips', opts);
			},
			//属性方法区
			tipFun: {
				allTips: function(box){
					var _tips = {},
						_tip = $.sizzle('[tipid]');
					$.core.arr.foreach(_tip,function(k,i){
						_tips[k.getAttribute('tipid')] = k;
					});
					return _tips;
				},
				addMsg: function(msg,oldMsg){
					//全部检测时 提示错误文案自动叠加 + ‘ | ’
					oldMsg = $.core.str.trim(oldMsg.replace(/<.+?>|◆/g,''));
					if(!msg){return oldMsg;}
					if(oldMsg){
						var hasMsg = ((' | '+oldMsg+' | ').indexOf(' | '+msg+' | ') < 0);
						msg = hasMsg?(oldMsg + ' | ' + msg):oldMsg;
					}
					return msg;
				},
				getTip: function(tipid){
					if(!tipid){
						return;
					}
					if(_this.floatTip){return _this.floatTip;}
					//获得tipid 考虑 el传入为tipid
					var _tipid = $.core.dom.isNode(tipid)?tipid.getAttribute('tip'):tipid;
					var _obj;
					_tipid && (_obj = _this.DOM.tips[_tipid] || $.core.dom.sizzle('[tipid='+_tipid+']')[0]);
					if(!_obj && conf.getTip){
						var _el = $.core.dom.isNode(tipid)?tipid:$.sizzle('[tip='+tipid+']')[0];
						_obj = conf.getTip(_el);
					}
					return _obj;
				}
			},
			domFun: {
				fire: function(dom, focus){
					if(!dom){
						return;
					}
					if(focus){
						_this.domFun.focus(dom);
					}else{
						_this.domFun.blur(dom);
					}
				},
				getOpt: function(dom){
					var _el = $.core.dom.isNode(dom)?dom:$.core.evt.fixEvent().target;
					var opts = {el: _el,data:{}};
					if (_el.getAttribute('verify')) {
						opts.data = $.core.json.queryToJson(_el.getAttribute('verify') || '');
					}
					return opts;
				},
				click: function(dom){
					var opts = _this.domFun.getOpt(dom);
					if(!opts){
						return;
					}
					if(!opts.data.button){return;}
					if(opts.data.button == 'submit'){
						_this.domFun.submit(opts);
					}
					if(opts.data.button == 'reset'){
						_this.domFun.setDef();
					}
				},
				submit: function(opts){
					var _post = _this.domFun.json(true);
					if(!post){return;}
					var _method = opts.el.getAttribute('get')?'get':(opts.el.getAttribute('post')?'post':'');
					if(!_method){return;}
					var _url = opts.el.getAttribute(_method);
					//成功，默认刷新
					var _suc = conf.succ || function(ret){
						window.location.href = ret.data.url || window.location.href;
					};
					//失败，默认ui.alert
					var _fail = conf.fail || function(ret){
						$.ui.alert(ret.msg||'系统繁忙');
					};
					$.core.io.ajax({
						'url' : _url,
						'onComplete' : function(ret){
							if(ret.code == '100000'){
								_suc(ret);
							}else{
								_fail(ret);
							}
						},
						'onFail' : function(ret){
							_fail(ret);
						},
						'args' : _post,
						'method' : _method
					});
				},
				focus: function(dom){
					var opts = _this.domFun.getOpt(dom);
					if(!opts){
						return;
					}
					opts.data.tipmsg && _this.tips(opts.el, {msg:opts.data.tipmsg, type:3});
					if(!_this.placeholder && opts.el.getAttribute('defval') == opts.el.value) {
						opts.el.style.color = '';
						opts.el.value = '';
					}
					if(opts.data.focusval && !opts.el.value) {
						opts.el.value = opts.data.focusval;
					}
					if(opts.el.getAttribute('autocut')){
						_this.cutTime = setInterval(function(){
							_this.domFun.autoCut(opts.el);
						},200);
					}
					_this.floatTip && (_this.errTip == opts.el) && (_this.floatTip.style.display = 'none');
					$.custEvent.fire(that, 'focus', opts.el);
				},
				blur: function(dom){
					var opts = _this.domFun.getOpt(dom);
					if(!opts){
						return;
					}
					if (opts.data.focusval && opts.el.value == opts.data.focusval) {
						opts.el.value = '';
					}
					var _check;
					if (opts.data.acttype) {
						_check = _this.domFun.check(opts);
					}
					if (!_this.placeholder && opts.el.getAttribute('defval') && !opts.el.value) {
						opts.el.value = opts.el.getAttribute('defval');
						opts.el.style.color = hoverColor;
					}
					_this.cutTime && clearInterval(_this.cutTime) && (_this.cutTime = null);
					$.custEvent.fire(that, 'blur', opts.el);
					return _check;
				},
				clearTip: function(){
					if(_this.floatTip){
						_this.floatTip.style.display = 'none';
						return;
					}
					var _tipid = $.core.dom.sizzle('[tip]', box);
					$.core.arr.foreach(_tipid, function(obj, k){
						_this.tips(obj);
					});
					conf.getTip && $.foreach($.sizzle('[verify]', box),function(o){
						_this.tips(o);
					});
					conf.showTip && $.foreach($.sizzle('[verify*=tipmsg=]',box),function(o){
						var _data = $.core.json.queryToJson(o.getAttribute('verify') || '');
						_data.tipmsg && _this.tips(o.getAttribute('tip'),{msg:_data.tipmsg,type:3});
					});
				},
				check: function(opts){
					if (!opts.el || _this.domFun.isLocked(opts.el) || !opts.data.acttype) {
						return;
					}
					if (!_this.placeholder && opts.el.getAttribute('defval') == opts.el.value) {
						opts.el.style.color = '';
						opts.el.value = '';
					}
					var checkEvent = opts.data.acttype.split('|');
					for (var i = 0, len = checkEvent.length; i < len; ++i) {
						var _rule = checkEvent[i];
						if (rules[_rule] && rules[_rule](opts.el)) {
							var _errmsg = rules[_rule](opts.el);
							if(opts.data.errmsg && typeof _errmsg != 'string'){
								var _allErr = opts.data.errmsg.split('||');
								_errmsg = _allErr[i] ? _allErr[i] : _allErr[_allErr.length - 1];
							}
							_this.tips(opts.el,{msg: _errmsg, type:1,all:opts.all});
							//kongbo 错误input添加红框
							$.addClassName(opts.el,'W_input_error');
							$.log(opts.el+'检测'+_rule+'未通过');
							_this.errNodes.push(opts.el);
							_this.errTip = opts.el;
							return true;
						}
					}
					if(conf.showTip && opts.data.tipmsg && !opts.data.sucmsg){
						_this.tips(opts.el, {msg:opts.data.tipmsg, type:3,all:opts.all});
						return;
					}
					//kongbo 成功消除input红框
					$.removeClassName(opts.el,'W_input_error');
					_this.tips(opts.el, {msg:opts.data.sucmsg,all:opts.all, type:opts.data.sucmsg ? 2 : false});
					//成功后跳至第一个错误框处
					_this.domFun.clearErrArr(opts.el);
					if(!opts.all && _this.floatTip){
						_this.topTag = _this.domFun.getTopTag();
						_this.topTag && _this.domFun.fire(_this.topTag);
					}
				},
				checkAll: function(scrollto){
					_this.topTag = null;
					_this.errNodes = [];
					_this.domFun.clearTip();
					var _el = $.core.dom.sizzle('[verify]', box);
					$.core.arr.foreach(_el, function(obj, k){
						var _opts = {
							el : obj,
							all : true
						};
						_opts.el = obj;
						_opts.data = $.core.json.queryToJson(obj.getAttribute('verify') || '');
						_this.domFun.check(_opts);
					});
					if((scrollto || _this.floatTip) && _this.errNodes.length > 0){
						//get topTag
						_this.topTag = _this.domFun.getTopTag();
						scrollto && $.core.util.scrollTo(_this.topTag,{top:35,step:10});
						_this.floatTip && _this.domFun.fire(_this.topTag);
					}
				},
				getTopTag: function(){
					if(_this.errNodes.length < 1){return;}
					var _topNode, _topPos;
					_this.domFun.clearErrArr();
					$.foreach(_this.errNodes,function(o,i){
						if(!_topNode){
							_topNode = o;
							_topPos = $.core.dom.position(o);
							return;
						}
						var _pos = $.core.dom.position(o);
						if(_pos.t < _topPos.t || (_topPos.t == _topPos.t && _topPos.l < _topPos.l)){
							_topNode = o;
							_topPos = _pos;
						}
					});
					return _topNode;
				},
				//清除数组中的相同内容，清除o
				clearErrArr: function(k){
					var _clearArr = [];
					$.foreach(_this.errNodes,function(o){
						if(k == o){return;}
						($.core.arr.indexOf(o,_clearArr) < 0) && _clearArr.push(o);
					})
					_this.errNodes = _clearArr;
				},
				/**
				 * 验证并返回表单结果
				 * @param {Object} scrollto true/滚动到错误元素
				 */
				postData: function(scrollto){
					_this.domFun.checkAll(scrollto);
					if (_this.errNodes.length > 0) {
						return false;
					}
					var _post = _this.domFun.joinArr($.core.util.htmlToJson(box));
					_this.domFun.setDef();
					return _post;
				},
				joinArr: function(json){
					for(var k in json){
						if(typeof json[k] == 'object'){
							if($.core.arr.isArray(json[k])){
								json[k] = json[k].join();
							}else{
								json[k] = $.core.json.jsonToStr(json[k]);
							}
						}
					}
					return json;
				},
				autoCut: function(el){
					var _cut = $.queryToJson(el.getAttribute('autocut'));
					if(_cut.rule){
						el.value = rules[_cut.rule](el.value);
					}
					var _str = el.value;
					var _max = parseInt(_cut.max);
					if(_max && $.core.str.bLength(_str) > _max){
						el.value = $.core.str.leftB(_str,_max);
					}
					$.custEvent.fire(that, 'cut', el);
					return;
				},
				//设置默认值
				setDef:function(){
					_this.h5Type();
					var _def = $.sizzle('[defval]',box);
					_this.placeholder && $.foreach(_def,function(o){
						o.setAttribute('placeholder',o.getAttribute('defval'));
					});
					!_this.placeholder && $.foreach($.sizzle('[defval]',box),function(o){
						if(!o.value){
							o.value = o.getAttribute('defval');
							o.style.color = hoverColor;
						}
					});
				},
				isLocked: function(el){
					if (el === box) {
						return false;
					}
					if (!conf.forceCheck && (el.style.display == 'none' || el.disabled)) {
						return true;
					}
					else {
						return arguments.callee(el.parentNode);
					}
				}
			},
			h5Type: function(){
				//ie浏览器就算了吧
				if($.IE){return;}
				//针对浏览器为火狐 外框非form时，浏览器验证添加的input样式无法修正会引起混乱，故放弃
				if(box.nodeName != 'FORM' && $.core.util.browser.MOZ){
					return;
				}
				box.setAttribute('novalidate','novalidate');
				//h5 需要修改input type的rule
				var types = ['email','url','tel','phone','number'];
				//chrome type='number' 时改变input按钮，放弃chrome
				if(!$.core.util.browser.CHROME){
					// types.push('number');
					types.push('float');
				}
				//需要转译的type number使用type=tel 调出九宫格键盘//,'float':'tel' 九宫格无点暂不变更float float
				var convert = {'phone':'tel','number':'tel','float':'number'};
				$.foreach($.sizzle('input[type=text][verify*=acttype=]', box),function(o){
					var _acttype = ($.queryToJson(o.getAttribute('verify')).acttype || '').split('|');
					for(var i=0,len=_acttype.length; i < len; ++i) {
						if($.core.arr.inArray(_acttype[i],types)){
							var _type = convert[_acttype[i]] || _acttype[i];
							!$.IE && o.setAttribute('type',_type);
						}
					}
				});
			},
			placeholder: ('placeholder' in $.C('input'))
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		var argsCheck = function(){
			if(!box || !$.core.dom.isNode(box)) {
				throw new Error('box没有定义');
			}
			conf = conf || {};
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		var parseDOM = function(){
			//内部dom节点
			_this.DOM = $.utils.kit.dom.parseDOM($.builder(box).list);
			_this.DOM.tips = _this.tipFun.allTips(box);
			rules = $.core.json.merge($.common.form.regular,(conf.rules|| {}));
			//一个弹层情况
			if(!conf.getTip){
				_this.floatTip = $.C('div');
				_this.floatTip.className = 'W_layer W_layer_pop';
				document.body.appendChild(_this.floatTip);
				_this.objs.delegateErr = $.core.evt.delegatedEvent(_this.floatTip);
				_this.objs.delegateErr.add('floatTip', 'click', function(opts){
					_this.floatTip.style.display = 'none';
				});
				conf.getTip = function(el){
					return _this.floatTip;
				}
				
			}
			//验证参数可用性
			else if(typeof conf.getTip != 'function'){
				var tipRule = conf.getTip.split(' ');
				var _parent = tipRule[0];
				tipRule.splice(0,1);
				var children = tipRule.join(' ');
				conf.getTip = function(el){
					var father = $.utils.kit.dom.parents(el,{expr:_parent})[0];
					return $.sizzle(children,father)[0];
				}
			}
			if((conf.tipTemp && (typeof conf.tipTemp != 'function'))) {
				$.log('getTip || tipTemp 类型错误');
			}
			conf.tipTemp && (_this.tipTemp = conf.tipTemp);
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		var initPlugins = function(){
			_this.domFun.setDef();
		};
		//-------------------------------------------

		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		var bindDOM = function(){
			_this.addEvent(box, $.IE?'focusin':'focus',_this.domFun.focus,true);
			_this.addEvent(box, $.IE?'focusout':'blur',_this.domFun.blur,true);
			_this.addEvent(box, 'click',_this.domFun.click);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		var bindCustEvt = function(){
			$.custEvent.define(that, ['focus','blur','tips','cut']);
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		var bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		var destroy = function(){
			if(_this) {
				$.core.evt.removeEvent(box, $.IE?'focusin':'focus',_this.domFun.focus,true);
				$.core.evt.removeEvent(box, $.IE?'focusout':'blur',_this.domFun.blur,true);
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		var init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
			_this.domFun.clearTip();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.fire = _this.domFun.fire;
		that.json = _this.domFun.postData;
		that.clearTip = _this.domFun.clearTip;
		that.tips = _this.tips;
		that.setDef = _this.domFun.setDef;
		that.tipMsg = _this.tipTemp;
		that.supportH5 = _this.h5Type;
		
		//------------------------------------------

		return that;
	};
	
});

});