var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

var useref = require('gulp-useref');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanDest = require('gulp-clean-dest');

var webserver = require('gulp-webserver');

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


//BUILD
gulp.task('build', function () {
    return gulp.src('./app/*.html')
        .pipe(cleanDest('public'))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('public'));
});


gulp.task('watch', function () {
    gulp.watch('./app/sass/**/*.scss', ['styles']);
});


// DEFAULT
gulp.task('default', ['server-run', 'watch']);