/* eslint-disable react/no-unused-state */
// Dependencies
import React, { Component, Fragment, SyntheticInputEvent } from 'react'
// Components
import DetailTickets from 'Components/Tickets/DetailTickets'
// API
import { downloadTicket } from 'Api/Tickets'
// Context
import TicketsContext from 'Context/Tickets'
import { UserContext } from 'Context/User'
// Utils
import {
  errorMessage,
  getItem,
  replaceObject,
  cloneObject,
  warningMessage
} from 'SharedUtils/Utils'
// Flow Props and Stats
type Props = {
  location: Array<{
    state: Object
  }>,
  onShowModal: void,
  history: any
}
type State = {
  columns: Array<Object>,
  content: Array<mixed>,
  data: Array<Object>,
  ticketConditions: Array<Object>,
  ticketDetail: Array<Object>,
  ticketOperations: Array<Object>,
  paymentDetailTickets: Array<Object>,
  activeItem: Array<Object>,
  movimientos: Array<Object>
}

class Details extends Component<Props, State> {
  static contextType = UserContext

  state = {
    columns: {
      ActiveItem: [
        {
          dataField: 'saldos',
          text: 'Operación | Monto',
          type: 'saldos',
          classes: 'saldos'
        },
        {
          dataField: 'fechaLimitePago',
          text: 'Fecha de pago',
          type: 'trafficLight',
          classes: 'text-lowercase align-middle trafficLight'
        }
      ],
      Detail: [
        { dataField: 'movimientos.timestampOperacion', text: 'Fecha de pago' },
        { dataField: 'movimientos.operacion', text: 'Operación' },
        { dataField: 'movimientos.monto', text: 'Monto' },
        { dataField: 'movimeintos.sucursal', text: 'Sucursal' },
        {
          dataField: 'folio',
          text: 'Detalle',
          type: 'custom',
          customObject: [
            {
              name: 'Descargar',
              icon: '',
              class: 'mr-3'
            },
            {
              name: 'Visualizar',
              icon: '',
              class: 'ml-3'
            }
          ],
          customDivClass: ''
        }
      ]
    },
    ticketConditions: {},
    ticketOperations: {
      operacion: []
    },
    ticketDetail: {},
    paymentDetailTicketsOriginal: [],
    paymentDetailTickets: []
  }

  componentWillMount() {
    const activeItem = []
    const { location } = this.props

    const {
      condiciones,
      prenda,
      operaciones,
      operacionesDisponibles,
      tickets
    } = location.state
    let { movimientos } = location.state

    let { saldos } = location.state
    const itemTicket = getItem(tickets, { id: prenda.folio })

    if (saldos === undefined) {
      const saldoDesempeno = operaciones.operacion.find(
        obj => obj.tipoOperacion === 'Desempeño'
      )
      const saldoRefrendo = operaciones.operacion.find(
        obj => obj.tipoOperacion === 'Refrendo'
      )

      saldos = {
        saldoDesempeno: saldoDesempeno ? saldoDesempeno.monto : 0,
        saldoRefrendo: saldoRefrendo ? saldoRefrendo.monto : 0
      }
    }
    const itemObj = {
      id: prenda.folio,
      radioDesempeno: !!(itemTicket && itemTicket.tipoEmpeno === 'desempeno'),
      radioRefrendo: !!(itemTicket && itemTicket.tipoEmpeno === 'refrendo'),
      radioAbono: !!(itemTicket && itemTicket.tipoEmpeno === 'abono'),
      abono:
        itemTicket && itemTicket.tipoEmpeno === 'abono' ? itemTicket.monto : 0,
      operacionesDisponibles,
      saldos,
      fechaLimitePago: condiciones.fechaLimitePago,
      condiciones
    }

    activeItem.push(itemObj)

    operaciones.operacion = operaciones.operacion.map(e => {
      e.folio = prenda.folio
      return e
    })

    movimientos = movimientos === undefined ? [] : movimientos.movimiento
    this.setState({
      ticketConditions: condiciones,
      ticketOperations: operaciones,
      ticketDetail: prenda,
      paymentDetailTickets: cloneObject(tickets),
      activeItem,
      movimientos
    })
  }

