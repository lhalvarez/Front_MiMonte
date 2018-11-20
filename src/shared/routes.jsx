// Components
import Login from 'Containers/Login'
import Home from 'Containers/Home'
import Register from 'Containers/Register'
import Tickets from 'Containers/Tickets'
import AppContainer from 'App/App'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/registro',
    component: Register
  },
  {
    path: '/mimonte',
    component: AppContainer,
    routes: [
      {
        path: '/mimonte/inicio',
        component: Home,
        exact: true
      },
      {
        path: '/mimonte/boletas',
        component: Tickets,
        exact: true
      }
    ]
  }
]

export default routes
