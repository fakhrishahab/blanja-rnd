import express from 'express';
import httpProxy from 'http-proxy';
import env from './env';

let app = express();
let apiProxy = httpProxy.createProxyServer();

app
.all('/commons/*', function(req, res){
    apiProxy.web(req, res, {target: res.locals.profile.staticUrl});
})

module.exports = app;