import express from 'express';
import path from 'path';
import constant from '../../config/constant';

let app = express();
let route = express.Router();
var PROTO_PATH = 'protos/shortcut.proto';
var grpc = require('grpc');
var shortcutProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
var client = new shortcutProto.ShortCutService(constant.SERVER, grpc.credentials.createInsecure());

route
.get('/getShortcut', function(req, res, next){
    client.getShortCutList({id: 1}, function(err, response) {
        res.json(response);
    });    
})

module.exports = route;