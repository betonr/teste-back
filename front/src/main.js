import Vue from 'vue'
import App from '@/App'

import { sync } from 'vuex-router-sync'
import router from '@/router'
import store from '@/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import localeElement from 'element-ui/lib/locale/lang/pt-br'

import VueMaterial from 'vue-material'
import VeeValidate, {Validator} from 'vee-validate'
import pt_BR from 'vee-validate/dist/locale/pt_BR'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale: localeElement})
Vue.use(VueMaterial)
Validator.localize( 'pt_BR', pt_BR )
Vue.use(VeeValidate, { locale: 'pt_BR' })
sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
