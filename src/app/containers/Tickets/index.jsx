/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
// Dependencies
import React, {
  Fragment,
  Component,
  SyntheticEvent,
  SyntheticInputEvent
} from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
// Utils
import {
  getUUID,
  errorMessage,
  getItem,
  replaceObject,
  capitalize,
  removeItem,
  cloneObject,
  warningMessage
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
import PayPanel from 'Components/Tickets/PayPanel'
import { isEqual } from 'underscore'
import numeral from 'numeral'

library.add(faPlusCircle)

// Flow Props and Stats
type Props = {
  history: Array<mixed>,
  handleLoading: void,
  dataCallback: Object,
  onShowModal: Object
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
  paymentDetailTickets: Array<mixed>
}

class Tickets extends Component<Props, State> {
  state = {
    activeKey: 2,
    columns: {
      Active: [
        {
          dataField: 'prenda.folio',
          text: 'Nº boleta',
          simpleCustomClass: 'boleta align-items-center',
          classes: 'descripcion-boleta'
        },
        {
          dataField: 'descripcion',
          text: 'Prenda',
          classes: 'descripcion-prenda'
        },
        {
          dataField: 'saldos',
          text: 'Operación | Monto',
          type: 'saldos',
          classes: 'saldos'
        },
        {
          dataField: 'condiciones.fechaLimitePago',
          text: 'Fecha límite de pago',
          type: 'trafficLight',
          classes: 'text-lowercase align-middle trafficLight'
        }
      ],
      Marketing: [
        { dataField: 'prenda.folio', text: 'Boleta' },
        {
          dataField: 'descripcion',
          text: 'Prenda',
          classes: 'descripcion-prenda'
        },
        {
          dataField: 'prenda.montoPrestamo',
          text: 'Monto del empeño',
          type: 'currency'
        },
        { dataField: 'prenda.sucursal', text: 'Sucursal' },
        {
          dataField: 'condiciones.fechaComercializacion',
          text: 'En comercialización desde',
          type: 'trafficLight',
          classes: 'text-lowercase align-middle trafficLight'
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
    paymentDetailTickets: []
  }

  componentDidMount() {
    const { location } = this.props
    const tickets = location.state ? location.state.tickets : []
    const { userInfo, data } = this.context
    const marketingGUID = getUUID()

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 2 // Boletas activas
      },
      trazabilidad: {
        GUID: marketingGUID,
        urlCallBack: `${process.env.baseURL}/mimonte/boletas-callback`
      }
    })
      .then(response => {
        let { partida } = response.partidas

        partida = partida.map(e => {
          const item = getItem(tickets, { id: e.id })

          if (item) {
            switch (item.tipoEmpeno) {
              case 'desempeno':
                e.radioDesempeno = true
                break
              case 'refrendo':
                e.radioRefrendo = true
                break
              case 'abono':
                e.radioAbono = true
                break
              default:
            }
          }

          const Descripcion = () => {
            const { id, prenda } = e
            const { descripcion, tipoContrato } = prenda

            return (
              <Fragment>
                <p>
                  {descripcion.toString()}
                  <br />
                  <small>{`Tipo de empeño: ${tipoContrato}`}</small>
                </p>
                <a
                  href="#"
                  // eslint-disable-next-line no-shadow
                  onClick={e => {
                    // eslint-disable-next-line no-unused-expressions
                    e.preventDefault()
                    this.onClickDetails(id)
                  }}
                >
                  Ver detalles
                </a>
              </Fragment>
            )
          }

          e.descripcion = <Descripcion />
          return e
        })

        this.setState({
          ticketsNextToBeat: partida,
          marketingGUID,
          loadingNextToBeat: false,
          paymentDetailTickets: cloneObject(tickets)
        })
      })
      .catch(() => {
        this.setState({
          loadingNextToBeat: false,
          paymentDetailTickets: tickets
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    const { dataCallback, location } = this.props
    const tickets = location.state ? location.state.tickets : []
    const { activeGUID, marketingGUID } = this.state

    if (!isEqual(dataCallback, nextProps.dataCallback)) {
      const { requestGUID } = nextProps.dataCallback
      let { ticketsNextToBeat, ticketsActive } = this.state

      if (requestGUID) {
        const { partidas } = nextProps.dataCallback
        if (requestGUID === activeGUID) {
          partidas.partida.map(e => {
            const { prenda, saldos } = e
            const item = getItem(ticketsActive, { id: prenda.folio })
            if (item) {
              const itemTicket = getItem(tickets, { id: item.id })
              if (itemTicket) {
                switch (itemTicket.tipoEmpeno) {
                  case 'desempeno':
                    item.radioDesempeno = true
                    break
                  case 'refrendo':
                    item.radioRefrendo = true
                    break
                  case 'abono':
                    item.radioAbono = true
                    item.abono = itemTicket.monto
                    break
                  default:
                }
              }

              item.saldos = saldos
              ticketsActive = replaceObject(
                ticketsActive,
                { id: prenda.folio },
                item
              )
            }
            return e
          })
        } else if (requestGUID === marketingGUID) {
          partidas.partida.map(e => {
            const { prenda, saldos } = e
            const item = getItem(ticketsNextToBeat, { id: prenda.folio })
            if (item) {
              const itemTicket = getItem(tickets, { id: item.id })
              if (itemTicket) {
                switch (itemTicket.tipoEmpeno) {
                  case 'desempeno':
                    item.radioDesempeno = true
                    break
                  case 'refrendo':
                    item.radioRefrendo = true
                    break
                  case 'abono':
                    item.radioAbono = true
                    break
                  default:
                }
              }
              item.saldos = saldos
              ticketsNextToBeat = replaceObject(
                ticketsNextToBeat,
                { id: prenda.folio },
                item
              )
            }
            return e
          })
        }
        this.setState({ ticketsNextToBeat, ticketsActive })
      }
    }
  }

  onSelect = activekey => {
    const { location } = this.props
    const tickets = location.state ? location.state.tickets : []
    const { userInfo } = this.context
    const activeGUID = getUUID()
    const marketingGUID = getUUID()

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
            GUID:
              // eslint-disable-next-line no-nested-ternary
              activekey === '2'
                ? marketingGUID
                : activekey === '1'
                ? activeGUID
                : getUUID(),
            urlCallBack: `${process.env.baseURL}/mimonte/boletas-callback`
          }
        })
          .then(response => {
            let { partida } = response.partidas

            partida = partida.map(e => {
              const Descripcion = () => {
                const { id, prenda } = e
                const { descripcion, tipoContrato } = prenda

                return (
                  <Fragment>
                    <p>
                      {descripcion.toString()}
                      <br />
                      <small>{`Tipo de empeño: ${tipoContrato}`}</small>
                    </p>
                    <a
                      href="#"
                      // eslint-disable-next-line no-shadow
                      onClick={e => {
                        // eslint-disable-next-line no-unused-expressions
                        e.preventDefault()
                        this.onClickDetails(id, 'ticketsNextToBeat')
                      }}
                    >
                      Ver detalles
                    </a>
                  </Fragment>
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
              }`]: false,
              [`${
                // eslint-disable-next-line no-nested-ternary
                activekey === '1'
                  ? 'activeGUID'
                  : activekey === '3'
                  ? 'realMarketingGUID'
                  : 'marketingGUID'
              }`]:
                // eslint-disable-next-line no-nested-ternary
                activekey === '1'
                  ? activeGUID
                  : activekey === '3'
                  ? getUUID()
                  : marketingGUID
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

  onClickDetails = id => {
    // eslint-disable-next-line react/destructuring-assignment
    const { activeKey, paymentDetailTickets } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    const data = this.state[
      `${
        activeKey === '2' || activeKey === 2
          ? 'ticketsNextToBeat'
          : activeKey === '1' || activeKey === 1
          ? 'ticketsActive'
          : 'ticketsInMarketing'
      }`
    ]
    const item = getItem(data, { id })

    const { folio } = item.prenda
    const { handleLoading, onShowModal, history } = this.props

    handleLoading(true)
    getDetailsTicket({ folios: { folio: [folio] } })
      .then(response => {
        const { partidas } = response
        const { saldos } = item

        handleLoading(false)
        history.push('boletas/detalle', {
          ...partidas.partida[0],
          saldos,
          tickets: paymentDetailTickets
        })
      })
      .catch(err => {
        handleLoading(false)
        onShowModal(errorMessage(err))
      })
  }

  onBlur = e => {
    const { history, onShowModal } = this.props
    const { value, id } = e.target
    const { activeKey } = this.state
    let { paymentDetailTickets } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    let dataArray = this.state[
      activeKey === 2 ? 'ticketsNextToBeat' : 'ticketsActive'
    ]
    const item = getItem(dataArray, { id })
    const { saldos } = item
    const itemDetail = getItem(paymentDetailTickets, { id })

    if (parseFloat(saldos.saldoDesempeno) < parseFloat(value)) {
      onShowModal(
        warningMessage('La cantidad no debe exceder el monto del desempeño')
      )
    } else {
      item.abono = value
      itemDetail.monto = parseFloat(value)
      dataArray = replaceObject(dataArray, { id }, item)
      paymentDetailTickets = replaceObject(
        paymentDetailTickets,
        { id },
        itemDetail
      )
      // eslint-disable-next-line no-restricted-globals
      history.push('/mimonte/boletas', { tickets: paymentDetailTickets })
      this.setState({
        [activeKey === 2 ? 'ticketsNextToBeat' : 'ticketsActive']: dataArray,
        paymentDetailTickets
      })
    }
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    const { history, onShowModal } = this.props
    const { id } = target
    const [option, folio] = id.split('&')
    const { activeKey } = this.state
    let { paymentDetailTickets } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    let dataArray = this.state[
      activeKey === 2 ? 'ticketsNextToBeat' : 'ticketsActive'
    ]
    const item = getItem(dataArray, { id: folio })
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

    if (item.monto === 0 && option !== 'abono') {
      onShowModal(warningMessage('No se puede seleccionar ésta operación'))
    } else {
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

      dataArray = replaceObject(dataArray, { id: folio }, item)
      // eslint-disable-next-line no-restricted-globals
      history.push('/mimonte/boletas', { tickets: paymentDetailTickets })
      this.setState({
        [activeKey === 1 ? 'ticketsInMarketing' : 'ticketsActive']: dataArray,
        paymentDetailTickets
      })
    }
  }

  onClickDetelete = id => {
    const { history } = this.props
    const { activeKey } = this.state
    let { paymentDetailTickets } = this.state
    const itemDetail = getItem(paymentDetailTickets, { id })
    // eslint-disable-next-line react/destructuring-assignment
    let dataArray = this.state[
      `${
        activeKey === '2'
          ? 'ticketsNextToBeat'
          : activeKey === '1'
          ? 'ticketsActive'
          : ''
      }`
    ]

    if (activeKey === '2' || activeKey === '1') {
      const item = getItem(dataArray, { id })

      switch (itemDetail.tipoEmpeno) {
        case 'desempeno':
          item.radioDesempeno = false
          break
        case 'refrendo':
          item.radioRefrendo = false
          break
        case 'abono':
          item.radioAbono = false
          break
        default:
      }

      dataArray = replaceObject(dataArray, { id }, item)
      paymentDetailTickets = removeItem(paymentDetailTickets, { id })
      // eslint-disable-next-line no-restricted-globals
      history.push('/mimonte/boletas', { tickets: paymentDetailTickets })
      this.setState({
        [activeKey === '2' ? 'ticketsNextToBeat' : 'ticketsActive']: dataArray,
        paymentDetailTickets
      })
    } else {
      paymentDetailTickets = removeItem(paymentDetailTickets, { id })
      this.setState({ paymentDetailTickets })
    }
  }

  onClickPay = () => {
    const { history, onShowModal } = this.props
    const { paymentDetailTickets } = this.state
    // eslint-disable-next-line array-callback-return
    const validation = paymentDetailTickets
      .filter(p => p.abono && !p.monto)
      .map(o => o.id)

    if (validation.length) {
      onShowModal(
        errorMessage(
          'Pago',
          `Proporcione un monto para ${validation.length > 1 ? 'las' : 'la'} ${
            validation.length > 1 ? 'boletas' : 'boleta'
          } ${validation.join(', ')}`
        )
      )
    } else {
      history.push('/mimonte/pago', { tickets: paymentDetailTickets })
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
      showModal,
      paymentDetailTickets
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
            <Col md={9} className="ticket-tabs">
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
                    handleBlur={this.onBlur}
                    handleRadio={this.onChange}
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
                    handleBlur={this.onBlur}
                    handleRadio={this.onChange}
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
            <Col md={3}>
              <PayPanel
                data={paymentDetailTickets}
                handleDetelete={this.onClickDetelete}
                handlePay={this.onClickPay}
              />
            </Col>
          </Row>
        </div>
      </Fragment>
    )
  }
}

Tickets.contextType = UserConsumer

export default Tickets
