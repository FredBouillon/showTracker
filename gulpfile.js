var gulp = require('gulp');
    connect = require('gulp-connect-multi')();

gulp.task('default', ['connect', 'watch']);

gulp.task('connect', connect.server({
    root: ['app'],
    livereload: true,
    port:3000,
    open: {
        browser: 'Google Chrome' // if not working OS X browser: 'Google Chrome'
    }
}));

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('app/**/*.js')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('app/**/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(['app/**/*.js'], ['js']);
    gulp.watch(['app/**/*.css'], ['css']);
});




