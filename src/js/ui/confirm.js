/**
 * author wudi3@staff.sina.com.cn
 */

$Import('utils.kit.extra.language');
$Import('ui.dialog');
$Import('utils.module.layer');

STK.register('ui.confirm',function($){
	var TEMP = ''+
		'<div node-type="outer">' +
			'<div class="layer_point">' +
				'<dl class="point clearfix">' +
					'<dt><span class="" node-type="icon"></span></dt>' +
					'<dd node-type="inner">'+
						'<p class="S_txt1" node-type="textLarge"></p>'+
					'</dd>' +
				'</dl>' +
			'</div>' +
			'<div class="W_layer_btn S_bg1">'+
				'<a href="javascript:void(0)" class="W_btn_a btn_34px" node-type="OK"></a>'+
				'<a href="javascript:void(0)" class="W_btn_b btn_34px" node-type="cancel"></a>'+
			'</div>' +
		'</div>';
	
	var ICON = {
		'success' : 'W_icon icon_succB',
		'delete' : 'W_icon icon_warnB',
		'error' : 'W_icon icon_rederrorB',
		'warn' : 'W_icon icon_warnB',
		'question' : 'W_icon icon_questionB'
	};
	
	var lang = $.utils.kit.extra.language;
	
	var cache = null;
	
	return function(content, spec){
		var conf, that, cfm, dia, status, nodeObj;
		conf = $.parseParam({
			'title' : lang('#L{提示}'),
			'icon' : 'question',
			'textLarge' : content,
			'OK' : $.funcEmpty,
			'OKText' : lang('#L{确定}'),
			'cancel' : $.funcEmpty,
			'cancelText' : lang('#L{取消}')
		},spec);
		conf['icon'] = ICON[conf['icon']];
		
		that = {};
		
		if(!cache){
			cache = $.utils.kit.extra.reuse(function(){
				var cfm = $.utils.module.layer(TEMP);
				return cfm;
			});
		}
		cfm = cache.getOne();
		dia = $.ui.dialog();
		dia.setContent('');
		dia.setContent(cfm.getOuter());
		cfm.getDom('icon').className = conf['icon'];
		cfm.getDom('textLarge').innerHTML = conf['textLarge'];
		cfm.getDom('OK').innerHTML = '<span>' + conf['OKText'] + '</span>';
		cfm.getDom('cancel').innerHTML = '<span>' + conf['cancelText'] + '</span>';
		dia.setTitle(conf['title']);
		var okFunc = function(){
			status = true;
			nodeObj = $.htmlToJson(cfm.getDom('textComplex'));
			dia.hide();
		};
		$.addEvent(cfm.getDom('OK'),'click',okFunc);
		$.addEvent(cfm.getDom('cancel'),'click',dia.hide);
		
		$.custEvent.add(dia,'hide',function(){
			$.custEvent.remove(dia,'hide',arguments.callee);
			$.removeEvent(cfm.getDom('OK'),'click',okFunc);
			$.removeEvent(cfm.getDom('cancel'),'click',dia.hide);
			cache.setUnused(cfm);
			if(status){
				conf['OK'](nodeObj);
			}else{
				conf['cancel'](nodeObj);
			}
		});
		dia.show().setMiddle();
		that.cfm = cfm;
		that.dia = dia;
		return that;
	};
});