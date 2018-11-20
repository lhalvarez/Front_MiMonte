const { doRequestRest } = require('../../utils/HTTPRequest')
const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

module.exports = router => {
  // eslint-disable-next-line prefer-destructuring
  const LOGGER_USER_TICKETS = CONFIG.LOGGER_USER_TICKETS
  const SERVICE = CONFIG.SERVICE_USER_TICKETS

  // eslint-disable-next-line consistent-return
  const serviceHandler = (config, map) => (req, res) => {
    const data = req.body

    if (
      (data && Object.keys(data).length === 0) ||
      ((data && data.idUser === undefined) || (data && data.token === ''))
    ) {
      LOGGER(
        'ERROR',
        `[User:${data.idUser}] ${
          config.name
        }.ValidationError: Need idUser, token`,
        LOGGER_USER_TICKETS
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: idUser, token '
      })
    }
    const userId = data.idUser
    const headers = {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
      idConsumidor: SERVICE.ID_CONSUMIDOR,
      idDestino: SERVICE.ID_DESTINO,
      usuario: data.idUser
    }

    const body = map ? map(data) : data

    LOGGER(
      'INFO',
      `[User:${userId}] ${config.name}.BODY: ${JSON.stringify(body)}`,
      LOGGER_USER_TICKETS
    )
    doRequestRest(
      config.protocol,
      config.host,
      config.port,
      config.path,
      config.method,
      headers,
      body,
      response => {
        const responseJSON = JSON.parse(response)
        responseJSON.message = 'Operacion Exitosa'

        LOGGER(
          'INFO',
          `[User:${userId}] ${config.name}: Exitoso`,
          LOGGER_USER_TICKETS
        )
        return res.status(200).send(responseJSON)
      },
      err => {
        LOGGER('ERROR', err, LOGGER_USER_TICKETS)

        return res.status(500).send(JSON.parse(err))
      }
    )
  }

  const getUserTickets = serviceHandler(
    {
      name: 'getUserTickets',
      protocol: SERVICE.PROTOCOL,
      host: SERVICE.HOST,
      port: SERVICE.PORT,
      path: SERVICE.PATH,
      method: CONFIG.METHOD_POST
    },
    data => {
      const tmp = Object.assign({}, data)
      delete tmp.idUser
      delete tmp.token
      return tmp
    }
  )

  // Link routes and functions
  router.post('/getUserTickets', getUserTickets)
}