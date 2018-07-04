<template>
    <section class="best-seller">
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

        <div class="best-seller-wrapper" v-if="!preload">    
            <div class="best-seller__item" v-for="item in bestSeller" v-bind:key="item.idx">
                <a :href="item.mobile_link">
                <div class="best-seller__item-pic">
                    <figure>
                        <img v-lazy="item.mobile_img">
                    </figure>
                    <span class="best-seller__item-num">{{item.idx}}</span>
                </div>
                <div class="best-seller__item-detail">
                    <div class="best-seller__item-title">
                        <a href="">
                            <h3>{{item.title}}</h3>
                        </a>
                    </div>  
                    <div class="best-seller__item-store">
                        <i class="bl-store"></i>
                        <span class="best-seller__item-store-name">{{item.seller_name}}</span>
                    </div>
                    <div class="best-seller__item-description">
                        <span class="best-seller__item-discount" v-if="item.price > 0">{{item.discount_rate}}</span>
                        <span class="best-seller__item-price">{{item.discount_price | formatMoney}}</span>
                        <span class="best-seller__item-price-origin" v-if="item.price > 0">{{item.price | formatMoney}}</span>
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

export default {
    name: 'best-seller',
    data: function(){
        return{
            bestSeller : '',
            preload: true
        }
    },
    mounted: function(){
        axios.get(PROFILE.serviceUrl+'/home/best_Seller')
            .then((response) => {
                this.bestSeller = response.data;
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