const path = require('path');
const gulp = require('gulp');

const DIR_SOURCE = path.resolve('src');
const DIR_DESTINATION = path.resolve('docs');
const DIR_TASKS = path.resolve('bin', 'build');

const config = {
	browserSync: require('browser-sync').create(),
	paths: {
		clean: DIR_DESTINATION,
		modules: path.join(__dirname, 'node_modules'),
		images: {
			source: path.join(DIR_SOURCE, 'images', '**', '*.{gif,jpg,png,svg}'),
			destination: path.join(DIR_DESTINATION, 'assets', 'images'),
		},
		styles: {
			source: path.join(DIR_SOURCE, 'styles', '**', '*.scss'),
			destination: path.join(DIR_DESTINATION, 'assets', 'styles'),
		},
		views: {
			all: path.join(DIR_SOURCE, 'views', '**', '*.html'),
			partials: path.join(DIR_SOURCE, 'views', 'partials'),
			source: path.join(DIR_SOURCE, 'views', '*.html'),
			destination: DIR_DESTINATION,
		},
	},
};

gulp.task('clean', require(path.join(DIR_TASKS, 'clean'))(gulp, config));
gulp.task('images', require(path.join(DIR_TASKS, 'images'))(gulp, config));
gulp.task('styles', require(path.join(DIR_TASKS, 'styles'))(gulp, config));
gulp.task('views', require(path.join(DIR_TASKS, 'views'))(gulp, config));
gulp.task('sync', require(path.join(DIR_TASKS, 'sync'))(gulp, config));

gulp.task('default', gulp.series('clean', gulp.parallel('images', 'styles'), 'views'));
gulp.task('watch', require(path.join(DIR_TASKS, 'watch'))(gulp, config));
