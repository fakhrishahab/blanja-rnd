'use strict';

import $ from 'jquery';
import appHeader from '../views/components/header.vue';
// import Vue from 'vue';

module = function(){
// 	// let self = this;
	var elements = {
		staticMenu: "#staticMenu"
	};

	var init = function(){
		onScrollBody();
	};

	var onScrollBody = () => {
		$(window).on('scroll', () => {
			var fromTop = $(window).scrollTop();
			if(fromTop >= 60){
				if(!$(elements.staticMenu).hasClass('fixed')){
					$(elements.staticMenu).addClass('fixed');	
				}				
			}else{
				if($(elements.staticMenu).hasClass('fixed')){
					$(elements.staticMenu).removeClass('fixed');	
				}
			}
		});
	};

	return{
		init: init,
		onScrollBody: onScrollBody
	};
}();

// Vue.component('app-header', {
// 	data: function(){
// 		return{
// 			msg: '<span>silit</span>'
// 		}
// 	}
// });

new Vue({
	el: '#app',
	data: {
		title: 'Application Info 2'
	},
	components: {
		appHeader
	},
	methods: {
		test: function(){
			console.log('test');
		}
	}
});

module.onScrollBody();