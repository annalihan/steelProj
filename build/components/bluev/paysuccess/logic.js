steel.d("utils/kit/dom/parseDOM",[],function(e,t,n){STK.register("utils.kit.dom.parseDOM",function(e){return function(e){for(var t in e)e[t]&&1==e[t].length&&(e[t]=e[t][0]);return e}})}),steel.d("utils/kit/extra/language",[],function(e,t,n){STK.register("utils.kit.extra.language",function(e){return window.$LANG||(window.$LANG={}),function(t,n){var i=e.core.util.language(t,$LANG);return i=i.replace(/\\}/gi,"}"),n&&(i=e.templet(i,n)),i}})}),steel.d("utils/kit/extra/reuse",[],function(e,t,n){STK.register("utils.kit.extra.reuse",function(e){return function(t,n){var i,o,r;i=e.parseParam({},n),r=[];var s=function(){var e=t();return r.push({store:e,used:!0}),e},u=function(t){e.foreach(r,function(e,n){return t===e.store?(e.used=!0,!1):void 0})},a=function(t){e.foreach(r,function(e,n){return t===e.store?(e.used=!1,!1):void 0})},l=function(){for(var e=0,t=r.length;t>e;e+=1)if(r[e].used===!1)return r[e].used=!0,r[e].store;return s()};return o={},o.setUsed=u,o.setUnused=a,o.getOne=l,o.getLength=function(){return r.length},o}})}),steel.d("utils/module/layer",[],function(e,t,n){STK.register("utils.module.layer",function(e){var t=function(e){var t={};return"none"==e.style.display?(e.style.visibility="hidden",e.style.display="",t.w=e.offsetWidth,t.h=e.offsetHeight,e.style.display="none",e.style.visibility="visible"):(t.w=e.offsetWidth,t.h=e.offsetHeight),t},n=function(n,i){i=i||"topleft";var o=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",o=e.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):o=e.core.dom.position(n),"topleft"!==i){var r=t(n);"topright"===i?o.l=o.l+r.w:"bottomleft"===i?o.t=o.t+r.h:"bottomright"===i&&(o.l=o.l+r.w,o.t=o.t+r.h)}return o};return function(i){var o=e.core.dom.builder(i),r=o.list.outer[0],s=o.list.inner[0],u=e.core.dom.uniqueID(r),a={},l=e.core.evt.custEvent.define(a,"show");e.core.evt.custEvent.define(l,"hide");var c=null;return a.show=function(){return r.style.display="",e.core.evt.custEvent.fire(l,"show"),a},a.hide=function(){return r.style.display="none",e.custEvent.fire(l,"hide"),a},a.getPosition=function(e){return n(r,e)},a.getSize=function(e){return(e||!c)&&(c=t.apply(a,[r])),c},a.html=function(e){return void 0!==e&&(s.innerHTML=e),s.innerHTML},a.text=function(t){return void 0!==text&&(s.innerHTML=e.core.str.encodeHTML(t)),e.core.str.decodeHTML(s.innerHTML)},a.appendChild=function(e){return s.appendChild(e),a},a.getUniqueID=function(){return u},a.getOuter=function(){return r},a.getInner=function(){return s},a.getParentNode=function(){return r.parentNode},a.getDomList=function(){return o.list},a.getDomListByKey=function(e){return o.list[e]},a.getDom=function(e,t){return o.list[e]?o.list[e][t||0]:!1},a.getCascadeDom=function(t,n){return o.list[t]?e.core.dom.cascadeNode(o.list[t][n||0]):!1},a}})}),steel.d("utils/module/dialog",["utils/module/layer"],function(e,t,n){e("utils/module/layer"),STK.register("utils.module.dialog",function(e){return function(t,n){if(!t)throw"module.dialog need template as first parameter";var i,o,r,s,u,a,l,c,d,f,p,g;d=!0;var m=function(){d!==!1&&o.hide()},h=function(){i=e.parseParam({t:null,l:null,width:null,height:null},n),o=e.utils.module.layer(t,i),s=o.getOuter(),u=o.getDom("title"),c=o.getDom("title_content"),a=o.getDom("inner"),l=o.getDom("close"),e.addEvent(l,"click",function(){p()}),e.custEvent.add(o,"show",function(){e.hotKey.add(document.documentElement,["esc"],m,{type:"keyup",disableInInput:!0})}),e.custEvent.add(o,"hide",function(){e.hotKey.remove(document.documentElement,["esc"],m,{type:"keyup"}),d=!0})};return h(),g=e.objSup(o,["show","hide"]),p=function(t){return"function"!=typeof f||t||f()!==!1?(g.hide(),e.contains(document.body,o.getOuter())&&document.body.removeChild(o.getOuter()),r):!1},r=o,r.show=function(){return e.contains(document.body,o.getOuter())||document.body.appendChild(o.getOuter()),g.show(),r},r.hide=p,r.setPosition=function(e){return s.style.top=e.t+"px",s.style.left=e.l+"px",r},r.setMiddle=function(){var t,n=e.core.util.winSize(),i=o.getSize(!0);if(window.FrameInner&&window.FrameInner.outInfo){var u=FrameInner.outInfo;"string"==typeof u&&(u=e.strToJson(u));var a=u.parent.scroll.top,l=u.iframe.position.top,c=u.parent.size.height;t=a-l+(c-i.h)/2;var d=n.height-i.h;t>d&&(t=d)}else t=e.core.util.scrollPos().top+(n.height-i.h)/2;return s.style.top=(parseInt(t)>30?t:30)+"px",s.style.left=(n.width-i.w)/2+"px",window.FrameInner&&FrameInner.diaAutoHeight&&FrameInner.diaAutoHeight(s),r},r.setTitle=function(e){return c.innerHTML=e,r},r.setContent=function(e){return"string"==typeof e?a.innerHTML=e:a.appendChild(e),r},r.clearContent=function(){for(;a.children.length;)e.removeNode(a.children[0]);return r},r.setAlign=function(){},r.setBeforeHideFn=function(e){f=e},r.clearBeforeHideFn=function(){f=null},r.unsupportEsc=function(){d=!1},r.supportEsc=function(){d=!0},r}})}),steel.d("utils/kit/dom/cssText",[],function(e,t,n){STK.register("utils.kit.dom.cssText",function(e){var t=function(e,t){for(var n,i=(e+";"+t).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g,"$2$4");i&&(n=i.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i));)i=i.replace(n[1]+n[2]+n[3],"");return i};return function(e){e=e||"";var n=[],i={push:function(e,t){return n.push(e+":"+t),i},remove:function(e){for(var t=0;t<n.length;t++)0==n[t].indexOf(e+":")&&n.splice(t,1);return i},getStyleList:function(){return n.slice()},getCss:function(){return t(e,n.join(";"))}};return i}})}),steel.d("utils/kit/dom/fix",["utils/kit/dom/cssText"],function(e,t,n){e("utils/kit/dom/cssText"),STK.register("utils.kit.dom.fix",function(e){function t(t){return"none"!=e.core.dom.getStyle(t,"display")}function n(t){t=e.core.arr.isArray(t)?t:[0,0];for(var n=0;2>n;n++)"number"!=typeof t[n]&&(t[n]=0);return t}function i(n,i,r){if(t(n)){var s,u,a,l,c="fixed",d=n.offsetWidth,f=n.offsetHeight,p=e.core.util.winSize(),g=0,m=0,h=e.utils.kit.dom.cssText(n.style.cssText);if(o)switch(s=l=r[1],u=a=r[0],i){case"lt":l=a="";break;case"lb":s=a="";break;case"rt":u=l="";break;case"rb":s=u="";break;case"c":default:s=(p.height-f)/2+r[1],u=(p.width-d)/2+r[0],l=a=""}else{c="absolute";var v=e.core.util.scrollPos();switch(g=s=v.top,m=u=v.left,i){case"lt":s+=r[1],u+=r[0];break;case"lb":s+=p.height-f-r[1],u+=r[0];break;case"rt":s+=r[1],u+=p.width-d-r[0];break;case"rb":s+=p.height-f-r[1],u+=p.width-d-r[0];break;case"c":default:s+=(p.height-f)/2+r[1],u+=(p.width-d)/2+r[0]}a=l=""}"c"==i&&(g>s&&(s=g),m>u&&(u=m)),h.push("position",c).push("top",s+"px").push("left",u+"px").push("right",a+"px").push("bottom",l+"px"),n.style.cssText=h.getCss()}}var o=!(e.core.util.browser.IE6||"CSS1Compat"!==document.compatMode&&STK.IE),r=/^(c)|(lt)|(lb)|(rt)|(rb)$/;return function(t,s,u){function a(n){n=n||window.event,e.core.evt.custEvent.fire(d,"beforeFix",n.type),!f||o&&"c"!=l||i(t,l,c)}var l,c,d,f=!0;if(e.core.dom.isNode(t)&&r.test(s)){var p={getNode:function(){return t},isFixed:function(){return f},setFixed:function(e){return(f=!!e)&&i(t,l,c),this},setAlign:function(e,o){return r.test(e)&&(l=e,c=n(o),f&&i(t,l,c)),this},destroy:function(){o||o&&e.core.evt.removeEvent(window,"scroll",a),e.core.evt.removeEvent(window,"resize",a),e.core.evt.custEvent.undefine(d)}};return d=e.core.evt.custEvent.define(p,"beforeFix"),p.setAlign(s,u),o||e.core.evt.addEvent(window,"scroll",a),e.core.evt.addEvent(window,"resize",a),p}}})}),steel.d("utils/module/mask",["utils/kit/dom/fix"],function(e,t,n){e("utils/kit/dom/fix"),STK.register("utils.module.mask",function(e){function t(){i=e.C("div");var t='<div node-type="outer">';e.core.util.browser.IE6&&(t+='<div style="position:absolute;width:100%;height:100%;"></div>'),t+="</div>",i=e.builder(t).list.outer[0],document.body.appendChild(i),s=!0,o=e.utils.kit.dom.fix(i,"lt");var n=function(){var t=e.core.util.winSize();i.style.cssText=e.utils.kit.dom.cssText(i.style.cssText).push("width",t.width+"px").push("height",t.height+"px").getCss()};c.add(o,"beforeFix",n),n()}function n(t){var n;return(n=t.getAttribute(u))||t.setAttribute(u,n=e.getUniqueKey()),">"+t.tagName.toLowerCase()+"["+u+'="'+n+'"]'}var i,o,r=[],s=!1,u="STK-Mask-Key",a=e.core.dom.setStyle,l=e.core.dom.getStyle,c=e.core.evt.custEvent,d={getNode:function(){return i},show:function(n,r){return s?(n=e.core.obj.parseParam({opacity:0,background:"#000000"},n),i.style.background=n.background,a(i,"opacity",n.opacity),i.style.opacity=n.opacity,i.style.display="",o.setAlign("lt"),r&&r()):e.Ready(function(){t(),d.show(n,r)}),d},hide:function(){return i.style.display="none",nowIndex=void 0,r=[],d},showUnderNode:function(t,o){return e.isNode(t)&&d.show(o,function(){a(i,"zIndex",l(t,"zIndex"));var o=n(t),s=e.core.arr.indexOf(r,o);-1!=s&&r.splice(s,1),r.push(o),e.core.dom.insertElement(t,i,"beforebegin")}),d},back:function(){if(r.length<1)return d;var t,n;return r.pop(),r.length<1?d.hide():(n=r[r.length-1])&&(t=e.sizzle(n,document.body)[0])?(a(i,"zIndex",l(t,"zIndex")),e.core.dom.insertElement(t,i,"beforebegin")):d.back(),d},destroy:function(){c.remove(o),i.style.display="none",lastNode=void 0,_cache={}}};return d})}),steel.d("utils/kit/dom/drag",[],function(e,t,n){STK.register("utils.kit.dom.drag",function(e){return function(t,n){var i,o,r,s,u,a,l,c,d=function(){f(),p()},f=function(){i=e.parseParam({moveDom:t,perchStyle:"border:solid #999999 2px;",dragtype:"perch",actObj:{},pagePadding:5},n),r=i.moveDom,o={},s={},u=e.drag(t,{actObj:i.actObj}),"perch"===i.dragtype&&(a=e.C("div"),l=!1,c=!1,r=a),t.style.cursor="move"},p=function(){e.custEvent.add(i.actObj,"dragStart",g),e.custEvent.add(i.actObj,"dragEnd",m),e.custEvent.add(i.actObj,"draging",h)},g=function(n,o){document.body.style.cursor="move";var r=e.core.util.pageSize().page;if(s=e.core.dom.position(i.moveDom),s.pageX=o.pageX,s.pageY=o.pageY,s.height=i.moveDom.offsetHeight,s.width=i.moveDom.offsetWidth,s.pageHeight=r.height,s.pageWidth=r.width,"perch"===i.dragtype){var u=[];u.push(i.perchStyle),u.push("position:absolute"),u.push("z-index:"+(i.moveDom.style.zIndex+10)),u.push("width:"+i.moveDom.offsetWidth+"px"),u.push("height:"+i.moveDom.offsetHeight+"px"),u.push("left:"+s.l+"px"),u.push("top:"+s.t+"px"),a.style.cssText=u.join(";"),c=!0,setTimeout(function(){c&&(document.body.appendChild(a),l=!0)},100)}void 0!==t.setCapture&&t.setCapture()},m=function(e,n){document.body.style.cursor="auto",void 0!==t.setCapture&&t.releaseCapture(),"perch"===i.dragtype&&(c=!1,i.moveDom.style.top=a.style.top,i.moveDom.style.left=a.style.left,l&&(document.body.removeChild(a),l=!1))},h=function(e,t){var n=s.t+(t.pageY-s.pageY),o=s.l+(t.pageX-s.pageX),u=n+s.height,a=o+s.width,l=s.pageHeight-i.pagePadding,c=s.pageWidth-i.pagePadding;l>u&&n>0?r.style.top=n+"px":(0>n&&(r.style.top="0px"),u>=l&&(r.style.top=l-s.height+"px")),c>a&&o>0?r.style.left=o+"px":(0>o&&(r.style.left="0px"),a>=c&&(r.style.left=c-s.width+"px"))};return d(),o.destroy=function(){document.body.style.cursor="auto","function"==typeof r.setCapture&&r.releaseCapture(),"perch"===i.dragtype&&(c=!1,l&&(document.body.removeChild(a),l=!1)),e.custEvent.remove(i.actObj,"dragStart",g),e.custEvent.remove(i.actObj,"dragEnd",m),e.custEvent.remove(i.actObj,"draging",h),u.destroy&&u.destroy(),i=null,r=null,s=null,u=null,a=null,l=null,c=null},o.getActObj=function(){return i.actObj},o}})}),steel.d("ui/dialog",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/dialog","utils/module/mask","utils/kit/dom/drag"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/dialog"),e("utils/module/mask"),e("utils/kit/dom/drag"),STK.register("ui.dialog",function(e){var t='<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10019"><div class="content"><div class="W_layer_title" node-type="title_content"></div><div class="W_layer_close"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon" title="#L{关闭}" node-type="close">X</a></div><div node-type="inner"></div></div></div>',n=e.utils.kit.extra.language,i=null,o=function(){var i=e.utils.module.dialog(n(t));return e.custEvent.add(i,"show",function(){e.utils.module.mask.showUnderNode(i.getOuter(),{opacity:.5,background:"#000000"})}),e.custEvent.add(i,"hide",function(){e.utils.module.mask.back(),i.setMiddle()}),i.destroy=function(){r(i);try{i.hide(!0)}catch(e){}},i},r=function(e){e.setTitle("").clearContent(),i.setUnused(e)};return function(t){var n=e.parseParam({isHold:!1},t),s=n.isHold;n=e.core.obj.cut(n,["isHold"]),i||(i=e.utils.kit.extra.reuse(o));var u=i.getOne();return s||(e.custEvent.add(u,"hide",function(){e.custEvent.remove(u,"hide",arguments.callee),r(u)}),e.custEvent.add(u,"show",function(){i.setUsed(u)})),u}})}),steel.d("ui/alert",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/layer","ui/dialog"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/layer"),e("ui/dialog"),STK.register("ui.alert",function(e){var t,n='<div node-type="outer"><div class="layer_point" node-type="inner"><dl class="point clearfix"><dt><span class="W_icon" node-type="icon"></span></dt><dd><p class="W_f14" node-type="text"></p></dd></dl></div><div class="W_layer_btn S_bg1"><a class="W_btn_a btn_34px" href="javascript:;" node-type="OK"><span></span></a></div></div>',i={success:"W_icon icon_succB",error:"W_icon icon_rederrorB",warn:"W_icon icon_warnB",question:"W_icon icon_askB"},o=e.utils.kit.extra.language,r=null,s=function(e,t){e.getDom("icon").className=t.icon,e.getDom("text").innerHTML=t.text,e.getDom("OK").innerHTML=t.OKText};return function(u,a){t&&(t.dia.hide(),t=null);var l,c,d,f,p;return l=e.parseParam({title:o("#L{提示}"),icon:"warn",text:u,OK:e.funcEmpty,OKText:o("#L{确定}"),timeout:0},a),l.icon=i[l.icon],c={},r||(r=e.utils.kit.extra.reuse(function(){var t=e.utils.module.layer(o(n));return t})),d=r.getOne(),f=e.ui.dialog(),f.setContent(d.getOuter()),f.setTitle(l.title),s(d,l),e.addEvent(d.getDom("OK"),"click",f.hide),e.custEvent.add(f,"hide",function(){e.custEvent.remove(f,"hide",arguments.callee),e.removeEvent(d.getDom("OK"),"click",f.hide),r.setUnused(d),clearTimeout(p),l.OK()}),l.timeout&&(p=setTimeout(f.hide,l.timeout)),f.show().setMiddle(),c.alt=d,c.dia=f,t=c,c}})}),steel.d("common/suda",[],function(e,t,n){STK.register("common.suda",function(e){return window.SUDA=window.SUDA||[],1==Math.ceil(1e4*Math.random())&&SUDA.push(["setPerformance",15]),SUDA.push(["setGatherInfo",null,"WEIBO-V6"]),function(){var e=document,t=e.createElement("script"),n=e.getElementsByTagName("script")[0];t.type="text/javascript",t.charset="utf-8",t.async=!0,t.src=("https:"==e.location.protocol?"https://":"http://")+"js.t.sinajs.cn/open/analytics/js/suda.js?version="+$CONFIG.version,n.parentNode.insertBefore(t,n)}})}),steel.d("utils/kit/extra/merge",[],function(e,t,n){STK.register("utils.kit.extra.merge",function(e){return function(e,t){var n={};for(var i in e)n[i]=e[i];for(var i in t)n[i]=t[i];return n}})}),steel.d("utils/kit/io/ajax",["utils/kit/extra/merge"],function(e,t,n){e("utils/kit/extra/merge"),STK.register("utils.kit.io.ajax",function(e){return function(t){var n,i,o,r,s,u,a;u=function(e){s=!1,t.onComplete(e,n.args),setTimeout(l,0)},a=function(e){s=!1,t.onFail(e,n.args),setTimeout(l,0)},o=[],r=null,s=!1,n=e.parseParam({url:"",method:"get",responseType:"json",timeout:3e4,onTraning:e.funcEmpty,isEncode:!0},t),n.onComplete=u,n.onFail=a;var l=function(){o.length&&s!==!0&&(s=!0,n.args=o.shift(),r=e.ajax(n))},c=function(e){for(;o.length;)o.shift();if(s=!1,r)try{r.abort()}catch(t){}r=null};return i={},i.request=function(e){e=e||{},e.superuid||!!$CONFIG.superuid&&(e.superuid=$CONFIG.superuid),e||(e={}),t.noQueue&&c(),t.uniqueRequest&&r||(o.push(e),e._t=0,l())},i.abort=c,i}})}),steel.d("utils/kit/io/jsonp",["utils/kit/extra/merge"],function(e,t,n){e("utils/kit/extra/merge"),STK.register("utils.kit.io.jsonp",function(e){return function(t){var n,i,o,r,s;n=e.parseParam({url:"",method:"get",responseType:"json",varkey:"_v",timeout:3e4,onComplete:e.funcEmpty,onTraning:e.funcEmpty,onFail:e.funcEmpty,isEncode:!0},t),o=[],r={},s=!1;var u=function(){o.length&&s!==!0&&(s=!0,r.args=o.shift(),r.onComplete=function(e){s=!1,n.onComplete(e,r.args),setTimeout(u,0)},r.onFail=function(e){s=!1,n.onFail(e),setTimeout(u,0)},e.jsonp(e.utils.kit.extra.merge(n,{args:r.args,onComplete:function(e){r.onComplete(e)},onFail:function(e){try{r.onFail(e)}catch(t){}}})))};return i={},i.request=function(e){e=e||{},e.superuid||!!$CONFIG.superuid&&(e.superuid=$CONFIG.superuid),e||(e={}),o.push(e),e._t=1,u()},i.abort=function(e){for(;o.length;)o.shift();s=!1,r=null},i}})}),steel.d("utils/kit/io/inter",["utils/kit/io/ajax","utils/kit/io/jsonp","utils/kit/extra/merge"],function(e,t,n){e("utils/kit/io/ajax"),e("utils/kit/io/jsonp"),e("utils/kit/extra/merge"),STK.register("utils.kit.io.inter",function(e){return function(){var t,n,i;return t={},n={},i={},t.register=function(e,t){if(void 0!==n[e])throw e+" interface has been registered";n[e]=t,i[e]={}},t.hookComplete=function(t,n){var o=e.core.util.getUniqueKey();return i[t][o]=n,o},t.removeHook=function(e,t){i[e]&&i[e][t]&&delete i[e][t]},t.getTrans=function(t,o){var r=e.utils.kit.extra.merge(n[t],o);return r.onComplete=function(e,n){try{o.onComplete(e,n)}catch(r){}if("100000"===e.code)try{o.onSuccess(e,n)}catch(r){}else try{if("100002"===e.code&&e.data&&"string"==typeof e.data&&0==e.data.indexOf("http"))return void(window.location.href=e.data);if(o.onError(e,n),"100002"===e.code||"100008"===e.code){var s={loginSuccessUrl:e.data.url?"http://weibo.com/p/aj/proxy?api="+e.data.url:""};return window.WBtopGlobal_loginLayer?void window.WBtopGlobal_loginLayer(s):void STK.core.io.scriptLoader({url:"http://tjs.sjs.sinajs.cn/t5/register/js/page/remote/loginLayer.js",onComplete:function(e,t){window.WBtopGlobal_loginLayer(s)}})}}catch(r){}for(var u in i[t])try{i[t][u](e,n)}catch(r){}},"jsonp"===n[t].requestMode?e.utils.kit.io.jsonp(r):"ijax"===n[t].requestMode?e.utils.kit.io.ijax(r):e.utils.kit.io.ajax(r)},t.request=function(t,o,r){var s=e.core.json.merge(n[t],o);return s.onComplete=function(e,n){try{o.onComplete(e,n)}catch(r){}if("100000"===e.code)try{o.onSuccess(e,n)}catch(r){}else try{if("100002"===e.code&&e.data&&"string"==typeof e.data&&0==e.data.indexOf("http"))return void(window.location.href=e.data);o.onError(e,n)}catch(r){}for(var s in i[t])try{i[t][s](e,n)}catch(r){}},s=e.core.obj.cut(s,["noqueue"]),s.args=r,"jsonp"===n[t].requestMode?e.jsonp(s):"ijax"===n[t].requestMode?e.ijax(s):e.ajax(s)},t}})}),steel.d("common/trans/bluev",["utils/kit/io/inter"],function(e,t,n){e("utils/kit/io/inter"),STK.register("common.trans.bluev",function(e){var t=e.utils.kit.io.inter(),n=t.register;return n("send",{url:"/aj/bluev",method:"post"}),n("add",{url:"/aj/bluev",method:"post"}),n("square",{url:"/aj/h5/square",method:"get"}),t})}),steel.d("ui/confirm",["utils/kit/extra/language","ui/dialog","utils/module/layer"],function(e,t,n){e("utils/kit/extra/language"),e("ui/dialog"),e("utils/module/layer"),STK.register("ui.confirm",function(e){var t='<div node-type="outer"><div class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p></dd></dl></div><div class="W_layer_btn S_bg1"><a href="javascript:void(0)" class="W_btn_a btn_34px" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b btn_34px" node-type="cancel"></a></div></div>',n={success:"W_icon icon_succB","delete":"W_icon icon_warnB",error:"W_icon icon_rederrorB",warn:"W_icon icon_warnB",question:"W_icon icon_questionB"},i=e.utils.kit.extra.language,o=null;return function(r,s){var u,a,l,c,d,f;u=e.parseParam({title:i("#L{提示}"),icon:"question",textLarge:r,OK:e.funcEmpty,OKText:i("#L{确定}"),cancel:e.funcEmpty,cancelText:i("#L{取消}")},s),u.icon=n[u.icon],a={},o||(o=e.utils.kit.extra.reuse(function(){var n=e.utils.module.layer(t);return n})),l=o.getOne(),c=e.ui.dialog(),c.setContent(""),c.setContent(l.getOuter()),l.getDom("icon").className=u.icon,l.getDom("textLarge").innerHTML=u.textLarge,l.getDom("OK").innerHTML="<span>"+u.OKText+"</span>",l.getDom("cancel").innerHTML="<span>"+u.cancelText+"</span>",c.setTitle(u.title);var p=function(){d=!0,f=e.htmlToJson(l.getDom("textComplex")),c.hide()};return e.addEvent(l.getDom("OK"),"click",p),e.addEvent(l.getDom("cancel"),"click",c.hide),e.custEvent.add(c,"hide",function(){e.custEvent.remove(c,"hide",arguments.callee),e.removeEvent(l.getDom("OK"),"click",p),e.removeEvent(l.getDom("cancel"),"click",c.hide),o.setUnused(l),d?u.OK(f):u.cancel(f)}),c.show().setMiddle(),a.cfm=l,a.dia=c,a}})}),steel.d("components/bluev/paysuccess/logic",["utils/kit/dom/parseDOM","ui/alert","common/suda","common/trans/bluev","ui/dialog","ui/confirm"],function(e,t,n){e("utils/kit/dom/parseDOM"),e("ui/alert"),e("common/suda"),e("common/trans/bluev"),e("ui/dialog"),e("ui/confirm");var i=STK;n.exports=function(e){console.log("---");var t={},n=i.delegatedEvent(e),o={DOM:{},objs:{},DOM_eventFun:{},ajFun:{sendFun:function(){i.common.trans.bluev.getTrans("send",{onSuccess:function(e){console.log("Success")},onError:function(e){console.log("Error")},onFail:function(e){console.log("Fail")}}).request({a:1})}}},r=function(){if(null==e||null!=e&&!i.isNode(e))throw"[]:argsCheck()-The param node is not a DOM node."},s=function(){o.DOM=i.utils.kit.dom.parseDOM(i.builder(e).list)},u=function(){},a=function(){i.addEvent(o.DOM.aj,"click",o.ajFun.sendFun)},l=function(){},c=function(){},d=function(){n.destroy(),o&&(i.forEach(o.objs,function(e){e&&e.destroy&&e.destroy()}),o=null)},f=function(){r(),s(),u(),a(),l(),c()};return f(),t.destroy=d,t}});