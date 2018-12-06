// Dependencies
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'Components/commons/Button'

// Flow Props and Stats
type Props = {
  style: Object,
  form: Object,
  goToStep4: void,
  disableStep4: boolean
}

function Step4(props: Props) {
  const { style, form, disableStep4, goToStep4 } = props
  return (
    <fieldset disabled={disableStep4}>
      <Row>
        <Col xs={12}>
          <h3>Paso 4: Activa tu cuenta</h3>
          <p className={`${style.textMain} text-center`}>
            Tu cuenta ha sido creada, para activarla accede tu correo:
            <br />
            <span className={style.colorPrimary}>
              {form.email}
              <br />
            </span>
            Y haz click en la liga que te hemos enviado.
          </p>
          <p className={style.textInfo}>
            Si no recibiste la liga presiona reenviar, no olvides revisar la
            carpeta de spam. En caso de que no tengas acceso a este correo
            comunicate al número de atención 01 800 35 666 83
          </p>
        </Col>
        <Col className="text-right">
          <Button
            variant="info"
            label="Reenviar email"
            onClick={() => goToStep4('email')}
          />
        </Col>
      </Row>
    </fieldset>
  )
}

export default Step4
