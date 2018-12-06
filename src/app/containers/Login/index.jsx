// Dependencies
import React, {
  Component,
  Fragment,
  SyntheticInputEvent,
  SyntheticEvent
} from 'react'
// API
import login, {
  solicitarReinicioContrasena,
  registrarContrasena
} from 'Api/Login'
// Context
import { LoginProvider } from 'Context/Login'
// Components
import LoginForm from 'Components/Login'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
// Utils
import { errorMessage, successMessage } from 'SharedUtils/Utils'
// Styles
import styles from 'Components/Login/Login.less'
// Flow Props and Stats
type Props = {
  /** */
}
type State = {
  content: Array<mixed>,
  form: Object,
  validationObj: Object,
  showModal: boolean,
  validate: boolean,
  isLoading: boolean,
  modalLogin: number
}

class Login extends Component<Props, State> {
  state = {
    content: [],
    form: {},
    validationObj: {
      validatePwd: false
    },
    validate: false,
    modalLogin: 1
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    const { form, validationObj } = this.state
    const { name, value } = target

    // eslint-disable-next-line default-case
    switch (name) {
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
    }

    this.setState({
      form: { ...form, [name]: value },
      validationObj
    })
  }

  handleChangeCodeVerify = target => {
    this.setState({ inputRef: target })
  }

  onClick = () => {
    const { form } = this.state
    const { history } = this.props

    if (!form.username || !form.password) {
      this.setState({ validate: true })
    } else {
      this.setState({ isLoading: true })

      login(form)
        .then(data => {
          this.setState(
            { userInfo: data, validate: false, isLoading: false },
            () => {
              history.push('mimonte/inicio')
            }
          )
        })
        .catch(error => {
          if (error) {
            this.setState({
              showModal: true,
              isLoading: false,
              content: errorMessage(
                'Error de identificacion',
                'Usuario o contraseña incorrecta'
              )
            })
          }
        })
    }
  }

  handleModalLogin = modalLogin => {
    const { form, inputRef } = this.state
    this.setState({ isLoading: true }) // Este va en cada petición, quítalo de aquí
    if (modalLogin === 1 || modalLogin === 2) {
      this.setState({ modalLogin, isLoading: false })
    } else if (modalLogin === 3) {
      solicitarReinicioContrasena(form.usuario)
        .then(response => {
          this.setState({
            modalLogin,
            showModal: true,
            isLoading: false,
            form: { ...form, telefono: response.telefono.ultimosDigitos },
            content: successMessage()
          })
        })
        .catch(response => {
          this.setState({
            showModal: true,
            isLoading: false,
            content: errorMessage('', response.response.data.descripcionError)
          })
        })
    } else if (modalLogin === 4) {
      if (!inputRef.value) {
        // eslint-disable-next-line no-console
        console.log('No hay valor')
      } else if (form.pwd || form.validateConfPwd) {
        // eslint-disable-next-line no-console
        console.log('No hay contraseñas')
      } else if (form.pwd !== form.validateConfPwd) {
        // eslint-disable-next-line no-console
        console.log('No coinciden')
      } else {
        registrarContrasena(form)
          .then(() => {
            this.setState({
              modalLogin,
              showModal: true,
              isLoading: false,
              content: successMessage()
            })
          })
          .catch(response => {
            this.setState({
              showModal: true,
              isLoading: false,
              content: errorMessage('', response.response.data.descripcionError)
            })
          })
      }
    }
  }

  handleHide = (event: SyntheticEvent<HTMLButtonElement>) => {
    if ((event.currentTarget: HTMLButtonElement)) {
      this.setState({ showModal: false })
    }
  }

  render() {
    const {
      content,
      form,
      showModal,
      userInfo,
      validate,
      isLoading,
      modalLogin,
      validationObj
    } = this.state

    if (isLoading) {
      return <Spinner />
    }

    return (
      <Fragment>
        <LoginProvider value={{ userInfo }}>
          <ModalProvider
            content={content}
            showModal={showModal}
            onClose={this.handleHide}
          />
          <LoginForm
            form={form}
            validate={validate}
            handleChange={this.onChange}
            handleClick={this.onClick}
            handleModalLogin={this.handleModalLogin}
            modalLogin={modalLogin}
            validationObj={validationObj}
            handleChangeCodeVerify={this.handleChangeCodeVerify}
            styles={styles}
          />
        </LoginProvider>
      </Fragment>
    )
  }
}

export default Login
