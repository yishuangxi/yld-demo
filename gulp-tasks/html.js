/**
 * Created by Yi on 16/8/10.
 */
var path = require('path')
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var gulp_file_include = require('gulp-file-include')

var static_src = 'static-src'
var static_build = 'static'
var static_tmp = 'static-tmp'
var static_build_html = path.resolve(static_build, 'html')
var static_build_css = path.resolve(static_build, 'css')
var static_build_js = path.resolve(static_build, 'js')
var static_build_json = path.resolve(static_build, 'json')
var static_build_image = path.resolve(static_build, 'image')


var static_tmp = 'static-tmp'
gulp.task('html:include', function () {
    return gulp.src(static_src + '/html/*.html')
        .pipe(gulp_file_include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(static_build + '/html'))
})

