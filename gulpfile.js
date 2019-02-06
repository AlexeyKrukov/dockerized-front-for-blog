const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
gulp.task('sass', () => {
    return gulp.src('dev/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        //.pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
});
gulp.task('html', () => {
    return gulp.src('dist/*.html')
        .pipe(browserSync.stream())
});
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: true
    })
});
gulp.task('watch', () => {
   gulp.watch('dev/scss/**/*.scss', gulp.series('sass'));
   gulp.watch('dist/*.html', gulp.series('html'));
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
