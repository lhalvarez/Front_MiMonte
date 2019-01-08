import React from 'react'
import { Row, Col } from 'react-bootstrap'

import logoOpenpay from 'SharedImages/logo-openpay.png'
import iconoEscudo from 'SharedImages/icono-escudo.svg'

type Props = {
  styles: Object
}

function OpenPayInfo(props: Props) {
  const { styles } = props
  return (
    <Row className={styles.row_transactions}>
      <Col md={6}>
        <p className={styles.p_transactions}>
          Transacciones realizadas vía:
          <br />
          <img
            src={logoOpenpay}
            className="img-fluid d-block mx-auto"
            alt="logo-openpay"
          />
        </p>
      </Col>
      <Col md={2} className="pl-0">
        <img
          src={iconoEscudo}
          className={`${
            styles.image_encrypt
          } img-fluid d-block mx-auto w-100 align-middle`}
          alt="icono-escudo"
        />
      </Col>
      <Col md={4} className="pl-0">
        <p className={styles.p_encrypt}>
          Tus pagos se realizan de forma segura con encriptación 256 bits
        </p>
      </Col>
    </Row>
  )
}

export default OpenPayInfo
