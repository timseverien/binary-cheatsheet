const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassGlobbing = require('node-sass-globbing');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const OPTIONS_POSTCSS = [
	autoprefixer(),
	cssnano(),
];

module.exports = (gulp, config) => () => {
	const OPTIONS_SASS = {
		importer: sassGlobbing,
		includePaths: [
			config.paths.modules,
		],
	};

	return gulp.src(config.paths.styles.source)
		.pipe(sass(OPTIONS_SASS))
		.pipe(postcss(OPTIONS_POSTCSS))
		.pipe(gulp.dest(config.paths.styles.destination));
};
