// Dependencies
import React, { Component } from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { getUUID } from 'SharedUtils/Utils'

// Context
import { UserConsumer } from 'Context/User'
import getUserTickets from 'Api/Tickets'

import ActiveTickets from 'Components/Tickets/ActiveTickets'
import MarketingTickets from 'Components/Tickets/MarketingTickets'

library.add(faPlusCircle)

// Flow
type Props = {
  /** */
}

type State = {
  activeKey: string,
  columns: Array<Object>,
  ticketsActive: Array<Object>,
  ticketsInMarketing: Array<Object>
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
    ticketsInMarketing: []
  }

  componentDidMount() {
    const { userInfo } = this.context

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 1 // Boletas activas
      },
      trazabilidad: { GUID: getUUID() }
    }).then(response => {
      const { partida } = response.partidas

      this.setState({ ticketsActive: partida })
    })
  }

  onSelect = activekey => {
    const { userInfo } = this.context

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: activekey // Boletas vencidas
      },
      trazabilidad: { GUID: getUUID() }
    }).then(response => {
      const { partida } = response.partidas

      this.setState({ ticketsInMarketing: partida, activeKey: activekey })
    })
  }

  // onClickDetails = (row) => {
  //   console.log('El row_:', row)
  // }

  render() {
    const { activeKey, columns, ticketsActive, ticketsInMarketing } = this.state

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
                />
              </Tab>
              <Tab eventKey="3" title="Prendas en comercialización">
                <MarketingTickets
                  columns={columns.Marketing}
                  data={ticketsInMarketing}
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
