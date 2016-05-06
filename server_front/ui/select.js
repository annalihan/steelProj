steel.d("ui/select", ["utils/module/layer"],function(require, exports, module) {
/**
 * select选择组件
 * author wudi3@staff.sina.com.cn
 * example:
 *		//dataList必选，target必选（定位），stopLayerClose可选（是否模态）默认false
 *		var opts = {dataList:[{id:'1', name: ''}], target: 'noe', stopLayerClose: false}; 
 *		_this.objs.select = $.ui.select(opts);
 *		$.custEvent.add(_this.objs.test, 'ok', function (ev, json) {
 *			var obj = json;
 *			_this.objs.select = null;
 *			//do something else
 *		});
 */

require("utils/module/layer");

STK.register('ui.select', function ($) {
	var TMPL = '' +
		'<#et temp data>' +
			'<div style="position: absolute; z-index: 100010; display: none;" class="layer_menu_list" node-type="outer">' +
				'<ul class="scroll_bar" node-type="inner">' +
				 	'<#list data.list as item>' +
				 		'<#if (data.current_id == item.id) >' +
					 		'<li class="cur">' +
					 			'<a href="javascript:;" action-type="item" action-data="id=${item.id}" style="padding-right: 20px;">' +
					 				'${item.name}' +
					 			'</a>' +
					 		'</li>' +
					 	'</#if>' +
					 	'<#if (data.current_id != item.id) >' +
					 		'<li>' +
					 			'<a href="javascript:;" action-type="item" action-data="id=${item.id}" style="padding-right: 20px;">' +
					 				'${item.name}' +
					 			'</a>' +
					 		'</li>' +
					 	'</#if>' +
				 	'</#list>' +
				 '</ul>' +
			'</div>' +
		'</#et>';
	return function(spec){
		var conf, that, layer, box, dEvent, data = {};

		var $easyT = $.core.util.easyTemplate;
		var conf = $.parseParam({
			'dataList': [],
			'target': {},
			'stopLayerClose': false,
			'current_id': '-1'
		}, spec);
		data.list = conf.dataList;
		data.current_id = conf.current_id;

		var finalTemplate = $easyT(TMPL, data).toString();
	
		that = {};
		layer = $.utils.module.layer(finalTemplate);
		box = layer.getOuter();
		dEvent = $.delegatedEvent(box);

		$.custEvent.define(that, 'ok');

		var boxClose = function (e) {
			if (conf.stopLayerClose) {
				return;
			}
			var ev = $.fixEvent(e);
			if(!$.contains(box, ev.target)){
				layer.hide();
			}
		};

		$.custEvent.add(layer, 'hide', function () {
			$.custEvent.remove(layer, 'hide', arguments.callee);
			$.removeEvent(document.body, 'click', boxClose);
			dEvent.remove('item', 'click');
			box.parentNode.removeChild(box);
		});

		$.custEvent.add(layer, 'show', function(){
			document.body.appendChild(box);
			setTimeout(function () {
				$.addEvent(document.body, 'click', boxClose);
			}, 0);
		});

		dEvent.add('item', 'click', function(spec){
			var id = spec.data.id;
			var name = spec.el.innerHTML;
			$.custEvent.fire(that, 'ok', {id: id, name: name});
			layer.hide();
		});

		layer.show();

		var nodePos = $.core.dom.position(conf.target);
		box.style.top = nodePos['t'] + 30 + 'px';
		box.style.left = nodePos['l'] + 'px';


		that.stopLayerClose = function(){
			conf.stopLayerClose = true;
			return that;
		};
		
		that.startLayerClose = function(){
			conf.stopLayerClose = false;
			return that;
		};

		that.setPosition = function(pos){
			box.style.top = pos['t'] + 'px';
			box.style.left = pos['l'] + 'px';
			return that;
		};

		that.layer = layer;
		return that;
	};
});
});