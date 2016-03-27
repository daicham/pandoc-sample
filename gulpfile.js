var gulp = require('gulp');
var pandoc = require('gulp-pandoc');
var webserver = require('gulp-webserver');

// copy assets
gulp.task('copy', function() {
  gulp.src('assets/**')
    .pipe(gulp.dest('dist/'));
});

// pandoc from md to html5
gulp.task('docs', ['copy'], function() {
  gulp.src('src/*.md')
    .pipe(pandoc({
      from: 'markdown_github',
      to: 'html5',
      ext: '.html',
      args: [
        //'--toc',
        '--template=templates/html5/template.html',
        '--include-in-header=templates/html5/header.html',
        '--include-before-body=templates/html5/before_body.html',
        '--include-after-body=templates/html5/after_body.html'
      ]
    }))
    .pipe(gulp.dest('dist/'));
});

// local web server
gulp.task('webserver', function() {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      port: 3000
    }));
});

// watch generated docs
gulp.task('watch', function() {
  gulp.watch(['src/*.md', 'templates/**/*.html'], ['docs']);
});

gulp.task('default', ['docs', 'watch', 'webserver']);