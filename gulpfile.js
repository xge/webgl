const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

// Lint that script!
gulp.task('lint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Copy dependencies to dist/js
gulp.task('deps', function() {
    return gulp.src([
        'node_modules/three/three.js'    
    ]).pipe(gulp.dest('dist/js'));
});

// Copy html and css
gulp.task('assets', ['deps'], function () {
    return gulp.src([
        'src/index.html'
    ]).pipe(gulp.dest('dist/'));
});

// after linting and copying we're doing the babel thing
gulp.task('default', ['lint', 'assets'], function() {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});