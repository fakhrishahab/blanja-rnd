import express from 'express';
import path from 'path';
import constant from '../../config/constant';
import redis from 'redis';

let app = express();
let route = express.Router();
var PROTO_PATH = 'protos/menu.proto';
var grpc = require('grpc');

const getMenu = function(req, res, next){
    
    var menuProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    var client = new menuProto.MenuService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    client.getMenu( {method: 1},function(err, response) {
        if(response.status.code != '_200'){
            console.log(response.status.message);
            next();
        }else{
            res.redisClient.setex('menu_home', 3600 * 60, JSON.stringify(response.data));
            res.json(response);
        }
    }); 
}

route
.get('/get_menu', function(req, res, next){
    res.redisClient.get('menu_home', function(err, result){    
        if(result){
            res.json(JSON.parse(result));
        }else{
            getMenu(req, res, next);
        }
    })   
})

module.exports = route;