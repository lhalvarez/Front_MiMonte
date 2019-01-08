/* eslint-disable no-unused-expressions */
// Dependencies
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// API
import { logout } from 'Api/Login'
import getUserInfo, { getClientLevel } from 'Api/UserInfo'
// Context
import { UserProvider } from 'Context/User'
// Components
import NavHeader from 'Components/NavBar/NavHeader'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
import { questionMessage } from 'SharedUtils/Utils'

import socketIOClient from 'socket.io-client'

// Flow Props and State
type Props = {
  routes: Object,
  history: any
}
type State = {
  userInfo: Object,
  isLoading: boolean,
  showModal: boolean,
  content: Array<mixed>,
  data: Object
}

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component
        {...props}
        handleLoading={route.handleLoading}
        dataCallback={route.dataCallback}
        onShowModal={route.onShowModal}
        handleHide={route.handleHide}
        routes={route.routes}
      />
    )}
  />
)

class App extends Component<Props, State> {
  state = {
    userInfo: {},
    isLoading: true,
    showModal: false,
    content: [],
    data: {}
  }

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    const socket = socketIOClient(process.env.baseURL, {
      reconnection: true
    })

    socket.on('error', err => {
      // eslint-disable-next-line no-console
      console.log('Socket_error_:', err)
    })

    socket.on('receiveACK', data => {
      // eslint-disable-next-line no-console
      console.log('receiveACK:', data)
    })

    socket.on('receive', data => {
      this.setState({ data })
    })
  }

  componentWillMount() {
    getUserInfo()
      .then(response => {
        getClientLevel(response.clientId)
          .then(resp => {
            const userInfo = {
              ...response,
              clientLevel: resp.nivelActual
            }
            this.setState({
              userInfo,
              isLoading: false
            })
          })
          .catch(() => {
            this.setState({ isLoading: false })
          })
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  onSelectNav = e => {
    const { location, history } = this.props
    const tickets = location.state ? location.state.tickets : []

    history.push(e, { tickets })
  }

  handlerLogout = () => {
    const { history } = this.props

    this.setState({
      showModal: true,
      content: questionMessage(
        '¿Quieres cerrar sesión?',
        () => {
          logout()
            .then(() => {
              history.push('/login')
            })
            .catch(() => {
              history.push('/login')
            })
        },
        () => {
          this.handleHide()
        }
      )
    })
  }

  onLoading = show => {
    this.setState({ isLoading: show })
  }

  onShowModal = modalObj => {
    this.setState({ content: modalObj, showModal: true })
  }

  handleHide = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { userInfo, isLoading, showModal, content, data } = this.state
    const { routes } = this.props

    return (
      <Fragment>
        <ModalProvider
          content={content}
          showModal={showModal}
          onClose={this.handleHide}
        />
        <Spinner loading={isLoading} />
        <UserProvider value={{ userInfo }}>
          <NavHeader userInfo={userInfo} />
          <div className="gradiente position-absolute" />
          <header>
            <NavBar
              handleSelectNav={this.onSelectNav}
              handleLogOut={this.handlerLogout}
            />
          </header>
          <main role="main" className="container">
            {Object.keys(userInfo).length > 0 &&
              routes.map(route => (
                <RouteWithSubRoutes
                  key={route.path.toString()}
                  handleLoading={this.onLoading}
                  onShowModal={this.onShowModal}
                  handleHide={this.handleHide}
                  dataCallback={data}
                  {...route}
                />
              ))}
          </main>
          <footer>
            <Footer />
          </footer>
        </UserProvider>
      </Fragment>
    )
  }
}

export default App
