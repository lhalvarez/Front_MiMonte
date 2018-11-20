// Dependencies
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import PromotionalBanner from 'Components/Home/PromotionalBanner'
import Commercialization from 'Components/Home/Commercialization'
import TicketCard from 'Components/Home/TicketCard'
import NoTicketsToBeat from 'Components/Home/NoTicketsToBeat'
import Button from 'Components/commons/Button'

import { getUUID } from 'SharedUtils/Utils'
// Context
import { UserConsumer } from 'Context/User'
import getUserTickets from 'Api/Tickets'
// Flow
type Props = {
  /** */
}
type State = {
  columns: Array<Object>,
  ticketsActive: Array<Object>,
  ticketsNextToBeat: Array<Object>,
  ticketsInMarketing: Array<Object>
}

class Home extends Component<Props, State> {
  static contextType = UserConsumer

  state = {
    columns: [
      { dataField: 'prenda.folio', text: 'Boleta' },
      { dataField: 'prenda.descripcion', text: 'Prenda' },
      { dataField: 'prenda.sucursal', text: 'Sucursal' },
      {
        dataField: 'condiciones.fechaComercializacion',
        text: 'En comercialización desde',
        type: 'date'
      }
    ],
    ticketsActive: [],
    ticketsNextToBeat: [],
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

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 2 // Boletas próximas a vencer
      },
      trazabilidad: { GUID: getUUID() }
    }).then(response => {
      const { partida } = response.partidas

      this.setState({ ticketsNextToBeat: partida })
    })

    getUserTickets({
      idCliente: userInfo.clientId,
      criterios: {
        criterioBoleta: 3 // Boletas vencidas
      },
      trazabilidad: { GUID: getUUID() }
    }).then(response => {
      const { partida } = response.partidas

      this.setState({ ticketsInMarketing: partida })
    })
  }

  render() {
    const {
      columns,
      ticketsActive,
      ticketsNextToBeat,
      ticketsInMarketing
    } = this.state

    return (
      <Row>
        <Col>
          <PromotionalBanner />
          <div className="border-box-shadow mt-4">
            <Row className="tickets-next-to-beat-message">
              <Col md={9}>
                <h4>
                  {`Tienes ${ticketsActive.length} boletas activas`}
                  <br />
                  <small>Tus boletas próximas a vencer</small>
                </h4>
              </Col>
              <Col md={3}>
                <Button
                  variant="default"
                  label="Ver todas las boletas"
                  className="d-block mx-auto"
                  size="sm"
                />
              </Col>
            </Row>
            <Row>
              {ticketsNextToBeat.length ? (
                ticketsNextToBeat.map(t => {
                  const { folio, descripcion, tipoContrato } = t.prenda
                  const { fechaLimitePago } = t.condiciones

                  return (
                    <Col md={4}>
                      <TicketCard
                        ticketNumber={folio}
                        description={descripcion}
                        type={tipoContrato}
                        date={fechaLimitePago}
                        handleClickDetail={() => {}}
                      />
                    </Col>
                  )
                })
              ) : (
                <Col>
                  <NoTicketsToBeat />
                </Col>
              )}
            </Row>
          </div>
          <div className="border-box-shadow mt-4">
            <Row className="tickets-next-to-beat-message">
              <Col md={9}>
                <h4>
                  <br />
                  <small>Prendas en comercialización</small>
                </h4>
              </Col>
              <Col md={3}>
                <Button
                  variant="default"
                  label="Ver todas las boletas"
                  className="d-block mx-auto"
                  size="sm"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Commercialization
                  data={ticketsInMarketing}
                  columns={columns}
                  customHandlers={[this.onClickDetail]}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Home
