var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var ts = require('gulp-typescript');
var serverTsProject = ts.createProject('tsconfig.json');
var appTsProject = ts.createProject('app/tsconfig.json');

var baseOutDir = 'dist';
var paths = {
    clean: [ baseOutDir + '/*' ],
    server: baseOutDir,
    app: baseOutDir + '/app',
    css: baseOutDir + '/public/stylesheets'
};

gulp.task('clean:dist', function () {
  return del(paths.clean);
});

gulp.task('serverTs', function () {
    return serverTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(serverTsProject())
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.server));
});

gulp.task('appTs', function () {
    return appTsProject.src()
        .pipe(appTsProject())
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.app));
});

gulp.task('css', ['clean:dist'], function() {
    return gulp.src('public/stylesheets/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css));
});

gulp.task('default', [
    'clean:dist',
    'serverTs',
    'appTs',
    'css'
]);
