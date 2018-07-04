const path = require('path');
var profile = require('./profile'); 
const isProd = process.env.NODE_ENV === "production";

var config = {
	NODE_ENV: process.env.NODE_ENV,
	PORT_STATIC: 3000,
	PORT_TEMPLATE : 4000,
	PORT_PROD : 3000,

	build: {
		sourceMap : true,
		compressionGzip : true,
		compressionGzipExt : ['js', 'css'],
		devPath : path.resolve(__dirname, '../dev'),
		distPath : path.resolve(__dirname, '../dist'),
		uiKitPath : path.resolve(__dirname, '../uikit'),
		rootPath : path.resolve(__dirname, '../')
	}
}

var env = Object.assign(profile.default, config)

export default env;