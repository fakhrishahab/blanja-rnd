var express = require('express');
var router = express.Router();
var profile = require('../config/profile');

router
.get('/', function(req, res, next){
	res.render('./pages/uikit/v1', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/font-icon', function(req, res, next){
	res.render('./pages/uikit/font-icon', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/typography', function(req, res, next){
	res.render('./pages/uikit/typography', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/colors', function(req, res, next){
	res.render('./pages/uikit/colors', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/accordion', function(req, res, next){
	res.render('./pages/uikit/accordion', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/alert', function(req, res, next){
	res.render('./pages/uikit/alert', Object.assign({
		page : req.route.path,
		scripts : 'alert'
	}, profile.default))
})
.get('/badges', function(req, res, next){
	res.render('./pages/uikit/badges', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/button', function(req, res, next){
	res.render('./pages/uikit/button', Object.assign({
		page : req.route.path,
		scripts : 'index'
	}, profile.default))
})
.get('/card', function(req, res, next){
	res.render('./pages/uikit/card-product', Object.assign({
		page : req.route.path,
		scripts : 'modals'
	}, profile.default))
})
.get('/carousel', function(req, res, next){
	res.render('./pages/uikit/carousel', Object.assign({
		page : req.route.path,
		scripts : 'modals'
	}, profile.default))
})
.get('/form', function(req, res, next){
	res.render('./pages/uikit/form', Object.assign({
		page : req.route.path,
		scripts : 'form'
	}, profile.default))
})
.get('/checkbox', function(req, res, next){
	res.render('./pages/uikit/checkbox', Object.assign({
		page : req.route.path,
		scripts : 'modals'
	}, profile.default))
})
.get('/list', function(req, res, next){
	res.render('./pages/uikit/list', Object.assign({
		page : req.route.path,
		scripts : 'modals'
	}, profile.default))
})
.get('/modals', function(req, res, next){
	res.render('./pages/uikit/modals', Object.assign({
		page : req.route.path,
		scripts : 'modals'
	}, profile.default))
})
.get('/navigation', function(req, res, next){
	res.render('./pages/uikit/navigation', Object.assign({
		page : req.route.path,
		scripts : 'modals'
	}, profile.default))
})
.get('/popovers', function(req, res, next){
	res.render('./pages/uikit/popovers', Object.assign({
		page : req.route.path,
		scripts : 'popovers'
	}, profile.default))
})
.get('/popover2', function(req, res, next){
	res.render('./pages/uikit/popover2', Object.assign({
		page : req.route.path,
		scripts : 'popovers2'
	}, profile.default))
})

module.exports = router;