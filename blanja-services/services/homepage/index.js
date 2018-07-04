import express from 'express';
import path from 'path';
import constant from '../../config/constant';
import redis from 'redis';
import grpc from 'grpc';

let app = express();
let route = express.Router();

route
.get('/get_slider_image', function(req, res, next){
    
    const PROTO_PATH_BANNER = 'protos/rollingbanner.proto';
    const memberProto = grpc.load(PROTO_PATH_BANNER).com.metraplasa.mobile.mainsite.proto;
    const member = new memberProto.RollingBannerService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getSliderImage = function(req, res){    
        member.getRollingBanner({method: 1}, function(err, response) {
            if(response){
                if(response.status.code != '_200'){
                    console.log('getSliderImage', response.status.message);
                    next();
                }else{
                    res.redisClient.setex('slider_image', 3600, JSON.stringify(response.data));
                    res.json(response.data);
                }
            }else{
                next();
            }
            
            
        }); 
    }

    res.redisClient.get('slider_image', function(err, result){   
        if(result){
            res.json(JSON.parse(result));
        }else{
            getSliderImage(req, res);
        }
    })  
})
.get('/get_shortcut', function(req, res, next){
    
    const PROTO_PATH_SHORTCUT = 'protos/shortcut.proto';
    const shortcutProto = grpc.load(PROTO_PATH_SHORTCUT).com.metraplasa.mobile.mainsite.proto;
    const shortcut = new shortcutProto.ShortCutService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getShortcut = function(req, res){
        shortcut.getShortCutList({method: 1}, function(err, response) {
            if(response){
                if(response.status.code != '_200'){
                    console.log('getShortcut', response.status.message);
                    next();
                }else{
                    res.redisClient.setex('shortcut_icon', 3600, JSON.stringify(response.data));
                    res.json(response.data);
                }
            }else{
                next();
            }                        
        }); 
    }
    res.redisClient.get('shortcut_icon', function(err, result){   
        if(result){
            res.json(JSON.parse(result));
        }else{
            getShortcut(req, res);
        }
    })   
})
.get('/daily_deals', function(req, res, next){
    const PROTO_PATH = 'protos/dailydeals.proto';
    const dailydealsProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    const dailydeals = new dailydealsProto.DailyDealsService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getDailyDeals = function(req, res, next){
        dailydeals.getDailyDeals({method: 1}, function(err, response){
            if(response){
                if(response.status.code != '_200'){
                    console.log('getDailyDeals', response.status.message);
                    next();
                }else{
                    res.redisClient.setex('daily_deals', 3600, JSON.stringify(response.data));
                    res.json(response.data);
                }   
            }else{
                next();
            }
                            
        });
    }

    res.redisClient.get('daily_deals', function(err, result){
        try{
            if(result){
                res.json(JSON.parse(result));
            }else{
                getDailyDeals(req, res, next);
            }
        }catch(err){
            console.log(err);
            next();
        }
        
    });
})
.get('/best_seller', function(req, res, next){
    const PROTO_PATH = 'protos/bestseller.proto';
    const bestSellerProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    const bestSeller = new bestSellerProto.BestSellerService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getBestSeller = function(req, res, next){
        bestSeller.getBestSeller({method: 1}, function(err, response){
            if(response){
                if(response.status.code != '_200'){
                    console.log('getBestSeller', response.status.message);
                    next();
                }else{
                    res.redisClient.setex('best_seller', 3600, JSON.stringify(response.data));
                    res.json(response.data);
                }    
            }else{
                next();
            }
                         
        });
    }

    res.redisClient.get('best_seller', function(err, result){
        try{
            if(result){
                res.json(JSON.parse(result));
            }else{
                getBestSeller(req, res, next);
            }
        }catch(err){
            console.log(err);
            next();
        }
        
    });
})
.get('/partner', function(req, res, next){
    const grpcServer = '10.10.98.228:10001';
    const PROTO_PATH = 'protos/partner.proto';
    const partnerProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    const partner = new partnerProto.PartnerService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());
    // const partner = new partnerProto.PartnerService(grpcServer, grpc.credentials.createInsecure());

    const getPartner = function(req, res, next){
        partner.getPartnerPromo({method: 1}, function(err, response){
            if(response){
                if(response.status.code != '_200'){
                    console.log('getPartner', response.status.message);
                    next();
                }else{
                    res.redisClient.setex('partner', 3600, JSON.stringify(response.data));
                    res.json(response.data);
                }     
            }else{
                next();
            }
                        
        });
    }

    res.redisClient.get('partner', function(err, result){
        try{
            if(result){
                res.json(JSON.parse(result));
            }else{
                getPartner(req, res, next);
            }
        }catch(err){
            console.log(err);
            next();
        }
        
    });
})
.get('/brand', function(req, res, next){
    const PROTO_PATH = 'protos/brand.proto';
    const brandProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    const brand = new brandProto.BrandService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getBrand = function(req, res, next){
        brand.getBrands({method: 1}, function(err, response){
            if(response){
                if(response.status.code != '_200'){
                    console.log('getBrand', response.status.message);
                    next();
                }else{
                    res.redisClient.setex('brand', 3600, JSON.stringify(response.data));
                    res.json(response.data);
                }   
            }else{
                next();
            }
                          
        });
    }

    res.redisClient.get('brand', function(err, result){
        try{
            if(result){
                res.json(JSON.parse(result));
            }else{
                getBrand(req, res, next);
            }
        }catch(err){
            console.log(err);
            next();
        }
        
    });
})
.get('/hot_product/:category?', function(req, res, next){
    
    let category = 'all';
    if(req.params.category){
        category = req.params.category;
    }
    // console.log(category);
    const PROTO_PATH = 'protos/hotproduct.proto';
    const hotProductProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    const hotProduct = new hotProductProto.HotProductService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getHotProduct = function(req, res, next){
        hotProduct.getHotProducts({category}, function(err, response){
            if(response){
                if(response.status.code != '_200'){
                    console.log('getHotProduct', response.status.message);
                    next();
                }else{         
                    res.redisClient.setex('hot_product_'+category, 3600, JSON.stringify(response.data));           
                    res.json(response.data);
                }   
            }else{
                next();
            }                        
        });
    }

    res.redisClient.get('hot_product_'+category, function(err, result){
        try{
            if(result){
                res.json(JSON.parse(result));
            }else{
                getHotProduct(req, res, next);
            }
        }catch(err){
            console.log(err);
            next();
        }
        
    });
})
.get('/wide_rolling', function(req, res, next){
    const PROTO_PATH = 'protos/widerolling.proto';
    const wideRollingProto = grpc.load(PROTO_PATH).com.metraplasa.mobile.mainsite.proto;
    const wideRolling = new wideRollingProto.WideRollingService(res.locals.profile.grpcServer, grpc.credentials.createInsecure());

    const getWideRolling = function(req, res, next){
        wideRolling.getWideRollingList({method: 1}, function(err, response){
            if(response){
                if(response.status.code != '_200'){
                    console.log('getWideRolling', response.status.message);
                    next();
                }else{       
                    res.redisClient.setex('wide_rolling', 3600, JSON.stringify(response.data));                        
                    res.json(response.data);
                }   
            }else{
                next();
            }                        
        });
    }
    
    res.redisClient.get('wide_rolling', function(err, result){
        try{
            if(result){
                res.json(JSON.parse(result));
            }else{
                getWideRolling(req, res, next);
            }
        }catch(err){
            console.log(err);
            next();
        }
        
    });

})
module.exports = route;