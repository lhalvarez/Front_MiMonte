//! Reparar errores de eslint
const { doRequestRest } = require('../../utils/HTTPRequest')

const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

module.exports = router => {
  const { LOGGER_USER_INFO } = CONFIG
  const SERVICE = CONFIG.SERVICE_USER_INFO

  // eslint-disable-next-line consistent-return
  const serviceHandler = (config, map) => (req, res) => {
    const data = req.body

    if (
      Object.keys(data).length === 0 ||
      (data.idUser === undefined || data.token === '')
    ) {
      LOGGER(
        'ERROR',
        `[User:${data.idUser}] ${
          config.name
        }.ValidationError: Need idUser, token`,
        LOGGER_USER_INFO
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: idUser, token '
      })
      // eslint-disable-next-line no-else-return
    } else {
      const userId = data.idUser
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json;charset=UTF-8',
        idConsumidor: SERVICE.ID_CONSUMIDOR,
        idDestino: SERVICE.ID_DESTINO,
        usuario: data.idUser
      }

      const body = map ? map(data) : data

      LOGGER(
        'INFO',
        `[User:${userId}] ${config.name}.BODY: ${JSON.stringify(body)}`,
        LOGGER_USER_INFO
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
            LOGGER_USER_INFO
          )

          const sessionInfo = {
            email: userId,
            fullName: `${responseJSON.Cliente.nombre} ${
              responseJSON.Cliente.apellidoPaterno
            } ${responseJSON.Cliente.apellidoMaterno}`,
            clientId: responseJSON.Cliente.idCliente,
            credentialNumber: responseJSON.Cliente.numeroDeCredencial
          }

          return res.status(200).send(sessionInfo)
        },
        err => {
          LOGGER('ERROR', err, LOGGER_USER_INFO)
          return res.status(500).send(JSON.parse(err))
          // eslint-disable-next-line prettier/prettier
        }
      )
    }
  }

  const userInfo = serviceHandler(
    {
      name: 'userInfo',
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
  router.post('/userInfo', userInfo)
}
