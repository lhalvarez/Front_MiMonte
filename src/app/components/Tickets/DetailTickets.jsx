// Dependencies
import React, { Component, Fragment } from 'react'
import { Row, Col, ButtonGroup } from 'react-bootstrap'
// Components
import Button from 'Components/commons/Button'
import DataTable from 'Components/commons/DataTable'
// Context
import TicketsContext from 'Context/Tickets/index'
// Utils
import { formatDate } from 'SharedUtils/Utils'
// Images
import IconoDetails from 'SharedImages/ico-hoja-papel-plus-120.png'
// Flow Props and Stats
type Props = {
  columns: Array<Object>,
  data: Array<Object>
}

class DetailTickets extends Component<Props> {
  static contextType = TicketsContext

  render() {
    const ticketsConsumer = this.context
    const { columns, data } = this.props
    const {
      folio,
      descripcion,
      sucursal,
      tipoContrato
    } = ticketsConsumer.ticketDetail
    const {
      fechaIngreso,
      fechaLimitePago,
      fechaComercializacion,
      fechaIngresoDeposito
    } = ticketsConsumer.ticketConditions

    return (
      <Fragment>
        <Row className="tickets-next-to-beat-message">
          <Col md={10}>
            <h4>
              <small>{`Boleta ${folio}`}</small>
            </h4>
          </Col>
          <Col md={2}>Regresar a boletas</Col>
        </Row>
        <hr />
        <Row>
          <Col md={3}>
            <img
              className="float-right"
              alt="Icono de boletas"
              src={IconoDetails}
            />
          </Col>
          <Col md={5}>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>Prenda</div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>{descripcion}</div>
            </Row>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>
                Sucursal
              </div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>{sucursal}</div>
            </Row>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>
                Tipo de empeño
              </div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                {tipoContrato}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>
                Fecha de empeño
              </div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                {fechaIngreso && formatDate(fechaIngreso, 'MMM Do YY')}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>
                Fecha límite de pago
              </div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                {fechaLimitePago && formatDate(fechaLimitePago, 'MMM Do YY')}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>
                Fecha de comercialización
              </div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                {fechaComercializacion &&
                  formatDate(fechaComercializacion, 'MM Do YY')}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#99283b', padding: '0 10px' }}>
                Fecha de ingreso a depósito
              </div>
            </Row>
            <Row>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                {fechaIngresoDeposito &&
                  formatDate(fechaIngresoDeposito, 'MM Do YY')}
              </div>
            </Row>
          </Col>
          <Col md={4}>
            <Row>Operaciones</Row>
            <DataTable
              columns={columns}
              data={data}
              noDataIndication="No existen operaciones"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="primary" label="Visualizar" size="md" />
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="Second group">
            <Button variant="primary" label="Descargar" size="md" />
          </ButtonGroup>
        </Row>
      </Fragment>
    )
  }
}

export default DetailTickets
