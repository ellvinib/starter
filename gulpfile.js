var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    ts=  require('gulp-typescript'),
    livereload = require('gulp-livereload'),
    inject = require('gulp-inject'),
    connect = require('gulp-connect');
    

//---- DEV PART -----
gulp.task('styles.dev', function() {
  return gulp.src('app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('.tmp'))
    .pipe(notify({ message: 'Styles dev task complete' }))
    .pipe(livereload());
});

gulp.task('scripts.dev', function() {
  return gulp.src('app/**/*.ts')
		.pipe(ts({
			declaration: true,
			noExternalResolve: true
		}))
		.pipe(gulp.dest('.tmp'));
});

gulp.task('index.dev', function () {
  // The file where to inject  
  var target = gulp.src('app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['.tmp/**/*.js', '.tmp/**/*.css'], {read: false});

  return target.pipe(inject(sources,{
                ignorePath: '.tmp',
                addRootSlash: false
            }))
   .pipe(gulp.dest('./app'));
});

gulp.task('webserver.dev', function() {
  connect.server({
    root: ['app', '.tmp'],
    open:true,
    livereload: true
  });
});



gulp.task('watch.dev',['styles.dev','scripts.dev','index.dev'], function() {});