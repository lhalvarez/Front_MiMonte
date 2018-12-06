// Dependencies
import React, { Fragment } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import Button from 'Components/commons/Button'
import Footer from 'Components/Footer'

// Images
import logo from 'SharedImages/logo-NMP.png'
// Components
import Step1 from 'Components/Register/Step1'
import Step2 from 'Components/Register/Step2'
import Step4 from 'Components/Register/Step4'
// Styles
import style from './Register.less'
// Flow Props and Stats
type Props = {
  form: Object,
  validate: string,
  validationObj: Object,
  handleChangeInput: void,
  handleChangeCodeVerify: void,
  goToInicio: void,
  goToStep4: void,
  handleValidateForm: void,
  disableStep1: boolean,
  disableStep2: boolean,
  disableStep4: boolean
}

function RegisterForm(props: Props) {
  const { goToInicio } = props
  return (
    <Fragment>
      <div className={`${style.gradiente} gradiente position-absolute`} />
      <Container className={`${style.registro} container-header`}>
        <Row className="main-header">
          <Col xs={6}>
            <img src={logo} alt="" className="img-fluid d-block mx-auto" />
          </Col>
          <Col xs={6} className={`text-right align-middle ${style.textMain} `}>
            <p className={`${style.paddingTop10} ${style.verticalCenter}`}>
              ¿Necesitas ayuda?
              <br />
              <span className={style.colorPrimary}>
                01 800 EL MONTE (01 800 35 666 83)
              </span>
            </p>
          </Col>
        </Row>
      </Container>
      <Container className={style.registro}>
        <Row>
          <Col xs={6} className="text-left">
            <h2 className={style.h2}>Registro</h2>
          </Col>
          <Col xs={6} className={`${style.btnInicio} text-right`}>
            <Button variant="transparent" label="Inicio" onClick={goToInicio} />
          </Col>
        </Row>
        <Row>
          <Card className={style.card}>
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <Step1 {...props} style={style} />
                </Col>
                <Col xs={12} md={6}>
                  <Row>
                    <Col xs={1} />
                    <Col xs={10}>
                      <Step2 {...props} style={style} />
                      <hr className={style.colorPrimary} />
                      <Step4 {...props} style={style} />
                    </Col>
                    <Col xs={1} />
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  )
}

export default RegisterForm
