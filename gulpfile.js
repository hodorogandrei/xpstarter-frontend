'use strict';

var gulp = require('gulp'),
    bower = require('gulp-bower'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat-multi'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon');

// Load plugins
var $ = require('gulp-load-plugins')({
    rename: {
            'gulp-ruby-sass': 'sass'
        }
    });

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('bower_components'));
});

gulp.task('scss', function(){
    var browsers = [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1'
    ];

    return gulp.src(['src/styles/main.sass'])
        .pipe(sourcemaps.init())
        .pipe($.sass({
            style: 'expanded',
            loadPath: [
                'src/styles',
                'bower_components'
            ]
        })
        .on('error', $.util.log))
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: browsers
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('less', function() {
    var browsers = [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1'
    ];

    return gulp.src('src/**/*.less')
        .pipe(sourcemaps.init())
        .pipe($.less({
            paths: ['bower_components']
        })
        .on('error', $.util.log))
        .pipe($.postcss([
                require('autoprefixer-core')({
                    browsers: browsers
                })
            ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.reload({stream: true}));
    });

gulp.task('styles', ['scss', 'less']);


gulp.task('views', function(){
    return gulp.src([
            '!src/views/layout.jade',
            'src/views/*.jade'
        ])
        .pipe($.jade({
            pretty: true
        }))
        .on('error', $.util.log)
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function() {
    return gulp.src('bower_components/mdi/fonts/**.*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.imagemin({
            svgoPlugins: [{
                convertPathData: false
            }]
        }))
        .pipe(gulp.dest('public/images'));
});

gulp.task('resources', ['images', 'fonts']);

gulp.task('libraries', function() {
    return concat({
        "libraries.js": [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/d3/d3.min.js',
            'bower_components/c3/c3.min.js'
        ]
    })
        .on('error', $.util.log)
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('app-scripts', function() {
    return concat({
        "app-scripts.js": [
            'src/js/helpers.js',
            'src/js/formatters.js',
            'src/js/stats.js',
            'src/js/init.js'
        ]
    })
        .on('error', $.util.log)
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', ['libraries', 'app-scripts'])

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "http://localhost:3000",  // local node app address
        port: 5000,  // use *different* port than
        notify: true,
        files: ["./public/**/*.*"]
    });
});


gulp.task('watch', ['build'], function() {
    gulp.watch('src/styles/**/*', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/**/*.jade', ['views']);
    gulp.watch('src/**/*.js', ['scripts']);

    gulp.start('browser-sync');
    gulp.start('nodemon');
});

// JSHint grunfile.js
gulp.task('selfcheck', function() {
    return gulp.src('gulpfile.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'));
});


gulp.task('clean', function(cb) {
    var del = require('del');
    del(['build'], cb);
});


gulp.task('build', ['styles', 'views', 'resources', 'scripts']);


gulp.task('default', ['selfcheck', 'clean'], function() {
    gulp.start('watch');
});

gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: './bin/www'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});