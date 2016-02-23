var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

 
gulp.task('scripts', function() {
	var tsResult = gulp.src('app/*.ts')
					   .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
					   .pipe(ts({
						   sortOutput: true,
					   }));
	
	return tsResult.js
		.pipe(concat('output.js')) // You can use other plugins that also support gulp-sourcemaps 
		.pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
		.pipe(gulp.dest('release/js'))
    });

gulp.task('styles', function() {
  return sass('app/', { style: 'expanded' })
    .pipe(gulp.dest('build/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/'));
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});


gulp.task('watch', function() {
  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/*.ts', ['scripts']);
});

gulp.task('default', ['express', 'watch'], function() {

});