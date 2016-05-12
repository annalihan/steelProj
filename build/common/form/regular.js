steel.d("common/form/regular",[],function(t,e,r){STK.register("common.form.regular",function(t){var e=t.core.str.trim,r=function(t){return t.value!=e(t.value)&&(t.value=e(t.value)),t.value==t.getAttribute("defval")?"":t.value};return{notEmpty:function(t){var e=r(t);return/^\s*$/g.test(e.replace(/^\s+|\s+$/g,""))},isDef:function(t){var e=r(t);return""==e},noDiffMax:function(t){var e=r(t);if(e){var n=parseInt(t.getAttribute("vmax"));return n>0?e.length>n:void 0}},tel:function(t){var e=r(t);if(e)return!/(^1[0-9]{10}$)|(^[\d\(\)（）_-]{4,15}$)/.test(e)},phone:function(t){var e=r(t);if(e)return!/(^1[0-9]{10}$)|(^[0-9]{8}$)/.test(e)},min:function(t){var e=r(t);if(e){var n=parseInt(t.getAttribute("vmin"));return e.length&&n>0?e.replace(/[^\x00-\xff]/g,"rr").length<n:void 0}},max:function(t){var e=r(t);if(e){var n=parseInt(t.getAttribute("vmax"));return n>0?e.replace(/[^\x00-\xff]/g,"rr").length>n:void 0}},number:function(t){var e=r(t);if(e){if(e=parseInt(e,10),!/^[0-9]+$/.test(t.value))return!0;var n=t.getAttribute("num-max"),a=t.getAttribute("num-min");if(n||a)return n&&e>parseInt(n,10)?!0:a&&e<parseInt(a,10)?!0:!1}},notAllNum:function(t){var e=r(t);if(e)return/^[0-9]*$/.test(e)},engnum:function(t){var e=r(t);if(e)return!/^[a-zA-Z0-9]*$/.test(e)},normal:function(t){var e=r(t);if(e)return!/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(e)},"float":function(t){var e=r(t);if(e)return!/^[0-9]*\.{0,1}[0-9]{0,2}$/.test(e)},chinese:function(t){var e=r(t);if(e)return!/^[\u4e00-\u9fa5]*$/.test(e)},checkurl:function(t){var e=r(t);if(e)return!/^(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9\/=\?%_~@&#:;\+\-]+)+$/i.test(e)},email:function(t){var e=r(t);if(e)return!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(e)},url:function(t){var e=r(t);if(e){var n="^((https|http|ftp|rtsp|mms)://)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?",a=new RegExp(n);return a.test(e)?!/\./g.test(e):!0}},IDcard:function(t){var e=r(t);if(e)return!/^(\d{8}[01]\d[0123]\d{4})|(\d{6}(19|20)\d{2}[01]\d[0123]\d{4}[0-9Xx])$/.test(e)},cen:function(t){var e=r(t);if(e)return!/^(?:#){0,1}[\d\u4e00-\u9fa5a-zA-Z_]+?(?:#){0,1}$/.test(e)},hasSelect:function(t){if(t.checked){for(var e=App.sizzle("input[type=checkbox]",$E(t.id+"_info")),r=0,n=e.length;n>r;++r)if(e[r].checked)return!1;return!0}},diffDate:function(t){var e=t.dateDom;if(e&&e.stime&&e.etime&&e.stime.value&&e.etime.value){var r=new Date(e.stime.value).getTime()/1e3+(e.shour?60*parseInt(e.shour.value):0)+(e.smin?parseInt(e.smin.value):0),n=new Date(e.etime.value).getTime()/1e3+(e.ehour?60*parseInt(e.ehour.value):0)+(e.emin?parseInt(e.emin.value):0);return r>n?!0:void 0}},zipcode:function(t){var e=r(t);if(e)return!/^[0-9]\d{5}$/.test(e)},ajax:function(e){var n=r(e),a=e.getAttribute("get");if(n&&a){var u=t.queryToJson(e.getAttribute("getparams")||"");u[e.name]=n,t.core.io.ajax({url:a,onComplete:function(t){return"100000"==t.code?!1:t.msg||!0},onFail:function(t){return!0},args:u,method:"get"})}}}})});