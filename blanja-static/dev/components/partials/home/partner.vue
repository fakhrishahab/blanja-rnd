<template>
    <section class="partner">
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

        <div class="partner-wrapper" v-if="!preload">    
            <div class="partner__item" v-for="item in partners" v-bind:key="item.idx">
                <a href="">
                <div class="partner__item-pic">
                    <figure>
                        <img v-lazy="item.mobile_img">
                    </figure>
                </div>
                <div class="partner__item-detail">
                    <div class="partner__item-title">
                        <a :href="item.mobile_link">
                            <h3>{{item.title}}</h3>
                        </a>
                    </div>  
                    <div class="partner__item-description">
                        <span class="partner__item-subtitle">{{item.description}}</span>
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

export default {
    name: 'partner',
    data: function(){
        return{
            partners : '',
            preload : true
        }
    },
    mounted: function(){
        axios.get(PROFILE.serviceUrl+'/home/partner')
        .then((response) => {
            this.partners = response.data;
            this.preload = false;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
</script>

<style>

</style>
