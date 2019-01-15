// Dependencies
import React, { Fragment } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import Button from 'Components/commons/Button'
import Footer from 'Components/Footer'

// Images
import logo from 'SharedImages/logo-NMP.png'
import pending from 'SharedImages/pending.svg'
import success from 'SharedImages/success.svg'
import error from 'SharedImages/error.svg'

// Styles
import style from './Activate.less'
// Flow Props and Stats
type Props = {
  goToInicio: void,
  gotRetryActivation: void,
  message: String,
  status: String
}

function RegisterActive(props: Props) {
  const { goToInicio, gotRetryActivation, status, message } = props
  const containerRegister = (img, text, typeStatus, retryActivation) => (
    <Row>
      <Col xs={3} className={`${style.panelLeft} text-center`}>
        <img src={img} alt="" className={`img-fluid ${style.mImg}`} />
      </Col>
      {typeStatus === 'pending' ? (
        <Fragment>
          <Col xs={9} className="panel-right">
            <div className={`${style.contentRegister}`}>
              <Col xs={12}>
                <p className={`h1 ${style.mText}`}>Activando cuenta</p>
                <p className={`h2 ${style.mText}`}>{text}</p>
              </Col>
            </div>
          </Col>
        </Fragment>
      ) : (
        ''
      )}
      {typeStatus === 'error' ? (
        <Fragment>
          <Col xs={9} className="panel-right">
            <div className={`${style.contentRegister}`}>
              <Col xs={12}>
                <p className={`h3 ${style.mText}`}>Activando cuenta</p>
                <p className={`h1 ${style.mText}`}>{text}</p>
                <p className={`${style.mTextSucess}`}>
                  Por el momento el servicio no se encuentra disponible.
                  Inténtalo más tarde
                </p>
                <Button
                  variant="primary"
                  label="Recargar de nuevo"
                  className={`${style.add_button} ${style.mBtnSucess}`}
                  id="pay-button"
                  onClick={retryActivation}
                  // onClick={handleClickAdd}
                />
              </Col>
            </div>
          </Col>
        </Fragment>
      ) : (
        ''
      )}
      {typeStatus === 'success' ? (
        <Fragment>
          <Col xs={9} className="panel-right">
            <div className={`${style.contentRegister}`}>
              <Col xs={12}>
                <p className={`h3 ${style.mText}`}>Activando cuenta</p>
                <p className={`h1 ${style.mText}`}>{text}</p>
                <p className={`${style.mTextSucess}`}>
                  Gracias por ser parte de Nacional Monte de Piedad, ahora
                  puedes tener a tu alcance tu estado de cuenta y fechas
                  próximas de pago.
                </p>
                <Button
                  variant="primary"
                  label="Iniciar sesión"
                  className={`${style.add_button} ${style.mBtnSucess}`}
                  id="pay-button"
                  onClick={goToInicio}
                />
              </Col>
            </div>
          </Col>
        </Fragment>
      ) : (
        ''
      )}
    </Row>
  )
  return (
    <Fragment>
      <div className={`${style.gradiente} gradiente position-absolute`} />
      <Container className={`${style.registro} container-header`}>
        <Row className="main-header">
          <Col xs={6} className="text-left">
            <img src={logo} alt="" className="img-fluid ml-5" />
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
            <h2 className={`${style.h2} ml-4`}>Registro</h2>
          </Col>
          <Col xs={6} className={`${style.btnInicio} text-right`}>
            <Button variant="transparent" label="Inicio" onClick={goToInicio} />
          </Col>
        </Row>
        <Row>
          <Card className={style.card}>
            <Card.Body className={`${style.ssCard}`}>
              {status === 'pending'
                ? containerRegister(pending, message, status)
                : ''}
              {status === 'success'
                ? containerRegister(success, message, status)
                : ''}
              {status === 'error'
                ? containerRegister(error, message, status, gotRetryActivation)
                : ''}
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  )
}

export default RegisterActive
