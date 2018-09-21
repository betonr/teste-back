import axios from 'axios'
import store from '@/store'

export default () => {
  return store.state.auth.token ? 
    axios.create({
      baseURL: `http://localhost:3000/`,
      headers: {
        authorization: store.state.auth.token
      }
    }) :
    axios.create({
      baseURL: `http://localhost:3000/`
    })
}