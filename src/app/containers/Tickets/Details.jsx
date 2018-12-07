// Dependencies
import React, { Component, Fragment } from 'react'
// Components
import DetailTickets from 'Components/Tickets/DetailTickets'
// API
import { downloadTicket } from 'Api/Tickets'
// Context
import TicketsContext from 'Context/Tickets'
import { UserContext } from 'Context/User'
// Utils
import { errorMessage } from 'SharedUtils/Utils'
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
  ticketOperations: Array<Object>
}

class Details extends Component<Props, State> {
  static contextType = UserContext

  state = {
    columns: {
      Detail: [
        { dataField: 'tipoOperacion', text: 'Operacion' },
        { dataField: 'monto', type: 'currency', text: 'Monto' },
        {
          dataField: 'folio',
          text: 'Detalle',
          type: 'custom',
          customObject: [
            {
              name: 'Descargar',
              icon: '',
              class: 'text-center'
            },
            {
              name: 'Visualizar',
              icon: '',
              class: 'text-center'
            }
          ],
          customDivClass: 'text-center'
        }
      ]
    },
    ticketConditions: {},
    ticketOperations: {
      operacion: []
    },
    ticketDetail: {}
  }

  componentWillMount() {
    const { location } = this.props
    const { condiciones, prenda } = location.state
    const { operaciones } = location.state

    operaciones.operacion = operaciones.operacion.map(e => {
      e.folio = prenda.folio
      return e
    })

    this.setState({
      ticketConditions: condiciones,
      ticketOperations: operaciones,
      ticketDetail: prenda
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
    const { history } = this.props
    history.push('/mimonte/boletas')
  }

  render() {
    const {
      columns,
      ticketConditions,
      ticketDetail,
      ticketOperations
    } = this.state

    return (
      <Fragment>
        <div className="border-box-shadow mt-4">
          <TicketsContext.Provider
            value={{ ticketConditions, ticketDetail, ticketOperations }}
          >
            <DetailTickets
              columns={columns.Detail}
              data={ticketOperations.operacion}
              customHandlers={[
                e => this.onClickDocument(e, 'Descarga'),
                e => this.onClickDocument(e, 'visualiza')
              ]}
              handleBack={this.onClickBack}
            />
          </TicketsContext.Provider>
        </div>
      </Fragment>
    )
  }
}

export default Details
