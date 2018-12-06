import React, { Fragment } from 'react'
import { Col } from 'react-bootstrap'

import RegistrationInstruction from 'Components/CardRegistration/RegistrationInstructions'
import RegisteredCards from 'Components/CardRegistration/RegisteredCards'
import OpenPayForm from 'Components/CardRegistration/OpenPayForm'

import Styles from './RegistrationForm.less'

type Props = {
  alias: String,
  handleChange: void,
  handleClickAdd: void
}

function RegistrationForm(props: Props) {
  const { alias, handleChange, handleClickAdd } = props

  return (
    <Fragment>
      <Col md={12}>
        <h2>Métodos de pago</h2>
      </Col>
      <Col md={5} className={Styles.payment_methods}>
        <RegisteredCards styles={Styles} />
        {false && <RegistrationInstruction />}
      </Col>
      <Col md={7}>
        <h4 className={Styles.registration_title}>
          Método de pago
          <br />
          <small className={Styles.registration_title_small}>
            CRÉDITO Y DÉBITO
          </small>
        </h4>
        <OpenPayForm
          alias={alias}
          handleClickAdd={handleClickAdd}
          handleChange={handleChange}
          styles={Styles}
        />
      </Col>
    </Fragment>
  )
}

export default RegistrationForm
