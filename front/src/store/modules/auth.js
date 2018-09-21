const state = {
  token: null,
  user: null,
  isUserLoggedIn: false,
  points: null
}

const getters = {
  getToken: (state) => state.token,
  getUser: (state) => state.user,
  getLogged: (state) => state.isUserLoggedIn,
  getPoints: (state) => state.points
}

const mutations = {
  setToken (state, token) {
    state.token = token
    state.isUserLoggedIn = token ? true : false;
  },  
  setUser (state, user) {
    state.user = user
  },  
  setPoints (state, points) {
    state.points = points
  },
  logoff (state) {
    state.token = null
    state.user = null
    state.isUserLoggedIn = false
  }
}

const actions = {
  setToken ({commit}, token) {
    commit('setToken', token)
  },
  setUser ({commit}, user) {
    commit('setUser', user)
  },
  setPoints ({commit}, points) {
    commit('setPoints', points)
  },
  logoff ({commit}){
    commit('logoff')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}