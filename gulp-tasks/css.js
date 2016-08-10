/**
 * Created by Yi on 16/8/10.
 */

var path = require('path')
var fs = require('fs')
var static_src = 'static-src'
var static_build = 'static-build'
var static_tmp = 'static-tmp'

var gulp = require('gulp')
var postcss = require('gulp-postcss')
var gulp_posthtml = require('gulp-posthtml')
var postcss_modules = require('postcss-modules')
var posthtml_css_modules = require('posthtml-css-modules')

gulp.task('css:modules:json', function () {
    var processors = [
        postcss_modules({
            generateScopedName: '[name]__[local]__[hash:base64:5]',
            getJSON: function (cssFileName, json) {
                var cssName = path.basename(cssFileName, '.css');

                var jsonFileName = path.resolve(static_tmp + '/json/', cssName + '.json');
                fs.writeFileSync(jsonFileName, JSON.stringify(json));
            }
        })
    ]

    return gulp.src(static_src + '/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(static_build + '/css'))
})


gulp.task('css:modules', ['css:modules:json'], function(){
    var htmlList = fs.readdirSync(static_tmp + '/html')
    for (var i = 0; i < htmlList.length; i++) {
        var filename = htmlList[i]
        gulp.src(static_tmp + '/html/' + filename)
            .pipe(gulp_posthtml([posthtml_css_modules(static_tmp + '/json/' + filename.split('.')[0] + '.json')]))
            .pipe(gulp.dest(static_build + '/html'));
    }
})