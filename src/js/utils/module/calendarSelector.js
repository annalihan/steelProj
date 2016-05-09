/**
 * @fileoverview
 * 日期选择器
 * @author L.Ming | liming1@staff.sina.com.cn
 * @history
 */

/**
 * @param Date对象、yyyy-mm-dd, [yyyy, mm, dd], 空表示当前日期
 * @param {
 *  	start : "yyyy-mm-dd",	可选日期，默认是20090816
 *  	end : "yyyy-mm-dd",		可选日期，默认是客户端当天时间
 *  	callback : Function, 	可选参数，用日期作参数回调此函数
 *  	source ：INPUT			可选参数，如果有就将日期写入到其中
 *  }
 * @example
 *  new calendar(new Date(2009, 7, 16, 0, 0, 0, 0));
 *  new calendar("2011-02-19");
 *  new calendar(2011, 2, 19);
 *  new calendar();
 * @history
 * L.Ming @2011.06.13 start/end 参数在 IE 下必须用/分隔日期，增加此兼容处理
 */


// 显示的时候给 document.body 绑定 onclick 监听事件

$Import("utils.kit.extra.language");
$Import("utils.kit.dom.layoutPos");
STK.register("utils.module.calendarSelector", function($){

	var that;
	function getHtml(){
		var html = '' +
		'<#et userlist data>' +
			'<div class="selector">' +
				'<select node-type="month" class="month htc_select">' +
				'<#if (data.hidePastMonth)>' +
					'<#if (!(data.start.year == data.showDate.year&& data.currDate.month>0))><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>1)||(data.end.year == data.showDate.year&& data.currDate.month<1)))><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>2)||(data.end.year == data.showDate.year&& data.currDate.month<2)))><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>3)||(data.end.year == data.showDate.year&& data.currDate.month<3)))><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>4)||(data.end.year == data.showDate.year&& data.currDate.month<4)))><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>5)||(data.end.year == data.showDate.year&& data.currDate.month<5)))><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>6)||(data.end.year == data.showDate.year&& data.currDate.month<6)))><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>7)||(data.end.year == data.showDate.year&& data.currDate.month<7)))><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>8)||(data.end.year == data.showDate.year&& data.currDate.month<8)))><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>9)||(data.end.year == data.showDate.year&& data.currDate.month<9)))><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option></#if>' +
					'<#if (!((data.start.year == data.showDate.year&& data.currDate.month>10)||(data.end.year == data.showDate.year&& data.currDate.month<10)))><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option></#if>' +
					'<#if (!(data.end.year == data.showDate.year&& data.currDate.month<11))><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if>' +
				'<#else>' +
					'<option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option>' +
					'<option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option>' +
					'<option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option>' +
					'<option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option>' +
					'<option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option>' +
					'<option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option>' +
					'<option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option>' +
					'<option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option>' +
					'<option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option>' +
					'<option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option>' +
					'<option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option>' +
					'<option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option>' +
				'</#if>' +
				'</select>' +
				'<select node-type="year" class="year htc_select">' +
					'<#list data.years as year>' +
						'<option value="${year}"${(data.showDate.year==year)?\' selected=""\':""}>${year}</option>' +
					'</#list>' +
				'</select>' +
			'</div>' +
			'<ul class="weeks">' +
				'<li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li>' +
			'</ul>' +
			'<ul class="days">' +
			'<#list data.dates as list>' +
				'<li>' +
				'<#if (list!="")>' +
					'<#if (' +
							'(data.start.year==data.showDate.year&&data.start.month==data.showDate.month&&(data.start.date<=list&&list<=data.start.max))' +
							'||(data.start.year==data.showDate.year&&data.start.month<data.showDate.month)' +
							'||(data.start.year<data.showDate.year&&data.showDate.year<data.end.year)' +
							'||(data.showDate.year==data.end.year&&data.showDate.month<data.end.month)' +
							'||(data.showDate.year==data.end.year&&data.showDate.month==data.end.month&&list<=data.end.date)' +
						')>' +
						'<#if (' +
							//同年同月
							'(data.start.year == data.end.year && data.start.year == data.showDate.year && data.start.month == data.showDate.month && data.start.date > list)' +
							'||(data.start.year == data.end.year && data.end.year == data.end.year && data.end.month == data.showDate.month && data.end.date < list)' +
							//同年不同月
							'||(data.start.year == data.end.year && data.start.year == data.showDate.year && data.start.month > data.showDate.month)' +
							'||(data.start.year == data.end.year && data.end.year == data.showDate.year && data.end.month < data.showDate.month)' +
						')>' +
						'${list}'+
						'<#else>' +
							'<a action-type="date" href="#date" onclick="return false;" ' +
								'title="${data.showDate.year}-${data.showDate.month+1}-${list}"' +
								'year="${data.showDate.year}" month="${data.showDate.month+1}" day="${list}"' +
								'${(data.today.year==data.showDate.year&&data.today.month==data.showDate.month&&list==data.showDate.date)?\' class="day"\':\'\'}><strong>${list}</strong></a>' +
						'</#if>'+
						'<#else>' +
						'${list}' +
					'</#if>' +
				'</#if>' + 
				'</li>' +
			'</#list>' +
			'</ul>';
		return html;
	}
	function clickClose (){
		that.node.style.display = "none";
	}
	var calendar = function(){
		var args = arguments;
		// 根据参数计算当前日期
		this.today = this.getDefaultDate.apply(this, args);
		this.showDate = {};
		for(var k in this.today){
			this.showDate[k] = this.today[k];
		}
		// 计算可点击的起始日期
		this.getKeyPoint.apply(this, args);
		this.currentDate = args[1].currentDate;
		this.getCurrentMonthInfo(args[1].hidePastMonth);
	}

	function stopEvent () {
		$.core.evt.stopEvent();
		setTimeout(function(){
			var cal = $.core.dom.sizzle('[node-type="calendar"]', document.body);
			cal = (cal.length > 0) ? cal[0] : null;
			cal && (cal.style.display == 'none') && $.core.evt.removeEvent(document.body, "click", clickClose);
		},20);
	}
	calendar.prototype = {
		'data' : {},
		// 默认从 2009/08/16 到今天的日期是可点击的
		'defaultStartDate' : new Date(2009, 7, 16, 0, 0, 0, 0),
		// 每个月的天数
		'solarMonth' : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		// 每个月具体日期，根据具体情况截取部分
		'maxMonthDay' : [	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
						19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
		// 返回公历 y年m+1月的天数
		'solarDays' : function (y, m) {
			if(m == 1){
				return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
			} else {
				return (this.solarMonth[m]);
			} 
		},
		// 从初始化参数里获得初始化的日期
		'getDefaultDate' : function (){
			var args = arguments;
			var dateInfo;
			var year;
			var month;
			var date;
			var re = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/;
			var maxDate;
			var result;
			
			if (args.length == 0) { // 如果没提供日期，用系统当前日期
				dateInfo = new Date();
			} else if (re.test(args[0])) { // 参数格式为yyyy-mm-dd
				dateInfo = args[0].match(re);
				year = dateInfo[1] * 1;
				month = dateInfo[2] * 1 - 1;
				date = dateInfo[3] * 1;
				dateInfo = new Date(year, month, date, 0, 0, 0, 0);
			} else if (args[0].constructor == Date) { // 参数为一个日期对象
				dateInfo = args[0];
			} else if (args.length == 3) { // 参数格式为 yyyy, mm, dd 三个参数
				dateInfo = new Date(args[0], args[1], args[2], 0, 0, 0, 0);
			} else if(args[0] != "" && typeof args[0] == "string"){
				dateInfo = new Date(args[0]);
			} else {
				dateInfo = new Date();
			}
			result = {
				year : dateInfo.getFullYear(),
				month : dateInfo.getMonth(),
				date : dateInfo.getDate()
			};
			// 计算当月的最大天数
			maxDate = this.solarDays(result.year, result.month);
			result.max = maxDate;
			return result;
		},
		// 计算可点击的起始日期
		'getKeyPoint' : function () {
			var args = arguments;
			var count = args.length;
			var last;
			if(count > 1){
				last = args[count - 1];
				this.start = (last.start != null) ? last.start : this.defaultStartDate;
				this.end = (last.end != null) ? last.end : new Date();
				this.callback = last.callback;
				this.showback = last.showback;
				this.source = last.source;
				if(this.start.toString().indexOf("-") != -1){
					this.start = this.start.replace(/-/g, "/");
				}
				if(this.end.toString().indexOf("-") != -1){
					this.end = this.end.replace(/-/g, "/");
				}
				this.defaultStartDate = new Date(this.start);
			} else {
				// 默认从 2009/08/16 到今天的日期是可点击的
				this.start = this.defaultStartDate;
				this.end = new Date();
			}
			this.start = this.getDefaultDate.call(this, this.start);
			this.end = this.getDefaultDate.call(this, this.end);
		},
		// 获得当前月信息，比如总共有多少天，当月1日是星期几
		'getCurrentMonthInfo' : function (hidePastMonth) {
			var today = this.showDate;
			var year = today.year;
			var month = today.month;
			var date = today.date;

			var firstDate = new Date(year, month, 1, 0, 0, 0, 0);    //当月一日日期

			this.count    = this.solarDays(year, month);    //公历当月天数
			this.firstWeek = firstDate.getDay();    //公历当月1日星期几
//			console.log("公历当月天数：" + this.count);
//			console.log("公历当月1日星期几：" + this.firstWeek);

			// 保存当前月的日期信息，如果当月1日不是周日，前面补空白，有几天补几天
			var maxDay = $.core.arr.copy(this.maxMonthDay);
			var format = (this.firstWeek == 0) ? [] : new Array(this.firstWeek).join().split(",");
			format = format.concat(maxDay.splice(0, this.count));
			
			var timeDiff = 0;
			(typeof $CONFIG != 'undefined') && $CONFIG && $CONFIG.timeDiff && (timeDiff =$CONFIG.timeDiff);
			var years = [];
			var startYear = this.defaultStartDate.getFullYear();
			var endYear = new Date(new Date(this.end.year,this.end.month,this.end.date).getTime() - timeDiff).getFullYear();
			var diff = endYear - startYear;
			var i = 0;
			while(i <= diff){
				years.push(startYear + i);
				i ++;
			}
			this.data = {
				'today' : this.today,
				'showDate' : this.showDate,
				'start' : this.start,
				'end' : this.end,
				'dates' : format,
				'years' : years,
				'hidePastMonth' : hidePastMonth,
				'currDate' : this.getDefaultDate()
			};
			if(hidePastMonth){
				this.data.isStartOrEnd = this.data.start.year == this.showDate.year
						|| this.data.end.year == this.showDate.year;
			}
			this.showUI();
		},
		// 控制 UI 渲染
		'showUI' : function () {
			var core = $.core;
			var html;
			var template;
			var viewerHTML;
			var buffer;
			var cal = this.getContainer();
			if(cal == null){
				html = getHtml();//$.common.feed.groupAndSearch.template.calendar;
//				html = '<div node-type="calendar" class="pc_caldr" style="top:' + pos.t + 'px;left:' + pos.l + 'px;">' + html + '</div>';
				html = '<div node-type="calendar" class="pc_caldr">' + html + '</div>';
				template = core.util.easyTemplate(html);
				viewerHTML = template(this.data).toString();
				viewerHTML = $.utils.kit.extra.language(viewerHTML);
				buffer = core.dom.builder(viewerHTML);
				
				$.utils.kit.dom.layoutPos(buffer.list['calendar'][0], this.source, {
					'pos' : 'left-bottom',
					'offsetX' : 0,
					'offsetY' : 0
				});
				cal = this.getContainer();
				that = this;
				this.delegate(cal);
				$.core.evt.addEvent(document.body, "click", clickClose);
			} else {
				html = getHtml();//$.common.feed.groupAndSearch.template.calendar;
				template = core.util.easyTemplate(html);
				viewerHTML = template(this.data).toString();
				viewerHTML = $.utils.kit.extra.language(viewerHTML);
				removeEvent();
				cal.innerHTML = viewerHTML;
				cal.style.cssText = 'display:block;';
				$.utils.kit.dom.layoutPos(cal, this.source, {
					'pos' : 'left-bottom',
					'offsetX' : 0,
					'offsetY' : 0
				});
				if(cal.style.display != "none"){
					$.core.evt.addEvent(document.body, "click", clickClose);
				}
				that = this;
				bindEvent(cal);
			}
			if (this.showback && typeof this.showback == "function") {
				this.showback(this.data);
			}
			this.node = cal;
			$.core.evt.stopEvent();
		},
		'getContainer' : function () {
			var cal = $.core.dom.sizzle('[node-type="calendar"]', document.body);
			cal = (cal.length > 0) ? cal[0] : null;
			return cal;
		},
		'setYear' : function (year) {
			this.showDate.year = year;
			if(year == this.start.year){
				this.showDate.month = this.start.month;
			}
			if(year == this.end.year){
				this.showDate.month = this.end.month;
			}
			this.getCurrentMonthInfo(this.data.hidePastMonth);
			// this.showUI();
		},
		'setMonth' : function (month) {
			this.showDate.month = month * 1;
			this.getCurrentMonthInfo(this.data.hidePastMonth);
			// this.showUI();
		},
		'setDate' : function (date) {
			date = date.replace(/(\d+)/g, function(a, b){
				return (b.length == 1) ? "0" + b : b;
			});
			clickClose();
			//this.node.style.display = "none";
			this.source.value = date;
			//$.core.evt.removeEvent(document.body, "click", clickClose);
			if (this.callback && typeof this.callback == "function") {
				this.callback(date);
			}
		},
		'delegate' : function(node){
			
			// 事件代理
			var delegate = $.core.evt.delegatedEvent(node);
			
			// -- 开始事件委托绑定 --
			delegate.add('date', 'click', function(spec){
					that.setDate(spec.el.title);
				});
			bindEvent(node);	
			$.core.evt.addEvent(node, "click", stopEvent);
		}
	};
	
	var changeDom = {};
	function removeEvent() {
		if(changeDom && changeDom.year) {
			$.removeEvent(changeDom.year , 'change' , yearChange);			
		}
		if(changeDom && changeDom.month) {
			$.removeEvent(changeDom.month , 'change' , monthChange);			
		}				
	}
	function bindEvent(node) {
		var list = $.core.dom.builder(node).list;
		$.addEvent(list.year[0] , 'change' , yearChange);
		$.addEvent(list.month[0], 'change' , monthChange);
		changeDom.year =  list.year[0];
		changeDom.month =  list.month[0];
	}
	function monthChange(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		var month = target.value;
		if(month != that.showDate.month){
			that.setMonth(month);
		}		
	};
	function yearChange(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		var year = target.value;
		if(year != that.showDate.year){
			that.setYear(year);
		}
	};
	
	return calendar;
	
});