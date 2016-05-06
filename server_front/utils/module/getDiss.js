steel.d("utils/module/getDiss", ["utils/kit/dom/parentAttr","utils/kit/extra/merge"],function(require, exports, module) {
/**
 * @author runshi@staff.sina.com.cn
 * Get diss-data
 * 
 * 对第一个参数进行识别:
 *    object  :此参数作为元数据参与进行merge;
 *    element :只进行diss-data的获取。
 * 
 * @param object resource 元数据(可选)
 * @param element node 节点(必选)
 * @param element pNode 父节点限制
 * 
 * @return object
 */
require("utils/kit/dom/parentAttr");
require("utils/kit/extra/merge");
STK.register('utils.module.getDiss', function($){
	return function(){
		var resource = {},
			st = 0,
			staticData = {
				'location': $CONFIG['location']
			};
			
		if(arguments[0] && !$.core.dom.isNode(arguments[0]))
			resource = arguments[st++];
			
		resource = $.utils.kit.extra.merge(resource, staticData);
		
		if(!arguments[st])
			return resource;

		resource = $.utils.kit.extra.merge(resource, $.core.json.queryToJson($.utils.kit.dom.parentAttr(arguments[st++], 'diss-data', arguments[st]) || ''));
		return resource;
	};
});

});