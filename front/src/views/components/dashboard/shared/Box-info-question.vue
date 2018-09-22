<template>
    <article>
        <span @click="open()">
            <slot/>
        </span>

        <el-dialog title="Visualize as Informações" 
                :visible.sync="visible"
                width="80%">

                <div class="body" v-if="visible && question != {}">
                    <p><b>Informação compartilhada:</b> {{ question.question }}</p>
                    <p><b>Autor:</b> {{ author }}</p>
                    <p><b>Data de criação:</b> {{ formatDate(question.created_at) }}</p>
                    <span v-if="question.answers != undefined">
                        <p><b>Quantidade de votos corretos:</b> {{ question.answers.correct.length }}</p>
                        <p><b>Quantidade de votos errados:</b> {{ question.answers.wrong.length }}</p>
                    </span>
                </div>

                <div slot="footer">
                    <el-button @click="visible= false" plain>Fechar</el-button>
                </div>
        </el-dialog>
    </article>    
</template>

<script>
import Question from '@/middleware/Question'

export default {
    props: ['id', 'author'],

    data: () => ({
        visible: false,
        question: {}
    }),

    methods: {
        async getInfos() {
            try {
                const response = await Question.get(this.id)
                this.question = response.data.question
                this.visible = true
                
            } catch(_) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: 'Essa questão foi excluída por seu autor!',
                    type: 'error'
                })
            }
        },
        open() {
            if(this.visible) this.visible != false
            else this.getInfos()
        },
        formatDate(date) {
            date = new Date(date)
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` 
        }
    }
}
</script>


<style lang="sass" scoped>
.body
    p
        font-size: 1.1em
        padding: 0 15px 5px 15px
</style>
