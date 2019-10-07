const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const browserify = require('browserify')
const webpack = require('webpack-stream');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');
const terser = require('gulp-terser')
const rename = require('gulp-rename');
const size = require('gulp-size');

function style(){
  return gulp.src('./src/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
}

function img(){
  return gulp.src('./src/style/images/*.{png,jpeg,jpg,svg}')
    .pipe(gulp.dest('./public/images'))
}

function scripts(){

  var b = browserify({
    entries: './src/js/index.js',
    debug: true,
    transform: [babelify.configure({
      presets: ['@babel/preset-env']
    })]
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(terser())
      .on('error', util.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/'));
}


function watch(){
  browserSync.init({
    server : {
      baseDir : './'
    }
  });
  gulp.watch('./src/style/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/*.js', scripts).on('change', browserSync.reload)
  gulp.watch('.src/style/images/*.{png,jpeg,jpg,svg}', img)
}

exports.style = style;
exports.scripts = scripts
exports.watch = watch;
exports.img = img
