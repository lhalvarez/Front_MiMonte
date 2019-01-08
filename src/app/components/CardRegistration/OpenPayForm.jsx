/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import logoVisa from 'SharedImages/logo-visa.svg'
import logoMasterCard from 'SharedImages/logo-mastercard-lineal.svg'
import iconCvv from 'SharedImages/icon-cvv.png'

type Props = {
  form: Object,
  styles: any
}

function OpenPayForm(props: Props) {
  const { form, styles } = props

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
              <label className="form-label">Nombre del titular</label>
              <input
                type="text"
                placeholder="Como aparece en la tarjeta"
                autoComplete="off"
                data-openpay-card="holder_name"
                className="form-control"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="p-0 mb-2 form-row">
              <Col xs={4}>
                <label className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  autoComplete="off"
                  data-openpay-card="card_number"
                  className="form-control"
                  maxLength="16"
                  minLength="16"
                  required
                />
              </Col>
              <Col md={4}>
                <label className="form-label">Fecha de expiración</label>
                <div className="form-row">
                  <Col xs={6}>
                    <input
                      inline
                      type="text"
                      placeholder="Mes"
                      data-openpay-card="expiration_month"
                      className="form-control"
                      maxLength="2"
                    />
                  </Col>
                  <Col xs={6}>
                    <input
                      inline
                      type="text"
                      placeholder="Año"
                      data-openpay-card="expiration_year"
                      className="form-control"
                      maxLength="2"
                    />
                  </Col>
                </div>
              </Col>
              <Col md={4}>
                <label className="form-label">Código de seguridad</label>
                <div className="form-row">
                  <Col xs={8}>
                    <input
                      type="text"
                      placeholder="3 dígitos"
                      autoComplete="off"
                      data-openpay-card="cvv2"
                      className="form-control"
                      maxLength="5"
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
