//! Reparar errores de eslint
// Dependencies
import express from 'express'
import open from 'open'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
// Bluemix
import cfenv from 'cfenv'
// webpack config
import webpackConfig from '../../webpack.config'

// express App
const app = express()
const compiler = webpack(webpackConfig)

// socket.io
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socketClient = require('socket.io-client')

// LOGGER
const LOGGER = require('./config/Logger').Logger

const appEnv = cfenv.getAppEnv()
const port = appEnv.port || process.env.NODE_PORT || 3000

const routerApi = express.Router()
const routerAuth = express.Router()
const routerTickets = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// public static
app.use(express.static(path.join(__dirname, '../../public')))

app.use('/api', routerApi)
app.use('/auth', routerAuth)
app.use(`/${process.env.APP}/boletas-callback`, routerTickets)

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
require('./routes/Register/Register')(routerAuth)

fs.readdirSync(path.join(__dirname, '.', 'routes/UserInfo/')).forEach(file => {
  require(`./routes/UserInfo/${file}`)(routerApi) // eslint-disable-line
})

fs.readdirSync(path.join(__dirname, '.', 'routes/Tickets/')).forEach(file => {
  require(`./routes/Tickets/${file}`)(routerApi) // eslint-disable-line
})

// hot middleware replacement
app.use(webpackDevMiddleware(compiler))
app.use(
  webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client') // eslint-disable-line
  )
)
app.use(webpackHotServerMiddleware(compiler))

routerTickets.post('/', (req, res) => {
  const responseJSON = req.body
  const socket = socketClient.connect(
    appEnv.url,
    { forceNew: true }
  )
  socket.emit('notification', responseJSON)
  res.status(200).send(responseJSON)
  LOGGER('INFO', `Response_: ${JSON.stringify(responseJSON)}`)
})

// listening port
server.listen(port, appEnv.bind, err => {
  if (!err) {
    open(`http://localhost:${port}`)
    LOGGER('INFO', `React App listening on ${port}`)
  }
})

io.on('connection', socket => {
  LOGGER('INFO', 'socket connected ')

  socket.emit('message', 'conectado')

  socket.on('notification', message => {
    LOGGER('INFO', `notification: ${message}`)

    socket.emit('receiveACK', 'ACK')
    socket.broadcast.emit('receive', message)
  })

  socket.on('disconnect', () => {
    LOGGER('INFO', 'socket disconnected ')
  })
})
