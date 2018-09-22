<template>
    <div class="box">
        <span class="date">{{ formatDate(transaction.created_at) }}</span>
        <div class="msg">
            O usuário '{{ author_name }}'
            {{ transaction.type=="add" ? 'GANHOU' : 'PERDEU' }}: <b>{{ transaction.points.toFixed(2) }}</b> ponto(s)</div>
        
        <a-box-info-question :id="transaction.question_id" :author="author_name">
            <div class="link-question">Informação da questão que foi votada</div>
        </a-box-info-question>
    </div>
</template>

<script>
import User from '@/middleware/User'
import BoxInfoQuestion from '@/views/components/dashboard/shared/Box-info-question'

export default {
    props: ['transaction'],

    components: {
        'a-box-info-question': BoxInfoQuestion
    },

    data: () => ({
        author_name: ''
    }),

    async mounted() {
        try {
            let response = await User.getById(this.transaction.author_id)
            this.author_name = response.data.users.name

        } catch(error) {
            let message = 'Erro no nosso servidor, entre em contato com nosso administrador'
            this.$alert(message, "Erro ao carregar as informações", {
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'OK',
                type: 'error'
            })
        }
    },

    methods: {
        formatDate(date) {
            date = new Date(date)
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` 
        }
    }
}
</script>

<style lang="sass" scoped>
.box
    border: 1px solid #CCC
    border-radius: 10px
    padding: 5px 10px
    background: #FFF
    margin-bottom: 5px

    span.date
        display: block
        color: #666
        font-size: 0.8em

    .link-question
        color: blue
        color: 0.9em
        cursor: pointer
    .link-question:hover
        text-decoration: underline
</style>
