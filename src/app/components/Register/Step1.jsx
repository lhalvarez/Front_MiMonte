// dependencies
import React, { Fragment } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
// styles
import './Register.less'

type Props = {
  form: Object,
  validate: boolean,
  textInvalidEmail: string,
  textInvalidEmailConf: string,
  textInvalidCelular: string,
  textInvalidCelularConf: string,
  handleChangeInput: void,
  handleValidateForm: void
}

function Step1(props: Props) {
  const {
    form,
    validate,
    handleChangeInput,
    handleValidateForm,
    textInvalidEmail,
    textInvalidEmailConf,
    textInvalidCelular,
    textInvalidCelularConf
  } = props
  return (
    <Fragment>
      <Col>
        <h3>Paso 1: Ingresa tus datos</h3>
        <p className="textMain">
          Para registrarte es necesario que tengas a la mano tu Tarjeta Monte,
          un correo eléctronico y un número celular activo.
        </p>
        <p className="textInfo">
          Por favor verifica que toda la información coincida con la de tu
          boleta de empeño.
        </p>
        <Form>
          <Row>
            <Col>
              <TextInput
                name="name"
                value={form.name}
                label="Nombre(s)"
                type="text"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                name="apPat"
                value={form.apPat}
                label="Apellido Paterno"
                type="text"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              <TextInput
                name="apMat"
                value={form.apMat}
                label="Apellido Materno"
                type="text"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                name="fecNac"
                value={form.fecNac}
                label="Fecha de Nacimiento"
                type="text"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              <TextInput
                name="tarjeta"
                value={form.tarjeta}
                label="Número de Tarjeta Monte"
                type="number"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="textInfo">
                Este correo servira como tu usuario, asegurate de tener acceso a
                el ya que no podrás modificarlo posteriormente.
              </p>
            </Col>
            <Col>
              <TextInput
                name="user"
                value={form.user}
                label="Correo Electrónico"
                type="email"
                required
                error={validate}
                textInvalid={textInvalidEmail}
                maxLength={250}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              <TextInput
                name="confUser"
                value={form.confUser}
                label="Confirma tu correo electrónico"
                type="email"
                required
                error={validate}
                textInvalid={textInvalidEmailConf}
                maxLength={250}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="textInfo">
                Utilizaremos tu número celular para dar de alta tu cuenta así
                como enviarte notificaciones y promociones.
              </p>
            </Col>
            <Col>
              <TextInput
                name="celular"
                value={form.celular}
                label="Número de celular a 10 dígitos"
                type="text"
                required
                error={validate}
                textInvalid={textInvalidCelularConf}
                maxLength={10}
                minLength={10}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              <TextInput
                name="confCel"
                value={form.confCel}
                label="Confirma tu número de Celular"
                type="text"
                required
                error={validate}
                textInvalid={textInvalidCelular}
                maxLength={10}
                minLength={10}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8} className="termsLink align-middle">
              <Form.Group>
                <Form.Check
                  name="terms"
                  value={form.terms}
                  label="He leído y acepto el "
                  id="terms"
                  required
                  onChange={handleChangeInput}
                />
              </Form.Group>
              <p>
                <a href="www.google.com">&nbsp;Aviso de Privacidad</a>
              </p>
            </Col>
            <Col xs={4} className="text-right">
              <Button
                variant="primary"
                label="Verificar Datos"
                onClick={handleValidateForm}
              />
            </Col>
          </Row>
        </Form>
      </Col>
    </Fragment>
  )
}

export default Step1
