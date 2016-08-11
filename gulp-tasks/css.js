/**
 * Created by Yi on 16/8/10.
 */

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

var gulp = require('gulp')
var postcss = require('gulp-postcss')
var gulp_posthtml = require('gulp-posthtml')
var gulp_uncss = require('gulp-uncss')
var gulp_md5_plus = require('gulp-md5-plus')
var gulp_concat = require('gulp-concat')

var postcss_modules = require('postcss-modules')
var posthtml_css_modules = require('posthtml-css-modules')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')


gulp.task('css:modules', ['css:modules:json'], function () {
    var htmlList = fs.readdirSync(static_build_html)
    for (var i = 0; i < htmlList.length; i++) {
        var filename = htmlList[i]
        gulp.src(path.resolve(static_build_html, filename))
            .pipe(gulp_posthtml([posthtml_css_modules(path.resolve(static_build_json, filename.split('.')[0] + '.json'))]))
            .on('error', function (err) {
                console.error(err)
            })
            .pipe(gulp.dest(static_build_html));
    }
})

gulp.task('css:global', function(){
    var processors = [autoprefixer()]
    return gulp.src(path.resolve(static_src_css, 'common/*.css'))
        .pipe(postcss(processors))
        .pipe(gulp_concat('common.css'))
        .pipe(gulp.dest(path.resolve(static_build_css, 'common')))
})

gulp.task('css:uncss', function () {
    var htmlList = getHtmlFileList(static_build_html)

    for (var i = 0; i < htmlList.length; i++) {
        var filename = htmlList[i].split('.')[0]
        gulp.src(path.resolve(static_build_css, filename + '.css'))
            .pipe(gulp_uncss({html: [path.resolve(static_build_html, filename + '.html')]}))
            .pipe(gulp.dest(static_build_css))
    }
})

gulp.task('css:optimize', function(){
    var processors = [
        autoprefixer(), cssnano()
    ]
    return gulp.src(path.resolve(static_build_css, '*.css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest(static_build_css))
})


gulp.task('css:modules:json', function () {
    var processors = [
        postcss_modules({
            generateScopedName: '[name]__[local]__[hash:base64:5]',
            getJSON: function (cssFileName, json) {
                var cssName = path.basename(cssFileName, '.css');

                var jsonFileName = path.resolve(static_build_json, cssName + '.json');
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