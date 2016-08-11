/**
 * Created by Yi on 16/8/11.
 */

var gulp = require('gulp')
var gulp_md5_plus = require('gulp-md5-plus')

var path = require('path')
var fs = require('fs')
var static_src = 'static-src'
var static_src_html = path.resolve(static_src, 'html')
var static_src_css = path.resolve(static_src, 'css')
var static_src_js = path.resolve(static_src, 'js')
var static_src_image = path.resolve(static_src, 'image')
var static_src_css = path.resolve(static_src, 'css')
var static_build = 'static'
var static_tmp = 'static-tmp'
var static_build_html = path.resolve(static_build, 'html')
var static_build_css = path.resolve(static_build, 'css')
var static_build_js = path.resolve(static_build, 'js')
var static_build_json = path.resolve(static_build, 'json')
var static_build_image = path.resolve(static_build, 'image')

gulp.task('md5:css', function () {
    return gulp.src([path.resolve(static_build_css, 'css/*.css')])
        .pipe(gulp_md5_plus(10, path.resolve(static_build_html, 'html/*.html')))
        .pipe(gulp.dest(path.resolve(static_build_css, 'css')))
})

gulp.task('md5:image', function () {
    return gulp.src(path.resove(static_build_image, '**/*.jpg'))
        .pipe(gulp_md5_plus(10, path.resove(static_build_html, '*.html')))
        .pipe(gulp.dest(static_build_image))
})

gulp.task('md5', ['md5:image', 'md5:css'])