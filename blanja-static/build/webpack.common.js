import path from 'path';

module.exports = {
	module:{
		rules:[
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				include : [
					path.resolve(__dirname, "../dev")
				],
				exclude : path.resolve(__dirname, "../node_modules"),
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	resolve:{
		extensions: ['.js', '.scss'],
		alias: {
			'@' : path.resolve('./dev'),
			'public' : path.resolve('./'),
			'sass' : path.resolve('./dev/styles'),
			'@fonts' : path.resolve('./dev/commons/fonts')
		},
		symlinks: false
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	}
}