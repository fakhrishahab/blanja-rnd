import express from 'express';
let route = express.Router();
import env from '../middleware/env';
import axios from 'axios';

function fetchSliderImage(req, res, next){
	return axios.get(res.locals.profile.serviceUrl+'/home/get_slider_image')
		.then(function(response){
			return response.data;
		})
		.catch(function(error){
			next()
		})
}

var getSliderImage = function(req, res, next){
	return new Promise(
		function(resolve, reject){
			res.redisClient.get('slider_image', function(err, result){ 
				try{
					if(result){
						resolve(JSON.parse(result))
					}else{
						resolve(fetchSliderImage(req, res, next));
					}
				} catch(err){
					console.log(err);
					next();
				}
				
			});
		}
	)
	
}

function fetchShortcut(req, res, next){
	return axios.get(res.locals.profile.serviceUrl+'/home/get_shortcut')
	.then(function(response){
		return response.data;
	})
	.catch(function(error){
		next()
	})
}

function getShortcut(req, res, next){
	return new Promise(
		function(resolve, reject){
			res.redisClient.get('shortcut_icon', function(err, result){ 
				try{
					if(result){
						resolve(JSON.parse(result));
						// next();
					}else{
						resolve(fetchShortcut(req, res, next));
					}
				} catch(err){
					console.log(err);
					next();
				}
				
			});
		}
	)
}

route
.get('/', async function(req, res, next){	
	try{
		var sliderImage = await getSliderImage(req, res, next)
			.then((result) => {	
				return result;
			})
			.catch((error) => {
				console.log(error);
			})
		
		var shortcut = await getShortcut(req, res, next)
			.then((result) => {
				return result;
			})
			.catch((error) => {
				console.log(error);
			})

		return res.render('./pages/homepage', {
			name: 'test',
			sliderImage: sliderImage,
			shortcutIcon : shortcut,
			style: [
				res.locals.profile.staticUrl+'/assets/styles/homepage.css'
			],
			script: [
				res.locals.profile.staticUrl+'/pages/homepage.js'
			]
		});
	}catch(error){
		next(error);
	}
	
})

module.exports = route;
