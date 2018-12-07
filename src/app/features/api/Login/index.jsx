// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'

export default async function login(form) {
  return new ClientHttpRequest({
    service: 'auth/cognito/login',
    method: 'POST',
    data: { ...form }
  })
    .request()
    .then(response => {
      const { data } = response
      sessionStorage.access_token = data.access_token
      sessionStorage.refresh_token = data.refresh_token
      sessionStorage.bpm_token = data.cognito_token
      sessionStorage.uid = data.username
      return data
    })
    .catch(error => {
      throw error
    })
}

export async function logout() {
  return new ClientHttpRequest({
    service: 'auth/oauth/logout',
    method: 'POST',
    data: {
      token: sessionStorage.access_token,
      idUser: sessionStorage.uid
    },
    headers: Object.assign({
      Authorization: sessionStorage.access_token,
      uid: sessionStorage.uid
    })
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export async function solicitarReinicioContrasena(usuario) {
  return new ClientHttpRequest({
    service: 'auth/oauth/solicitarReinicioContrasena',
    method: 'POST',
    data: { usuario: { nombreUsuario: usuario } }
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export async function registrarContrasena(form) {
  return new ClientHttpRequest({
    service: 'auth/oauth/registrarContrasena',
    method: 'POST',
    data: {
      usuario: {
        nombreUsuario: form.usuario,
        contrasena: form.pwd,
        datosValidacion: { token: form.codeVerify }
      }
    }
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
