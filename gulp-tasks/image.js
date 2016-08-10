/**
 * Created by Yi on 16/8/10.
 */
var gulp = require('gulp')
var postcss = require('gulp-postcss')

gulp.task('image', function(){
    gulp.src('static-src/image/**/*.jpg')
        .pipe(gulp.dest('static-build/image'))
})