steel.d("utils/kit/dom/parseDOM",[],function(t,n,e){STK.register("utils.kit.dom.parseDOM",function(t){return function(t){for(var n in t)t[n]&&1==t[n].length&&(t[n]=t[n][0]);return t}})}),steel.d("utils/kit/extra/language",[],function(t,n,e){STK.register("utils.kit.extra.language",function(t){return window.$LANG||(window.$LANG={}),function(n,e){var i=t.core.util.language(n,$LANG);return i=i.replace(/\\}/gi,"}"),e&&(i=t.templet(i,e)),i}})}),steel.d("utils/kit/dom/btnState",["utils/kit/dom/parseDOM","utils/kit/extra/language"],function(t,n,e){t("utils/kit/dom/parseDOM"),t("utils/kit/extra/language"),STK.register("utils.kit.dom.btnState",function(t){var n=function(n){var e=function(n){var e=t.utils.kit.dom.parseDOM(t.builder(n).list);return e.submit_btn||(e.submit_btn=n),e},i=t.utils.kit.extra.language;n=t.parseParam({btn:null,state:"loading",loadText:i("#L{提交中...}"),commonText:i("#L{提交}")},n);var a=e(n.btn),r=n.state;"loading"==r?(a.submit_btn.className="W_btn_a_disable",a.btnText.innerHTML=n.loadText):(a.submit_btn.className="W_btn_b btn_noloading",a.btnText.innerHTML=n.commonText)};return n})});