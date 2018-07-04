<template>
    <div v-if="isModalShow" class="modal-search__wrapper">    
        <div class="modal-search__header">
            <div class="modal-search__back" @click="$emit('closeSearchModal')">
                <i class="bl-arrow-left modal-search__btn-back"></i>
            </div>

            <form class="modal-search__form" method="post" :action="PROFILE.mobileBaseUrl+'/items/index'">
                <button type="submit" class="modal-search__btn-search">
                    <i class="bl-search"></i>
                </button>
                <input tabindex="1" v-model="searchInput" ref="searchInput" type="search" name="keyWords" autocomplete="off" placeholder="Mau Blanja apa hari ini?" class="modal-search__input">
                <i class="bl-close modal-search__btn-delete" @click="resetInput"></i>
            </form>
        </div>

        <div class="modal-search__result">
        </div>
    </div>
</template>

<script>
    import PROFILE from '@config/profile';

    export default {
        name: 'modalSearch',
        props: ['isModalShow'],
        data: function(){
            return{
                PROFILE: PROFILE,
                searchInput : ''
            }
        },
        mounted: function(){
            this.$watch('isModalShow', function(val){
                if(val){
                    this.$refs.searchInput.focus();
                }
            })
        },
        methods: {
            resetInput: function(){
                this.searchInput = '';
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/components/modal-search';
</style>