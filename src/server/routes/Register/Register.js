/* eslint-disable no-return-assign */
const {
  doRequestRestURLEncoded,
  doRequestRest
} = require('../../utils/HTTPRequest')

const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

module.exports = router => {
  // eslint-disable-next-line prefer-destructuring
  const LOGGER_REGISTER = CONFIG.LOGGER_REGISTER
  // eslint-disable-next-line prefer-destructuring
  const SERVICE_TOKEN_OAUTH = CONFIG.SERVICE_TOKEN_OAUTH
  const SERVICE = CONFIG.SERVICE_REGISTER

  const validateData = (req, res) => {
    const data = req.body

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      usuario: data.cliente.correoElectronico,
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
            `[User:${data.cliente.correoElectronico}] ValidationError: Token`,
            LOGGER_REGISTER
          )
          return res.status(500).send(responseJSON)
          // eslint-disable-next-line no-else-return
        } else {
          LOGGER(
            'INFO',
            `[User:${data.cliente.correoElectronico}]: Exitoso`,
            LOGGER_REGISTER
          )

          // eslint-disable-next-line no-shadow
          const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${responseJSON.access_token}`,
            'Content-Type': 'application/json',
            idConsumidor: SERVICE.ID_CONSUMIDOR,
            idDestino: SERVICE.ID_DESTINO,
            usuario: data.cliente.correoElectronico
          }

          LOGGER(
            'INFO',
            `[User:${data.cliente.correoElectronico}.BODY: ${JSON.stringify(
              data
            )}`,
            // eslint-disable-next-line no-undef
            LOGGER_REGISTER
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
                `[User:${data.cliente.correoElectronico}: Exitoso`,
                LOGGER_REGISTER
              )
              return res.status(200).send(responseJSON)
            },
            err => {
              LOGGER('ERROR', err, LOGGER_REGISTER)

              return res.status(500).send(JSON.parse(err))
            }
          )
        }
      },
      err => {
        LOGGER(
          'ERROR',
          `[User:${data.username}] ValidationError: Token ${err}`,
          LOGGER_REGISTER
        )
        return res.status(500).send(JSON.parse(err))
      }
    )
  }

  const createUser = (req, res) => {
    const data = req.body

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      usuario: data.cliente.correoElectronico,
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
            `[User:${data.cliente.correoElectronico}] ValidationError: Token`,
            LOGGER_REGISTER
          )
          return res.status(500).send(responseJSON)
          // eslint-disable-next-line no-else-return
        } else {
          LOGGER(
            'INFO',
            `[User:${data.cliente.correoElectronico}]: Exitoso`,
            LOGGER_REGISTER
          )

          // eslint-disable-next-line no-shadow
          const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${responseJSON.access_token}`,
            'Content-Type': 'application/json',
            idConsumidor: SERVICE.ID_CONSUMIDOR,
            idDestino: SERVICE.ID_DESTINO,
            usuario: data.cliente.correoElectronico
          }

          LOGGER(
            'INFO',
            `[User:${data.cliente.correoElectronico}.BODY: ${JSON.stringify(
              data
            )}`,
            // eslint-disable-next-line no-undef
            LOGGER_REGISTER
          )
          doRequestRest(
            SERVICE.PROTOCOL,
            SERVICE.HOST,
            SERVICE.PORT,
            SERVICE.PATH_CREATE_USER,
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
                `[User:${data.cliente.correoElectronico}: Exitoso`,
                LOGGER_REGISTER
              )
              return res.status(200).send(responseJSON)
            },
            err => {
              LOGGER('ERROR', err, LOGGER_REGISTER)

              return res.status(500).send(JSON.parse(err))
            }
          )
        }
      },
      err => {
        LOGGER(
          'ERROR',
          `[User:${data.username}] ValidationError: Token ${err}`,
          LOGGER_REGISTER
        )
        return res.status(500).send(JSON.parse(err))
      }
    )
  }

  // Link routes and functions
  router.post('/validateData', validateData)
  router.post('/createUser', createUser)
}
