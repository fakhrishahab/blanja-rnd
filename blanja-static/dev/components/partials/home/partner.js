import partner from './partner.vue';
import VueLazyLoad from 'vue-lazyload';
import Vue from 'vue';

Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	error: '/assets/images/common/default_65x65.jpg',
	loading: '/assets/images/common/default_65x65.jpg',
	attempt: 1
});

new Vue({
    el: '#partner',
    components: {
        partner
    }
});