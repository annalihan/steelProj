;/**
 * pre monitor and logging module, add this in header to catch
 * global error in window
 * @author MrGalaxyn
 */
(function(global) {
    var start = new Date().getTime();
    var bee = {
        logs: [],
        timings: [],
        errors: [],
        pageLoaded: -1,
        domLoaded: -1,
        // store the log, we'll deal with it later
        log: function(msg, lv) {
            bee.logs.push({a:arguments, t: now() - start});
        },
        timing: function(name, time){
            bee.timings.push({n:name, t: (time || now())});
        },
        info: function(msg) { bee.log(msg, 'i'); },
        warn: function(msg) { bee.log(msg, 'w'); },
        error: function(msg) { bee.log(msg, 'e'); }
    };
    var addListener = function(el, type, fn) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + type, fn);
        }
    };
    var now = (function() {
        try {
            if("performance" in window && window.performance && window.performance.now) {
                return function() {
                    return Math.round(window.performance.now() + window.performance.timing.navigationStart);
                };
            }
        }
        catch(ignore) { }
        return Date.now || function() { return new Date().getTime(); };
    }());
    var pageReady = function() { bee.pageLoaded = now(); };
    var domLoaded = function() { bee.domLoaded = now(); };

    // we store domcontentLoaded and load event trigger time
    addListener(window, "DOMContentLoaded", domLoaded);
    if(window.onpagehide || window.onpagehide === null) {
        addListener(window, "pageshow", pageReady);
    } else {
       addListener(window, "load", pageReady);
    }
    // store the error, we'll deal with it later
    window.onerror = function(message, file, line, column) {
        bee.errors.push({
            a: [{
                message: message,
                fileName: file,
                lineNumber: line || 0,
                columnNumber: column || 0
            }, "win.err"],
            t: now() - start
        });
        return false;
    };
    
    bee.start = start;
    global.bee = bee;
    bee.end = now();
    
})(window);

