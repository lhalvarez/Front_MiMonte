import React from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/lib/Col'
import Container from 'react-bootstrap/lib/Container'
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
// Flow Props and State
type Props = {
  form: Object,
  validate: string,
  handleChange: any,
  handleClick: any,
  styles: Object
}

function Form(props: Props) {
  const { form, validate, handleChange, handleClick, styles } = props

  return (
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
                block
              />
              <Link to="/registro">Registarme</Link>
            </div>
          </div>
        </div>
      </Col>
    </Container>
  )
}

export default Form
