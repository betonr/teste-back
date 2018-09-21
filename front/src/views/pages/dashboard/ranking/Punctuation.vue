<template>
    <section>
        <el-table
            ref="punctuationRanking"
            :data="users"
            style="width: 100%">

            <el-table-column
                type="index"
                width="50" />
            <el-table-column
                property="name"
                label="Nome do Usuário" />
            <el-table-column
                property="punctuation"
                label="Pontuação" />
        </el-table>
    </section>
</template>

<script>
import Punctuation from '@/middleware/Punctuation'
import User from '@/middleware/User'

export default {
    data: () => ({
        users: [],
    }),

    async mounted() {
        try {
            let response = await Punctuation.get()
            let promiseUser = response.data.punctuations.map( async punctuation => {
                let userResponse = await User.getById(punctuation.user_id)
                return {
                    name: userResponse.data.users.name,
                    punctuation: punctuation.points
                }
            })

            Promise.all(promiseUser).then( result => {
                this.users = result
                this.users.sort( (a, b) => {
                    return a.punctuation + b.punctuation
                })
            })
        
        } catch(error) {
            if(error.response.status != undefined && error.response.status == 403){
                this.$store.dispatch('auth/setUser', null)
                this.$store.dispatch('auth/setToken', null)
                this.$store.dispatch('auth/setPoints', null)

                this.$router.push({
                    path: '/login'
                })

            } else {
                this.$alert("Desculpe, servidor indisponível! Volte mais tarde ou entre em contato com nosso suporte", "Erro interno", {
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'OK',
                type: 'error'
                })
            }
        }
    }
}
</script>
