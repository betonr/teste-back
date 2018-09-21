import Api from '@/middleware/ApiAuth'

export default {
  getById(id) {
    return Api().get(`/user/${id}`)
  },

  get(){
    return Api().get(`/user`)
  }
}