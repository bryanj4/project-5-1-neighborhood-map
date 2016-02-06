// Copied gulpfile.js from JohnMav for his Gulp Workflow tutorial https://discussions.udacity.com/t/gulp-and-setting-up-a-gulp-workflow-intermediate/24359
// I did modify some of the code to get css minification

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concatify = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    imageop = require('gulp-image-optimization'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    inject = require('gulp-inject'),
    cheerio = require('gulp-cheerio'),
    minifyhtml = require('gulp-minify-html');

// Paths to various files
var paths = {
    scripts: ['js/*.js','bower_components/jquery/dist/jquery.js'],
    styles: ['scss/style.scss','scss/styles/*.scss'],
    images: ['image/**/*'],
    icons: ['src/img/icons/*.svg'],
    content: ['index.html']
};

// Compiles scss files and outputs them to build/css/*.css
gulp.task('styles', function(){
    return gulp.src(paths.stylesheets)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./build/css'));
});

// Compiles scss files and outputs them to build/css/*.min.css
/*gulp.task('stylesMin', function () {
    return gulp.src(paths.stylesheets)
                .pipe(sass({outputStyle: 'compressed'}).)
});*/

// Concats & minifies js files and outputs them to build/js/app.js
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concatify('app.js'))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build/js/'));
});

// Minifies our HTML files and outputs them to build/*.html
gulp.task('content', function() {
    return gulp.src(paths.content)
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('./build'));
});

// Optimizes our image files and outputs them to build/image/*
gulp.task('images', function() {
    return gulp.src(paths.images)
                .pipe(imageop({
                    optimizationLevel: 5
                }))
                .pipe(gulp.dest('./build/image'));
});


//Optimizes and inlines SVG images for manipulation
gulp.task('svgstore', function(){
    var svgs = gulp.src(paths.icons)
                    .pipe(cheerio({
                        run: function($) {
                            $('[fill]').removeAttr('fill');
                            $('path').addClass('social-icon-path');
                        },
                        parserOptions: { xmlMode: true}
                    }))
                    .pipe(svgmin())
                    .pipe(svgstore({inlineSvg: true}));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp.src(paths.content)
                .pipe(inject(svgs, { transform: fileContents }))
                .pipe(gulp.dest('build'));
});

// Watches for changes to our files and executes required scripts
gulp.task('scss-watch', ['styles'], browserSync.reload);
gulp.task('content-watch', ['svgstore','content'], browserSync.reload);
gulp.task('image-watch', ['images', 'svgstore'], browserSync.reload);
gulp.task('script-watch', ['scripts'], browserSync.reload);

// Launches a test webserver
gulp.task('browse', function(){
    browserSync({
        port: 3030,
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch(paths.scripts, ['script-watch']);
    gulp.watch(paths.stylesheets, ['scss-watch']);
    gulp.watch(paths.content, ['content-watch']);
    gulp.watch(paths.images, ['image-watch']);
    gulp.watch(paths.icons, ['image-watch']);
});

gulp.task('serve', ['scripts', 'styles','images', 'svgstore', 'content', 'browse']);