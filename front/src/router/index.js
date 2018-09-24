import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import routes from '@/router/routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/portal/',
    routes
})

router.beforeEach((to, _, next) => {
    if (to.matched.some(record => record.meta.general) && store.state.auth.isUserLoggedIn === true) {
        if(store.state.auth.user.func == 1) 
            return next({
                path: '/dashboard/home'
            })
        else 
            return next({
                path: '/dashboard/transaction'
            })
    }

    if (to.matched.some(record => record.meta.auth) && to.matched.some(record => record.meta.func)){
        if( ( store.state.auth.isUserLoggedIn === false ) ||
            ( to.matched.some(record => record.meta.func != undefined && 
              !record.meta.func.some(func => func == store.state.auth.user.func)) ) 
            ){
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else next()        

    } else{
        next()
    }
})

export default router;