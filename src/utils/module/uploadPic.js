/**
 * module.uploadPic
 * @id STK.
* @author WK | wukan@staff.sina.com.cn
* @param {object} node 组件节点
* @param {object} opts 包括开始回调和结束回调
 * @example
 * 
*/
$Import('utils.kit.dom.parseDOM');
$Import('common.extra.imageURL');

STK.register('utils.module.uploadPic', function($){
	return function(node,opts) {
		var that = {};
		var nodes;
		var addEvent = $.core.evt.addEvent;
		var UPLOADDOMAIN = "picupload.service.weibo.com";
		
		//var UPLOADDOMAIN = "picupload.t.sina.com.cn";
		//---变量定义区----------------------------------
		//----------------------------------------------
		var _that = opts;
		var _abaurl = document.domain;
		opts.args = {
			'marks' : 1,
			'app' : 'miniblog',
			's' : 'rdxt',
			'type' : opts.type
		};
		
		var custFuncs = {
			complete : function(ret,opts){
				$.log('complete',ret,_that);
				if(!ret || ret.ret < 0){
					if(_that.err){
						_that.err(ret);
					}else{
						_that.complete(ret);
					}
					return;
				}

				var result = custFuncs.parseInfo(ret);
				$.log('result',result,ret,_that)
				_that.complete(result);
			},
			parseInfo : function(opts){
				var arr = [],name,str, url, obj;
				//url = opts.img_url ? decodeURIComponent(opts.img_url) : (opts.voice_url ? decodeURIComponent(opts.voice_url) : $.common.extra.imageURL(opts.pid));
				if(opts.img_url){
					url = decodeURIComponent(opts.img_url);
				}else {
					if(opts.voice_url){
						url = decodeURIComponent(opts.voice_url);
					}else {
						url = $.common.extra.imageURL(opts.pid);
					}
				}
				obj = {
					url     : url,
					pid     : opts.pid,
					width   : opts.width,
					seconds : opts.seconds
				};
				return obj;
				//var url = opts.img_url ? decodeURIComponent(opts.img_url) : $.common.extra.imageURL(opts.pid);
			}

		};
		//---DOM事件绑定的回调函数定义区---------------------
		var bindDOMFuncs = {		
			upload : function() {
				var imgName = nodes.fileBtn.value;
				if ($.core.str.trim(imgName) === '') {
					return;
				}
				if(opts.start){
					opts.start.call();
				}
				//upLoad.rendLoad();
				$.core.io.ijax({
					'url' : opts.url || 'http://'+UPLOADDOMAIN+'/interface/pic_upload.php',
					'form' : nodes.form,
					'abaurl' : 'http://' + _abaurl + '/aj/static/upimgback.html',
					//'abaurl' : 'http://js.t.sinajs.cn/t5/apps/pro_component/_html/message/upimgback.html',
					'abakey' : 'cb',
					'onComplete' :custFuncs.complete,
					'onTimeout' : opts.timeout,
					'args' : opts.args
				});
			}
		};

		//-------------------------------------------

		//---自定义事件绑定的回调函数定义区--------------------
		var bindCustEvtFuns = {

		};
		//----------------------------------------------

		//---广播事件绑定的回调函数定义区---------------------
		var bindListenerFuns = {
		};
		//-------------------------------------------

		//---组件的初始化方法定义区-------------------------
		/**
		* 初始化方法
		* @method init
		* @private
		*/
		var init = function() {
			argsCheck();
			parseDOM();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------

		//---参数的验证方法定义区---------------------------
		/**
		* 参数的验证方法
		* @method init
		* @private
		*/
		var argsCheck = function() {
			if(!node) throw "node is not defined";
		};

		//-------------------------------------------

		//---Dom的获取方法定义区---------------------------
		/**
		* Dom的获取方法
		* @method parseDOM
		* @private
		*/
		var parseDOM = function() {
			nodes = $.utils.kit.dom.parseDOM($.core.dom.builder(node).list);
			if(!nodes.fileBtn)throw '[common.content.uploadPic]: nodes.fileBtn is not defined.';
			if(!nodes.form)throw '[common.content.uploadPic]: nodes.form is not defined.';
		};
		//-------------------------------------------



		//---模块的初始化方法定义区-------------------------
		/**
		* 模块的初始化方法
		* @method initPlugins
		* @private
		*/
		var initPlugins = function() {
		};
		//-------------------------------------------

		//---DOM事件绑定方法定义区-------------------------
		/**
		* DOM事件绑定方法
		* @method bindDOM
		* @private
		*/
		var bindDOM = function() {
			addEvent(nodes.fileBtn, 'change', bindDOMFuncs.upload);
		};
		//-------------------------------------------

		//---自定义事件绑定方法定义区------------------------
		/**
		* 自定义事件绑定方法
		* @method bindCustEvt
		* @private
		*/
		var defineEvt = function(){
		};
		var bindCustEvt = function() {
		};

		//-------------------------------------------

		//---广播事件绑定方法定义区------------------------
		var bindListener = function() {

		};
		//-------------------------------------------


		//---组件公开方法的定义区---------------------------
		/**
		* 组件销毁方法
		* @method destroy
		*/
		var destroy = function() {
		};
		var API = {
		};
		//-------------------------------------------

		//---组件公开属性或方法的赋值区----------------------
		that.destroy = destroy;

		//-------------------------------------------
		init();
		return that;
	};
});
