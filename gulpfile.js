var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffeelint = require('gulp-coffeelint'),
	coffee = require('gulp-coffee'),
	less = require('gulp-less'),
	minifycss = require('gulp-minify-css'),
	path = require('path'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('coffeelint', function() {
	gulp.src('./coffeescript/**/*.coffee')
		.pipe(coffeelint())
		.pipe(coffeelint.reporter());
});

gulp.task('coffee', function() {
	gulp.src('./coffeescript/**/*.coffee')
		.pipe(coffee({ bare: true }).on('error', gutil.log))
		.pipe(gulp.dest('./'));
});

gulp.task('less', function() {
	gulp.src('./less/style.less')
		.pipe(less())
		.pipe(minifycss())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('lint', function() {
	gulp.src(['Gruntfile.js', 'routes/*.js', 'public/**/*.js', '!public/js/libs/**/*.js', '!public/js/build.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
	gulp.watch('./coffeescript/**/*.coffee', ['coffeelint', 'coffee']);
	gulp.watch('./less/**/*.less', ['less']);
	gulp.watch(['Gruntfile.js', 'routes/*.js', 'public/**/*.js', '!public/js/libs/**/*.js', '!public/js/build.js'], ['lint']);
});

gulp.task('build', function() {
	gulp.src(['!public/js/libs/*.js', '!public/js/build.js', 'public/js/**/*.js'])
		.pipe(concat('build.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});