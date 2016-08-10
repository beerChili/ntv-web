'use strict'

const gulp = require('gulp'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename')

gulp.task('clean', () =>
    gulp.src('./dist', {
        read: false
    })
    .pipe(clean())
)
gulp.task('js', ['clean'], () =>
    browserify({
        entries: './src/app/app.js',
        debug: gutil.env.env === 'dev'
    })
    .transform('babelify', {
        presets: ['es2015']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
        loadMaps: gutil.env.env === 'dev'
    }))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    // .on('error', gutil.log)
    .pipe(rename('bundle.js'))
    .pipe(gulpif(gutil.env.env === 'dev', sourcemaps.write('./')))
    .pipe(gulp.dest('dist/'))
)

gulp.task('html', ['clean'], () =>
    gulp.src('./src/index.html')
    .pipe(gulp.dest('dist/'))
)

gulp.task('css', ['clean'], () => {
    const cssFiles = ['./node_modules/nouislider/distribute/nouislider.min.css',
        './node_modules/ng-dialog/css/ngDialog.min.css',
        './node_modules/ng-dialog/css/ngDialog-theme-plain.min.css',
        './src/styles.css'
    ]

    return gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('build', ['clean', 'js', 'html', 'css'])
