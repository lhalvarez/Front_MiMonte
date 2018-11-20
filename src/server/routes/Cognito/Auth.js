/* eslint-disable no-return-assign */
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'

const { doRequestRestURLEncoded } = require('../../utils/HTTPRequest')

const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

module.exports = router => {
  // eslint-disable-next-line prefer-destructuring
  const LOGGER_AUTH = CONFIG.LOGGER_AUTH
  // eslint-disable-next-line prefer-destructuring
  const SERVICE_TOKEN_OAUTH = CONFIG.SERVICE_TOKEN_OAUTH

  const login = (req, res) => {
    const data = req.body
    return new Promise(() => {
      const authenticationData = {
        Username: data.username,
        Password: data.password
      }

      LOGGER('DEBUG', authenticationData, LOGGER_AUTH)

      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      )

      const poolData = {
        UserPoolId: CONFIG.USER_POOL_ID,
        ClientId: CONFIG.CLIENT_ID
      }

      LOGGER('DEBUG', poolData, LOGGER_AUTH)

      const userPool = new CognitoUserPool(poolData)
      const userData = {
        Username: data.username,
        Pool: userPool
      }

      const cognitoUser = new CognitoUser(userData)

      cognitoUser.setAuthenticationFlowType('USER_SRP_AUTH')

      try {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess(result) {
            LOGGER('INFO', result, LOGGER_AUTH)

            const jwtToken = result.getAccessToken().getJwtToken()

            const headers = {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              usuario: data.username,
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
              response => {
                const responseJSON = JSON.parse(response)
                if (responseJSON.codigoError) {
                  LOGGER(
                    'ERROR',
                    `[User:${data.username}] ValidationError: Token`,
                    LOGGER_AUTH
                  )
                  return res.status(500).send(responseJSON)
                  // eslint-disable-next-line no-else-return
                } else {
                  LOGGER(
                    'INFO',
                    `[User:${data.username}]: Exitoso`,
                    LOGGER_AUTH
                  )

                  const access = {
                    access_token: responseJSON.access_token,
                    refresh_token: responseJSON.refresh_token,
                    cognito_token: jwtToken,
                    username: data.username
                  }

                  return res.status(200).send(access)
                }
              },
              err => {
                LOGGER(
                  'ERROR',
                  `[User:${data.username}] ValidationError: Token ${err}`,
                  LOGGER_AUTH
                )
              }
            )
          },
          onFailure(err) {
            LOGGER('ERROR', err, LOGGER_AUTH)

            // eslint-disable-next-line no-new-object
            const dataResponse = new Object()
            dataResponse.code = 500
            dataResponse.codigoError = 500
            dataResponse.descripcionError = 'Error en Cognito'
            dataResponse.data = err

            return res.status(500).send(dataResponse)
          }
        })
      } catch (e) {
        LOGGER('ERROR', e, LOGGER_AUTH)

        const error = Object.assign(
          {
            status: 500,
            error: 'Internal Server Error',
            message: e
          },
          {}
        )
        res.status(500).send(JSON.stringify(error))
      }
    })
  }

  // eslint-disable-next-line consistent-return
  const refresh = (req, res) => {
    const data = req.body

    if (
      Object.keys(data).length === 0 ||
      (data.refreshToken === undefined || data.refreshToken === '')
    ) {
      LOGGER(
        'ERROR',
        'refreshToken.ValidationError Need: refreshToken, bpmToken ',
        LOGGER_AUTH
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: refreshToken '
      })
      // eslint-disable-next-line no-else-return
    } else {
      const headers = {
        Authorization: `Bearer ${data.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        usuario: data.idUser,
        idConsumidor: SERVICE_TOKEN_OAUTH.ID_CONSUMIDOR,
        idDestino: SERVICE_TOKEN_OAUTH.ID_DESTINO
      }

      const body = {
        grant_type: 'refresh_token',
        refresh_token: data.refreshToken,
        client_id: SERVICE_TOKEN_OAUTH.SERVER_APP_TOKEN_CLIENT_ID,
        client_secret: SERVICE_TOKEN_OAUTH.SERVER_APP_TOKEN_CLIENT_SECRET
      }

      doRequestRestURLEncoded(
        SERVICE_TOKEN_OAUTH.PROTOCOL,
        SERVICE_TOKEN_OAUTH.HOST,
        SERVICE_TOKEN_OAUTH.PORT,
        SERVICE_TOKEN_OAUTH.PATH,
        CONFIG.METHOD_PUT,
        headers,
        body,
        response => {
          const responseJSON = JSON.parse(response)

          if (responseJSON.codigoError) {
            LOGGER('ERROR', responseJSON, LOGGER_AUTH)
            responseJSON.code = 500
            return res.status(500).send(responseJSON)
            // eslint-disable-next-line no-else-return
          } else {
            responseJSON.code = 200
            LOGGER('INFO', 'RefreshToken: Exitoso', LOGGER_AUTH)
            return res.status(200).send(responseJSON)
          }
        },
        err => {
          LOGGER('ERROR', JSON.stringify(err), LOGGER_AUTH)

          return res.status(500).send(JSON.parse(err))
        }
      )
    }
  }

  // eslint-disable-next-line consistent-return
  const logout = (req, res) => {
    const data = req.body

    if (
      Object.keys(data).length === 0 ||
      (data.token === undefined || data.token === '')
    ) {
      LOGGER('ERROR', 'logoutToken.ValidationError Need: token ', LOGGER_AUTH)
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: token '
      })
      // eslint-disable-next-line no-else-return
    } else {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        usuario: data.idUser,
        idConsumidor: SERVICE_TOKEN_OAUTH.ID_CONSUMIDOR,
        idDestino: SERVICE_TOKEN_OAUTH.ID_DESTINO
      }

      // eslint-disable-next-line camelcase
      const grant_type = 'revoke_token'

      const body = {
        grant_type: grant_type.trim(),
        client_id: SERVICE_TOKEN_OAUTH.SERVER_APP_TOKEN_CLIENT_ID.trim(),
        client_secret: SERVICE_TOKEN_OAUTH.SERVER_APP_TOKEN_CLIENT_SECRET.trim(),
        token: data.token.trim()
      }

      doRequestRestURLEncoded(
        SERVICE_TOKEN_OAUTH.PROTOCOL,
        SERVICE_TOKEN_OAUTH.HOST,
        SERVICE_TOKEN_OAUTH.PORT,
        SERVICE_TOKEN_OAUTH.PATH,
        CONFIG.METHOD_DELETE,
        headers,
        body,
        response => {
          const responseJSON = JSON.parse(response)

          if (responseJSON.codigoError) {
            LOGGER('ERROR', responseJSON, LOGGER_AUTH)
            responseJSON.code = 500
            return res.status(500).send(responseJSON)
            // eslint-disable-next-line no-else-return
          } else {
            responseJSON.code = 200
            LOGGER('INFO', 'LogoutToken: Exitoso', LOGGER_AUTH)
            return res.status(200).send(responseJSON)
          }
        },
        err => {
          LOGGER('ERROR', JSON.stringify(err), LOGGER_AUTH)
          return res.status(500).send(err)
        }
      )
    }
  }

  // Link routes and functions
  router.post('/cognito/login', login)
  router.post('/oauth/refresh', refresh)
  router.post('/oauth/logout', logout)
}
