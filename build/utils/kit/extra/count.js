steel.d("utils/kit/extra/count",[],function(t,n,e){STK.register("utils.kit.extra.count",function(t){function n(n){for(var e=41,r=140,c=20,i=n,a=n.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi)||[],o=0,u=0,s=a.length;s>u;u++){var h=t.core.str.bLength(a[u]);/^(http:\/\/t.cn)/.test(a[u])||(o+=(/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(a[u])||/^(http:\/\/)+(weibo.com|weibo.cn)/.test(a[u]))&&e>=h?h:r>=h?c:h-r+c,i=i.replace(a[u],""))}var l=Math.ceil((o+t.core.str.bLength(i))/2);return l}return function(t){return t=t.replace(/\r\n/g,"\n"),num=n(t)}})});