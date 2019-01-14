/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { Fragment } from 'react'
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
  handleClick: any,
  handleModalLogin: any,
  styles: Object
}

function Form(props: Props) {
  const {
    form,
    validate,
    handleChange,
    handleClick,
    styles,
    handleModalLogin
  } = props

  return (
    <Fragment>
      <Container>
        <Col>
          <div className={styles.main_Panel__Table}>
            <div className={styles.main_Panel__Table_Cell}>
              <div className={styles.main_Panel__Content}>
                <h2 className={styles.main_Panel__Heading}>Iniciar sesión</h2>
                <TextInput
                  name="username"
                  placeholder="Correo electrónico"
                  value={form.username}
                  label="Correo"
                  type="text"
                  required
                  error={validate}
                  maxLength={50}
                  onChange={handleChange}
                />
                <TextInput
                  name="password"
                  placeholder="Contraseña"
                  value={form.password}
                  label="Contraseña"
                  type="password"
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
                  onClick={handleClick}
                />
                <a href="#" onClick={() => handleModalLogin(2)}>
                  ¿Olvidaste tu contraseña?
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
    </Fragment>
  )
}

export default Form
