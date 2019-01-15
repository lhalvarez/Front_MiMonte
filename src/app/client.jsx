// Dependencies
import '@babel/polyfill'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'SharedStyles/main.less'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
// Containers
import App from './index'

// eslint-disable-next-line func-names
window.onload = function() {
  window.OpenPay.setId(process.env.setId)
  window.OpenPay.setApiKey(process.env.setApiPublicKey)
  window.OpenPay.setSandboxMode(process.env.setSandboxMode === 'true')
}

// DOM
const rootElement = document.getElementById('root')

const clientDomRenderer = rootElement.hasChildNodes() ? hydrate : render

// App Wrapper
const renderApp = Component => {
  clientDomRenderer(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  )
}

// Rendering app
renderApp(App)

// HMR
if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    renderApp(require('./App').default)
  })
}
