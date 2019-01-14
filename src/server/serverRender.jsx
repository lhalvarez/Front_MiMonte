//! Reparar errores de eslint
// Dependencies
import React from 'react'
import { renderToString } from 'react-dom/server'
// Containers
import AppContainer from 'App/index'
// HTML
import html from './html'

export default function serverRender(): any {
  return (
    req: { url: string },
    res: { component: string, redirect: any, send: any },
    next: any // eslint-disable-line
  ) => {
    const context = {
      insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss()) // eslint-disable-line
        return () => {
          removeCss.forEach(f => f())
        }
      }
    }

    // Rendering with SSR
    const markup: string = renderToString(
      <AppContainer server location={req.url} context={context} />
    )
    const title: string = 'Mi Monte'
    const app: string = 'main'
    const vendor: string = 'vendor'
    const stylesheet: string = '/app/main.css'

    if (context.url) {
      res.redirect(301, context.url)
    } else {
      res.send(
        html({
          markup,
          title,
          app,
          vendor,
          stylesheet
        })
      )
    }
  }
}
