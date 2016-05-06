steel.d("ui/calendar", ["utils/kit/dom/parseDOM","ui/calendarTemp"],function(require, exports, module) {
/**
 * 
 * @id $.comp.calendar
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author jianqing1@staff.sina.com.cn
 * @example
 *
 */

require("utils/kit/dom/parseDOM");
require("ui/calendarTemp");

STK.register('ui.calendar', function($){
	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------

	return function(opts){

		var calendar, today = new Date();

		// 每个月的天数
		var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		// 每个月具体日期，根据具体情况截取部分
		var maxMonthDay = [	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
							16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
		// 返回公历 y年m+1月的天数
		var solarDays = function (y, m) {
			if(m == 1){
				return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
			} else {
				return (solarMonth[m]);
			}
		};

		calendar = {
			//'html' : '',
			'data' : $.parseParam({
				'year' : today.getFullYear(),
				'month' : today.getMonth() + 1,
				'availableStart' : '',
				'availableEnd' : '',
				'selectedStart' : '',
				'selectedEnd' : '',
				'hasBound' : false,
				'selectedType' : 0    //selectedType: 0-选中0天，1-选中>=1天
			}, opts),
			'getHtml' : function(){
				var d = {};

				d['year'] = this.data.year;
				d['month'] = this.data.month;
				var dateCount = solarDays(d['year'], d['month']);

				d['dates'] = maxMonthDay.slice(0, dateCount);
				var startDateofThisMonth = new Date(d['year'], d['month'], 1);
				var sCount = startDateofThisMonth.getDay();
				for(var i = 0; i < sCount; i++){
					d['dates'].unshift('');
				}

				d['sType'] = this.data.selectedType;
				if(d['sType'] == 1){
					d['sStart'] = {
						'year' : this.data.selectedStart.getFullYear(),
						'month' : this.data.selectedStart.getMonth(),
						'date' : this.data.selectedStart.getDate()
					};
					d['sEnd'] = {
						'year' : this.data.selectedEnd.getFullYear(),
						'month' : this.data.selectedEnd.getMonth(),
						'date' : this.data.selectedEnd.getDate()
					};
				}

				d['hasBound'] = this.data.hasBound;

				if(d['hasBound']){
					d['bStart'] = {
						'year' : this.data.availableStart.getFullYear(),
						'month' : this.data.availableStart.getMonth(),
						'date' : this.data.availableStart.getDate()
					};
					d['bEnd'] = {
						'year' : this.data.availableEnd.getFullYear(),
						'month' : this.data.availableEnd.getMonth(),
						'date' : this.data.availableEnd.getDate()
					};
				}

				return $.core.util.easyTemplate($.ui.calendarTemp, d);
			}
		};
		return calendar;
	};
	
});

});