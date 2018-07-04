import bestSeller from './best-seller.vue';
import VueLazyLoad from 'vue-lazyload';
import Vue from 'vue';
import PROFILE from '@config/profile';

Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	error: PROFILE.res1Url+'/assets/images/common/default_65x65.jpg',
	loading: PROFILE.res1Url+'/assets/images/common/default_65x65.jpg',
	attempt: 1
});

new Vue({
    el: '#best-seller',
    components: {
        bestSeller
    }
});