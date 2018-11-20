// Dependencies
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// API
import { logout } from 'Api/Login'
import getUserInfo from 'Api/UserInfo'
// Context
import { UserProvider } from 'Context/User'
// Components
import NavHeader from 'Components/NavBar/NavHeader'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
// Flow Props and State
type Props = {
  routes: Object
}

type State = {
  userInfo: Object
}

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} routes={route.routes} />}
  />
)

class App extends Component<Props, State> {
  state = {
    userInfo: {}
  }

  componentWillMount() {
    getUserInfo().then(response => {
      this.setState({ userInfo: response })
    })
  }

  onClickLogOut = () => {
    const { history } = this.props

    logout().then(() => {
      history.push('/login')
    })
  }

  render() {
    const { userInfo } = this.state
    const { routes } = this.props

    return (
      <Fragment>
        <UserProvider value={{ userInfo }}>
          <NavHeader userInfo={userInfo} />
          <div className="gradiente position-absolute" />
          <header>
            <NavBar handleLogOut={this.onClickLogOut} />
          </header>
          <main role="main" className="container">
            {Object.keys(userInfo).length > 0 &&
              routes.map(route => (
                <RouteWithSubRoutes key={route.path.toString()} {...route} />
              ))}
          </main>
          <Footer />
        </UserProvider>
      </Fragment>
    )
  }
}

export default App
