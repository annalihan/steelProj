/**
 * @author wangliang3
 */
$Import("utils.kit.extra.swfobject");

STK.register("common.flash.imgUpload", function($){
	/*
	 * @param {String} pars.id flash占位dom对象
	 * @param {String} pars.swf flash文件
	 * @param {Object} cont flash外层容器
	 * @param {String} src 初始化传入flash编辑图片的link
	 */
	var de = document.documentElement, db = document.body;
	var dom = {
		getScroll: function(){
            var t, l, w, h;
            if (de && de.scrollTop) {
                t = de.scrollTop;
                l = de.scrollLeft;
                w = de.scrollWidth;
                h = de.scrollHeight;
            }
            else 
                if (db) {
                    t = db.scrollTop;
                    l = db.scrollLeft;
                    w = db.scrollWidth;
                    h = db.scrollHeight;
                }
            return {
                t: t,
                l: l,
                w: w,
                h: h
            };
        },
		getScreen: function(){
            var screen = {};
            if ($.IE) {
                screen.w = de.clientWidth;
                screen.h = de.clientHeight;
            }
            else {
                screen.w = window.innerWidth;
                screen.h = window.innerHeight;
            }
            return screen;
        }
	};
	
	var lanMap = function(lan){
		var map={
			cn:'zh_CN',
			tw:'zh_TW'
		};
		lan = lan.toLowerCase();
		lan = lan.replace(/zh-/g,'');
		return map[lan];
	};
	
	return function(pars, call){
		
		var conf = {
			version: $CONFIG['version'],
			swf_path: $CONFIG['jsPath'] + 'enterprise/static/swf/img/',
			service: pars.service,
//			service: 'http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1',
//			service: 'http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog' + (scope.pic_logo ? "&logo=1" : '') + (scope.pic_nick ? "&nick=" + scope.pic_nick : '') + (scope.pic_url ? "&url=" + scope.pic_url : '') + (scope.pic_markpos ? "&markpos=" + scope.pic_markpos : '') + '&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1',
			ed_swf: pars.swf || 'PhotoEditor.swf',
			exp_swf: 'expressInstall.swf',
			h: pars.h || 385,
			w: pars.w || 528,
			f_version: '10.0.0',
			channel: pars.id + '_channel',
			id_panel: pars.id + '_panel',
			id_swf: pars.id + '_swf'
		};
		var it = {}, cont, swf;
		
		var swfAct = {
			init: function(){
				call.init && call.init(it, pars);
			},
			setHeight: function(value){
				if(!$.IE){
					//ie下高度flash计算的可视区域高度，自适应有bug，放到二期flash处理
					handler.getFlash(conf.id_swf).height = value;
				}
			},
			upComplate: function(pid){
				pars.sucess && pars.sucess(pid);
				cont.style.display = 'none';
				it.destroy();
			},
			closeEditor: function(){
				cont.style.display = 'none';
				it.destroy();
				call.close && call.close(it, pars);
			},
			suda: function(value){
				SUDA&&SUDA.uaTrack&&SUDA.uaTrack('meitu','v4||'+value);
			}
		};
		var flashvars = {
			version:conf.version,
			language:lanMap($CONFIG['lang']),
			channel: conf.channel,
			JSHandler: "STK.core.util.listener.fire",
			initFun: "init",
			changeFlashHeightFun: "setHeight",
			uploadCompleteFun: "upComplate",
			closePhotoEditorFun: "closeEditor",
			suda: "suda"
		};
		
		var handler = {
			init: function(){
				if (!pars.id) { return; }
				cont = $.E(conf.id_panel);
				swf = $.E(conf.id_swf);
				if (!cont) {
					cont = $.C('div');
					cont.id = conf.id_panel;
					db.appendChild(cont);
				}
				if (!swf) {
					swf = $.C('div');
					swf.id = conf.id_swf;
					cont.appendChild(swf);
				}
				cont.style.display = 'none';
				//build swf
				if (!handler.getFlash(conf.id_swf)) {
					handler.build();
				}
			},
			checkAction: function(channel,type){
				var list = STK.core.util.listener.list;
				return !!(list[channel]&&list[channel][type]);
			},
			bindEvt: function(pars){
				for (key in pars) {
//					swfAct[pars[key]]&&!STK.core.util.listener.has(conf.channel, pars[key])&&STK.core.util.listener.add(conf.channel,pars[key],swfAct[pars[key]]);
					swfAct[pars[key]]&&!handler.checkAction(conf.channel, pars[key])&&STK.core.util.listener.register(conf.channel, pars[key], swfAct[pars[key]]);
				}
			},
			build: function(){
				var params = {
					menu: "true",
					scale: "noScale",
					allowFullscreen: "true",
					allowScriptAccess: "always",
					bgcolor: "#FFFFFF",
					wmode: "transparent",
					base: conf.swf_path
				};
				var attrs = {
					id: pars.id
				};
				//js customer event
				handler.bindEvt(flashvars);
				//create swf
				$.utils.kit.extra.swfobject.embedSWF(conf.swf_path + conf.ed_swf + '?version=' + conf.version, conf.id_swf, conf.w, conf.h, conf.f_version, conf.swf_path + conf.exp_swf, flashvars, params, attrs);
//				$.core.util.swf.create(conf.id_swf,conf.swf_path + conf.ed_swf + '?version=' + conf.version,{
//					width:conf.w,
//					height:conf.h,
//					flashvars:flashvars,
//					paras:params, 
//					attrs:attrs
//				})
			},
			getFlash: function(){
				if (navigator.appName.indexOf("Microsoft") != -1) { return window[pars.id]; }
				else { return document[pars.id]; }
			},
			setPos: function(){
				var t, l, _t, _l, scp = dom.getScroll(), win = dom.getScreen();
				_t = Math.round(conf.h > win.h ? (win.h / 5 + scp.t) : ((win.h - conf.h) / 2 + scp.t));
				_l = Math.round(conf.w > win.w ? (win.w / 5 + scp.l) : ((win.w - conf.w) / 2 + scp.l));
				t = (pars.pos.t-1) || _t;
				l = pars.pos.l || _l;
				cont.style.zIndex = pars.zIndex || 20000;
				$.setStyle(cont, 'position', 'absolute');
				$.setStyle(cont, 'left', l + 'px');
				$.setStyle(cont, 'top', t + 'px');
				//可视区自适应
				handler.autoScroll(scp.t, scp.t + (t - _t));
			},
			autoScroll: function(nForm, nTo, nStep){
				var timer, que, i, step = 8, of;
				step = nStep || step;
				of = nForm - nTo;
				que = [of];
				que[step] = 0;
				i = 1;
				for (i; i < step; i++) {
					que[i] = (of = of / 2)
				}
				clearInterval(timer);
				timer = setInterval(function(){
					if (que.length) {
						window.scrollTo(0, nTo + que.shift());
						return;
					}
					clearInterval(timer);
				}, 30);
			}
		};
		
		it.show = function(pid){
			pid && (pars.id = pid);
			cont && (cont.style.display = '');
			handler.setPos();
			return this;
		};
		it.hide = function(){
			cont && (cont.style.display = '');
			return this;
		};
		it.setPars = function(url){
			//flash初始化成功后传入对应的外部参数
			var args = {
				imageURL: url || '',
				uploadURL: conf.service
			};
			handler.getFlash(conf.id_swf).editPhoto(args);
			return this;
		};
		it.getSwf = handler.getFlash;
		
		it.destroy = function(){
			if ($.IE) {
				for (key in flashvars) {
					swfAct[flashvars[key]] && STK.core.util.listener.remove(conf.channel, flashvars[key], swfAct[flashvars[key]]);
				}
				cont.innerHTML = '';
			}
		};
		
		handler.init();
		return it;
	};
});
