'use strict';

var gulp = require ('gulp');
var sass = require ('gulp-sass');
var pug  = require ('gulp-pug');

var browserSync = require('browser-sync');

var plumber = require('gulp-plumber');

sass.compiler = require('node-sass');


gulp.task('sass', ()=>{
    return gulp.src('./template/**/*.scss').
        pipe(plumber()).
        pipe(sass().on('error', sass.logError)).
        pipe(gulp.dest('./build/css/'));
});

gulp.task('pug', ()=>{
    return gulp.src('./template/**/*.pug').
        pipe(plumber()).
        pipe(pug()).
        pipe(gulp.dest('./build/'));
});


gulp.task('copy-js', ()=>{
    return gulp.src('./template/**/*.js').
        pipe(plumber()).
        pipe(gulp.dest('./build/js/'));
});


gulp.task('build', gulp.parallel('sass', 'pug', 'copy-js'));



gulp.task('watch', ()=>{
    gulp.watch('./template/**/*.scss' , gulp.series('sass'));
    gulp.watch('./template/**/*.pug', gulp.series('pug'))
    gulp.watch('./template/', gulp.series('copy-js'));

    browserSync.init({
        server:{
            baseDir: "./build/",
        },
        open: false
    });

    gulp.watch(['build/**'], browserSync.reload)
});
