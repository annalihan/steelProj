steel.d("utils/kit/extra/swfobject",[],function(e,t,n){STK.register("utils.kit.extra.swfobject",function(e){var t=function(){function n(){if(!U){try{var t=P.getElementsByTagName("body")[0].appendChild(m("span"));t.parentNode.removeChild(t)}catch(n){return void e.log("error 3 : ",n.message)}U=!0;for(var a=W.length,i=0;a>i;i++)W[i]()}}function a(e){U?e():W[W.length]=e}function i(e){if(typeof V.addEventListener!=B)V.addEventListener("load",e,!1);else if(typeof P.addEventListener!=B)P.addEventListener("load",e,!1);else if(typeof V.attachEvent!=B)w(V,"onload",e);else if("function"==typeof V.onload){var t=V.onload;V.onload=function(){t(),e()}}else V.onload=e}function r(){D?o():s()}function o(){var e=P.getElementsByTagName("body")[0],t=m(O);t.setAttribute("type",F);var n=e.appendChild(t);if(n){var a=0;!function(){if(typeof n.GetVariable!=B){var i=n.GetVariable("$version");i&&(i=i.split(" ")[1].split(","),Z.pv=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)])}else if(10>a)return a++,void setTimeout(arguments.callee,10);e.removeChild(t),n=null,s()}()}else s()}function s(){var e=H.length;if(e>0)for(var t=0;e>t;t++){var n=H[t].id,a=H[t].callbackFn,i={success:!1,id:n};if(Z.pv[0]>0){var r=g(n);if(r)if(!b(H[t].swfVersion)||Z.wk&&Z.wk<312)if(H[t].expressInstall&&c()){var o={};o.data=H[t].expressInstall,o.width=r.getAttribute("width")||"0",o.height=r.getAttribute("height")||"0",r.getAttribute("class")&&(o.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(o.align=r.getAttribute("align"));for(var s={},u=r.getElementsByTagName("param"),p=u.length,v=0;p>v;v++)"movie"!=u[v].getAttribute("name").toLowerCase()&&(s[u[v].getAttribute("name")]=u[v].getAttribute("value"));d(o,s,n,a)}else f(r),a&&a(i);else E(n,!0),a&&(i.success=!0,i.ref=l(n),a(i))}else if(E(n,!0),a){var y=l(n);y&&typeof y.SetVariable!=B&&(i.success=!0,i.ref=y),a(i)}}}function l(e){var t=null,n=g(e);if(n&&"OBJECT"==n.nodeName)if(typeof n.SetVariable!=B)t=n;else{var a=n.getElementsByTagName(O)[0];a&&(t=a)}return t}function c(){return!X&&b("6.0.65")&&(Z.win||Z.mac)&&!(Z.wk&&Z.wk<312)}function d(e,t,n,a){X=!0,N=a||null,I={success:!1,id:n};var i=g(n);if(i){"OBJECT"==i.nodeName?(T=u(i),A=null):(T=i,A=n),e.id=$,(typeof e.width==B||!/%$/.test(e.width)&&parseInt(e.width,10)<310)&&(e.width="310"),(typeof e.height==B||!/%$/.test(e.height)&&parseInt(e.height,10)<137)&&(e.height="137"),P.title=P.title.slice(0,47)+" - Flash Player Installation";var r=Z.ie&&Z.win?"ActiveX":"PlugIn",o="MMredirectURL="+V.location.toString().replace(/&/g,"%26")+"&MMplayerType="+r+"&MMdoctitle="+P.title;if(typeof t.flashvars!=B?t.flashvars+="&"+o:t.flashvars=o,Z.ie&&Z.win&&4!=i.readyState){var s=m("div");n+="SWFObjectNew",s.setAttribute("id",n),i.parentNode.insertBefore(s,i),i.style.display="none",function(){4==i.readyState?i.parentNode.removeChild(i):setTimeout(arguments.callee,10)}()}p(e,t,n)}}function f(e){if(Z.ie&&Z.win&&4!=e.readyState){var t=m("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(u(e),t),e.style.display="none",function(){4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(u(e),e)}function u(e){var t=m("div");if(Z.win&&Z.ie)t.innerHTML=e.innerHTML;else{var n=e.getElementsByTagName(O)[0];if(n){var a=n.childNodes;if(a)for(var i=a.length,r=0;i>r;r++)1==a[r].nodeType&&"PARAM"==a[r].nodeName||8==a[r].nodeType||t.appendChild(a[r].cloneNode(!0))}}return t}function p(e,t,n){var a,i=g(n);if(Z.wk&&Z.wk<312)return a;if(i)if(typeof e.id==B&&(e.id=n),Z.ie&&Z.win){var r="";for(var o in e)e[o]!=Object.prototype[o]&&("data"==o.toLowerCase()?t.movie=e[o]:"styleclass"==o.toLowerCase()?r+=' class="'+e[o]+'"':"classid"!=o.toLowerCase()&&(r+=" "+o+'="'+e[o]+'"'));var s="";for(var l in t)t[l]!=Object.prototype[l]&&(s+='<param name="'+l+'" value="'+t[l]+'" />');i.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+r+">"+s+"</object>",G[G.length]=e.id,a=g(e.id)}else{var c=m(O);c.setAttribute("type",F);for(var d in e)e[d]!=Object.prototype[d]&&("styleclass"==d.toLowerCase()?c.setAttribute("class",e[d]):"classid"!=d.toLowerCase()&&c.setAttribute(d,e[d]));for(var f in t)t[f]!=Object.prototype[f]&&"movie"!=f.toLowerCase()&&v(c,f,t[f]);i.parentNode.replaceChild(c,i),a=c}return a}function v(e,t,n){var a=m("param");a.setAttribute("name",t),a.setAttribute("value",n),e.appendChild(a)}function y(e){var t=g(e);t&&"OBJECT"==t.nodeName&&(Z.ie&&Z.win?(t.style.display="none",function(){4==t.readyState?h(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function h(e){var t=g(e);if(t){for(var n in t)"function"==typeof t[n]&&(t[n]=null);t.parentNode.removeChild(t)}}function g(t){var n=null;try{n=P.getElementById(t)}catch(a){e.log("error 4 : ",a.message)}return n}function m(e){return P.createElement(e)}function w(e,t,n){e.attachEvent(t,n),J[J.length]=[e,t,n]}function b(e){var t=Z.pv,n=e.split(".");return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function C(e,t,n,a){if(!Z.ie||!Z.mac){var i=P.getElementsByTagName("head")[0];if(i){var r=n&&"string"==typeof n?n:"screen";if(a&&(k=null,L=null),!k||L!=r){var o=m("style");o.setAttribute("type","text/css"),o.setAttribute("media",r),k=i.appendChild(o),Z.ie&&Z.win&&typeof P.styleSheets!=B&&P.styleSheets.length>0&&(k=P.styleSheets[P.styleSheets.length-1]),L=r}Z.ie&&Z.win?k&&typeof k.addRule==O&&k.addRule(e,t):k&&typeof P.createTextNode!=B&&k.appendChild(P.createTextNode(e+" {"+t+"}"))}}}function E(e,t){if(z){var n=t?"visible":"hidden";U&&g(e)?g(e).style.visibility=n:C("#"+e,"visibility:"+n)}}function S(e){var t=/[\\\"<>\.;]/,n=null!=t.exec(e);return n&&typeof encodeURIComponent!=B?encodeURIComponent(e):e}{var T,A,N,I,k,L,B="undefined",O="object",j="Shockwave Flash",x="ShockwaveFlash.ShockwaveFlash",F="application/x-shockwave-flash",$="SWFObjectExprInst",M="onreadystatechange",V=window,P=document,R=navigator,D=!1,W=[r],H=[],G=[],J=[],U=!1,X=!1,z=!0,Z=function(){var t=typeof P.getElementById!=B&&typeof P.getElementsByTagName!=B&&typeof P.createElement!=B,n=R.userAgent.toLowerCase(),a=R.platform.toLowerCase(),i=/win/.test(a?a:n),r=/mac/.test(a?a:n),o=/webkit/.test(n)?parseFloat(n.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,s=!1,l=[0,0,0],c=null;if(typeof R.plugins!=B&&typeof R.plugins[j]==O)c=R.plugins[j].description,!c||typeof R.mimeTypes!=B&&R.mimeTypes[F]&&!R.mimeTypes[F].enabledPlugin||(D=!0,s=!1,c=c.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),l[0]=parseInt(c.replace(/^(.*)\..*$/,"$1"),10),l[1]=parseInt(c.replace(/^.*\.(.*)\s.*$/,"$1"),10),l[2]=/[a-zA-Z]/.test(c)?parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof V.ActiveXObject!=B)try{var d=new ActiveXObject(x);d&&(c=d.GetVariable("$version"),c&&(s=!0,c=c.split(" ")[1].split(","),l=[parseInt(c[0],10),parseInt(c[1],10),parseInt(c[2],10)]))}catch(f){e.log("error 1 : ",f.message)}return{w3:t,pv:l,wk:o,ie:s,win:i,mac:r}}();!function(){Z.w3&&((typeof P.readyState!=B&&"complete"==P.readyState||typeof P.readyState==B&&(P.getElementsByTagName("body")[0]||P.body))&&n(),U||(typeof P.addEventListener!=B&&P.addEventListener("DOMContentLoaded",n,!1),Z.ie&&Z.win&&(P.attachEvent(M,function(){"complete"==P.readyState&&(P.detachEvent(M,arguments.callee),n())}),V==top&&!function(){if(!U){try{P.documentElement.doScroll("left")}catch(t){return e.log("error 2 : ",t.message),void setTimeout(arguments.callee,0)}n()}}()),Z.wk&&!function(){return U?void 0:/loaded|complete/.test(P.readyState)?void n():void setTimeout(arguments.callee,0)}(),i(n)))}(),function(){Z.ie&&Z.win&&window.attachEvent("onunload",function(){for(var e=J.length,n=0;e>n;n++)J[n][0].detachEvent(J[n][1],J[n][2]);for(var a=G.length,i=0;a>i;i++)y(G[i]);for(var r in Z)Z[r]=null;Z=null;for(var o in t)t[o]=null;t=null})}()}return{registerObject:function(e,t,n,a){if(Z.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=a,H[H.length]=i,E(e,!1)}else a&&a({success:!1,id:e})},getObjectById:function(e){return Z.w3?l(e):void 0},embedSWF:function(e,t,n,i,r,o,s,l,f,u){var v={success:!1,id:t};Z.w3&&!(Z.wk&&Z.wk<312)&&e&&t&&n&&i&&r?(E(t,!1),a(function(){n+="",i+="";var a={};if(f&&typeof f===O)for(var y in f)a[y]=f[y];a.data=e,a.width=n,a.height=i;var h={};if(l&&typeof l===O)for(var g in l)h[g]=l[g];if(s&&typeof s===O)for(var m in s)typeof h.flashvars!=B?h.flashvars+="&"+m+"="+s[m]:h.flashvars=m+"="+s[m];if(b(r)){var w=p(a,h,t);a.id==t&&E(t,!0),v.success=!0,v.ref=w}else{if(o&&c())return a.data=o,void d(a,h,t,u);E(t,!0)}u&&u(v)})):u&&u(v)},switchOffAutoHideShow:function(){z=!1},ua:Z,getFlashPlayerVersion:function(){return{major:Z.pv[0],minor:Z.pv[1],release:Z.pv[2]}},hasFlashPlayerVersion:b,createSWF:function(e,t,n){return Z.w3?p(e,t,n):void 0},showExpressInstall:function(e,t,n,a){Z.w3&&c()&&d(e,t,n,a)},removeSWF:function(e){Z.w3&&y(e)},createCSS:function(e,t,n,a){Z.w3&&C(e,t,n,a)},addDomLoadEvent:a,addLoadEvent:i,getQueryParamValue:function(e){var t=P.location.search||P.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return S(t);for(var n=t.split("&"),a=0;a<n.length;a++)if(n[a].substring(0,n[a].indexOf("="))==e)return S(n[a].substring(n[a].indexOf("=")+1))}return""},expressInstallCallback:function(){if(X){var e=g($);e&&T&&(e.parentNode.replaceChild(T,e),A&&(E(A,!0),Z.ie&&Z.win&&(T.style.display="block")),N&&N(I)),X=!1}}}}();return t})});