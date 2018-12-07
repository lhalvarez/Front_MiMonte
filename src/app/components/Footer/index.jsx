// Dependencies
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <p className="red-normal">Horario de operación</p>
            <p className="small-grey">
              Para garantizar que nuestros sistemas se encuentren siempre en
              línea los horarios de operación son:
            </p>
            <p className="normal-gray">
              Consulta de boletas: lunes a viernes 5:00 a 21:00 hrs
              <br />
              Pago en línea: lunes a viernes 5:00 a 5:00 a 21:00 hrs
            </p>
          </Col>
          <Col md={3}>
            <p className="red-normal">¿Necesitas ayuda?</p>
            <p className="telefono">01 800 EL MONTE (01 800 35 666 83)</p>
            <p className="small-grey">
              Lunes a viernes de 8:00 a 20:00 horas
              <br />
              Sábados de 8:00 a 16:00 horas
            </p>
            <p className="red-normal">servicioaclientes@montepiedad.com.mx</p>
          </Col>
          <Col md={3}>
            <p className="red-normal">Nacional Monte de Piedad I.A.P.</p>
            <p className="small-grey">
              Av. Paseo de la Reforma No. 355, Col. Cuauhtémoc, C.P. 06500,
              Ciudad de México
            </p>
            <p className="small-grey">Derechos reservados 2018</p>
          </Col>
          <Col md={2}>
            <p className="red-normal">Facturación electrónica</p>
            <p className="red-normal">Aviso de privacidad</p>
            <p className="red-normal">Términos y condiciones</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
