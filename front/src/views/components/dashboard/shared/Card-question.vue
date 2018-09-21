<template>
    <article class="box-question" :style="closed ? 'border-color: red' : ''">
        <div>
            <div class="box-infos-user">
                <div class="picture">
                    <img :src="getPicture()" :title="`foto do ${authorInfo.name}`" />
                </div>

                <div class="infos">
                    <h2>{{ authorInfo.name }}</h2>
                    <p>{{ formatDate(question.created_at) }}</p>
                </div>
            </div>

            <p class="question">{{ question.question }}</p>

            <!-- <div v-if="!closed && question.author_id != user.id"> -->
            <div v-if="!closed && !question.answers.correct.some(id => id == user.id) && !question.answers.wrong.some(id => id == user.id)">
                <!-- <el-button @click="votar=true" v-show="!votar && question.author_id != user.id" type="info" icon="el-icon-edit" size="small" plain round>VOTAR</el-button> -->
                <el-button @click="votar=true" v-show="!votar" type="info" icon="el-icon-edit" size="small" plain round>VOTAR</el-button>
                
                <div class="box-select" v-show="votar">    
                    <el-popover
                        placement="top"
                        width="160"
                        v-model="confirmTrue">
                        <p>Tem certeza que deseja votar como <b>verdade</b>?</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="confirmTrue = false">cancelar</el-button>
                            <el-button type="primary" size="mini" @click="vote('true')">SIM</el-button>
                        </div>
                        <el-button slot="reference" type="success" icon="el-icon-success" size="small" plain>VERDADE</el-button>
                    </el-popover>

                    <el-popover
                        placement="top"
                        width="160"
                        v-model="confirmFalse">
                        <p>Tem certeza que deseja votar como <b>mentira</b>?</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="confirmFalse = false">cancelar</el-button>
                            <el-button type="primary" size="mini" @click="vote('false')">SIM</el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-error" size="small" plain>MENTIRA</el-button>
                    </el-popover>
                    
                    <el-button type="text" @click="votar=false">Não Votar</el-button>
                </div>
            </div>
            <p v-if="question.answers.correct.some(id => id == user.id)" style="color: green">=> Você já votou e ACERTOU!</p>
            <p v-if="question.answers.wrong.some(id => id == user.id)" style="color: red">=>Você já votou e ERROU!</p>
            <p v-else-if="closed">=> VOTAÇÃO FINALIZADA</p>        
        </div>

        <div class="btn-remove" v-if="question.author_id == user.id">
            <el-popover
                placement="top"
                width="160"
                v-model="confirmDelete">
                <p>Tem certeza que deseja excluir essa informação?</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="confirmDelete = false">cancelar</el-button>
                    <el-button type="primary" size="mini" @click="deleteQuestion(question._id)">SIM</el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle/>
            </el-popover>
        </div>

    </article>
</template>

<script>
import { mapState } from 'vuex'

import User from '@/middleware/User'
import Question from '@/middleware/Question'
import IconUser from '@/views/assets/images/user-icon.png'

export default {
    props: ['question'],

    computed: {
        ...mapState('auth', ['user'])
    },

    data: () => ({
        authorInfo: {},
        votar: false,
        confirmTrue: false,
        confirmFalse: false,
        confirmDelete: false,
        closed: false,
        loading: ''
    }),

    async mounted() {
        let response = await User.getById(this.question.author_id)
        this.authorInfo = response.data.users

        let date_question = new Date(this.question.created_at)
        date_question.setDate(date_question.getDate()+1)

        this.closed = date_question < new Date()
    },

    methods: {
        formatDate(date) {
            date = new Date(date)
            return `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}` 
        },
        getPicture() {
            if(this.authorInfo.photo != "") 
                return this.authorInfo.photo
            else 
                return IconUser
        },
        async deleteQuestion(id){
            try {
                this._openFullScreen()
                let response = await Question.delete(id)

                this.loading.close()
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: 'Informação excluída com sucesso!',
                    type: 'success'
                })
                this.$emit('delete', id)

            } catch(error) {
                let message = 'Erro no nosso servidor, entre em contato com nosso administrador'
                if(error.response.status != undefined && error.response.status != 500)
                    message = error.response.data.errors[0].messages[0]
    
                this.$alert(message, "Erro ao compartilhar", {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'OK',
                    type: 'error'
                })
                this.loading.close()
            }
        },
        async vote(vote) {
            try {
                this._openFullScreen()
                let infosVote = {
                    question_id: this.question._id,
                    response: vote == 'true'
                }
                let responseVote = await Question.vote(infosVote)
                if(responseVote.data.correct)
                    this.question.answers.correct.push(this.user.id)
                else
                    this.question.answers.wrong.push(this.user.id)

                //atualizar a pontuação na navbar
                this.loading.close()

            } catch(error) {
                this.$alert("Erro no nosso servidor, entre em contato com nosso administrador", "Erro ao votar", {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'OK',
                    type: 'error'
                })
                this.loading.close()
            }
        },
        _openFullScreen() {
            this.loading = this.$loading({
                lock: true,
                text: 'Carregando',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.box-question
    background: #FFF
    padding: 12px 20px
    border-radius: 10px
    border-top: 1px solid #66c2ff
    border-bottom: 1px solid #66c2ff
    margin: 5px 5px 10px 0
    display: flex
    align-items: center
    justify-content: space-between

    .box-infos-user
        display: flex
        align-items: center
        .picture
            width: 45px
            padding: 4px
            background: rgba(#000, 0.3)
            border-radius: 50%
            img
                width: 100%
                border-radius: 50%

        .infos
            margin-left: 10px
        h2
            font-size: 1.15em
        p
            color: #666
            font-size: 0.9em

    p.question
        margin: 10px 5px

    .box-select
        .el-button
            margin-right: 7.5px
    
    .btn-remove
        width: 40px
</style>

