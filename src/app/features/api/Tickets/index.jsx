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
    .then(response => response.data)
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
