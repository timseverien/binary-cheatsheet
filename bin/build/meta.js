module.exports = (gulp, config) => {
  return () => gulp.src(config.paths.meta.source)
    .pipe(gulp.dest(config.paths.meta.destination));
};
