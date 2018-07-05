require('babel-register');

const cluster = require('cluster');

const clusterConfig = require('./app_cluster');

// if(cluster.isMaster){
//     clusterConfig();

// }else{
    require('./server_express');
// }
