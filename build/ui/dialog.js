steel.d("utils/kit/extra/language",[],function(e,t,n){STK.register("utils.kit.extra.language",function(e){return window.$LANG||(window.$LANG={}),function(t,n){var i=e.core.util.language(t,$LANG);return i=i.replace(/\\}/gi,"}"),n&&(i=e.templet(i,n)),i}})}),steel.d("utils/kit/extra/reuse",[],function(e,t,n){STK.register("utils.kit.extra.reuse",function(e){return function(t,n){var i,o,r;i=e.parseParam({},n),r=[];var u=function(){var e=t();return r.push({store:e,used:!0}),e},s=function(t){e.foreach(r,function(e,n){return t===e.store?(e.used=!0,!1):void 0})},d=function(t){e.foreach(r,function(e,n){return t===e.store?(e.used=!1,!1):void 0})},l=function(){for(var e=0,t=r.length;t>e;e+=1)if(r[e].used===!1)return r[e].used=!0,r[e].store;return u()};return o={},o.setUsed=s,o.setUnused=d,o.getOne=l,o.getLength=function(){return r.length},o}})}),steel.d("utils/module/layer",[],function(e,t,n){STK.register("utils.module.layer",function(e){var t=function(e){var t={};return"none"==e.style.display?(e.style.visibility="hidden",e.style.display="",t.w=e.offsetWidth,t.h=e.offsetHeight,e.style.display="none",e.style.visibility="visible"):(t.w=e.offsetWidth,t.h=e.offsetHeight),t},n=function(n,i){i=i||"topleft";var o=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",o=e.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):o=e.core.dom.position(n),"topleft"!==i){var r=t(n);"topright"===i?o.l=o.l+r.w:"bottomleft"===i?o.t=o.t+r.h:"bottomright"===i&&(o.l=o.l+r.w,o.t=o.t+r.h)}return o};return function(i){var o=e.core.dom.builder(i),r=o.list.outer[0],u=o.list.inner[0],s=e.core.dom.uniqueID(r),d={},l=e.core.evt.custEvent.define(d,"show");e.core.evt.custEvent.define(l,"hide");var c=null;return d.show=function(){return r.style.display="",e.core.evt.custEvent.fire(l,"show"),d},d.hide=function(){return r.style.display="none",e.custEvent.fire(l,"hide"),d},d.getPosition=function(e){return n(r,e)},d.getSize=function(e){return(e||!c)&&(c=t.apply(d,[r])),c},d.html=function(e){return void 0!==e&&(u.innerHTML=e),u.innerHTML},d.text=function(t){return void 0!==text&&(u.innerHTML=e.core.str.encodeHTML(t)),e.core.str.decodeHTML(u.innerHTML)},d.appendChild=function(e){return u.appendChild(e),d},d.getUniqueID=function(){return s},d.getOuter=function(){return r},d.getInner=function(){return u},d.getParentNode=function(){return r.parentNode},d.getDomList=function(){return o.list},d.getDomListByKey=function(e){return o.list[e]},d.getDom=function(e,t){return o.list[e]?o.list[e][t||0]:!1},d.getCascadeDom=function(t,n){return o.list[t]?e.core.dom.cascadeNode(o.list[t][n||0]):!1},d}})}),steel.d("utils/module/dialog",["utils/module/layer"],function(e,t,n){e("utils/module/layer"),STK.register("utils.module.dialog",function(e){return function(t,n){if(!t)throw"module.dialog need template as first parameter";var i,o,r,u,s,d,l,c,a,f,p,h;a=!0;var g=function(){a!==!1&&o.hide()},m=function(){i=e.parseParam({t:null,l:null,width:null,height:null},n),o=e.utils.module.layer(t,i),u=o.getOuter(),s=o.getDom("title"),c=o.getDom("title_content"),d=o.getDom("inner"),l=o.getDom("close"),e.addEvent(l,"click",function(){p()}),e.custEvent.add(o,"show",function(){e.hotKey.add(document.documentElement,["esc"],g,{type:"keyup",disableInInput:!0})}),e.custEvent.add(o,"hide",function(){e.hotKey.remove(document.documentElement,["esc"],g,{type:"keyup"}),a=!0})};return m(),h=e.objSup(o,["show","hide"]),p=function(t){return"function"!=typeof f||t||f()!==!1?(h.hide(),e.contains(document.body,o.getOuter())&&document.body.removeChild(o.getOuter()),r):!1},r=o,r.show=function(){return e.contains(document.body,o.getOuter())||document.body.appendChild(o.getOuter()),h.show(),r},r.hide=p,r.setPosition=function(e){return u.style.top=e.t+"px",u.style.left=e.l+"px",r},r.setMiddle=function(){var t,n=e.core.util.winSize(),i=o.getSize(!0);if(window.FrameInner&&window.FrameInner.outInfo){var s=FrameInner.outInfo;"string"==typeof s&&(s=e.strToJson(s));var d=s.parent.scroll.top,l=s.iframe.position.top,c=s.parent.size.height;t=d-l+(c-i.h)/2;var a=n.height-i.h;t>a&&(t=a)}else t=e.core.util.scrollPos().top+(n.height-i.h)/2;return u.style.top=(parseInt(t)>30?t:30)+"px",u.style.left=(n.width-i.w)/2+"px",window.FrameInner&&FrameInner.diaAutoHeight&&FrameInner.diaAutoHeight(u),r},r.setTitle=function(e){return c.innerHTML=e,r},r.setContent=function(e){return"string"==typeof e?d.innerHTML=e:d.appendChild(e),r},r.clearContent=function(){for(;d.children.length;)e.removeNode(d.children[0]);return r},r.setAlign=function(){},r.setBeforeHideFn=function(e){f=e},r.clearBeforeHideFn=function(){f=null},r.unsupportEsc=function(){a=!1},r.supportEsc=function(){a=!0},r}})}),steel.d("utils/kit/dom/cssText",[],function(e,t,n){STK.register("utils.kit.dom.cssText",function(e){var t=function(e,t){for(var n,i=(e+";"+t).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g,"$2$4");i&&(n=i.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i));)i=i.replace(n[1]+n[2]+n[3],"");return i};return function(e){e=e||"";var n=[],i={push:function(e,t){return n.push(e+":"+t),i},remove:function(e){for(var t=0;t<n.length;t++)0==n[t].indexOf(e+":")&&n.splice(t,1);return i},getStyleList:function(){return n.slice()},getCss:function(){return t(e,n.join(";"))}};return i}})}),steel.d("utils/kit/dom/fix",["utils/kit/dom/cssText"],function(e,t,n){e("utils/kit/dom/cssText"),STK.register("utils.kit.dom.fix",function(e){function t(t){return"none"!=e.core.dom.getStyle(t,"display")}function n(t){t=e.core.arr.isArray(t)?t:[0,0];for(var n=0;2>n;n++)"number"!=typeof t[n]&&(t[n]=0);return t}function i(n,i,r){if(t(n)){var u,s,d,l,c="fixed",a=n.offsetWidth,f=n.offsetHeight,p=e.core.util.winSize(),h=0,g=0,m=e.utils.kit.dom.cssText(n.style.cssText);if(o)switch(u=l=r[1],s=d=r[0],i){case"lt":l=d="";break;case"lb":u=d="";break;case"rt":s=l="";break;case"rb":u=s="";break;case"c":default:u=(p.height-f)/2+r[1],s=(p.width-a)/2+r[0],l=d=""}else{c="absolute";var v=e.core.util.scrollPos();switch(h=u=v.top,g=s=v.left,i){case"lt":u+=r[1],s+=r[0];break;case"lb":u+=p.height-f-r[1],s+=r[0];break;case"rt":u+=r[1],s+=p.width-a-r[0];break;case"rb":u+=p.height-f-r[1],s+=p.width-a-r[0];break;case"c":default:u+=(p.height-f)/2+r[1],s+=(p.width-a)/2+r[0]}d=l=""}"c"==i&&(h>u&&(u=h),g>s&&(s=g)),m.push("position",c).push("top",u+"px").push("left",s+"px").push("right",d+"px").push("bottom",l+"px"),n.style.cssText=m.getCss()}}var o=!(e.core.util.browser.IE6||"CSS1Compat"!==document.compatMode&&STK.IE),r=/^(c)|(lt)|(lb)|(rt)|(rb)$/;return function(t,u,s){function d(n){n=n||window.event,e.core.evt.custEvent.fire(a,"beforeFix",n.type),!f||o&&"c"!=l||i(t,l,c)}var l,c,a,f=!0;if(e.core.dom.isNode(t)&&r.test(u)){var p={getNode:function(){return t},isFixed:function(){return f},setFixed:function(e){return(f=!!e)&&i(t,l,c),this},setAlign:function(e,o){return r.test(e)&&(l=e,c=n(o),f&&i(t,l,c)),this},destroy:function(){o||o&&e.core.evt.removeEvent(window,"scroll",d),e.core.evt.removeEvent(window,"resize",d),e.core.evt.custEvent.undefine(a)}};return a=e.core.evt.custEvent.define(p,"beforeFix"),p.setAlign(u,s),o||e.core.evt.addEvent(window,"scroll",d),e.core.evt.addEvent(window,"resize",d),p}}})}),steel.d("utils/module/mask",["utils/kit/dom/fix"],function(e,t,n){e("utils/kit/dom/fix"),STK.register("utils.module.mask",function(e){function t(){i=e.C("div");var t='<div node-type="outer">';e.core.util.browser.IE6&&(t+='<div style="position:absolute;width:100%;height:100%;"></div>'),t+="</div>",i=e.builder(t).list.outer[0],document.body.appendChild(i),u=!0,o=e.utils.kit.dom.fix(i,"lt");var n=function(){var t=e.core.util.winSize();i.style.cssText=e.utils.kit.dom.cssText(i.style.cssText).push("width",t.width+"px").push("height",t.height+"px").getCss()};c.add(o,"beforeFix",n),n()}function n(t){var n;return(n=t.getAttribute(s))||t.setAttribute(s,n=e.getUniqueKey()),">"+t.tagName.toLowerCase()+"["+s+'="'+n+'"]'}var i,o,r=[],u=!1,s="STK-Mask-Key",d=e.core.dom.setStyle,l=e.core.dom.getStyle,c=e.core.evt.custEvent,a={getNode:function(){return i},show:function(n,r){return u?(n=e.core.obj.parseParam({opacity:0,background:"#000000"},n),i.style.background=n.background,d(i,"opacity",n.opacity),i.style.opacity=n.opacity,i.style.display="",o.setAlign("lt"),r&&r()):e.Ready(function(){t(),a.show(n,r)}),a},hide:function(){return i.style.display="none",nowIndex=void 0,r=[],a},showUnderNode:function(t,o){return e.isNode(t)&&a.show(o,function(){d(i,"zIndex",l(t,"zIndex"));var o=n(t),u=e.core.arr.indexOf(r,o);-1!=u&&r.splice(u,1),r.push(o),e.core.dom.insertElement(t,i,"beforebegin")}),a},back:function(){if(r.length<1)return a;var t,n;return r.pop(),r.length<1?a.hide():(n=r[r.length-1])&&(t=e.sizzle(n,document.body)[0])?(d(i,"zIndex",l(t,"zIndex")),e.core.dom.insertElement(t,i,"beforebegin")):a.back(),a},destroy:function(){c.remove(o),i.style.display="none",lastNode=void 0,_cache={}}};return a})}),steel.d("utils/kit/dom/drag",[],function(e,t,n){STK.register("utils.kit.dom.drag",function(e){return function(t,n){var i,o,r,u,s,d,l,c,a=function(){f(),p()},f=function(){i=e.parseParam({moveDom:t,perchStyle:"border:solid #999999 2px;",dragtype:"perch",actObj:{},pagePadding:5},n),r=i.moveDom,o={},u={},s=e.drag(t,{actObj:i.actObj}),"perch"===i.dragtype&&(d=e.C("div"),l=!1,c=!1,r=d),t.style.cursor="move"},p=function(){e.custEvent.add(i.actObj,"dragStart",h),e.custEvent.add(i.actObj,"dragEnd",g),e.custEvent.add(i.actObj,"draging",m)},h=function(n,o){document.body.style.cursor="move";var r=e.core.util.pageSize().page;if(u=e.core.dom.position(i.moveDom),u.pageX=o.pageX,u.pageY=o.pageY,u.height=i.moveDom.offsetHeight,u.width=i.moveDom.offsetWidth,u.pageHeight=r.height,u.pageWidth=r.width,"perch"===i.dragtype){var s=[];s.push(i.perchStyle),s.push("position:absolute"),s.push("z-index:"+(i.moveDom.style.zIndex+10)),s.push("width:"+i.moveDom.offsetWidth+"px"),s.push("height:"+i.moveDom.offsetHeight+"px"),s.push("left:"+u.l+"px"),s.push("top:"+u.t+"px"),d.style.cssText=s.join(";"),c=!0,setTimeout(function(){c&&(document.body.appendChild(d),l=!0)},100)}void 0!==t.setCapture&&t.setCapture()},g=function(e,n){document.body.style.cursor="auto",void 0!==t.setCapture&&t.releaseCapture(),"perch"===i.dragtype&&(c=!1,i.moveDom.style.top=d.style.top,i.moveDom.style.left=d.style.left,l&&(document.body.removeChild(d),l=!1))},m=function(e,t){var n=u.t+(t.pageY-u.pageY),o=u.l+(t.pageX-u.pageX),s=n+u.height,d=o+u.width,l=u.pageHeight-i.pagePadding,c=u.pageWidth-i.pagePadding;l>s&&n>0?r.style.top=n+"px":(0>n&&(r.style.top="0px"),s>=l&&(r.style.top=l-u.height+"px")),c>d&&o>0?r.style.left=o+"px":(0>o&&(r.style.left="0px"),d>=c&&(r.style.left=c-u.width+"px"))};return a(),o.destroy=function(){document.body.style.cursor="auto","function"==typeof r.setCapture&&r.releaseCapture(),"perch"===i.dragtype&&(c=!1,l&&(document.body.removeChild(d),l=!1)),e.custEvent.remove(i.actObj,"dragStart",h),e.custEvent.remove(i.actObj,"dragEnd",g),e.custEvent.remove(i.actObj,"draging",m),s.destroy&&s.destroy(),i=null,r=null,u=null,s=null,d=null,l=null,c=null},o.getActObj=function(){return i.actObj},o}})}),steel.d("ui/dialog",["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/dialog","utils/module/mask","utils/kit/dom/drag"],function(e,t,n){e("utils/kit/extra/language"),e("utils/kit/extra/reuse"),e("utils/module/dialog"),e("utils/module/mask"),e("utils/kit/dom/drag"),STK.register("ui.dialog",function(e){var t='<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10019"><div class="content"><div class="W_layer_title" node-type="title_content"></div><div class="W_layer_close"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon" title="#L{关闭}" node-type="close">X</a></div><div node-type="inner"></div></div></div>',n=e.utils.kit.extra.language,i=null,o=function(){var i=e.utils.module.dialog(n(t));return e.custEvent.add(i,"show",function(){e.utils.module.mask.showUnderNode(i.getOuter(),{opacity:.5,background:"#000000"})}),e.custEvent.add(i,"hide",function(){e.utils.module.mask.back(),i.setMiddle()}),i.destroy=function(){r(i);try{i.hide(!0)}catch(e){}},i},r=function(e){e.setTitle("").clearContent(),i.setUnused(e)};return function(t){var n=e.parseParam({isHold:!1},t),u=n.isHold;n=e.core.obj.cut(n,["isHold"]),i||(i=e.utils.kit.extra.reuse(o));var s=i.getOne();return u||(e.custEvent.add(s,"hide",function(){e.custEvent.remove(s,"hide",arguments.callee),r(s)}),e.custEvent.add(s,"show",function(){i.setUsed(s)})),s}})});