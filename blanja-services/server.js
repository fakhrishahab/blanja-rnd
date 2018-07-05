require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const proxyConfig = require('./middleware/proxy-server';
const compression = require('compression');
const routeMenu = require('./routes/menu');
const routeHome = require('./routes/homepage');
const responseTime = require('response-time');
const redisClients = require('./middleware/redis');
const env = require('./middleware/env');
const config = require('./config');
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
