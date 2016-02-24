var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    lr = require('tiny-lr')(),
    express = require('express'),
    connectReload = require('connect-livereload'),
    livereload = require('gulp-livereload');
    
    //config
    var EXPRESS_PORT = 4000;
    var EXPRESS_ROOT = '.';
    var LIVERELOAD_PORT = 35730;

 
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
        .pipe(livereload());
    });

gulp.task('styles', function() {
  return gulp.src('./app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

gulp.task('express', function() {
  //start live reload
  //lr.listen(LIVERELOAD_PORT);
  //sart express  
  var app = express();
 // app.use(livereload.listen());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT, '0.0.0.0');
});

gulp.task('watch', function() {

  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/*.ts', ['scripts']);
   watch(distPath).pipe(connect.reload());
});

gulp.task('default', ['express', 'watch'], function() {

});