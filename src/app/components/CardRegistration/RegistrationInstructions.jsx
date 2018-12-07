import React from 'react'
import { Row, Col } from 'react-bootstrap'

import iconTarjetas from 'SharedImages/icon-tarjetas.png'
import logoOpenpay from 'SharedImages/logo-openpay.png'
import iconoEscudo from 'SharedImages/icono-escudo.png'

import Styles from './RegistrationForm.less'

function RegistrationInstructios() {
  return (
    <div className={Styles.registro_tarjetas}>
      <Row>
        <Col>
          <img
            src={iconTarjetas}
            className="img-fluid d-block mx-auto"
            alt="icono-tarjetas"
          />
          <p className={Styles.p_advice}>
            Aún no cuentas con métodos de pago
            <br />
            <small className={Styles.p_advice_small}>
              Utiliza el formulario de la derecha para registrarlos y poder
              pagar con rapidez y seguridad.
            </small>
          </p>
        </Col>
      </Row>
      <Row className={Styles.row_transactions}>
        <Col md={6}>
          <p className={Styles.p_transactions}>
            Transacciones realizadas vía:
            <br />
            <img
              src={logoOpenpay}
              className="img-fluid d-block mx-auto"
              alt="logo-openpay"
            />
          </p>
        </Col>
        <Col md={2}>
          <img
            src={iconoEscudo}
            className={`${
              Styles.image_encrypt
            } img-fluid d-block mx-auto w-100`}
            alt="icono-escudo"
          />
        </Col>
        <Col md={3}>
          <p className={Styles.p_encrypt}>
            Tus pagos se realizan de forma segura con encriptación 256 bits
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default RegistrationInstructios
