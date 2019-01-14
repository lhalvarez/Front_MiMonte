// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'
// Utils
import { getUUID } from 'SharedUtils/Utils'

export default async function getCard(idCliente) {
  return new ClientHttpRequest({
    service: 'api/getCard',
    method: 'POST',
    data: { idCliente },
    headers: Object.assign({
      Authorization: sessionStorage.access_token,
      uid: sessionStorage.uid
    })
  })
    .request()
    .then(response => {
      const { data } = response
      data.object.map(e => {
        e.id = getUUID()
        return e
      })
      return data
    })
    .catch(error => {
      throw error
    })
}

export async function saveCard(form) {
  return new ClientHttpRequest({
    service: 'api/saveCard',
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
      data.object.id = getUUID()
      return data
    })
    .catch(error => {
      throw error
    })
}

export async function deleteCard(tokenCard) {
  return new ClientHttpRequest({
    service: 'api/deleteCard',
    method: 'POST',
    data: { tokenCard },
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

export async function updateCard(form) {
  return new ClientHttpRequest({
    service: 'api/updateCard',
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
      data.object.id = getUUID()
      return data
    })
    .catch(error => {
      throw error
    })
}
