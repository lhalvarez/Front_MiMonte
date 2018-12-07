import React, { Component, SyntheticInputEvent } from 'react'
import { Row } from 'react-bootstrap'

import * as Utils from 'SharedUtils/Utils'

import RegistrationForm from 'Components/CardRegistration/RegistrationForm'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'

type Props = {
  /** */
}

type State = {
  alias: String,
  content: Array<mixed>,
  size: String,
  showModal: boolean
}

class CardRegistration extends Component<Props, State> {
  state = {
    alias: '',
    content: [],
    size: '',
    showModal: false
  }

  successCallbak = e => {
    const { alias } = this.state
    const { data } = e
    const permitedCards = ['visa', 'mastercard']
    let modalObj = {}

    if (Utils.indexOfItem(permitedCards, data.card.brand) === -1) {
      modalObj = Utils.warningMessage('Únicamente tarjetas Visa y Mastercard')
      this.setState({ showModal: true, content: modalObj })
    } else if (!alias) {
      modalObj = Utils.warningMessage('Proporciona un alias para esta tarjeta')
      this.setState({ showModal: true, content: modalObj })
    } else {
      modalObj = Utils.warningMessage(
        `Se manda al servicio con estos datos ${JSON.stringify(data)}`
      )
      this.setState({ showModal: true, content: modalObj })
    }
  }

  errorCallbak = e => {
    // eslint-disable-next-line no-console
    const { description } = e.data
    const modalObj = Utils.warningMessage(description)

    this.setState({ showModal: true, content: modalObj })
  }

  onClickAdd = () => {
    window.OpenPay.token.extractFormAndCreate(
      'payment-form',
      this.successCallbak,
      this.errorCallbak
    )
  }

  onClose = () => {
    this.setState({ showModal: false })
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { alias, content, size, showModal } = this.state
    return (
      <div>
        <ModalProvider
          content={content}
          size={size}
          showModal={showModal}
          onClose={this.onClose}
        />
        <Row className="border-box-shadow">
          <RegistrationForm
            alias={alias}
            handleClickAdd={this.onClickAdd}
            handleChange={this.onChange}
          />
        </Row>
      </div>
    )
  }
}

export default CardRegistration
