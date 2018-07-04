import express from 'express';
import indexRouting from './routes/index';
import env from './config/env';

var server = 
	express()
		.set('view engine', 'ejs')
		.use(function(req, res, next){
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		})
		.use(express.static('./dist'))
		.set('views', './views/layouts')
		.use(indexRouting)
		.listen(env.PORT_PROD, function(){
			console.log('Server listen on Port '+env.PORT_PROD)
		})

module.exports = server;