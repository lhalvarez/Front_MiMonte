// Dependencies
import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

// Components
import Button from 'Components/commons/Button'
import DataTable from 'Components/commons/DataTable'
// Context
import TicketsContext from 'Context/Tickets/index'
// Utils
import { formatDate } from 'SharedUtils/Utils'

library.add(faAngleLeft)

// Flow Props and Stats
type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  customHandlers: Array<mixed>,
  handleBack: void
}

class DetailTickets extends Component<Props> {
  static contextType = TicketsContext

  render() {
    const ticketsConsumer = this.context
    const { columns, data, customHandlers, handleBack } = this.props
    const {
      folio,
      descripcion,
      sucursal,
      tipoContrato
    } = ticketsConsumer.ticketDetail

    const { fechaIngreso, fechaLimitePago } = ticketsConsumer.ticketConditions

    return (
      <Fragment>
        <Row className="tickets-next-to-beat-message">
          <Col md={10}>
            <h4>
              <small>{`Boleta ${folio}`}</small>
            </h4>
          </Col>
          <Col md={2}>
            <Button
              variant="info"
              label="Regresar a boletas"
              onClick={handleBack}
              icon={<FontAwesomeIcon icon={faAngleLeft} />}
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <p>
              Prenda
              <br />
              <small>{descripcion}</small>
            </p>
            <p>
              Fecha de empeño
              <br />
              <small>
                {fechaIngreso && formatDate(fechaIngreso, 'MMM Do YY')}
              </small>
            </p>
            <p>
              Tipo de empeño
              <br />
              <small>{tipoContrato}</small>
            </p>
            <p>
              Fecha límite de pago
              <br />
              {fechaLimitePago && formatDate(fechaLimitePago, 'MMM Do YY')}
            </p>
            <p>
              Sucursal
              <br />
              <small>{sucursal}</small>
            </p>
          </Col>
          <Col md={{ md: 6, offset: 1 }}>
            <h6>Historial de pagos - Refrendos, Desempeño y/o Abonos</h6>
            <DataTable
              columns={columns}
              data={data}
              noDataIndication="No existen operaciones"
              customHandlers={customHandlers}
            />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default DetailTickets
