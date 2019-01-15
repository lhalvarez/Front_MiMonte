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
  customHandlers: Array<mixed>,
  handleBack: void,
  activeItem: Array<Object>,
  movimientos: Array<Object>,
  handleBlur: void,
  handleRadio: void,
  handleAdd: void
}

class DetailTickets extends Component<Props> {
  static contextType = TicketsContext

  render() {
    const ticketsConsumer = this.context
    const {
      columns,
      customHandlers,
      handleBack,
      activeItem,
      handleBlur,
      handleRadio,
      handleAdd,
      movimientos
    } = this.props
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
          <Col md={6}>
            <h4>
              <small>{`Boleta ${folio}`}</small>
            </h4>
          </Col>
          <Col md={6} className="text-right">
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
            <Row>
              <Col>
                <p className="encabezadoTabla">Paga tu boleta en línea</p>
                <DataTable
                  columns={columns.ActiveItem}
                  data={activeItem}
                  noDataIndication="No cuentas con boletas activas"
                  handleBlur={handleBlur}
                  handleRadio={handleRadio}
                />
              </Col>
              <Col md={8}>
                <p className="text-muted">
                  El refrendo solo se puede realizar en los 5 días naturales
                  antes de la fecha de comercialización
                </p>
              </Col>
              <Col md={4}>
                <Button name="add" label="Agregar" block onClick={handleAdd} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p className="encabezadoTabla">
                  Historial de pagos - Refrendos, Desempeño y/o Abonos
                </p>
                <DataTable
                  columns={columns.Detail}
                  data={movimientos}
                  noDataIndication="No existen operaciones"
                  customHandlers={customHandlers}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={1} />
        </Row>
      </Fragment>
    )
  }
}

export default DetailTickets
