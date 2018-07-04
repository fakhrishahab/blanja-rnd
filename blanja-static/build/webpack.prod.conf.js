import merge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.conf.js';
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import env from '../config/env';

console.log('RUN ON '+process.env.NODE_ENV+' MODE');	

module.exports = merge(webpackBaseConfig, {
	devtool: 'source-map',
	plugins: [
		new UglifyJsPlugin({
			// mangle: true,
			// ecma:6
			// cache: true,
			// parallel: 5,

			// compress: {
			// 	warnings: false, // Suppress uglification warnings
			// 	pure_getters: true,
			// 	unsafe: true,
			// 	// unsafe_comps: true,
			// 	// screw_ie8: true
			// },
			// output: {
			// 	comments: false,
			// 	beautify: true
			// }
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
				PROFILE: JSON.stringify(process.env.PROFILE)
			}
	    }),
	    new CompressionPlugin({
		    asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 0,
			minRatio: 0.8,
			deleteOriginalAssets: true
		}),	
	]
});