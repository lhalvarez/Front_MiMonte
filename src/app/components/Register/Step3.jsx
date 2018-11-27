// Dependencies
import React from 'react'
import { Row, Col } from 'react-bootstrap'
// Components
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
// Flow Props and Stats
type Props = {
  style: Object,
  validationObj: Object,
  form: Object,
  handleChangeInput: void,
  disableStep3: boolean
}

function Step3(props: Props) {
  const { style, validationObj, form, handleChangeInput, disableStep3 } = props

  return (
    <fieldset disabled={disableStep3}>
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
                value={form.pwd}
                label="Crear contraseña"
                type="pwd"
                validity={validationObj.validatePwd}
                textInvalid={validationObj.textInvalidPwd}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              <TextInput
                name="confPwd"
                value={form.confPwd}
                label="Confirma la contraseña"
                type="pwd"
                validity={validationObj.validateConfPwd}
                textInvalid={validationObj.textInvalidConfPwd}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <p className={style.textInfo}>
            Tu contraseña debe tener una longitud de 8 caractéres no
            consecutivos y sin espacios. Deberá contener por lo menos una letra
            en mayúscula, un número y a alguno de los siguientes caracteres
            especiales: *, @, $, %, &, ?, ¿, -, _, ., etc.
          </p>
        </Col>
        <Col xs={12} className="text-right">
          <Button variant="primary" label="Crear" />
        </Col>
      </Row>
    </fieldset>
  )
}

export default Step3
