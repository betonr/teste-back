<template>
    <section class="content">
        <header class="header">
            <div class="title">
                <h1>{{ this.$route.name }}</h1>
                <el-breadcrumb class="path" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="path in pathFull" :key="path">{{ path }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="logout">
                <button class="btn-logout" @click="logoff()">>> SAIR</button>
            </div>
        </header>

        <section class="content-page">
            <slot></slot>
        </section>

        <footer class="footer">
            <p>© 2018 - TEST-ALLGOO (back-end). Todos os direitos reservados.</p>
        </footer>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('auth', ['user']),
        pathFull: function() {
            let route = this.$route.path
            if( route[route.length-1] == '/') 
                return route.substring(1,route.length-1).split('/')
            else
                return route.substring(1).split('/')
        }
    },

    methods: {
        logoff() {
            this.$store.dispatch('auth/setUser', null)
            this.$store.dispatch('auth/setToken', null)
            this.$store.dispatch('auth/setPoints', null)

            this.$router.push({
                path: '/login'
            })

            this.$message({
                showClose: true,
                dangerouslyUseHTMLString: true,
                message: 'Você saiu com <strong>SUCESSO</strong>, volte logo!',
                type: 'success'
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.content
    flex: 1
    background: #f5f5f0

    .sub-header
        width: 100%
    
    .header 
        display: flex
        border-bottom: 1px solid #CCC
        padding: 5px 10px
        justify-content: space-between
        align-items: center

        .title
            padding: 5px 20px
            h1
                text-transform: uppercase
                font-size: 1.5em
                font-weight: 900
                margin: 0 !important
            .path 
                margin: 10px 0 5px 0

        .logout
            float: right
            padding-right: 20px
            .btn-logout
                background: none
                border: none
                transition: 0.7s
                cursor: pointer
            .btn-logout:hover
                color: #3399ff
                transition: 0.7s

    .footer
        padding: 10px 20px
        border-top: 1px solid #CCC
        p
            font-size: 0.9em
            color: #666

    .content-page
        padding: 25px
</style>