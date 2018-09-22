import Api from '@/middleware/ApiQuestions'

export default {
    get() {
        return Api().get('/transaction')
    }
}