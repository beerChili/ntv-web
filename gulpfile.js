'use strict'

const gulp = require('gulp'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename')


gulp.task('js', () => {
    browserify({
            entries: './src/app/app.js',
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // .pipe(ngAnnotate())
        // .pipe(uglify())
        // .on('error', gutil.log)
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('html', () => {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('dist/'))
})

gulp.task('css', () => {
    const cssFiles = ['./node_modules/nouislider/distribute/nouislider.min.css',
    './node_modules/ng-dialog/css/ngDialog.min.css',
    './node_modules/ng-dialog/css/ngDialog-theme-plain.min.css',
     './src/styles.css']

    gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('build', ['js', 'html', 'css'])
