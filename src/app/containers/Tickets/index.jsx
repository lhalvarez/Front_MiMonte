// Dependencies
import React, { Component } from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
// Utils
import { getUUID } from 'SharedUtils/Utils'
// Context
import { UserConsumer } from 'Context/User'
// API
import getUserTickets from 'Api/Tickets'
// Components
import ActiveTickets from 'Components/Tickets/ActiveTickets'
import MarketingTickets from 'Components/Tickets/MarketingTickets'

library.add(faPlusCircle)

// Flow Props and Stats
type Props = {
  history: Array<mixed>
}
type State = {
  activeKey: string,
  columns: Array<Object>,
  ticketsActive: Array<Object>,
  ticketsInMarketing: Array<Object>,
  loadingActive: boolean,
  loadingInMarketing: boolean
}

class Tickets extends Component<Props, State> {
  static contextType = UserConsumer

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
        { dataField: 'prenda.descripcion', text: 'Prenda' },
        {
          dataField: 'condiciones.fechaLimitePago',
          text: 'Fecha límite de pago',
          type: 'date'
        }
      ],
      Marketing: [
        { dataField: 'prenda.folio', text: 'Boleta' },
        { dataField: 'prenda.descripcion', text: 'Prenda' },
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
    loadingInMarketing: true
  }

  componentWillMount() {
    const { userInfo } = this.context

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 1 // Boletas activas
      },
      trazabilidad: { GUID: getUUID() }
    })
      .then(response => {
        const { partida } = response.partidas

        this.setState({ ticketsActive: partida, loadingActive: false })
      })
      .catch(() => {
        this.setState({ loadingActive: false })
      })
  }

  onSelect = activekey => {
    const { userInfo } = this.context

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
          trazabilidad: { GUID: getUUID() }
        })
          .then(response => {
            const { partida } = response.partidas

            this.setState({
              [`${
                activekey === '1' ? 'ticketsActive' : 'ticketsInMarketing'
              }`]: partida,
              [`${
                activekey === '1' ? 'loadingActive' : 'loadingInMarketing'
              }`]: false
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
    const { history } = this.props
    history.push('boletas/detalle', { folio })
  }

  render() {
    const {
      activeKey,
      columns,
      ticketsActive,
      ticketsInMarketing,
      loadingActive,
      loadingInMarketing
    } = this.state

    return (
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
    )
  }
}

export default Tickets
