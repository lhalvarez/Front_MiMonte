/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'

import logoVisa from 'SharedImages/logo-visa.png'
import logoMasterCard from 'SharedImages/logo-mastercard.png'
import iconCvv from 'SharedImages/icon-cvv.png'

type Props = {
  alias: String,
  handleChange: void,
  handleClickAdd: void,
  styles: any
}

function OpenPayForm(props: Props) {
  const { alias, handleChange, handleClickAdd, styles } = props

  return (
    <Fragment>
      <Row>
        <Col>
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
          <Col md={4}>
            <div className="form-group">
              <label className="form-label">Número de tarjeta</label>
              <input
                type="text"
                autoComplete="off"
                data-openpay-card="card_number"
                className="form-control"
              />
            </div>
          </Col>
          <Col md={2}>
            <div className="form-group">
              <label className="form-label">Mes</label>
              <input
                type="text"
                placeholder="Mes"
                data-openpay-card="expiration_month"
                className="form-control"
                maxLength="2"
              />
            </div>
          </Col>
          <Col md={2}>
            <div className="form-group">
              <label className="form-label">Año</label>
              <input
                type="text"
                placeholder="Año"
                data-openpay-card="expiration_year"
                className="form-control"
                maxLength="2"
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group">
              <label className="form-label">Código de seguridad</label>
              <input
                type="text"
                placeholder="3 dígitos"
                autoComplete="off"
                data-openpay-card="cvv2"
                className="form-control"
                maxLength="5"
              />
            </div>
          </Col>
          <Col md={1}>
            <img
              src={iconCvv}
              className="img-fluid d-block mx-auto"
              alt="icono-escudo"
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <TextInput
              name="alias"
              placeholder="Alias"
              value={alias}
              label="Alias"
              type="text"
              maxLength={20}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Button
              variant="primary"
              label="Agregar"
              size="lg"
              className="float-right mt-4"
              id="pay-button"
              onClick={handleClickAdd}
              block
            />
          </Col>
        </Row>
      </form>
    </Fragment>
  )
}

export default OpenPayForm
