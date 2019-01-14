/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import logoVisa from 'SharedImages/logo-visa.svg'
import logoMasterCard from 'SharedImages/logo-mastercard-lineal.svg'
import iconCvv from 'SharedImages/icon-cvv.png'

// Components
import TextInput from 'Components/commons/TextInput'

type Props = {
  form: Object,
  styles: any,
  validate: boolean,
  validationObj: Object,
  handleChange: void
}

function OpenPayForm(props: Props) {
  const { form, styles, validate, handleChange, validationObj } = props
  return (
    <Fragment>
      <Row>
        <Col className="mb-2">
          <img src={logoVisa} className={styles.logo_visa} alt="logo-visa" />
          <img src={logoMasterCard} alt="logo-mastercard" />
        </Col>
      </Row>
      <form action="#" method="POST" id="payment-form">
        <Row>
          <Col md={12}>
            <div className="form-group">
              <TextInput
                name="holder_name"
                value={form.holder_name}
                type="text"
                label="Nombre del titular"
                validity={validationObj.validateCardName}
                textInvalid={validationObj.textInvalidCardName}
                placeholder="Como aparece en la tarjeta"
                required
                maxLength={50}
                onChange={handleChange}
                uppercase
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="p-0 mb-2 form-row">
              <Col xs={4}>
                <TextInput
                  name="card_number"
                  value={form.card_number}
                  label="Número de tarjeta"
                  type="text"
                  placeholder="No. de tarjeta"
                  required
                  error={validate}
                  validity={validationObj.validateCard}
                  textInvalid={validationObj.textInvalidCard}
                  maxLength={16}
                  onChange={handleChange}
                  uppercase
                  number
                />
              </Col>
              <Col md={4}>
                <div className="form-row">
                  <Col xs={6}>
                    <label className="form-label">Mes</label>
                    <TextInput
                      name="expiration_month"
                      value={form.expiration_month}
                      placeholder="Mes"
                      type="text"
                      required
                      validity={validationObj.validateMonth}
                      textInvalid={validationObj.textInvalidExpirationMonth}
                      maxLength={2}
                      onChange={handleChange}
                      uppercase
                      className="form-control"
                      number
                    />
                  </Col>
                  <Col xs={6}>
                    <label className="form-label">Año</label>
                    <TextInput
                      name="expiration_year"
                      value={form.expiration_year}
                      type="text"
                      placeholder="Año"
                      required
                      validity={validationObj.validateYear}
                      textInvalid={validationObj.textInvalidExpirationYear}
                      maxLength={2}
                      className="form-control"
                      onChange={handleChange}
                      uppercase
                      number
                    />
                  </Col>
                </div>
              </Col>
              <Col md={4}>
                <label className="form-label">Código de seguridad</label>
                <div className="form-row">
                  <Col xs={8}>
                    <TextInput
                      name="cvv2"
                      value={form.cvv2}
                      type="text"
                      placeholder="3 dígitos"
                      required
                      validity={validationObj.validateCvv2}
                      textInvalid={validationObj.textInvalidCvv2}
                      maxLength={3}
                      className="form-control"
                      onChange={handleChange}
                      uppercase
                      number
                    />
                  </Col>
                  <Col xs={4}>
                    <img
                      src={iconCvv}
                      className="img-fluid d-block mx-auto "
                      alt="icono-escudo"
                    />
                  </Col>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </form>
    </Fragment>
  )
}

export default OpenPayForm
