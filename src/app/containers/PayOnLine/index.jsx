/* eslint-disable no-unused-vars */
// Dependencies
import React, { Fragment, Component, SyntheticInputEvent } from 'react'

// Components
import PagoEnLinea from 'Components/PayOnLine'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'

// Utils
import * as Utils from 'SharedUtils/Utils'

// Flow Props and Stats
type Props = {
  handleLoading: void,
  onShowModal: Object
}

type State = {
  partidas: Array<mixed>,
  cards: Array<mixed>,
  form: Object,
  disabledOpenPayForm: boolean,
  content: Array<mixed>,
  size: String,
  showModal: boolean,
  isLoading: boolean,
  pago: number
}

class Tickets extends Component<Props, State> {
  state = {
    partidas: [
      { id: '123456', tipoOperacion: 'Abono', monto: '11123.45' },
      { id: '123457', tipoOperacion: 'Refrendo', monto: '123.0' },
      { id: '123458', tipoOperacion: 'Desempeño', monto: '12353.00' }
    ],
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
    ],
    form: {
      cardSelected: '',
      remember: false
    },
    disabledOpenPayForm: true,
    content: [],
    size: '',
    showModal: false,
    isLoading: false,
    pago: 0
  }

  componentWillMount() {
    const { cards, partidas } = this.state
    let { disabledOpenPayForm, pago } = this.state
    disabledOpenPayForm = cards.length !== 0

    partidas.map(partida => {
      pago += parseFloat(partida.monto)
      return pago
    })
    this.setState({ disabledOpenPayForm, pago })
  }

  componentWillReceiveProps(nextProps) {}

  onChange = ({ target }: SyntheticInputEvent) => {
    let { form } = this.state
    let { disabledOpenPayForm } = this.state
    const { name, checked, value } = target

    const dataType = target.getAttribute('data-type')

    if (name === 'cardSelected') {
      disabledOpenPayForm = dataType !== 'otro'
      form = { ...form, [name]: dataType }
      this.setState({ form, disabledOpenPayForm })
    } else if (name === 'remember') {
      form = { ...form, [name]: checked }
      this.setState({ form })
    } else {
      form = { ...form, [name]: value }
      this.setState({ form })
    }
  }

  successCallbak = e => {
    const { handleLoading, onShowModal } = this.props
    const { form } = this.state
    const { data } = e
    const permitedCards = ['visa', 'mastercard']
    let modalObj = {}

    if (Utils.indexOfItem(permitedCards, data.card.brand) === -1) {
      modalObj = Utils.warningMessage('Únicamente tarjetas Visa y Mastercard')
      onShowModal(modalObj)
    } else if (!form.alias) {
      modalObj = Utils.warningMessage('Proporciona un alias para esta tarjeta')
      onShowModal(modalObj)
    } else {
      modalObj = Utils.warningMessage(
        `Se manda al servicio con estos datos ${JSON.stringify(data)}`
      )
      onShowModal(modalObj)
    }
  }

  errorCallbak = e => {
    // eslint-disable-next-line no-console
    const { description } = e.data
    const modalObj = Utils.warningMessage(description)

    this.setState({ showModal: true, content: modalObj })
  }

  onClose = () => {
    this.setState({ showModal: false })
  }

  onPay = () => {
    const { form, cards } = this.state
    const { handleLoading, onShowModal } = this.props

    if (form.remember) {
      window.OpenPay.token.extractFormAndCreate(
        'payment-form',
        this.successCallbak,
        this.errorCallbak
      )
    } else {
      onShowModal(Utils.warningMessage(`Se manda al servicio de pago`))
    }
  }

  removePartida = id => {
    let { partidas, pago } = this.state
    partidas = Utils.removeItem(partidas, { id })
    pago = 0
    partidas.map(partida => {
      pago += parseFloat(partida.monto)
      return pago
    })
    this.setState({ partidas, pago })
  }

  render() {
    const {
      partidas,
      cards,
      form,
      disabledOpenPayForm,
      content,
      size,
      showModal,
      isLoading,
      pago
    } = this.state

    return (
      <Fragment>
        <div className="border-box-shadow mt-1 pt-2 py-0 px-0">
          <PagoEnLinea
            partidas={partidas}
            cards={cards}
            handleChange={this.onChange}
            form={form}
            disabledOpenPayForm={disabledOpenPayForm}
            onPay={this.onPay}
            montoPagar={pago}
            removePartida={this.removePartida}
          />
        </div>
      </Fragment>
    )
  }
}

export default Tickets
