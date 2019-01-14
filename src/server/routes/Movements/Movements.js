/* eslint-disable no-return-assign */
const {
  doRequestRestURLEncoded,
  doRequestRest
} = require('../../utils/HTTPRequest')

const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

const Document = require('../../utils/Documents')

module.exports = router => {
  // eslint-disable-next-line prefer-destructuring
  const LOGGER_MOVEMENTS = CONFIG.LOGGER_MOVEMENTS
  // eslint-disable-next-line prefer-destructuring
  const SERVICE_TOKEN_OAUTH = CONFIG.SERVICE_TOKEN_OAUTH
  const SERVICE = CONFIG.SERVICE_MOVEMENTS

  const getMovements = (req, res) => {
    const data = req.body

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      usuario: data.cliente.idCliente,
      idConsumidor: SERVICE_TOKEN_OAUTH.ID_CONSUMIDOR,
      idDestino: SERVICE_TOKEN_OAUTH.ID_DESTINO
    }

    const body = {
      grant_type: 'client_credentials',
      client_id: SERVICE_TOKEN_OAUTH.SERVER_APP_TOKEN_CLIENT_ID,
      client_secret: SERVICE_TOKEN_OAUTH.SERVER_APP_TOKEN_CLIENT_SECRET
    }

    doRequestRestURLEncoded(
      SERVICE_TOKEN_OAUTH.PROTOCOL,
      SERVICE_TOKEN_OAUTH.HOST,
      SERVICE_TOKEN_OAUTH.PORT,
      SERVICE_TOKEN_OAUTH.PATH,
      CONFIG.METHOD_POST,
      headers,
      body,
      // eslint-disable-next-line consistent-return
      response => {
        const responseJSON = JSON.parse(response)
        if (responseJSON.codigoError) {
          LOGGER(
            'ERROR',
            `[User:${data.cliente.idCliente}] ValidationError: Token`,
            LOGGER_MOVEMENTS
          )
          return res.status(500).send(responseJSON)
          // eslint-disable-next-line no-else-return
        } else {
          LOGGER(
            'INFO',
            `[User:${data.cliente.idCliente}]: Exitoso`,
            LOGGER_MOVEMENTS
          )

          // eslint-disable-next-line no-shadow
          const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${responseJSON.access_token}`,
            'Content-Type': 'application/json',
            idConsumidor: SERVICE.ID_CONSUMIDOR,
            idDestino: SERVICE.ID_DESTINO,
            usuario: 'usuarioMonte'
          }

          LOGGER(
            'INFO',
            `[User:${data.cliente.idCliente}.BODY: ${JSON.stringify(data)}`,
            // eslint-disable-next-line no-undef
            LOGGER_MOVEMENTS
          )
          doRequestRest(
            SERVICE.PROTOCOL,
            SERVICE.HOST,
            SERVICE.PORT,
            SERVICE.PATH,
            CONFIG.METHOD_POST,
            headers,
            data,
            // eslint-disable-next-line no-shadow
            response => {
              // eslint-disable-next-line no-shadow
              const responseJSON = JSON.parse(response)
              responseJSON.message = 'Operacion Exitosa'

              LOGGER(
                'INFO',
                `[User:${data.cliente.idCliente}: Exitoso`,
                LOGGER_MOVEMENTS
              )
              return res.status(200).send(responseJSON)
            },
            err => {
              LOGGER('ERROR', err, LOGGER_MOVEMENTS)

              return res.status(500).send(JSON.parse(err))
            }
          )
        }
      },
      err => {
        LOGGER(
          'ERROR',
          `[User:${data.username}] ValidationError: Token ${err}`,
          LOGGER_MOVEMENTS
        )
        return res.status(500).send(JSON.parse(err))
      }
    )
  }

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
        LOGGER_MOVEMENTS
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
      SERVICE
    )
    doRequestRest(
      config.protocol,
      config.host,
      config.port,
      config.path,
      config.method,
      headers,
      body,
      // eslint-disable-next-line consistent-return
      response => {
        const responseJSON = JSON.parse(response)
        responseJSON.message = 'Operacion Exitosa'
        LOGGER('INFO', `[User:${userId}] ${config.name}: Exitoso`, SERVICE)

        if (config.name === 'downloadTicketMovements') {
          Document.GenerateDoc(
            responseJSON.comprobantes.recibo[0].recibo,
            res,
            'pdf'
          )
        } else {
          return res.status(200).send(responseJSON)
        }
      },
      err => {
        LOGGER('ERROR', err, SERVICE)

        return res.status(500).send(JSON.parse(err))
      }
    )
  }

  const downloadTicketMovements = serviceHandler(
    {
      name: 'downloadTicketMovements',
      protocol: SERVICE.PROTOCOL,
      host: SERVICE.HOST,
      port: SERVICE.PORT,
      path: SERVICE.PATH_RECIBOS,
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
  router.post('/getMovements', getMovements)
  router.post('/downloadTicketMovements', downloadTicketMovements)
}
