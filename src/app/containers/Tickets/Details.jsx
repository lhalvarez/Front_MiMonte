// Dependencies
import React, { Component, Fragment, SyntheticEvent } from 'react'
// Components
import DetailTickets from 'Components/Tickets/DetailTickets'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
// API
import { getDetailsTicket } from 'Api/Tickets'
// Context
import TicketsContext from 'Context/Tickets'
// Utils
import { errorMessage } from 'SharedUtils/Utils'
// Flow Props and Stats
type Props = {
  /** */
}
type State = {
  columns: Array<Object>,
  content: Array<mixed>,
  data: Array<Object>,
  isLoading: boolean,
  ticketConditions: Array<Object>,
  ticketDetail: Array<Object>,
  ticketOperations: Array<Object>,
  showModal: boolean
}

class Details extends Component<Props, State> {
  state = {
    columns: {
      Detail: [
        { dataField: 'tipoOperacion', text: 'Operacion' },
        { dataField: 'monto', text: 'Monto' }
      ]
    },
    content: [],
    ticketConditions: {},
    ticketOperations: {
      operacion: []
    },
    ticketDetail: {},
    showModal: false,
    isLoading: true
  }

  componentWillMount() {
    const { location } = this.props
    const { folio } = location.state
    getDetailsTicket({
      folios: { folio: [folio] }
    })
      .then(response => {
        const { partida } = response.partidas
        partida.map(p =>
          this.setState({
            ticketConditions: p.condiciones,
            ticketDetail: p.prenda,
            ticketOperations: p.operaciones,
            isLoading: false
          })
        )
      })
      .catch(error => {
        if (error) {
          this.setState({
            showModal: true,
            isLoading: false,
            content: errorMessage('No se pueden obtener los datos')
          })
        }
      })
  }

  handleHide = (event: SyntheticEvent<HTMLButtonElement>) => {
    if ((event.currentTarget: HTMLButtonElement)) {
      this.setState({ showModal: false })
    }
  }

  render() {
    const {
      columns,
      content,
      ticketConditions,
      ticketDetail,
      ticketOperations,
      showModal,
      isLoading
    } = this.state

    return (
      <Fragment>
        {(!isLoading && (
          <div className="border-box-shadow mt-4">
            <TicketsContext.Provider
              value={{ ticketConditions, ticketDetail, ticketOperations }}
            >
              <ModalProvider
                content={content}
                showModal={showModal}
                onClose={this.handleHide}
              />
              <DetailTickets
                columns={columns.Detail}
                data={ticketOperations.operacion}
              />
            </TicketsContext.Provider>
          </div>
        )) || <Spinner />}
      </Fragment>
    )
  }
}

export default Details
