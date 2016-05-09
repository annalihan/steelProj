/**
 * @author xp | xiongping1@staff.sina.com.cn
 * 让节点所有浏览器都能够执行onpropertychange事件
 */
STK.register('utils.kit.extra.propertyChange',function($){
	//判断改变属性方法事件是否能够被执行
	var checkMethodSupport = function(methodName){
		var tempNode = $.C('DIV');
		document.body.appendChild(tempNode);
		var result = false;
		var listener = function(){
			result = true;
		};
		$.addEvent(tempNode,methodName,listener)
		tempNode.setAttribute("___TEMP___", true);
		tempNode.removeAttribute("___TEMP___");
		$.removeEvent(tempNode,methodName,listener);
		document.body.removeChild(tempNode);
		return result;
	}
	var supportProChange = checkMethodSupport('propertychange'),supportModify = checkMethodSupport('DOMAttrModified')
	if(!supportProChange && !supportModify){ //不支持porpertychange和DOMAttrModified的情况下
		HTMLPRO = HTMLElement.prototype;
		HTMLPRO.__setAttribute = HTMLPRO.setAttribute;
		HTMLPRO.__removeAttribute = HTMLPRO.removeAttribute;
		HTMLPRO.setAttribute = function(attrName, newVal){
			var prevVal = this.getAttribute(attrName);
			this.__setAttribute(attrName, newVal);
			newVal = this.getAttribute(attrName);
			if (newVal != prevVal){
				var evt = document.createEvent("MutationEvent");
				evt.initMutationEvent(
				"DOMAttrModified",
				true,
				false,
				this,
				prevVal || "",
				newVal || "",
				attrName,
				(prevVal == null) ? evt.ADDITION : evt.MODIFICATION
				);
				this.dispatchEvent(evt);
			}
		}
		HTMLPRO.removeAttribute = function(attrName){
			var prevVal = this.getAttribute(attrName);
			this.__removeAttribute(attrName);
			var evt = document.createEvent("MutationEvent");
			evt.initMutationEvent(
			"DOMAttrModified",
			true,
			false,
			this,
			prevVal,
			"",
			attrName,
			evt.REMOVAL
			);
			this.dispatchEvent(evt);
		}
	}
	return function(node){
		var that = {}
		var handler = {}
		
		that.bind = function(func){
			var key = $.core.util.getUniqueKey();
			handler[key] = function(e){
				func({
					'attrName': e.propertyName
				});
			}
			if(supportProChange){
				$.addEvent(node,'propertychange',handler[key])
			}else{ //支持DOMAttrModified事件
				$.addEvent(node,"DOMAttrModified",handler[key])
			}
			return key;
		}
		that.unBind = function(key){
			if(supportProChange){
				$.removeEvent(node,'propertychange',handler[key])
			}else{ //支持DOMAttrModified事件
				$.removeEvent(node,"DOMAttrModified",handler[key])
			}
			delete handler[key];
			return that;
		}
		return that;
	}
})
