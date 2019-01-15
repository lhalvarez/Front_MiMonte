// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'

export default async function payMethod(obj) {
  return new ClientHttpRequest({
    service: 'api/payMethod',
    method: 'POST',
    data: { ...obj },
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

export async function endTransaction(idTransaccion) {
  return new ClientHttpRequest({
    service: 'api/endTransaction',
    method: 'POST',
    data: { idTransaccion },
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
