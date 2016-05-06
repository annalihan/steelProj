steel.d("utils/storage", [],function(require, exports, module) {
/**
 * LocalStorage
 * @id STK.kit.extra.storage
 * @author wukan@staff.weibo.com
 * @modify wudi3@staff.weibo.com
 * @example
 * $.core.util.storage.set(key);
 * $.core.util.storage.get(key,value)
 * $.core.util.storage.del(key)
 * $.core.util.storage.clear
 * $.core.util.storage.getAll
 */
STK.register('utils.storage', function($){
    var objDS = window.localStorage;
    if (objDS) {
        return {
            /**
             * Describe 获取值
             * @method get
             * @param {String} key
                 
             * @return {String}
             * @example
             */
            get: function(key){
                if(objDS.getItem(key)){
                    return unescape(objDS.getItem(key));
                }else{
                    return null;
                }
            },
            /**
             * Describe 设置值
             * @method set
             * @param {String} key
             * @param {String} value
             * @return {void}
             * @example
             */
            set: function(key, value, exp){
                objDS.setItem(key, escape(value));
            },
            /**
             * Describe 删除值
             * @method  del
             * @param {String} key
             * @return {void}
             * @example
             */
            del: function(key){
                objDS.removeItem(key);
            },
            clear: function(){
                objDS.clear();
            },
            getAll: function(){
                var l = objDS.length, key = null, ac = [];
                for (var i = 0; i < l; i++) {
                    key = objDS.key(i);
                    ac.push(key + '=' + this.getKey(key));
                }
                return ac.join('; ');
            }
        };
    }else{
        return null;
    }
});
});