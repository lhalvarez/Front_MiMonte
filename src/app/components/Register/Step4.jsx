// dependencies
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
// styles
import './Register.less'

function Step4() {
  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <h3>Paso 4: Activa tu cuenta</h3>
          <p className="textMain text-center">
            Tu cuenta ha sido creada, para activarla accede tu correo:
            <br />
            <span className="colorPrimary">
              fernando.mosqueda@interware.com.mx
              <br />
            </span>
            Y haz click en la liga que te hemos enviado.
          </p>
          <p className="textInfo">
            Si no recibiste la liga presiona reenviar, no olvides revisar la
            carpeta de spam. En caso de que no tengas acceso a este correo
            comunicate al número de atención 01 800 35 666 83
          </p>
        </Col>
        <Col className="text-right align-middle">
          <p>
            <a href="www.google.com">Reenviar</a>
          </p>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Step4
