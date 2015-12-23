const gulp = require('gulp'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint'),
    notif = require('gulp-notify'),
    watch = require('gulp-watch');

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
        'src/**/*', '!src/js'
    ]).pipe(gulp.dest('dist/'));
});

// after linting and copying we're doing the babel thing
gulp.task('babel', ['lint'], function() {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('connect', function() {
  connect.server({
    'root': 'dist'
  });
});

gulp.task('watch', ['watch:js', 'watch:html']);

gulp.task('watch:js', ['babel'], function() {
    watch('src/js/**/*.js', { emitOnGlob: true }, function() {
        gulp.run('babel');
    });
});

gulp.task('watch:html', ['babel'], function() {
    watch('src/**/*.html', { emitOnGlob: true }, function() {
        gulp.run('assets');
    });
});

gulp.task('default', ['babel', 'assets']);
gulp.task('serve', ['assets', 'babel', 'watch', 'connect']);
