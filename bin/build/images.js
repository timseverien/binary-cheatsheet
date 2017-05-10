const imagemin = require('gulp-imagemin');
const optmizeJpg = require('imagemin-jpegtran');

const OPTIONS_IMAGEMIN = {
  plugins: [
    optmizeJpg(),
  ],
};

module.exports = (gulp, config) => () => {
	return gulp.src(config.paths.images.source)
    .pipe(imagemin(OPTIONS_IMAGEMIN))
		.pipe(gulp.dest(config.paths.images.destination));
};
