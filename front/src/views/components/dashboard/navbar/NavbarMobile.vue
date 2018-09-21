<template>
    <section class="navbar-mobile">
        <div class="header">
            <p>{{ user.name }}</p>
            <button 
                :class="nav ? 'btn-nav active': 'btn-nav'" 
                @click="nav = !nav">
                <md-icon>menu</md-icon>
            </button>
        </div>

        <nav class="links-mobile" v-show="nav">
            <md-list v-for="link of links" :key="link.path">
                
                <div v-if="link.auth.some( func => func == user.func)">
                    <!-- IF NOT EXPAND -->
                    <md-list-item @click="updatePath(link.title)" v-if="!link.extended" :to="link.path" :class="pathFull == link.path ? 'active': ''">
                        <md-icon>{{ link.icon }}</md-icon>
                        <span class="md-list-item-text">{{ link.title }}</span>
                    </md-list-item>

                    <!-- EXPAND -->
                    <md-list-item v-else md-expand :md-expanded.sync="extended[link.title]" :class="`/${(pathFull.split('/'))[2]}` == link.path ? 'active': ''">
                        <md-icon>{{ link.icon }}</md-icon>
                        <span class="md-list-item-text">{{ link.title }}</span>

                        <!-- sublinks -->
                        <md-list slot="md-expand">
                            <div style="position: relative" v-for="sublink of link.children" :key="sublink.path">
                                <md-list-item :class="pathFull == sublink.path ? 'active': ''" :to="sublink.path" @click="updatePath(link.title)">
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
import Links from '@/views/components/dashboard/navbar/index'

export default {
    computed: {
        ...mapState('auth', ['user']),
        pathFull: function() {
            let route = this.$route.path
            return route
        }
    },

    data: () => ({
        links: [],
        nav: false,
        extended: []
    }),

    mounted() {
        this.links = Links
    }, 
    
    methods:{
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

<style lang="sass" scoped>
.navbar-mobile
    display: none

@media (max-width: 840px)
    .navbar-mobile
        display: block
        width: 100%
        background: #003366

        .header
            display: flex
            border-bottom: 1px solid #CCC
            padding: 15px 20px
            justify-content: space-between
            align-items: center
            p
                color: #66c2ff
                font-size: 1.5em
                font-weight: 600
                margin: 0 !important
            .btn-nav
                background: none
                border: 2px solid #CCC
                border-radius: 5px
                cursor: pointer
                focus: none
                color: #FFF
                .md-icon
                    transition: 0 !important
            .btn-nav:hover, .btn-nav.active
                border: 2px solid #66c2ff
                color: #66c2ff
            

        .links-mobile
            display: block
            width: 100%

            ul
                padding: 0 !important
                
            .md-list-item
                color: #FFF
                margin: 0 !important
                
                .md-list-item-text, a
                    color: #FFF
                    text-transform: uppercase

                .md-list-expand 
                    .md-list-item-container
                        padding: 0 15px
                        text-transform: capitalize !important
                        
                        .md-list-item-content
                            justify-content: initial !important

                    .alert-sub
                        background: rgba(red, 0.8)
                        font-weight: 600
                        padding: 1px 5px
                        color: black
                        margin-left: 10px
                        border-radius: 50%

            .md-list-item:hover, .md-list-item.active
                cursor: pointer
                background: rgba(#FFF, 0.1)
                border-left: 3px solid #66c2ff
            
</style>