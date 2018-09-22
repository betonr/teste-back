<template>
  <section class="home">
    <h1><i class="el-icon-tickets"></i> Mural de Informações</h1>

    <div class="box-btn-new-question">
      <a-new-question @success="addQuestionRenderize" />
    </div>

    <section class="timeline">
      <div v-for="question in questions" :key="question._id">
        <a-card-question :question="question" @delete="delQuestionRenderize" @refrashPoints="refrashPoints" />
      </div>
    </section>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import Question from '@/middleware/Question'
import Punctuation from '@/middleware/Punctuation'

import CardQuestion from '@/views/components/dashboard/shared/Card-question'
import BoxNewQuestion from '@/views/components/dashboard/shared/Box-new-question'

export default {
  components: {
    'a-card-question': CardQuestion,
    'a-new-question': BoxNewQuestion
  },

  computed: {
    ...mapState('auth', ['user'])
  },

  data: () => ({
    questions: []
  }),

  async mounted() {
    try {
      let questions = await Question.get(null)
      this.questions = questions.data.questions.reverse()

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
  },

  methods: {
    addQuestionRenderize(newQuestion) {
      this.questions = this.questions.reverse()
      this.questions.push(newQuestion)
      this.questions.reverse()
    },
    delQuestionRenderize(id) {
      this.questions = this.questions.filter(question => question._id != id)
    },
    async refrashPoints(){
        const punctuation = await Punctuation.registerByUser({ user_id: this.user.id })
        this.$store.dispatch('auth/setPoints', punctuation.data.points)
    }
  }

}
</script>

<style lang="sass" scoped>
.home
  h1
    font-size: 1.7em
    padding: 0 0 10px 15px
  
  .box-btn-new-question
    display: flex
    justify-content: center
    margin: 10px 0 20px 0

  .box-infos
    display: flex
    justify-content: center
    .box-card 
      width: 50%
      margin-right: 10px
</style>
