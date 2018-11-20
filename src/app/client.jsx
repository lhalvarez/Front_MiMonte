// Dependencies
import '@babel/polyfill'
import React from 'react'
import { hydrate } from 'react-dom'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'SharedStyles/main.less'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'

// Containers
import App from './index'

// DOM
const rootElement = document.getElementById('root')

// App wrapper
if (rootElement) {
  hydrate(<App />, rootElement)
}
