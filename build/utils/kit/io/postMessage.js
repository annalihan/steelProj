steel.d("utils/kit/io/postMessage",[],function(n,e,t){STK.register("utils.kit.io.postMessage",function(n){var e=function(){return+new Date},t=function(t,r){var o={},i=null,a=[],s=function(n){for(var e=0,t=a.length;t>e;e+=1)try{a[e](n)}catch(r){}},u=function(){if(r.name){var n=r.name.split("|");n[0]!==i&&(i=n[0],n.shift(),s(n.join("|")))}},c=null;return o.post=function(n){if(t.postMessage)t.postMessage(n,"*");else{u();var o=e();r.name=o+"|"+n,i=o}},o.reg=function(n){a.push(n),t.postMessage||c||(c=setInterval(function(){u()},100))},o.unreg=function(e){n.core.arr.foreach(a,function(n,t){e===n&&(a[t]=void 0)}),a=n.core.arr.clear(a)},o.destroy=function(){a=[],clearInterval(c)},n.addEvent(window,"message",function(n){s(n.data)}),o};return{inner:function(){return t(window.parent,window)},outer:function(n){return t(n,n)},general:t}})});