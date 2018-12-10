/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container } from 'react-bootstrap'
// Components
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
// Flow Props and State
type Props = {
  form: Object,
  validate: string,
  handleChange: any,
  handleModalLogin: any,
  styles: Object
}

function ForgotPwd(props: Props) {
  const { form, validate, handleChange, styles, handleModalLogin } = props

  return (
    <Container>
      <Col>
        <div className={styles.main_Panel__Table}>
          <div className={styles.main_Panel__Table_Cell}>
            <div className={styles.main_Panel__Content}>
              <h2 className={styles.main_Panel__Heading}>
                Recuperar contraseña
              </h2>
              <p className={styles.textoNormal}>
                Recupera tu contraseña ingresando el correo electrónico que
                registraste como usuario y te enviaremos un SMS con tu código de
                desbloqueo al celular que proporcionaste en tu registro.
              </p>
              <TextInput
                name="usuario"
                placeholder="Correo electrónico"
                value={form.usuario}
                label="Correo electrónico"
                type="text"
                required
                error={validate}
                maxLength={50}
                onChange={handleChange}
              />
              <Button
                variant="primary"
                label="Ingresar"
                size="lg"
                className="float-right"
                onClick={() => handleModalLogin(3)}
              />
              <a href="#" onClick={() => handleModalLogin(1)}>
                Regresar a inicio de sesión
              </a>
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
        </div>
      </Col>
    </Container>
  )
}

export default ForgotPwd
