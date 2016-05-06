steel.d("ui/cal", ["utils/kit/dom/parseDOM","utils/kit/extra/doT","utils/kit/io/cssLoader"],function(require, exports, module) {
/**
 * @param Date对象、yyyy-mm-dd, [yyyy, mm, dd], 空表示当前日期
 * 
 * @param {Object} node 组件最外节点
 * @param {
 *  	stime : "yyyy-mm-dd",	可选日期，默认是20090816
 *  	etime : "yyyy-mm-dd",	可选日期，默认是客户端当天时间
 *      longs: +-100,
 *  	callback : Function, 	可选参数，用日期作参数回调此函数
 *  	source ：INPUT			可选参数，如果有就将日期写入到其中
 *  }
 * @return {Object} 实例
 * @author kongbo@staff.sina.com.cn

 * @example
 * $.utils.module.cal(node);
 */
window.$CONFIG = window.$CONFIG || {};

require("utils/kit/dom/parseDOM");
require("utils/kit/extra/doT");
require("utils/kit/io/cssLoader");

STK.register('ui.cal', function($) {

	//+++ 常量定义区 ++++++++++++++++++
	var TEMP = {
		outer: '<div class="layer_calendar"><div class="selector" node-type="selector"></div>\
					<div node-type="date"></div>\
					<div class="datas_list" style="display:none;" node-type="timer"><div class="times clearfix"><div class="input_area">\
					<input num-max="23" maxlength="2" action-type="tinput" class="time_input" action-type="" node-type="hour" type="text" placeholder="09">\
					:<input num-max="59" maxlength="2" action-type="tinput" class="time_input" node-type="min" type="text" placeholder="00">\
					:<input num-max="59" maxlength="2" action-type="tinput" max="59" min="0" class="time_input" node-type="sec" type="text" placeholder="00"></div>\
					<a href="javascript:void(0)" action-type="commit" class="time_btn">确定</a>\
					</div></div></div>',
		year: ['<a href="javascript:void(0)" action-type="getDay" action-data="year={{=parseInt(it.year,10) - 2*parseInt(it.len,10)}}" class="W_ficon ficon_arrow_left ">b</a>\
					<a href="javascript:void(0)" action-type="getDay" action-data="ani=flipInRight&year={{=parseInt(it.year,10) + 2*parseInt(it.len,10)}}" class="W_ficon ficon_arrow_right ">a</a>\
					<span class="quick_select">{{=parseInt(it.year,10) - parseInt(it.len,10)}}-{{=parseInt(it.year,10) + parseInt(it.len,10) - 1}}年</span>',/*<a href="javascript:void(0)" action-type="setDay" action-data="ani=bounceIn&year={{=it.year}}" class="quick_select"></a>*/
				'<div class="year_list"><ul class="years">{{~it.list :d:index}}\
					<li>{{?d.click}}<a href="javascript:void(0)" action-type="setDay" action-data="ani=bounceIn&year={{=d.year}}">{{?}}{{=d.year}}{{?d.click}}</a>{{?}}</li>\
					{{~}}</ul></div>'],// {{?d.click == 2}} class="year"{{?}}
		month: ['<a href="javascript:void(0)" action-type="setDay" action-data="year={{=parseInt(it.year,10)-1}}" class="W_ficon ficon_arrow_left ">b</a>\
					<a href="javascript:void(0)" action-type="setDay" action-data="ani=flipInRight&year={{=parseInt(it.year,10)+1}}" class="W_ficon ficon_arrow_right ">a</a>\
					<a href="javascript:void(0)" action-type="getDay" action-data="ani=bounceOut&year={{=it.year}}" class="quick_select">{{=it.year}}年</a>',
				'<div class="month_list"><ul class="months">{{~it.list :d:index}}\
					<li>{{?d.click}}<a href="javascript:void(0)" action-type="setDay" action-data="ani=bounceIn&year={{=it.year}}&month={{=d.month}}">{{?}}{{=d.month}}月{{?d.click}}</a>{{?}}</li>\
					{{~}}</ul></div>'],// {{?d.click == 2}} class="month"{{?}}
		day: 	['<a href="javascript:void(0)" action-type="setDay" action-data="year={{=it.year}}&month={{=parseInt(it.month,10)-1}}" class="W_ficon ficon_arrow_left ">b</a>\
					<a href="javascript:void(0)" action-type="setDay" action-data="ani=flipInRight&year={{=it.year}}&month={{=parseInt(it.month,10)+1}}" class="W_ficon ficon_arrow_right ">a</a>\
					<a href="javascript:void(0)" action-type="getDay" action-data="ani=bounceOut&year={{=it.year}}&month={{=it.month}}" class="quick_select">{{=it.year}}年{{=it.month}}月</a>',
				'<div class="datas_list"><ul class="weeks">\
					<li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>\
					</ul><ul class="days">\
					{{~it.list :d:index}}\
						<li>{{?d.click}}<a href="javascript:void(0)" action-type="choose" action-data="year={{=it.year}}&month={{=it.month}}&day={{=d.day}}">{{?}}{{=d.day}}{{?d.click}}</a>{{?}}</li>\
					{{~}}</ul></div>']//{{?d.click == 2}} class="day"{{?}}
	};
	var util = {
		css: '../t4/appstyle/e_component/css/layer_calendar.css',
		cssId: 'appstyle_e_component_css_layer_calendar',
		years: 6,//显示年前后
		solarMonth : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		format: function(d){
			if(d && d.format){return d;}
			if(!d || !/\d+/.test(d)){d = new Date();}
			var ret = {};
			switch(typeof d){
				case 'string'://when d = '2011/12-12 14:23'
					d = $.trim(d);
					d = d.replace(/(\/|-|:| |&)/g,',');
					d = d.split(',');
					ret.d = new Date(d[0],(d[1]-1)<0?0:d[1]-1,d[2]||1,d[3]||0,d[4]||0,d[5]||0);
					break;
				case 'object'://when d = new Date()
					ret.d = d;
					break
				case 'number'://when d = 1352359118339
					ret.d = new Date(d);
					break;
			}
			isNaN(ret.d.getTime()) && (ret.d = new Date());
			ret.getTime = ret.d.getTime();
			ret.year = ret.d.getFullYear();
			ret.month = util.doubles(ret.d.getMonth()+1);
			ret.day = util.doubles(ret.d.getDate());
			ret.hour = util.doubles(ret.d.getHours());
			ret.min = util.doubles(ret.d.getMinutes());
			ret.sec = util.doubles(ret.d.getSeconds());
			ret.week = ret.d.getDay();
			ret.date = ret.year+'-'+ret.month+'-'+ret.day;
			ret.times = ret.hour+'-'+ret.min+'-'+ret.sec;
			ret.format = true;
			return ret;
		},
		//修复1位数，重复补位的bug，如1，每次执行就会加一个0.
		doubles: function(numb){
			numb = parseInt(numb,10);
			return (numb < 10)?('0'+numb):numb;
		},
		// 返回公历 y年m+1月的天数
		solarDays : function (y, m) {
			if(m == 2){
				return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
			} else {
				return (util.solarMonth[m-1]);
			} 
		}
	}

	window.format = util.format;
	//-------------------------------------------

	return function(node,conf) {

		var that = {};

		// +++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM : {}, //节点容器
			val : {}, //记录赋值
			objs: {}, //对象方便销毁使用
			DOMFun : {//DOM事件行为容器
				close: function(){
					_this.ui.hide();
				},
				getOpt: function(){
					var _el = $.core.evt.fixEvent().target;
					if (_el.getAttribute('action-type') != 'tinput') {
						return;
					}
					var opts = {el: _el,data:{}};
					opts.data = $.core.json.queryToJson(_el.getAttribute('action-data') || '');
					return opts;
				},
				focus: function(){
					var opts = _this.DOMFun.getOpt();
					if(!opts){return;}
					_this.DFun.select(opts);
				},
				blur: function(){
					var opts = _this.DOMFun.getOpt();
					if(!opts){return;}
					_this.DFun.blur(opts);
				}
			},
			DFun : {
				choose: function(opts){
					_this.ui.clearCla();
					var _d = opts.data;
					var _day = util.format(_d.year+'-'+_d.month+'-'+_d.day);
					//选择时间段，时间段确认
					if(!conf.section ||(!_this.val.sDay || _this.val.eDay)){
						_this.val.sDay = _day;
						_this.val.eDay = null;
						opts.el.className = 'day';
						(!conf.showtimes) && _this.ui.finish();
						return;
					}
					_this.val.eDay = _day;
					if(_this.val.sDay.getTime > _day.getTime){
						_this.val.eDay = _this.val.sDay;
						_this.val.sDay = _day;
					}
					_this.ui.section();
					(!conf.showtimes) && _this.ui.finish();
				},
				setDay: function(opts){
					var _d = opts.data;
					if(_d.month && parseInt(_d.month,10) < 1){
						_d.year = parseInt(_d.year,10) - 1;
						_d.month = 12;
					}
					if(_d.month && parseInt(_d.month,10) > 12){
						_d.year = parseInt(_d.year,10) + 1;
						_d.month = 1;
					}
					_d.type = 'day';
					!_d.month && (_d.type = 'month');
					_d.type = _d.type || 'year';
					_this.ui.show(_d);
				},
				getDay: function(opts){
					var _d = opts.data;
					!_d.day && (_d.type = 'month');
					!_d.month && (_d.type = 'year');
					_this.ui.show(_d);
				},
				select: function(opts){
					opts.el.select();
					var _params = {
						max: parseInt(opts.el.getAttribute('num-max'),10)||100,
						min: parseInt(opts.el.getAttribute('num-min'),10)||0
					};
					_this.cutTime && clearInterval(_this.cutTime);
					_this.cutTime = setInterval(function(){
						_this.logic.autoCut(opts.el,_params);
					},200);
				},
				blur: function(opts){
					_this.cutTime && clearInterval(_this.cutTime);
					var _params = {
						max: parseInt(opts.el.getAttribute('num-max'),10)||100,
						min: parseInt(opts.el.getAttribute('num-min'),10)||0,
						format: util.doubles
					};
					_this.logic.autoCut(opts.el,_params);
				},
				commit: function(opts){
					//确定按钮
					_this.ui.finish();
				}
			},
			logic: {
				autoCut: function(el,p){
					if(!/^[0-9]*$/.test(el.value)){
						var _val = parseInt(el.value);
						el.value = isNaN(_val)?'0':_val;
					}
					if(parseInt(el.value,10) > p.max){
						el.value = p.max;
					}
					if(parseInt(el.value,10) < p.min){
						el.value = p.min;
					}
					p.format && (el.value = p.format(el.value));
					return;
				},
				timeLine: function(){
					var _line = {};
					var _cal = conf;
					var _longs = parseInt(_cal.longs)*86400000
					if(_longs && !isNaN(_longs)){
						_cal.stime = util.format(util.format().date);
						_cal.etime = util.format(new Date().getTime() + _longs);
					}
					_line.s = util.format(_cal.stime);
					_line.e = util.format(_cal.etime);
					if(_line.s.getTime > _line.e.getTime){
						var _start = _line.e;
						_line.e = _line.s;
						_line.s = _start;
					}
					//时间段从00：00 - 23:59:59
					_line.s = util.format(_line.s.date);
					_line.e = util.format(_line.e.date+' 23:59:59');
					_this.val.line = _line;
					$.log(node,'timeLine:',_line.s.date,_line.e.date);
				},
				belong: function(y,m,d,lines){
					if(!y){return 1;}
					var ret;
					var _val = _this.val.sDay;
					var _line = lines || _this.val.line;
					if(!m){
						if(y <= _line.e.year && y >= _line.s.year){ret = 1;}
						// (y == _val.year) && (ret = 2);
						return ret;
					}
					if(!d){
						if(y <= _line.e.year && y >= _line.s.year){
							ret = _this.logic.compare(y,m,null,_line);
						}
						// ret && _val && (y == _val.year && m == _val.month) && (ret = 2);
						return ret;
					}
					ret = _this.logic.compare(y,m,d,_line);
					// ret && _val && (y == _val.year && m == _val.month && d == _val.day) && (ret = 2);
					return ret;
				},
				compare: function(y,m,d,_line){
					var ret;
					var _val = _this.val.sDay;
					var _s = _this.logic.getLine(y,m,d);
					var _e = _this.logic.getLine(y,m,d,1);
					var _lineS = _this.logic.getLine(_line.s.year,_line.s.month,d&&_line.s.day);
					var _lineE = _this.logic.getLine(_line.e.year,_line.e.month,d&&_line.e.day,1);
					if(_s >= _lineS && _e <= _lineE){
						ret = 1;
					}
					// if(ret && _val && y == _val.year && m == _val.month){
					// 	!d && (ret = 2);
					// 	d && d == _val.day && (ret = 2);
					// }
					return ret;
				},
				getLine: function(y,m,d,type){
					if(!type){
						return util.format(y+'-'+m+'-'+(d||1)+' 00:00:00').getTime;
					}
					return util.format(y+'-'+m+'-'+(d||util.solarDays(y,m))+' 23:59:59').getTime;
				},
				//获取XX年XX月的日期
				daysArr: function(y,m){
					var _d = util.format(y+'-'+m+'-1');
					var _lens = util.solarDays(y,m);
					var _weekly = (_d.week == 0)?7:_d.week;
					var empty = _weekly - parseInt(_d.day,10)%7;
					var days = [];
					for(var i=1;i <= empty; ++i){
						days.push({day:''});
					}
					var _line = _this.val.line;
					var _lock = _this.logic.belong(_d.year,_d.month);
					for(var i=1; i<= _lens; ++i){
						var _active = null;
						if(_lock){
							_active = _this.logic.belong(_d.year,_d.month,i);
						}
						days.push({day:(i<10?'0':'')+i,click:_active});
					}
					return {
						year: _d.year,
						month: _d.month,
						list: days
					}
				},
				monthArr: function(y){
					var ret = [];
					var _lock = _this.logic.belong(y);
					for(var i=1; i<13; ++i){
						var _active = null;
						if(_lock){
							_active = _this.logic.belong(y,i);
						}
						ret.push({month:i,click:_active});
					}
					return ret;
				},
				yearArr: function(y,l){
					y = parseInt(y,10);
					isNaN(y) && (y = new Date().getFullYear());
					var ret = [];
					for(var i=(y-l), len=y+l;i<len; ++i){
						var _active = _this.logic.belong(i);
						ret.push({year:i,click:_active});
					}
					return ret;
				}
			},
			ui: {
				calendar: function(){
					if(conf.section){
						var _times = (node.value||'').split('~');
						_this.val.sDay = util.format(_times[0]||'');
						_this.val.eDay = util.format(_times[1]||'');
					}
					!conf.section && (_this.val.sDay = util.format(node.value||''));
					var _val = _this.val.sDay;
					_this.logic.timeLine();
					var _params = _val;
					_params.ani = 'bounceIn';
					_this.ui.show(_params);
					if(conf.showtimes){
						_this.DOM.hour.value = _val.hour;
						_this.DOM.min.value = _val.min;
						_this.DOM.sec.value = '00'||_val.sec;
					}
					return _this.ui;
				},
				clearCla: function(){
					$.foreach($.sizzle('.day',_this.DOM.date),function(o,i){
						o.className = '';
					});
				},
				section: function(){
					_this.ui.clearCla();
					var _compareLine = {
						s: _this.val.sDay,
						e: _this.val.eDay||_this.val.sDay
					}
					$.foreach($.sizzle('a[action-data]',_this.DOM.date),function(o,i){
						var _d = $.queryToJson(o.getAttribute('action-data'));
						var _sel = _this.logic.belong(_d.year,_d.month,_d.day,_compareLine);
						var _cla = !_d.month?'year':!_d.day?'month':'day';
						(_sel) && (o.className = _cla);
					});
					//检测本月份是否有
					// el.className = 'day';
				},
				layer: function(){
					if(_this.cal){return _this.ui;}
					_this.cal = $.insertHTML(document.body,TEMP.outer,'BeforeEnd');
					_this.DOM = $.utils.kit.dom.parseDOM($.builder(_this.cal).list);
					return _this.ui;
				},
				setPos: function(el){
					var _pos = $.position(node);
					_this.cal.style.left = _pos.l + 'px';
					_this.cal.style.top = (_pos.t + node.offsetHeight) + 'px';
					return _this.ui;
				},
				show: function(opts){
					if(!opts || !opts.year){return;}
					opts.type = opts.type || 'day';
					var _params = {year:opts.year};
					var _ani = opts.ani || 'flipInLeft';
					switch(opts.type){
						case 'year':
							_params.len = util.years;
							_params.list = _this.logic.yearArr(opts.year,_params.len);
							break;
						case 'month':
							_params.month = opts.month;
							_params.list = _this.logic.monthArr(opts.year,opts.month);
							break;
						case 'day':
							_params = _this.logic.daysArr(opts.year,opts.month);
							break;
					}
					var _sele = $.utils.kit.extra.doT.template(TEMP[opts.type][0])(_params);
					var _list = $.utils.kit.extra.doT.template(TEMP[opts.type][1])(_params);
					_this.ui.layer().setPos();
					_this.DOM.selector.innerHTML = _sele;
					var ok = function(opts){
						_this.DOM.date.innerHTML = _list;
						_this.ui.section();
					}
					//延缓赋值
					var waiting = (_ani == 'bounceOut');
					!waiting && ok();
					conf.showtimes && $.setStyle(_this.DOM.timer, 'display','');
					_this.cal.style.display = '';
					_this.ui.ani(_this.DOM.date,_ani,function(){
						waiting && ok();
					});
					$.stopEvent();
					return _this.ui;
				},
				finish: function(){
					var _val = _this.val.sDay.date;
					if(conf.showtimes){
						//修正输入多个0的时候，时间格式不对的问题。by shaobo3
						_val += ' ' + (util.doubles(Number(_this.DOM.hour.value))||'00') + ':' + (util.doubles(Number(_this.DOM.min.value))||'00') + ':' + (util.doubles(Number(_this.DOM.sec.value))||'00');
					}
					if(conf.section && !_this.val.eDay) {return;}
					conf.section && (_val = _this.val.sDay.date + ' ~ ' + _this.val.eDay.date);
					node.value = _val;
					_this.ui.hide();
					$.custEvent.fire(that,'finish',_this.val);
					return _this.ui;
				},
				hide: function(opts){
					if(!_this.cal){return _this.ui;}
					$.removeEvent(document.body,'click',_this.DOMFun.close);
					_this.ui.ani(_this.cal,'bounceOut',function(){
						$.removeNode(_this.cal);
					});
					window.FrameClient && FrameClient.diaAutoHide && FrameClient.diaAutoHide();
					return _this.ui;
				},
				ani: function(el,cla,cb){
					$.addClassName(el,'animated '+cla);
					var _end = function(opts){
						$.removeClassName(el,'animated '+cla);
						cb && cb();
						$.removeEvent(el,'webkitAnimationEnd',_end);
					}
					!_this.unSupport && $.addEvent(el,'webkitAnimationEnd',_end);
					//检验首次动画执行后有没有执行AnimationEnd，未执行既不支持css3动画
					!_this.checkSupport && setTimeout(function(){
							_this.checkSupport = true;
							_this.unSupport = $.core.dom.hasClassName(el,'animated')?true:null;
							_this.unSupport && _end();
						}, 500);
					_this.unSupport && _end();
				}
			},
			loadCss: function(opts){
				var load_div = $.C("div");
				load_div.id = util.cssId;
				$.core.util.hideContainer.appendChild(load_div);
				if (parseInt($.core.dom.getStyle(load_div, "height")) == 42) {
					$.core.util.hideContainer.removeChild(load_div);
					return;
				}
				$.core.util.hideContainer.removeChild(load_div);
				$.utils.kit.io.cssLoader(util.css, util.cssId);
			},
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
			}
		};
		//----------------------------------------------

		//+++ 参数的验证方法定义区 ++++++++++++++++++
		var argsCheck = function() {
			if(!$.core.dom.isNode(node)) {
				throw "视频图层需要传入外层节点对象";
			}
		};
		//-------------------------------------------

		//+++ Dom的获取方法定义区 ++++++++++++++++++
		var parseDOM = function() {
			//内部dom节点 最外层节点，不使用_this.DOM
			// _this.DOM = $.utils.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('必需的节点 不存在');
			}
		};
		//-------------------------------------------

		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		var initPlugins = function() {
			conf = conf || $.queryToJson(node.getAttribute('cal')||'');
			// conf.section && (conf.showtimes = false);
			_this.loadCss();
			_this.ui.calendar();
			$.custEvent.define(that,'finish');
		};
		//-------------------------------------------

		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		var bindDOM = function() {
			_this.addEvent(_this.cal, $.IE?'focusin':'focus',_this.DOMFun.focus,true);
			_this.addEvent(_this.cal, $.IE?'focusout':'blur',_this.DOMFun.blur,true);
			_this.addEvent(_this.cal, 'click',_this.DOMFun.focus);
			$.addEvent(_this.cal,'click',$.stopEvent);
			$.addEvent(document.body,'click',_this.DOMFun.close);
		};
		//-------------------------------------------

		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		var bindCustEvt = function() {
			_this.objs.delegate = $.core.evt.delegatedEvent(_this.cal);
			_this.objs.delegate.add('choose','click',_this.DFun.choose);
			_this.objs.delegate.add('setDay','click',_this.DFun.setDay);
			_this.objs.delegate.add('getDay','click',_this.DFun.getDay);
			_this.objs.delegate.add('tinput','click',_this.DFun.select);
			_this.objs.delegate.add('commit','click',_this.DFun.commit);

		};
		//-------------------------------------------

		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		var bindListener = function() {
			
		};
		//-------------------------------------------

		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		var destroy = function() {
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
		var init = function() {
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
		that.temp = TEMP;

		//-------------------------------------------

		return that;
	};
});
});