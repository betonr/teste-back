//layouts
import Dashboard from '@/views/layouts/Dashboard'

//pages
import Home from '@/views/pages/dashboard/Home'
import Honesty from '@/views/pages/dashboard/ranking/Honesty'
import Punctuation from '@/views/pages/dashboard/ranking/Punctuation'
import Transaction from '@/views/pages/dashboard/Transaction'

const dashRoutes = [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/transaction',
        name: 'Transações',
        component: Transaction,
        meta: { auth: true, func: [2] }
      },
      {
        path: '/dashboard/home',
        name: 'Mural',
        component: Home,
        meta: { auth: true, func: [1] }
      },
      {
        path: '/dashboard/ranking/honesty',
        name: 'Honestidade',
        component: Honesty,
        meta: { auth: true, func: [1] }
      },
      {
        path: '/dashboard/ranking/punctuation',
        name: 'Pontuação',
        component: Punctuation,
        meta: { auth: true, func: [1] }
      }
    ]
  }
]

export default dashRoutes
