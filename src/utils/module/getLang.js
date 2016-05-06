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
