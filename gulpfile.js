'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');

// Load plugins
const $ = require('gulp-load-plugins')();


gulp.task('styles', function () {
    return gulp.src('./css/*.less')
        .pipe($.less()
            .on('error', $.util.log))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('views', function () {
    return gulp.src([
        './index.html',
        './**/*.html'
    ]).pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {},
        notify: {
            styles: {
                top: 'auto',
                bottom: '50%'
            }
        },
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        }
    });
});


gulp.task('watch', function () {
    gulp.watch('./**/*.less', ['styles']);
    gulp.watch(['./**/*.html','./**/*.js'], ['views']);
    gulp.start('browser-sync');
});

gulp.task('default', ['styles'], function () {
    gulp.start('watch');
});
