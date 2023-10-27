const gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  gulpIf = require('gulp-if'),
  sourcemaps = require('gulp-sourcemaps'),
  scss = require('gulp-sass')(require('sass'));

const mainPaths = {
  build: './build',
  src: './app',
};

const fullPaths = {
  build: {
    html: mainPaths.build + '/',
    styles: mainPaths.build + '/assets/css/',
    scripts: mainPaths.build + '/assets/js/',
    images: mainPaths.build + '/assets/img/',
    fonts: mainPaths.build + '/assets/fonts/',
  },
  src: {
    html: [mainPaths.src + '/*.html', '!' + mainPaths.src + '/_*.html'],
    styles: [
      mainPaths.src + '/assets/scss/**/*.{sass,scss}',
      '!' + mainPaths.src + '/scss/**/_*.{sass,scss}',
    ],
    scripts: [mainPaths.src + '/assets/js/**/*.js', '!' + mainPaths.src + '/js/**/_*.js'],
    images: mainPaths.src + '/assets/img/**/*.+(png|jpg|jpeg|gif|svg)',
    fonts: mainPaths.src + '/assets/fonts/**/*',
  },
  watch: {
    html: mainPaths.src + '/**/*.html',
    styles: mainPaths.src + '/**/*.scss',
    scripts: mainPaths.src + '/**/*.js',
    images: mainPaths.src + '/assets/img/**/*.*',
    fonts: mainPaths.src + '/assets/fonts/**/*.*',
  },
  clean: [mainPaths.build + '/'],
};

const flagsStates = {
  isDev: process.argv.includes('--dev'),
  isSync: process.argv.includes('--sync'),
  isNoMinify: process.argv.includes('--noMinify'),
  isNoPref: process.argv.includes('--isNoPref'),
  isMap: process.argv.includes('--map'),
  isCompresImages: process.argv.includes('--compImg'),
};

// watch files
const watchFiles = () => {
  browsersync.init({
    server: {
      baseDir: mainPaths.build + '/',
    },
    notify: false,
  });
  gulp.watch([fullPaths.watch.html], html);
  gulp.watch([fullPaths.watch.styles], styles);
  gulp.watch([fullPaths.watch.scripts], scripts);
  gulp.watch([fullPaths.watch.fonts], fonts);
  gulp.watch([fullPaths.watch.images], images);
};
const watchStyles = () => {
  gulp.watch([fullPaths.watch.styles], styles);
};
const watchScripts = () => {
  gulp.watch([fullPaths.watch.styles], styles);
};

// Clean
const clean = () => {
  return del(fullPaths.clean);
};

// HTML
const html = () => {
  return gulp
    .src(fullPaths.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest(fullPaths.build.html))
    .pipe(gulpIf(flagsStates.isSync, browsersync.stream()));
};

// Styles
const styles = () => {
  return gulp
    .src(fullPaths.src.styles)
    .pipe(
      rename((path) => {
        path.basename === 'main' && (path.basename = 'styles');
        path.extname = '.css';
      }),
    )
    .pipe(gulpIf(flagsStates.isMap, sourcemaps.init()))
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(
      gulpIf(
        flagsStates.isNoPref,
        autoprefixer({ cascade: true, overrideBrowserslist: ['last 5 versions'] }),
      ),
    )
    .pipe(autoprefixer({ cascade: true, overrideBrowserslist: ['last 5 versions'] }))
    .pipe(groupMedia())
    .pipe(gulpIf(flagsStates.isNoMinify, gulp.dest(fullPaths.build.styles)))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(
      rename((path) => {
        path.basename += '.min';
      }),
    )
    .pipe(gulpIf(flagsStates.isMap, sourcemaps.write()))
    .pipe(gulp.dest(fullPaths.build.styles))
    .pipe(gulpIf(flagsStates.isSync, browsersync.stream()));
};

// JavaScript
const scripts = () => {
  return gulp
    .src(fullPaths.src.scripts)
    .pipe(fileinclude())
    .pipe(
      rename((path) => {
        path.basename === 'main' && (path.basename = 'scripts');
      }),
    )
    .pipe(gulpIf(flagsStates.isNoMinify, gulp.dest(fullPaths.build.scripts)))
    .pipe(gulpIf(!flagsStates.isDev, uglify()))
    .pipe(
      rename((path) => {
        path.basename += '.min';
      }),
    )
    .pipe(gulp.dest(fullPaths.build.scripts))
    .pipe(gulpIf(flagsStates.isSync, browsersync.stream()));
};

// Font
const fonts = () => {
  return gulp
    .src(fullPaths.src.fonts)
    .pipe(gulp.dest(fullPaths.build.fonts))
    .pipe(gulpIf(flagsStates.isSync, browsersync.stream()));
};

// Images
const images = () => {
  return gulp
    .src(fullPaths.src.images)
    .pipe(gulp.dest(fullPaths.build.images))
    .pipe(gulpIf(flagsStates.isSync, browsersync.stream()));
};

// Assembly steps
const build = gulp.parallel(html, styles, scripts, fonts, images);

const buildWithClean = gulp.series(clean, build);
const refactoringStyles = gulp.series(clean, styles);
const refactoringScripts = gulp.series(clean, scripts);

const development = gulp.series(buildWithClean, watchFiles);
const devRefactoringStyles = gulp.series(refactoringStyles, watchStyles);
const devRefactoringScripts = gulp.series(refactoringScripts, watchScripts);

// Tasks
gulp.task('build', buildWithClean);
gulp.task('development', development);

gulp.task('refactoringStyles', devRefactoringStyles);
gulp.task('refactoringScripts', devRefactoringScripts);

gulp.task('images', images);

gulp.task('clean', clean);
