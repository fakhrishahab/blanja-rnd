<template>
    <section class="brand">
        <div class="brand-section-head">
            <div class="brand-section-title">
                Brand Store
            </div>
            <a :href="PROFILE.baseUrl+'/officialbrand'" class="brand-section-link">Lihat Semua <i class="bl-chevron-right"></i></a>
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



        <div class="brand-wrapper" v-if="!preload">    
            <div class="brand__item" v-for="item in brands" v-bind:key="item.idx">
                <a href="">
                <div class="brand__item-pic">
                    <figure>
                        <img v-lazy="item.mobile_img">
                    </figure>
                </div>
                <div class="brand__item-detail">
                    <div class="brand__item-wrapper">
                        <div class="brand__item-title">
                            <a :href="item.mobile_link">
                                <h3>{{item.title}}</h3>
                            </a>
                        </div>  
                        <div class="brand__item-description">
                            <span class="brand__item-subtitle">{{item.description}}</span>
                        </div> 
                    </div>
                      

                    <div class="brand__item-logo">
                        <img v-lazy="item.logo_img" alt="">
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
    name: 'brand',
    data: function(){
        return{
            brands: '',
            preload : true,
            PROFILE: PROFILE
        }
    },
    mounted: function(){
        axios.get(PROFILE.serviceUrl+'/home/brand')
        .then((response) => {
            this.brands = response.data;
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
