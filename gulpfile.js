var gulp = require('gulp'),
	sass = require('gulp-sass',
	prefix = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	prettify = require('gulp-html-prettify'));

function requireUnchached( $module ) {
	delete require.chache[require.resolve( $module )];
	return require( $module );
}


gulp.task('styles', function(){
	gulp.src('app/sass/style.sass')
	.pipe(plumber())
	.pipe(sass({outputStyle: 'expanded'}))
	// .pipe(prefix())
	.pipe(gulp.dest('app/css/'))
});

gulp.task('views', function(){
	gulp.src('app/templates/*.pug')
	.pipe(plumber())
	.pipe(data(function(file){
		return require('./app/templates/data/data.json')
	}))
	.pipe(pug())
	.pipe(prettify({indent_char: ' ', indent_size: 2}))
	.pipe(gulp.dest('app/'))
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/templates/**/*.pug', ['views']);
	gulp.watch('app/templates/data/data.json', ['views']);
});

gulp.task('scripts', function(){
	gulp.src(['app/js/*.js', '!app/js/*.min.js'])
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('app/js/'))
});

gulp.task('default', ['styles', 'views', 'watch']);
gulp.task('final', ['scripts'])