/**
 * Created by Yi on 16/8/11.
 */

var gulp = require('gulp')
var gulp_md5_plus = require('gulp-md5-plus')


gulp.task('md5:css', function () {
    return gulp.src(['static-build/css/*.css'])
        .pipe(gulp_md5_plus(10, 'static-build/html/*.html'))
        .pipe(gulp.dest('static-build/css'))
})

gulp.task('md5:image', function () {
    return gulp.src('static-build/image/**/*.jpg')
        .pipe(gulp_md5_plus(10, 'static-build/html/*.html'))
        .pipe(gulp.dest('static-build/image'))
})

gulp.task('md5', ['md5:image', 'md5:css'])