steel.d("utils/kit/dom/upDown",[],function(e,t,n){STK.register("utils.kit.dom.upDown",function(e){var t=function(e,t,n){if(e.nodeName.toLowerCase()==t){var i=new RegExp(n);if(!n||i.test(e.className))return e}return"body"==e.nodeName.toLowerCase()?!1:arguments.callee(e.parentNode,t,n)};return function(n){var i={},o=n.upBtn;e.log("init",o);var l=n.downBtn,a=n.BtnNormal,r=n.BtnDisable,s=n.container,c=n.listTagName,u=n.listSelect,d=(n.hoverClass,n.selectClass),v=n.callback,f=!1,p=!1,m=function(){e.addEvent(s,"click",function(){var n=e.core.evt.getEvent();e.core.evt.fixEvent(n);var i=n.target,o=t(i,c);o&&(b(o),h(o))})},N=function(){e.addEvent(o,"click",function(){var e=g();if(e){var t=e.getAttribute("lock");return 1==t?!1:void(e&&o.className==a&&C(e))}}),e.addEvent(l,"click",function(){var e=g();if(e){var t=e.getAttribute("lock");return 1==t?!1:void(e&&l.className==a&&i.moveDown(e))}})},g=function(){for(var t=e.sizzle(u,s),n=0,i=t.length;i>n;n++)if(e.core.dom.hasClassName(t[n],d))return t[n];return null},h=function(t){var n=t.getAttribute("lock");if(1==n)return o.className=r,l.className=r,!1;for(var i=e.sizzle(u,s),c=0,d=i.length;d>c&&i[c]!=t;c++);o.className=0==c?r:a,l.className=c==d-1?r:a},b=function(t){for(var n=e.sizzle(u,s),i=0,o=n.length;o>i;i++)e.core.dom.removeClassName(n[i],d);e.core.dom.addClassName(t,d)},y=function(e){var n=t(e,c);n.setAttribute("lock",1),n.setAttribute("draggable","false"),i.checkBtn(e)},k=function(e){var n=t(e,c);n.setAttribute("lock",0),n.setAttribute("draggable","true"),i.checkBtn(e)},z=function(){o.className=r,l.className=r},w=function(){var e=g();e&&h(e)},C=function(t){for(var n=e.sizzle(u,s),i=null,o=0,l=n.length;l>o;o++)n[o]==t&&(i=o);var a=n[i-1];x(t,a,function(){h(t)})},B=function(){N(),m()},A=function(t){for(var n=e.sizzle(u,s),i=null,o=0,l=n.length;l>o;o++)n[o]==t&&(i=o);var a=n[i+1];x(a,t,function(){h(t)})},x=function(t,n,i){if(!f&&!p){f=!0,p=!0;var o=t.cloneNode(!0),l=n.cloneNode(!0),a=e.position(s).t-e.core.dom.getSize(e.sizzle(">div",s.parentNode)[0]).height,r=e.position(t).t-a,c=e.position(n).t-a;t.style.visibility="hidden",n.style.visibility="hidden",s.appendChild(o),s.appendChild(l),s.parentNode.style.position="relative",o.style.position="absolute",l.style.position="absolute",o.style.top=r+"px",l.style.top=c+"px",o.style.width=t.clientWidth+"px",l.style.width=n.clientWidth+"px";var u=e.core.ani.tween;t.parentNode.insertBefore(t,n),e.log(r,c),u(o,{end:function(e){o.parentNode.removeChild(o),t.style.visibility="visible",i&&i(),f=!1,v&&v()}}).play({top:c}),u(l,{end:function(e){n.style.visibility="visible",l.parentNode.removeChild(l),i&&i(),p=!1,v&&v()}}).play({top:r})}};return B(),i.setFree=k,i.setBtnDisable=z,i.updateBtn=w,i.moveUp=C,i.moveDown=A,i.setLock=y,i.setSelect=b,i.getSelect=g,i.checkBtn=h,i}})});