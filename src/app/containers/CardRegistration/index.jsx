import React, { Component, SyntheticInputEvent } from 'react'

import * as Utils from 'SharedUtils/Utils'

import RegistrationForm from 'Components/CardRegistration/RegistrationForm'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'

// Style
import style from 'Components/CardRegistration/RegistrationForm.less'

type Props = {
  /** */
  onShowModal: void,
  handleHide: void
}

type State = {
  form: Object,
  content: Array<mixed>,
  size: String,
  showModal: boolean,
  cards: Array<mixed>
}

class CardRegistration extends Component<Props, State> {
  state = {
    form: {},
    content: [],
    size: '',
    showModal: false,
    cards: [
      {
        referencia: 1111,
        tipo: 'Visa',
        digitos: '1234',
        alias: 'Principal'
      },
      {
        referencia: 2222,
        tipo: 'Mastercard',
        digitos: '5678',
        alias: 'La de pagos'
      },
      {
        referencia: 3333,
        tipo: 'Mastercard',
        digitos: '9112',
        alias: 'El monte'
      }
    ]
  }

  successCallbak = e => {
    const { form } = this.state
    const { data } = e
    const permitedCards = ['visa', 'mastercard']
    let modalObj = {}

    if (Utils.indexOfItem(permitedCards, data.card.brand) === -1) {
      modalObj = Utils.warningMessage('Únicamente tarjetas Visa y Mastercard')
      this.setState({ showModal: true, content: modalObj })
    } else if (!form.alias) {
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
    let { form } = this.state
    form = {
      ...form,
      [target.name]: target.value
    }
    this.setState({ form })
  }

  onShowCollapse = e => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    let { form } = this.state
    form = {
      ...form,
      [`alias-${e.target.name}`]: !form[`alias-${e.target.name}`]
    }
    this.setState({ form })
  }

  onClickDelete = e => {
    e.preventDefault()
    const { onShowModal, handleHide } = this.props
    const modalObj = Utils.questionMessage(
      '¿Seguro que desea eliminar esta tarjeta?',
      () => {
        // eslint-disable-next-line no-console
        console.log('Oh yeah!')
      },
      () => {
        handleHide()
      }
    )
    onShowModal(modalObj)
  }

  onClickUpdate = ({ target }: SyntheticInputEvent) => {
    const { form } = this.state
    const { onShowModal, handleHide } = this.props

    if (!form[target.name]) {
      onShowModal(Utils.warningMessage('Favor de llenar el campo "Alias"'))
    } else {
      const modalObj = Utils.questionMessage(
        '¿Seguro que cambiar el alias?',
        () => {
          // eslint-disable-next-line no-console
          console.log('Oh yeah i want it!')
        },
        () => {
          handleHide()
        }
      )
      onShowModal(modalObj)
    }
  }

  render() {
    const { form, alias, content, size, showModal, cards } = this.state
    return (
      <div>
        <ModalProvider
          content={content}
          size={size}
          showModal={showModal}
          onClose={this.onClose}
        />
        <fieldset className={`${style.noPadding} border-box-shadow`}>
          <RegistrationForm
            form={form}
            alias={alias}
            handleClickAdd={this.onClickAdd}
            handleChange={this.onChange}
            handleShowCollapse={this.onShowCollapse}
            handleClickDelete={this.onClickDelete}
            handleClickUpdate={this.onClickUpdate}
            cards={cards}
          />
        </fieldset>
      </div>
    )
  }
}

export default CardRegistration
