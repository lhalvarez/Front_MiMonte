import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

function PaymentDetail() {
  return (
    <Fragment>
      <Row>
        <Col>
          <span>Operación</span>
        </Col>
        <Col>
          <span>Monto</span>
        </Col>
        <Col>
          <span>Fecha de pago</span>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PaymentDetail
