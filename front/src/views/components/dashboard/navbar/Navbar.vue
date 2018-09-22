<template>
    <section class="navbar" id="navbar">
        <header class="header">
            <img :src="logo" title="logo" class="logo"/>
            <h1>{{ user.name }}</h1>
            <h2 v-if="points != null"><b>PONTOS:</b> {{ parseFloat(points).toFixed(2).toString() }}</h2>
        </header>

        <nav class="nav">
            <md-list v-for="link of links" :key="link.path">

                <div v-if="link.auth.some( func => func == user.func)">
                    <!-- IF NOT EXPAND -->
                    <md-list-item @click="updatePath(link.title)" v-if="!link.extended" :to="link.path" :class="pathFull == link.path ? 'active': ''">
                        <md-icon>{{ link.icon }}</md-icon>
                        <span class="md-list-item-text">{{ link.title }}</span>
                        
                        <div :class="pathFull == link.path ? 'efect-active': ''"></div>
                    </md-list-item>

                    <!-- EXPAND -->
                    <md-list-item v-else md-expand :md-expanded.sync="extended[link.title]" :class="`/${(pathFull.split('/'))[2]}` == link.path ? 'active': ''">
                        <md-icon>{{ link.icon }}</md-icon>
                        <span class="md-list-item-text">{{ link.title }}</span>

                        <!-- sublinks -->
                        <md-list slot="md-expand">
                            <div style="position: relative" v-for="sublink of link.children" :key="sublink.path" @click="updatePath(link.title)">
                                <md-list-item :class="pathFull == sublink.path ? 'active': ''" :to="sublink.path">
                                    - {{ sublink.title }} <span class="alert-sub" v-show="sublink.alert">3</span>
                                </md-list-item>
                                
                                <div :class="pathFull == sublink.path ? 'efect-sub-active': ''"></div>
                            </div>
                        </md-list>
                    </md-list-item>
                </div>

            </md-list>
        </nav>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import 'vue-material/dist/vue-material.min.css'

import Links from '@/views/components/dashboard/navbar/index'
import IconUser from '@/views/assets/images/user-icon.png'
export default {
    computed: {
        ...mapState('auth', ['user', 'points']),
        pathFull: function() {
            let route = this.$route.path
            return route
        }
    },

    data: () => ({
        links: [],
        logo: "",
        extended: []
    }),

    mounted() {
        this.links = Links
        this.getLogo(this.user)
    }, 
    
    methods:{
        getLogo(user) {
            if(user.photo != undefined && user.photo != '') {
                this.logo = user.photo
            } else {
                this.logo = IconUser
            }
        },
        updatePath(title) {
            Object.keys(this.extended).map( t => {
                if(t != title){
                    this.extended[t] = false
                }
            })
        }
    }
}
</script>

<style lang="sass">
.navbar
    width: 240px
    background: #003366
    padding: 0
    height: auto
    min-height: 100vh
    align-content: flex-start

    .header
        display: block
        width: 100%
        padding: 20px 0
        border-bottom: 1px double #CCC
        .logo
            display: block
            background-color: #000
            width: 90px
            height: 80px
            margin: 10px auto
            border-radius: 50%
            border: 5px solid rgba(#FFF, 0.5)
        h1
            color: #FFF
            font-size: 1.15em
            padding: 0 5px
            font-weight: 600
            text-align: center
        h2
            width: 100%
            background: #f5f5f0
            margin-top: 15px
            font-size: 1.4em
            text-align: center
            padding: 5px 0

    .nav, .md-list
        display: block
        width: 100%
        padding: 0
        margin: 0
        .md-list-item
            color: #DDD
            .md-list-item-text, a
                color: #DDD
                text-transform: uppercase

            .md-list-item-content
                padding: 15px 20px
                .md-icon
                    margin-right: 15px
                
                .efect-active
                    border-right: 19px solid transparent
                    border-top: 19px solid #f5f5f0
                    z-index: 10
                    transition: 0.3s
                    position: absolute
                    right: -10px
                    transform: rotate(315deg)

            .md-list-expand 
                .md-list-item-container
                    text-transform: capitalize !important
                
                .efect-sub-active
                    border-right: 12px solid transparent
                    border-top: 12px solid #f5f5f0
                    z-index: 10
                    transition: 0.3s
                    position: absolute
                    top: 20px
                    right: -6px
                    transform: rotate(315deg)
                
                .alert-sub
                    background: rgba(red, 0.8)
                    font-weight: 600
                    font-size: 0.9em
                    vertical-align: top
                    padding: 1px 5px
                    color: black
                    margin-left: 5px
                    margin-top: -10px
                    border-radius: 50%


        .md-list-item:hover, .md-list-item.active
            cursor: pointer
            background: rgba(#FFF, 0.1)
            border-left: 3px solid #66c2ff

@media (max-width: 840px)
    #navbar
        display: none
</style>
