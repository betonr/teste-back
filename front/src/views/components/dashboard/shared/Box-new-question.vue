<template>
    <section>
        <div class="box-btn-new-question">
            <el-button @click="visible = true" type="success" icon="el-icon-circle-plus" class="btn-new-question" round>Compartilhar Informação</el-button>
        </div>

        <form @submit.prevent="register">
            <el-dialog title="Compartilhe uma informação" 
                :visible.sync="visible"
                width="80%">

                <textarea 
                    v-validate="'required'" 
                    v-model="question"
                    :class="{'input': true, 'is-danger': errors.has('question') && question != null, 'is-success': !errors.has('question') && question != null }"
                    name="question" 
                    type="text" 
                    placeholder="Questão / Informação ..." />
                <span v-show="errors.has('question') && question != null"> {{ errors.first('question') }} </span>

                <div class="box-radius">
                    <label>Reposta:</label> 
                    <el-radio v-model="response" label="true" border>Verdade</el-radio>
                    <el-radio v-model="response" label="false" border>Mentira</el-radio>
                </div>

                <div slot="footer">
                    <el-button @click="visible= false" type="text">Cancelar</el-button>
                    <el-button native-type="submit" icon="el-icon-edit" type="primary">PUBLICAR</el-button>
                </div>
            
            </el-dialog>
        </form>
    </section>
</template>

<script>
import Question from '@/middleware/Question'

export default {
    data: () => ({
        visible: false,
        question: null,
        response: 'true',
        loading: null
    }),

    methods: {
        async register(){
            let valide = await this.$validator.validateAll()
            if(valide) {
                try {
                    this._openFullScreen()
                    
                    let question = {
                        question: this.question,
                        response: this.response == 'true'
                    }
                    let response = await Question.register(question)
                    
                    this.loading.close()
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: 'Informação compartilhada com sucesso!',
                        type: 'success'
                    })
                    this.visible = false
                    this.response = 'true'
                    this.$emit('success', response.data.question)
                    this.question = null

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
.btn-new-question
    font-size: 1.4em

textarea
    width: 100%
    margin-top: 7.5px
    border-radius: 7px
    border: 2px solid #CCC
    padding: 10px
    margin: 5px 0
    font-size: 1.1em
    color: #333
textarea.is-danger
    border: 1px solid red
    background: rgba(red, 0.07)
textarea.is-success
    border: 1px solid green
    background: rgba(green, 0.07)

.box-radius
    margin: 10px 0 0 0
    label
        margin-right: 10px

span
    color: red
    font-size: 0.9em
    padding: 0 10px
</style>
