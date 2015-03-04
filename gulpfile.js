'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var browserSync = require('browser-sync');

gulp.task('jshint', function() {
    log('Analyzing source with JSHint');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('less-watcher', function() {
    gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        //.pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.app));
});

//gulp.task('inject', ['wiredep', 'styles'], function() {
//    log('Wire up the app css into the html, and call wiredep ');
//
//    return gulp
//        .src(config.index)
//        //.pipe($.inject(gulp.src(config.css, {read: false}), {ignorePath: '/app/', addRootSlash: false}))
//        .pipe($.inject(gulp.src(config.css)))
//        .pipe(gulp.dest(config.app));
//});

gulp.task('serve-dev', ['wiredep', 'styles'], function() {
    return startBrowserSync();
    //var isDev = true;
    //
    //var nodeOptions = {
    //    script: config.nodeServer,
    //    delayTime: 1,
    //    env: {
    //        'PORT': port,
    //        'NODE_ENV': isDev ? 'dev' : 'build'
    //    },
    //    watch: [config.server]
    //};
    //
    //return $.nodemon(nodeOptions)
    //    .on('restart', function(ev) {
    //        log('*** nodemon restarted');
    //        log('files changed on restart:\n' + ev);
    //        setTimeout(function() {
    //            browserSync.notify('reloading now ...');
    //            browserSync.reload({stream: false});
    //        }, config.browserReloadDelay);
    //    })
    //    .on('start', function() {
    //        log('*** nodemon started');
    //        startBrowserSync();
    //    })
    //    .on('crash', function() {
    //        log('*** nodemon crashed: script crashed for some reason');
    //    })
    //    .on('exit', function() {
    //        log('*** nodemon exited cleanly');
    //    });
});

////////////

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + config.port);

    gulp.watch([config.less], ['styles'])
        .on('change', function(event) { changeEvent(event); });

    var options = {
        server: {
            baseDir: "./app"
        },
        files: [
            config.app + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
