// Dependencies
import '@babel/polyfill'
import React from 'react'
import { hydrate } from 'react-dom'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'SharedStyles/main.less'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
// Containers
import App from './index'

// eslint-disable-next-line func-names
window.onload = function() {
  window.OpenPay.setId('mzdtln0bmtms6o3kck8f')
  window.OpenPay.setApiKey('pk_f0660ad5a39f4912872e24a7a660370c')
  window.OpenPay.setSandboxMode(true)
}

// DOM
const rootElement = document.getElementById('root')

// App wrapper
if (rootElement) {
  hydrate(<App />, rootElement)
}
