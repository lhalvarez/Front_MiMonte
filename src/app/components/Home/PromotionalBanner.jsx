import React from 'react'
import { Row, Col } from 'react-bootstrap'
import logoTiendaMonte from 'SharedImages/icono-tienda-monte.png'

import './Home.less'

import Button from 'Components/commons/Button'

type Props = {
  /** */
}

// eslint-disable-next-line no-unused-vars
function PromotionalBanner(props: Props) {
  return (
    <Row className="border-box-shadow">
      <Col md={8}>
        <div className="promotional-image" />
      </Col>
      <Col md={4}>
        <div className="promotional-actioner">
          <img
            src={logoTiendaMonte}
            className="img-fluid d-block mx-auto"
            alt="icono-tienda-monte"
          />
          <h4 className="text-center">
            Compra sin salir de casa en Tienda Monte en Línea
          </h4>
          <Button
            variant="default"
            label="Ir a la tienda"
            className="d-block mx-auto"
          />
        </div>
      </Col>
    </Row>
  )
}

export default PromotionalBanner
