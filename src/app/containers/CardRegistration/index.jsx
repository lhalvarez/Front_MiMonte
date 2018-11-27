import React, { Component } from 'react'
import { Row } from 'react-bootstrap'

import RegistrationForm from 'Components/CardRegistration/RegistrationForm'

type Props = {
  /** */
}

type State = {
  alias: string
}

class CardRegistration extends Component<Props, State> {
  state = {
    alias: ''
  }

  successCallbak = e => {
    // eslint-disable-next-line no-console
    console.log('Success_:', e)
  }

  errorCallbak = e => {
    // eslint-disable-next-line no-console
    console.log('Error_:', e)
  }

  onClickAdd = () => {
    window.OpenPay.token.extractFormAndCreate(
      'payment-form',
      this.successCallbak,
      this.errorCallbak
    )
  }

  render() {
    const { alias } = this.state
    return (
      <div>
        <Row className="border-box-shadow">
          <RegistrationForm alias={alias} handleClickAdd={this.onClickAdd} />
        </Row>
      </div>
    )
  }
}

export default CardRegistration
