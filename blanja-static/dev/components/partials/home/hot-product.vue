<template>
    <section class="hot-product">
        <swiper class="hot-product__cat-wrapper" :options="swiperOption" ref="mySwiper">
            <swiper-slide class="hot-product__cat-swiper" v-for="(item, index) in categoryList" v-bind:key="index">
                <div @click="categoryClick(index, item.id)" class="hot-product__cat-trigger" :class="(index == activeCat) ? 'active' : ''">
                    <div class="hot-product__cat-icon">
                        <i :class="'bl-'+item.class"></i>
                    </div>
                    <div class="hot-product__cat-title">
                        {{item.name}}
                    </div>
                </div>                
            </swiper-slide>

            <div class="hot-product__cat-prev cat-prev swiper-button-prev" slot="button-prev">
                <div class="hot-product__cat-prev-btn">
                    <i class="bl-chevron-left"></i>
                </div>
            </div>
            <div class="hot-product__cat-next cat-next swiper-button-next" slot="button-next">
                <div class="hot-product__cat-next-btn">
                    <i class="bl-chevron-right"></i>
                </div>
            </div>
        </swiper>
        
        <div class="hot-product__content-wrapper">
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

            <div class="hot-product-wrapper" v-if="!preload">
                <div class="hot-product__item" v-for="(item, index) in productList" v-bind:key="index">
                    <a :href="'//'+item.link">
                    <div class="hot-product__item-pic">
                        <figure>
                            <img v-lazy="item.image">
                        </figure>
                    </div>
                    <div class="hot-product__item-detail">
                        <div class="hot-product__item-title">
                            <a :href="item.link">
                                <h3>{{item.title}}</h3>
                            </a>
                        </div>  
                        <div class="hot-product__item-description">
                            <span class="hot-product__item-discount">{{item.discount_rate}}%</span>
                            <span class="hot-product__item-price">{{item.discount_price | formatMoney}}</span>
                            <span class="hot-product__item-price-origin" v-if="item.origin_price > 0">{{item.origin_price | formatMoney}}</span>
                        </div>               
                        
                        <div class="hot-product__btn-fav">
                            <i class="bl-love-fill"></i>
                        </div>
                    </div>
                    </a>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper';
import axios from 'axios';
import PROFILE from '@config/profile';
import filter from '@/plugins/filter';

export default {
    name: 'hotProduct',
    data: function(){
        return{
            activeCat: 0,
            categoryList : [
                {id: 'all', name: 'Kategori', class: 'menu-bar'},
                {id: 'Fashion&Aksesoris', name: 'Fashion & Aksesoris', class: 'fashion'},
                {id: 'Kesehatan&kecantikan', name: 'Kesehatan & kecantikan', class: 'health' },
				{id: 'Telepon&Gadget', name: 'Telepon & Gadget', class: 'phone' },
				{id: 'Anak,Bayi&Mainan', name: 'Anak, Bayi & Mainan', class: 'kids' },
				{id: 'Rumah&Elektronik', name: 'Rumah & Elektronik', class: 'housing' },
				{id: 'Komputer', name: 'Komputer', class: 'screen' },
				{id: 'Otomotif', name: 'Otomotif', class: 'auto' },
				{id: 'Fotografi&Video', name: 'Fotografi & Video', class: 'photo' },
				{id: 'Sport,Travel&Food', name: 'Sport, Travel & Food', class: 'sport' },
            ],
            notNextTick: true,
            swiperOption:{
                slidesPerView: 5,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.cat-next',
                    prevEl: '.cat-prev'
                }
            },
            productList: '',
            preload: true         
        }
    },
    components:{
        swiper,
        swiperSlide
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted: function(){
        this.fetchProductList('all');
    },
    methods: {
        categoryClick: function(index, category){
            this.activeCat = index;
            // this.fetchProductList(category);
        },
        fetchProductList: function(category){
            // console.log(category);
            this.preload = true;
            var cat = (category) ? category : '';
            axios.get(PROFILE.serviceUrl+'/home/hot_product/'+cat)
            .then((response) => {
                this.preload = false;
                this.productList = response.data;
                setTimeout(() => {
                    window.menuSlider.update()
                }, 10)
            })
            .catch((err) => {
                this.preload = false;
                console.log(err);
            })
        }      
    }
}
</script>

<style>

</style>
