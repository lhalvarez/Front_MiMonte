/* eslint-disable no-unused-vars */
// Dependencies
import React, { Fragment, Component, SyntheticEvent } from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
// Utils
import {
  getUUID,
  errorMessage,
  getItem,
  replaceObject
} from 'SharedUtils/Utils'
// Context
import { UserConsumer } from 'Context/User'
// API
// eslint-disable-next-line import/named
import getUserTickets, { getDetailsTicket } from 'Api/Tickets'
// Components
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import DataTable from 'Components/commons/DataTable'
import { isEqual } from 'underscore'
import numeral from 'numeral'

library.add(faPlusCircle)

// Flow Props and Stats
type Props = {
  history: Array<mixed>,
  handleLoading: void,
  dataCallback: Object
}

type State = {
  activeKey: string,
  columns: Array<Object>,
  ticketsActive: Array<Object>,
  ticketsInMarketing: Array<Object>,
  ticketsNextToBeat: Array<Object>,
  loadingActive: boolean,
  loadingInMarketing: boolean,
  loadingNextToBeat: boolean,
  content: Array<mixed>,
  showModal: boolean,
  activeGUID: string,
  marketingGUID: string,
  urlCallBackActive: string,
  dataCallback: Object
}

class Tickets extends Component<Props, State> {
  state = {
    activeKey: 2,
    columns: [
      {
        dataField: 'id',
        text: 'Nº boleta',
        simpleCustomClass: 'boleta'
      },
      {
        dataField: 'descripcion',
        text: 'Prenda',
        classes: 'descripcion-prenda-pago'
      },
      {
        dataField: 'saldos',
        text: 'Operación | Monto'
      },
      {
        dataField: 'condiciones.fechaLimitePago',
        text: 'Fecha límite de pago',
        type: 'date'
      }
    ],
    ticketsActive: [],
    loadingActive: true,
    content: [],
    showModal: false,
    activeGUID: '',
    dataCallback: {}
  }

  componentWillMount() {
    const { userInfo, data } = this.context
    const { dataCallback } = this.state
    let { activeGUID } = this.state
    activeGUID = getUUID()

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 1 // Boletas activas
      },
      trazabilidad: {
        GUID: activeGUID,
        urlCallBack: `${process.env.baseURL}mimonte/boletas-callback`
      }
    })
      .then(response => {
        let { partida } = response.partidas

        partida = partida.map(e => {
          const Descripcion = () => {
            const { descripcion, tipoContrato } = e.prenda

            return (
              <p>
                {descripcion.toString()}
                <br />
                <small>{`Tipo de empeño: ${tipoContrato}`}</small>
              </p>
            )
          }
          e.descripcion = <Descripcion />
          e.saldos = <p>Cargando saldos...</p>

          return e
        })

        this.setState({
          ticketsActive: partida,
          activeGUID,
          loadingActive: false,
          dataCallback: data
        })
      })
      .catch(() => {
        this.setState({ loadingActive: false })
      })
  }

  componentWillReceiveProps(nextProps) {
    const { dataCallback } = this.props
    if (!isEqual(dataCallback, nextProps.dataCallback)) {
      const { requestGUID } = nextProps.dataCallback
      const { activeGUID } = this.state
      let { ticketsActive } = this.state

      if (requestGUID) {
        if (requestGUID === activeGUID) {
          const { partidas } = nextProps.dataCallback

          partidas.partida.map(e => {
            const { prenda, saldos } = e
            const item = getItem(ticketsActive, { id: prenda.folio })

            const Saldos = () => {
              const { saldoDesempeno, saldoRefrendo } = saldos

              return (
                <p>
                  {saldoDesempeno && (
                    <small>
                      {`Desempeño: ${numeral(saldoDesempeno).format(
                        '$ 0,0.00'
                      )}`}
                    </small>
                  )}
                  <br />
                  {saldoRefrendo && (
                    <small>
                      {`Refrendo: ${numeral(saldoRefrendo).format('$ 0,0.00')}`}
                    </small>
                  )}
                </p>
              )
            }

            item.saldos = <Saldos />
            ticketsActive = replaceObject(
              ticketsActive,
              { id: prenda.folio },
              item
            )
            return true
          })
        }
        this.setState({ ticketsActive })
      }
    }
  }

  onClickDetails = (id, table) => {
    // eslint-disable-next-line react/destructuring-assignment
    const data = this.state[table]
    const row = getItem(data, { id })

    const { folio } = row.prenda
    const { handleLoading, history } = this.props

    handleLoading(true)
    getDetailsTicket({ folios: { folio: [folio] } })
      .then(response => {
        const { partidas } = response
        handleLoading(false)
        history.push('boletas/detalle', { ...partidas.partida[0] })
      })
      .catch(err => {
        handleLoading(false)
        this.setState({ showModal: true, content: errorMessage(err) })
      })
  }

  handleHide = (event: SyntheticEvent<HTMLButtonElement>) => {
    if ((event.currentTarget: HTMLButtonElement)) {
      this.setState({ showModal: false })
    }
  }

  render() {
    const {
      activeGUID,
      columns,
      ticketsActive,
      loadingActive,
      content,
      showModal
    } = this.state
    // eslint-disable-next-line no-console
    console.log('Revisión de saldos__', ticketsActive)
    return (
      <Fragment>
        <ModalProvider
          content={content}
          showModal={showModal}
          onClose={this.handleHide}
        />
        <div className="border-box-shadow mt-4">
          <Row className="tickets-next-to-beat-message">
            <Col md={12}>
              <h4>
                <small>Pago en línea</small>
              </h4>
            </Col>
            <Col md={9}>
              <DataTable
                columns={columns}
                data={ticketsActive}
                noDataIndication="No cuentas con boletas activas"
                search
                pagination
                loading={loadingActive}
              />
            </Col>
            <Col md={3}>
              <h1>Detalle de pago</h1>
            </Col>
          </Row>
        </div>
      </Fragment>
    )
  }
}

Tickets.contextType = UserConsumer

export default Tickets
