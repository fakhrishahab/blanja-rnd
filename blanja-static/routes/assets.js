var express = require('express');
const path = require('path');
let route = express.Router();

route
.get('*.js', function(req, res, next){
	req.url = req.url + '.gz';
	res.set("Content-Type", "application/javascript");
	res.set("Content-Encoding", "gzip");
	next();
})
.get('*.css', function(req, res, next){
	req.url = req.url + '.gz';
	res.set("Content-Type", "text/css");
	res.set("Content-Encoding", "gzip");
	console.log(req.url);
	next();
})
.get('*.woff', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
})
.get('*.png', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
})

module.exports = route;