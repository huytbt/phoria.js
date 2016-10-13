var gulp = require('gulp');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var config = {
  entry: [
    './scripts/gl-matrix.js',
    './scripts/phoria-util.js',
    './scripts/phoria-entity.js',
    './scripts/phoria-scene.js',
    './scripts/phoria-renderer.js',
    './scripts/exports.js'
  ],
  outputFile: 'index.js',
  outputDir: './dist/'
};

// clean the output directory
gulp.task('clean', (cb) => {
  rimraf(config.outputDir, cb);
});

var bundler;
var getBundler = () => {
  if (!bundler) {
    bundler = gulp.src(config.entry);
  }
  return bundler;
};

var bundle = () => {
  return getBundler()
    .pipe(uglify())
    .pipe(concat(config.outputFile))
    .pipe(gulp.dest(config.outputDir));
};

gulp.task('build-persistent', ['clean'], () => {
  return bundle();
});

gulp.task('build', ['build-persistent'], () => {
  process.exit(0); // eslint-disable-line
});
