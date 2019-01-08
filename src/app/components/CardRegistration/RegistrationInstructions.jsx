import React from 'react'
import { Row, Col } from 'react-bootstrap'

import OpenPayInfo from 'Components/CardRegistration/OpenPayInfo'

import iconTarjetas from 'SharedImages/icon-tarjetas.svg'

type Props = {
  styles: Object
}

function RegistrationInstructions(props: Props) {
  const { styles } = props
  return (
    <div className={styles.registro_tarjetas}>
      <Row>
        <Col>
          <img
            src={iconTarjetas}
            className="img-fluid d-block mx-auto"
            alt="icono-tarjetas"
          />
          <p className={styles.p_advice}>
            Aún no cuentas con métodos de pago
            <br />
            <small className={styles.p_advice_small}>
              Utiliza el formulario de la derecha para registrarlos para poder
              pagar con rapidez y seguridad.
            </small>
          </p>
        </Col>
      </Row>
      <OpenPayInfo styles={styles} />
    </div>
  )
}

export default RegistrationInstructions
