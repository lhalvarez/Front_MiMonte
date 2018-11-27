// Dependencies
import React, { Fragment } from 'react'
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
// Routes
import routes from 'Shared/routes'

const App = ({ server, location, context }) => {
  const routesMap = routes.map(route => (
    <Route
      key={route.path.toString()}
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  ))

  // Client router
  let router = (
    <BrowserRouter>
      <Switch>{routesMap}</Switch>
    </BrowserRouter>
  )

  // Server router
  if (server) {
    router = (
      <StaticRouter location={location} context={context}>
        <Switch>{routesMap}</Switch>
      </StaticRouter>
    )
  }

  return <Fragment>{router}</Fragment>
}

export default hot(module)(App)
