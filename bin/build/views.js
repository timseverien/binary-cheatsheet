const fs = require('fs');
const path = require('path');

const plumber = require('gulp-plumber');
const replace = require('gulp-replace');

const PATTERN_IMPORT_ABSOLUTE = /\{\{>\s*(.+?)\s*\}\}/gim;
const PATTERN_IMPORT_RELATIVE = /\{\{\s*(.+?)\s*\}\}/gim;

const getFileContents = (file) => {
		try {
			return fs.readFileSync(file);
		} catch (e) {
			return '';
		}
};

module.exports = (gulp, config) => {
	const replaceImportAbsolute = (match, partial) => {
		const file = path.join(config.paths.views.destination, partial);

		return getFileContents(file);
	};

	const replaceImportRelative = (match, partial) => {
		const file = path.join(config.paths.views.partials, `${partial}.html`);

		return getFileContents(file);
	};

	return gulp.series('styles', () => {
		return gulp.src(config.paths.views.source)
			.pipe(plumber())
			.pipe(replace(PATTERN_IMPORT_ABSOLUTE, replaceImportAbsolute))
			.pipe(replace(PATTERN_IMPORT_RELATIVE, replaceImportRelative))
			.pipe(gulp.dest(config.paths.views.destination));
	});
};
