// Containers
import Login from 'Containers/Login'
import Home from 'Containers/Home'
import Activate from 'Containers/Activate'
import Register from 'Containers/Register'
import Tickets from 'Containers/Tickets'
import TicketsDetail from 'Containers/Tickets/Details'
import CardRegistration from 'Containers/CardRegistration'
import PayOnLine from 'Containers/PayOnLine'
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
    path: '/activar/:token/:email',
    component: Activate
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
      },
      {
        path: '/mimonte/boletas/detalle',
        component: TicketsDetail,
        exact: true
      },
      {
        path: '/mimonte/registro-tarjetas',
        component: CardRegistration,
        exact: true
      },
      {
        path: '/mimonte/pago',
        component: PayOnLine,
        exact: true
      }
    ]
  }
]

export default routes
