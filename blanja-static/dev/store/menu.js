import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu: []
    },
    mutations: {
        GET_MENU(state, data){
            state.menu = data;
        }
    },
    actions: {
        getMenu(context, data){
            context.commit('GET_MENU', data);
            // console.log(data.list);
            // commit('GET_MENU', data.list)
        }
    }
})