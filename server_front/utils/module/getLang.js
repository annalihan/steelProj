steel.d("utils/module/getLang", [],function(require, exports, module) {
/**
 * module.getLang
 * @id STK.
 * @author WK | wukan@staff.sina.com.cn
 * @example
 * 
 */
STK.register('utils.module.getLang', function($){
	return function(node,opts) {
		return $CONFIG['lang'];
	}
});

});