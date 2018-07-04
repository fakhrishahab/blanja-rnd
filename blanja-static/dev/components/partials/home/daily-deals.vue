<template>
    <section class="daily-deals">
        <div class="home-section-title">
            Super Deals
        </div>

        <div class="product-preload" v-if="preload">
            <div class="product-preload-wrapper">
                <div class="product-preload__img">
                </div>
                <div class="product-preload__detail">
                    <div class="product-preload__title"></div>
                    <div class="product-preload__price"></div>
                </div>
            </div>
        </div>

        <div class="daily-deals-wrapper" v-if="!preload">    
            <div class="daily-deals__item" v-for="item in dailyDeals" v-bind:key="item.id">
                <a :href="'//'+item.mobile_link">
                <div class="daily-deals__item-pic">                    
                    <figure >
                        <img v-lazy="item.mobile_img" >
                    </figure>
                </div>
                <div class="daily-deals__item-detail">
                    <div class="daily-deals__item-title">
                        <a :href="item.mobile_link">
                            <h3>{{item.title}}</h3>
                        </a>
                    </div>  
                    <div class="daily-deals__item-description">
                        <span class="daily-deals__item-discount">{{item.discount_rate}}%</span>
                        <span class="daily-deals__item-price">{{item.discount_price | formatMoney}}</span>
                        <span class="daily-deals__item-price-origin" v-if="item.origin_price > 0">{{item.origin_price | formatMoney}}</span>
                    </div>               
                    
                    <div class="daily-deals__btn-fav">
                        <i class="bl-love-fill"></i>
                    </div>
                </div>
                </a>
            </div>
        </div>

    </section>
</template>

<script>
    import axios from 'axios';
    import PROFILE from '@config/profile';
    import filter from '@/plugins/filter';

    export default{
        name: 'dailyDeals',
        data: function(){
            return {
                dailyDeals: '',
                preload: true,
                profile: PROFILE
            }
        },
        filters: filter,
        created: function(){
            axios.get(PROFILE.serviceUrl+'/home/daily_deals')
            .then((response) => {
                this.dailyDeals = response.data.list;
                this.preload = false;
            })
            .catch((err) => {
                console.log(err);
            });
            
        }
    }
</script>

<style lang="scss">
</style>