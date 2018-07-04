import path from 'path';
import webpack from 'webpack';
import EnvPlugin from '../config/env';
import {res1Url} from '../config/profile';
// import defaultFunction from '../config/locale';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	module:{
		rules:[
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				include : [
					path.resolve(__dirname, "../dev/"),
					path.resolve(__dirname, "../")
				],
				exclude : path.resolve(__dirname, "../node_modules/"),
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	resolve:{	
		extensions: ['.js', '.scss', '.vue'],
		alias: {
      		'vue$': 'vue/dist/vue.js',
			'@config': path.resolve('./config'),
			'@root': 'http://localhost:3000',
			'@' : path.resolve('./dev'),
			'@@': path.resolve('../'),
			'@sass' : path.resolve('./dev/commons/styles'),
			'@fonts' : path.resolve('./dev/commons/fonts'),
			'jquery-ui' : path.resolve('./dev/vendors/jquery-ui-latest.js'),
			'ui' : path.resolve('./dev/vendors/jquery-ui-latest.js'),
			'scss-loader': 'sass-loader',
			'@modules': path.resolve(__dirname, "../node_modules")
		},
		symlinks: false
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!resolve-url-loader!sass-loader'
					}
				},
				include : [
					path.resolve(__dirname, "../")
				],
			},
			{ 
				test: /\.css$/, 
				loader: "style!css",
				include : [
					path.resolve(__dirname, "../dev/"),
					path.resolve(__dirname, "../node_modules/")
				],
			},
      		{ 
      			test: /\.(jpe?g|png|gif)$/i,
      			loader:"file" 
      		},
      		{ // sass / scss loader for webpack
		        test: /\.(sass|scss)$/,
				loader: ['style!css', 'style-loader', 'css-loader','resolve-url-loader', 'sass-loader?sourceMap'],
				include : [
					path.resolve(__dirname, "../dev/"),
					path.resolve(__dirname, "../node_modules/")
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader',
			},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"window.jquery" : "jquery",
			"locale": [path.resolve(__dirname, '../config/locale'), 'default'],
			Vue: ['vue/dist/vue.esm.js', 'default'],
            Promise: 'es6-promise'
		}),
		// new webpack.DefinePlugin({
		// 	'_ENV_' : JSON.stringify(EnvPlugin),
		// 	PRODUCTION: JSON.stringify(false),
		// }),
		// new CompressionPlugin({
		//     asset: "[path].gz[query]",
		// 	algorithm: "gzip",
		// 	test: /\.js$|\.css$|\.html$/,
		// 	threshold: 0,
		// 	minRatio: 0.8,
		// 	deleteOriginalAssets: true
		// }),	
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "vendor",
		// 	minChunks: 3
		// })
	]
}