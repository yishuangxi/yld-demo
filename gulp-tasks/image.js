/**
 * Created by Yi on 16/8/10.
 */
var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var postcss = require('gulp-postcss')

var static_build = 'static'

gulp.task('image', function(){
    gulp.src('static-src/image/**/*.jpg')
        .pipe(gulp.dest(path.resolve(static_build, 'image')))
})