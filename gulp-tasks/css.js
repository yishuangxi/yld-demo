/**
 * Created by Yi on 16/8/10.
 */

var path = require('path')
var fs = require('fs')
var static_src = 'static-src'
var static_build = 'static-build'
var static_tmp = 'static-tmp'
var static_build_html = path.resolve(static_build, 'html')
var static_build_css = path.resolve(static_build, 'css')
var static_build_js = path.resolve(static_build, 'js')

var gulp = require('gulp')
var postcss = require('gulp-postcss')
var gulp_posthtml = require('gulp-posthtml')
var gulp_uncss = require('gulp-uncss')
var postcss_modules = require('postcss-modules')
var posthtml_css_modules = require('posthtml-css-modules')


gulp.task('css:modules', ['css:modules:json'], function () {
    var htmlList = fs.readdirSync(static_build + '/html')
    for (var i = 0; i < htmlList.length; i++) {
        var filename = htmlList[i]
        gulp.src(static_build + '/html/' + filename)
            .pipe(gulp_posthtml([posthtml_css_modules(static_build + '/json/' + filename.split('.')[0] + '.json')]))
            .on('error', function (err) {
                console.error(err)
            })
            .pipe(gulp.dest(static_build + '/html'));
    }
})

gulp.task('css:uncss', function () {
    var htmlList = getHtmlFileList(static_build_html)

    for (var i = 0; i < htmlList.length; i++) {
        var filename = htmlList[i].split('.')[0]
        console.log(filename)
        gulp.src(path.resolve(static_build_css, filename + '.css'))
            .pipe(gulp_uncss({html: [path.resolve(static_build_html, filename + '.html')]}))
            .pipe(gulp.dest(static_build_css))
    }
})

gulp.task('css:modules:json', function () {
    var processors = [
        postcss_modules({
            generateScopedName: '[name]__[local]__[hash:base64:5]',
            getJSON: function (cssFileName, json) {
                var cssName = path.basename(cssFileName, '.css');

                var jsonFileName = path.resolve(static_build + '/json/', cssName + '.json');
                fs.writeFileSync(jsonFileName, JSON.stringify(json));
            }
        })
    ]

    return gulp.src(static_src + '/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(static_build + '/css'))
})

function getHtmlFileList(dir) {
    var fs = fs || require('fs')
    return fs.readdirSync(dir)
}