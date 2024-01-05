const { src, dest, watch, parallel, series } = require('gulp');

// Style
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const sass = gulpSass(dartSass);
const gcmq = require('gulp-group-css-media-queries');
const shorthand = require('gulp-shorthand');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

// HTML
const twig = require('gulp-twig');

function server() {
   return browserSync.init({
      server: {
         baseDir: "./dist"
      },
      notify: false,
   });
}

function styles() {
   return src('./app/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gcmq())
      .pipe(shorthand())
      .pipe(cleanCSS())
      .pipe(rename('style.min.css'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe(dest('./dist/css/'))
}

function styleVendors() {
   return src('./app/scss/vendors/**/*.scss')
      .pipe(sass())
      .pipe(dest('./dist/css'));
}

function html() {
   return src('./app/twig/*.twig')
      .pipe(twig())
      .pipe(browserSync.reload({ stream: true }))
      .pipe(dest('./dist'))
}

function js() {
   return src('./app/js/**/*.js').pipe(dest('./dist/js'))
}

function copyImages() {
   return src('./app/images/**/*')
      .pipe(dest('./dist/images'))
}

function copyFonts() {
   return src('./app/fonts/**/*')
      .pipe(dest('./dist/fonts'))
}

function updateDist() {
   return src('./dist', { read: false, allowEmpty: true }).pipe(clean())
}

function watcher() {
   watch(['./app/scss/**/*.scss', '!./app/scss/vendors'], styles);
   watch('./app/scss/vendors', styleVendors);
   watch('./app/twig/**/*.twig', html);
   watch('./app/js/**/*.js', js);
   watch('./app/images/**/*.js', copyImages);
   watch('./app/fonts/**/*.js', copyFonts);
}

exports.default = series(
   updateDist,
   copyImages,
   parallel(
      server,
      watcher,
      styles,
      styleVendors,
      html,
      js,
      copyFonts,
   )
);