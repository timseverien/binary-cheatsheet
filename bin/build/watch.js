module.exports = (gulp, config) => gulp.series('default', 'sync', () => {
	const reload = (done) => {
		config.browserSync.reload();
		done();
	};

	gulp.watch(config.paths.styles.source, gulp.series('styles', reload));
	gulp.watch(config.paths.images.source, gulp.series('images', reload));
	gulp.watch(config.paths.views.all, gulp.series('views', reload));
});
