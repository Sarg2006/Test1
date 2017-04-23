var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src(['js/*.js', 'js/controllers/*.js', 'js/services/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/'));
});
gulp.task('styles', function() {
    return gulp.src(['css/*.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/'));
});