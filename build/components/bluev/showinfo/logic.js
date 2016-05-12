steel.d("utils/kit/dom/parseDOM",[],function(e,t,n){STK.register("utils.kit.dom.parseDOM",function(e){return function(e){for(var t in e)e[t]&&1==e[t].length&&(e[t]=e[t][0]);return e}})}),steel.d("utils/kit/dom/dir",[],function(e,t,n){STK.register("utils.kit.dom.dir",function(e){return function(t,n){n=e.parseParam({dir:"parentNode",expr:void 0,endpoint:document,maxLength:1},n);var r=n.dir,i=n.expr,o=n.endpoint,u=n.maxLength;if(!t||!i)return void e.log("kit dir: node or opts.expr is undefined.");for(var a=[],s=t[r];s&&!(1==s.nodeType&&e.sizzle(i,null,null,[s]).length>0&&(a.push(s),a.length==u))&&s!=o;)s=s[r];return a}})}),steel.d("utils/kit/dom/parents",["utils/kit/dom/dir"],function(e,t,n){e("utils/kit/dom/dir"),STK.register("utils.kit.dom.parents",function(e){return function(t,n){n=e.parseParam({expr:void 0,endpoint:document,maxLength:1},n);var r=n.expr;return t&&r?e.utils.kit.dom.dir(t,n):void e.log("kit parents: node or opts.expr is undefined.")}})}),steel.d("utils/kit/extra/language",[],function(e,t,n){STK.register("utils.kit.extra.language",function(e){return window.$LANG||(window.$LANG={}),function(t,n){var r=e.core.util.language(t,$LANG);return r=r.replace(/\\}/gi,"}"),n&&(r=e.templet(r,n)),r}})}),steel.d("utils/kit/extra/reuse",[],function(e,t,n){STK.register("utils.kit.extra.reuse",function(e){return function(t,n){var r,i,o;r=e.parseParam({},n),o=[];var u=function(){var e=t();return o.push({store:e,used:!0}),e},a=function(t){e.foreach(o,function(e,n){return t===e.store?(e.used=!0,!1):void 0})},s=function(t){e.foreach(o,function(e,n){return t===e.store?(e.used=!1,!1):void 0})},l=function(){for(var e=0,t=o.length;t>e;e+=1)if(o[e].used===!1)return o[e].used=!0,o[e].store;return u()};return i={},i.setUsed=a,i.setUnused=s,i.getOne=l,i.getLength=function(){return o.length},i}})}),steel.d("utils/module/layer",[],function(e,t,n){STK.register("utils.module.layer",function(e){var t=function(e){var t={};return"none"==e.style.display?(e.style.visibility="hidden",e.style.display="",t.w=e.offsetWidth,t.h=e.offsetHeight,e.style.display="none",e.style.visibility="visible"):(t.w=e.offsetWidth,t.h=e.offsetHeight),t},n=function(n,r){r=r||"topleft";var i=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",i=e.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):i=e.core.dom.position(n),"topleft"!==r){var o=t(n);"topright"===r?i.l=i.l+o.w:"bottomleft"===r?i.t=i.t+o.h:"bottomright"===r&&(i.l=i.l+o.w,i.t=i.t+o.h)}return i};return function(r){var i=e.core.dom.builder(r),o=i.list.outer[0],u=i.list.inner[0],a=e.core.dom.uniqueID(o),s={},l=e.core.evt.custEvent.define(s,"show");e.core.evt.custEvent.define(l,"hide");var c=null;return s.show=function(){return o.style.display="",e.core.evt.custEvent.fire(l,"show"),s},s.hide=function(){return o.style.display="none",e.custEvent.fire(l,"hide"),s},s.getPosition=function(e){return n(o,e)},s.getSize=function(e){return(e||!c)&&(c=t.apply(s,[o])),c},s.html=function(e){return void 0!==e&&(u.innerHTML=e),u.innerHTML},s.text=function(t){return void 0!==text&&(u.innerHTML=e.core.str.encodeHTML(t)),e.core.str.decodeHTML(u.innerHTML)},s.appendChild=function(e){return u.appendChild(e),s},s.getUniqueID=function(){return a},s.getOuter=function(){return o},s.getInner=function(){return u},s.getParentNode=function(){return o.parentNode},s.getDomList=function(){return i.list},s.getDomListByKey=function(e){return i.list[e]},s.getDom=function(e,t){return i.list[e]?i.list[e][t||0]:!1},s.getCascadeDom=function(t,n){return i.list[t]?e.core.dom.cascadeNode(i.list[t][n||0]):!1},s}})}),steel.d("utils/module/dialog",["utils/module/layer"],function(e,t,n){e("utils/module/layer"),STK.register("utils.module.dialog",function(e){return function(t,n){if(!t)throw"module.dialog need template as first parameter";var r,i,o,u,a,s,l,c,d,p,f,v;d=!0;var m=function(){d!==!1&&i.hide()},g=function(){r=e.parseParam({t:null,l:null,width:null,height:null},n),i=e.utils.module.layer(t,r),u=i.getOuter(),a=i.getDom("title"),c=i.getDom("title_content"),s=i.getDom("inner"),l=i.getDom("close"),e.addEvent(l,"click",function(){f()}),e.custEvent.add(i,"show",function(){e.hotKey.add(document.documentElement,["esc"],m,{type:"keyup",disableInInput:!0})}),e.custEvent.add(i,"hide",function(){e.hotKey.remove(document.documentElement,["esc"],m,{type:"keyup"}),d=!0})};return g(),v=e.objSup(i,["show","hide"]),f=function(t){return"function"!=typeof p||t||p()!==!1?(v.hide(),e.contains(document.body,i.getOuter())&&document.body.removeChild(i.getOuter()),o):!1},o=i,o.show=function(){return e.contains(document.body,i.getOuter())||document.body.appendChild(i.getOuter()),v.show(),o},o.hide=f,o.setPosition=function(e){return u.style.top=e.t+"px",u.style.left=e.l+"px",o},o.setMiddle=function(){var t,n=e.core.util.winSize(),r=i.getSize(!0);if(window.FrameInner&&window.FrameInner.outInfo){var a=FrameInner.outInfo;"string"==typeof a&&(a=e.strToJson(a));var s=a.parent.scroll.top,l=a.iframe.position.top,c=a.parent.size.height;t=s-l+(c-r.h)/2;var d=n.height-r.h;t>d&&(t=d)}else t=e.core.util.scrollPos().top+(n.height-r.h)/2;return u.style.top=(parseInt(t)>30?t:30)+"px",u.style.left=(n.width-r.w)/2+"px",window.FrameInner&&FrameInner.diaAutoHeight&&FrameInner.diaAutoHeight(u),o},o.setTitle=function(e){return c.innerHTML=e,o},o.setContent=function(e){return"string"==typeof e?s.innerHTML=e:s.appendChild(e),o},o.clearContent=function(){for(;s.children.length;)e.removeNode(s.children[0]);return o},o.setAlign=function(){},o.setBeforeHideFn=function(e){p=e},o.clearBeforeHideFn=function(){p=null},o.unsupportEsc=function(){d=!1},o.supportEsc=function(){d=!0},o}})}),steel.d("utils/kit/dom/cssText",[],function(e,t,n){STK.register("utils.kit.dom.cssText",function(e){var t=function(e,t){for(var n,r=(e+";"+t).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g,"$2$4");r&&(n=r.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i));)r=r.replace(n[1]+n[2]+n[3],"");return r};return function(e){e=e||"";var n=[],r={push:function(e,t){return n.push(e+":"+t),r},remove:function(e){for(var t=0;t<n.length;t++)0==n[t].indexOf(e+":")&&n.splice(t,1);return r},getStyleList:function(){return n.slice()},getCss:function(){return t(e,n.join(";"))}};return r}})}),steel.d("utils/kit/dom/fix",["utils/kit/dom/cssText"],function(e,t,n){e("utils/kit/dom/cssText"),STK.register("utils.kit.dom.fix",function(e){function t(t){return"none"!=e.core.dom.getStyle(t,"display")}function n(t){t=e.core.arr.isArray(t)?t:[0,0];for(var n=0;2>n;n++)"number"!=typeof t[n]&&(t[n]=0);return t}function r(n,r,o){if(t(n)){var u,a,s,l,c="fixed",d=n.offsetWidth,p=n.offsetHeight,f=e.core.util.winSize(),v=0,m=0,g=e.utils.kit.dom.cssText(n.style.cssText);if(i)switch(u=l=o[1],a=s=o[0],r){case"lt":l=s="";break;case"lb":u=s="";break;case"rt":a=l="";break;case"rb":u=a="";break;case"c":default:u=(f.height-p)/2+o[1],a=(f.width-d)/2+o[0],l=s=""}else{c="absolute";var h=e.core.util.scrollPos();switch(v=u=h.top,m=a=h.left,r){case"lt":u+=o[1],a+=o[0];break;case"lb":u+=f.height-p-o[1],a+=o[0];break;case"rt":u+=o[1],a+=f.width-d-o[0];break;case"rb":u+=f.height-p-o[1],a+=f.width-d-o[0];break;case"c":default:u+=(f.height-p)/2+o[1],a+=(f.width-d)/2+o[0]}s=l=""}"c"==r&&(v>u&&(u=v),m>a&&(a=m)),g.push("position",c).push("top",u+"px").push("left",a+"px").push("right",s+"px").push("bottom",l+"px"),n.style.cssText=g.getCss()}}var i=!(e.core.util.browser.IE6||"CSS1Compat"!==document.compatMode&&STK.IE),o=/^(c)|(lt)|(lb)|(rt)|(rb)$/;return function(t,u,a){function s(n){n=n||window.event,e.core.evt.custEvent.fire(d,"beforeFix",n.type),!p||i&&"c"!=l||r(t,l,c)}var l,c,d,p=!0;if(e.core.dom.isNode(t)&&o.test(u)){var f={getNode:function(){return t},isFixed:function(){return p},setFixed:function(e){return(p=!!e)&&r(t,l,c),this},setAlign:function(e,i){return o.test(e)&&(l=e,c=n(i),p&&r(t,l,c)),this},destroy:function(){i||i&&e.core.evt.removeEvent(window,"scroll",s),e.core.evt.removeEvent(window,"resize",s),e.core.evt.custEvent.undefine(d)}};return d=e.core.evt.custEvent.define(f,"beforeFix"),f.setAlign(u,a),i||e.core.evt.addEvent(window,"scroll",s),e.core.evt.addEvent(window,"resize",s),f}}})}),steel.d("utils/module/mask",["utils/kit/dom/fix"],function(e,t,n){e("utils/kit/dom/fix"),STK.register("utils.module.mask",function(e){function t(){r=e.C("div");var t='<div node-type="outer">';e.core.util.browser.IE6&&(t+='<div style="position:absolute;width:100%;height:100%;"></div>'),t+="</div>",r=e.builder(t).list.outer[0],document.body.appendChild(r),u=!0,i=e.utils.kit.dom.fix(r,"lt");var n=function(){var t=e.core.util.winSize();r.style.cssText=e.utils.kit.dom.cssText(r.style.cssText).push("width",t.width+"px").push("height",t.height+"px").getCss()};c.add(i,"beforeFix",n),n()}function n(t){var n;return(n=t.getAttribute(a))||t.setAttribute(a,n=e.getUniqueKey()),">"+t.tagName.toLowerCase()+"["+a+'="'+n+'"]'}var r,i,o=[],u=!1,a="STK-Mask-Key",s=e.core.dom.setStyle,l=e.core.dom.getStyle,c=e.core.evt.custEvent,d={getNode:function(){return r},show:function(n,o){return u?(n=e.core.obj.parseParam({opacity:0,background:"#000000"},n),r.style.background=n.background,s(r,"opacity",n.opacity),r.style.opacity=n.opacity,r.style.display="",i.setAlign("lt"),o&&o()):e.Ready(function(){t(),d.show(n,o)}),d},hide:function(){return r.style.display="none",nowIndex=void 0,o=[],d},showUnderNode:function(t,i){return e.isNode(t)&&d.show(i,function(){s(r,"zIndex",l(t,"zIndex"));var i=n(t),u=e.core.arr.indexOf(o,i);-1!=u&&o.splice(u,1),o.push(i),e.core.dom.insertElement(t,r,"beforebegin")}),d},back:function(){if(o.length<1)return d;var t,n;return o.pop(),o.length<1?d.hide():(n=o[o.length-1])&&(t=e.sizzle(n,document.body)[0])?(s(r,"zIndex",l(t,"zIndex")),e.core.dom.insertElement(t,r,"beforebegin")):d.back(),d},destroy:function(){c.remove(i),r.style.display="none",lastNode=void 0,_cache={}}};return d})}),steel.d("utils/kit/dom/drag",[],function(e,t,n){STK.register("utils.kit.dom.drag",function(e){return function(t,n){var r,i,o,u,a,s,l,c,d=function(){p(),f()},p=function(){r=e.parseParam({moveDom:t,perchStyle:"border:solid #999999 2px;",dragtype:"perch",actObj:{},pagePadding:5},n),o=r.moveDom,i={},u={},a=e.drag(t,{actObj:r.actObj}),"perch"===r.dragtype&&(s=e.C("div"),l=!1,c=!1,o=s),t.style.cursor="move"},f=function(){e.custEvent.add(r.actObj,"dragStart",v),e.custEvent.add(r.actObj,"dragEnd",m),e.custEvent.add(r.actObj,"draging",g)},v=function(n,i){document.body.style.cursor="move";var o=e.core.util.pageSize().page;if(u=e.core.dom.position(r.moveDom),u.pageX=i.pageX,u.pageY=i.pageY,u.height=r.moveDom.offsetHeight,u.width=r.moveDom.offsetWidth,u.pageHeight=o.height,u.pageWidth=o.width,"perch"===r.dragtype){var a=[];a.push(r.perchStyle),a.push("position:absolute"),a.push("z-index:"+(r.moveDom.style.zIndex+10)),a.push("width:"+r.moveDom.offsetWidth+"px"),a.push("height:"+r.moveDom.offsetHeight+"px"),a.push("left:"+u.l+"px"),a.push("top:"+u.t+"px"),s.style.cssText=a.join(";"),c=!0,setTimeout(function(){c&&(document.body.appendChild(s),l=!0)},100)}void 0!==t.setCapture&&t.setCapture()},m=function(e,n){document.body.style.cursor="auto",void 0!==t.setCapture&&t.releaseCapture(),"perch"===r.dragtype&&(c=!1,r.moveDom.style.top=s.style.top,r.moveDom.style.left=s.style.left,l&&(document.body.removeChild(s),l=!1))},g=function(e,t){var n=u.t+(t.pageY-u.pageY),i=u.l+(t.pageX-u.pageX),a=n+u.height,s=i+u.width,l=u.pageHeight-r.pagePadding,c=u.pageWidth-r.pagePadding;l>a&&n>0?o.style.top=n+"px":(0>n&&(o.style.top="0px"),a>=l&&(o.style.top=l-u.height+"px")),c>s&&i>0?o.style.left=i+"px":(0>i&&(o.style.left="0px"),s>=c&&(o.style.left=c-u.width+"px"))};return d(),i.destroy=function(){document.body.style.cursor="auto","function"==typeof o.setCapture&&o.releaseCapture(),"perch"===r.dragtype&&(c=!1,l&&(document.body.removeChild(s),l=!1)),e.custEvent.remove(r.actObj,"dragStart",v),e.custEvent.remove(r.actObj,"dragEnd",m),e.custEvent.remove(r.actObj,"draging",g),a.destroy&&a.destroy(),r=null,o=null,u=null,a=null,s=null,l=null,c=null},i.getActObj=function(){return r.actObj},i}})}),steel.d("ui/dialog",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/dialog","utils/module/mask","utils/kit/dom/drag"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/dialog"),e("utils/module/mask"),e("utils/kit/dom/drag"),STK.register("ui.dialog",function(e){var t='<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10019"><div class="content"><div class="W_layer_title" node-type="title_content"></div><div class="W_layer_close"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon" title="#L{关闭}" node-type="close">X</a></div><div node-type="inner"></div></div></div>',n=e.utils.kit.extra.language,r=null,i=function(){var r=e.utils.module.dialog(n(t));return e.custEvent.add(r,"show",function(){e.utils.module.mask.showUnderNode(r.getOuter(),{opacity:.5,background:"#000000"})}),e.custEvent.add(r,"hide",function(){e.utils.module.mask.back(),r.setMiddle()}),r.destroy=function(){o(r);try{r.hide(!0)}catch(e){}},r},o=function(e){e.setTitle("").clearContent(),r.setUnused(e)};return function(t){var n=e.parseParam({isHold:!1},t),u=n.isHold;n=e.core.obj.cut(n,["isHold"]),r||(r=e.utils.kit.extra.reuse(i));var a=r.getOne();return u||(e.custEvent.add(a,"hide",function(){e.custEvent.remove(a,"hide",arguments.callee),o(a)}),e.custEvent.add(a,"show",function(){r.setUsed(a)})),a}})}),steel.d("ui/alert",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/layer","ui/dialog"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/layer"),e("ui/dialog"),STK.register("ui.alert",function(e){var t,n='<div node-type="outer"><div class="layer_point" node-type="inner"><dl class="point clearfix"><dt><span class="W_icon" node-type="icon"></span></dt><dd><p class="W_f14" node-type="text"></p></dd></dl></div><div class="W_layer_btn S_bg1"><a class="W_btn_a btn_34px" href="javascript:;" node-type="OK"><span></span></a></div></div>',r={success:"W_icon icon_succB",error:"W_icon icon_rederrorB",warn:"W_icon icon_warnB",question:"W_icon icon_askB"},i=e.utils.kit.extra.language,o=null,u=function(e,t){e.getDom("icon").className=t.icon,e.getDom("text").innerHTML=t.text,e.getDom("OK").innerHTML=t.OKText};return function(a,s){t&&(t.dia.hide(),t=null);var l,c,d,p,f;return l=e.parseParam({title:i("#L{提示}"),icon:"warn",text:a,OK:e.funcEmpty,OKText:i("#L{确定}"),timeout:0},s),l.icon=r[l.icon],c={},o||(o=e.utils.kit.extra.reuse(function(){var t=e.utils.module.layer(i(n));return t})),d=o.getOne(),p=e.ui.dialog(),p.setContent(d.getOuter()),p.setTitle(l.title),u(d,l),e.addEvent(d.getDom("OK"),"click",p.hide),e.custEvent.add(p,"hide",function(){e.custEvent.remove(p,"hide",arguments.callee),e.removeEvent(d.getDom("OK"),"click",p.hide),o.setUnused(d),clearTimeout(f),l.OK()}),l.timeout&&(f=setTimeout(p.hide,l.timeout)),p.show().setMiddle(),c.alt=d,c.dia=p,t=c,c}})}),steel.d("common/form/regular",[],function(e,t,n){STK.register("common.form.regular",function(e){var t=e.core.str.trim,n=function(e){return e.value!=t(e.value)&&(e.value=t(e.value)),e.value==e.getAttribute("defval")?"":e.value};return{notEmpty:function(e){var t=n(e);return/^\s*$/g.test(t.replace(/^\s+|\s+$/g,""))},isDef:function(e){var t=n(e);return""==t},noDiffMax:function(e){var t=n(e);if(t){var r=parseInt(e.getAttribute("vmax"));return r>0?t.length>r:void 0}},tel:function(e){var t=n(e);if(t)return!/(^1[0-9]{10}$)|(^[\d\(\)（）_-]{4,15}$)/.test(t)},phone:function(e){var t=n(e);if(t)return!/(^1[0-9]{10}$)|(^[0-9]{8}$)/.test(t)},min:function(e){var t=n(e);if(t){var r=parseInt(e.getAttribute("vmin"));return t.length&&r>0?t.replace(/[^\x00-\xff]/g,"rr").length<r:void 0}},max:function(e){var t=n(e);if(t){var r=parseInt(e.getAttribute("vmax"));return r>0?t.replace(/[^\x00-\xff]/g,"rr").length>r:void 0}},number:function(e){var t=n(e);if(t){if(t=parseInt(t,10),!/^[0-9]+$/.test(e.value))return!0;var r=e.getAttribute("num-max"),i=e.getAttribute("num-min");if(r||i)return r&&t>parseInt(r,10)?!0:i&&t<parseInt(i,10)?!0:!1}},notAllNum:function(e){var t=n(e);if(t)return/^[0-9]*$/.test(t)},engnum:function(e){var t=n(e);if(t)return!/^[a-zA-Z0-9]*$/.test(t)},normal:function(e){var t=n(e);if(t)return!/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(t)},"float":function(e){var t=n(e);if(t)return!/^[0-9]*\.{0,1}[0-9]{0,2}$/.test(t)},chinese:function(e){var t=n(e);if(t)return!/^[\u4e00-\u9fa5]*$/.test(t)},checkurl:function(e){var t=n(e);if(t)return!/^(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9\/=\?%_~@&#:;\+\-]+)+$/i.test(t)},email:function(e){var t=n(e);if(t)return!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(t)},url:function(e){var t=n(e);if(t){var r="^((https|http|ftp|rtsp|mms)://)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?",i=new RegExp(r);return i.test(t)?!/\./g.test(t):!0}},IDcard:function(e){var t=n(e);if(t)return!/^(\d{8}[01]\d[0123]\d{4})|(\d{6}(19|20)\d{2}[01]\d[0123]\d{4}[0-9Xx])$/.test(t)},cen:function(e){var t=n(e);if(t)return!/^(?:#){0,1}[\d\u4e00-\u9fa5a-zA-Z_]+?(?:#){0,1}$/.test(t)},hasSelect:function(e){if(e.checked){for(var t=App.sizzle("input[type=checkbox]",$E(e.id+"_info")),n=0,r=t.length;r>n;++n)if(t[n].checked)return!1;return!0}},diffDate:function(e){var t=e.dateDom;if(t&&t.stime&&t.etime&&t.stime.value&&t.etime.value){var n=new Date(t.stime.value).getTime()/1e3+(t.shour?60*parseInt(t.shour.value):0)+(t.smin?parseInt(t.smin.value):0),r=new Date(t.etime.value).getTime()/1e3+(t.ehour?60*parseInt(t.ehour.value):0)+(t.emin?parseInt(t.emin.value):0);return n>r?!0:void 0}},zipcode:function(e){var t=n(e);if(t)return!/^[0-9]\d{5}$/.test(t)},ajax:function(t){var r=n(t),i=t.getAttribute("get");if(r&&i){var o=e.queryToJson(t.getAttribute("getparams")||"");o[t.name]=r,e.core.io.ajax({url:i,onComplete:function(e){return"100000"==e.code?!1:e.msg||!0},onFail:function(e){return!0},args:o,method:"get"})}}}})}),steel.d("common/form/verify",["utils/kit/dom/parents","utils/kit/dom/parseDOM","ui/alert","common/form/regular"],function(e,t,n){e("utils/kit/dom/parents"),e("utils/kit/dom/parseDOM"),e("ui/alert"),e("common/form/regular"),STK.register("common.form.verify",function(e){var t="#ACACAC";return function(n,r){var i,o={},u={DOM:{},objs:[],errNodes:[],DOM_eventFun:{},addEvent:function(t,n,r,i){var o=e.E(t);return null==o?!1:(n=n||"click","function"==(typeof r).toLowerCase()?(o.attachEvent?o.attachEvent("on"+n,r):o.addEventListener?o.addEventListener(n,r,i):o["on"+n]=r,!0):void 0)},tipTemp:function(e,t){var n="";switch(t){case 1:n='<div class="content layer_mini_info"><p class="main_txt"><i class="W_icon icon_rederrorS"></i><span class="txt S_txt1">'+e+'</span><a class="W_ficon ficon_close S_ficon" action-type="floatTip">X</a></p><div class="W_layer_arrow"><span class="W_arrow_bor W_arrow_bor_b"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div>';break;case 2:n='<div class="M_notice_succ"><span class="icon_succ"></span><span class="txt">'+("true"==e?"":e)+"</span></div>";break;case 3:n='<div class="M_notice_warn"><span class="icon_warn"></span><span class="txt">'+e+"</span></div>";break;case 4:n=$L('<div class="M_notice_warn">loading...</div>')}return n},tips:function(t,n){n=n||{};var r=u.tipFun.getTip(t);if(!r)return!0;if(!n.type&&(n.msg=null),!u.floatTip&&n.all){n.baseType=n.type;var i="true"==n.msg&&2==n.type?"":n.msg;i=u.tipFun.addMsg(i,r.innerHTML),n.type=i?1:n.type,n.msg=i?i:n.msg}if(r.innerHTML=n.msg?u.tipTemp(n.msg,n.type):"",r.style.display=n.msg?"":"none",n.dom=t,n.tipDom=r,u.floatTip){var a=e.position(t),s=e.core.dom.getSize(u.floatTip);u.floatTip.style.left=a.l+"px",u.floatTip.style.top=a.t-s.height-10+"px"}e.custEvent.fire(o,"tips",n)},tipFun:{allTips:function(t){var n={},r=e.sizzle("[tipid]");return e.core.arr.foreach(r,function(e,t){n[e.getAttribute("tipid")]=e}),n},addMsg:function(t,n){if(n=e.core.str.trim(n.replace(/<.+?>|◆/g,"")),!t)return n;if(n){var r=(" | "+n+" | ").indexOf(" | "+t+" | ")<0;t=r?n+" | "+t:n}return t},getTip:function(t){if(t){if(u.floatTip)return u.floatTip;var n,i=e.core.dom.isNode(t)?t.getAttribute("tip"):t;if(i&&(n=u.DOM.tips[i]||e.core.dom.sizzle("[tipid="+i+"]")[0]),!n&&r.getTip){var o=e.core.dom.isNode(t)?t:e.sizzle("[tip="+t+"]")[0];n=r.getTip(o)}return n}}},domFun:{fire:function(e,t){e&&(t?u.domFun.focus(e):u.domFun.blur(e))},getOpt:function(t){var n=e.core.dom.isNode(t)?t:e.core.evt.fixEvent().target,r={el:n,data:{}};return n.getAttribute("verify")&&(r.data=e.core.json.queryToJson(n.getAttribute("verify")||"")),r},click:function(e){var t=u.domFun.getOpt(e);t&&t.data.button&&("submit"==t.data.button&&u.domFun.submit(t),"reset"==t.data.button&&u.domFun.setDef())},submit:function(t){var n=u.domFun.json(!0);if(post){var i=t.el.getAttribute("get")?"get":t.el.getAttribute("post")?"post":"";if(i){var o=t.el.getAttribute(i),a=r.succ||function(e){window.location.href=e.data.url||window.location.href},s=r.fail||function(t){e.ui.alert(t.msg||"系统繁忙")};e.core.io.ajax({url:o,onComplete:function(e){"100000"==e.code?a(e):s(e)},onFail:function(e){s(e)},args:n,method:i})}}},focus:function(t){var n=u.domFun.getOpt(t);n&&(n.data.tipmsg&&u.tips(n.el,{msg:n.data.tipmsg,type:3}),u.placeholder||n.el.getAttribute("defval")!=n.el.value||(n.el.style.color="",n.el.value=""),n.data.focusval&&!n.el.value&&(n.el.value=n.data.focusval),n.el.getAttribute("autocut")&&(u.cutTime=setInterval(function(){u.domFun.autoCut(n.el)},200)),u.floatTip&&u.errTip==n.el&&(u.floatTip.style.display="none"),e.custEvent.fire(o,"focus",n.el))},blur:function(n){var r=u.domFun.getOpt(n);if(r){r.data.focusval&&r.el.value==r.data.focusval&&(r.el.value="");var i;return r.data.acttype&&(i=u.domFun.check(r)),u.placeholder||!r.el.getAttribute("defval")||r.el.value||(r.el.value=r.el.getAttribute("defval"),r.el.style.color=t),u.cutTime&&clearInterval(u.cutTime)&&(u.cutTime=null),e.custEvent.fire(o,"blur",r.el),i}},clearTip:function(){if(u.floatTip)return void(u.floatTip.style.display="none");var t=e.core.dom.sizzle("[tip]",n);e.core.arr.foreach(t,function(e,t){u.tips(e)}),r.getTip&&e.foreach(e.sizzle("[verify]",n),function(e){u.tips(e)}),r.showTip&&e.foreach(e.sizzle("[verify*=tipmsg=]",n),function(t){var n=e.core.json.queryToJson(t.getAttribute("verify")||"");n.tipmsg&&u.tips(t.getAttribute("tip"),{msg:n.tipmsg,type:3})})},check:function(t){if(t.el&&!u.domFun.isLocked(t.el)&&t.data.acttype){u.placeholder||t.el.getAttribute("defval")!=t.el.value||(t.el.style.color="",t.el.value="");for(var n=t.data.acttype.split("|"),o=0,a=n.length;a>o;++o){var s=n[o];if(i[s]&&i[s](t.el)){var l=i[s](t.el);if(t.data.errmsg&&"string"!=typeof l){var c=t.data.errmsg.split("||");l=c[o]?c[o]:c[c.length-1]}return u.tips(t.el,{msg:l,type:1,all:t.all}),e.addClassName(t.el,"W_input_error"),e.log(t.el+"检测"+s+"未通过"),u.errNodes.push(t.el),u.errTip=t.el,!0}}if(r.showTip&&t.data.tipmsg&&!t.data.sucmsg)return void u.tips(t.el,{msg:t.data.tipmsg,type:3,all:t.all});e.removeClassName(t.el,"W_input_error"),u.tips(t.el,{msg:t.data.sucmsg,all:t.all,type:t.data.sucmsg?2:!1}),u.domFun.clearErrArr(t.el),!t.all&&u.floatTip&&(u.topTag=u.domFun.getTopTag(),u.topTag&&u.domFun.fire(u.topTag))}},checkAll:function(t){u.topTag=null,u.errNodes=[],u.domFun.clearTip();var r=e.core.dom.sizzle("[verify]",n);e.core.arr.foreach(r,function(t,n){var r={el:t,all:!0};r.el=t,r.data=e.core.json.queryToJson(t.getAttribute("verify")||""),u.domFun.check(r)}),(t||u.floatTip)&&u.errNodes.length>0&&(u.topTag=u.domFun.getTopTag(),t&&e.core.util.scrollTo(u.topTag,{top:35,step:10}),u.floatTip&&u.domFun.fire(u.topTag))},getTopTag:function(){if(!(u.errNodes.length<1)){var t,n;return u.domFun.clearErrArr(),e.foreach(u.errNodes,function(r,i){if(!t)return t=r,void(n=e.core.dom.position(r));var o=e.core.dom.position(r);(o.t<n.t||n.t==n.t&&n.l<n.l)&&(t=r,n=o)}),t}},clearErrArr:function(t){var n=[];e.foreach(u.errNodes,function(r){t!=r&&e.core.arr.indexOf(r,n)<0&&n.push(r)}),u.errNodes=n},postData:function(t){if(u.domFun.checkAll(t),u.errNodes.length>0)return!1;var r=u.domFun.joinArr(e.core.util.htmlToJson(n));return u.domFun.setDef(),r},joinArr:function(t){for(var n in t)"object"==typeof t[n]&&(t[n]=e.core.arr.isArray(t[n])?t[n].join():e.core.json.jsonToStr(t[n]));return t},autoCut:function(t){var n=e.queryToJson(t.getAttribute("autocut"));n.rule&&(t.value=i[n.rule](t.value));var r=t.value,u=parseInt(n.max);u&&e.core.str.bLength(r)>u&&(t.value=e.core.str.leftB(r,u)),e.custEvent.fire(o,"cut",t)},setDef:function(){u.h5Type();var r=e.sizzle("[defval]",n);u.placeholder&&e.foreach(r,function(e){e.setAttribute("placeholder",e.getAttribute("defval"))}),!u.placeholder&&e.foreach(e.sizzle("[defval]",n),function(e){e.value||(e.value=e.getAttribute("defval"),e.style.color=t)})},isLocked:function(e){return e===n?!1:r.forceCheck||"none"!=e.style.display&&!e.disabled?arguments.callee(e.parentNode):!0}},h5Type:function(){if(!(e.IE||"FORM"!=n.nodeName&&e.core.util.browser.MOZ)){n.setAttribute("novalidate","novalidate");var t=["email","url","tel","phone","number"];e.core.util.browser.CHROME||t.push("float");var r={phone:"tel",number:"tel","float":"number"};e.foreach(e.sizzle("input[type=text][verify*=acttype=]",n),function(n){for(var i=(e.queryToJson(n.getAttribute("verify")).acttype||"").split("|"),o=0,u=i.length;u>o;++o)if(e.core.arr.inArray(i[o],t)){var a=r[i[o]]||i[o];!e.IE&&n.setAttribute("type",a)}})}},placeholder:"placeholder"in e.C("input")},a=function(){if(!n||!e.core.dom.isNode(n))throw new Error("box没有定义");r=r||{}},s=function(){if(u.DOM=e.utils.kit.dom.parseDOM(e.builder(n).list),u.DOM.tips=u.tipFun.allTips(n),i=e.core.json.merge(e.common.form.regular,r.rules||{}),r.getTip){if("function"!=typeof r.getTip){var t=r.getTip.split(" "),o=t[0];t.splice(0,1);var a=t.join(" ");r.getTip=function(t){var n=e.utils.kit.dom.parents(t,{expr:o})[0];return e.sizzle(a,n)[0]}}}else u.floatTip=e.C("div"),u.floatTip.className="W_layer W_layer_pop",document.body.appendChild(u.floatTip),u.objs.delegateErr=e.core.evt.delegatedEvent(u.floatTip),u.objs.delegateErr.add("floatTip","click",function(e){u.floatTip.style.display="none"}),r.getTip=function(e){return u.floatTip};r.tipTemp&&"function"!=typeof r.tipTemp&&e.log("getTip || tipTemp 类型错误"),r.tipTemp&&(u.tipTemp=r.tipTemp)},l=function(){u.domFun.setDef()},c=function(){u.addEvent(n,e.IE?"focusin":"focus",u.domFun.focus,!0),u.addEvent(n,e.IE?"focusout":"blur",u.domFun.blur,!0),u.addEvent(n,"click",u.domFun.click)},d=function(){e.custEvent.define(o,["focus","blur","tips","cut"])},p=function(){},f=function(){u&&(e.core.evt.removeEvent(n,e.IE?"focusin":"focus",u.domFun.focus,!0),e.core.evt.removeEvent(n,e.IE?"focusout":"blur",u.domFun.blur,!0),e.foreach(u.objs,function(e){e.destroy&&e.destroy()}),u=null)},v=function(){a(),s(),l(),c(),d(),p(),u.domFun.clearTip()};return v(),o.destroy=f,o.fire=u.domFun.fire,o.json=u.domFun.postData,o.clearTip=u.domFun.clearTip,o.tips=u.tips,o.setDef=u.domFun.setDef,o.tipMsg=u.tipTemp,o.supportH5=u.h5Type,o}})}),steel.d("common/bluevSelectData/enterprise",[],function(e,t,n){STK.register("common.bluevSelectData.enterprise",function(e){var t={code0:"0",prov34:"合肥,芜湖,蚌埠,淮南,马鞍山,淮北,铜陵,安庆,黄山,滁州,阜阳,宿州,巢湖,六安,亳州,池州,宣城",code34:"1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18",prov11:"东城区,西城区,崇文区,宣武区,朝阳区,丰台区,石景山区,海淀区,门头沟区,房山区,通州区,顺义区,昌平区,大兴区,怀柔区,平谷区,密云县,延庆县",code11:"1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,28,29",prov50:"万州区,涪陵区,渝中区,大渡口区,江北区,沙坪坝区,九龙坡区,南岸区,北碚区,万盛区,双桥区,渝北区,巴南区,黔江区,长寿区,綦江县,潼南县,铜梁县,大足县,荣昌县,璧山县,梁平县,城口县,丰都县,垫江县,武隆县,忠县,开县,云阳县,奉节县,巫山县,巫溪县,石柱土家族自治县,秀山土家族苗族自治县,酉阳土家族苗族自治县,彭水苗族土家族自治县,江津市,合川市,永川区,南川市",code50:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,81,82,83,84",prov35:"福州,厦门,莆田,三明,泉州,漳州,南平,龙岩,宁德",code35:"1,2,3,4,5,6,7,8,9",prov62:"兰州,嘉峪关,金昌,白银,天水,武威,张掖,平凉,酒泉,庆阳,定西,陇南,临夏,甘南",code62:"1,2,3,4,5,6,7,8,9,10,24,26,29,30",prov44:"广州,韶关,深圳,珠海,汕头,佛山,江门,湛江,茂名,肇庆,惠州,梅州,汕尾,河源,阳江,清远,东莞,中山,潮州,揭阳,云浮",code44:"1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,51,52,53",prov45:"南宁,柳州,桂林,梧州,北海,防城港,钦州,贵港,玉林,百色,贺州,河池,来宾,崇左",code45:"1,22,3,4,5,6,7,8,9,10,11,12,13,14",prov52:"贵阳,六盘水,遵义,安顺,铜仁,黔西南,毕节,黔东南,黔南",code52:"1,2,3,4,22,23,24,26,27",prov46:"海口,三亚,其他",code46:"1,2,1000",prov13:"石家庄,唐山,秦皇岛,邯郸,邢台,保定,张家口,承德,沧州,廊坊,衡水",code13:"1,2,3,4,5,6,7,8,9,10,11",prov23:"哈尔滨,齐齐哈尔,鸡西,鹤岗,双鸭山,大庆,伊春,佳木斯,七台河,牡丹江,黑河,绥化,大兴安岭",code23:"1,2,3,4,5,6,7,8,9,10,11,12,27",prov41:"郑州,开封,洛阳,平顶山,安阳,鹤壁,新乡,焦作,濮阳,许昌,漯河,三门峡,南阳,商丘,信阳,周口,驻马店,济源",code41:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",prov42:"武汉,黄石,十堰,宜昌,襄樊,鄂州,荆门,孝感,荆州,黄冈,咸宁,随州,恩施土家族苗族自治州,仙桃,潜江,天门,神农架",code42:"1,2,3,5,6,7,8,9,10,11,12,13,28,29,30,31,32",prov43:"长沙,株洲,湘潭,衡阳,邵阳,岳阳,常德,张家界,益阳,郴州,永州,怀化,娄底,湘西土家族苗族自治州",code43:"1,2,3,4,5,6,7,8,9,10,11,12,13,31",prov15:"呼和浩特,包头,乌海,赤峰,通辽,鄂尔多斯,呼伦贝尔,兴安盟,锡林郭勒盟,乌兰察布盟,巴彦淖尔盟,阿拉善盟",code15:"1,2,3,4,5,6,7,22,25,26,28,29",prov32:"南京,无锡,徐州,常州,苏州,南通,连云港,淮安,盐城,扬州,镇江,泰州,宿迁",code32:"1,2,3,4,5,6,7,8,9,10,11,12,13",prov36:"南昌,景德镇,萍乡,九江,新余,鹰潭,赣州,吉安,宜春,抚州,上饶",code36:"1,2,3,4,5,6,7,8,9,10,11",prov22:"长春,吉林,四平,辽源,通化,白山,松原,白城,延边朝鲜族自治州",code22:"1,2,3,4,5,6,7,8,24",prov21:"沈阳,大连,鞍山,抚顺,本溪,丹东,锦州,营口,阜新,辽阳,盘锦,铁岭,朝阳,葫芦岛",code21:"1,2,3,4,5,6,7,8,9,10,11,12,13,14",prov64:"银川,石嘴山,吴忠,固原",code64:"1,2,3,4",prov63:"西宁,海东,海北,黄南,海南,果洛,玉树,海西",code63:"1,21,22,23,25,26,27,28",prov14:"太原,大同,阳泉,长治,晋城,朔州,晋中,运城,忻州,临汾,吕梁",code14:"1,2,3,4,5,6,7,8,9,10,23",prov37:"济南,青岛,淄博,枣庄,东营,烟台,潍坊,济宁,泰安,威海,日照,莱芜,临沂,德州,聊城,滨州,菏泽",code37:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",prov31:"黄浦区,卢湾区,徐汇区,长宁区,静安区,普陀区,闸北区,虹口区,杨浦区,闵行区,宝山区,嘉定区,浦东新区,金山区,松江区,青浦区,南汇区,奉贤区,崇明县",code31:"1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,30",prov51:"成都,自贡,攀枝花,泸州,德阳,绵阳,广元,遂宁,内江,乐山,南充,眉山,宜宾,广安,达州,雅安,巴中,资阳,阿坝,甘孜,凉山",code51:"1,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,32,33,34",prov12:"和平区,河东区,河西区,南开区,河北区,红桥区,塘沽区,汉沽区,大港区,东丽区,西青区,津南区,北辰区,武清区,宝坻区,宁河县,静海县,蓟县,滨海新区,保税区",code12:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,21,23,25,26,27",prov54:"拉萨,昌都,山南,日喀则,那曲,阿里,林芝",code54:"1,21,22,23,24,25,26",prov65:"乌鲁木齐,克拉玛依,吐鲁番,哈密,昌吉,博尔塔拉,巴音郭楞,阿克苏,克孜勒苏,喀什,和田,伊犁,塔城,阿勒泰,石河子",code65:"1,2,21,22,23,27,28,29,30,31,32,40,42,43,44",prov53:"昆明,曲靖,玉溪,保山,昭通,楚雄,红河,文山,思茅,西双版纳,大理,德宏,丽江,怒江,迪庆,临沧",code53:"1,3,4,5,6,23,25,26,27,28,29,31,32,33,34,35",prov33:"杭州,宁波,温州,嘉兴,湖州,绍兴,金华,衢州,舟山,台州,丽水",code33:"1,2,3,4,5,6,7,8,9,10,11",prov61:"西安,铜川,宝鸡,咸阳,渭南,延安,汉中,榆林,安康,商洛",code61:"1,2,3,4,5,6,7,8,9,10",prov1000:"",code1000:""};return function(){return t}})}),steel.d("components/bluev/showinfo/logic",["utils/kit/dom/parseDOM","common/form/verify","common/bluevSelectData/enterprise"],function(e,t,n){e("utils/kit/dom/parseDOM"),e("common/form/verify"),e("common/bluevSelectData/enterprise");var r=STK,i=r.common.bluevSelectData.enterprise(),o='<option value="">--请选择--</option>',u={1461:"请基于机构、场馆名称填写",2559:"请基于基于粉丝团名称填写",3490:"请基体育俱乐部名称填写",3495:"请基于基于明星工作室名称填写"},a={1461:"说明为机构、场馆名，不要使用修饰性质的形容词。不超过30个字。",2559:"说明为粉丝团名，不要使用修饰性质的形容词。不超过30个字。",3490:"说明为球迷俱乐部名，不要使用修饰性质的形容词。不超过30个字。",3495:"说明为明星工作室名，不要使用修饰性质的形容词。不超过30个字。"};n.exports=function(e){var t=document.createDocumentFragment(),n={},s=r.delegatedEvent(e),l={DOM:{},objs:{},DOM_eventFun:{textInputFun:function(e){var t=e.target.getAttribute("node-type");l.DOM[t][1].innerHTML=e.target.value},typeSelectFun:function(e){var t=e.el.value;t?(l.switchText(t),l.appendTypeList(e,t)):(l.DOM[e.data.target].innerHTML=o,"agencySecond"==e.data.target&&(l.DOM.nameGuide.innerHTML=u[1461],l.DOM.infoGuide.innerHTML=a[1461]))},addressSecondFun:function(e){e.target.value?1e3==e.target.value?l.DOM.addressThird.style.display="none":l.appendAddressList(e):l.DOM.addressThird.innerHTML=o},nextFun:function(){var e=l.objs.verify.json();e&&l.DOM.formInfo.submit()}},bindFormFun:{getTip:"dd [errtip]",rules:{format:function(e){var t=e.value,n=/[^\w\d_\s\u4e00-\u9fa5]/g;return n.test(t)?"只支持中英文，数字或者“_”":void 0}},tipTemp:function(e,t){var n;return 1==t?n='<div class="WB_outReset W_layer W_layer_pop tipbox" style="top:-35px;">                            <div class="content layer_mini_info">                                <p class="main_txt">                                    <i class="W_icon icon_rederrorS"></i>                                    <span class="txt S_txt1" node-type="errorTipText">'+e+'</span>                                </p>                                <div class="W_layer_arrow">                                        <span class="W_arrow_bor W_arrow_bor_b">                                            <i class="S_line3"></i><em class="S_bg2_br"></em>                                        </span>                                </div>                            </div>                        </div>':2==t&&(n='<span class="M_notice_succ">                            <span class="W_icon icon_succ"></span>                            <span class="txt">'+("true"==e?"":e)+"</span>                        </span>"),
n}},switchText:function(e){switch(e){case"1461":l.DOM.nameGuide.innerHTML=u[1461],l.DOM.infoGuide.innerHTML=a[1461];break;case"2559":l.DOM.nameGuide.innerHTML=u[2559],l.DOM.infoGuide.innerHTML=a[2559];break;case"3490":l.DOM.nameGuide.innerHTML=u[3490],l.DOM.infoGuide.innerHTML=a[3490];break;case"3495":l.DOM.nameGuide.innerHTML=u[3495],l.DOM.infoGuide.innerHTML=a[3495]}},appendTypeList:function(e,n){for(var i in $CONFIG.$second_type[n]){var o=r.C("option");o.innerHTML=$CONFIG.$second_type[n][i],o.value=i,t.appendChild(o)}l.DOM[e.data.target].innerHTML="",l.DOM[e.data.target].appendChild(t)},appendAddressList:function(e){for(var n={},o=i["prov"+e.target.value].split(","),u=i["code"+e.target.value].split(","),a=0,s=o.length;s>a;a++)n[u[a]]=o[a];for(var c in n){var d=r.C("option");d.innerHTML=n[c],d.value=c,t.appendChild(d)}l.DOM.addressThird.style.display="",l.DOM.addressThird.innerHTML="",l.DOM.addressThird.appendChild(t)}},c=function(){if(null==e||null!=e&&!r.isNode(e))throw"[]:argsCheck()-The param node is not a DOM node."},d=function(){l.DOM=r.utils.kit.dom.parseDOM(r.builder(e).list)},p=function(){l.objs.verify=r.common.form.verify(e,l.bindFormFun)},f=function(){r.addEvent(l.DOM.nickname[0],"keyup",l.DOM_eventFun.textInputFun),r.addEvent(l.DOM.verifyInfo[0],"keyup",l.DOM_eventFun.textInputFun),r.addEvent(l.DOM.addressSecond,"change",l.DOM_eventFun.addressSecondFun),r.addEvent(l.DOM.next,"click",l.DOM_eventFun.nextFun)},v=function(){},m=function(){s.add("typeSelect","change",l.DOM_eventFun.typeSelectFun)},g=function(){},h=function(){r.remove(l.DOM.nickname[0],"keyup",l.DOM_eventFun.textInputFun),r.remove(l.DOM.verifyInfo[0],"keyup",l.DOM_eventFun.textInputFun),r.remove(l.DOM.addressSecond,"change",l.DOM_eventFun.addressSecondFun),r.remove(l.DOM.next,"click",l.DOM_eventFun.nextFun),s.destroy(),l&&(r.forEach(l.objs,function(e){e&&e.destroy&&e.destroy()}),l=null)},y=function(){c(),d(),p(),f(),v(),m(),g()};return y(),n.destroy=h,n}});