steel.d("utils/kit/io/ajax", ["utils/kit/extra/merge"],function(require, exports, module) {
require("utils/kit/extra/merge");

STK.register('utils.kit.io.ajax', function($) {
	/*** url			: 
	 -----------args-------------
	 * onComplete	: 
	 * onTraning	: 
	 * onFail		: 
	 * method		: 
	 * asynchronous	: 
	 * contentType	: 
	 * encoding		: 
	 * responseType	: 
	 * timeout		: 
	 * 
	 */
	return function(args){
		var conf, that, queue, current, lock, complete, fail;
		
		complete = function(res){
			lock = false;
			args.onComplete(res, conf['args']);
			setTimeout(nextRequest,0);//跳出递归
		};
		
		fail = function(res){
			lock = false;
			args.onFail(res, conf['args']);
			setTimeout(nextRequest,0);//跳出递归
		};
		
		queue = [];
		current = null;
		lock = false;
		
		conf = $.parseParam({
			'url'			: '',
			'method'		: 'get',
			'responseType'	: 'json',
			'timeout'		: 30 * 1000,
			'onTraning'		: $.funcEmpty,
			'isEncode' 		: true
		}, args);
		
		conf['onComplete'] = complete;
		conf['onFail'] = fail;
		
		var nextRequest = function(){
			if(!queue.length){
				return ;
			}
			if(lock === true){
				return;
			}
			lock = true;
			conf.args = queue.shift();
			current = $.ajax(conf);
		};
		
		var abort = function(params){
			while(queue.length){
				queue.shift();
			}
			lock = false;
			if(current){
				try{
					current.abort();
				}catch(exp){
				
				}
			}
			current = null;
		};
		
		that = {};
		
		that.request = function(params){
			params=params || {};
			if(!params.superuid){
				!!$CONFIG['superuid'] && (params.superuid = $CONFIG['superuid']);
			}
			if(!params){
				params = {};
			}
			if(args['noQueue']){
				abort();
			}
			if(!args['uniqueRequest'] || !current){
				queue.push(params);
				params['_t'] = 0;
				nextRequest();
			}
		};
		
		that.abort = abort;
		return that;
	};
});
});