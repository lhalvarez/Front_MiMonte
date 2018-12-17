import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import logoTiendaMonte from 'SharedImages/icono-tienda-monte.png'

import './Home.less'

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
        <div className="promotional-actioner text-center">
          <img
            src={logoTiendaMonte}
            className="img-fluid d-block mx-auto"
            alt="icono-tienda-monte"
          />
          <h4 className="text-center">
            Compra sin salir de casa en Tienda Monte en Línea
          </h4>
          <Button
            variant="info"
            href="https://tienda.montepiedad.com.mx/"
            className=""
          >
            Ir a la tienda
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default PromotionalBanner
