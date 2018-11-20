// dependencies
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
// styles
import './Register.less'

function Step3() {
  return (
    <Fragment>
      <Row>
        <Col>
          <h3>Paso 3: Crea contraseña</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <TextInput
                name="pwd"
                value=""
                label="Crear contraseña"
                type="text"
              />
            </Col>
            <Col>
              <TextInput
                name="confirmPwd"
                value=""
                label="Confirma la contraseña"
                type="text"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <p className="textInfo">
            Tu contraseña debe tener una longitud de 8 caractéres no
            consecutivos y sin espacios. Deberá contener por lo menos una letra
            en mayúscula, un número y a alguno de los siguientes caracteres
            especiales: *, @, $, %, &, ?, ¿, etc.
          </p>
        </Col>
        <Col xs={12} className="text-right">
          <Button variant="primary" label="Crear" />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Step3
