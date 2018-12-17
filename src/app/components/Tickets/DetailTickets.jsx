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
import { formatDate, capitalize } from 'SharedUtils/Utils'

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
        <Row className="tickets-next-to-beat-message border-bottom pb-2 pt-1 mx-0">
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
          <Col md={4} className="backgroundLigthGray ml-3 pt-4">
            <p className="subtitle">
              Prenda
              <br />
              <small>{capitalize(descripcion.toLowerCase())}</small>
            </p>
            <p className="subtitle">
              Fecha de empeño
              <br />
              <small className="text-capitalize">
                {fechaIngreso && formatDate(fechaIngreso, 'DD MMMM YYYY')}
              </small>
            </p>
            <p className="subtitle">
              Tipo de empeño
              <br />
              <small>{tipoContrato}</small>
            </p>
            <p className="subtitle">
              Fecha límite de pago
              <br />
              <small className="text-capitalize">
                {fechaLimitePago &&
                  formatDate(fechaLimitePago, ' DD MMMM YYYY')}
              </small>
            </p>
            <p className="subtitle">
              Sucursal
              <br />
              <small>{sucursal}</small>
            </p>
          </Col>
          <Col md={{ xs: 7, offset: 1 }} className="pt-4">
            <p className="encabezadoTabla">
              Historial de pagos - Refrendos, Desempeño y/o Abonos
            </p>
            <DataTable
              columns={columns}
              data={data}
              noDataIndication="No existen operaciones"
              customHandlers={customHandlers}
            />
          </Col>
          <Col xs={1} />
        </Row>
      </Fragment>
    )
  }
}

export default DetailTickets
