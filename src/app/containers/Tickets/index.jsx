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
import ActiveTickets from 'Components/Tickets/ActiveTickets'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import MarketingTickets from 'Components/Tickets/MarketingTickets'
import { isEqual } from 'underscore'
import { equal } from 'assert'

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
  loadingActive: boolean,
  loadingInMarketing: boolean,
  content: Array<mixed>,
  showModal: boolean,
  activeGUID: string,
  marketingGUID: string,
  urlCallBackActive: string,
  dataCallback: Object
}

class Tickets extends Component<Props, State> {
  state = {
    activeKey: 1,
    columns: {
      Active: [
        {
          dataField: 'condiciones.fechaIngreso',
          text: 'Detalle',
          type: 'custom',
          customObject: [
            {
              name: 'Detalles',
              icon: <FontAwesomeIcon icon={faPlusCircle} />,
              class: 'text-center'
            }
          ],
          customDivClass: 'text-center'
        },
        { dataField: 'prenda.folio', text: 'Boleta' },
        {
          dataField: 'prenda.descripcion',
          text: 'Prenda',
          simpleCustomClass: 'descripcion-prenda'
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
          text: 'En comercializació  desde',
          type: 'date'
        }
      ]
    },
    ticketsActive: [],
    ticketsInMarketing: [],
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
    let { activeGUID } = this.state

    activeGUID = getUUID()

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 1 // Boletas activas
      },
      trazabilidad: {
        GUID: activeGUID,
        urlCallBack: `${process.env.baseURL}/boletas-callback`
      }
    })
      .then(response => {
        const { partida } = response.partidas

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
      const { activeGUID, marketingGUID } = this.state
      let { ticketsActive } = this.state

      if (requestGUID) {
        if (requestGUID === activeGUID) {
          const { partidas } = nextProps.dataCallback

          partidas.partida.map(e => {
            const { prenda, saldos } = e
            const item = getItem(ticketsActive, { folio: prenda.folio })
            item.saldos = saldos
            ticketsActive = replaceObject(
              ticketsActive,
              { folio: prenda.folio },
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
    let { activeGUID, marketingGUID } = this.state
    activeGUID = getUUID()
    marketingGUID = getUUID()

    this.setState(
      {
        [`${activekey === '1' ? 'loadingActive' : 'loadingInMarketing'}`]: true,
        ticketsActive: [],
        ticketsInMarketing: []
      },
      () => {
        getUserTickets({
          idCliente: userInfo.clientId,
          criterios: {
            criterioBoleta: activekey // Boletas vencidas
          },
          trazabilidad: { GUID: activekey === 1 ? activeGUID : marketingGUID }
        })
          .then(response => {
            const { partida } = response.partidas

            this.setState({
              [`${
                activekey === '1' ? 'ticketsActive' : 'ticketsInMarketing'
              }`]: partida,
              [`${
                activekey === '1' ? 'loadingActive' : 'loadingInMarketing'
              }`]: false,
              activeGUID,
              marketingGUID
            })
          })
          .catch(() => {
            this.setState({
              [`${
                activekey === '1' ? 'loadingActive' : 'loadingInMarketing'
              }`]: false
            })
          })

        this.setState({ activeKey: activekey })
      }
    )
  }

  onClickDetails = row => {
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
      ticketsActive,
      ticketsInMarketing,
      loadingActive,
      loadingInMarketing,
      content,
      showModal
    } = this.state

    // eslint-disable-next-line no-console
    console.log('activeGUID', activeGUID)
    // eslint-disable-next-line no-console
    console.log('ticketsActive', ticketsActive)
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
                <small>Boletas</small>
              </h4>
            </Col>
            <Col md={12} className="ticket-tabs">
              <Tabs activeKey={activeKey} onSelect={this.onSelect}>
                <Tab eventKey="1" title="Prendas en empeño">
                  <ActiveTickets
                    columns={columns.Active}
                    data={ticketsActive}
                    customHandlers={[this.onClickDetails]}
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
