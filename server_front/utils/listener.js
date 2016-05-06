steel.d("utils/listener", [],function(require, exports, module) {
/**
 * 广播事件
 * @auther MrGalaxyn
 */

STK.register('utils.listener', function($) {
    var listeners = {};
    var that = {};
    /**
     * 创建广播白名单
     * @param {String} channel
     * @param {Array} evts
     */
    that.define = function(channel, evts) {
        if (listeners[channel] != null)
            throw 'channel is already defined';

        listeners[channel] = evts;
        
        var ret = {};
        ret.register = function(evt, handler) {
            if (listeners[channel].indexOf(evt) === -1)
                throw 'no such event';

            $.on(ret, evt, handler);
        };
        ret.fire = function(evt, data) {
            if (listeners[channel].indexOf(evt) === -1)
                throw 'no such event';
            
            $.trigger(ret, evt, data)
        };
        ret.remove = function(evt, handler) {
            $.off(ret, evt, handler);
        };

        return ret;
    };

    return that;
});

});