  onClickDocument = (row, option) => {
    const { userInfo } = this.context
    const { onShowModal } = this.props

    downloadTicket({
      numeroFolio: row.folio,
      numeroCliente: userInfo.clientId
    })
      .then(response => {
        const blob = new Blob([response], { type: 'application/pdf' })
        const objectUrl = URL.createObjectURL(blob)

        if (option === 'Descarga') {
          const fileName = `boleta-${row.folio.toString()}.pdf`
          const a = document.createElement('a')

          a.href = objectUrl
          a.download = fileName
          document.body.appendChild(a)
          a.click()

          document.body.removeChild(a)
          URL.revokeObjectURL(objectUrl)
        } else {
          window.open(objectUrl)
        }
      })
      .catch(err => {
        onShowModal(errorMessage(err))
      })
  }

  onClickBack = () => {
    const { location, history } = this.props
    const { tickets } = location.state

    history.push('/mimonte/boletas', { tickets })
  }

  onBlur = e => {
    const { onShowModal } = this.props
    const { value, id } = e.target
    let { paymentDetailTickets } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    let { activeItem } = this.state
    const item = activeItem[0]
    const { saldos } = item
    const itemDetail = getItem(paymentDetailTickets, { id })

    if (parseFloat(saldos.saldoDesempeno) < parseFloat(value)) {
      onShowModal(
        warningMessage('La cantidad no debe exceder el monto del desempeño')
      )
    } else {
      item.abono = value
      itemDetail.monto = parseFloat(value)
      activeItem = replaceObject(activeItem, { id }, item)
      paymentDetailTickets = replaceObject(
        paymentDetailTickets,
        { id },
        itemDetail
      )
      this.setState({
        activeItem,
        paymentDetailTickets
      })
    }
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    const { id } = target
    const [option, folio] = id.split('&')
    // eslint-disable-next-line prefer-const
    let { activeItem, paymentDetailTickets } = this.state
    const item = activeItem[0]
    const { saldos } = item
    let itemDetail = getItem(paymentDetailTickets, { id: folio })

    itemDetail = {
      ...itemDetail,
      desempeno: false,
      refrendo: false,
      abono: false,
      [option]: true,
      monto: 0
    }

    switch (option) {
      case 'desempeno':
        item.radioDesempeno = true
        item.radioRefrendo = false
        item.radioAbono = false
        itemDetail.monto = saldos.saldoDesempeno
        break
      case 'refrendo':
        item.radioDesempeno = false
        item.radioRefrendo = true
        item.radioAbono = false
        itemDetail.monto = saldos.saldoRefrendo
        break
      case 'abono':
        item.radioDesempeno = false
        item.radioRefrendo = false
        item.radioAbono = true
        item.monto = 0
        break
      default:
    }

    if (itemDetail.id) {
      itemDetail.tipoEmpeno = option
      paymentDetailTickets = replaceObject(
        paymentDetailTickets,
        { id: folio },
        itemDetail
      )
    } else {
      itemDetail.id = folio
      itemDetail.tipoEmpeno = option
      paymentDetailTickets.push(itemDetail)
    }

    activeItem = replaceObject(activeItem, { id }, item)
    // eslint-disable-next-line no-restricted-globals
    this.setState({
      activeItem,
      paymentDetailTickets
    })
  }

  onClickAdd = () => {
    const { history, location, onShowModal } = this.props
    const { prenda } = location.state

    const { paymentDetailTickets } = this.state
    const item = getItem(paymentDetailTickets, { id: prenda.folio })

    if (item) {
      if (item.tipoEmpeno === 'abono' && !item.monto) {
        onShowModal(
          errorMessage('Agregar pago', 'Proporciona un monto para abonar')
        )
      } else {
        history.push('/mimonte/boletas', { tickets: paymentDetailTickets })
      }
    } else if (!item) {
      onShowModal(
        errorMessage('Agregar pago', 'Selecciona una operación para continuar')
      )
    }
  }

  render() {
    const {
      columns,
      ticketConditions,
      ticketDetail,
      ticketOperations,
      activeItem,
      movimientos
    } = this.state

    return (
      <Fragment>
        <div className="border-box-shadow mt-1 pt-2 py-0 px-0">
          <TicketsContext.Provider
            value={{ ticketConditions, ticketDetail, ticketOperations }}
          >
            <DetailTickets
              columns={columns}
              activeItem={activeItem}
              movimientos={movimientos}
              customHandlers={[
                e => this.onClickDocument(e, 'Descarga'),
                e => this.onClickDocument(e, 'visualiza')
              ]}
              handleBack={this.onClickBack}
              handleBlur={this.onBlur}
              handleRadio={this.onChange}
              handleAdd={this.onClickAdd}
            />
          </TicketsContext.Provider>
        </div>
      </Fragment>
    )
  }
}

export default Details
