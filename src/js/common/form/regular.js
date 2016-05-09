/**
 * 
 * @id $.common.enterprise.regular 常用验证规则
 * @param {Object} box form的页面范围
 * @param {Object} rlues 验证范围
 * @return {Object} 实例
 * @author kongbo | kongbo@staff.sina.com.cn
 * @example
 * 
 */

STK.register('common.form.regular', function($) {

    //+++ 常量定义区 ++++++++++++++++++
    //-------------------------------------------
    var _trim = $.core.str.trim;
    //基础验证，非空为通过
    var baseRule = function(el) {
        if (el.value != _trim(el.value)) {
            el.value = _trim(el.value);
        }
        if (el.value == el.getAttribute('defval')) {
            return '';
        }
        return el.value;
    }

    return {
        'notEmpty': function(el) {
            var _val = baseRule(el);
            return /^\s*$/g.test(_val.replace(/^\s+|\s+$/g, ''));
        },
        'isDef': function(el) {
            var _val = baseRule(el);
            return (_val == '');
        },
        //不区分中英文字符区别
        'noDiffMax': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            var _max = parseInt(el.getAttribute('vmax'));
            if (_max > 0) {
                return (_val.length > _max);
            }
        },
        'tel': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return !/(^1[0-9]{10}$)|(^[\d\(\)（）_-]{4,15}$)/.test(_val);
        },
        //+港澳8-11位
        'phone': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return !/(^1[0-9]{10}$)|(^[0-9]{8}$)/.test(_val);
        },
        //最小字符数
        'min': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            var _min = parseInt(el.getAttribute('vmin'));
            if (_val.length && _min > 0) {
                return (_val.replace(/[^\x00-\xff]/g, "rr").length < _min);
            }
        },
        'max': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            var _max = parseInt(el.getAttribute('vmax'));
            if (_max > 0) {
                return (_val.replace(/[^\x00-\xff]/g, "rr").length > _max);
            }
        },
        'number': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            _val = parseInt(_val, 10);
            if (!/^[0-9]+$/.test(el.value)) {
                return true;
            }
            var _max = el.getAttribute('num-max');
            var _min = el.getAttribute('num-min');
            //检验是否有按字符数计算长度的验证，有就跳过验证最大最小值
            if (!_max && !_min) {
                return;
            }
            // var _actType = '|'+$.queryToJson(el.getAttribute('action-data')).acttype+'|';
            if (_max && _val > parseInt(_max, 10)) { // && !/\|max\|/.test(_actType)
                return true;
            }
            if (_min && _val < parseInt(_min, 10)) { // && !/\|min\|/.test(_actType)
                return true;
            }
            //验证正确
            return false;
        },
        'notAllNum': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (/^[0-9]*$/.test(_val));
        },
        'engnum': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (!/^[a-zA-Z0-9]*$/.test(_val));
        },
        'normal': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (!/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(_val));
        },
        'float': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (!/^[0-9]*\.{0,1}[0-9]{0,2}$/.test(_val));
        },
        "chinese": function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (!/^[\u4e00-\u9fa5]*$/.test(_val));
        },
        "checkurl": function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return !/^(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9\/=\?%_~@&#:;\+\-]+)+$/i.test(_val);
        },
        //Email
        'email': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(_val);
        },
        'url': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            var strRegex = "^((https|http|ftp|rtsp|mms)://)" +
                "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@  
                "(([0-9]{1,3}\.){3}[0-9]{1,3}" + // IP形式的URL- 199.194.52.184  
                "|" + // 允许IP和DOMAIN（域名） 
                "([0-9a-z_!~*'()-]+\.)*" + // 域名- www.
                "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." + // 二级域名 
                "[a-z]{2,6})" + // first level domain- .com or .museum
                "(:[0-9]{1,4})?"; // 端口- :80
            var re = new RegExp(strRegex);
            if (re.test(_val)) {
                return (!/\./g.test(_val));
            } else {
                return true;
            }
        },
        'IDcard': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (!/^(\d{8}[01]\d[0123]\d{4})|(\d{6}(19|20)\d{2}[01]\d[0123]\d{4}[0-9Xx])$/.test(_val));
        },
        //英文 、中文、数字
        'cen': function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return !(/^(?:#){0,1}[\d\u4e00-\u9fa5a-zA-Z_]+?(?:#){0,1}$/.test(_val));
        },
        'hasSelect': function(el) {
            if (el.checked) {
                var _cbox = App.sizzle('input[type=checkbox]', $E(el.id + '_info'));
                for (var i = 0, len = _cbox.length; i < len; ++i) {
                    if (_cbox[i].checked) {
                        return false;
                    }
                }
                return true;
            }
        },
        //for bindForm.calendar
        diffDate: function(el) {
            var _doms = el.dateDom;
            if (!_doms || !_doms.stime || !_doms.etime || !_doms.stime.value || !_doms.etime.value) {
                return
            }
            var stime = (new Date(_doms.stime.value).getTime() / 1000) + (_doms.shour ? parseInt(_doms.shour.value) * 60 : 0) + (_doms.smin ? parseInt(_doms.smin.value) : 0);
            var etime = (new Date(_doms.etime.value).getTime() / 1000) + (_doms.ehour ? parseInt(_doms.ehour.value) * 60 : 0) + (_doms.emin ? parseInt(_doms.emin.value) : 0);
            if (stime > etime) {
                return true;
            }
        },
        zipcode: function(el) {
            var _val = baseRule(el);
            if (!_val) {
                return; }
            return (!/^[0-9]\d{5}$/.test(_val));
        },
        ajax: function(el) {
            var _val = baseRule(el);
            var _url = el.getAttribute('get');
            if (!_val || !_url) {
                return; }
            var _param = $.queryToJson(el.getAttribute('getparams') || '');
            _param[el.name] = _val;
            $.core.io.ajax({
                'url': _url,
                'onComplete': function(ret) {
                    if (ret.code == '100000') {
                        return false;
                    } else {
                        return ret.msg || true;
                    }
                },
                'onFail': function(e) {
                    return true;
                },
                'args': _param,
                'method': 'get'
            });
        }
    };
});
