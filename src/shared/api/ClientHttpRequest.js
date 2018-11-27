//! Reparar errores de eslint
// Dependencies
import Axios from 'axios'
// Utils
import * as Utils from 'SharedUtils/Utils'

export default class ClientHttpRequest {
  constructor(config) {
    this.config = config

    this.instanceAxios = Axios.create({
      baseURL: process.env.baseURL,
      timeout: 45000,
      url: config.service,
      responseType: config.responseType ? config.responseType : 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  request() {
    const TIEMPO_SESION_ALERTA = Number(process.env.TIEMPO_SESION_ALERTA)

    const TIEMPO_SESION_INACTIVIDAD = Number(
      process.env.TIEMPO_SESION_INACTIVIDAD
    )

    const CODE_REFRESH = ['NMP-5001']
    const CODE_REFRESH_BPM = ['NMP-5001']
    const CODE_SESSION_OUT = 'NMP-5001'

    // eslint-disable-next-line no-underscore-dangle
    const _this = this

    return new Promise((resolve, reject) => {
      _this.instanceAxios
        .request(_this.config)
        .then(response => {
          sessionStorage.session_time =
            Number(new Date()) -
            TIEMPO_SESION_ALERTA +
            TIEMPO_SESION_INACTIVIDAD
          resolve(response)
        })
        .catch(error => {
          // eslint-disable-next-line no-underscore-dangle
          const __this = this

          if (error.response) {
            if (
              error.response.data &&
              Utils.indexOfItem(
                CODE_REFRESH,
                error.response.data.codigoError
                // eslint-disable-next-line eqeqeq
              ) != -1
            ) {
              // Refresh and Recall Service

              __this.refreshToken = {
                baseURL: process.env.baseURL,
                url: 'auth/oauth/refresh',
                method: 'POST',
                data: {
                  idUser: sessionStorage.uid,
                  refreshToken: sessionStorage.refresh_token
                }
              }

              __this.refreshTokenAxios = Axios.create({
                baseURL: process.env.baseURL,
                timeout: 45000,
                url: __this.refreshToken.endpoint,
                responseType: 'json',
                headers: {
                  'Content-Type': 'application/json'
                }
              })

              __this.refreshTokenAxios
                .request(__this.refreshToken) // Refresh token
                .then(response => {
                  sessionStorage.access_token = response.data.access_token
                  sessionStorage.refresh_token = response.data.refresh_token

                  _this.config.headers.Authorization =
                    response.data.access_token

                  _this.instanceAxios
                    .request(_this.config) // Recall Service New Token
                    // eslint-disable-next-line no-shadow
                    .then(response => {
                      resolve(response)
                    })
                    // eslint-disable-next-line no-shadow
                    .catch(error => {
                      reject(error)
                    })
                })
                .catch(() => {
                  sessionStorage.clear()
                  window.location.href = `/login`
                })
            } else if (
              error.response.data &&
              Utils.indexOfItem(
                CODE_REFRESH_BPM,
                error.response.data.codigoError
              ) !== -1
            ) {
              // Refresh and Recall Service

              __this.refreshToken = {
                baseURL: process.env.baseURL,
                url: 'auth/oauth/refresh',
                method: 'POST',
                data: {
                  idUser: sessionStorage.uid,
                  refreshToken: sessionStorage.refresh_token,
                  bpmToken: sessionStorage.bpm_token
                }
              }

              __this.refreshTokenAxios = Axios.create({
                baseURL: process.env.baseURL,
                timeout: 45000,
                url: __this.refreshToken.endpoint,
                responseType: 'json',
                headers: {
                  'Content-Type': 'application/json'
                }
              })

              __this.refreshTokenAxios
                .request(__this.refreshToken) // Refresh token
                .then(response => {
                  sessionStorage.access_token = response.data.access_token
                  sessionStorage.refresh_token = response.data.refresh_token
                  sessionStorage.bpm_token = response.data.bpm_token

                  _this.config.headers.Authorization = response.data.bpm_token

                  _this.instanceAxios
                    .request(_this.config) // Recall Service New Token
                    // eslint-disable-next-line no-shadow
                    .then(response => {
                      resolve(response)
                    })
                    // eslint-disable-next-line no-shadow
                    .catch(error => {
                      reject(error)
                    })
                })
                .catch(() => {
                  sessionStorage.clear()
                  window.location.href = `/${process.env.APP}/login`
                })
            } else if (
              error.response.data &&
              error.response.data.codigoError === CODE_SESSION_OUT
            ) {
              // Session Out Service

              reject(error)
            } else if (error.response.data) {
              // Error Service

              // if (error.response.status == 400){
              //	reject({response: {data: {message: "Error"}}})
              // } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ response: { data: error.response.data } })
              // }

              // reject(error)
            } else if (error.response.data === undefined) {
              // Error Service

              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ response: { data: { message: 'Error' } } })
            }
          } else {
            // Error Connect

            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              response: {
                data: { message: 'Error de conexión, intente de nuevo' }
              }
            })
          }
        })
    })
  }
}
