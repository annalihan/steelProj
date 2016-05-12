steel.d("utils/kit/extra/language",[],function(e,t,n){STK.register("utils.kit.extra.language",function(e){return window.$LANG||(window.$LANG={}),function(t,n){var i=e.core.util.language(t,$LANG);return i=i.replace(/\\}/gi,"}"),n&&(i=e.templet(i,n)),i}})}),steel.d("utils/kit/extra/reuse",[],function(e,t,n){STK.register("utils.kit.extra.reuse",function(e){return function(t,n){var i,o,r;i=e.parseParam({},n),r=[];var s=function(){var e=t();return r.push({store:e,used:!0}),e},u=function(t){e.foreach(r,function(e,n){return t===e.store?(e.used=!0,!1):void 0})},l=function(t){e.foreach(r,function(e,n){return t===e.store?(e.used=!1,!1):void 0})},c=function(){for(var e=0,t=r.length;t>e;e+=1)if(r[e].used===!1)return r[e].used=!0,r[e].store;return s()};return o={},o.setUsed=u,o.setUnused=l,o.getOne=c,o.getLength=function(){return r.length},o}})}),steel.d("utils/module/layer",[],function(e,t,n){STK.register("utils.module.layer",function(e){var t=function(e){var t={};return"none"==e.style.display?(e.style.visibility="hidden",e.style.display="",t.w=e.offsetWidth,t.h=e.offsetHeight,e.style.display="none",e.style.visibility="visible"):(t.w=e.offsetWidth,t.h=e.offsetHeight),t},n=function(n,i){i=i||"topleft";var o=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",o=e.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):o=e.core.dom.position(n),"topleft"!==i){var r=t(n);"topright"===i?o.l=o.l+r.w:"bottomleft"===i?o.t=o.t+r.h:"bottomright"===i&&(o.l=o.l+r.w,o.t=o.t+r.h)}return o};return function(i){var o=e.core.dom.builder(i),r=o.list.outer[0],s=o.list.inner[0],u=e.core.dom.uniqueID(r),l={},c=e.core.evt.custEvent.define(l,"show");e.core.evt.custEvent.define(c,"hide");var d=null;return l.show=function(){return r.style.display="",e.core.evt.custEvent.fire(c,"show"),l},l.hide=function(){return r.style.display="none",e.custEvent.fire(c,"hide"),l},l.getPosition=function(e){return n(r,e)},l.getSize=function(e){return(e||!d)&&(d=t.apply(l,[r])),d},l.html=function(e){return void 0!==e&&(s.innerHTML=e),s.innerHTML},l.text=function(t){return void 0!==text&&(s.innerHTML=e.core.str.encodeHTML(t)),e.core.str.decodeHTML(s.innerHTML)},l.appendChild=function(e){return s.appendChild(e),l},l.getUniqueID=function(){return u},l.getOuter=function(){return r},l.getInner=function(){return s},l.getParentNode=function(){return r.parentNode},l.getDomList=function(){return o.list},l.getDomListByKey=function(e){return o.list[e]},l.getDom=function(e,t){return o.list[e]?o.list[e][t||0]:!1},l.getCascadeDom=function(t,n){return o.list[t]?e.core.dom.cascadeNode(o.list[t][n||0]):!1},l}})}),steel.d("utils/module/dialog",["utils/module/layer"],function(e,t,n){e("utils/module/layer"),STK.register("utils.module.dialog",function(e){return function(t,n){if(!t)throw"module.dialog need template as first parameter";var i,o,r,s,u,l,c,d,a,f,p,g;a=!0;var h=function(){a!==!1&&o.hide()},m=function(){i=e.parseParam({t:null,l:null,width:null,height:null},n),o=e.utils.module.layer(t,i),s=o.getOuter(),u=o.getDom("title"),d=o.getDom("title_content"),l=o.getDom("inner"),c=o.getDom("close"),e.addEvent(c,"click",function(){p()}),e.custEvent.add(o,"show",function(){e.hotKey.add(document.documentElement,["esc"],h,{type:"keyup",disableInInput:!0})}),e.custEvent.add(o,"hide",function(){e.hotKey.remove(document.documentElement,["esc"],h,{type:"keyup"}),a=!0})};return m(),g=e.objSup(o,["show","hide"]),p=function(t){return"function"!=typeof f||t||f()!==!1?(g.hide(),e.contains(document.body,o.getOuter())&&document.body.removeChild(o.getOuter()),r):!1},r=o,r.show=function(){return e.contains(document.body,o.getOuter())||document.body.appendChild(o.getOuter()),g.show(),r},r.hide=p,r.setPosition=function(e){return s.style.top=e.t+"px",s.style.left=e.l+"px",r},r.setMiddle=function(){var t,n=e.core.util.winSize(),i=o.getSize(!0);if(window.FrameInner&&window.FrameInner.outInfo){var u=FrameInner.outInfo;"string"==typeof u&&(u=e.strToJson(u));var l=u.parent.scroll.top,c=u.iframe.position.top,d=u.parent.size.height;t=l-c+(d-i.h)/2;var a=n.height-i.h;t>a&&(t=a)}else t=e.core.util.scrollPos().top+(n.height-i.h)/2;return s.style.top=(parseInt(t)>30?t:30)+"px",s.style.left=(n.width-i.w)/2+"px",window.FrameInner&&FrameInner.diaAutoHeight&&FrameInner.diaAutoHeight(s),r},r.setTitle=function(e){return d.innerHTML=e,r},r.setContent=function(e){return"string"==typeof e?l.innerHTML=e:l.appendChild(e),r},r.clearContent=function(){for(;l.children.length;)e.removeNode(l.children[0]);return r},r.setAlign=function(){},r.setBeforeHideFn=function(e){f=e},r.clearBeforeHideFn=function(){f=null},r.unsupportEsc=function(){a=!1},r.supportEsc=function(){a=!0},r}})}),steel.d("utils/kit/dom/cssText",[],function(e,t,n){STK.register("utils.kit.dom.cssText",function(e){var t=function(e,t){for(var n,i=(e+";"+t).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g,"$2$4");i&&(n=i.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i));)i=i.replace(n[1]+n[2]+n[3],"");return i};return function(e){e=e||"";var n=[],i={push:function(e,t){return n.push(e+":"+t),i},remove:function(e){for(var t=0;t<n.length;t++)0==n[t].indexOf(e+":")&&n.splice(t,1);return i},getStyleList:function(){return n.slice()},getCss:function(){return t(e,n.join(";"))}};return i}})}),steel.d("utils/kit/dom/fix",["utils/kit/dom/cssText"],function(e,t,n){e("utils/kit/dom/cssText"),STK.register("utils.kit.dom.fix",function(e){function t(t){return"none"!=e.core.dom.getStyle(t,"display")}function n(t){t=e.core.arr.isArray(t)?t:[0,0];for(var n=0;2>n;n++)"number"!=typeof t[n]&&(t[n]=0);return t}function i(n,i,r){if(t(n)){var s,u,l,c,d="fixed",a=n.offsetWidth,f=n.offsetHeight,p=e.core.util.winSize(),g=0,h=0,m=e.utils.kit.dom.cssText(n.style.cssText);if(o)switch(s=c=r[1],u=l=r[0],i){case"lt":c=l="";break;case"lb":s=l="";break;case"rt":u=c="";break;case"rb":s=u="";break;case"c":default:s=(p.height-f)/2+r[1],u=(p.width-a)/2+r[0],c=l=""}else{d="absolute";var v=e.core.util.scrollPos();switch(g=s=v.top,h=u=v.left,i){case"lt":s+=r[1],u+=r[0];break;case"lb":s+=p.height-f-r[1],u+=r[0];break;case"rt":s+=r[1],u+=p.width-a-r[0];break;case"rb":s+=p.height-f-r[1],u+=p.width-a-r[0];break;case"c":default:s+=(p.height-f)/2+r[1],u+=(p.width-a)/2+r[0]}l=c=""}"c"==i&&(g>s&&(s=g),h>u&&(u=h)),m.push("position",d).push("top",s+"px").push("left",u+"px").push("right",l+"px").push("bottom",c+"px"),n.style.cssText=m.getCss()}}var o=!(e.core.util.browser.IE6||"CSS1Compat"!==document.compatMode&&STK.IE),r=/^(c)|(lt)|(lb)|(rt)|(rb)$/;return function(t,s,u){function l(n){n=n||window.event,e.core.evt.custEvent.fire(a,"beforeFix",n.type),!f||o&&"c"!=c||i(t,c,d)}var c,d,a,f=!0;if(e.core.dom.isNode(t)&&r.test(s)){var p={getNode:function(){return t},isFixed:function(){return f},setFixed:function(e){return(f=!!e)&&i(t,c,d),this},setAlign:function(e,o){return r.test(e)&&(c=e,d=n(o),f&&i(t,c,d)),this},destroy:function(){o||o&&e.core.evt.removeEvent(window,"scroll",l),e.core.evt.removeEvent(window,"resize",l),e.core.evt.custEvent.undefine(a)}};return a=e.core.evt.custEvent.define(p,"beforeFix"),p.setAlign(s,u),o||e.core.evt.addEvent(window,"scroll",l),e.core.evt.addEvent(window,"resize",l),p}}})}),steel.d("utils/module/mask",["utils/kit/dom/fix"],function(e,t,n){e("utils/kit/dom/fix"),STK.register("utils.module.mask",function(e){function t(){i=e.C("div");var t='<div node-type="outer">';e.core.util.browser.IE6&&(t+='<div style="position:absolute;width:100%;height:100%;"></div>'),t+="</div>",i=e.builder(t).list.outer[0],document.body.appendChild(i),s=!0,o=e.utils.kit.dom.fix(i,"lt");var n=function(){var t=e.core.util.winSize();i.style.cssText=e.utils.kit.dom.cssText(i.style.cssText).push("width",t.width+"px").push("height",t.height+"px").getCss()};d.add(o,"beforeFix",n),n()}function n(t){var n;return(n=t.getAttribute(u))||t.setAttribute(u,n=e.getUniqueKey()),">"+t.tagName.toLowerCase()+"["+u+'="'+n+'"]'}var i,o,r=[],s=!1,u="STK-Mask-Key",l=e.core.dom.setStyle,c=e.core.dom.getStyle,d=e.core.evt.custEvent,a={getNode:function(){return i},show:function(n,r){return s?(n=e.core.obj.parseParam({opacity:0,background:"#000000"},n),i.style.background=n.background,l(i,"opacity",n.opacity),i.style.opacity=n.opacity,i.style.display="",o.setAlign("lt"),r&&r()):e.Ready(function(){t(),a.show(n,r)}),a},hide:function(){return i.style.display="none",nowIndex=void 0,r=[],a},showUnderNode:function(t,o){return e.isNode(t)&&a.show(o,function(){l(i,"zIndex",c(t,"zIndex"));var o=n(t),s=e.core.arr.indexOf(r,o);-1!=s&&r.splice(s,1),r.push(o),e.core.dom.insertElement(t,i,"beforebegin")}),a},back:function(){if(r.length<1)return a;var t,n;return r.pop(),r.length<1?a.hide():(n=r[r.length-1])&&(t=e.sizzle(n,document.body)[0])?(l(i,"zIndex",c(t,"zIndex")),e.core.dom.insertElement(t,i,"beforebegin")):a.back(),a},destroy:function(){d.remove(o),i.style.display="none",lastNode=void 0,_cache={}}};return a})}),steel.d("utils/kit/dom/drag",[],function(e,t,n){STK.register("utils.kit.dom.drag",function(e){return function(t,n){var i,o,r,s,u,l,c,d,a=function(){f(),p()},f=function(){i=e.parseParam({moveDom:t,perchStyle:"border:solid #999999 2px;",dragtype:"perch",actObj:{},pagePadding:5},n),r=i.moveDom,o={},s={},u=e.drag(t,{actObj:i.actObj}),"perch"===i.dragtype&&(l=e.C("div"),c=!1,d=!1,r=l),t.style.cursor="move"},p=function(){e.custEvent.add(i.actObj,"dragStart",g),e.custEvent.add(i.actObj,"dragEnd",h),e.custEvent.add(i.actObj,"draging",m)},g=function(n,o){document.body.style.cursor="move";var r=e.core.util.pageSize().page;if(s=e.core.dom.position(i.moveDom),s.pageX=o.pageX,s.pageY=o.pageY,s.height=i.moveDom.offsetHeight,s.width=i.moveDom.offsetWidth,s.pageHeight=r.height,s.pageWidth=r.width,"perch"===i.dragtype){var u=[];u.push(i.perchStyle),u.push("position:absolute"),u.push("z-index:"+(i.moveDom.style.zIndex+10)),u.push("width:"+i.moveDom.offsetWidth+"px"),u.push("height:"+i.moveDom.offsetHeight+"px"),u.push("left:"+s.l+"px"),u.push("top:"+s.t+"px"),l.style.cssText=u.join(";"),d=!0,setTimeout(function(){d&&(document.body.appendChild(l),c=!0)},100)}void 0!==t.setCapture&&t.setCapture()},h=function(e,n){document.body.style.cursor="auto",void 0!==t.setCapture&&t.releaseCapture(),"perch"===i.dragtype&&(d=!1,i.moveDom.style.top=l.style.top,i.moveDom.style.left=l.style.left,c&&(document.body.removeChild(l),c=!1))},m=function(e,t){var n=s.t+(t.pageY-s.pageY),o=s.l+(t.pageX-s.pageX),u=n+s.height,l=o+s.width,c=s.pageHeight-i.pagePadding,d=s.pageWidth-i.pagePadding;c>u&&n>0?r.style.top=n+"px":(0>n&&(r.style.top="0px"),u>=c&&(r.style.top=c-s.height+"px")),d>l&&o>0?r.style.left=o+"px":(0>o&&(r.style.left="0px"),l>=d&&(r.style.left=d-s.width+"px"))};return a(),o.destroy=function(){document.body.style.cursor="auto","function"==typeof r.setCapture&&r.releaseCapture(),"perch"===i.dragtype&&(d=!1,c&&(document.body.removeChild(l),c=!1)),e.custEvent.remove(i.actObj,"dragStart",g),e.custEvent.remove(i.actObj,"dragEnd",h),e.custEvent.remove(i.actObj,"draging",m),u.destroy&&u.destroy(),i=null,r=null,s=null,u=null,l=null,c=null,d=null},o.getActObj=function(){return i.actObj},o}})}),steel.d("ui/dialog",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/dialog","utils/module/mask","utils/kit/dom/drag"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/dialog"),e("utils/module/mask"),e("utils/kit/dom/drag"),STK.register("ui.dialog",function(e){var t='<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10019"><div class="content"><div class="W_layer_title" node-type="title_content"></div><div class="W_layer_close"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon" title="#L{关闭}" node-type="close">X</a></div><div node-type="inner"></div></div></div>',n=e.utils.kit.extra.language,i=null,o=function(){var i=e.utils.module.dialog(n(t));return e.custEvent.add(i,"show",function(){e.utils.module.mask.showUnderNode(i.getOuter(),{opacity:.5,background:"#000000"})}),e.custEvent.add(i,"hide",function(){e.utils.module.mask.back(),i.setMiddle()}),i.destroy=function(){r(i);try{i.hide(!0)}catch(e){}},i},r=function(e){e.setTitle("").clearContent(),i.setUnused(e)};return function(t){var n=e.parseParam({isHold:!1},t),s=n.isHold;n=e.core.obj.cut(n,["isHold"]),i||(i=e.utils.kit.extra.reuse(o));var u=i.getOne();return s||(e.custEvent.add(u,"hide",function(){e.custEvent.remove(u,"hide",arguments.callee),r(u)}),e.custEvent.add(u,"show",function(){i.setUsed(u)})),u}})}),steel.d("ui/confirm",["utils/kit/extra/language","ui/dialog","utils/module/layer"],function(e,t,n){e("utils/kit/extra/language"),e("ui/dialog"),e("utils/module/layer"),STK.register("ui.confirm",function(e){var t='<div node-type="outer"><div class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p></dd></dl></div><div class="W_layer_btn S_bg1"><a href="javascript:void(0)" class="W_btn_a btn_34px" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b btn_34px" node-type="cancel"></a></div></div>',n={success:"W_icon icon_succB","delete":"W_icon icon_warnB",error:"W_icon icon_rederrorB",warn:"W_icon icon_warnB",question:"W_icon icon_questionB"},i=e.utils.kit.extra.language,o=null;return function(r,s){var u,l,c,d,a,f;u=e.parseParam({title:i("#L{提示}"),icon:"question",textLarge:r,OK:e.funcEmpty,OKText:i("#L{确定}"),cancel:e.funcEmpty,cancelText:i("#L{取消}")},s),u.icon=n[u.icon],l={},o||(o=e.utils.kit.extra.reuse(function(){var n=e.utils.module.layer(t);return n})),c=o.getOne(),d=e.ui.dialog(),d.setContent(""),d.setContent(c.getOuter()),c.getDom("icon").className=u.icon,c.getDom("textLarge").innerHTML=u.textLarge,c.getDom("OK").innerHTML="<span>"+u.OKText+"</span>",c.getDom("cancel").innerHTML="<span>"+u.cancelText+"</span>",d.setTitle(u.title);var p=function(){a=!0,f=e.htmlToJson(c.getDom("textComplex")),d.hide()};return e.addEvent(c.getDom("OK"),"click",p),e.addEvent(c.getDom("cancel"),"click",d.hide),e.custEvent.add(d,"hide",function(){e.custEvent.remove(d,"hide",arguments.callee),e.removeEvent(c.getDom("OK"),"click",p),e.removeEvent(c.getDom("cancel"),"click",d.hide),o.setUnused(c),a?u.OK(f):u.cancel(f)}),d.show().setMiddle(),l.cfm=c,l.dia=d,l}})});