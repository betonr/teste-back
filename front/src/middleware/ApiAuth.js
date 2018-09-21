import axios from 'axios'
import store from '@/store'

export default () => {
  return store.state.auth.token ? 
    axios.create({
      baseURL: `http://localhost:5000/`,
      headers: {
        contentType: 'application/json'
      }
    }) :
    axios.create({
      baseURL: `http://localhost:5000/`,
      headers: {
        contentType: 'application/json'
      }
    })
}