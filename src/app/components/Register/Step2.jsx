// Dependencies
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'Components/commons/Button'
import TextInput from 'Components/commons/TextInput'
import CodeVerify from 'Components/commons/CodeVerify'

// styles
import './Register.less'

type Props = {
  style: Object,
  form: Object,
  handleChangeCodeVerify: void,
  goToStep4: void,
  disableStep2: boolean,
  validationObj: Object,
  handleChangeInput: void
}

function Step2(props: Props) {
  const {
    style,
    handleChangeCodeVerify,
    form,
    disableStep2,
    validationObj,
    handleChangeInput,
    goToStep4
  } = props
  return (
    <fieldset disabled={disableStep2}>
      <Row>
        <Col>
          <h3>Paso 2: Confirma tu celular</h3>
          <p className={style.textMain}>
            Ingresa el código que te hemos enviado al número
            <br />
            <span className={style.colorPrimary}>{form.celular}</span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col className={style.codeVerify}>
          <CodeVerify handleChangeCodeVerify={handleChangeCodeVerify} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p className={`${style.textInfo} text-center`}>
            Si no recibiste el código verifica tu número sea correcto y presiona
            reenviar
          </p>
        </Col>
      </Row>
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
                type="password"
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
                type="password"
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
        <Col xs={6} className="text-left">
          <Button
            variant="info"
            label="Reenviar SMS"
            onClick={() => goToStep4('SMS')}
          />
        </Col>
        <Col xs={6} className="text-right">
          <Button
            variant="primary"
            label="Validar y confirmar"
            onClick={() => goToStep4('altaUsuario')}
          />
        </Col>
      </Row>
    </fieldset>
  )
}

export default Step2
