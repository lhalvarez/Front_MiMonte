import React, {
  Component,
  SyntheticInputEvent,
  SyntheticEvent,
  Fragment
} from 'react'
import validateData, { createUser } from 'Api/Register'
import RegisterForm from 'Components/Register'
import ModalBodyVerifyData from 'Components/Register/ModalBodyVerifyData'
import ModalFooterVerifyData from 'Components/Register/ModalFooterVerifyData'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
import {
  isValidEmail,
  isEmpty,
  errorMessage,
  customMessage,
  successMessage
} from 'SharedUtils/Utils'

// Flow Props and State
type Props = {
  /** */
}
type State = {
  content: Array<mixed>,
  showModal: boolean,
  form: Object,
  validationObj: Object,
  validate: boolean,
  isLoading: boolean,
  sizeModal: String,
  disableStep1: boolean,
  disableStep2: boolean,
  disableStep3: boolean,
  disableStep4: boolean
}

class Registration extends Component<Props, State> {
  state = {
    content: [],
    form: {},
    validationObj: {},
    validate: false,
    showModal: false,
    isLoading: false,
    sizeModal: '',
    disableStep1: false,
    disableStep2: true,
    disableStep3: true,
    disableStep4: true
  }

  onChangeInput = ({ target }: SyntheticInputEvent) => {
    const { form, validationObj } = this.state
    const { name } = target
    let { value } = target

    // eslint-disable-next-line default-case
    switch (name) {
      case 'email':
        if (!isValidEmail(value)) {
          validationObj.validateEmail = true
          validationObj.textInvalidEmail = 'El email no tiene un formato válido'
        } else {
          validationObj.validateEmail = false
          validationObj.textInvalidEmail = ''
        }
        break
      case 'confEmail':
        if (!isValidEmail(value)) {
          validationObj.validateConfEmail = true
          validationObj.textInvalidEmailConf =
            'El email de confirmación no tiene un formato válido'
        } else if (value !== form.email) {
          validationObj.validateConfEmail = true
          validationObj.textInvalidEmailConf =
            'El email de confirmación no es igual a el campo Correo Electronico'
        } else {
          validationObj.validateConfEmail = false
          validationObj.textInvalidEmailConf = ''
        }
        break
      case 'celular':
        if (value.length !== 10) {
          validationObj.validateCelular = true
          validationObj.textInvalidCelular = 'Celular debe ser a 10 dígitos'
        } else {
          validationObj.validateCelular = false
          validationObj.textInvalidCelular = ''
        }
        break
      case 'confCel':
        if (value.length !== 10) {
          validationObj.validateConfCel = true
          validationObj.textInvalidConfCel = 'Celular debe ser a 10 dígitos'
        } else if (value.toString() !== form.celular.toString()) {
          validationObj.validateConfCel = true
          validationObj.textInvalidConfCel =
            'Celular no coincide con el campo Número Celular'
        } else {
          validationObj.validateConfCel = false
          validationObj.textInvalidConfCel = ''
        }
        break
      case 'aviso':
        value = target.checked
        break
      case 'pwd':
        if (value.length <= 7) {
          validationObj.validatePwd = true
          validationObj.textInvalidPwd =
            'La contraseña debe ser mayor o igual a 8 caracteres'
        } else {
          validationObj.validatePwd = false
          validationObj.textInvalidPwd = ''
        }
        break
      case 'confPwd':
        if (value !== form.pwd) {
          validationObj.validateConfPwd = true
          validationObj.textInvalidConfPwd = 'Las contraseñas no coinciden'
        } else {
          validationObj.validateConfPwd = false
          validationObj.textInvalidConfPwd = ''
        }
        break
      case 'verifyData':
        value = target.checked
        break
    }

    this.setState({
      form: { ...form, [name]: value },
      validationObj
    })
  }

  onChangeCodeVerify = (target: SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state
    const codeVerify = target

    this.setState({
      form: { ...form, codeVerify }
    })
  }

