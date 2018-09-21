<template>
    <md-list-item class="btn facebook" @click="login()">
        <md-icon>thumb_up</md-icon> 
        <span class="md-list-item-text">Facebook</span>
    </md-list-item>
</template>

<script>
import FacebookLogin from '@/views/components/login/Facebook'

export default {
    components: {
        'a-login-facebook': FacebookLogin
    },

    beforeCreate() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '497482067332063',
                xfbml      : true,
                version    : 'v3.1'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },

    methods: {
        login() {
            FB.login( response => {
                this.$emit('submit', response.authResponse.accessToken)
            })                
        }
    }
}
</script>

<style lang="sass" scoped>
.facebook
    background: blue
    margin-right: 10px
</style>
