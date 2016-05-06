/**
 * 按照业务需要对ajax进行封装,支持onError、onSuccess, ajax加锁等
 * @author MrGalaxyn
 */
$Import('ui.bubble');

STK.register('utils.io', function($) {
    return function() {
        var that = {},
            transList = {},
            transQueue = [],
            queueLock = false;

        function nextRequest() {
            if (!transQueue.length || queueLock === true) return;

            queueLock = true;
            var tmp = transQueue.shift();
            var trans = tmp[1];
            trans.data = tmp[0];
            trans.ajLock = true;
            trans.aj = $.ajax(trans);
        };
        
        that.register = function(name, args) {
            if(transList[name] !== undefined) {
                throw name + ' interface has been registered';
            }
            transList[name] = $.merge({
                ajLock: false,
                timeout: 30 * 1000,
                dataType: "json"
            }, args);
            transList[name].type = transList[name].method;
        };

        that.getTrans = function(name, opts) {
            if (!transList[name]) throw name + ' interface has not been registered';
            var trans = transList[name];
            var self = trans;

            opts = $.parseParam({
                onComplete: $.empty,
                onSuccess: $.empty,
                onError: function(req) {
                    $.ui.bubble((req && req.msg) || "请求错误");
                },
                onFail: function(req) {
                    $.ui.bubble("服务器错误");
                }
            }, opts);

            trans.onComplete = function(req, xhr) {
                queueLock = false;
                self.ajLock = false;
                try{
                    opts.onComplete(req, xhr);
                } catch(exp) {
                    throw '[Error]onComplete: ' + exp;
                }
                if(req['code'] == 100000){
                    try{
                        opts.onSuccess(req, xhr);
                    } catch(exp) {
                        // throw '[Error]onSuccess: ' + exp;
                        throw exp;
                    }
                } else {
                    try{
                        if(req['code'] == 100002)
                            window.location.href = req['data'];

                        opts.onError(req, xhr);
                    } catch(exp) {
                        throw '[Error]onError: ' + exp;
                    }
                }
                setTimeout(nextRequest, 0);//跳出递归
            };

            trans.onTimeout = trans.onFail = function(res, xhr) {
                queueLock = false;
                self.ajLock = false;
                var fakeRes = { msg: "服务器错误" };
                opts.onFail(fakeRes, xhr);
                setTimeout(nextRequest, 0);//跳出递归
            };

            trans.request = (function() {
                return function(params) {
                    if (self.ajLock) return;
                    params = params || {};
                    if (!params.superuid) {
                        window.$CONFIG && $CONFIG['superuid'] && (params.superuid = $CONFIG['superuid']);
                    }
                    transQueue.push([params, self]);
                    nextRequest();
                }
            })();

            trans.abort = (function() {
                return function(params) {
                    queueLock = false;
                    if(self.aj) {
                        try{
                            self.aj.abort();
                        } catch(exp) {
                            throw '[Error]trans abort:' + exp;
                        }
                    }
                    self.aj = null;
                    self.ajLock = false;
                }
            })();

            return trans;
        };

        return that;
    };
});


