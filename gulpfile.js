var fs = require('fs');
var path = require('path');

var browserSync = require('browser-sync');
var ghpages = require('gh-pages');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');  // Temporary solution until Gulp 4
                                            // https://github.com/gulpjs/gulp/issues/355

var BUILD_DIR = path.join(__dirname, 'build');
var reload = browserSync.reload;

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('clean', function (done) {
    require('del')(['build'], done);
});

gulp.task('copy', [
    'copy:css',
    'copy:js',
    'copy:html',
    'copy:misc'
]);

gulp.task('copy:css', function () {
    return gulp.src('src/css/style.css')
               .pipe(gulp.dest('build/css'))
               .pipe(plugins.filter('**/*.css'))
               .pipe(reload({stream: true}));
});

gulp.task('copy:js', function () {
    return gulp.src('src/js/**')
               .pipe(gulp.dest('build/js'))
               .pipe(plugins.filter('**/*.js'))
               .pipe(reload({stream: true}));
});

gulp.task('copy:html', function () {
    return gulp.src([

        // Copy all `.html` files
        'src/*.html',

        // Exclude the following files since they
        // are only used to build the other files
        '!src/masthead.html',
        '!src/base.html'

    ]).pipe(plugins.nunjucks.compile(
            JSON.parse(fs.readFileSync('./src/data.json'))
       ))
      .pipe(plugins.htmlmin({

            // In-depth information about the options:
            // https://github.com/kangax/html-minifier#options-quick-reference

            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyJS: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,

            // Prevent html-minifier from breaking the SVGs
            // https://github.com/kangax/html-minifier/issues/285
            keepClosingSlash: true,
            caseSensitive: true

      })).pipe(gulp.dest('build'))
         .pipe(reload({stream: true}));
});

gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        'src/**',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!src/*.html',
        '!src/{css,css/**}',
        '!src/data.json'

    ], {
        // Include hidden files by default
        dot: true
    }).pipe(gulp.dest('build'));

});

gulp.task('browser-sync', function() {
     browserSync({

        // In-depth information about the options:
        // http://www.browsersync.io/docs/options/

        notify: false,
        port: 8000,
        server: "build",
        open: false
    });
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.css'], ['copy:css']);
    gulp.watch(['src/**/*.js'], ['copy:js']);
    gulp.watch(['src/*.html', 'src/CNAME', 'src/data.json'], ['copy:html', reload]);
    gulp.watch(['src/img/**', 'src/fonts/**', 'src/demos/**'], ['copy:misc', reload]);
});

gulp.task('deploy', function (done) {
    ghpages.publish(BUILD_DIR, done);
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('build', function (done) {
    runSequence('clean', 'copy', done);
});

gulp.task('default', ['build']);

gulp.task('serve', function (done) {
    runSequence( 'build', ['browser-sync', 'watch'], done);
});
