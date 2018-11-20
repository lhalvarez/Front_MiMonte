// @flow
// dependencies
import express from 'express'
import open from 'open'
import path from 'path'
import fs from 'fs'
// eslint-disable-next-line import/no-unresolved
import cors from 'cors'
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
// API
/* import api from './api' */
// webpack config
import webpackConfig from '../../webpack.config'

// express App
const app = express()
const compiler = webpack(webpackConfig)
const port = process.env.NODE_PORT || 3000

const routerApi = express.Router()
const routerAuth = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// public static
app.use(express.static(path.join(__dirname, '../../public')))

// API middleware
/* app.use('/api', api) */

app.use('/api', routerApi)
app.use('/auth', routerAuth)

// eslint-disable-next-line consistent-return
routerApi.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Bpm, Uid'
  )

  if (req.method !== 'OPTIONS') {
    if (req.get('authorization')) {
      req.body.token = req.get('authorization')
      // req.body.bpm_token = req.get('bpm')
      req.body.idUser = req.get('uid')
      next()
    } else {
      return res.status(403).send({
        codigoError: 403,
        message: 'No Authorization provided.'
      })
    }
  } else {
    next() // make sure we go to the next routes and don"t stop here
  }
})

// eslint-disable-next-line func-names
fs.readdirSync(path.join(__dirname, '.', 'routes/UserInfo/')).forEach(file => {
  require(`./routes/UserInfo/${file}`)(routerApi) // eslint-disable-line
}); // prettier-ignore

fs.readdirSync(path.join(__dirname, '.', 'routes/Tickets/')).forEach(file => {
  require(`./routes/Tickets/${file}`)(routerApi) // eslint-disable-line
}); // prettier-ignore

routerAuth.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next() // make sure we go to the next routes and don"t stop here
})

require('./routes/Cognito/Auth')(routerAuth)

// hot middleware replacement
app.use(webpackDevMiddleware(compiler))
app.use(
  webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client') // eslint-disable-line
  )
)
app.use(webpackHotServerMiddleware(compiler))

// listening port
app.listen(port, err => {
  if (!err) {
    open(`http://localhost:${port}`)
  }
})
