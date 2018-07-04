import express from 'express';
import httpProxy from 'http-proxy';
import config from '../config';

let app = express();
let apiProxy = httpProxy.createProxyServer();

app
.all('/member/*', function(req, res){
    console.log('redirecting to member server');
    apiProxy.web(req, res, {target: config.SERVICE_MEMBER});
})
.all('/product/*', function(req, res){
    console.log('redirecting to product server');
    apiProxy.web(req, res, {target: config.SERVICE_PRODUCT});
})
.all('/trade/*', function(req, res){
    console.log('redirecting to trade server');
    apiProxy.web(req, res, {target: config.SERVICE_TRADE});
})
.all('/platform/*', function(req, res){
    console.log('redirecting to platform server');
    apiProxy.web(req, res, {target: config.SERVICE_PLATFORM});
})

module.exports = app;

