/**
 * Created by Yi on 16/8/10.
 */
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var gulp_file_include = require('gulp-file-include')
var static_src = 'static-src'
var static_build = 'static-build'
var static_tmp = 'static-tmp'
gulp.task('html:include', function () {
    return gulp.src(static_src + '/html/*.html')
        .pipe(gulp_file_include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(static_build + '/html'))
})

