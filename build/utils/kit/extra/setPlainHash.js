steel.d("utils/kit/extra/setPlainHash",[],function(t,i,n){STK.register("utils.kit.extra.setPlainHash",function(t){return function(i){try{var n=window.$CONFIG;n&&"true"===n.bigpipe&&t.historyM?t.historyM.setPlainHash(i):window.location.hash=i}catch(s){}}})});