import React, { Component, SyntheticInputEvent } from 'react'

import * as Utils from 'SharedUtils/Utils'

import RegistrationForm from 'Components/CardRegistration/RegistrationForm'
import getCard, { saveCard, deleteCard, updateCard } from 'Api/CardRegistration'
import { UserConsumer } from 'Context/User'

// Style
import style from 'Components/CardRegistration/RegistrationForm.less'

type Props = {
  onShowModal: Object,
  handleHide: void,
  handleLoading: void
}

type State = {
  form: Object,
  cards: Array<mixed>,
  validationObj: Object,
  deviceSessionId: String
}

class CardRegistration extends Component<Props, State> {
  static contextType = UserConsumer

  state = {
    form: {},
    cards: [],
    validationObj: {
      validateVerifyData: true
    }
  }

  componentWillMount() {
    const { userInfo } = this.context
    const { handleLoading } = this.props
    handleLoading(true)
    getCard(userInfo.clientId)
      .then(res => {
        handleLoading(false)
        const cardResponse = res.object.slice(0, 3).map(e => {
          const cards = {
            tipo: e.tipo.descripcion,
            digitos: e.digitos,
            alias: e.alias,
            token: e.token,
            id: e.id
          }
          return cards
        })
        this.setState({ cards: [...cardResponse] })
      })
      .catch(res => {
        if (
          res.response.data.message ===
          'Usted aún no tiene tarjetas registradas. con el idCliente: '
        ) {
          handleLoading(false)
          this.setState({ cards: [] })
        }
      })
  }

  componentDidMount() {
    let { deviceSessionId } = this.state
    deviceSessionId = window.OpenPay.deviceData.setup()
    this.setState({ deviceSessionId })
  }

  successCallbak = e => {
    const { onShowModal, handleLoading } = this.props
    let { cards } = this.state
    const { form, deviceSessionId } = this.state
    const { userInfo } = this.context
    const { data } = e
    const permitedCards = ['visa', 'mastercard']
    if (cards.length !== 3) {
      if (Utils.indexOfItem(permitedCards, data.card.brand) === -1) {
        onShowModal(
          Utils.successMessage('Únicamente tarjetas Visa y Mastercard')
        )
      } else if (!form.alias) {
        onShowModal(
          Utils.successMessage('Proporciona un alias para esta tarjeta')
        )
      } else {
        console.log('dataCard', data)
        const obj = {
          alias: form.alias,
          cliente: {
            idCliente: userInfo.clientId,
            nombreUsuario: userInfo.fullName,
            nombreTitular: data.card.holder_name
          },
          digitos: data.card.card_number.substring(12, 16),
          estatus: {
            id: 1
          },
          tipo: {
            id: data.card.brand === 'visa' ? 1 : 2
          },
          tokenCard: data.id,
          deviceSessionId
        }
        handleLoading(true)
        saveCard(obj).then(() => {
          onShowModal(Utils.successMessage())
          getCard(userInfo.clientId)
            .then(res => {
              handleLoading(false)
              const cardResponse = res.object.map(item => {
                const cardSave = {
                  tipo: item.tipo.descripcion,
                  digitos: item.digitos,
                  alias: item.alias,
                  token: item.token,
                  id: item.id
                }
                return cardSave
              })
              cards = [...cardResponse]
              this.setState({
                form: Utils.setDefaultValues(form),
                cards
              })
              this.setState({ form: {} })
            })
            .catch(err => {
              handleLoading(false)
              onShowModal(Utils.errorMessage(err))
            })
        })
      }
    } else {
      onShowModal(
        Utils.warningMessage(
          'Alcanzaste la cantidad máxima de métodos registrados'
        )
      )
    }
  }

  errorCallbak = e => {
    const { onShowModal } = this.props
    // eslint-disable-next-line no-console
    const { description } = e.data
    onShowModal(Utils.warningMessage(description || e.message))
  }

  onClickAdd = () => {
    const { form, validationObj } = this.state

    if (Object.keys(form).length === 0) {
      validationObj.validateCardName = true
      validationObj.textInvalidCardName = 'El campo es requerido'
      validationObj.validateCard = true
      validationObj.textInvalidCard = 'El campo es requerido'
      validationObj.validateMonth = true
      validationObj.textInvalidExpirationMonth = 'El campo es requerido'
      validationObj.validateYear = true
      validationObj.textInvalidExpirationYear = 'El campo es requerido'
      validationObj.validateCvv2 = true
      validationObj.textInvalidCvv2 = 'El campo es requerido'
      this.setState({ validationObj })
    } else {
      window.OpenPay.token.create(
        {
          card_number: form.card_number,
          holder_name: form.holder_name,
          expiration_year: form.expiration_year,
          expiration_month: form.expiration_month,
          cvv2: form.cvv2
        },
        this.successCallbak,
        this.errorCallbak
      )
    }
  }

