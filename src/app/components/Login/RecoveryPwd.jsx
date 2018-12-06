/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
// Components
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
import CodeVerify from 'Components/commons/CodeVerify'
// Flow Props and State
type Props = {
  form: Object,
  handleChange: any,
  handleModalLogin: any,
  handleChangeCodeVerify: any,
  styles: Object,
  validationObj: Object
}

function RecoveryPwd(props: Props) {
  const {
    form,
    validationObj,
    handleChange,
    styles,
    handleModalLogin,
    handleChangeCodeVerify
  } = props

  return (
    <Container>
      <Col>
        <div className={styles.main_Panel__Table}>
          <div className={styles.main_Panel__Content}>
            <h2 className={styles.main_Panel__Heading}>
              Crear nueva contraseña
            </h2>
            <p className={styles.textoNormal}>
              Ingresa el código que se te envió en un SMS al teléfono con
              terminación ** **** &nbsp;
              {form.telefono}.
            </p>
            <Row>
              <Col className={styles.codeVerify}>
                <CodeVerify handleChangeCodeVerify={handleChangeCodeVerify} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TextInput
                  name="pwd"
                  value={form.pwd}
                  label="Crear contraseña"
                  type="password"
                  validity={validationObj.validatePwd}
                  textInvalid={validationObj.textInvalidPwd}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={12}>
                <TextInput
                  name="confPwd"
                  value={form.confPwd}
                  label="Confirma la contraseña"
                  type="password"
                  validity={validationObj.validateConfPwd}
                  textInvalid={validationObj.textInvalidConfPwd}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={12}>
                <p className={styles.textInfo}>
                  Tu contraseña debe tener una longitud de 8 caractéres no
                  consecutivos y sin espacios. Deberá contener por lo menos una
                  letra en mayúscula, un número y a alguno de los siguientes
                  caracteres especiales: *, @, $, %, &, ?, ¿, -, _, ., etc.
                </p>
              </Col>
              <Col xs={6} className="text-left">
                <a
                  href="#"
                  className="text-left"
                  onClick={() => handleModalLogin(1)}
                >
                  Regresar a iniciar sesión
                </a>
              </Col>
              <Col xs={6} className="text-right">
                <Button
                  variant="primary"
                  label="Enviar"
                  onClick={() => handleModalLogin(4)}
                />
              </Col>
            </Row>
          </div>
          <div className={styles.fixed_bottom}>
            <p className={styles.textoNormal}>
              ¿Aún no tienes cuenta? Si ya eres cliente &nbsp;
              <Link to="/registro">Crea tu cuenta</Link>
            </p>
            <p className={styles.textoNormal}>
              Si aún no eres cliente&nbsp;
              <a href="https://www.montepiedad.com.mx/portal/preregistro.html">
                Pre - regístrate
              </a>
            </p>
            <p className={styles.textoTelefono}>
              Teléfono de atención 01 800 EL MONTE (01 800 35 666 83)
            </p>
          </div>
        </div>
      </Col>
    </Container>
  )
}

export default RecoveryPwd
