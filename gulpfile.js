const { src, series, dest, watch, parallel } = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass')(require('sass'));
const esbuild = require('gulp-esbuild');
const imagemin = require('gulp-imagemin');

// parameters
let minify = (process.env.NODE_ENV === 'production');

const styles = () => src('src/index.scss')
	.pipe(sass({
		outputStyle: minify ? 'compressed': undefined,
		includePaths: ['node_modules']
	}))
	.pipe(dest('dist'));

const scripts = () => src('./src/index.js')
	.pipe(esbuild({
		outfile: 'index.js',
		bundle: true,
		minify,
		treeShaking: minify,
	}))
	.pipe(dest('dist'));

const images = () => src('assets/*')
	.pipe(imagemin())
	.pipe(dest('dist/assets'));


const reload = () => src('*.html')
	.pipe(dest('dist'))
	.pipe(connect.reload());

function serve(cb) {
	connect.server({
		root: 'dist',
		port: 8000,
		livereload: true
	});

	watch('index.html', series(reload));
	watch('src/**/*.js', series(scripts, reload));
	watch('src/**/*.scss', series(styles, reload));
	watch('assets/*', series(images, reload));
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.reload = reload;
exports.serve = serve;
exports.build = parallel(styles, scripts, images, reload);
exports.default = series(parallel(styles, scripts, images, reload), serve);
