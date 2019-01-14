/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
//! Reparar errores de eslint
import Openpay from 'openpay'

const { doRequestRest } = require('../../utils/HTTPRequest')
const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

const openpay = new Openpay(process.env.setId, process.env.setApiPrivateKey)

module.exports = router => {
  // eslint-disable-next-line prefer-destructuring
  const LOGGER_CARD_REGISTRATION = CONFIG.LOGGER_CARD_REGISTRATION
  // eslint-disable-next-line prefer-destructuring
  const SERVICE = CONFIG.SERVICE_CARD_REGISTRATION

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
        LOGGER_CARD_REGISTRATION
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: idUser, token '
      })
    }

    const body = map ? map(data) : data
    let { path } = config

    if (body.concat) {
      if (data.idCliente) {
        path = `${path}/${data.idCliente}`
        delete body.concat
        delete body.idCliente
      }
      if (data.tokenCard) {
        path = `${path}/${data.tokenCard}`
        delete body.concat
        delete body.tokenCard
      }
    }

    const userId = data.idCliente
    const headers = {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
      usuario: data.idUser
    }
    if (data.tokenCard) {
      body.token = data.tokenCard
      delete body.tokenCard
    }
    LOGGER(
      'INFO',
      `[User:${userId}] ${config.name}.BODY: ${JSON.stringify(body)}`,
      LOGGER_CARD_REGISTRATION
    )
    doRequestRest(
      config.protocol,
      config.host,
      config.port,
      path,
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
          LOGGER_CARD_REGISTRATION
        )
        return res.status(200).send(responseJSON)
      },
      err => {
        LOGGER('ERROR', err, LOGGER_CARD_REGISTRATION)
        return res.status(500).send(JSON.parse(err))
      }
    )
  }

  const getCard = serviceHandler(
    {
      name: 'getCard',
      protocol: CONFIG.PROTOCOL,
      host: CONFIG.HOST,
      port: CONFIG.PORT,
      path: SERVICE.PATH,
      method: CONFIG.METHOD_GET
    },
    data => {
      const tmp = Object.assign({}, data)
      tmp.concat = true
      delete tmp.idUser
      delete tmp.token
      return tmp
    }
  )

  const saveCard = (req, res) => {
    const data = req.body

    if (
      Object.keys(data).length === 0 ||
      (data.token === undefined || data.token === '')
    ) {
      LOGGER(
        'ERROR',
        'cardRegistration.ValidationError Need: token ',
        LOGGER_CARD_REGISTRATION
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: token '
      })
    } else {
      const headers = {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        usuario: data.idUser
      }
      const { alias, cliente, digitos, estatus, tipo, tokenCard } = data

      const body = {
        alias,
        cliente: {
          idCliente: cliente.idCliente,
          nombreTitular: cliente.nombreTitular
        },
        digitos,
        estatus: {
          id: estatus.id
        },
        tipo: {
          id: tipo.id
        },
        token: tokenCard
      }

      const cardRequest = {
        token_id: tokenCard,
        device_session_id: data.deviceSessionId
      }

      openpay.customers.list(
        { externalId: cliente.idCliente },
        (error, list) => {
          if (error && error.error_code === 1005) {
            LOGGER(
              'INFO',
              `CardRegistration comprueba cliente: ${JSON.stringify(
                error
              )} Exitoso`,
              LOGGER_CARD_REGISTRATION
            )

            const customerRequest = {
              external_id: cliente.idCliente,
              name: cliente.nombreUsuario,
              email: data.idUser,
              requires_account: false
            }

            openpay.customers.create(customerRequest, (error, customer) => {
              if (error) {
                LOGGER(
                  'ERROR',
                  `Creación comprobación ${JSON.stringify(error)}`,
                  LOGGER_CARD_REGISTRATION
                )
                return res.status(500).send(error)
                // eslint-disable-next-line no-else-return
              } else {
                LOGGER(
                  'INFO',
                  `CardRegistration creación comprobación: ${JSON.stringify(
                    customer
                  )} Exitoso`,
                  LOGGER_CARD_REGISTRATION
                )

                openpay.customers.cards.create(
                  cliente.idCliente,
                  cardRequest,
                  (error, card) => {
                    if (error) {
                      LOGGER(
                        'ERROR',
                        JSON.stringify(error),
                        LOGGER_CARD_REGISTRATION
                      )
                      return res.status(500).send(error)
                      // eslint-disable-next-line no-else-return
                    } else {
                      LOGGER(
                        'INFO',
                        `CardRegistration: ${JSON.stringify(card)} Exitoso`,
                        LOGGER_CARD_REGISTRATION
                      )
                      body.id_openpay = card.id
                      doRequestRest(
                        CONFIG.PROTOCOL,
                        CONFIG.HOST,
                        CONFIG.PORT,
                        SERVICE.PATH_SAVE_CARD,
                        CONFIG.METHOD_POST,
                        headers,
                        body,
                        response => {
                          const responseJSON = JSON.parse(response)

                          LOGGER(
                            'INFO',
                            'CardRegistration: Exitoso',
                            LOGGER_CARD_REGISTRATION
                          )
                          return res.status(200).send(responseJSON)
                        },
                        err => {
                          LOGGER(
                            'ERROR',
                            JSON.stringify(err),
                            LOGGER_CARD_REGISTRATION
                          )
                          return res.status(500).send(err)
                        }
                      )
                    }
                  }
                )
              }
            })
          } else {
            LOGGER(
              'INFO',
              `CardRegistration: ${JSON.stringify(list)} Exitoso`,
              LOGGER_CARD_REGISTRATION
            )

            // eslint-disable-next-line arrow-body-style
            const clientOpenPayId = list.find(element => {
              return (
                parseInt(element.external_id, 10) ===
                parseInt(cliente.idCliente, 10)
              )
            })

            openpay.customers.cards.create(
              clientOpenPayId.id,
              cardRequest,
              (error, card) => {
                if (error) {
                  LOGGER(
                    'ERROR',
                    JSON.stringify(error),
                    LOGGER_CARD_REGISTRATION
                  )
                  return res.status(500).send(error)
                } else {
                  LOGGER(
                    'INFO',
                    `CardRegistration: ${JSON.stringify(card)} Exitoso`,
                    LOGGER_CARD_REGISTRATION
                  )
                  body.id_openpay = card.id
                  doRequestRest(
                    CONFIG.PROTOCOL,
                    CONFIG.HOST,
                    CONFIG.PORT,
                    SERVICE.PATH_SAVE_CARD,
                    CONFIG.METHOD_POST,
                    headers,
                    body,
                    response => {
                      const responseJSON = JSON.parse(response)

                      LOGGER(
                        'INFO',
                        'CardRegistration: Exitoso',
                        LOGGER_CARD_REGISTRATION
                      )
                      return res.status(200).send(responseJSON)
                    },
                    err => {
                      LOGGER(
                        'ERROR',
                        JSON.stringify(err),
                        LOGGER_CARD_REGISTRATION
                      )
                      return res.status(500).send(err)
                    }
                  )
                }
              }
            )
          }
        }
      )
    }
  }

  const deleCard = serviceHandler(
    {
      name: 'deleCard',
      protocol: CONFIG.PROTOCOL,
      host: CONFIG.HOST,
      port: CONFIG.PORT,
      path: SERVICE.PATH_DELETE_CARD,
      method: CONFIG.METHOD_DELETE
    },
    data => {
      const tmp = Object.assign({}, data)
      tmp.concat = true
      delete tmp.idUser
      delete tmp.token
      return tmp
    }
  )

  const updateCard = serviceHandler(
    {
      name: 'updateCard',
      protocol: CONFIG.PROTOCOL,
      host: CONFIG.HOST,
      port: CONFIG.PORT,
      path: SERVICE.PATH_UPDATE_CARD,
      method: CONFIG.METHOD_PUT
    },
    data => {
      const tmp = Object.assign({}, data)
      delete tmp.idUser
      delete tmp.token
      return tmp
    }
  )

  // Link routes and functions
  router.post('/getCard', getCard)
  router.post('/saveCard', saveCard)
  router.post('/deleteCard', deleCard)
  router.post('/updateCard', updateCard)
}
