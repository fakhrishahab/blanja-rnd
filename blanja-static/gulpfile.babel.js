'use strict';
// Import Gulp Library and Environment Config for Running Task
import gulp from 'gulp';
import './config/config.js';
import env from './config/env.js';
import flatmap from 'gulp-flatmap';
import path from 'path';
import concat from 'gulp-concat';
import gutil from 'gulp-util';
import del from 'del';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import eslint from 'gulp-eslint';
import cache from 'gulp-cache';
import cached from 'gulp-cached';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import chalk from 'chalk';
import logger from 'gulp-logger';
import cssnano from 'gulp-cssnano';
import {create_server} from './build/server.js';
import webpack from 'webpack-stream';
var webpackDevConf = require('./build/webpack.dev.conf.js');
var webpackProdConf = require('./build/webpack.prod.conf.js');
import webpackCommon from './build/webpack.common.js';
import imageMin from 'gulp-imagemin';
import named from 'vinyl-named';
import namedPath from 'vinyl-named-with-path';
import pm2 from 'pm2';
var gzip = require('gulp-gzip');


// Check apps environment
const isProd = process.env.NODE_ENV === "production";
const isStaging = process.env.NODE_ENV === "staging"; 

let taskList = [
	'clean',
	'clear',
	// 'linting',
	// 'global_server',
	// 'create_server',
	// 'template_server',
	// 'commons_scripts',
	// 'modular_scripts',
	'pages_scripts',
	'fonts',
	'scss',
	// 'vendors',
	'images',
	// 'uikit_scripts',
	// 'uikit_scss',
	// 'uikit-watch-vue',
	// 'watch-vue',
	'watch'
];

if(isProd || isStaging){
	taskList = [
		'clear',
		'clean',
		// 'global_server',
		// 'commons_scripts',
		// 'modular_scripts',
		'pages_scripts',
		'fonts',
		'scss',
		// 'vendors',
		'images'
	];
}

let cors = function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
};

gulp.task('global_server', function(){
	create_server();
});

gulp.task('clean', function(done){
	del.sync('dist');
	done()
});

gulp.task('clear', function(done){
	return cache.clearAll(done);
});

gulp.task('pages_scripts', function(){
	return gulp.src( env.build.devPath+'/pages/**/*.js', {base: 'dev'} )
		.pipe(plumber())
		// .pipe(cached('pages_scripts'))
		.pipe(namedPath())
		.pipe(webpack(isProd || isStaging ? webpackProdConf : webpackDevConf))
		.pipe(gulp.dest(function(file){
			return path.join(file.base, 'dist');					
		}))
});

gulp.task('pages_scripts_vue', function(){
	gulp.watch(env.build.devPath+'/**/*.vue', gulp.serial('pages_scripts'));	
});

gulp.task('scss', function(){
	return gulp.src( env.build.devPath+'/assets/styles/**/*.scss',	{base : env.build.devPath})
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths : [env.build.devPath, env.build.distPath]
		}).on('error', sass.logError))

		// .pipe(size({gzip: env.build.compressionGzip}))
		.pipe(isProd || isStaging ? gzip({ 
			gzipOptions: { 
				level: 9 
			},
			extension: 'gz',
			append: false
		}) : gutil.noop())
		.pipe(!isProd || !isStaging ? sourcemaps.write() : gutil.noop())
		.pipe(logger({
			showChange: true
		}))
		.pipe(gulp.dest(env.build.distPath))
});

gulp.task('fonts', function(){
	return gulp.src(env.build.devPath+'/assets/fonts/**/*.*')
		.pipe(size({gzip: env.build.compressionGzip}))
		.pipe(gulp.dest(env.build.distPath+'/assets/fonts'))
});

gulp.task('images', function(){
	return gulp.src(env.build.devPath+'/assets/images/**/*.*', {base : env.build.devPath})
		.pipe(isProd || isStaging ? imageMin([
		    imageMin.gifsicle({interlaced: true}),
		    imageMin.jpegtran({progressive: true}),
		    imageMin.optipng({optimizationLevel: 5}),
		    imageMin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]) : gutil.noop())
		.pipe(gulp.dest(env.build.distPath))
});

gulp.task('watch', function(event){
	gulp.watch( env.build.devPath+'/pages/**/*.js', gulp.series('pages_scripts'));

	gulp.watch( [
		env.build.devPath+'/components/**/*.js',
		env.build.devPath+'/components/**/*.vue'], gulp.series('pages_scripts'));

	gulp.watch(env.build.devPath+'/assets/styles/**/*.scss', gulp.series('scss', 'pages_scripts'));

	gulp.watch(env.build.devPath+'/assets/fonts/**/*.*', gulp.series('fonts'));

	gulp.watch(env.build.devPath+'/assets/images/**/*.*', gulp.series('images'));

	gulp.watch(env.build.devPath+'/**/*.*', gulp.series('clear'));
});

gulp.task('default', gulp.parallel(taskList));