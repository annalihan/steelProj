steel.d("utils/kit/dom/autoHeightTextArea",[],function(t,e,i){STK.register("utils.kit.dom.autoHeightTextArea",function(t){var e=function(e){var i,a=t.core.dom.getStyle;if(e.defaultHeight||(e.defaultHeight=parseInt(a(e,"height"),10)||parseInt(e.offsetHeight,10)||20),t.core.util.browser.IE)i=Math.max(e.scrollHeight,e.defaultHeight);else{var n=t.E("_____textarea_____");if(n||(n=t.C("textarea"),n.id="_____textarea_____",document.body.appendChild(n)),n.currentTarget!=e){var o=[];o.push("width:"+a(e,"width")),o.push("font-size:"+a(e,"fontSize")),o.push("font-family:"+a(e,"fontFamily")),o.push("line-height:"+a(e,"lineHeight")),o.push("padding-left:"+a(e,"paddingLeft")),o.push("padding-right:"+a(e,"paddingRight")),o.push("padding-top:"+a(e,"paddingTop")),o.push("padding-bottom:"+a(e,"paddingBottom")),o.push("top:-1000px"),o.push("height:0px"),o.push("position:absolute"),o.push("overflow:hidden"),o.push(""),o=o.join(";"),n.style.cssText=o}n.value=e.value,i=Math.max(n.scrollHeight,e.defaultHeight),n.currentTarget=e}return i};return function(i){var a,n=i.textArea,o=i.maxHeight,d=i.inputListener,h=n.style;if((a=function(){"function"==typeof d&&d(),setTimeout(function(){var t,i=e(n);o=o||i;var a=i>o;t=a?o:i,h.overflowY=a?"auto":"hidden",h.height=Math.min(o,i)+"px"},0)})(),!t.core.util.browser.IE)try{}catch(u){t.log(u)}n.binded||(t.addEvent(n,"keyup",a),t.addEvent(n,"focus",a),t.addEvent(n,"blur",a),n.binded=!0,n.style.overflow="hidden")}})});