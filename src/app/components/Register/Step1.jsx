// Dependencies
import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
// Components
import TextInput from 'Components/commons/TextInput'
import Checkbox from 'Components/commons/Checkbox'
import Button from 'Components/commons/Button'
// Flow Props and Stats
type Props = {
  style: Object,
  form: Object,
  validate: boolean,
  validationObj: Object,
  handleChangeInput: void,
  handleValidateForm: void,
  handleBlur: void,
  disableStep1: boolean
}

function Step1(props: Props) {
  const {
    style,
    form,
    validate,
    validationObj,
    handleValidateForm,
    handleChangeInput,
    handleBlur,
    disableStep1
  } = props
  return (
    <fieldset disabled={disableStep1}>
      <Col>
        <h3>Paso 1: Ingresa tus datos</h3>
        <p className={style.textMain}>
          Para registrarte es necesario que tengas a la mano tu Tarjeta Monte,
          un correo eléctronico y un número celular activo.
        </p>
        <p className={style.textInfo}>
          Por favor verifica que toda la información coincida con la de tu
          boleta de empeño.
        </p>
        <Form>
          <Row>
            <Col>
              <TextInput
                name="nombre"
                value={form.nombre}
                label="Nombre(s)"
                type="text"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
                uppercase
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
                uppercase
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
                uppercase
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                name="fecNac"
                value={form.fecNac}
                label="Fecha de Nacimiento"
                type="date"
                required
                error={validate}
                maxLength={50}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              <TextInput
                name="tarjeta"
                className={style.inputNumber}
                value={form.tarjeta}
                label="Número de Tarjeta Monte"
                type="text"
                required
                error={validate}
                maxLength={16}
                minLength={16}
                onChange={handleChangeInput}
                handleBlur={handleBlur}
                number
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className={style.textInfo}>
                Este correo servira como tu usuario, asegurate de tener acceso a
                el ya que no podrás modificarlo posteriormente.
              </p>
            </Col>
            <Col>
              <TextInput
                name="email"
                value={form.email}
                label="Correo Electrónico"
                type="email"
                pattern="/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}
                  [a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
                required
                validity={validationObj.validateEmail}
                textInvalid={validationObj.textInvalidEmail}
                onChange={handleChangeInput}
                lowercase
              />
            </Col>
            <Col>
              <TextInput
                name="confEmail"
                value={form.confEmail}
                label="Confirma tu correo electrónico"
                type="email"
                required
                pattern="/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}
                  [a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
                validity={validationObj.validateConfEmail}
                textInvalid={validationObj.textInvalidEmailConf}
                onChange={handleChangeInput}
                lowercase
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className={style.textInfo}>
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
                maxLength={10}
                required
                validity={validationObj.validateCelular}
                textInvalid={validationObj.textInvalidCelular}
                onChange={handleChangeInput}
                number
              />
            </Col>
            <Col>
              <TextInput
                name="confCel"
                value={form.confCel}
                label="Confirma tu número de Celular"
                type="text"
                maxLength={10}
                required
                validity={validationObj.validateConfCel}
                textInvalid={validationObj.textInvalidConfCel}
                onChange={handleChangeInput}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8} className={`${style.termsLink} align-middle`}>
              <Checkbox
                name="aviso"
                id="aviso"
                type="checkbox"
                value={form.aviso}
                label="He leído y acepto el "
                required
                error={validate}
                onChange={handleChangeInput}
              />
              <p>
                <a className={style.a} href="www.google.com">
                  &nbsp;Aviso de Privacidad
                </a>
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
    </fieldset>
  )
}

export default Step1
