steel.d("ui/alertUnitV6", ["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/unitLayer","ui/dialog"],function(require, exports, module) {
// 粉服组件调用
require("utils/kit/extra/language");
require("utils/kit/extra/reuse");
require("utils/module/unitLayer");
require("ui/dialog");

/**
 * author Robin Young | yonglin@staff.sina.com.cn
 */

STK.register('ui.alertUnitV6',function($){
	
	var TEMP = '' +
		'<div node-type="unitOuter" class="unit_outer">' +
			'<div class="layer_point" node-type="unitInner">' +
				'<dl class="point clearfix">' +
					'<dt>' +
						'<span class="W_icon" node-type="icon"></span>' +
					'</dt>' +
					'<dd>' +
						'<p class="W_f14" node-type="text"></p>' +
					'</dd>' +
				'</dl>' +
			'</div>' +
			'<div class="W_layer_btn S_bg1">' +
		    	'<a class="W_btn_a btn_34px" href="javascript:;" node-type="OK"><span></span></a>' +
		    '</div>' +
	    '</div>';
	var ICON = {
		'success' : 'W_icon icon_succB',
		'error' : 'W_icon icon_rederrorB',
		'warn' : 'W_icon icon_warnB',
		'question' : 'W_icon icon_askB'
	};
	
	var lang = $.utils.kit.extra.language;
	
	var cache = null;
	
	var rend = function(alt, args){
		alt.getDom('icon').className = args['icon'];
		alt.getDom('text').innerHTML = args['text'];
		alt.getDom('OK').innerHTML = args['OKText'];
	};	
	return function(info, spec){
		var conf, that, alt, dia, tm;;
		conf = $.parseParam({
			'title' : lang('#L{提示}'),
			'icon' : 'warn',
			'text' : info,
			'OK' : $.funcEmpty,
			'OKText' : lang('#L{确定}'),
			'timeout' : 0
		}, spec);
		conf['icon'] = ICON[conf['icon']];
		that = {};
		
		if(!cache){
			cache = $.utils.kit.extra.reuse(function(){
				var alt = $.utils.module.unitLayer(lang(TEMP));
				return alt;
			});
		}
		alt = cache.getOne();
		dia = $.ui.dialog();
		dia.setContent(alt.getOuter());
		dia.setTitle(conf['title']);
		
		rend(alt, conf);
		
		$.addEvent(alt.getDom('OK'), 'click', dia.hide);
		$.custEvent.add(dia, 'hide', function(){
			$.custEvent.remove(dia,'hide',arguments.callee);
			$.removeEvent(alt.getDom('OK'),'click',dia.hide);
			cache.setUnused(alt);
			clearTimeout(tm);
			conf['OK']();
		});
		
		if(conf['timeout']){
			tm = setTimeout(dia.hide,conf['timeout']);
		}
		
		dia.show().setMiddle();
		that.alt = alt;
		that.dia = dia;
		return that;
	};
});
});