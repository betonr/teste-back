<template>
    <div class="dashboard">
        
        <dv-navbar-mobile/>

        <dv-navbar/>

        <dv-content>
            <!-- CONTENT PAGE -->
            <router-view/>
        </dv-content>
        
    </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'

import NavbarMobile from '@/views/components/dashboard/navbar/NavbarMobile'
import Navbar from '@/views/components/dashboard/navbar/Navbar'
import Content from '@/views/components/dashboard/Content'

export default {
    components: {
        'dv-navbar-mobile': NavbarMobile,
        'dv-navbar': Navbar,
        'dv-content': Content
    }
}
</script>

<style lang="sass" scoped>
.dashboard
    display: flex
    height: 100%

@media (max-width: 840px)
    .dashboard
        display: block
        height: 100%
</style>
