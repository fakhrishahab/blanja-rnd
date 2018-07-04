<template>
    <div class="header">
        <div class="header-download" v-if="isShowDownload">
            <a href="https://play.google.com/store/apps/details?id=com.blanja.apps.android" class="android-apps">
                <img :src="profile.res1Url+'/assets/images/common/banner_apps.png'" alt="Download Apps Blanja.com" title="Download Apps Blanja.com">
            </a>
            <i class="bl-close" v-on:click="isShowDownload = !isShowDownload"></i>
        </div>
        <header>
            <div class="header-wrapper">
                <div class="header-toggle">
                    <i class="bl-menu-bar" @click="showSidebar($event)"></i>
                </div>
                <div class="header-logo">
                    <a :href="profile.mobileBaseUrl">
                        <img :src="profile.res1Url+'/assets/images/common/logo/logo@1x.png'">
                    </a>
                </div>
                <div class="header__icon-cart">
                    <a :href="profile.mobileUrl+'/trade/shoppingcart'">
                        <i class="bl-cart-4"></i>
                        <div class="header__icon-cart__info">1</div>
                    </a>
                </div>
            </div>
            <div class="header-search">
                <div class="header-search__container">
                    <input v-on:focus="setShowModal" placeholder="Mau Blanja apa hari ini?" type="text" class="header-search__input"/>
                    <i class="bl-search"></i>
                </div>
            </div>
        </header>

        <sidebar v-bind:showSidebar="isShowSidebar" v-on:hideSidebar="doHideSidebar"></sidebar>

        <modal-search :isModalShow="isModalShow" v-on:closeSearchModal="doCloseSearchModal"></modal-search>
    </div>
</template>

<script>
    import sidebar from './sidebar';
    import modalSearch from '@/components/modal-search';
    import profile from '@config/profile';
    
    export default{
        name: 'appHeader',
        // props: ['profile'],
        data: function(){
            return{
                isShowDownload: false,
                isShowSidebar: false,
                isModalShow : false,
                profile : profile
            }            
        },
        components:{
            sidebar,
            modalSearch
        },
        created: function(){
            if(navigator.userAgent.match(/Android/i)){
                this.isShowDownload = true;
            }
        },
        methods: {
            showSidebar: function(){
                this.isShowSidebar = true;
            },
            doHideSidebar: function(){
                this.isShowSidebar = false;
            },
            setShowModal: function(){
                this.isModalShow = true;
            },
            doCloseSearchModal: function(){
                this.isModalShow = false;
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/components/header';    
</style>