require('babel-register');
const express = require('express');
const app = express();
const engine = require('ejs-locals');
const config = require('./config');
const compression = require('compression');
const indexController = require('./controllers/index-controller');
const {urlencoded, json} = require('body-parser');
const minify = require('express-minify');
const minifyHtml = require('express-html-minify');

const env = require('./middleware/env');
const proxyConfig = require('./middleware/http-proxy');
const redisClient = require('./middleware/redis');
const responseTime = require('response-time');
const interceptor = require('./middleware/interceptor');

const isProd = process.env.NODE_ENV === 'production';

app
.engine('ejs', engine)
.set('view engine', 'ejs')
.set('view cache', isProd)
.use(responseTime())
.use(redisClient)
.use(compression({level : 9}))
.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Cache-Control', 'public, max-age=31557600');
	next();
})
.use(urlencoded({extended: false}))
.use(json())
// get environment profile
.use(env)
.use(proxyConfig)
.use(minify())
.use(minifyHtml)
// .use(interceptor)
.set('views', './views')
.use(indexController)
.listen(config.PORT, function(){
	console.log('Server listen on Port: '+ config.PORT)
})