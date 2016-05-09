var errorHTML = require('tpl/common/error')();
var utilBee = require('utils/bee');

module.exports = function(indexPath) {
	var timer = null;
    var that = {};
	clearTimeout(timer);
    var indexURL = indexPath;
    document.body.innerHTML = errorHTML || '';
    if (window.location.href.indexOf(indexURL) === -1) {
        timer = setTimeout(function() {
            window.location.href = indexPath;
        }, 3000);
    }
    !steel.isDebug && utilBee.log('9002', 'Steel框架下所请求ajax数据错误');//抛给监控系统(code, msg, type, lv)

    function destroy() {
        clearTimeout(timer);
    }

    that.destroy = destroy;
    that.timer = timer;

    return that;
};