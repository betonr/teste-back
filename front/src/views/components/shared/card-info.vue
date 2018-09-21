<template>
    <div class="dv-card" :style="`background: ${bg}`">
        <div class="title">
            <h2>{{ quant }}</h2>
            <h1>{{ title }}</h1>
            <md-icon class="md-size-4x">{{ icon }}</md-icon>
        </div>
        <router-link :to="link">veja mais +</router-link>
    </div>
</template>

<script>
export default {
    props: ['title', 'icon', 'bg', 'quant', 'link'],
}
</script>

<style lang="sass" scoped> 
.dv-card
    margin: 0 10px
    color: #FFF
    border-radius: 25px
    
    .title
        display: flex
        align-items: center
        h2
            font-weight: 600
            font-size: 3em
            padding: 0 20px
            display: inline-block
            text-align: center
            vertical-align: middle
            z-index: 2
        h1
            display: inline-block
            width: 100%
            font-size: 1.3em
            padding: 20px 0
            margin-bottom: 25px
            z-index: 2
        .md-icon
            right: 50px
            color: rgba(#FFF, 0.1)
            z-index: 1
        
    a 
        background: rgba(#FFF, 0.2)
        display: flex
        border-radius: 0 0 25px 25px
        padding: 2px 0px 3px 20px
        margin-top: 10px
        color: #FFF
        text-decoration: none
        text-transform: uppercase
        font-size: 0.85em
    a:hover
        background: rgba(#FFF, 0.4)

@media (max-width: 1300px)
    .dv-card
        margin: 0

        .title
            h2
                padding: 0 15px 
                font-size: 2.5em 
            h1
                font-size: 1em
            a 
                font-size: 0.75em

@media (max-width: 1150px)
    .dv-card
        min-width: 250px

@media (max-width:  610px)
    .dv-card
        margin-top: 10px
</style>