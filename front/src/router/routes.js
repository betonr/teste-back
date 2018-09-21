//pages
import Login from '@/views/pages/Login'

//routes
import dashRoutes from '@/router/dashboard'

const routes = [
  {
    path: '',
    redirect: '/dashboard/home'
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { general: true }
  },
  ...dashRoutes
]

export default routes
