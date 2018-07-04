const express = require('express');
const app = express();
const engine = require('ejs-locals');
import config from './config';
import compression from 'compression';
import indexController from './controllers/index-controller.js';
import {urlencoded, json} from 'body-parser';
import minify from 'express-minify';
import minifyHtml from 'express-html-minify';

import env from './middleware/env';
import proxyConfig from './middleware/http-proxy';
import redisClient from './middleware/redis';
import responseTime from 'response-time';
import interceptor from './middleware/interceptor';

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