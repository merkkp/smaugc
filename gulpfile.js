var gulp = require('gulp'),
    concat = require('gulp-concat'),
    inline = require('gulp-inline-source'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    cleancss = require('gulp-clean-css'),
    minifyhtml = require('gulp-minify-html'),
    flatten = require('gulp-flatten'),
    clean = require('gulp-clean'),
    ghpages = require('gulp-gh-pages');

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
    },

    imgs :  {
        'src': 'src/imgs',
        'target': 'public/static/imgs'
    }
};

html = {
    'src': 'src',
    'target': 'public'
};

gulp.task('css', function(){
    return gulp.src([
        static.css.src + '/base.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleancss())
    .pipe(concat('smaugc.css'))
    .pipe(gulp.dest(static.css.target))
    .pipe(livereload());

});

gulp.task('js', function(){
    return gulp.src([
        static.js.src + '/**/*.js'
    ])
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(concat('smaugc.js'))
    .pipe(gulp.dest(static.js.target))
    .pipe(livereload());
});

gulp.task('html', function(){
    return gulp.src([
        html.src + '/index.html'
    ])
    .pipe(minifyhtml())
    .pipe(gulp.dest(html.target))
    .pipe(livereload());
});

gulp.task('imgs', function(){
    return gulp.src([static.imgs.src + '/**/*.{png,jpg,svg}'])
    .pipe(flatten())
    .pipe(gulp.dest(static.imgs.target))
    .pipe(livereload());
});

gulp.task('clean', function(){
    return gulp.src([
        'public',
        'dist'
    ], {read: false})
    .pipe(clean());
});

gulp.task('default', ['css', 'js', 'html', 'imgs']);

gulp.task('compile',['clean', 'default'], function(){
    return gulp.src('public/index.html')
    .pipe(inline({
        compress: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    livereload.listen({"port": 24567});
    gulp.watch(static.css.src + '/**/*.scss', ['css']);
    gulp.watch(static.js.src + '/**/*.js', ['js']);
    gulp.watch(html.src + '/index.html', ['html']);
    gulp.watch(static.imgs.src + '/**/*.{png,jpg,svg}');
});

gulp.task('ghdeploy', function(){
    return gulp.src('dist/index.html').pipe(ghpages());
});
