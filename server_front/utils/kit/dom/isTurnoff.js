steel.d("utils/kit/dom/isTurnoff", [],function(require, exports, module) {
/**
 * @author wangliang3
 * 判断节点是否被GC、隐藏、disable
 */
STK.register("utils.kit.dom.isTurnoff", function($) {
	return function(el){
		return !(el.parentNode && el.parentNode.nodeType != 11&&!el.disabled);
	}
});
});