  onValidateForm = () => {
    let { validate } = this.state
    const { form, validationObj } = this.state

    const Modalbody = (
      <ModalBodyVerifyData form={form} handleChangeInput={this.onChangeInput} />
    )

    const Modalfooter = (
      <ModalFooterVerifyData
        handleHide={this.handleHide}
        goToStep2={this.goToStep2}
      />
    )

    validate = false
    const validateForm =
      isEmpty(form) ||
      (form.nombre === '' || !form.nombre) ||
      (form.apPat === '' || !form.apPat) ||
      (form.apPat === '' || !form.apPat) ||
      (form.fecNac === '' || !form.fecNac) ||
      (form.tarjeta === '' || !form.tarjeta) ||
      (form.email === '' || !form.email) ||
      (form.confEmail === '' || !form.confEmail) ||
      (form.celular === '' || !form.celular) ||
      (form.confCel === '' || !form.confCel) ||
      (form.aviso === 'false' || !form.aviso)

    if (validateForm) {
      validate = true

      if (form.confEmail !== form.Email) {
        validate = true
        validationObj.validateConfEmail = true
        validationObj.textInvalidEmailConf =
          'El email de confirmación no es igual a el campo Correo Electronico'
      }
      if (form.confCel !== form.celular) {
        validate = true
        validationObj.validateConfCel = true
        validationObj.textInvalidConfCel =
          'Celular no coincide con el campo Número Celular'
      }
      if (!form.email) {
        validationObj.validateEmail = true
        validationObj.textInvalidEmail = ''
      }
      if (!form.confEmail) {
        validationObj.validateConfEmail = true
        validationObj.textInvalidEmailConf = ''
      }
      if (!form.celular) {
        validationObj.validateCelular = true
        validationObj.textInvalidCelular = ''
      }
      if (!form.confCel) {
        validationObj.validateConfCel = true
        validationObj.textInvalidConfCel = ''
      }

      this.setState({
        validate,
        validationObj
      })
    } else {
      this.setState({
        validate,
        validationObj,
        showModal: true,
        sizeModal: 'lg',
        /* isLoading: false, */
        content: customMessage('', Modalbody, '', false, Modalfooter)
      })
    }
  }

  handleHide = (event: SyntheticEvent<HTMLButtonElement>) => {
    if ((event.currentTarget: HTMLButtonElement)) {
      this.setState({ showModal: false })
    }
  }

  goToStep2 = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { form } = this.state

    if (form.verifyData) {
      this.setState({ isLoading: true, showModal: false }, () => {
        validateData(form)
          .then(response => {
            console.log(response)
            createUser(form)
              .then(responseCreateUser => {
                console.log(responseCreateUser)
                this.setState({
                  showModal: true,
                  isLoading: false,
                  disableStep1: true,
                  disableStep2: false,
                  content: successMessage()
                })
              })
              .catch(({ responseCreateUser }) => {
                const { descripcionError } = responseCreateUser.data
                console.log(responseCreateUser)
                this.setState({
                  showModal: true,
                  sizeModal: '',
                  isLoading: false,
                  content: errorMessage(descripcionError)
                })
              })
          })
          .catch(({ response }) => {
            const { descripcionError } = response.data
            this.setState({
              showModal: true,
              sizeModal: '',
              isLoading: false,
              content: errorMessage(descripcionError)
            })
          })
      })
    }
    if ((event.currentTarget: HTMLButtonElement)) {
      this.setState({ showModal: false })
    }
  }

  handleBlur = ({ target }: SyntheticInputEvent) => {
    const { form } = this.state
    const { name, value } = target
    const fillTarjeta = '0'.repeat(16 - value.length) + value
    this.setState({ form: { ...form, [name]: fillTarjeta } })
  }

  render() {
    const {
      form,
      validate,
      validationObj,
      showModal,
      content,
      isLoading,
      sizeModal,
      disableStep1,
      disableStep2,
      disableStep3,
      disableStep4
    } = this.state

    if (isLoading) {
      return <Spinner />
    }
    return (
      <Fragment>
        <ModalProvider
          content={content}
          showModal={showModal}
          onClose={this.handleHide}
          size={sizeModal}
        />
        <RegisterForm
          form={form}
          validate={validate}
          validationObj={validationObj}
          handleChangeInput={this.onChangeInput}
          handleChangeCodeVerify={this.onChangeCodeVerify}
          handleValidateForm={this.onValidateForm}
          handleBlur={this.handleBlur}
          disableStep1={disableStep1}
          disableStep2={disableStep2}
          disableStep3={disableStep3}
          disableStep4={disableStep4}
        />
      </Fragment>
    )
  }
}

export default Registration
