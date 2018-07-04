import redis from 'redis';

function redisClients(req, res, next){
    // console.log(req)
    res.redisClient = redis.createClient({host: '10.11.17.28'});
    next();
}

module.exports = redisClients;