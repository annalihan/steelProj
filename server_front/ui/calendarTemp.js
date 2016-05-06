steel.d("ui/calendarTemp", [],function(require, exports, module) {
/**
 * @fileoverview
 * 日期选择器HTML模版
 * @author jianqing1@staff.sina.com.cn
 * @history
 */
STK.register("ui.calendarTemp", function($){
	
	var html = '' +
	'<#et userlist data>' +
		'<li class="clearfix caldr">' +
			'<p class="month">${data.year}#L{年}${data.month+1}#L{月}</p>' +
			'<ul class="weeks">' +
				'<li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li>' +
				//'<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>' +
			'</ul>' +
			'<ul class="days">' +
				'<#list data.dates as list>' +
					'<li>' +
					'<#if (list != "")>' +

						'<#if (' +
							    'data.hasBound && (' +
								'(data.year < data.bStart.year) ||' +
								'(data.year == data.bStart.year && data.month < data.bStart.month) || ' +
								'(data.year == data.bStart.year && data.month == data.bStart.month && list < data.bStart.date) ||' +
								'(data.year > data.bEnd.year) ||' +
								'(data.year == data.bEnd.year && data.month > data.bEnd.month) || ' +
								'(data.year == data.bEnd.year && data.month == data.bEnd.month && list > data.bEnd.date)' +
						'))>' +
							//不可选区域
							'${list}' +
						'<#else>' +
							'<#if (data.sType == 1)>' +
								'<#if (' +
										'(data.year < data.sStart.year) ||' +
										'(data.year == data.sStart.year && data.month < data.sStart.month) || ' +
										'(data.year == data.sStart.year && data.month == data.sStart.month && list < data.sStart.date) ||' +
										'(data.year > data.sEnd.year) ||' +
										'(data.year == data.sEnd.year && data.month > data.sEnd.month) || ' +
										'(data.year == data.sEnd.year && data.month == data.sEnd.month && list > data.sEnd.date)' +
								')>' +
									//可选区域
									'<a action-type="date" href="#date" onclick="return false;" ' +
										'title="${data.year}-${data.month+1}-${list}" ' +
										'year="${data.year}" month="${data.month+1}" day="${list}" ' +
										'action-data="year=${data.year}&month=${data.month}&date=${list}"' +
										'><strong>${list}</strong></a>' +
								'<#else>' +
									//选中区域
									'<a class="day" action-type="date" href="#date" onclick="return false;" ' +
										'title="${data.year}-${data.month+1}-${list}" ' +
										'year="${data.year}" month="${data.month+1}" day="${list}" ' +
										'action-data="year=${data.year}&month=${data.month}&date=${list}"' +
										'><strong>${list}</strong></a>' +
								'</#if>' +
							'<#else>' +
								//可选区域
								'<a action-type="date" href="#date" onclick="return false;" ' +
									'title="${data.year}-${data.month+1}-${list}" ' +
									'year="${data.year}" month="${data.month+1}" day="${list}" ' +
									'action-data="year=${data.year}&month=${data.month}&date=${list}"' +
									'><strong>${list}</strong></a>' +
							'</#if>' +
						'</#if>' +
					'</#if>' +
					'</li>' +
				'</#list>' +
			'</ul>' +
		'</li>';

	return html;
	
});
});