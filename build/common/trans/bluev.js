steel.d("utils/kit/extra/merge",[],function(t,e,i){STK.register("utils.kit.extra.merge",function(t){return function(t,e){var i={};for(var o in t)i[o]=t[o];for(var o in e)i[o]=e[o];return i}})}),steel.d("utils/kit/io/ajax",["utils/kit/extra/merge"],function(t,e,i){t("utils/kit/extra/merge"),STK.register("utils.kit.io.ajax",function(t){return function(e){var i,o,r,n,u,a,s;a=function(t){u=!1,e.onComplete(t,i.args),setTimeout(l,0)},s=function(t){u=!1,e.onFail(t,i.args),setTimeout(l,0)},r=[],n=null,u=!1,i=t.parseParam({url:"",method:"get",responseType:"json",timeout:3e4,onTraning:t.funcEmpty,isEncode:!0},e),i.onComplete=a,i.onFail=s;var l=function(){r.length&&u!==!0&&(u=!0,i.args=r.shift(),n=t.ajax(i))},c=function(t){for(;r.length;)r.shift();if(u=!1,n)try{n.abort()}catch(e){}n=null};return o={},o.request=function(t){t=t||{},t.superuid||!!$CONFIG.superuid&&(t.superuid=$CONFIG.superuid),t||(t={}),e.noQueue&&c(),e.uniqueRequest&&n||(r.push(t),t._t=0,l())},o.abort=c,o}})}),steel.d("utils/kit/io/jsonp",["utils/kit/extra/merge"],function(t,e,i){t("utils/kit/extra/merge"),STK.register("utils.kit.io.jsonp",function(t){return function(e){var i,o,r,n,u;i=t.parseParam({url:"",method:"get",responseType:"json",varkey:"_v",timeout:3e4,onComplete:t.funcEmpty,onTraning:t.funcEmpty,onFail:t.funcEmpty,isEncode:!0},e),r=[],n={},u=!1;var a=function(){r.length&&u!==!0&&(u=!0,n.args=r.shift(),n.onComplete=function(t){u=!1,i.onComplete(t,n.args),setTimeout(a,0)},n.onFail=function(t){u=!1,i.onFail(t),setTimeout(a,0)},t.jsonp(t.utils.kit.extra.merge(i,{args:n.args,onComplete:function(t){n.onComplete(t)},onFail:function(t){try{n.onFail(t)}catch(e){}}})))};return o={},o.request=function(t){t=t||{},t.superuid||!!$CONFIG.superuid&&(t.superuid=$CONFIG.superuid),t||(t={}),r.push(t),t._t=1,a()},o.abort=function(t){for(;r.length;)r.shift();u=!1,n=null},o}})}),steel.d("utils/kit/io/inter",["utils/kit/io/ajax","utils/kit/io/jsonp","utils/kit/extra/merge"],function(t,e,i){t("utils/kit/io/ajax"),t("utils/kit/io/jsonp"),t("utils/kit/extra/merge"),STK.register("utils.kit.io.inter",function(t){return function(){var e,i,o;return e={},i={},o={},e.register=function(t,e){if(void 0!==i[t])throw t+" interface has been registered";i[t]=e,o[t]={}},e.hookComplete=function(e,i){var r=t.core.util.getUniqueKey();return o[e][r]=i,r},e.removeHook=function(t,e){o[t]&&o[t][e]&&delete o[t][e]},e.getTrans=function(e,r){var n=t.utils.kit.extra.merge(i[e],r);return n.onComplete=function(t,i){try{r.onComplete(t,i)}catch(n){}if("100000"===t.code)try{r.onSuccess(t,i)}catch(n){}else try{if("100002"===t.code&&t.data&&"string"==typeof t.data&&0==t.data.indexOf("http"))return void(window.location.href=t.data);if(r.onError(t,i),"100002"===t.code||"100008"===t.code){var u={loginSuccessUrl:t.data.url?"http://weibo.com/p/aj/proxy?api="+t.data.url:""};return window.WBtopGlobal_loginLayer?void window.WBtopGlobal_loginLayer(u):void STK.core.io.scriptLoader({url:"http://tjs.sjs.sinajs.cn/t5/register/js/page/remote/loginLayer.js",onComplete:function(t,e){window.WBtopGlobal_loginLayer(u)}})}}catch(n){}for(var a in o[e])try{o[e][a](t,i)}catch(n){}},"jsonp"===i[e].requestMode?t.utils.kit.io.jsonp(n):"ijax"===i[e].requestMode?t.utils.kit.io.ijax(n):t.utils.kit.io.ajax(n)},e.request=function(e,r,n){var u=t.core.json.merge(i[e],r);return u.onComplete=function(t,i){try{r.onComplete(t,i)}catch(n){}if("100000"===t.code)try{r.onSuccess(t,i)}catch(n){}else try{if("100002"===t.code&&t.data&&"string"==typeof t.data&&0==t.data.indexOf("http"))return void(window.location.href=t.data);r.onError(t,i)}catch(n){}for(var u in o[e])try{o[e][u](t,i)}catch(n){}},u=t.core.obj.cut(u,["noqueue"]),u.args=n,"jsonp"===i[e].requestMode?t.jsonp(u):"ijax"===i[e].requestMode?t.ijax(u):t.ajax(u)},e}})}),steel.d("common/trans/bluev",["utils/kit/io/inter"],function(t,e,i){t("utils/kit/io/inter"),STK.register("common.trans.bluev",function(t){var e=t.utils.kit.io.inter(),i=e.register;return i("send",{url:"/aj/bluev",method:"post"}),i("add",{url:"/aj/bluev",method:"post"}),i("square",{url:"/aj/h5/square",method:"get"}),e})});