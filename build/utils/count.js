steel.d("utils/str/bLength",[],function(t,n,e){STK.register("utils.str.bLength",function(t){return function(t){if(!t)return 0;var n=t.match(/[^\x00-\xff]/g);return t.length+(n?n.length:0)}})}),steel.d("utils/count",["utils/str/bLength"],function(t,n,e){t("utils/str/bLength"),STK.register("utils.count",function(t){function n(n){for(var e=41,r=140,i=20,u=n,s=n.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi)||[],c=0,h=0,l=s.length;l>h;h++){var a=t.utils.str.bLength(s[h]);/^(http:\/\/t.cn)/.test(s[h])||(c+=(/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(s[h])||/^(http:\/\/)+(weibo.com|weibo.cn)/.test(s[h]))&&e>=a?a:r>=a?i:a-r+i,u=u.replace(s[h],""))}var g=Math.ceil((c+t.utils.str.bLength(u))/2);return g}return function(t){return t=t.replace(/\r\n/g,"\n"),num=n(t)}})});