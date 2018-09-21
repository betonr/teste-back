<template>
    <section class="honesty">
        <el-alert
            title="Só serão mostrados na listas, os usuários que possuirem pelo menos uma informação VERDADEIRA compartilhada!"
            type="warning">
        </el-alert>
        <br>
        <el-table
            ref="honestyRanking"
            :data="users"
            style="width: 100%">

            <el-table-column
                type="index"
                width="50" />
            <el-table-column
                property="name"
                label="Nome do Usuário" />
        </el-table>
    </section>
</template>

<script>
import Question from '@/middleware/Question'
import User from '@/middleware/User'

export default {
    data: () => ({
        users: [],
    }),

    async mounted() {
        try {
            let response = await Question.rankingHonesty()
            let rankingPromise = response.data.ranking.map( async user => {
                let userResponse = await User.getById(user._id)
                return {
                    name: userResponse.data.users.name,
                    count: user.count
                }
            })

            Promise.all(rankingPromise).then( result => {
                this.users = result
                this.users.sort( (a, b) => {
                    return a.count + b.count
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

<style lang="sass" scoped>
.honesty
</style>
