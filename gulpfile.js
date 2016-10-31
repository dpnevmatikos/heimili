var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
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
    css: baseOutDir + '/app/css',
    views: baseOutDir + '/views',
    startup: baseOutDir + '/bin'
};

gulp.task('clean:dist', function () {
    return del(paths.clean);
});

gulp.task('serverTs', function () {
    return serverTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(serverTsProject())
        .js
        .pipe(sourcemaps.write('.', { sourceRoot: '../' }))
        .pipe(gulp.dest(paths.server));
});

gulp.task('appTs', function () {
    return appTsProject.src()
        .pipe(appTsProject())
        .js
        .pipe(sourcemaps.write('.', { sourceRoot: '../app' }))
        .pipe(gulp.dest(paths.app));
});

gulp.task('css', function() {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css));
});

gulp.task('copy:views', function() {
    return gulp.src('views/*')
        .pipe(gulp.dest(paths.views));
});

gulp.task('copy:json', function() {
    return gulp.src('config.json')
        .pipe(gulp.dest(baseOutDir));
});

gulp.task('copy:startup', function() {
    return gulp.src('bin/www')
        .pipe(gulp.dest(paths.startup));
});

gulp.task('copy:app', ['appTs', 'css'], function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest(paths.app));
});

gulp.task('webpack', ['copy:app'], function() {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('default', [
    'serverTs',
    'copy:views',
    'copy:json',
    'copy:startup',
    'webpack'
]);

gulp.watch('**/*.ts', ['serverTs']);
gulp.watch('app/**/*.html', ['copy:app']);
gulp.watch('app/**/*.tsx', ['webpack']);
gulp.watch('app/**/*.css', ['webpack']);
