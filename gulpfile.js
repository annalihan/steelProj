/**
 * steel gulpfile
 * author: @Finrila finrila@gmail.com
 */

var path = require('path');
var gulp = require('gulp');
var jade = require('jade');
var del = require('del');
var merge2 = require('merge2');
var $ = require('gulp-load-plugins')();
var react = require('gulp-react');
var gutil = require('gulp-util');
var port = 8101;
// var port = 80;

var build_path = 'build/';
var cssfix_filter = {
        prefix: false,
        filter: ["components/**/*.*"]
    };

var pathnamePrefix = '/t6/business/';
var back_pathnamePrefix = '/';
var src_base = 'src/';
var front_base = 'server_front';
var front_hostname = '127.0.0.1 js.t.sinajs.cn img.t.sinajs.cn ';
var back_base = 'server_back'; //模拟后端的文件放置目录
var back_hostname = '127.0.0.1 e.weibo.com'; //后端的HOST，目的是真实模拟后端的页面路由请求，提供出前端可仿真的功能，比如 /index 对应 /html/index.html

var steelDebugConfig = ';steel.config({debug: true});';

gulp.task('default', function() {
    console.log('支持命令列表:');
    console.log(' gulp debug');
    console.log('   调试处理：对src目录文件进行debug处理，生成调试代码，包括模板处理、脚本wrap和合并、静态文件copy等');
    console.log(' gulp dist');
    console.log('   仿真处理：对src目录文件进行dist处理，生成仿真代码，除做debug中的处理外，还有css压缩合并');
    console.log(' gulp build');
    console.log('   上线处理：生成上线文件,会把可上线的结果处理了build目录下');
    console.log(' gulp server');
    console.log('   启动调试服务器命令 --dist 为仿真服务器 --pm2 为使服务后台运行(win下无效)');
    console.log('   gulp serverStop');
    console.log('       关闭服务器命令 当存在后台服务时有效');
});
//暴露命令相关=======================

gulp.task('debug', function() {
    del([front_base + '/*'], function() {
        dealSrc(true).pipe(gulp.dest(front_base));
    });
});

gulp.task('dist', function() {
    del([front_base + '/*'], function() {
        dealSrc(false).pipe(gulp.dest(front_base));
    });
});

gulp.task('build', function() {
    del([build_path + '/*'], function() {
        dealSrc(false, {
            plumber: true
        }).pipe($.plumber.stop())
            .pipe(gulp.dest(build_path));
    });
});

gulp.task('server', function() {
    var isDebug = !$.util.env.dist;
    steelServer({
        debug: isDebug,
        pm2: !!$.util.env.pm2,
        tasks: isDebug ? ['debug', 'watchDebug'] : ['dist', 'watchDist']
    });
});

gulp.task('serverStop', function() {
    $.steelServer.stop();
});

//=================================


function dealSrc(isDebug, options) {
    //toDo 抽象成配置化的代码
    options = options || {};
    var src = options.src;
    var plumber = options.plumber;
    var srcOptions = {
        base: path.join(__dirname , src_base)
    };
    var htmlJadeFilter = $.filter('**/*.html.jade', {restore: true});
    var jadeFilter = $.filter('**/*.jade', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var jsFilter = $.filter(['**/*.js', '!lib/**/*.js'], {restore: true});
    var lib_concats = {
        'lib/lib.js': ['lib/steel.js', 'lib/theia.js', 'lib/seer.js', 'lib/debugConfig.js']
        // 'lib/lib.js': ['lib/steel.js', 'lib/jquery2.js', 'lib/steelConfig.js', 'lib/adaptive.js'],
        // 'lib/lib_pc.js': ['lib/steel.js', 'lib/jquery1.js', 'lib/steelConfig.js']
    };
    var appendCodeToLib = isDebug ? steelDebugConfig : '';

    var result;
    if (src) {
        result = gulp.src(src.indexOf(src_base + 'lib/') === 0 ? (src_base + 'lib/**/*.*') : src, srcOptions);
    } else {
        result = gulp.src(src_base + '**/*.*', srcOptions);
    }
    if (plumber) {
        result = result.pipe($.plumber({
            errorHandler: function() {
                process.exit(1);
            }
        }));
    }
    //todo pipe 文件名的判断和报错
    //处理lib
    (function() {
        for (var concatTo in lib_concats) {
            result = merge2(
                result,
                gulp.src(lib_concats[concatTo].map(function(item) {
                        return src_base + item;
                    }), srcOptions)
                    .pipe($.concat(concatTo))
                    .pipe($.insert.append(appendCodeToLib))
            );
        }
    }());
    ////
    //处理builder的输出物 *.html.jade
    result = result.pipe(htmlJadeFilter)
        .pipe($.jade({
              jade: jade,
              pretty: true
            }).on('error', $.util.log))
        .pipe($.rename(function(path) {
            path.extname = '';
        }))
        .pipe(htmlJadeFilter.restore);
    //处理jade
    result = result.pipe(jadeFilter)
        .pipe($.jade({
                client: true,
                compileDebug: isDebug
            }).on('error', $.util.log))
        .pipe($.steelJadefnWrapCommonjs())
        .pipe(jadeFilter.restore);
    ////
    //处理css
    result = result.pipe(cssFilter)
        .pipe($.steelCssFix(cssfix_filter));
    if (!isDebug) {
        result = result.pipe($.minifyCss({
            compatibility: 'ie8'
        }));
    }
    result = result.pipe(cssFilter.restore);
    ////
    // return result;
    //处理js
    result = result.pipe(jsFilter).pipe(react()).on('error', $.util.log)
        .pipe($.steelWrapAmd());
    if (!isDebug) {
        result = result.pipe($.steelAmdConcat())
            .pipe($.uglify());
    }
    result = result.pipe(jsFilter.restore);
    ////

    //dist 时 去掉 以_开着的目录及下面的和以_开头的文件
    return result;
}

//=================================
//文件监听相关=======================
//toDo 优化性能
gulp.task('watchDebug', function() {
    gulp.watch(src_base + '**/*').on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ':');
        var filePath = path.relative(__dirname, event.path);
        if (event.type !== 'deleted') {
            dealSrc(true, {
                src: filePath
            }).pipe(gulp.dest(front_base));
        } else {
            del(path.join(front_base, path.relative(src_base, filePath)));
        }
        console.log('deal', filePath);
    });
});

gulp.task('watchDist', function() {
    gulp.watch(src_base + '**/*').on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('dist');
    });
});
//=================================

//服务器相关=======================
function steelServer(options) {
    $.steelServer({
        port: port,
        pathnamePrefix: pathnamePrefix,
        back_pathnamePrefix: back_pathnamePrefix,
        front_base: front_base,
        front_hostname: front_hostname, //前端的HOST
        back_base: back_base, //模拟后端的文件放置目录
        back_hostname: back_hostname, //后端的HOST，目的是真实模拟后端的页面路由请求，提供出前端可仿真的功能，比如 /index 对应 /html/index.html
        gzip: !options.debug,
        access_control_allow: true,
        staticProxy: {
            'dss-backend.sc.weibo.com/*': '127.0.0.1:8700',
            'img*.t.sinajs.cn/*': 'js3.t.sinajs.cn',
            'js.t.sinajs.cn/*': 'js3.t.sinajs.cn'
        },
        pm2: options.pm2,
        tasks: options.tasks
    });
}
//=================================
