steel.d("utils/kit/dom/insertText",[],function(e,t,l){STK.register("utils.kit.dom.insertText",function(e){var t=function(e){var t=el.createTextRange();t.collapse(!0),t.moveStart("character",pos+1),t.moveEnd("character",len-2),t.select()},l=function(e){try{var l=e.focus||function(){el.focus()},a=el.value.indexOf(value);if(-1!==a&&!allowRepeat)return l(),$IE?t(el,a,value.length):el.setSelectionRange(a+1,a+value.length-1),!1;if($IE)try{if(el.createTextRange&&el.caretPos){var n=el.caretPos;n.text=" "===n.text.charAt(n.text.length-1)?value+" ":value}else el.value+=value;l(),t(el,el.value.indexOf(value),value.length)}catch(c){}else{if(el.setSelectionRange){var u=el.selectionStart,o=el.selectionEnd,r=el.value.substring(0,u),v=el.value.substring(o);el.value=r+sValue+v,el.setSelectionRange(r.length+1,r.length+value.length-1)}else el.value+=value;l()}}catch(c){el.value+=value,l()}};return function(t){var a={},n=function(){t.dom.createTextRange&&(t.dom.caretPos=document.selection.createRange().duplicate())};return e.core.evt.addEvent(t.dom,"keyup",n),e.core.evt.addEvent(t.dom,"focus",n),e.core.evt.addEvent(t.dom,"click",n),e.core.evt.addEvent(t.dom,"select",n),a.action=function(e,n,c){return l(t.dom,e,n,c),a},a}})});