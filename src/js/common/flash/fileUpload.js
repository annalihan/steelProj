/**
 * @author wangliang3
 * modify by xiongping1@staff.sina.com.cn  2012-05-21
 * modify by gaoxin3@staff.sina.com.cn  2013-13-25 修改了文件的名字,因为与左导重名了,会在注册时候出现点问题,为了能够自己完全控制,所以加了这个文件,并且添加了使用指定flash路径的功能
 */
$Import('utils.kit.extra.swfobject');
$Import('common.extra.imageURL');

STK.register('common.flash.fileUpload', function($){
	//php无法改jsPath为t5，所以增加单独的flashpath。
	//var path = ($CONFIG['t5FlashPath'] ? $CONFIG['t5FlashPath'] : $CONFIG['jsPath']) + 'apps/enp_event_v2/static/swf/',
	//var path = 'http://js.t.sinajs.cn/t4/x5/static/swf/',
	var path = "http://js.t.sinajs.cn/t5/apps/enp_activity/static/swf/",
		upserver = 'http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&s=json&data=1&appid=501';

    return function(pars){
    	// 传过来的参数如果有flash的路,咱就使用传过来的路径吧
    	path = pars.flashPath ? "http://js.t.sinajs.cn/t5/" + pars.flashPath : path;
		var conf = {
			id: pars.id,
			swf: path+'MultiFileUpload.swf?version='+new Date().getTime(),
			exp_swf: path+'expressInstall.swf?version='+new Date().getTime(),
//			swf: path+'MultiFileUpload.swf?version='+$CONFIG['version'],
//			exp_swf: path+'expressInstall.swf?version='+$CONFIG['version'],
			height: pars.h||'50px',
			width: pars.w||'100px',
			version: '10.0.0',
			channel: pars.id + '_channel',
			type: '*.png;*.jpg;*.gif;*.jpeg;'
		};
		var it = {},swf;
		//
		var flashvars = {
			service: encodeURIComponent(pars.service||upserver),
			maxFileSize: pars['size']||5242880,
	        maxFileNum: pars['number']||5,
			jsHandler: 'STK.core.util.listener.fire',
			channel: conf.channel,
			initFun: 'init',
			uploadingFun: 'uploading',
			uploadedFun: 'uploaded',
			errorFun: 'error',
			showLoading : pars.showLoading || false,
			isOriginal : false,
			minSize : pars.minSize || false,
			fileFilter : pars.fileFilter || false,   //'img', 'doc'
			singleComplete : 'singleComplete'  //add by xiongping1@staff.sina.com.cn
	    };
	    if(pars.imgMaxWidth){
			flashvars.imgMaxWidth = pars.imgMaxWidth;
	    }
	    if(pars.imgMaxHeight){
	    	flashvars.imgMaxHeight = pars.imgMaxHeight;
	    }
		var params = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "false",
			allowScriptAccess: "always",
			bgcolor: "#FFFFFF",
			//解决ie6、7下点击不能用的问题。
			wmode: "transparent"
		};
		//
		var swfAct = {
			init: function(data){
				pars.init&&pars.init(it,data);
			},
			uploading: function(data){
				pars.uploading&&pars.uploading(it,data,pars.initializer);
			},
			uploaded: function(data){
				pars.uploaded&&pars.uploaded(it,data,pars.initializer);
			},
			error: function(data){
				pars.error&&pars.error(it,data,pars.initializer);
			},
			singleComplete : function(data){ //多图上传情况下，单个完成的回调处理   add by xiongping1@staff.sina.com.cn
				pars.singleComplete&&pars.singleComplete(it,data);
			}
		};
		
		var handler = {
			init: function(){
				//绑定dom，生成flash
				handler.build();
				//
				handler.bind();
			},
			build: function(){
//				$.kit.extra.swfobject.embedSWF(conf.swf, conf.id, conf.width, conf.height, conf.version, conf.exp_swf, flashvars,params);	
				swf = $.core.util.swf.create(conf.id,conf.swf,{
//					'id': conf.id,
					'width': conf.width,
					'height': conf.height,
					'attrs': {},
					'paras': params,
					'flashvars': flashvars,
					'html': ''
				})
			},
			bind: function(){
				for (var key in swfAct) {
					swfAct[key]&&!handler.checkAction(conf.channel, key)&&STK.core.util.listener.register(conf.channel, key, swfAct[key]);
				}
			},
			checkAction: function(channel,type){
				var list = STK.core.util.listener.list();
				return !!(list[channel]&&list[channel][type]);
			},
			destroy: function(){
				
			},
			getSwf : function(){
				return swf;
			}
		};
		//启动函数
		handler.init();
		//外抛函数
		it.imgUrl = $.common.extra.imageURL;
		it.getSwf = handler.getSwf;
		it.destroy = handler.destroy;
        return it;
        
    }
});
