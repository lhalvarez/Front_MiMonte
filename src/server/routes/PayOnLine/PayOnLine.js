/* eslint-disable no-else-return */
//! Reparar errores de eslint
import Openpay from 'openpay'

const { doRequestRest } = require('../../utils/HTTPRequest')
const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

const openpay = new Openpay(
  CONFIG.API_SET_ID_OPENPAY,
  CONFIG.API_PRIVATE_KEY_OPENPAY,
  [CONFIG.SET_SANDBOX_MODE]
)

module.exports = router => {
  const { LOGGER_PAY_ON_LINE } = CONFIG
  const SERVICE = CONFIG.SERVICE_PAY_ON_LINE

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
        LOGGER_PAY_ON_LINE
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

    let body = map ? map(data) : data
    if (config.name === 'payMethod') {
      const { transaccion, cliente, token } = body
      if (!token) {
        openpay.customers.list(
          { externalId: cliente.idCliente },
          // eslint-disable-next-line consistent-return
          (error, list) => {
            if (error) {
              LOGGER('ERROR', error, LOGGER_PAY_ON_LINE)

              return res.status(500).send(JSON.parse(error))
            } else {
              LOGGER('INFO', `UserList: ${list}`, LOGGER_PAY_ON_LINE)
              LOGGER(
                'INFO',
                `[User:${userId}] ${config.name}.BODY: ${JSON.stringify(body)}`,
                LOGGER_PAY_ON_LINE
              )

              // eslint-disable-next-line arrow-body-style
              const idOpenpay = list.find(element => {
                return (
                  parseInt(element.external_id, 10) ===
                  parseInt(cliente.idCliente, 10)
                )
              })

              transaccion.transaccion.cliente = {
                idOpenpay: idOpenpay.id,
                nombre: transaccion.transaccion.cliente.nombre,
                apellidos: transaccion.transaccion.cliente.apellidos,
                correo: transaccion.transaccion.cliente.correo
              }
              body = {
                ...body,
                transaccion
              }

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

                  LOGGER(
                    'INFO',
                    `[User:${userId}] ${config.name}: Exitoso`,
                    LOGGER_PAY_ON_LINE
                  )
                  return res.status(200).send(responseJSON)
                },
                err => {
                  LOGGER('ERROR', err, LOGGER_PAY_ON_LINE)

                  return res.status(500).send(JSON.parse(err))
                }
              )
            }
          }
        )
      } else {
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

            LOGGER(
              'INFO',
              `[User:${userId}] ${config.name}: Exitoso`,
              LOGGER_PAY_ON_LINE
            )
            return res.status(200).send(responseJSON)
          },
          err => {
            LOGGER('ERROR', err, LOGGER_PAY_ON_LINE)

            return res.status(500).send(JSON.parse(err))
          }
        )
      }
    } else {
      LOGGER(
        'INFO',
        `[User:${userId}] ${config.name}.BODY: ${JSON.stringify(body)}`,
        LOGGER_PAY_ON_LINE
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

          LOGGER(
            'INFO',
            `[User:${userId}] ${config.name}: Exitoso`,
            LOGGER_PAY_ON_LINE
          )

          return res.status(200).send(responseJSON)
        },
        err => {
          LOGGER('ERROR', err, LOGGER_PAY_ON_LINE)

          return res.status(500).send(JSON.parse(err))
        }
      )
    }
  }

  const payMethod = serviceHandler(
    {
      name: 'payMethod',
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

  const endTransaction = serviceHandler(
    {
      name: 'endTransaction',
      protocol: SERVICE.PROTOCOL,
      host: SERVICE.HOST,
      port: SERVICE.PORT,
      path: SERVICE.PATH_END_TRANSACTION,
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
  router.post('/payMethod', payMethod)
  router.post('/endTransaction', endTransaction)
}
