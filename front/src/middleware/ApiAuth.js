import axios from 'axios'
import store from '@/store'

export default () => {
  return store.state.auth.token ? 
    axios.create({
      baseURL: process.env.urlAuth,
      headers: {
        contentType: 'application/json'
      }
    }) :
    axios.create({
      baseURL: process.env.urlAuth,
      headers: {
        contentType: 'application/json'
      }
    })
}