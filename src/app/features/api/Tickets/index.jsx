// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'

export default async function getUserTickets(form) {
  return new ClientHttpRequest({
    service: 'api/getUserTickets',
    method: 'POST',
    data: { ...form },
    headers: Object.assign({
      Authorization: sessionStorage.access_token,
      uid: sessionStorage.uid
    })
  })
    .request()
    .then(response => {
      const { data } = response
      data.partidas.partida = data.partidas.partida.map(e => {
        e.id = e.prenda.folio.toString()
        return e
      })
      return data
    })
    .catch(error => {
      throw error
    })
}

export async function getDetailsTicket(form) {
  return new ClientHttpRequest({
    service: 'api/getDetailsTicket',
    method: 'POST',
    data: { ...form },
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

export async function downloadTicket(form) {
  return new ClientHttpRequest({
    service: 'api/downloadTicket',
    method: 'POST',
    data: {
      ...form
    },
    responseType: 'arraybuffer',
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
