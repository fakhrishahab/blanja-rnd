import express from 'express';
var uiKitRouting = require('../routes/uikit');
var assetsRouting = require('../routes/assets');
var uiKitV1Routing = require('../routes/uikit_v1');
import env from '../config/env';
import engine from 'ejs-locals';
var compression = require('compression');

const isProd = process.env.NODE_ENV === 'production';

export function create_server(){
	return express()
		.engine('ejs', engine)
		.set('view engine', 'ejs')
		.use(compression())
		.use(function(req, res, next){
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header('Cache-Control', 'public, max-age=31557600');
			next();
		})
		.use(isProd ? assetsRouting : function(req, res, next){next()})
		.use(express.static('./dist'))		
		.use('/node_modules', express.static('./node_modules'))
		.set('views', './views')
		.use('/uikit', uiKitRouting)
		.use('/uikit/v1', uiKitV1Routing)
		.listen(env.PORT_PROD, function(){
			console.log('Server listen on Port '+env.PORT_PROD)
		})
}
