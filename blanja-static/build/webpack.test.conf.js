import merge from 'webpack-merge';

var webpack = require('webpack');
import webpackBaseConfig from './webpack.base.conf.js';
const nodeExternals = require('webpack-node-externals')

module.exports = merge(webpackBaseConfig, {
	externals: [nodeExternals()],
	// devtool: 'inline-cheap-module-source-map'
});