/**
 * Created by Yi on 16/8/10.
 */

var gulp = require('gulp')
var gulp_clean = require('gulp-clean')
var gulp_sequence = require('gulp-sequence')

require('require-dir')('./gulp-tasks')


gulp.task('clean', function(){
    gulp.src(['static-tmp/html','static-tmp/css','static-tmp/js','static-tmp/json/*.json','static-build/html', 'static-build/js', 'static-build/css', 'static-build/image', 'static-build/json/*.json'], {read: false})
        .pipe(gulp_clean())
});

/*****
 * 1,合并html
 * 2,css模块化处理:加hash
 * 3,css sprite处理
 * 4,静态资源路径修改成绝对路径、添加hash(css中图片资源和html中js、css、图片加hash)
 */
gulp.task('default', gulp_sequence( 'html:include', 'css:modules', 'css:uncss', 'js', 'image', 'font'))

