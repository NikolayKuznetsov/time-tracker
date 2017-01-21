var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanDest = require('gulp-clean-dest');
var webserver = require('gulp-webserver');

var del = require('del');

var config = {
    path: {
        build: 'build',
        buildFont: 'build/fonts'
    }
};

//SERVER
gulp.task('server-run', function () {
    gulp.src('./app')
        .pipe(webserver({
            // path: 'app',
            fallback: 'index.html',
            port: 9001,
            livereload: true,
            directoryListing: {
                enable: true,
                path: 'app/index.html'
            },
            open: true
        }));
});

//STYLES
gulp.task('styles', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/css'));
});

//CLEAN public
gulp.task('clean', function () {
    return del([config.path.build]);
});

// BUILD fonts
gulp.task('build-fonts', function () {
    return gulp.src('./app/libs/bootstrap/fonts/*.*')
        .pipe(gulp.dest(config.path.buildFont));
});

//BUILD js and css
gulp.task('build-app', function () {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest(config.path.build));
});

//BUILD
gulp.task('build', ['clean'], function () {
    gulp.start('build-fonts', 'build-app');
});


gulp.task('watch', function () {
    gulp.watch('./app/sass/**/*.scss', ['styles']);
});


// DEFAULT
gulp.task('default', ['server-run', 'watch']);