  onClose = () => {
    const { handleHide } = this.props

    handleHide()
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    let { form } = this.state
    const { validationObj } = this.state
    const { name } = target
    const { value } = target
    const date = new Date().toISOString().slice(0, 4)

    // eslint-disable-next-line default-case
    switch (name) {
      case 'holder_name':
        if (value === '') {
          validationObj.validateCardName = true
          validationObj.textInvalidCardName = 'El campo es requerido'
        } else {
          validationObj.validateCardName = false
          validationObj.textInvalidCardName = ''
        }
        break
      case 'card_number':
        if (value === '') {
          validationObj.validateCard = true
          validationObj.textInvalidCard = 'El campo es requerido'
        } else if (value.length < 16) {
          validationObj.validateCard = true
          validationObj.textInvalidCard = 'Debe tener 16 digitos'
        } else {
          validationObj.validateCard = false
          validationObj.textInvalidCard = ''
        }
        break
      case 'expiration_month':
        if (value === '') {
          validationObj.validateMonth = true
          validationObj.textInvalidExpirationMonth = 'El campo es requerido'
        } else if (Number(value) > 12) {
          validationObj.validateMonth = true
          validationObj.textInvalidExpirationMonth =
            'Tiene que ser un mes valido'
        } else {
          validationObj.validateMonth = false
          validationObj.textInvalidExpirationMonth = ''
        }
        break
      case 'expiration_year':
        if (value === '') {
          validationObj.validateYear = true
          validationObj.textInvalidExpirationYear = 'El campo es requerido'
        } else if (Number(value) < Number(date.slice(2))) {
          validationObj.validateYear = true
          validationObj.textInvalidExpirationYear =
            'El año tiene que ser mayor o igual al actual'
        } else if (Number(value) >= Number(date.slice(2))) {
          validationObj.validateYear = false
          validationObj.textInvalidExpirationYear = ''
        }

        break
      case 'cvv2':
        if (value === '') {
          validationObj.validateCvv2 = true
          validationObj.textInvalidCvv2 = 'El campo es requerido'
        } else if (value.length < '3') {
          validationObj.validateCvv2 = true
          validationObj.textInvalidCvv2 = 'Tiene que ser 3 digitos'
        } else {
          validationObj.validateCvv2 = false
          validationObj.textInvalidCvv2 = ''
        }
        break
      case 'alias':
        if (value === '') {
          validationObj.alias = true
          validationObj.textInvalidAlias = 'El campo es requerido'
        } else {
          validationObj.alias = false
          validationObj.textInvalidAlias = ''
        }
        break
    }

    form = {
      ...form,
      [target.name]: target.value
    }
    this.setState({ form, validationObj })
  }

  onShowCollapse = e => {
    // eslint-disable-next-line react/destructuring-assignment
    let { form } = this.state
    form = {
      ...form,
      [`alias-${e.id}`]: !form[`alias-${e.id}`],
      [e.alias]: e.alias,
      tokenCard: e.token
    }
    this.setState({ form })
  }

  onClickDelete = e => {
    const { onShowModal, handleHide } = this.props
    const { userInfo } = this.context
    const modalObj = Utils.questionMessage(
      '¿Seguro que desea eliminar esta tarjeta?',
      () => {
        // eslint-disable-next-line no-console
        deleteCard(e.token).then(() => {
          onShowModal(Utils.successMessage())
          getCard(userInfo.clientId)
            .then(res => {
              const cardResponse = res.object.map(item => {
                const cardSave = {
                  tipo: item.tipo.descripcion,
                  digitos: item.digitos,
                  alias: item.alias,
                  token: item.token
                }
                return cardSave
              })
              this.setState({ cards: [...cardResponse] })
            })
            .catch(res => {
              if (
                res.response.data.message ===
                'Usted aún no tiene tarjetas registradas. con el idCliente: '
              ) {
                this.setState({ cards: [] })
              }
            })
        })
      },
      () => handleHide()
    )
    onShowModal(modalObj)
  }

  onClickUpdate = ({ target }: SyntheticInputEvent) => {
    const { form } = this.state
    const { onShowModal, handleHide, handleLoading } = this.props
    const { userInfo } = this.context
    if (!form[target.name]) {
      onShowModal(Utils.warningMessage('Favor de llenar el campo "Alias"'))
    } else {
      const modalObj = Utils.questionMessage(
        '¿Seguro que cambiar el alias?',
        () => {
          // eslint-disable-next-line no-console
          updateCard({ alias: form[target.name], tokenCard: form.tokenCard })
            .then(() => {
              onShowModal(Utils.successMessage())
              getCard(userInfo.clientId).then(res => {
                const cardResponse = res.object.map(item => {
                  const cardSave = {
                    tipo: item.tipo.descripcion,
                    digitos: item.digitos,
                    alias: item.alias,
                    token: item.token,
                    id: item.id
                  }
                  return cardSave
                })
                this.setState({ cards: [...cardResponse] })
              })
            })
            .catch(err => {
              handleLoading(false)
              onShowModal(Utils.errorMessage(err))
            })
        },
        () => {
          handleHide()
        }
      )
      onShowModal(modalObj)
    }
  }

  render() {
    const { form, alias, cards, validationObj } = this.state
    return (
      <div>
        <fieldset className={`${style.noPadding} border-box-shadow`}>
          <RegistrationForm
            form={form}
            validationObj={validationObj}
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
