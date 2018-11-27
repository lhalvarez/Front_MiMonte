// Dependencies
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'Components/commons/Button'
import CodeVerify from './codeVerify'

// styles
import './Register.less'

type Props = {
  style: Object,
  form: Object,
  handleChangeCodeVerify: void,
  disableStep2: boolean
}

function Step2(props: Props) {
  const { style, handleChangeCodeVerify, form, disableStep2 } = props
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
        <Col className="text-left">
          <Button variant="info" label="Reenviar" />
        </Col>
        <Col className="text-right">
          <Button variant="primary" label="Confirmar" />
        </Col>
      </Row>
    </fieldset>
  )
}

export default Step2
