steel.d("utils/module/layer",[],function(t,e,n){STK.register("utils.module.layer",function(t){var e=function(t){var e={};return"none"==t.style.display?(t.style.visibility="hidden",t.style.display="",e.w=t.offsetWidth,e.h=t.offsetHeight,t.style.display="none",t.style.visibility="visible"):(e.w=t.offsetWidth,e.h=t.offsetHeight),e},n=function(n,o){o=o||"topleft";var i=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",i=t.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):i=t.core.dom.position(n),"topleft"!==o){var r=e(n);"topright"===o?i.l=i.l+r.w:"bottomleft"===o?i.t=i.t+r.h:"bottomright"===o&&(i.l=i.l+r.w,i.t=i.t+r.h)}return i};return function(o){var i=t.core.dom.builder(o),r=i.list.outer[0],l=i.list.inner[0],s=t.core.dom.uniqueID(r),u={},d=t.core.evt.custEvent.define(u,"show");t.core.evt.custEvent.define(d,"hide");var f=null;return u.show=function(){return r.style.display="",t.core.evt.custEvent.fire(d,"show"),u},u.hide=function(){return r.style.display="none",t.custEvent.fire(d,"hide"),u},u.getPosition=function(t){return n(r,t)},u.getSize=function(t){return(t||!f)&&(f=e.apply(u,[r])),f},u.html=function(t){return void 0!==t&&(l.innerHTML=t),l.innerHTML},u.text=function(e){return void 0!==text&&(l.innerHTML=t.core.str.encodeHTML(e)),t.core.str.decodeHTML(l.innerHTML)},u.appendChild=function(t){return l.appendChild(t),u},u.getUniqueID=function(){return s},u.getOuter=function(){return r},u.getInner=function(){return l},u.getParentNode=function(){return r.parentNode},u.getDomList=function(){return i.list},u.getDomListByKey=function(t){return i.list[t]},u.getDom=function(t,e){return i.list[t]?i.list[t][e||0]:!1},u.getCascadeDom=function(e,n){return i.list[e]?t.core.dom.cascadeNode(i.list[e][n||0]):!1},u}})}),steel.d("utils/kit/dom/layoutPos",[],function(t,e,n){STK.register("utils.kit.dom.layoutPos",function(t){return function(e,n,o){if(!t.isNode(n))throw"kit.dom.layerOutElement need element as first parameter";if(n===document.body)return!1;if(!n.parentNode)return!1;if("none"===n.style.display)return!1;var i,r,l,s,u,d,f;if(i=t.parseParam({pos:"left-bottom",offsetX:0,offsetY:0},o),r=n,!r)return!1;for(;r!==document.body;){if(r=r.parentNode,"none"===r.style.display)return!1;if(d=t.getStyle(r,"position"),f=r.getAttribute("layout-shell"),"absolute"===d||"fixed"===d)break;if("true"===f&&"relative"===d)break}return r.appendChild(e),l=t.position(n,{parent:r}),s={w:n.offsetWidth,h:n.offsetHeight},u=i.pos.split("-"),"left"===u[0]?e.style.left=l.l+i.offsetX+"px":"right"===u[0]?e.style.left=l.l+s.w+i.offsetX+"px":"center"===u[0]&&(e.style.left=l.l+s.w/2+i.offsetX+"px"),"top"===u[1]?e.style.top=l.t+i.offsetY+"px":"bottom"===u[1]?e.style.top=l.t+s.h+i.offsetY+"px":"middle"===u[1]&&(e.style.top=l.t+s.h/2+i.offsetY+"px"),!0}})}),steel.d("utils/module/bubble",["utils/module/layer","utils/kit/dom/layoutPos"],function(t,e,n){t("utils/module/layer"),t("utils/kit/dom/layoutPos"),STK.register("utils.module.bubble",function(t){return function(e,n){if(!e)throw"module.bubble need template as first parameter";var o,i,r,l,s,u,d;i=t.parseParam({width:null,height:null,parent:document.body},n),r=t.utils.module.layer(e),l=r.getDom("outer"),s=r.getDom("inner"),r.getDomListByKey("close")&&(u=r.getDom("close")),l.style.display="none",d=!1;var f=function(e){if(d)return!0;var n=t.fixEvent(e);t.contains(l,n.target)||r.hide()};return u&&t.addEvent(u,"click",r.hide),t.custEvent.add(r,"show",function(){setTimeout(function(){t.addEvent(document.body,"click",f)},0)}),t.custEvent.add(r,"hide",function(){d=!1,t.removeEvent(document.body,"click",f)}),o=r,o.setPosition=function(t){return l.style.top=t.t+"px",l.style.left=t.l+"px",o},o.setLayout=function(e,n){if(!t.isNode(e))throw"module.bubble.setDown need element as first parameter";return t.utils.kit.dom.layoutPos(l,e,n),o},o.setContent=function(e){return"string"==typeof e?s.innerHTML=e:t.isNode(e)&&s.appendChild(e),o},o.setArrow=function(t){var e;r.getDomListByKey("arrow")&&(e=r.getDom("arrow"),e.className=t.className||"",e.style.cssText=t.style||"")},o.clearContent=function(){for(;s.children.length;)t.removeNode(s.children[0])},o.stopBoxClose=function(){d=!0},o.startBoxClose=function(){d=!1},o.destroy=function(){t.removeEvent(document.body,"click",f),r=null,l=null,s=null,u=null},o}})});