<template>
    <div class="box-general">
        <section class="box-default">
            <div class="logo"> NOME BASE </div>
            <h1>{{ title }}</h1>

            <slot />

        </section>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="sass">
.box-general
    padding: 5% 0

    .box-default 
        background: #F1F1F1
        width: 50%
        display: block
        margin: 0 auto !important
        padding: 5px 0
        border-radius: 20px
        position: relative
        box-shadow: 0px 3px 10px #ccc

        .logo
            display: block
            margin: -30px auto 0 auto
            width: 250px
            background: #CCC
            text-align: center
            font-family: sans
            padding: 20px 40px
            color: #FFF
            font-weight: 600
            box-shadow: 2px 5px 7px #ddd
            border-radius: 15px

        h1
            margin: 25px 0 0 -2px
            padding: 12px 0 12px 25px
            border-left: 3px solid #003366
            font-size: 1.5em
            font-weight: 600
            text-transform: uppercase
            color: #003366


@media (max-width: 1024px)
    .box-general
        padding: 7% 0 !important
        .box-default
            width: 70%

@media (max-width: 880px)
    .box-general
        .box-default
            width: 80%

@media (max-width: 650px)
    .box-general
        padding: 10% 0 !important
        .box-default
            width: 90%

@media (max-width: 520px)
    .box-general
        padding: 15% 0 !important
        .box-default
            width: 94%
            .logo
                right: 25%
            h1
                margin: 7% 0 0 -2px
</style>
