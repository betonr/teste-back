import Api from '@/middleware/ApiAuth'

export default {
  loginSocial (provider, token) {
    return Api().get('/auth/'+provider+'/'+token)
  },

  loginEmail (provider, credentials) {
    return Api().post('/auth/'+provider, credentials)
  }
}