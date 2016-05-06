/**
 * 获取下1(n)个节点
 * @param {Object} node
 * @author Runshi Wang|runshi@staff.sina.com.cn
 * 
 * @eg:
 * 
 * <div id="a">0</div>
 * <div>1</div>
 * <div>2</div>
 * <div>3</div>
 * <div id="b">4</div>
 * 
 * STK.kit.dom.next($.E("a")) === <div>1</div>
 * STK.kit.dom.next($.E("a"), 1) === [<div>1</div>]
 * STK.kit.dom.next($.E("a"), 2) === [<div>1</div>, <div>2</div>]
 * STK.kit.dom.next($.E("a"), "除了>=1都可") === [<div>1</div>, <div>2</div>, <div>3</div>, <div>4</div>]
 * STK.kit.dom.next($.E("b"), 1) === []
 */
STK.register('utils.kit.dom.next',function($){
	var nx = $.core.dom.next;
	return function(node) {
		var o = Array.prototype.slice.apply(arguments);
		if(o.length > 1){
			var _c = nx(node);
			var _r = [];
			if(o[1] >= 1){
				do{
					o[1]--;
					_c.nodeType === 1 && _r.push(_c);
				} while(o[1] > 0 && (_c = nx(_c)));	
			} else {
				do{
					_c.nodeType === 1 && _r.push(_c);
				} while(_c = nx(_c));
			}
			return _r;
		}
		
		return nx(node);
	};
});