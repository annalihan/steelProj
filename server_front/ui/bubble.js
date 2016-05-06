steel.d("ui/bubble", ["utils/module/bubble"],function(require, exports, module) {
require("utils/module/bubble");

STK.register('ui.bubble', function($){
	var TEMP = '' + 
	'<div class="W_layer W_layer_pop" node-type="outer">' +
		'<div class="content">' +
			'<div class="W_layer_close">' +
				'<a class="W_ficon ficon_close S_ficon" href="javascript:void(0);" node-type="close" title="关闭">X</a>' + 
			'</div>' +
			'<div node-type="inner">' +
			'</div>' +
			'<div class="W_layer_arrow">' +
				'<span class="W_arrow_bor W_arrow_bor_t" node-type="arrow"><i class="S_line3"></i><em class="S_bg2_br"></em></span>' +
			'</div>' +
		'</div>' +
	'</div>';
	
	var cache = [];
	
	var createBubble = function(args){
		var bub = $.utils.module.bubble(TEMP,args);
		$.custEvent.add(bub, 'hide', function(){
			setUnused(bub);
			clearUsed(bub);
		});
		cache.push({'bub' : bub, 'used' : true});
		return bub;
	};
	
	var clearUsed = function(bub){
		bub.clearContent();
		document.body.appendChild(bub.getOuter());
	};
	
	var setUsed = function(bub){
		for(var i = 0, len = cache.length; i < len; i += 1){
			if(bub === cache[i]['bub']){
				cache[i]['used'] = true;
				return ;
			}
		}
	};
	
	var setUnused = function(bub){
		for(var i = 0, len = cache.length; i < len; i += 1){
			if(bub === cache[i]['bub']){
				cache[i]['used'] = false;
				return ;
			}
		}
	};
	
	
	
	var getBubble = function(args){
		var bub;
		for(var i = 0, len = cache.length; i < len; i += 1){
			if(!cache[i]['used']){
				cache[i]['used'] = true;
				bub = cache[i]['bub'];
				return bub;
			}
		};
		bub = createBubble(args);
		return bub;
	};
	
	return function(spec){
		return getBubble($.parseParam({},spec));
	};
});

});