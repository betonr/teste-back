import Api from '@/middleware/ApiQuestions'

export default {
    get(id) {
        if(id != null)
            return Api().get(`/question/${id}`)
        else 
            return Api().get(`/question`)
    },

    register(question) {
        return Api().post('/question/register', question)
    },

    delete(id) {
        return Api().delete(`/question/delete/${id}`)
    },

    rankingHonesty() {
        return Api().get('/question/ranking/honesty')
    },

    vote(infos) {
        return Api().post('/question/vote', infos)
    }
}