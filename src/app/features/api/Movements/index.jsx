/* eslint-disable no-nested-ternary */
// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'

export default async function getMovements(obj) {
  return new ClientHttpRequest({
    service: 'api/getMovements',
    method: 'POST',
    data: { ...obj },
    headers: Object.assign({
      Authorization: sessionStorage.access_token,
      uid: sessionStorage.uid
    })
  })
    .request()
    .then(response => {
      let partidas = []
      response.data.transacciones.transaccion.forEach(trans => {
        if (trans.partidas) {
          partidas = trans.partidas.partida.map(part => {
            const partida = {
              folio: part.prenda.folio,
              monto: part.operacion.monto,
              operacion: part.operacion.nombreOperacion,
              estatus: trans.estado,
              fecha: trans.fechaTransaccion,
              autorizacion: trans.numeroAutorizacion,
              transaccion: trans.idTransaccion,
              imprimir: trans.aplicaImpresion ? 'Imprimir' : ''
            }
            return partida
          })
        }
      })
      return partidas
    })
    .catch(error => {
      throw error
    })
}

export async function downloadTicketMovements(form) {
  return new ClientHttpRequest({
    service: 'api/downloadTicketMovements',
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
