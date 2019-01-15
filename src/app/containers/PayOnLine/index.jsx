/* eslint-disable no-nested-ternary */
// Dependencies
import React, { Fragment, Component, SyntheticInputEvent } from 'react'

// Components
import PagoEnLinea from 'Components/PayOnLine'

// Utils
import * as Utils from 'SharedUtils/Utils'
import { UserConsumer } from 'Context/User'

// Api
import getCard, { saveCard } from 'Api/CardRegistration'
import payMethod, { endTransaction } from 'Api/PayOnLine'
import { isEqual } from 'underscore'

// Flow Props and Stats
type Props = {
  handleLoading: void,
  onShowModal: Object,
  handleHide: void,
  history: any,
  dataCallback: Object
}

type State = {
  paymentDetailTickets: Array<mixed>,
  cards: Array<mixed>,
  form: Object,
  disabled: Object,
  content: Array<mixed>,
  size: String,
  showModal: boolean,
  isLoading: boolean,
  deviceSessionId: String,
  pago: number,
  validationObj: Object,
  idTransaccion: String
}

class PayOnLine extends Component<Props, State> {
  static contextType = UserConsumer

  state = {
    paymentDetailTickets: [],
    cards: [],
    form: {
      cardSelected: '',
      remember: false
    },
    disabled: { form: true, button: true },
    pago: 0,
    validationObj: {
      validateVerifyData: true
    },
    idTransaccion: null
  }

  componentWillMount() {
    const { onShowModal, handleLoading, history } = this.props
    const { cards } = this.state
    let { form, disabled, pago } = this.state
    const { userInfo } = this.context
    const { location } = this.props
    const tickets = location.state ? location.state.tickets : []

    handleLoading(true)
    const paymentDetailTickets = tickets.map(partida => ({
      id: partida.id,
      // eslint-disable-next-line no-nested-ternary
      tipoOperacion: partida.abono
        ? 'Abono'
        : partida.desempeno
        ? 'Desempeño'
        : 'Refrendo',
      monto: partida.monto
    }))
    getCard(userInfo.clientId)
      .then(res => {
        handleLoading(false)
        const cardResponse = res.object.map(item => {
          const cardSave = {
            tipo: item.tipo.descripcion,
            digitos: item.digitos,
            alias: item.alias,
            token: item.token,
            id: item.id,
            id_openpay: item.id_openpay
          }
          return cardSave
        })
        disabled =
          !cardResponse.length && !paymentDetailTickets.length
            ? { form: true, button: true }
            : !cardResponse.length && paymentDetailTickets.length
            ? { form: false, button: false }
            : { form: true, button: true }

        this.setState({ cards: [...cardResponse], disabled })
      })
      .catch(res => {
        if (
          res.response.data.message ===
          'Usted aún no tiene tarjetas registradas. con el idCliente: '
        ) {
          handleLoading(false)
          disabled = !paymentDetailTickets.length
            ? { form: true, button: true }
            : { form: false, button: false }

          this.setState({ cards: [], disabled })
        } else {
          handleLoading(false)
          onShowModal(Utils.errorMessage(res))
        }
      })
    form = { ...form, cardSelected: !cards.length ? 'ST' : '' }

    paymentDetailTickets.map(partida => {
      pago += parseFloat(partida.monto)
      return pago
    })

    pago = Math.round(pago * 100) / 100
    this.setState({ pago, paymentDetailTickets, form })
    history.push('/mimonte/pago', { tickets: paymentDetailTickets })
  }

  componentDidMount() {
    let { deviceSessionId } = this.state
    deviceSessionId = window.OpenPay.deviceData.setup()
    this.setState({ deviceSessionId })
  }

  componentWillReceiveProps(nextProps) {
    const { dataCallback } = nextProps
    const { idTransaccion, openPayWindow } = this.state
    const { handleLoading, onShowModal } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    if (!isEqual(this.props.dataCallback, dataCallback)) {
      if (idTransaccion === dataCallback.id) {
        endTransaction(dataCallback.id)
          .then(() => {
            openPayWindow.close()
            handleLoading(false)
            onShowModal(Utils.successMessage())
          })
          .catch(() => {
            handleLoading(false)
            onShowModal(Utils.errorMessage('', 'fallo'))
          })
      }
    }
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    let { form, disabled } = this.state
    const { validationObj } = this.state
    const { disabledOpenPayForm } = this.state
    const { name, checked, value } = target
    const date = new Date().toISOString().slice(0, 4)

    const dataType = target.getAttribute('data-type')

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

    if (name === 'cardSelected') {
      if (dataType === 'otro') {
        disabled = { form: false, button: false }
      } else {
        disabled = { form: true, button: false }
      }
      form = { ...form, [name]: dataType }
      this.setState({ form, disabledOpenPayForm, disabled, validationObj })
    } else if (name === 'remember') {
      form = { ...form, [name]: checked }
      this.setState({ form, validationObj })
    } else {
      form = { ...form, [name]: value }
      this.setState({ form, validationObj })
    }
  }

