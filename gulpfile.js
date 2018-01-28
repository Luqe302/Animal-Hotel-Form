const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber	= require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    server = require('browser-sync').create();

gulp.task('styles', function () {
    return gulp.src('./ui-view/scss/styles.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ["last 5 version", "IE 9"]
        }))
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./ui-view/css'))
        .pipe(server.stream());
});

gulp.task('server', function () {
    return server.init({
        port: 3000,
        server: {
            baseDir: './ui-view/'
        },
        ghostMode: true,
        open: false
    })
});

gulp.task('watch', function () {
    gulp.watch('./ui-view/scss/**/*.scss', ['styles']);
    gulp.watch('./ui-view/js/**/*.js', server.reload);
    gulp.watch('./ui-view/**/*.html', server.reload);
});

gulp.task('default', ['styles', 'server', 'watch']);