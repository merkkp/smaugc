var gulp = require('gulp'),
    concat = require('gulp-concat'),
    inline = require('gulp-inline-source'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    cleancss = require('gulp-clean-css'),
    minifyhtml = require('gulp-minify-html'),
    flatten = require('gulp-flatten');

static = {
    js : {
        'src': 'src/js',
        'target': 'public/static/js'
    },

    css : {
        'src': 'src/scss',
        'target': 'public/static/css'
    },

    fonts : {
        'src': 'src/fonts',
        'target': 'public/static/fonts'
    }
};

html = {
    'src': 'src',
    'target': 'public'
};

gulp.task('css', function(){
    gulp.src([
        static.css.src + '/base.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleancss())
    .pipe(concat('smaugc.css'))
    .pipe(gulp.dest(static.css.target))
    .pipe(livereload());

});

gulp.task('js', function(){
    gulp.src([
        static.js.src + '/**/*.js'
    ])
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(concat('smaugc.js'))
    .pipe(gulp.dest(static.js.target))
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

gulp.task('fonts', function(){
    gulp.src([
        static.fonts.src + '/**/*.{eot,svg,ttf,woff}'
    ])
    .pipe(flatten())
    .pipe(gulp.dest(static.fonts.target));
});


gulp.task('default', ['css', 'js', 'html', 'fonts']);

gulp.task('compile', function(){
    gulp.src('public/index.html')
    .pipe(inline({
        compress: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    livereload.listen({"port": 24567});
    gulp.watch(static.css.src + '/**/*.scss', ['css']);
    gulp.watch(static.js.src + '/**/*.js', ['js']);
    gulp.watch(static.fonts.src + '/**/*.{eot,svg,ttf,woff}');
    gulp.watch(html.src + '/index.html', ['html']);
});