  successCallbak = e => {
    const { onShowModal, handleLoading } = this.props
    const { form, deviceSessionId, pago } = this.state
    let { cards } = this.state
    const { userInfo } = this.context
    const { data } = e
    const permitedCards = ['visa', 'mastercard']
    const { location } = this.props
    const tickets = location.state ? location.state.tickets : []

    if (Utils.indexOfItem(permitedCards, data.card.brand) === -1) {
      onShowModal(Utils.warningMessage('Únicamente tarjetas Visa y Mastercard'))
    } else if (form.remember) {
      if (!form.alias) {
        onShowModal(
          Utils.warningMessage('Proporciona un alias para esta tarjeta')
        )
      } else {
        const objSave = {
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
          deviceSessionId,
          id_openpay: data.id_openpay
        }
        handleLoading(true)
        saveCard(objSave)
          .then(response => {
            const objPay = {
              transaccion: {
                origen: 'MiMonte',
                transaccion: {
                  token: response.object.id_openpay,
                  metodoPago: 'card',
                  monto: pago,
                  tipoMoneda: 'MXN',
                  descripcion: 'Cargo Mi Monte NMP',
                  idSesionDispositivo: deviceSessionId,
                  urlRedireccionamiento: `${process.env.baseURL}/openPay`,
                  cliente: {
                    nombre: userInfo.name,
                    apellidos: userInfo.lastName,
                    correo: userInfo.email
                  }
                },
                partidas: {
                  partida: tickets.map(partida => {
                    const part = {
                      prenda: {
                        folio: partida.id
                      },
                      operacion: {
                        idOperacion: partida.desempeno
                          ? 6
                          : partida.refrendo
                          ? 8
                          : 116,
                        monto: partida.monto,
                        nombreOperacion:
                          partida.tipoOperacion === 'Desempeño'
                            ? 'Cobro Desempeno'
                            : partida.tipoOperacion === 'Refrendo'
                            ? 'Cobro Refrendo'
                            : 'Abono-Pagos Libres'
                      }
                    }

                    return part
                  })
                }
              },
              cliente: {
                idCliente: userInfo.clientId
              }
            }
            payMethod(objPay)
              // eslint-disable-next-line no-shadow
              .then(response => {
                if (response.url) {
                  const openPayWindow = window.open(response.url, 'openPay')
                  this.setState({
                    idTransaccion: response.idTransaccion,
                    openPayWindow
                  })
                }
              })
              .catch(err => {
                handleLoading(false)
                onShowModal(
                  Utils.errorMessage('', err.response.data.descripcionError)
                )
              })
            getCard(userInfo.clientId)
              .then(res => {
                const cardResponse = res.object.map(item => {
                  const cardSave = {
                    tipo: item.tipo.descripcion,
                    digitos: item.digitos,
                    alias: item.alias,
                    token: item.token,
                    id: item.id,
                    id_openpay: item.id_openpay
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
          .catch(err => {
            handleLoading(false)
            onShowModal(Utils.errorMessage(err))
          })
      }
    } else {
      const objPay = {
        token: true,
        transaccion: {
          origen: 'MiMonte',
          transaccion: {
            token: data.id,
            metodoPago: 'card',
            monto: pago,
            tipoMoneda: 'MXN',
            descripcion: 'Cargo Mi Monte NMP',
            idSesionDispositivo: deviceSessionId,
            urlRedireccionamiento: `${process.env.baseURL}/openPay`,
            cliente: {
              nombre: userInfo.name,
              apellidos: userInfo.lastName,
              correo: userInfo.email
            }
          },
          partidas: {
            partida: tickets.map(partida => {
              const part = {
                prenda: {
                  folio: partida.id
                },
                operacion: {
                  idOperacion: partida.desempeno
                    ? 6
                    : partida.refrendo
                    ? 8
                    : 116,
                  monto: partida.monto,
                  nombreOperacion:
                    partida.tipoOperacion === 'Desempeño'
                      ? 'Cobro Desempeno'
                      : partida.tipoOperacion === 'Refrendo'
                      ? 'Cobro Refrendo'
                      : 'Abono-Pagos Libres'
                }
              }

              return part
            })
          }
        },
        cliente: {
          idCliente: userInfo.clientId
        }
      }
      payMethod(objPay)
        .then(response => {
          if (response.url) {
            const openPayWindow = window.open(response.url, 'openPay')
            this.setState({
              idTransaccion: response.idTransaccion,
              openPayWindow
            })
          }
        })
        .catch(err => {
          handleLoading(false)
          onShowModal(
            Utils.errorMessage('', err.response.data.descripcionError)
          )
        })
    }
  }

  errorCallbak = e => {
    const { onShowModal, handleLoading } = this.props
    // eslint-disable-next-line no-console
    const { description } = e.data
    handleLoading(true)
    onShowModal(Utils.warningMessage(description || e.message))
  }

  onClose = () => {
    const { handleHide } = this.props
    handleHide()
  }

  onPay = () => {
    const { form, cards, pago, deviceSessionId } = this.state
    const { onShowModal, handleLoading } = this.props
    const { userInfo } = this.context
    const { location } = this.props
    const tickets = location.state ? location.state.tickets : []

    handleLoading(true)
    if (form.cardSelected === 'otro' || form.cardSelected === 'ST') {
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
    } else {
      const tokenCard = Utils.getItem(cards, { id: form.cardSelected })
      const obj = {
        transaccion: {
          origen: 'MiMonte',
          transaccion: {
            token: tokenCard.id_openpay,
            metodoPago: 'card',
            monto: pago,
            tipoMoneda: 'MXN',
            descripcion: 'Cargo Mi Monte NMP',
            idSesionDispositivo: deviceSessionId,
            urlRedireccionamiento: `${process.env.baseURL}/openPay`,
            cliente: {
              nombre: userInfo.name,
              apellidos: userInfo.lastName,
              correo: userInfo.email
            }
          },
          partidas: {
            partida: tickets.map(partida => {
              const part = {
                prenda: {
                  folio: partida.id
                },
                operacion: {
                  idOperacion: partida.desempeno
                    ? 6
                    : partida.refrendo
                    ? 8
                    : 116,
                  monto: partida.monto,
                  nombreOperacion:
                    partida.tipoOperacion === 'Desempeño'
                      ? 'Cobro Desempeno'
                      : partida.tipoOperacion === 'Refrendo'
                      ? 'Cobro Refrendo'
                      : 'Abono-Pagos Libres'
                }
              }

              return part
            })
          }
        },
        cliente: {
          idCliente: userInfo.clientId
        }
      }
      payMethod(obj)
        .then(response => {
          if (response.url) {
            const openPayWindow = window.open(response.url, 'openPay')
            this.setState({
              idTransaccion: response.idTransaccion,
              openPayWindow
            })
          }
        })
        .catch(err => {
          handleLoading(false)
          onShowModal(
            Utils.errorMessage(
              '',
              err.response.data.descripcionError || err.message
            )
          )
        })
    }
  }

  removePartida = id => {
    let { paymentDetailTickets, pago } = this.state
    const { history } = this.props
    paymentDetailTickets = Utils.removeItem(paymentDetailTickets, { id })
    pago = 0
    paymentDetailTickets.map(partida => {
      pago += parseFloat(partida.monto)
      return pago
    })
    history.push('/mimonte/pago', { tickets: paymentDetailTickets })
    this.setState({ paymentDetailTickets, pago })
  }

  onClickBoletas = () => {
    const { paymentDetailTickets } = this.state
    const { history } = this.props
    history.push('/mimonte/boletas', { tickets: paymentDetailTickets })
  }

  onClickMetodoPago = () => {
    const { paymentDetailTickets } = this.state
    const { history } = this.props
    history.push('/mimonte/registro-tarjetas', {
      tickets: paymentDetailTickets
    })
  }

  render() {
    const {
      paymentDetailTickets,
      cards,
      form,
      pago,
      validationObj,
      disabled
    } = this.state

    return (
      <Fragment>
        <div className="border-box-shadow mt-1 pt-2 py-0 px-0">
          <PagoEnLinea
            partidas={paymentDetailTickets}
            cards={cards}
            handleChange={this.onChange}
            form={form}
            validationObj={validationObj}
            disabled={disabled}
            onPay={this.onPay}
            montoPagar={pago}
            removePartida={this.removePartida}
            handleChangeBoletas={this.onClickBoletas}
            handleChangeMetodoPago={this.onClickMetodoPago}
          />
        </div>
      </Fragment>
    )
  }
}

export default PayOnLine
