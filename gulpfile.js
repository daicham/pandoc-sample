var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var pandoc = require('gulp-pandoc');
var webserver = require('gulp-webserver');

var pandoc_html5 = {
      from: 'markdown_github',
      to: 'html5',
      ext: '.html',
      args: [
        '--template=templates/html5/template.html',
        '--include-in-header=templates/html5/header.html',
        '--include-before-body=templates/html5/before_body.html',
        '--include-after-body=templates/html5/after_body.html'
      ]
    };

var all_in_one_pages = [
  'src/*.md'
];

// copy assets
gulp.task('copy', function() {
  gulp.src('assets/**')
    .pipe(gulp.dest('dist/'));
});

// pandoc from md to html5
gulp.task('docs', ['copy'], function() {
  // separated pages
  gulp.src('src/*.md')
    .pipe(pandoc(pandoc_html5))
    .pipe(gulp.dest('dist/'));
  // all-in-one
  gulp.src(all_in_one_pages)
    .pipe(concat('all-in-one'))
    .pipe(pandoc(pandoc_html5))
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

// clean dist dir
gulp.task('clean', function(cb) {
  del('dist', cb);
});

gulp.task('default', ['clean', 'docs', 'watch', 'webserver']);