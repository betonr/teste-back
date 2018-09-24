<template>
    <section>
        <el-button type="info" @click="visible = true" plain>
            <i class="el-icon-d-arrow-right"/> LOGIN - ADMINISTRADOR
        </el-button>

        <form @submit.prevent="login">
            <el-dialog :title="title" 
                :visible.sync="visible" 
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                custom-class="box-login">

                <input 
                    v-validate="'required|email'" 
                    v-model="email"
                    :class="{'input': true, 'is-danger': errors.has('email'), 'is-success': !errors.has('email') && email != '' }"
                    name="email" 
                    type="email" 
                    placeholder="E-MAIL" />
                <span v-show="errors.has('email')"> {{ errors.first('email') }} </span>
                <input 
                    v-validate="'required'" 
                    v-model="senha"
                    :class="{'input': true, 'is-danger': errors.has('senha'), 'is-success': !errors.has('senha') && senha != '' }"
                    name="senha"
                    type="password" 
                    placeholder="SENHA" />
                <span v-show="errors.has('senha')"> {{ errors.first('senha') }} </span>

                <div slot="footer">
                    <el-button @click="visible= false" type="text">SAIR</el-button>
                    <el-button native-type="submit" type="success">ENTRAR</el-button>
                </div>
            
            </el-dialog>
        </form>

    </section>
</template>

<script>
export default {
    props: ['title'],

    data: () => ({
        visible: false,
        email: '',
        senha: ''
    }),

    methods: {
        login() {
            let vm = this
            vm.$validator.validateAll().then( result => {
                if(result) vm.$emit('submit', {
                    email: vm.email,
                    password: vm.senha
                })
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.box-login
    input
        width: 100%
        margin-top: 7.5px
        border-radius: 7px
        border: 2px solid #CCC
        padding: 10px
        margin: 5px 0
        font-size: 1.1em
        color: #333
    input.is-danger
        border: 1px solid red
        background: rgba(red, 0.07)
    input.is-success
        border: 1px solid green
        background: rgba(green, 0.07)

    span
        color: red
        font-size: 0.9em
        padding: 0 10px
</style>
