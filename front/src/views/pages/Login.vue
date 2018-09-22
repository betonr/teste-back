<template>
    <a-general title="Faça seu Login">
        
        <section class="box-btn-social">
            <a-login-facebook @submit="authenticateFacebook" />
        </section>

        <section class="box-btn-admin">
            <a-login-email title="Login - Administrador" @submit="authenticateAdmin" />
        </section>
        
    </a-general>
</template>

<script>
import General from '@/views/layouts/General'

import Authentication from '@/middleware/Authentication'
import Punctuation from '@/middleware/Punctuation'

import FacebookLogin from '@/views/components/login/Facebook'
import EmailLogin from '@/views/components/login/Email'

export default {
    components: {
        'a-general': General,
        'a-login-facebook': FacebookLogin,
        'a-login-email': EmailLogin
    },

    data: () => ({
        loading: ''
    }),

    methods: {
        async authenticateFacebook(accessToken) {
            try { 
                this._openFullScreen()
                const auth = await Authentication.loginSocial('facebook', accessToken)   
                let token = auth.data.token
                let userInfo = auth.data.me
                this.$store.dispatch('auth/setToken', token)
                this.$store.dispatch('auth/setUser', userInfo)

                const punctuation = await Punctuation.registerByUser({ user_id: userInfo.id })
                this.$store.dispatch('auth/setPoints', punctuation.data.points)  

                this.loading.close()
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: 'Logado com <strong>SUCESSO</strong>, seja Bem-Vindo!',
                    type: 'success'
                })
                let query = this.$route.query.redirect ? this.$route.query.redirect : '/dashboard/home';
                this.$router.push({
                    path: query
                })
            
            } catch(error) {
                this.loading.close()
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: 'Erro ao efetuar o login via facebook!',
                    type: 'error'
                });
            }
        },
        async authenticateAdmin(credentials) {
            try {
                this._openFullScreen()
                const auth = await Authentication.loginEmail('admin', credentials)  
                let token = auth.data.token
                let userInfo = auth.data.me

                this.$store.dispatch('auth/setToken', token)
                this.$store.dispatch('auth/setUser', userInfo)

                this.loading.close()
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: 'Logado com <strong>SUCESSO</strong>, seja Bem-Vindo!',
                    type: 'success'
                });
                let query = this.$route.query.redirect ? this.$route.query.redirect : '/dashboard/transaction';
                this.$router.push({
                    path: query
                })

            } catch(error) {
                this.loading.close()
                
                let message = ''
                if(error.response != undefined && error.response.status == 403) 
                    message = 'Erro: você precisa ser administrador!'
                else 
                    message = 'Erro: e-mail ou senha incorretos!'

                this.$message({
                    dangerouslyUseHTMLString: true,
                    message,
                    type: 'error'
                });
            }
        },
        _openFullScreen() {
            this.loading = this.$loading({
                lock: true,
                text: 'Carregando',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }

    }
}
</script>

<style lang="sass">
.box-btn-social
    display: flex
    align-items: center
    justify-content: center
    margin: 25px 0

    .btn
        padding: 10px 20px
        color: #FFF !important
        border-radius: 15px
        .md-list-item-text
            color: #FFF !important
            font-size: 1.15em 
        .md-icon
            margin-right: 10px
            color: #FFF !important

.box-btn-admin
        border-top: 1px solid #CCC
        padding: 10px 0
        display: flex
        justify-content: center
</style>
