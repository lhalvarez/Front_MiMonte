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
import PromotionalBanner from 'Components/Home/PromotionalBanner'
import TicketsToBeat from 'Components/Tickets/TicketsToBeat'
import ActiveTickets from 'Components/Tickets/ActiveTickets'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import MarketingTickets from 'Components/Tickets/MarketingTickets'
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
    columns: {
      Active: [
        {
          dataField: 'condiciones.fechaIngreso',
          text: '',
          type: 'custom',
          customObject: [
            {
              name: 'Detalles',
              icon: <FontAwesomeIcon icon={faPlusCircle} />
            }
          ],
          customDivClass: 'action-centered'
        },
        {
          dataField: 'prenda.folio',
          text: 'Nº boleta',
          simpleCustomClass: 'boleta'
        },
        {
          dataField: 'descripcion',
          text: 'Prenda',
          classes: 'descripcion-prenda'
        },
        {
          dataField: 'montoEmpeno',
          text: 'Monto del empeño'
        },
        {
          dataField: 'condiciones.fechaLimitePago',
          text: 'Fecha límite de pago',
          type: 'date'
        }
      ],
      Marketing: [
        { dataField: 'prenda.folio', text: 'Boleta' },
        {
          dataField: 'prenda.descripcion',
          text: 'Prenda',
          simpleCustomClass: 'descripcion-prenda'
        },
        { dataField: 'prenda.sucursal', text: 'Sucursal' },
        {
          dataField: 'condiciones.fechaComercializacion',
          text: 'En comercialización desde',
          type: 'date'
        }
      ]
    },
    ticketsNextToBeat: [],
    ticketsActive: [],
    ticketsInMarketing: [],
    loadingNextToBeat: true,
    loadingActive: true,
    loadingInMarketing: true,
    content: [],
    showModal: false,
    activeGUID: '',
    marketingGUID: '',
    dataCallback: {}
  }

  componentWillMount() {
    const { userInfo, data } = this.context
    const { dataCallback } = this.state
    // let { activeGUID } = this.state
    // activeGUID = getUUID()

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 2 // Boletas activas
      },
      trazabilidad: {
        GUID: getUUID(),
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

          return e
        })

        this.setState({
          ticketsNextToBeat: partida,
          // activeGUID,
          loadingNextToBeat: false,
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
      const { activeGUID, marketingGUID } = this.state
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

  onSelect = activekey => {
    const { userInfo } = this.context
    // let { activeGUID } = this.state
    // activeGUID = getUUID()

    this.setState(
      {
        [`${
          // eslint-disable-next-line no-nested-ternary
          activekey === '1'
            ? 'loadingActive'
            : activekey === '3'
            ? 'loadingInMarketing'
            : 'loadingNextToBeat'
        }`]: true,
        ticketsActive: [],
        ticketsInMarketing: [],
        ticketsNextToBeat: []
      },
      () => {
        getUserTickets({
          idCliente: userInfo.clientId,
          criterios: {
            criterioBoleta: activekey // Boletas vencidas
          },
          trazabilidad: {
            GUID: getUUID(),
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
                    {descripcion}
                    <br />
                    <small>{`Tipo de empeño: ${tipoContrato}`}</small>
                  </p>
                )
              }
              e.descripcion = <Descripcion />

              return e
            })

            this.setState({
              [`${
                // eslint-disable-next-line no-nested-ternary
                activekey === '1'
                  ? 'ticketsActive'
                  : activekey === '3'
                  ? 'ticketsInMarketing'
                  : 'ticketsNextToBeat'
              }`]: partida,
              [`${
                // eslint-disable-next-line no-nested-ternary
                activekey === '1'
                  ? 'loadingActive'
                  : activekey === '3'
                  ? 'loadingInMarketing'
                  : 'loadingNextToBeat'
              }`]: false
            })
          })
          .catch(() => {
            this.setState({
              [`${
                // eslint-disable-next-line no-nested-ternary
                activekey === '1'
                  ? 'loadingActive'
                  : activekey === '3'
                  ? 'loadingInMarketing'
                  : 'loadingNextToBeat'
              }`]: false
            })
          })

        this.setState({ activeKey: activekey })
      }
    )
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
      activeKey,
      activeGUID,
      marketingGUID,
      columns,
      ticketsNextToBeat,
      ticketsActive,
      ticketsInMarketing,
      loadingNextToBeat,
      loadingActive,
      loadingInMarketing,
      content,
      showModal
    } = this.state

    return (
      <Fragment>
        <ModalProvider
          content={content}
          showModal={showModal}
          onClose={this.handleHide}
        />
        <PromotionalBanner />
        <div className="border-box-shadow mt-4">
          <Row className="tickets-next-to-beat-message">
            <Col md={12}>
              <h4>
                <small>Boletas</small>
              </h4>
            </Col>
            <Col md={12} className="ticket-tabs">
              <Tabs
                activeKey={activeKey}
                onSelect={this.onSelect}
                unmountOnExit
              >
                <Tab eventKey="2" title="Boletas próximas a vencer">
                  <TicketsToBeat
                    columns={columns.Active}
                    data={ticketsNextToBeat}
                    customHandlers={[
                      e => this.onClickDetails(e, 'ticketsNextToBeat')
                    ]}
                    loading={loadingNextToBeat}
                  />
                </Tab>
                <Tab eventKey="1" title="Prendas en empeño">
                  <ActiveTickets
                    columns={columns.Active}
                    data={ticketsActive}
                    customHandlers={[
                      e => this.onClickDetails(e, 'ticketsActive')
                    ]}
                    loading={loadingActive}
                  />
                </Tab>
                <Tab eventKey="3" title="Prendas en comercialización">
                  <MarketingTickets
                    columns={columns.Marketing}
                    data={ticketsInMarketing}
                    loading={loadingInMarketing}
                  />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Fragment>
    )
  }
}

Tickets.contextType = UserConsumer

export default Tickets
