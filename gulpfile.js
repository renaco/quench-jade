var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade');
//var pug = require('gulp-pug');
var eslint = require('gulp-eslint');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
//var svgSprite = require('gulp-svg-sprite');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('serve', function() {
  var server = gls.static('./');
  server.start();
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

// config = {
//   shape: {
//     dimension: {
//       maxWidth: 32,
//       minWidth: 32
//     },
//     spacing: {
//       padding: 10
//     }
//   },
//   mode: {
//     view: {
//       bust: false,
//       render: {
//         scss: { dest: '' }
//       }
//     }
//   }
// };

gulp.task('svg', function() {
  return gulp.src(path.svg)
    .pipe(svgSprite(config))
    .pipe(gulp.dest(path.sprite));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.coffee')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(coffee({bare: true})
    //.pipe(jshint())
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    //.pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
  );
});


gulp.task('views', function(){
  return gulp.src('src/views/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./'));
});

//
// gulp.task('views', function(){
//   return gulp.src('src/views/**/*.pug')
//     .pipe(eslint()
//     .pipe(rename({
//       dirname: './dist/views',
//       extname: '.html'
//     }))
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
//     .pipe(gulp.dest('./dist/'))
//   );
//   //.pipe(pug);
// });
//

gulp.task('watch', ['browser-sync'], function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/scripts/**/*.coffee", ['scripts']);
  gulp.watch("src/views/**/*.jade", ['views']);
  gulp.watch("*.html", ['bs-reload']);
});
