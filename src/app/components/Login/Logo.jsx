// Dependencies
import React from 'react'
import { Col, Row } from 'react-bootstrap'
// Components
import Button from 'Components/commons/Button'
// Images
import logo from 'SharedImages/nmp-logo-blanco.svg'
// Flow Props and State
type Props = {
  styles: Object,
  handleClick: any
}

function Logo(props: Props) {
  const { handleClick, styles } = props
  return (
    <div
      className={`${styles.main_Panel__Table} ${
        styles.gradiente
      } gradiente text-center text-light`}
    >
      <Row>
        <Col xs={12} className={styles.logo_Padding}>
          <img className={styles.logo} alt="logo-monte" src={logo} />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className={`${styles.main_Panel__Content} ${styles.texto} ${
            styles.title
          }`}
        >
          Mi Monte
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className={`${styles.main_Panel__Content} ${styles.texto} ${
            styles.subtitle
          }`}
        >
          Fácil · Seguro · A tu alcance
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className={`${styles.main_Panel__Content} ${styles.texto}`}
        >
          Todo Nacional Monte de Piedad a tu alcance, con Mi Monte podrás tener
          tu tarjeta siempre contigo, conocer tu nivel de cliente, estado de
          cuenta y fechas próximas de pago.
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="transparent"
            label="< Regresar al sitio de Nacional Monte de Piedad"
            size="md"
            className={`${styles.button_Fixed_Left} ${styles.align_buttom}`}
            onClick={handleClick}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Logo
