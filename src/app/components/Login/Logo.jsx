// Dependencies
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
// Components
import Button from 'Components/commons/Button'
// Images
import logo from 'SharedImages/nmp-logo-blanco.png'
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
          <img className={styles.logo} alt="" src={logo} />
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
          Fácil · Seguro · Siempre disponible
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className={`${styles.main_Panel__Content} ${styles.texto}`}
        >
          Mi Monte es el portal en donde podrás consultar el estado de tus
          prendas, pagar tus boletas. Para disfrutar de este portal sólo
          necesitas ser cliente de Nacional Monte de Piedad.
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="transparent"
            label="< Regresar al sitio de Nacional Monte de Piedad"
            size="lg"
            className={`${styles.button_Fixed_Left} align-buttom`}
            onClick={handleClick}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Logo
