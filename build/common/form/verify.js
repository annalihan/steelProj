steel.d("utils/kit/dom/dir",[],function(e,t,n){STK.register("utils.kit.dom.dir",function(e){return function(t,n){n=e.parseParam({dir:"parentNode",expr:void 0,endpoint:document,maxLength:1},n);var i=n.dir,r=n.expr,o=n.endpoint,u=n.maxLength;if(!t||!r)return void e.log("kit dir: node or opts.expr is undefined.");for(var a=[],s=t[i];s&&!(1==s.nodeType&&e.sizzle(r,null,null,[s]).length>0&&(a.push(s),a.length==u))&&s!=o;)s=s[i];return a}})}),steel.d("utils/kit/dom/parents",["utils/kit/dom/dir"],function(e,t,n){e("utils/kit/dom/dir"),STK.register("utils.kit.dom.parents",function(e){return function(t,n){n=e.parseParam({expr:void 0,endpoint:document,maxLength:1},n);var i=n.expr;return t&&i?e.utils.kit.dom.dir(t,n):void e.log("kit parents: node or opts.expr is undefined.")}})}),steel.d("utils/kit/dom/parseDOM",[],function(e,t,n){STK.register("utils.kit.dom.parseDOM",function(e){return function(e){for(var t in e)e[t]&&1==e[t].length&&(e[t]=e[t][0]);return e}})}),steel.d("utils/kit/extra/language",[],function(e,t,n){STK.register("utils.kit.extra.language",function(e){return window.$LANG||(window.$LANG={}),function(t,n){var i=e.core.util.language(t,$LANG);return i=i.replace(/\\}/gi,"}"),n&&(i=e.templet(i,n)),i}})}),steel.d("utils/kit/extra/reuse",[],function(e,t,n){STK.register("utils.kit.extra.reuse",function(e){return function(t,n){var i,r,o;i=e.parseParam({},n),o=[];var u=function(){var e=t();return o.push({store:e,used:!0}),e},a=function(t){e.foreach(o,function(e,n){return t===e.store?(e.used=!0,!1):void 0})},s=function(t){e.foreach(o,function(e,n){return t===e.store?(e.used=!1,!1):void 0})},l=function(){for(var e=0,t=o.length;t>e;e+=1)if(o[e].used===!1)return o[e].used=!0,o[e].store;return u()};return r={},r.setUsed=a,r.setUnused=s,r.getOne=l,r.getLength=function(){return o.length},r}})}),steel.d("utils/module/layer",[],function(e,t,n){STK.register("utils.module.layer",function(e){var t=function(e){var t={};return"none"==e.style.display?(e.style.visibility="hidden",e.style.display="",t.w=e.offsetWidth,t.h=e.offsetHeight,e.style.display="none",e.style.visibility="visible"):(t.w=e.offsetWidth,t.h=e.offsetHeight),t},n=function(n,i){i=i||"topleft";var r=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",r=e.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):r=e.core.dom.position(n),"topleft"!==i){var o=t(n);"topright"===i?r.l=r.l+o.w:"bottomleft"===i?r.t=r.t+o.h:"bottomright"===i&&(r.l=r.l+o.w,r.t=r.t+o.h)}return r};return function(i){var r=e.core.dom.builder(i),o=r.list.outer[0],u=r.list.inner[0],a=e.core.dom.uniqueID(o),s={},l=e.core.evt.custEvent.define(s,"show");e.core.evt.custEvent.define(l,"hide");var c=null;return s.show=function(){return o.style.display="",e.core.evt.custEvent.fire(l,"show"),s},s.hide=function(){return o.style.display="none",e.custEvent.fire(l,"hide"),s},s.getPosition=function(e){return n(o,e)},s.getSize=function(e){return(e||!c)&&(c=t.apply(s,[o])),c},s.html=function(e){return void 0!==e&&(u.innerHTML=e),u.innerHTML},s.text=function(t){return void 0!==text&&(u.innerHTML=e.core.str.encodeHTML(t)),e.core.str.decodeHTML(u.innerHTML)},s.appendChild=function(e){return u.appendChild(e),s},s.getUniqueID=function(){return a},s.getOuter=function(){return o},s.getInner=function(){return u},s.getParentNode=function(){return o.parentNode},s.getDomList=function(){return r.list},s.getDomListByKey=function(e){return r.list[e]},s.getDom=function(e,t){return r.list[e]?r.list[e][t||0]:!1},s.getCascadeDom=function(t,n){return r.list[t]?e.core.dom.cascadeNode(r.list[t][n||0]):!1},s}})}),steel.d("utils/module/dialog",["utils/module/layer"],function(e,t,n){e("utils/module/layer"),STK.register("utils.module.dialog",function(e){return function(t,n){if(!t)throw"module.dialog need template as first parameter";var i,r,o,u,a,s,l,c,d,f,p,m;d=!0;var v=function(){d!==!1&&r.hide()},g=function(){i=e.parseParam({t:null,l:null,width:null,height:null},n),r=e.utils.module.layer(t,i),u=r.getOuter(),a=r.getDom("title"),c=r.getDom("title_content"),s=r.getDom("inner"),l=r.getDom("close"),e.addEvent(l,"click",function(){p()}),e.custEvent.add(r,"show",function(){e.hotKey.add(document.documentElement,["esc"],v,{type:"keyup",disableInInput:!0})}),e.custEvent.add(r,"hide",function(){e.hotKey.remove(document.documentElement,["esc"],v,{type:"keyup"}),d=!0})};return g(),m=e.objSup(r,["show","hide"]),p=function(t){return"function"!=typeof f||t||f()!==!1?(m.hide(),e.contains(document.body,r.getOuter())&&document.body.removeChild(r.getOuter()),o):!1},o=r,o.show=function(){return e.contains(document.body,r.getOuter())||document.body.appendChild(r.getOuter()),m.show(),o},o.hide=p,o.setPosition=function(e){return u.style.top=e.t+"px",u.style.left=e.l+"px",o},o.setMiddle=function(){var t,n=e.core.util.winSize(),i=r.getSize(!0);if(window.FrameInner&&window.FrameInner.outInfo){var a=FrameInner.outInfo;"string"==typeof a&&(a=e.strToJson(a));var s=a.parent.scroll.top,l=a.iframe.position.top,c=a.parent.size.height;t=s-l+(c-i.h)/2;var d=n.height-i.h;t>d&&(t=d)}else t=e.core.util.scrollPos().top+(n.height-i.h)/2;return u.style.top=(parseInt(t)>30?t:30)+"px",u.style.left=(n.width-i.w)/2+"px",window.FrameInner&&FrameInner.diaAutoHeight&&FrameInner.diaAutoHeight(u),o},o.setTitle=function(e){return c.innerHTML=e,o},o.setContent=function(e){return"string"==typeof e?s.innerHTML=e:s.appendChild(e),o},o.clearContent=function(){for(;s.children.length;)e.removeNode(s.children[0]);return o},o.setAlign=function(){},o.setBeforeHideFn=function(e){f=e},o.clearBeforeHideFn=function(){f=null},o.unsupportEsc=function(){d=!1},o.supportEsc=function(){d=!0},o}})}),steel.d("utils/kit/dom/cssText",[],function(e,t,n){STK.register("utils.kit.dom.cssText",function(e){var t=function(e,t){for(var n,i=(e+";"+t).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g,"$2$4");i&&(n=i.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i));)i=i.replace(n[1]+n[2]+n[3],"");return i};return function(e){e=e||"";var n=[],i={push:function(e,t){return n.push(e+":"+t),i},remove:function(e){for(var t=0;t<n.length;t++)0==n[t].indexOf(e+":")&&n.splice(t,1);return i},getStyleList:function(){return n.slice()},getCss:function(){return t(e,n.join(";"))}};return i}})}),steel.d("utils/kit/dom/fix",["utils/kit/dom/cssText"],function(e,t,n){e("utils/kit/dom/cssText"),STK.register("utils.kit.dom.fix",function(e){function t(t){return"none"!=e.core.dom.getStyle(t,"display")}function n(t){t=e.core.arr.isArray(t)?t:[0,0];for(var n=0;2>n;n++)"number"!=typeof t[n]&&(t[n]=0);return t}function i(n,i,o){if(t(n)){var u,a,s,l,c="fixed",d=n.offsetWidth,f=n.offsetHeight,p=e.core.util.winSize(),m=0,v=0,g=e.utils.kit.dom.cssText(n.style.cssText);if(r)switch(u=l=o[1],a=s=o[0],i){case"lt":l=s="";break;case"lb":u=s="";break;case"rt":a=l="";break;case"rb":u=a="";break;case"c":default:u=(p.height-f)/2+o[1],a=(p.width-d)/2+o[0],l=s=""}else{c="absolute";var h=e.core.util.scrollPos();switch(m=u=h.top,v=a=h.left,i){case"lt":u+=o[1],a+=o[0];break;case"lb":u+=p.height-f-o[1],a+=o[0];break;case"rt":u+=o[1],a+=p.width-d-o[0];break;case"rb":u+=p.height-f-o[1],a+=p.width-d-o[0];break;case"c":default:u+=(p.height-f)/2+o[1],a+=(p.width-d)/2+o[0]}s=l=""}"c"==i&&(m>u&&(u=m),v>a&&(a=v)),g.push("position",c).push("top",u+"px").push("left",a+"px").push("right",s+"px").push("bottom",l+"px"),n.style.cssText=g.getCss()}}var r=!(e.core.util.browser.IE6||"CSS1Compat"!==document.compatMode&&STK.IE),o=/^(c)|(lt)|(lb)|(rt)|(rb)$/;return function(t,u,a){function s(n){n=n||window.event,e.core.evt.custEvent.fire(d,"beforeFix",n.type),!f||r&&"c"!=l||i(t,l,c)}var l,c,d,f=!0;if(e.core.dom.isNode(t)&&o.test(u)){var p={getNode:function(){return t},isFixed:function(){return f},setFixed:function(e){return(f=!!e)&&i(t,l,c),this},setAlign:function(e,r){return o.test(e)&&(l=e,c=n(r),f&&i(t,l,c)),this},destroy:function(){r||r&&e.core.evt.removeEvent(window,"scroll",s),e.core.evt.removeEvent(window,"resize",s),e.core.evt.custEvent.undefine(d)}};return d=e.core.evt.custEvent.define(p,"beforeFix"),p.setAlign(u,a),r||e.core.evt.addEvent(window,"scroll",s),e.core.evt.addEvent(window,"resize",s),p}}})}),steel.d("utils/module/mask",["utils/kit/dom/fix"],function(e,t,n){e("utils/kit/dom/fix"),STK.register("utils.module.mask",function(e){function t(){i=e.C("div");var t='<div node-type="outer">';e.core.util.browser.IE6&&(t+='<div style="position:absolute;width:100%;height:100%;"></div>'),t+="</div>",i=e.builder(t).list.outer[0],document.body.appendChild(i),u=!0,r=e.utils.kit.dom.fix(i,"lt");var n=function(){var t=e.core.util.winSize();i.style.cssText=e.utils.kit.dom.cssText(i.style.cssText).push("width",t.width+"px").push("height",t.height+"px").getCss()};c.add(r,"beforeFix",n),n()}function n(t){var n;return(n=t.getAttribute(a))||t.setAttribute(a,n=e.getUniqueKey()),">"+t.tagName.toLowerCase()+"["+a+'="'+n+'"]'}var i,r,o=[],u=!1,a="STK-Mask-Key",s=e.core.dom.setStyle,l=e.core.dom.getStyle,c=e.core.evt.custEvent,d={getNode:function(){return i},show:function(n,o){return u?(n=e.core.obj.parseParam({opacity:0,background:"#000000"},n),i.style.background=n.background,s(i,"opacity",n.opacity),i.style.opacity=n.opacity,i.style.display="",r.setAlign("lt"),o&&o()):e.Ready(function(){t(),d.show(n,o)}),d},hide:function(){return i.style.display="none",nowIndex=void 0,o=[],d},showUnderNode:function(t,r){return e.isNode(t)&&d.show(r,function(){s(i,"zIndex",l(t,"zIndex"));var r=n(t),u=e.core.arr.indexOf(o,r);-1!=u&&o.splice(u,1),o.push(r),e.core.dom.insertElement(t,i,"beforebegin")}),d},back:function(){if(o.length<1)return d;var t,n;return o.pop(),o.length<1?d.hide():(n=o[o.length-1])&&(t=e.sizzle(n,document.body)[0])?(s(i,"zIndex",l(t,"zIndex")),e.core.dom.insertElement(t,i,"beforebegin")):d.back(),d},destroy:function(){c.remove(r),i.style.display="none",lastNode=void 0,_cache={}}};return d})}),steel.d("utils/kit/dom/drag",[],function(e,t,n){STK.register("utils.kit.dom.drag",function(e){return function(t,n){var i,r,o,u,a,s,l,c,d=function(){f(),p()},f=function(){i=e.parseParam({moveDom:t,perchStyle:"border:solid #999999 2px;",dragtype:"perch",actObj:{},pagePadding:5},n),o=i.moveDom,r={},u={},a=e.drag(t,{actObj:i.actObj}),"perch"===i.dragtype&&(s=e.C("div"),l=!1,c=!1,o=s),t.style.cursor="move"},p=function(){e.custEvent.add(i.actObj,"dragStart",m),e.custEvent.add(i.actObj,"dragEnd",v),e.custEvent.add(i.actObj,"draging",g)},m=function(n,r){document.body.style.cursor="move";var o=e.core.util.pageSize().page;if(u=e.core.dom.position(i.moveDom),u.pageX=r.pageX,u.pageY=r.pageY,u.height=i.moveDom.offsetHeight,u.width=i.moveDom.offsetWidth,u.pageHeight=o.height,u.pageWidth=o.width,"perch"===i.dragtype){var a=[];a.push(i.perchStyle),a.push("position:absolute"),a.push("z-index:"+(i.moveDom.style.zIndex+10)),a.push("width:"+i.moveDom.offsetWidth+"px"),a.push("height:"+i.moveDom.offsetHeight+"px"),a.push("left:"+u.l+"px"),a.push("top:"+u.t+"px"),s.style.cssText=a.join(";"),c=!0,setTimeout(function(){c&&(document.body.appendChild(s),l=!0)},100)}void 0!==t.setCapture&&t.setCapture()},v=function(e,n){document.body.style.cursor="auto",void 0!==t.setCapture&&t.releaseCapture(),"perch"===i.dragtype&&(c=!1,i.moveDom.style.top=s.style.top,i.moveDom.style.left=s.style.left,l&&(document.body.removeChild(s),l=!1))},g=function(e,t){var n=u.t+(t.pageY-u.pageY),r=u.l+(t.pageX-u.pageX),a=n+u.height,s=r+u.width,l=u.pageHeight-i.pagePadding,c=u.pageWidth-i.pagePadding;l>a&&n>0?o.style.top=n+"px":(0>n&&(o.style.top="0px"),a>=l&&(o.style.top=l-u.height+"px")),c>s&&r>0?o.style.left=r+"px":(0>r&&(o.style.left="0px"),s>=c&&(o.style.left=c-u.width+"px"))};return d(),r.destroy=function(){document.body.style.cursor="auto","function"==typeof o.setCapture&&o.releaseCapture(),"perch"===i.dragtype&&(c=!1,l&&(document.body.removeChild(s),l=!1)),e.custEvent.remove(i.actObj,"dragStart",m),e.custEvent.remove(i.actObj,"dragEnd",v),e.custEvent.remove(i.actObj,"draging",g),a.destroy&&a.destroy(),i=null,o=null,u=null,a=null,s=null,l=null,c=null},r.getActObj=function(){return i.actObj},r}})}),steel.d("ui/dialog",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/dialog","utils/module/mask","utils/kit/dom/drag"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/dialog"),e("utils/module/mask"),e("utils/kit/dom/drag"),STK.register("ui.dialog",function(e){var t='<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10019"><div class="content"><div class="W_layer_title" node-type="title_content"></div><div class="W_layer_close"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon" title="#L{关闭}" node-type="close">X</a></div><div node-type="inner"></div></div></div>',n=e.utils.kit.extra.language,i=null,r=function(){var i=e.utils.module.dialog(n(t));return e.custEvent.add(i,"show",function(){e.utils.module.mask.showUnderNode(i.getOuter(),{opacity:.5,background:"#000000"})}),e.custEvent.add(i,"hide",function(){e.utils.module.mask.back(),i.setMiddle()}),i.destroy=function(){o(i);try{i.hide(!0)}catch(e){}},i},o=function(e){e.setTitle("").clearContent(),i.setUnused(e)};return function(t){var n=e.parseParam({isHold:!1},t),u=n.isHold;n=e.core.obj.cut(n,["isHold"]),i||(i=e.utils.kit.extra.reuse(r));var a=i.getOne();return u||(e.custEvent.add(a,"hide",function(){e.custEvent.remove(a,"hide",arguments.callee),o(a)}),e.custEvent.add(a,"show",function(){i.setUsed(a)})),a}})}),steel.d("ui/alert",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/layer","ui/dialog"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/layer"),e("ui/dialog"),STK.register("ui.alert",function(e){var t,n='<div node-type="outer"><div class="layer_point" node-type="inner"><dl class="point clearfix"><dt><span class="W_icon" node-type="icon"></span></dt><dd><p class="W_f14" node-type="text"></p></dd></dl></div><div class="W_layer_btn S_bg1"><a class="W_btn_a btn_34px" href="javascript:;" node-type="OK"><span></span></a></div></div>',i={success:"W_icon icon_succB",error:"W_icon icon_rederrorB",warn:"W_icon icon_warnB",question:"W_icon icon_askB"},r=e.utils.kit.extra.language,o=null,u=function(e,t){e.getDom("icon").className=t.icon,e.getDom("text").innerHTML=t.text,e.getDom("OK").innerHTML=t.OKText};return function(a,s){t&&(t.dia.hide(),t=null);var l,c,d,f,p;return l=e.parseParam({title:r("#L{提示}"),icon:"warn",text:a,OK:e.funcEmpty,OKText:r("#L{确定}"),timeout:0},s),l.icon=i[l.icon],c={},o||(o=e.utils.kit.extra.reuse(function(){var t=e.utils.module.layer(r(n));return t})),d=o.getOne(),f=e.ui.dialog(),f.setContent(d.getOuter()),f.setTitle(l.title),u(d,l),e.addEvent(d.getDom("OK"),"click",f.hide),e.custEvent.add(f,"hide",function(){e.custEvent.remove(f,"hide",arguments.callee),e.removeEvent(d.getDom("OK"),"click",f.hide),o.setUnused(d),clearTimeout(p),l.OK()}),l.timeout&&(p=setTimeout(f.hide,l.timeout)),f.show().setMiddle(),c.alt=d,c.dia=f,t=c,c}})}),steel.d("common/form/regular",[],function(e,t,n){STK.register("common.form.regular",function(e){var t=e.core.str.trim,n=function(e){return e.value!=t(e.value)&&(e.value=t(e.value)),e.value==e.getAttribute("defval")?"":e.value};return{notEmpty:function(e){var t=n(e);return/^\s*$/g.test(t.replace(/^\s+|\s+$/g,""))},isDef:function(e){var t=n(e);return""==t},noDiffMax:function(e){var t=n(e);if(t){var i=parseInt(e.getAttribute("vmax"));return i>0?t.length>i:void 0}},tel:function(e){var t=n(e);if(t)return!/(^1[0-9]{10}$)|(^[\d\(\)（）_-]{4,15}$)/.test(t)},phone:function(e){var t=n(e);if(t)return!/(^1[0-9]{10}$)|(^[0-9]{8}$)/.test(t)},min:function(e){var t=n(e);if(t){var i=parseInt(e.getAttribute("vmin"));return t.length&&i>0?t.replace(/[^\x00-\xff]/g,"rr").length<i:void 0}},max:function(e){var t=n(e);if(t){var i=parseInt(e.getAttribute("vmax"));return i>0?t.replace(/[^\x00-\xff]/g,"rr").length>i:void 0}},number:function(e){var t=n(e);if(t){if(t=parseInt(t,10),!/^[0-9]+$/.test(e.value))return!0;var i=e.getAttribute("num-max"),r=e.getAttribute("num-min");if(i||r)return i&&t>parseInt(i,10)?!0:r&&t<parseInt(r,10)?!0:!1}},notAllNum:function(e){var t=n(e);if(t)return/^[0-9]*$/.test(t)},engnum:function(e){var t=n(e);if(t)return!/^[a-zA-Z0-9]*$/.test(t)},normal:function(e){var t=n(e);if(t)return!/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(t)},"float":function(e){var t=n(e);if(t)return!/^[0-9]*\.{0,1}[0-9]{0,2}$/.test(t)},chinese:function(e){var t=n(e);if(t)return!/^[\u4e00-\u9fa5]*$/.test(t)},checkurl:function(e){var t=n(e);if(t)return!/^(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9\/=\?%_~@&#:;\+\-]+)+$/i.test(t)},email:function(e){var t=n(e);if(t)return!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(t)},url:function(e){var t=n(e);if(t){var i="^((https|http|ftp|rtsp|mms)://)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?",r=new RegExp(i);return r.test(t)?!/\./g.test(t):!0}},IDcard:function(e){var t=n(e);if(t)return!/^(\d{8}[01]\d[0123]\d{4})|(\d{6}(19|20)\d{2}[01]\d[0123]\d{4}[0-9Xx])$/.test(t)},cen:function(e){var t=n(e);if(t)return!/^(?:#){0,1}[\d\u4e00-\u9fa5a-zA-Z_]+?(?:#){0,1}$/.test(t)},hasSelect:function(e){if(e.checked){for(var t=App.sizzle("input[type=checkbox]",$E(e.id+"_info")),n=0,i=t.length;i>n;++n)if(t[n].checked)return!1;return!0}},diffDate:function(e){var t=e.dateDom;if(t&&t.stime&&t.etime&&t.stime.value&&t.etime.value){var n=new Date(t.stime.value).getTime()/1e3+(t.shour?60*parseInt(t.shour.value):0)+(t.smin?parseInt(t.smin.value):0),i=new Date(t.etime.value).getTime()/1e3+(t.ehour?60*parseInt(t.ehour.value):0)+(t.emin?parseInt(t.emin.value):0);return n>i?!0:void 0}},zipcode:function(e){var t=n(e);if(t)return!/^[0-9]\d{5}$/.test(t)},ajax:function(t){var i=n(t),r=t.getAttribute("get");if(i&&r){var o=e.queryToJson(t.getAttribute("getparams")||"");o[t.name]=i,e.core.io.ajax({url:r,onComplete:function(e){return"100000"==e.code?!1:e.msg||!0},onFail:function(e){return!0},args:o,method:"get"})}}}})}),steel.d("common/form/verify",["utils/kit/dom/parents","utils/kit/dom/parseDOM","ui/alert","common/form/regular"],function(e,t,n){e("utils/kit/dom/parents"),e("utils/kit/dom/parseDOM"),e("ui/alert"),e("common/form/regular"),STK.register("common.form.verify",function(e){var t="#ACACAC";return function(n,i){var r,o={},u={DOM:{},objs:[],errNodes:[],DOM_eventFun:{},addEvent:function(t,n,i,r){var o=e.E(t);return null==o?!1:(n=n||"click","function"==(typeof i).toLowerCase()?(o.attachEvent?o.attachEvent("on"+n,i):o.addEventListener?o.addEventListener(n,i,r):o["on"+n]=i,!0):void 0)},tipTemp:function(e,t){var n="";switch(t){case 1:n='<div class="content layer_mini_info"><p class="main_txt"><i class="W_icon icon_rederrorS"></i><span class="txt S_txt1">'+e+'</span><a class="W_ficon ficon_close S_ficon" action-type="floatTip">X</a></p><div class="W_layer_arrow"><span class="W_arrow_bor W_arrow_bor_b"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div>';break;case 2:n='<div class="M_notice_succ"><span class="icon_succ"></span><span class="txt">'+("true"==e?"":e)+"</span></div>";break;case 3:n='<div class="M_notice_warn"><span class="icon_warn"></span><span class="txt">'+e+"</span></div>";break;case 4:n=$L('<div class="M_notice_warn">loading...</div>')}return n},tips:function(t,n){n=n||{};var i=u.tipFun.getTip(t);if(!i)return!0;if(!n.type&&(n.msg=null),!u.floatTip&&n.all){n.baseType=n.type;var r="true"==n.msg&&2==n.type?"":n.msg;r=u.tipFun.addMsg(r,i.innerHTML),n.type=r?1:n.type,n.msg=r?r:n.msg}if(i.innerHTML=n.msg?u.tipTemp(n.msg,n.type):"",i.style.display=n.msg?"":"none",n.dom=t,n.tipDom=i,u.floatTip){var a=e.position(t),s=e.core.dom.getSize(u.floatTip);u.floatTip.style.left=a.l+"px",u.floatTip.style.top=a.t-s.height-10+"px"}e.custEvent.fire(o,"tips",n)},tipFun:{allTips:function(t){var n={},i=e.sizzle("[tipid]");return e.core.arr.foreach(i,function(e,t){n[e.getAttribute("tipid")]=e}),n},addMsg:function(t,n){if(n=e.core.str.trim(n.replace(/<.+?>|◆/g,"")),!t)return n;if(n){var i=(" | "+n+" | ").indexOf(" | "+t+" | ")<0;t=i?n+" | "+t:n}return t},getTip:function(t){if(t){if(u.floatTip)return u.floatTip;var n,r=e.core.dom.isNode(t)?t.getAttribute("tip"):t;if(r&&(n=u.DOM.tips[r]||e.core.dom.sizzle("[tipid="+r+"]")[0]),!n&&i.getTip){var o=e.core.dom.isNode(t)?t:e.sizzle("[tip="+t+"]")[0];n=i.getTip(o)}return n}}},domFun:{fire:function(e,t){e&&(t?u.domFun.focus(e):u.domFun.blur(e))},getOpt:function(t){var n=e.core.dom.isNode(t)?t:e.core.evt.fixEvent().target,i={el:n,data:{}};return n.getAttribute("verify")&&(i.data=e.core.json.queryToJson(n.getAttribute("verify")||"")),i},click:function(e){var t=u.domFun.getOpt(e);t&&t.data.button&&("submit"==t.data.button&&u.domFun.submit(t),"reset"==t.data.button&&u.domFun.setDef())},submit:function(t){var n=u.domFun.json(!0);if(post){var r=t.el.getAttribute("get")?"get":t.el.getAttribute("post")?"post":"";if(r){var o=t.el.getAttribute(r),a=i.succ||function(e){window.location.href=e.data.url||window.location.href},s=i.fail||function(t){e.ui.alert(t.msg||"系统繁忙")};e.core.io.ajax({url:o,onComplete:function(e){"100000"==e.code?a(e):s(e)},onFail:function(e){s(e)},args:n,method:r})}}},focus:function(t){var n=u.domFun.getOpt(t);n&&(n.data.tipmsg&&u.tips(n.el,{msg:n.data.tipmsg,type:3}),u.placeholder||n.el.getAttribute("defval")!=n.el.value||(n.el.style.color="",n.el.value=""),n.data.focusval&&!n.el.value&&(n.el.value=n.data.focusval),n.el.getAttribute("autocut")&&(u.cutTime=setInterval(function(){u.domFun.autoCut(n.el)},200)),u.floatTip&&u.errTip==n.el&&(u.floatTip.style.display="none"),e.custEvent.fire(o,"focus",n.el))},blur:function(n){var i=u.domFun.getOpt(n);if(i){i.data.focusval&&i.el.value==i.data.focusval&&(i.el.value="");var r;return i.data.acttype&&(r=u.domFun.check(i)),u.placeholder||!i.el.getAttribute("defval")||i.el.value||(i.el.value=i.el.getAttribute("defval"),i.el.style.color=t),u.cutTime&&clearInterval(u.cutTime)&&(u.cutTime=null),e.custEvent.fire(o,"blur",i.el),r}},clearTip:function(){if(u.floatTip)return void(u.floatTip.style.display="none");var t=e.core.dom.sizzle("[tip]",n);e.core.arr.foreach(t,function(e,t){u.tips(e)}),i.getTip&&e.foreach(e.sizzle("[verify]",n),function(e){u.tips(e)}),i.showTip&&e.foreach(e.sizzle("[verify*=tipmsg=]",n),function(t){var n=e.core.json.queryToJson(t.getAttribute("verify")||"");n.tipmsg&&u.tips(t.getAttribute("tip"),{msg:n.tipmsg,type:3})})},check:function(t){if(t.el&&!u.domFun.isLocked(t.el)&&t.data.acttype){u.placeholder||t.el.getAttribute("defval")!=t.el.value||(t.el.style.color="",t.el.value="");for(var n=t.data.acttype.split("|"),o=0,a=n.length;a>o;++o){var s=n[o];if(r[s]&&r[s](t.el)){var l=r[s](t.el);if(t.data.errmsg&&"string"!=typeof l){var c=t.data.errmsg.split("||");l=c[o]?c[o]:c[c.length-1]}return u.tips(t.el,{msg:l,type:1,all:t.all}),e.addClassName(t.el,"W_input_error"),e.log(t.el+"检测"+s+"未通过"),u.errNodes.push(t.el),u.errTip=t.el,!0}}if(i.showTip&&t.data.tipmsg&&!t.data.sucmsg)return void u.tips(t.el,{msg:t.data.tipmsg,type:3,all:t.all});e.removeClassName(t.el,"W_input_error"),u.tips(t.el,{msg:t.data.sucmsg,all:t.all,type:t.data.sucmsg?2:!1}),u.domFun.clearErrArr(t.el),!t.all&&u.floatTip&&(u.topTag=u.domFun.getTopTag(),u.topTag&&u.domFun.fire(u.topTag))}},checkAll:function(t){u.topTag=null,u.errNodes=[],u.domFun.clearTip();var i=e.core.dom.sizzle("[verify]",n);e.core.arr.foreach(i,function(t,n){var i={el:t,all:!0};i.el=t,i.data=e.core.json.queryToJson(t.getAttribute("verify")||""),u.domFun.check(i)}),(t||u.floatTip)&&u.errNodes.length>0&&(u.topTag=u.domFun.getTopTag(),t&&e.core.util.scrollTo(u.topTag,{top:35,step:10}),u.floatTip&&u.domFun.fire(u.topTag))},getTopTag:function(){if(!(u.errNodes.length<1)){var t,n;return u.domFun.clearErrArr(),e.foreach(u.errNodes,function(i,r){if(!t)return t=i,void(n=e.core.dom.position(i));var o=e.core.dom.position(i);(o.t<n.t||n.t==n.t&&n.l<n.l)&&(t=i,n=o)}),t}},clearErrArr:function(t){var n=[];e.foreach(u.errNodes,function(i){t!=i&&e.core.arr.indexOf(i,n)<0&&n.push(i)}),u.errNodes=n},postData:function(t){if(u.domFun.checkAll(t),u.errNodes.length>0)return!1;var i=u.domFun.joinArr(e.core.util.htmlToJson(n));return u.domFun.setDef(),i},joinArr:function(t){for(var n in t)"object"==typeof t[n]&&(t[n]=e.core.arr.isArray(t[n])?t[n].join():e.core.json.jsonToStr(t[n]));return t},autoCut:function(t){var n=e.queryToJson(t.getAttribute("autocut"));n.rule&&(t.value=r[n.rule](t.value));var i=t.value,u=parseInt(n.max);u&&e.core.str.bLength(i)>u&&(t.value=e.core.str.leftB(i,u)),e.custEvent.fire(o,"cut",t)},setDef:function(){u.h5Type();var i=e.sizzle("[defval]",n);u.placeholder&&e.foreach(i,function(e){e.setAttribute("placeholder",e.getAttribute("defval"))}),!u.placeholder&&e.foreach(e.sizzle("[defval]",n),function(e){e.value||(e.value=e.getAttribute("defval"),e.style.color=t)})},isLocked:function(e){return e===n?!1:i.forceCheck||"none"!=e.style.display&&!e.disabled?arguments.callee(e.parentNode):!0}},h5Type:function(){if(!(e.IE||"FORM"!=n.nodeName&&e.core.util.browser.MOZ)){n.setAttribute("novalidate","novalidate");var t=["email","url","tel","phone","number"];e.core.util.browser.CHROME||t.push("float");var i={phone:"tel",number:"tel","float":"number"};e.foreach(e.sizzle("input[type=text][verify*=acttype=]",n),function(n){for(var r=(e.queryToJson(n.getAttribute("verify")).acttype||"").split("|"),o=0,u=r.length;u>o;++o)if(e.core.arr.inArray(r[o],t)){var a=i[r[o]]||r[o];!e.IE&&n.setAttribute("type",a)}})}},placeholder:"placeholder"in e.C("input")},a=function(){if(!n||!e.core.dom.isNode(n))throw new Error("box没有定义");i=i||{}},s=function(){if(u.DOM=e.utils.kit.dom.parseDOM(e.builder(n).list),u.DOM.tips=u.tipFun.allTips(n),r=e.core.json.merge(e.common.form.regular,i.rules||{}),i.getTip){if("function"!=typeof i.getTip){var t=i.getTip.split(" "),o=t[0];t.splice(0,1);var a=t.join(" ");i.getTip=function(t){var n=e.utils.kit.dom.parents(t,{expr:o})[0];return e.sizzle(a,n)[0]}}}else u.floatTip=e.C("div"),u.floatTip.className="W_layer W_layer_pop",document.body.appendChild(u.floatTip),u.objs.delegateErr=e.core.evt.delegatedEvent(u.floatTip),u.objs.delegateErr.add("floatTip","click",function(e){u.floatTip.style.display="none"}),i.getTip=function(e){return u.floatTip};i.tipTemp&&"function"!=typeof i.tipTemp&&e.log("getTip || tipTemp 类型错误"),i.tipTemp&&(u.tipTemp=i.tipTemp)},l=function(){u.domFun.setDef()},c=function(){u.addEvent(n,e.IE?"focusin":"focus",u.domFun.focus,!0),u.addEvent(n,e.IE?"focusout":"blur",u.domFun.blur,!0),u.addEvent(n,"click",u.domFun.click)},d=function(){e.custEvent.define(o,["focus","blur","tips","cut"])},f=function(){},p=function(){u&&(e.core.evt.removeEvent(n,e.IE?"focusin":"focus",u.domFun.focus,!0),e.core.evt.removeEvent(n,e.IE?"focusout":"blur",u.domFun.blur,!0),e.foreach(u.objs,function(e){e.destroy&&e.destroy()}),u=null)},m=function(){a(),s(),l(),c(),d(),f(),u.domFun.clearTip()};return m(),o.destroy=p,o.fire=u.domFun.fire,o.json=u.domFun.postData,o.clearTip=u.domFun.clearTip,o.tips=u.tips,o.setDef=u.domFun.setDef,o.tipMsg=u.tipTemp,o.supportH5=u.h5Type,o}})});