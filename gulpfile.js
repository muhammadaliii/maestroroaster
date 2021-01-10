 /**
 * Variables
 */
var gulp			= require('gulp'),
	autoprefixer	= require('gulp-autoprefixer'),
	browserSync		= require('browser-sync'),
	changed			= require('gulp-changed'),
	concat			= require('gulp-concat'),
	del				= require('del'),
	foreach			= require('gulp-foreach'),
	ghPages 		= require('gulp-gh-pages'),
	notify 			= require('gulp-notify'),
	plumber 		= require('gulp-plumber'),
	reload 			= browserSync.reload,
	runSequence 	= require('run-sequence'),
	sass 			= require('gulp-sass'),
	sassGlob 		= require('gulp-sass-glob'),
	sassLint 		= require('gulp-sass-lint'),
	sourcemaps 		= require('gulp-sourcemaps'),
	twig 			= require('gulp-twig'),
	uglify			= require('gulp-uglify'),
	watch 			= require('gulp-watch');

/**
 * Paths
 */
var paths = {
	dist: 'dist/',
	src: 'src/',
	deploy: 'dist/**/*',
	html: 'dist/*.html',
	browserSync: './dist',
	sass: {
		inputAll: 'src/sass/**/*.scss',
		input: 'src/sass/main.scss',
		output: 'dist/css',
		lint: 'src/sass/**/*.s+(a|c)ss'
	},
	bootstrap: {
		popper: 'node_modules/popper.js/dist/umd/popper.min.js',
		js: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
		output: 'dist/js'
	},
	jsVendor: {
		input: 'src/js/vendor/jquery-3.3.1.min.js',
		input: 'src/js/vendor/**/*.js',
		output: 'dist/js'
	},
	jsComponents: {
		input: 'src/js/components/**/*.js',
	},
	js: {
		input: 'src/js/main.js',
		output: 'dist/js'
	},
	img: {
		input: 'src/assets/img/**/*',
		output: 'dist/assets/img'
	},
	fonts: {
		input: 'src/assets/fonts/**/*',
		output: 'dist/assets/fonts'
	},
	videos: {
		input: 'src/assets/video/**/*',
		output: 'dist/assets/video'
	},
	twig: {
		src: 'src/templates/*.{twig,html}',
		watch: 'src/templates/**/*.{twig,html}'
	},
	misc: {
		xml: 'src/*.xml',
		txt: 'src/*.txt'
	}
};

/**
 * Catch stream errors
 */
var onError = function (err) {
	notify.onError({
		title: "Gulp error in " + err.plugin,
		message: err.toString()
	})(err);
};

/**
 * Browser Sync
 */
gulp.task('browser-sync', function() {
	browserSync.init(null, {
		files: [paths.html],
		server: {
			baseDir: paths.browserSync
		},
		notify: false
	});
});

/**
 * Clean dist
 */
gulp.task('clean:dist', function() {
	return del.sync(paths.dist);
})

/**
 * CSS
 */
gulp.task('css', function (done) {
	return gulp.src(paths.sass.input)
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sourcemaps.init())
	.pipe(sassGlob())
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(sourcemaps.write('./', {addComment: false}))
	.pipe(gulp.dest(paths.sass.output))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * Sass Lint
 */
gulp.task('sass-lint', function () {
	return gulp.src(paths.sass.lint)
	.pipe(sassLint())
	.pipe(sassLint.format())
	.pipe(sassLint.failOnError())
});

/**
 * JS Bootstrap
 */
gulp.task('js:bootstrap', function (done) {
	return gulp.src([
		paths.bootstrap.popper,
		paths.bootstrap.js
	])
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sourcemaps.init())
	.pipe(concat('bootstrap.js'))
	.pipe(sourcemaps.write('./', {addComment: false}))
	.pipe(gulp.dest(paths.bootstrap.output))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * JS Vendor
 */
gulp.task('js:vendor', function (done) {
	return gulp.src(paths.jsVendor.input)
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sourcemaps.init())
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./', {addComment: false}))
	.pipe(gulp.dest(paths.jsVendor.output))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * JS Main
 */
gulp.task('js:main', function (done) {
	return gulp.src([
		paths.js.input,
		paths.jsComponents.input
	])
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sourcemaps.init())
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./', {addComment: false}))
	.pipe(gulp.dest(paths.js.output))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * Images
 */
gulp.task('images', function (done) {
	return gulp.src([
		paths.img.input
	], {
		'dot': true // include hidden files
	})
		.pipe(changed(paths.img.output))
		.pipe(gulp.dest(paths.img.output))
		.pipe(browserSync.reload({stream:true}))
		done();
});

/**
 * Fonts
 */
gulp.task('fonts', function (done) {
	return gulp.src([
		paths.fonts.input
	])
	.pipe(changed(paths.fonts.output))
	.pipe(gulp.dest(paths.fonts.output))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * Video
 */
gulp.task('videos', function (done) {
	return gulp.src([
		paths.videos.input
	])
	.pipe(changed(paths.videos.output))
	.pipe(gulp.dest(paths.videos.output))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * Twig
 */
gulp.task('twig', function (done) {
	return gulp.src(paths.twig.src)
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}}))
	.pipe(foreach(function(stream,file){
		return stream
		.pipe(twig())
	}))
	.pipe(gulp.dest(paths.dist))
	done();
});

/**
 * Copy miscellaneous files
 */
gulp.task('copy:misc', function (done) {
	return gulp.src([
		paths.misc.xml,
		paths.misc.txt
	])
	.pipe(changed(paths.dist))
	.pipe(gulp.dest(paths.dist))
	.pipe(browserSync.reload({stream:true}))
	done();
});

/**
 * Task: Gulp Watch Sequence
 */
gulp.task('watch-files', function () {
	watch(paths.img.input, function () {
		gulp.start('images');
	});
	watch(paths.fonts.input, function () {
		gulp.start('fonts');
	});
	watch(paths.videos.input, function () {
		gulp.start('videos');
	});
	watch(paths.sass.inputAll, function () {
		gulp.start('css');
	});
	watch(paths.js.input, function () {
		gulp.start('js:main');
	});
	watch(paths.jsComponents.input, function () {
		gulp.start('js:main');
	});
	watch(paths.jsVendor.input, function () {
		gulp.start('js:vendor');
	});
	watch(paths.twig.watch, function () {
		gulp.start('twig');
	});
	watch([paths.misc.xml, paths.misc.txt], function () {
		gulp.start('copy:misc');
	});
});

/**
 * Task: Gulp Default
 */
gulp.task('default', function(done) {
	runSequence('build', [
		'watch-files',
		'browser-sync'
	], done )
});

/**
 * Task: Gulp Build
 */
gulp.task('build', function (done) {
	runSequence([
		'css',
		'js:bootstrap',
		'js:vendor',
		'js:main',
		'images',
		'fonts',
		'videos',
		'twig',
		'copy:misc'
	], done )
})

/**
 * Task: Gulp Watch
 */
gulp.task('watch', function(done) {
	runSequence('watch-files', [
		'browser-sync'
	], done )
});

/**
 * Task: Gulp Deploy
 */
gulp.task('deploy', function() {
	return gulp.src(paths.deploy)
	.pipe(ghPages());
});
