/**
 * Created by Yi on 16/8/10.
 */

var gulp = require('gulp')
var gulp_clean = require('gulp-clean')
var gulp_run_sequence = require('gulp-run-sequence')
var gulp_livereload = require('gulp-livereload')
var gulp_webserver = require('gulp-webserver')

require('require-dir')('./gulp-tasks')

gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(gulp_webserver({
            livereload: true,
            open:true
        }))
})

gulp.task('clean', function () {
    return gulp.src([
        'static/html',
        'static/js',
        'static/css',
        'static/image',
        'static/json/*.json'
    ], {read: false})
        .pipe(gulp_clean())
});

/*****
 * 1,合并html
 * 2,css模块化处理:加hash
 * 3,css sprite处理
 * 4,静态资源路径修改成绝对路径、添加hash(css中图片资源和html中js、css、图片加hash)
 */
gulp.task('build', function () {
    gulp_run_sequence(
        'clean',
        'html:include',
        'css:global',
        'css:modules',
        'css:uncss',
        'css:optimize',
        'js',
        'image',
        'font'
    )
})

gulp.task('watch', ['webserver'], function () {
    gulp.watch('static-src/**', ['build'])
})

