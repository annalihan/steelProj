steel.d("utils/module/suggest",[],function(e,n,o){STK.register("utils.module.suggest",function(e){var n=null,o=e.custEvent,t=o.define,r=o.fire,i=o.add,d=e.addEvent,u=e.removeEvent,a=e.stopEvent,c=[],l={},f={ENTER:13,ESC:27,UP:38,DOWN:40,TAB:9},s=function(n){var o=-1,c=n.textNode,l=n.uiNode,s=e.core.evt.delegatedEvent(l),g=t(c,["open","close","indexChange","onSelect","onIndexChange","onClose","onOpen"]),v=function(){return e.sizzle(["[action-type=",n.actionType,"]"].join(""),l)},x=function(){o=-1,u(c,"keydown",C),s.destroy()},C=function(e){var n,t;if((n=e)&&(t=n.keyCode)){if(t==f.ENTER)return a(),r(g,"onSelect",[o,c]),!1;if(t==f.UP){a();var i=v().length;return o=1>o?i-1:o-1,r(g,"onIndexChange",[o]),!1}if(t==f.DOWN){a();var i=v().length;return o=o==i-1?0:o+1,r(g,"onIndexChange",[o]),!1}return t==f.ESC?(a(),x(),r(g,"onClose"),!1):t==f.TAB?(x(),r(g,"onClose"),!1):void 0}},p=function(n){r(g,"onSelect",[e.core.arr.indexOf(n.el,v()),c])},E=function(n){o=e.core.arr.indexOf(n.el,v()),r(g,"onIndexChange",[e.core.arr.indexOf(n.el,v())])};return i(g,"open",function(e,o){c=o,x(),d(o,"keydown",C),s.add(n.actionType,"mouseover",E),s.add(n.actionType,"click",p),r(g,"onOpen")}),i(g,"close",function(){x(),r(g,"onClose")}),i(g,"indexChange",function(e,n){o=n,r(g,"onIndexChange",[o])}),g},g=function(n){var o=n.textNode,t=e.core.arr.indexOf(o,c);return l[t]||(c[t=c.length]=o,l[t]=s(n)),l[t]};return function(o){return o.textNode&&o.uiNode?(o=e.parseParam({textNode:n,uiNode:n,actionType:"item",actionData:"index"},o),g(o)):void 0}})});