var gulp   = require('gulp');
var stylus = require('gulp-stylus');

var nib     = require('nib');
var axis    = require('axis');
var rupture = require('rupture');

var IS_PROD = (process.env.NODE_ENV === "production");

var stylusOptions = {
	use: [nib(), axis(), rupture()],
	compress: IS_PROD
}

gulp.task('css', cb=> {
	return (
		gulp.src('./src/style.styl')
			.pipe(stylus(stylusOptions))
			.pipe(gulp.dest('./public/css'))
	)
});

gulp.task('default', ['css', 'watch']);
gulp.task('build', ['css']);

gulp.task('watch', cb=> {
	gulp.watch('./src/css/**/*.styl', ['css']);
	
	console.log('Now watching for changes...')
	cb();
});