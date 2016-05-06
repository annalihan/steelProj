steel.d("utils/kit/extra/language", [],function(require, exports, module) {
STK.register('utils.kit.extra.language', function($){
	window.$LANG || (window.$LANG = {});
	return function(temp, data){
		var str = $.core.util.language(temp, $LANG);
		str = str.replace(/\\}/ig, '}');
		if(data){
			str =  $.templet(str, data);
		}
		return str;
	};
	
});
});