import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// import proxyConfig from './middleware/proxy-server';
import compression from 'compression';
import routeMenu from './routes/menu';
import routeHome from './routes/homepage';
import responseTime from 'response-time';
import redisClients from './middleware/redis';
import env from './middleware/env';
import config from './config';
const pid = process.pid;

let app = express();

app
.use(compression())
.use(redisClients)
.use(env)
.use(bodyParser.urlencoded({extended: false}))
.use(bodyParser.json())
.use(responseTime())
.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
.use(function (err, req, res, next) {
    // console.error(err.stack)
    res.status(500).send('Something broke!')
})
// .use(proxyConfig)
.use(routeMenu)
.use(routeHome)
.listen(config.PORT, function(err, response){
    for (let i=0; i<1e7; i++); // simulate CPU work
    console.log(`Handled by process ${pid}`);
    console.log('Server listen at port '+config.PORT);
})
