import React, { Fragment } from 'react'
import { Col } from 'react-bootstrap'

import RegistrationInstruction from 'Components/CardRegistration/RegistrationInstructions'
import OpenPayForm from 'Components/CardRegistration/OpenPayForm'

import Styles from './RegistrationForm.less'

type Props = {
  handleClickAdd: void
}

function RegistrationForm(props: Props) {
  const { handleClickAdd } = props

  return (
    <Fragment>
      <Col md={12}>
        <h2>Registro de tarjetas</h2>
      </Col>
      <Col md={5}>
        <RegistrationInstruction />
      </Col>
      <Col md={7}>
        <h4 className={Styles.registration_title}>
          Registrar método de pago
          <br />
          <small className={Styles.registration_title_small}>
            CRÉDITO Y DÉBITO
          </small>
        </h4>
        <OpenPayForm styles={Styles} handleClickAdd={handleClickAdd} />
      </Col>
    </Fragment>
  )
}

export default RegistrationForm
