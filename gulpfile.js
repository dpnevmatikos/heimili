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
    css: baseOutDir + '/public/stylesheets',
    views: baseOutDir + '/views',
    startup: baseOutDir + '/bin'
};

gulp.task('clean:dist', function () {
    return del(paths.clean);
});

gulp.task('serverTs', ['clean:dist'], function () {
    return serverTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(serverTsProject())
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.server));
});

gulp.task('appTs', ['clean:dist'], function () {
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

gulp.task('copy:views', ['clean:dist'], function() {
    return gulp.src('views/*')
        .pipe(gulp.dest(paths.views));
});

gulp.task('copy:json', ['clean:dist'], function() {
    return gulp.src('config.json')
        .pipe(gulp.dest(baseOutDir));
});

gulp.task('copy:startup', ['clean:dist'], function() {
    return gulp.src('bin/www')
        .pipe(gulp.dest(paths.startup));
});

gulp.task('default', [
    'serverTs',
    'appTs',
    'css',
    'copy:views',
    'copy:json',
    'copy:startup'
]);
