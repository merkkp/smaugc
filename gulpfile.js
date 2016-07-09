var gulp = require('gulp');
    concat = require('gulp-concat'),
    inline = require('gulp-inline-source'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    cleancss = require('gulp-clean-css'),
    minifyhtml = require('gulp-minify-html');

css = {
    'src': 'src/static/scss',
    'target': 'public/static/css'
};

js = {
    'src': 'src/static/js',
    'target': 'public/static/js'
};

html = {
    'src': 'src',
    'target': 'public'
};

gulp.task('css', function(){
    gulp.src([
        css.src + '/**/*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleancss())
    .pipe(concat('yacg.css'))
    .pipe(gulp.dest(css.target))
    .pipe(livereload());
});

gulp.task('js', function(){
    gulp.src([
        js.src + '/**/*.js'
    ])
    .pipe(concat('yacg.js'))
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(gulp.dest(js.target))
    .pipe(livereload());
});

gulp.task('html', function(){
    gulp.src([
        html.src + '/index.html'
    ])
    .pipe(minifyhtml())
    .pipe(gulp.dest(html.target))
    .pipe(livereload());
});


gulp.task('default', ['css', 'js', 'html']);

gulp.task('compile', function(){
    gulp.src('public/index.html')
    .pipe(inline({
        compress: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    livereload.listen({"port": 24567});
    gulp.watch(css.src + '/**/*.scss', ['css']);
    gulp.watch(js.src + '/**/*.js', ['js']);
    gulp.watch(html.src + '/index.html', ['html']);
});