var express = require('express');
var indexRouting = require('./routes/index');
var assetsRouting = require('./routes/assets');
var engine = require('ejs-locals');
var compression = require('compression');
// var profile = require('./config/profile');
// import {create_server} from './build/server';

var http = require('http');

http.createServer(

  express()
  	.engine('ejs', engine)
	.set('view engine', 'ejs')
	.use(compression())
	.use(function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header('Cache-Control', 'public, max-age=31557600');
		next();
	})
	.use(assetsRouting)
	.use(express.static('./dist'))
	.set('views', './views')
	.use(indexRouting)
).listen(3000);