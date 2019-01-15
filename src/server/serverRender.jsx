// Dependencies
import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchPath } from 'react-router-dom'
// Containers
import AppContainer from 'App/index'
// Routes
import routes from 'Shared/routes'
// HTML
import html from './html'

export default function serverRender(): any {
  return (
    req: { url: string },
    res: { component: string, redirect: any, send: any },
    next: any
  ) => {
    // Getting the promises from the components which has initialAction.
    // eslint-disable-next-line no-shadow
    const promises = routes.paths((promises, route) => {
      if (
        matchPath(req.url, route) &&
        route.component &&
        route.component.initialAction
      ) {
        promises.push(Promise.resolve(route.component.initialAction()))
      }

      return promises
    }, [])

    Promise.all(promises)
      .then(() => {
        // Rendering with SSR
        const markup: string = renderToString(
          <AppContainer server location={req.url} />
        )

        res.send(
          html({
            initialState: '',
            markup
          })
        )
      })
      .catch(next)
  }
}
