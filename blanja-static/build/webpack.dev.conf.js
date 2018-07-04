import merge from 'webpack-merge';

var webpack = require('webpack');
import webpackBaseConfig from './webpack.base.conf.js';

module.exports = merge(webpackBaseConfig, {
	devtool: '#eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"',
				PROFILE: JSON.stringify(process.env.PROFILE)
			}
	    }),
	]
	// devtool: 'source-map'
});