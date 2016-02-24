var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    openResource = require('open'),
    wiredep = require('gulp-wiredep');

 
gulp.task('scripts', function() {
	var tsResult = gulp.src('app/*.ts')
					   .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
					   .pipe(ts({
						   sortOutput: true,
					   }));	
	return tsResult.js
		.pipe(concat('output.js')) // You can use other plugins that also support gulp-sourcemaps 
		.pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
		.pipe(gulp.dest('build/js'))
        .pipe(livereload());
    });

gulp.task('styles', function() {
  return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('build/'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});

gulp.task('images', function() {
  return gulp.src('.app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return del(['build/']);
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname));
  app.all('./*', function (req, res, next) {
        res.sendFile(join(__dirname, './build', 'index.html'));
    });
  app.listen(4000, function () {
        openResource('http://localhost:' + 4000);
    });
});

gulp.task('bower', function () {  
  gulp.src('./*.html')
  .pipe(wiredep({
    directory: './bower_components/',
    bowerJson: require('./bower.json'),
  })).pipe(gulp.dest('./'));
});


gulp.task('watch', function() {
  // Create LiveReload server
  livereload.listen();
  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/*.ts', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);

});

gulp.task('default', ['clean','bower'], function() {
    gulp.start('styles', 'scripts', 'images','watch');
    gulp.start('express');
});