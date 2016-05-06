steel.d("ui/multiCalendar", ["utils/kit/dom/parseDOM","utils/kit/dom/layoutPos","utils/kit/extra/language","ui/calendar"],function(require, exports, module) {
/**
 * @id $.comp.multiCalendar
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author jianqing1@staff.sina.com.cn
 * @example
 *
 */

require("utils/kit/dom/parseDOM");
require("utils/kit/dom/layoutPos");
require("utils/kit/extra/language");
require("ui/calendar");

STK.register('ui.multiCalendar', function($){
	return function(opts){
		var multiCalendar, today = new Date(), dEvent, lang = $.utils.kit.extra.language;

		var multiCalendarTemp =
			'<div class="horizon_caldr" node-type="multiCalendar" style="top:100px;left:200px;z-index:150">' +
				'<div class="caldr_content">' +
				    '<ul class="caldr_scroll" style="width:1000px;" node-type="calendarList"></ul>' +
				    '<a href="javascript:void(0);" class="W_btn_prev caldr_left" node-type="preBtn"><em class="W_ficon ficon_arrow_left S_ficon ">b</em></a>' +
				    '<a href="javascript:void(0);" class="W_btn_next caldr_right" node-type="nextBtn"><em class="W_ficon ficon_arrow_right S_ficon">a</em></a>' +
			    '</div>' +
			    '<div class="caldr_end">' +
				    '<span class="btn">' +
					    '<a href="javascript:void(0);" class="W_btn_e_02" node-type="submit"><span>#L{确定}</span></a>' +
						'<a href="javascript:void(0);" class="W_btn_e_08" node-type="cancel"><span>#L{取消}</span></a>' +
				    '</span>' +
				    '<p class="clue" node-type="tip">#L{小提示：目前只能查看' + opts.availableStart + '以后的数据}</p>' +
			    '</div>' +
			'</div>';

		//解决兼容性问题：firefox下支持new Date('2012-05-01')，但不支持new Date('2012-5-1')
		var getDayFromString = function(dStr){
			if(!dStr || typeof dStr != 'string')
				return dStr;
			var arr = dStr.split(/[-\.]/);
			if(arr.length != 3)
				return dStr;
			var y = parseInt(arr[0]);
			var m = parseInt(arr[1], 10);
			var d = parseInt(arr[2], 10);
			return new Date(y, m - 1, d);
		};

		if(opts.availableStart)
			opts.availableStart = getDayFromString(opts.availableStart);
		if(opts.availableEnd)
			opts.availableEnd = getDayFromString(opts.availableEnd);
		if(opts.selectedStart)
			opts.selectedStart = getDayFromString(opts.selectedStart);
		if(opts.selectedEnd)
			opts.selectedEnd = getDayFromString(opts.selectedEnd);

		multiCalendar = {
			'DOM' : {},
			'instances' : [],
			'data' : $.parseParam({
				'showDate' : today,
				'availableStart' : '',
				'availableEnd' : '',
				'selectedStart' : '',
				'selectedEnd' : '',
				'count' : 2,
				'limitLen' : 0,
				'source' : document.body,
				'callback' : function(){}
			}, opts),
			'container' : null,
			'hasBound' : false,    //标记有没有日期的范围~
			'createInstances' : function(){
				multiCalendar.hasBound =
					((this.data['availableStart'].toString() != '') && (this.data['availableEnd'].toString() != ''));
				for(var i = 0; i < this.data.count; i++){
					var y = this.data.showDate.getFullYear();
					var m = this.data.showDate.getMonth() + 1 - this.data.count + i;
					this.instances.push(new $.ui.calendar({
						'year' : (m >= 0) ? y : (y - 1),
						'month' : (m >= 0) ? m : (12 + m),
						'availableStart' : this.data.availableStart,
						'availableEnd' : this.data.availableEnd,
						'selectedStart' : this.data.selectedStart,
						'selectedEnd' : this.data.selectedEnd,
						'hasBound' : this.hasBound,
						'selectedType' : multiCalendar.data.selectedStart ? 1 : 0
					}));
				}
			},
			'showUI' : function(){
				var container = multiCalendar.getContainer();
				multiCalendar.container = container;
				if(!container){
					var buffer = $.core.dom.builder(lang(multiCalendarTemp));
					var s = '';
					for(var i = 0; i < this.instances.length; i++){
						s += this.instances[i].getHtml();
					}
					buffer.list['calendarList'][0].innerHTML = lang(s);
					$.utils.kit.dom.layoutPos(buffer.list['multiCalendar'][0], this.data.source, {
						'pos' : 'left-bottom',
						'offsetX' : opts && opts['left'] || -350,
						'offsetY' : opts && opts['top'] || 0
					});
					multiCalendar.container = this.getContainer();
					this.DOM = $.utils.kit.dom.parseDOM($.builder($.sizzle('[node-type=multiCalendar]')[0]).list);
				} else{
					$.utils.kit.dom.layoutPos(container, this.data.source, {
						'pos' : 'left-bottom',
						'offsetX' : opts && opts['left'] || -350,
						'offsetY' : opts && opts['top'] || 0
					});
					this.DOM = $.utils.kit.dom.parseDOM($.builder(multiCalendar.container).list);
					multiCalendar.refreshUI();
					multiCalendar.container.style.display = 'block';
				}
			},
			'refreshUI' : function(){
				var limitLen = multiCalendar.data['limitLen'];
				var min, max, _hasBound = multiCalendar.hasBound;

				//获取最新边界值
				if(limitLen){
					_hasBound = true;

					if(multiCalendar.data.selectedStart != '' && multiCalendar.data.selectedStart == multiCalendar.data.selectedEnd){
						min = new Date(multiCalendar.data.selectedStart.getTime());
						max = new Date(multiCalendar.data.selectedEnd.getTime());

						min.setDate(min.getDate() - limitLen);
						max.setDate(max.getDate() + limitLen);

						if(multiCalendar.hasBound){
							var availableStart = multiCalendar.data.availableStart;
							min = (min < availableStart) ? availableStart : min;
							var availableEnd = multiCalendar.data.availableEnd;
							max = (max > availableEnd) ? availableEnd : max;
						}
					} else{
						if(multiCalendar.hasBound){
							min = multiCalendar.data.availableStart;
							max = multiCalendar.data.availableEnd;
						} else{
							_hasBound = false;
						}
					}
				}

				var s = '';
				for(var i = 0; i < this.instances.length; i++){
					this.instances[i].data.selectedStart = multiCalendar.data.selectedStart;
					this.instances[i].data.selectedEnd = multiCalendar.data.selectedEnd;
					this.instances[i].data.selectedType = multiCalendar.data.selectedStart ? 1 : 0;

					if(limitLen){
						this.instances[i].data.availableStart = min;
						this.instances[i].data.availableEnd = max;
						this.instances[i].data.hasBound = _hasBound;
					}

					s += this.instances[i].getHtml();
				}
				multiCalendar.DOM['calendarList'].innerHTML = lang(s);
			},
			'changeSelected' : function(obj){
				var newDate = new Date(obj.data.year, obj.data.month, obj.data.date);
				var sDate = multiCalendar.data.selectedStart;
				var eDate = multiCalendar.data.selectedEnd;
				if(sDate == '' || eDate == '' ||
				   sDate.getFullYear() != eDate.getFullYear() ||
				   sDate.getMonth() != eDate.getMonth() ||
				   sDate.getDate() != eDate.getDate()){
					multiCalendar.data.selectedStart = multiCalendar.data.selectedEnd = newDate;
				} else{
					if(multiCalendar.data.selectedStart < newDate){
						multiCalendar.data.selectedEnd = newDate;
					} else{
						multiCalendar.data.selectedStart = newDate;
					}
				}
				multiCalendar.refreshUI();
			},
			'showPre' : function(){
				for(var i = 0; i < multiCalendar.instances.length; i++){
					multiCalendar.instances[i].data.month--;
					if(multiCalendar.instances[i].data.month < 0){
						multiCalendar.instances[i].data.year--;
						multiCalendar.instances[i].data.month = 11;
					}
				}
				multiCalendar.refreshUI();
			},
			'showNext' : function(){
				for(var i = 0; i < multiCalendar.instances.length; i++){
					multiCalendar.instances[i].data.month++;
					if(multiCalendar.instances[i].data.month > 11){
						multiCalendar.instances[i].data.year++;
						multiCalendar.instances[i].data.month = 0;
					}
				}
				multiCalendar.refreshUI();
			},
			'submit' : function(){
				var d = {};
				d['startDate'] = multiCalendar.data.selectedStart;
				d['endDate'] = multiCalendar.data.selectedEnd;
				/*if(multiCalendar.data.source){
					var s = '';
					s += d['startDate'].getFullYear() + '年' + (d['startDate'].getMonth() + 1) + '月' + d['startDate'].getDate() + '日';
					s += ' - ';
					s += d['endDate'].getFullYear() + '年' + (d['endDate'].getMonth() + 1) + '月' + d['endDate'].getDate() + '日';
					multiCalendar.data.source.value = s;
				}*/
				if(d['startDate'] && d['endDate']){
					multiCalendar.data.callback(d);
					multiCalendar.close();
				}
			},
			'close' : function(){
				multiCalendar.container.style.display = 'none';
				dEvent.remove('date', 'click', multiCalendar.changeSelected);
				$.removeEvent(multiCalendar.DOM['preBtn'], 'click' , multiCalendar.showPre);
				$.removeEvent(multiCalendar.DOM['nextBtn'], 'click' , multiCalendar.showNext);
				$.removeEvent(multiCalendar.DOM['submit'], 'click' , multiCalendar.submit);
				$.removeEvent(multiCalendar.DOM['cancel'], 'click' , multiCalendar.close);
				$.removeEvent(document.body, 'click', multiCalendar.clickClose);
			},
			'clickClose' : function(){
				var ev = STK.core.evt.getEvent();
				var con = multiCalendar.getContainer();

				if(!$.core.evt.hitTest(con, ev)){
					multiCalendar.close();
				}
			},
			'getContainer' : function () {
				var cal = $.core.dom.sizzle('[node-type="multiCalendar"]', document.body);
				cal = (cal.length > 0) ? cal[0] : null;
				return cal;
			}
		};

		var bindDOMEvent = function(){
			dEvent = $.delegatedEvent($.sizzle('[node-type=multiCalendar]')[0]);
			dEvent.add('date', 'click', multiCalendar.changeSelected);

			$.addEvent(multiCalendar.DOM['preBtn'], 'click' , multiCalendar.showPre);
			$.addEvent(multiCalendar.DOM['nextBtn'], 'click' , multiCalendar.showNext);

			$.addEvent(multiCalendar.DOM['submit'], 'click' , multiCalendar.submit);
			$.addEvent(multiCalendar.DOM['cancel'], 'click' , multiCalendar.close);

			$.addEvent(document.body, 'click', multiCalendar.clickClose);
		};

		var init = function(){
			multiCalendar.createInstances();
			multiCalendar.showUI();
			bindDOMEvent();

		};

		init();


		return multiCalendar;
	};
	
});

});