import appHeader from './header.vue';
import PROFILE from '@config/profile';

new Vue({
    el: '#app-header',
    components: {
        appHeader
    },
    data: {
        profile : PROFILE
    }
});
