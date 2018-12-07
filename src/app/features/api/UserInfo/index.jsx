// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'

export default async function getUserInfo() {
  return new ClientHttpRequest({
    service: 'api/userInfo',
    method: 'POST',
    data: { usuarioMonte: sessionStorage.uid },
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
