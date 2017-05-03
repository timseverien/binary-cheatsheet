module.exports = (gulp, config) => (done) => {
  config.browserSync.init({
    server: {
      baseDir: './docs',
    },
  }, done);
};
