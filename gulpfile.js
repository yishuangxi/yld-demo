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

gulp.task('default', gulp_sequence( 'html:include', 'css:modules', 'js', 'image', 'font'))

