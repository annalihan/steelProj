steel.d("utils/kit/dom/textSelection",[],function(e,t,r){STK.register("utils.kit.dom.textSelection",function(e){return function(t,r){var n,a;n={},a=e.parseParam({},r);var u=function(r){return e.core.dom.selectText(t,r)},l=function(){t.__areaQuery=e.jsonToQuery(e.core.dom.textSelectArea(t))},o=function(){t.__areaQuery=!1};e.addEvent(t,"beforedeactivate",l),e.addEvent(t,"active",o);var i=function(){var r=null;try{r=e.core.dom.textSelectArea(t)}catch(n){r=e.queryToJson(t.__areaQuery)}return 0===r.start&&0===r.len&&t.__areaQuery&&(r=e.queryToJson(t.__areaQuery)),r.start=parseInt(r.start,10),r.len=parseInt(r.len,10),r},c=function(e,r){var n=t.value,a=r.start,u=r.len||0,l=n.slice(0,a),o=n.slice(a+u,n.length);t.value=l+e+o,n=null,l=null,o=null;var a=null,u=null};return n.setCursor=function(e){u(e)},n.getCursor=function(){return i()},n.insertCursor=function(e){var t=i();c(e,t),t.len=e.length,u(t)},n.TempletCursor=function(r){var n,a,l;n=i(),a=n.len>0?t.value.substr(n.start,n.len):"",l=e.templet(r,{origin:a}),c(l,n),n.start=n.start+r.indexOf("#{origin"),n.len=l.length-r.replace(/#\{[origin].+?\}/,"").length,u(n)},n.insertText=c,n.destroy=function(){e.removeEvent(t,"beforedeactivate",l),e.removeEvent(t,"active",o),t=null},n}})});