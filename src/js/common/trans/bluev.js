/**
 * 
 * @author yuqi6@staff.weibo.com
 */
$Import('utils.kit.io.inter');
STK.register('common.trans.bluev',function($){
    var t = $.utils.kit.io.inter();
    var g = t.register;
    //修改微博名称和认证信息
    g('modify',{'url':'/aj/bluev', 'method':'post'});
    
    return t;
});