import Api from '@/middleware/ApiQuestions'

export default {
    get() {
        return Api().get('/punctuation')
    },

    registerByUser(infos) {
        return Api().post('/punctuation/register', infos)
    }
}