var express = require('express');
var profile = require('../config/profile');
const basePath = {
	baseUrl : 'http://localhost:3000'
};

let router = express.Router();

router
.get('/', function(req, res, next){
	res.render('./pages/uikit/homepage', Object.assign({
		logo :'Blanja',
		page : req.route.path
	},profile.default))
})
.get('/font-icon', function(req, res, next){
	res.render('./pages/uikit/font-icon', Object.assign({
		logo :'Blanja',
		page : req.route.path
	},profile.default))
})

module.exports = router;