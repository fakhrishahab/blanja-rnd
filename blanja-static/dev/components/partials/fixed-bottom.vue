<template>
    <div>
        <ul class="menu-bottom">
            <li class="menu-bottom__item menu-bottom__item--active">
                <a :href="PROFILE.mobileBaseUrl">
                    <i class="menu-bottom__icon bl-home"></i>
                </a>
            </li>
            <li class="menu-bottom__item">
                <a @click="setShowModal">
                    <i class="menu-bottom__icon bl-search-2"></i>
                </a>
            </li>
            <li class="menu-bottom__item">
                <a @click="zenboxOpen" v-if="!loadingShow">
                    <i class="menu-bottom__icon bl-cs-2"></i>
                </a>
                <img v-if="loadingShow" class="loadingZenbox" :src="PROFILE.res1Url+'/commons/images/common/loading-circle.svg'">
            </li>
            <li class="menu-bottom__item">
                <a :href="PROFILE.mobileBaseUrl+'/member/login'">
                    <i class="menu-bottom__icon bl-account-outline"></i>
                </a>
            </li>
        </ul>

        <modal-search :isModalShow="isModalShow" v-on:closeSearchModal="doCloseSearchModal"></modal-search>
    </div>
</template>

<script>
    import PROFILE from '@config/profile';
    import modalSearch from '@/components/modal-search';

    export default {
        name: 'fixed-bottom',
        data: function(){
            return{
                PROFILE : PROFILE,
                isModalShow : false,
                loadingShow: false
            }
        },
        components: {
            modalSearch
        },
        methods: {
            setShowModal: function(){
                this.isModalShow = true;
            },
            doCloseSearchModal: function(){
                this.isModalShow = false;
            },
            zenboxOpen: function(e){
                var selfVue = this;
                var self = $(e.srcElement).parent();
                this.loadingShow = true;

                window.zEmbed || function (e, t) {
                var n,
                o,
                d,
                i,
                s,
                a = [],
                r = document.createElement("iframe");
                window.zEmbed = function () {
                    a.push(arguments)
                },
                window.zE = window.zE || window.zEmbed,
                r.src = "javascript:false",
                r.title = "",
                r.role = "presentation",
                (r.frameElement || r).style.cssText = "display: none",
                d = document.getElementsByTagName("script"),
                d = d[d.length - 1],
                d.parentNode.insertBefore(r, d),
                i = r.contentWindow,
                s = i.document;
                try {
                    o = s
                } catch (e) {
                    n = document.domain,
                    r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);',
                    o = s
                }
                o.open()._l = function () {
                    var o = this.createElement("script");
                    n && (this.domain = n),
                    o.id = "js-iframe-async",
                    o.src = e,
                    this.t = +new Date,
                    this.zendeskHost = t,
                    this.zEQueue = a,
                    this.body.appendChild(o);
                    
                    // var langLocale = loxia.getCurrentLocale();
                    // if (langLocale == "en_US"){
                    //     langLocale == 'en';
                    // }else {langLocale = 'id';}

                    zE(function() { 
                        zE.setLocale('id'); 
                        zE.hide();
                    });
                    
                    window.zESettings = { 
                        webWidget: {
                            color: { theme: '#e2211d' },
                            contactForm: {
                                attachments: false,
                                title: {
                                    'id': 'Tanya Kami',
                                    '*': 'Tanya Kami'
                                }
                            }
                        } 
                    };
                        
                    zE(function() {
                        zE.activate({hideOnClose: true});
                    });
                    
                    self.click(function() {
                        zE.activate({hideOnClose: true});
                    });
                    
                },
                    o.write('<body onload="document._l();">'),
                    o.close()
                }
                ("https://assets.zendesk.com/embeddable_framework/main.js", "blanja.zendesk.com");
            
                var interval = setInterval(function(){
                    if($(".zopim").length != 0) {
                        setTimeout(function(){
                            selfVue.loadingShow = false;
                        }, 2000)
                    }
                }, 500);
            
                setTimeout(function(){
                    clearInterval(interval);
                }, 10000);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/styles/components/fixed-bottom';
</style>