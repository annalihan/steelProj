steel.d("utils/kit/io/postMessage", [],function(require, exports, module) {
STK.register('utils.kit.io.postMessage', function($){
	var newKey = function(){
		return +new Date();
	};
	var genPostMessage = function(targetWindow, nameWindow){
		var that = {};
		var infoKey = null;
		var regList = []
		var fire = function(msg){
			for(var i = 0, len = regList.length; i < len; i += 1){
				try{
					regList[i](msg);
				}catch(exp){}
			}
		};
		var checkInfo = function(){
			if(nameWindow.name){
				
				var info = nameWindow.name.split('|');
				if(info[0] !== infoKey){
					infoKey = info[0];
					info.shift();
					fire(info.join('|'));
				}
			}
		};
		var handler = null;
		that.post = function(msg){
			if(targetWindow.postMessage){
				targetWindow.postMessage(msg, '*');
			}else{
				checkInfo();
				var nk = newKey();
				nameWindow.name = nk + '|' + msg;
				infoKey = nk;
			}
		};
		that.reg = function(fn){
			regList.push(fn);
			if(!targetWindow.postMessage && !handler){
				handler = setInterval(function(){
					checkInfo();
				},100);
			}
		};
		that.unreg = function(fn){
			$.core.arr.foreach(regList, function(f, i){
				if(fn === f){
					regList[i] = undefined;
				}
			});
			regList = $.core.arr.clear(regList);
		};
		that.destroy = function(){
			regList = [];
			clearInterval(handler);
		};
		$.addEvent(window, 'message', function(e){
			fire(e.data);
		});
		return that;
	};
	return {
		'inner' : function(){
			return genPostMessage(window.parent, window);
		},
		'outer' : function(frameWindow){
			return genPostMessage(frameWindow, frameWindow);
		},
		'general' : genPostMessage
	};
});
});