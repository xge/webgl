const gulp = require('gulp'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint'),
    inlineSource = require('gulp-inline-source'),
    notif = require('gulp-notify'),
    watch = require('gulp-watch');

// Copy dependencies to dist/js
gulp.task('deps', function() {
    gulp.src([
        'node_modules/three/three.js'
    ]).pipe(gulp.dest('dist/js'));

    gulp.src([
        'assets/**/*'
    ]).pipe(gulp.dest('dist/'));

});

gulp.task('inline', function () {
    return gulp.src('src/index.html')
        .pipe(inlineSource({compress: false}))
        .pipe(gulp.dest('dist/'));
});

// after linting and copying we're doing the babel thing
gulp.task('babel', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
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

gulp.task('watch:html', function() {
    watch(['src/**/*.html', 'src/shaders/*'], { emitOnGlob: true }, function() {
        gulp.run('inline');
    });
});

gulp.task('default', ['deps', 'inline', 'babel']);
gulp.task('serve', ['default', 'watch', 'connect']);
