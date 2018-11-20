// Dependencies
import React from 'react'
import Container from 'react-bootstrap/lib/Container'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

function Footer() {
  return (
    <Container fluid className="container-footer">
      <footer className="footer container">
        <Row>
          <Col md={6}>
            <p>
              01 800 EL MONTE (01 800 35 666 83)
              <br />
              <small>
                Lunes a Viernes de 8:00 a 20:00 y sábados de 8:00 a 16:00
              </small>
            </p>
          </Col>
          <Col md={6}>
            <p>
              Horarios de Sucursales
              <br />
              <small>
                8:30 a 14:30 y de 15:30 a 17:45 horas y sábados de 08:30 a 13:00
                horas
              </small>
            </p>
          </Col>
        </Row>
      </footer>
    </Container>
  )
}

export default Footer
