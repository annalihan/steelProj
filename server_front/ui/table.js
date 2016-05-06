steel.d("ui/table", ["utils/kit/extra/language","utils/kit/dom/parseDOM","utils/kit/dom/parents"],function(require, exports, module) {
/**
 * for what
 * @ 
 * @param {Object} 
 * @return {Object} 实例
 * @author kongbo | kongbo@staff.sina.com.cn
 * @example
 * 
 */

require("utils/kit/extra/language");
require("utils/kit/dom/parseDOM");
require("utils/kit/dom/parents");

STK.register('ui.table', function($){

	//+++ 常量定义区 ++++++++++++++++++
	var $L = $.utils.kit.extra.language;
	//-------------------------------------------
	
	return function(node){
		var node, argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};

		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{},//组件容器
			DOM_eventFun: {//DOM事件行为容器

			},
			DeventFun: {
				
			},
			trans: {
				tr: function(html){
					var json = {html:[]};
					json.attr = _this.trans.trAttr(html);
					var _td = html.match(/<td.*?<\/td>/g);
					$.foreach(_td,function(o,i){
						json.html.push(o.replace(/<td.*?>(.*?)<\/td>/g,"$1"));
					});
					return json;
				},
				trAttr: function(html){
					var ret = {td:[]};
					var _tr = html.replace(/<tr(.*?)>.*/,'$1');
					ret.tr = _this.trans.getAttr(_tr);
					var _tds = html.match(/<td.*?>/g);
					$.foreach(_tds,function(o,i){
						o = o.replace(/<td(.*?)>/,'$1');
						ret.td.push(_this.trans.getAttr(o));
					});
					return ret;
				},
				getAttr: function(html){
					html = html.replace(/=(\'|\"|\\\'|\\\")/g,'=').replace(/(\'|\")( |$)/g,' ');
					html = html.replace(/ /g,'&');
					var ret = html?STK.core.json.queryToJson(html):{};
					return ret;
				}
			},
			/**
			 * 插入
			 * @param {Number} line 行号
			 * @param {Array} data 数据
			 * @param {String} linekey 行key
			 */
			insert: function(data, line){
				line = line?line:node.rows.length;
				var _tr = node.insertRow(line);
				if(typeof data == 'string'){
					var _td = _tr.insertCell(0);
					_td.innerHTML = data;
					return _tr;
				}
				for (var i = 0, len = data.length; i < len; ++i) {
					var _td = _tr.insertCell(i);
					_td.innerHTML = data[i];
				}
				return _tr;
			},
			replace: function(tr, html){
				var _index = _this.getLine(tr);
				_this.insertHtml(html,_index);
				_this.remove(tr);
			},
			insertHtml: function(html, line){
				line = line?line:node.rows.length;
				html = html.replace(/\n/g,'');
				var _trTemp = html.match(/<tr.*?<\/tr>/);
				$.foreach(_trTemp,function(o,i){
					var trDom = _this.trans.tr(o);
					var _tr = node.insertRow(line);
					for(var k in trDom.attr.tr){
						if(k === "class") {
							_tr.className = trDom.attr.tr[k];
						}else{
							k && _tr.setAttribute(k,trDom.attr.tr[k]);
						}
					};
					for (var i = 0, len = trDom.html.length; i < len; ++i) {
						var _td = _tr.insertCell(i);
						_td.innerHTML = trDom.html[i];
						for(var k in trDom.attr.td[i]){
							if(k === "class") {
								_td.className = trDom.attr.td[i][k];
							}else{
								_td.setAttribute(k,trDom.attr.td[i][k]);
							}
						};
					}
				});
			},
			clear: function(){
				$.foreach(node.rows,function(o,i){
					node.deleteRow(1);
				});
			},
			remove: function(el){
				var index = _this.getLine(el);
				node.deleteRow(index);
			},
			getLine: function(tr){
				if(tr.nodeName != 'TR'){
					tr = $.utils.kit.dom.parents(tr,{expr:'tr'})[0];
				}
				if(!tr){
					return;
				}
				var index;
	            for (var i = 0, len = node.rows.length; i < len; i++) {
	                if(node.rows[i] == tr) {
	                    index = i;
	                }
	            }
	            return index;
	        },
	        getLength: function(){
	            return this.table.rows.length
	        }
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('node没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOM = $.utils.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('必需的节点 不存在');
			}
			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
		};
		//-------------------------------------------

		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			//$.addEvent(_this.DOM.,'click',_this.DOM_eventFun.)

		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			// _this.objs.delegate = $.core.evt.delegatedEvent(node);
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
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
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;

		that.getLine = _this.getLine;
		that.insert = _this.insert;
		that.insertHtml = _this.insertHtml;
		that.remove = _this.remove;
		that.replace = _this.replace;
		that.clear = _this.clear;
		
		//------------------------------------------

		return that;
	};
	
});
});