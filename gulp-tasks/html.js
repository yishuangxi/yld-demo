/**
 * Created by Yi on 16/8/10.
 */
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var gulp_file_include = require('gulp-file-include')
var src_path = 'static-src'
var build_path = 'static-build'
gulp.task('html:include', function () {
    return gulp.src(src_path + '/html/*.html')
        .pipe(gulp_file_include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(build_path + '/html'))
})

