import express from 'express';
import interceptor from 'express-interceptor';

let app = express();

export default interceptor(function(req, res, next){
    return{
        isInterceptable: function(){
            // console.log(res);
            return true;
        },
        intercept: function(body, send){
            res.render('./pages/homepage', {
                status: 'Not Found Page'
            });
            // console.log(send);
        }
    }
});