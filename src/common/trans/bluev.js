/**
 *
 * @author yuqi6@staff.weibo.com
 */
$Import('utils.kit.io.inter');
STK.register('common.trans.bluev',function($){
    var t = $.utils.kit.io.inter();
    var g = t.register;
    //自动回复
    g('send',{'url':'/aj/bluev', 'method':'post'});
    g('add',{'url':'/aj/bluev', 'method':'post'});
    g('square',{'url':'/aj/h5/square', 'method':'get'});

    return t;
});