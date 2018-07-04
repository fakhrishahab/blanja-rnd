import header from '@/components/partials/head'; 
import fixedBottom from '@/components/partials/fixed-bottom';
import dailyDeals from '@/components/partials/home/daily-deals';
import bestSeller from '@/components/partials/home/best-seller';
import partner from '@/components/partials/home/partner';
import brand from '@/components/partials/home/brand';
import hotProduct from '@/components/partials/home/hot-product';
import PROFILE from '@config/profile';
import LazyLoad from '@/assets/scripts/vendors/lazyload/lazyload'; 

import Swiper from 'swiper';

$(document).ready(function(){
	window.menuSlider = new Swiper('.nav-slider-content', {
		pagination: {
			el: '.nav-slider-pg',
			clickable: true,
			renderBullet: function (index, className) {
				var names=["Home","Best Seller","Partners","Brand","Hot Products"];
				var returnVal;
				if (index > 0) {
					returnVal = '<h2>'+names[index]+'</h2>';
				} else {
					returnVal = names[index];
				}
				return '<div class="' + className + '">' + returnVal + '</div>';
			}
		},
		spaceBetween: 0,
		slidesPerView: 1,
		autoHeight: true,
		on: {
			slideChangeTransitionEnd : function () {
				// console.log('test')
				// $('img.swiper-lazy').lazyload();
			}
		},
		// initialSlide:4
	});

	var bannerSlider = new Swiper('.slider-banner-container', {
		preloadImages: false,
		lazy: {
			loadPrevNext: true
		},
		pagination: {
			el: '.slider-banner__pagination',
			clickable: true
		},
		fadeEffect: {
			crossFade: true
		},
		slidesPerView: 1,
		autoplay: true,
		autoplayDisableOnInteraction: false,
		speed: 1000,
		spaceBetween: 0,
		autoHeight: false,
		loop: true
	});
});

new LazyLoad();

// $("img.lazyload").LazyLoad();
