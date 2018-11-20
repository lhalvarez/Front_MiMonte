// dependencies
import React, { Fragment } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'

import logo from 'SharedImages/logo-NMP.png'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
// styles
import './Register.less'

type Props = {
  form: Object,
  validate: string,
  textInvalidEmail: string,
  textInvalidEmailConf: string,
  textInvalidCelular: string,
  textInvalidCelularConf: string,
  handleChangeInput: void,
  handleValid: void
}

function Register(props: Props) {
  return (
    <Fragment>
      <div className="gradiente position-absolute" />
      <Container className="container-header">
        <Row className="main-header">
          <Col xs={6}>
            <img src={logo} alt="" className="logo" />
          </Col>
          <Col xs={6} className="text-right">
            Teléfonos etc
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <h2>Registro</h2>
        </Row>
        <Row>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <Step1 {...props} />
                </Col>
                <Col xs={12} md={6}>
                  <Row>
                    <Col xs={1} />
                    <Col xs={10}>
                      <Step2 />
                      <hr className="colorPrimary" />
                      <Step3 />
                      <hr className="colorPrimary" />
                      <Step4 />
                    </Col>
                    <Col xs={1} />
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Register
