$Import('utils.kit.io.ajax');
$Import('utils.kit.io.jsonp');
$Import('utils.kit.extra.merge');

STK.register('utils.kit.io.inter',function($){
    return function(){
        var that, argsList, hookList;
        that = {};
        argsList = {};
        hookList = {};
        that.register = function(name,args){
            if(argsList[name] !== undefined){
                throw name + ' interface has been registered';
            }
            
            argsList[name] = args;
            hookList[name] = {};
        };
        that.hookComplete = function(name,func){
            var key = $.core.util.getUniqueKey();
            hookList[name][key] = func;
            return key;
        };
        that.removeHook = function(name,key){
            if(hookList[name] && hookList[name][key]){
                delete hookList[name][key];
            }
        };
        that.getTrans = function(name, spec){
        
            var conf = $.utils.kit.extra.merge(argsList[name], spec);
            conf.onComplete = function(req, params){
                try{
                    spec.onComplete(req, params);
                }catch(exp){
                
                }
                if(req['code'] === '100000'){
                    try{
                        spec.onSuccess(req, params);
                    }catch(exp){
                        
                    }
                }else{
                    try{
                        if(req['code'] === '100002'){
                            //兼容遗留的ret.data是url的情形
                            if(req.data && ( typeof req.data == 'string') && (req.data.indexOf('http') == 0)){
                                window.location.href=req['data'];
                                return;
                            }
                        }
                        spec.onError(req, params);
                        if(req['code'] === '100002' || req['code'] === '100008'){
                            var _opt = {
                                loginSuccessUrl : (req.data.url? "http://weibo.com/p/aj/proxy?api=" + req.data.url: "")
                            };
                            if (window.WBtopGlobal_loginLayer) {
                                window.WBtopGlobal_loginLayer(_opt);
                                return;
                            }
                            STK.core.io.scriptLoader({
                                'url': "http://tjs.sjs.sinajs.cn/t5/register/js/page/remote/loginLayer.js",
                                'onComplete': function(oData, sVarName){
                                    window.WBtopGlobal_loginLayer(_opt);
                                }
                            });
                            return;
                        }
                    }catch(exp){

                    }
                }
                for(var k in hookList[name]){
                    try{
                        hookList[name][k](req, params);
                    }catch(exp){

                    }
                }
            };
            if(argsList[name]['requestMode'] === 'jsonp'){
                return $.utils.kit.io.jsonp(conf);
            }else if(argsList[name]['requestMode'] === 'ijax'){
                return $.utils.kit.io.ijax(conf);
            }else{
                return $.utils.kit.io.ajax(conf);
            }
        };
        that.request = function(name, spec, args){
            var conf = $.core.json.merge(argsList[name], spec);
            conf.onComplete = function(req, params){
                try{
                    spec.onComplete(req, params);
                }catch(exp){

                }
                if(req['code'] === '100000'){
                    try{
                        spec.onSuccess(req, params);
                    }catch(exp){

                    }
                }else{
                    try{
                        if(req['code'] === '100002'){
                            //兼容遗留的ret.data是url的情形
                            if(req.data && ( typeof req.data == 'string') && (req.data.indexOf('http') == 0)){
                                window.location.href=req['data'];
                                return;
                            }
                        }
                        spec.onError(req, params);

                    }catch(exp){

                    }
                }
                for(var k in hookList[name]){
                    try{
                        hookList[name][k](req, params);
                    }catch(exp){

                    }
                }
            };
            conf = $.core.obj.cut(conf, ['noqueue']);

            conf.args = args;

            if(argsList[name]['requestMode'] === 'jsonp'){
                return $.jsonp(conf);
            }else if(argsList[name]['requestMode'] === 'ijax'){
                return $.ijax(conf);
            }else{
                return $.ajax(conf);
            }
        };
        return that;
    };
});
