import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
// styles
import './Register.less'

function Step2() {
  return (
    <Fragment>
      <Row>
        <Col>
          <h3>Paso 2: Confirma tu celular</h3>
          <p className="textMain">
            Ingresa el código que te hemos enviado al número
            <br />
            <span className="colorPrimary">55 2558 7648</span>
          </p>
        </Col>
      </Row>
      <Row className="codeVerify">
        <Col />
        <Col>
          <TextInput
            className="colorPrimay"
            name="clave1"
            value=""
            type="text"
          />
        </Col>
        <Col>
          <TextInput
            className="colorPrimay"
            name="clave2"
            value=""
            type="text"
          />
        </Col>
        <Col>
          <TextInput
            className="colorPrimay"
            name="clave3"
            value=""
            type="text"
          />
        </Col>
        <Col>
          <TextInput
            className="colorPrimay"
            name="clave4"
            value=""
            type="text"
          />
        </Col>
        <Col>
          <TextInput
            className="colorPrimay"
            name="clave5"
            value=""
            type="text"
          />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col xs={12}>
          <p className="textInfo text-center">
            Si no recibiste el código verifica tu número sea correcto y presiona
            reenviar
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-left align-middle">
          <p>
            <a href="www.google.com">Reenviar</a>
          </p>
        </Col>
        <Col className="text-right">
          <Button variant="primary" label="Confirmar" />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Step2
