steel.d("utils/kit/dom/dir",[],function(e,n,r){STK.register("utils.kit.dom.dir",function(e){return function(n,r){r=e.parseParam({dir:"parentNode",expr:void 0,endpoint:document,maxLength:1},r);var i=r.dir,t=r.expr,d=r.endpoint,o=r.maxLength;if(!n||!t)return void e.log("kit dir: node or opts.expr is undefined.");for(var u=[],l=n[i];l&&!(1==l.nodeType&&e.sizzle(t,null,null,[l]).length>0&&(u.push(l),u.length==o))&&l!=d;)l=l[i];return u}})});