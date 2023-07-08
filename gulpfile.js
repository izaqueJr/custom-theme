const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const ts = require('gulp-typescript');
const flatten = require('gulp-flatten');

// Task to compile TypeScript files
gulp.task('compile-ts', function () {
  const tsProject = ts.createProject('tsconfig.json');
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(flatten()) // Flatten the output directory structure
    .pipe(gulp.dest('assets'));
});

// Task to compile JavaScript files
gulp.task('compile-js', function () {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(flatten()) // Flatten the output directory structure
    .pipe(gulp.dest('assets'));
});

// Task to compile Sass files
gulp.task('compile-sass', function () {
  return gulp
    .src('src/styles/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(flatten()) // Flatten the output directory structure
    .pipe(gulp.dest('assets'));
});

// Task to compile images
gulp.task('compile-images', function () {
  return gulp
    .src('src/images/**/*')
    .pipe(flatten()) // Flatten the output directory structure
    .pipe(gulp.dest('assets/images'));
});

// Task to watch for changes in TypeScript, JavaScript, Sass, and image files
gulp.task('watch', function () {
  gulp.watch('src/scripts/**/*.ts', gulp.series('compile-ts'));
  gulp.watch('src/scripts/**/*.js', gulp.series('compile-js'));
  gulp.watch('src/styles/**/*.scss', gulp.series('compile-sass'));
  gulp.watch('src/images/**/*', gulp.series('compile-images'));
});

// Default task that starts the 'watch' task by default
gulp.task('default', gulp.series(gulp.parallel('compile-ts', 'compile-js', 'compile-sass', 'compile-images'), 'watch'));
gulp.task('build', gulp.series(gulp.parallel('compile-ts', 'compile-js', 'compile-sass', 'compile-images')));
