steel.d("utils/module/unitLayer",[],function(t,e,n){STK.register("utils.module.unitLayer",function(t){var e=function(t){var e={};return"none"==t.style.display?(t.style.visibility="hidden",t.style.display="",e.w=t.offsetWidth,e.h=t.offsetHeight,t.style.display="none",t.style.visibility="visible"):(e.w=t.offsetWidth,e.h=t.offsetHeight),e},n=function(n,i){i=i||"topleft";var r=null;if("none"==n.style.display?(n.style.visibility="hidden",n.style.display="",r=t.core.dom.position(n),n.style.display="none",n.style.visibility="visible"):r=t.core.dom.position(n),"topleft"!==i){var o=e(n);"topright"===i?r.l=r.l+o.w:"bottomleft"===i?r.t=r.t+o.h:"bottomright"===i&&(r.l=r.l+o.w,r.t=r.t+o.h)}return r};return function(i){var r=t.core.dom.builder(i),o=r.list.unitOuter[0],u=r.list.unitInner[0],s=t.core.dom.uniqueID(o),l={},d=t.core.evt.custEvent.define(l,"show");t.core.evt.custEvent.define(d,"hide");var c=null;return l.show=function(){return o.style.display="",t.core.evt.custEvent.fire(d,"show"),l},l.hide=function(){return o.style.display="none",t.custEvent.fire(d,"hide"),l},l.getPosition=function(t){return n(o,t)},l.getSize=function(t){return(t||!c)&&(c=e.apply(l,[o])),c},l.html=function(t){return void 0!==t&&(u.innerHTML=t),u.innerHTML},l.text=function(e){return void 0!==text&&(u.innerHTML=t.core.str.encodeHTML(e)),t.core.str.decodeHTML(u.innerHTML)},l.appendChild=function(t){return u.appendChild(t),l},l.getUniqueID=function(){return s},l.getOuter=function(){return o},l.getInner=function(){return u},l.getParentNode=function(){return o.parentNode},l.getDomList=function(){return r.list},l.getDomListByKey=function(t){return r.list[t]},l.getDom=function(t,e){return r.list[t]?r.list[t][e||0]:!1},l.getCascadeDom=function(e,n){return r.list[e]?t.core.dom.cascadeNode(r.list[e][n||0]):!1},l}})});