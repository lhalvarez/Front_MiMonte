/* eslint-disable no-nested-ternary */
// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'

export default async function validateData(form) {
  const cliente = {
    numCredencial: form.tarjeta,
    apellidoPaterno: form.apPat,
    apellidoMaterno: form.apMat,
    nombres: form.nombre,
    fechaNacimiento: form.fecNac,
    correoElectronico: form.email,
    telefono: { numeroTelefono: form.celular },
    medioValidacion: 1,
    datosPrendarios: { numContrato: 0 }
  }

  return new ClientHttpRequest({
    service: 'auth/validateData',
    method: 'POST',
    data: { cliente }
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export async function createUser(form, option) {
  const creaUsr = {
    usuario:
      option === 'altaUsuario'
        ? {
            nombreUsuario: form.email,
            contrasena: form.pwd,
            datosValidacion: { token: form.codeVerify },
            medioContacto: {
              contactoPor: 1,
              valorContacto: form.celular
            }
          }
        : {
            nombreUsuario: form.email,
            datosValidacion: { '@reenvioToken': true },
            medioContacto: {
              contactoPor: 1,
              valorContacto: form.celular
            }
          },
    cliente:
      option === 'altaUsuario'
        ? { numCredencial: form.tarjeta }
        : { idCliente: form.idCliente }
  }

  return new ClientHttpRequest({
    service:
      option === 'altaUsuario'
        ? 'auth/createUser'
        : 'auth/validateMediaContact',
    method: 'POST',
    data: { ...creaUsr }
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
