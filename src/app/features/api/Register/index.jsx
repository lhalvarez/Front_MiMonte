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

export async function createUser(form) {
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
    service: 'auth/createUser',
    method: 'POST',
    data: { cliente }
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
