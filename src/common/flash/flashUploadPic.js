/**
 *
 * @id $.comp.edit.flashUploadPic
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author jianqing1@staff.sina.com.cn
 * @example
 *
 */
$Import('utils.kit.extra.language');
$Import('common.flash.fileUpload');

STK.register('common.flash.flashUploadPic', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------

	return function(node, opts){

		var that = {};
        var lang = $.utils.kit.extra.language;

		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM : {}, //节点容器
			objs : {} //组件容器
		};


		//----------------------------------------------

		var initUploaderWithCrop = function(){

			if($.core.util.swf.check() == '-1'){
				uploadBtn.parentNode.innerHTML = lang('#L{您还没有安装flash播放器,请点击 <a target="_blank" href="http://www.adobe.com/go/getflash">这里</a> 安装}');
				return;
			}
			var _conf = $.parseParam({
				id:'swf_upbtn_' + $.getUniqueKey(),
				flashPath : 'apps/pro_component/static/swf/MultiFileUpload.swf',
				h : opts.h || 100,
				w : opts.w || 100,
				isSetRelative : false,
				imgMaxWidth : opts.imgMaxWidth,
				imgMaxHeight : opts.imgMaxHeight,
				showLoading : opts.showLoading || false,
				isOriginal : opts.isOriginal || false,
				minSize : opts.minSize || false,
				size: 5242880,
				maxFileNum: opts['number']||1,
				fileFilter : opts['fileFilter']||'',
				uploaded:function (obj, json) {
					$.log("uploaded", arguments);
					if(json.error.length > 0){
						//_this.showErrTip($L("#L{上传失败！请上传5M以内的JPG、GIF、PNG图片。}"));
						return;
					}

					//_this.addPic(json.data[0].pid);
				},
				uploading:function(){
					//console.log('uploading');
				},
				error:function (it, errorObj) {
					//_this.showErrTip($L("#L{上传失败！请上传5M以内的JPG、GIF、PNG图片。}"));
					//console.log('err')
				}
			}, opts);

			var dom = node;
			//创建flash占位dom
			var pdiv = $.C('div');
			//创建flash替换dom
			var fdiv = $.C('div');
			fdiv.setAttribute('id',_conf.id);
			pdiv.appendChild(fdiv);
			dom.appendChild(pdiv);
			//设定容器样式
			if(_conf.isSetRelative){
				dom.style.position = 'relative';
			}

			pdiv.setAttribute('node-type', 'cropper');
			pdiv.style.cssText = 'position:absolute;left:0;top:0;display:block;overflow:hidden;filter:alpha(opacity=0);opacity:0;-moz-opacity:0;z-index:90';
			pdiv.style.width = _conf.w + "px";
			pdiv.style.height = _conf.h + "px";

			try {
				_this.objs.uploader = $.common.flash.fileUpload(_conf);
			} catch (e) {
				$.log("error:", e.message);
			}
		};

		initUploaderWithCrop();

		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		var destroy = function(){
			if(_this) {
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;

		//-------------------------------------------


		return that;
	};

});
