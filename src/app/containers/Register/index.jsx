import React, { Component, SyntheticInputEvent } from 'react'
import Register from 'Components/Register'
import * as Utils from 'SharedUtils/Utils'

// Flow Props and State
type Props = {
  /** */
}
type State = {
  form: Object,
  validate: boolean,
  textInvalidEmail: string,
  textInvalidCelular: string
}

class Registration extends Component<Props, State> {
  state = {
    form: {},
    validate: false,
    textInvalidEmail: '',
    textInvalidEmailConf: '',
    textInvalidCelular: '',
    textInvalidCelularConf: ''
  }

  onChangeInput = ({ target }: SyntheticInputEvent) => {
    const { form } = this.state
    let {
      validate,
      textInvalidCelular,
      textInvalidCelularConf,
      textInvalidEmail,
      textInvalidEmailConf
    } = this.state

    if (target.name === 'user') {
      if (!Utils.isValidEmail(target.value)) {
        validate = true
        textInvalidEmail = 'El email no tiene un formato válido'
      } else {
        validate = false
        textInvalidEmail = ''
      }
    }

    if (target.name === 'confUser') {
      if (!Utils.isValidEmail(target.value) && target.value !== form.user) {
        validate = true
        textInvalidEmailConf =
          'El email de confirmación no tiene un formato válido y no es igual a el campo Correo Electrónico'
      } else {
        if (!Utils.isValidEmail(target.value)) {
          validate = true
          textInvalidEmailConf =
            'El email de confirmación no tiene un formato válido'
        }
        if (target.value !== form.user) {
          validate = true
          textInvalidEmailConf =
            'El email de confirmación no es igual a el campo Correo Electronico'
        } else {
          validate = false
          textInvalidEmailConf = ''
        }
      }
    }

    if (target.name === 'celular') {
      if (target.value.length !== 10) {
        validate = true
        textInvalidCelular = 'Celular debe ser a 10 dígitos'
      } else {
        validate = false
        textInvalidCelular = ''
      }
    }

    if (target.name === 'confCel') {
      if (target.value.length !== 10 && target.value !== form.celular) {
        validate = true
        textInvalidCelularConf =
          'Celular debe ser a 10 dígitos y no coincide con el campo Número Celular'
      } else if (target.value !== form.celular) {
        validate = true
        textInvalidCelularConf =
          'Celular no coincide con el campo Número Celular'
      } else {
        validate = false
        textInvalidCelularConf = ''
      }
    }

    this.setState({
      form: { ...form, [target.name]: target.value },
      validate,
      textInvalidEmail,
      textInvalidEmailConf,
      textInvalidCelular,
      textInvalidCelularConf
    })
  }

  onValidateForm = () => {
    let { validate } = this.state
    const { form } = this.state

    const validateForm =
      Utils.isEmpty(form) ||
      (form.name === '' || form.name === undefined) ||
      (form.apPat === '' || form.apPat === undefined) ||
      (form.apPat === '' || form.apPat === undefined) ||
      (form.fecNac === '' || form.fecNac === undefined) ||
      (form.tarjeta === '' || form.tarjeta === undefined) ||
      (form.user === '' || form.user === undefined) ||
      (form.confUser === '' || form.confUser === undefined) ||
      (form.celular === '' || form.celular === undefined) ||
      (form.confCel === '' || form.confCel === undefined)

    if (validateForm) {
      validate = true
    }
    if (!validateForm) {
      /* Se envia el SMS */
      validate = false
    }

    this.setState({ validate })
  }

  render() {
    const {
      form,
      validate,
      textInvalidCelular,
      textInvalidEmail,
      textInvalidCelularConf,
      textInvalidEmailConf
    } = this.state
    return (
      <Register
        form={form}
        validate={validate}
        textInvalidEmail={textInvalidEmail}
        textInvalidEmailConf={textInvalidEmailConf}
        textInvalidCelularConf={textInvalidCelular}
        textInvalidCelular={textInvalidCelularConf}
        handleChangeInput={this.onChangeInput}
        handleValidateForm={this.onValidateForm}
      />
    )
  }
}

export default Registration
