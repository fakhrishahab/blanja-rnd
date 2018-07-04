<template>
    <div>
        <div class="sidebar-wrapper" v-bind:class="{ 'sidebar-wrapper--show':  showSidebar }">
            <div class="sidebar">
                <div class="sidebar-title">Kategori</div>
                <ul class="sidebar-menu">
                    <li class="sidebar-menu__list" v-for="(item, index) in menu" v-bind:key="item.id">
                        <a @click="showMenu($event, item.id)">
                            <i class="sidebar-menu__icon" :class="menuIcon[index]"></i>
                            <span>{{item.name}}</span>
                            <i class="sidebar-menu__arrow" :class="showedMenu(item.id) ? 'bl-chevron-up' : 'bl-chevron-down'"></i>
                        </a>

                        <ul class="sidebar-menu sidebar-menu--submenu ">
                            <li class="sidebar-menu__list">
                                <a :href="item.mobileUrl">
                                    <span>Semua {{item.name}}</span>
                                </a>
                            </li>
                            <li class="sidebar-menu__list" v-for="subItem in item.child" v-bind:key="subItem.id">
                                <a @click="showMenu($event, subItem.id)">
                                    <span>{{subItem.name}}</span>
                                    <i class="sidebar-menu__arrow" :class="showedMenu(subItem.id) ? 'bl-chevron-up' : 'bl-chevron-down'"></i>
                                </a>

                                <ul class="sidebar-menu sidebar-menu--submenu2 ">
                                    <li class="sidebar-menu__list">
                                        <a :href="subItem.mobileUrl">
                                            <span>Semua {{subItem.name}}</span>
                                        </a>
                                    </li>
                                    <li class="sidebar-menu__list" v-for="subItem2 in subItem.child" v-bind:key="subItem2.id">
                                        <a>
                                            <span>{{subItem2.name}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-overlay" v-bind:class="{ 'sidebar-overlay--show':  showSidebar }" @click="$emit('hideSidebar')">
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PROFILE from '@config/profile';

    import Vuex from 'vuex';
    import store from '@/store/menu';

    Vue.use(Vuex);
    Vue.use(store);

    export default {
        name: 'sidebar',
        props: ['showSidebar'],
        store,
        data: function(){
            return {
                menu : '',
                openedTab : [],
                menuIcon : ['bl-fashion', 'bl-health', 'bl-phone', 'bl-screen', 'bl-housing',
                            'bl-kids', 'bl-sport', 'bl-photo', 'bl-auto', 'bl-film']
            }
        },
        beforeCreate: function(){
            axios.get(PROFILE.serviceUrl+'/menu/get_menu')
                .then(response => {
                    this.$store.dispatch('getMenu', response.data);
                    this.menu = this.$store.state.menu;                    
                })
                .catch(e => {
                    console.log('err', e);
                })
        },
        methods: {
            showMenu: function(evt, id){
                var elm = $(evt.srcElement).closest('li');

                if(this.openedTab.includes(id)){
                    var index = this.openedTab.indexOf(id);
                    this.openedTab.splice(index, 1);
                    elm.children('ul').slideUp();
                }else{
                    this.openedTab.push(id);
                    elm.children('ul').slideDown();    
                }                
            },
            showedMenu(id){
                if(this.openedTab.includes(id)){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/components/sidebar';
</style>