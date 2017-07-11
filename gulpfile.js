const gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify'),
    nodemon = require('gulp-nodemon'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

const environment = process.env.NODE_ENV || 'production';
const webpackConfig = require('./webpack.config.js');
const config = webpackConfig[environment];

gulp.task('webpack-watch', function() {
  config.watch = true;
  return gulp.src('src/index.js')
             .pipe(notify('Watching Webpack Build'))
             .pipe(webpackStream(config, webpack))
             .pipe(gulp.dest('./public/js'))
             .pipe(notify('Webpack Build Finished'));
             // make sure webpack stream uses webpack-3
});

gulp.task('assets-watch', function() {
  gulp.watch('./src/styles/**/*', ['sass']);
  gulp.watch('./src/images/*', ['images']);
});

gulp.task('sass', function() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
       browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function() {
  return gulp.src('./src/images')
    .pipe(imagemin({
       progressive: true,
       svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('dev-env', function() {
  return process.env.NODE_ENV = 'development';
});

gulp.task('prod-env', function() {
  return process.env.NODE_ENV = 'production';
});

gulp.task('run', function() {
  const forbidden = ['node_modules', 'public', 'src'];
  nodemon({
    script: './server/app.js',
    ext: 'js',
    ignore: forbidden
  });
});

gulp.task('default', ['webpack-watch', 'assets-watch', 'dev-env', 'run']);