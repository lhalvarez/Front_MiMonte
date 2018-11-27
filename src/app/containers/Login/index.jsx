// Dependencies
import React, {
  Component,
  Fragment,
  SyntheticInputEvent,
  SyntheticEvent
} from 'react'
// API
import login from 'Api/Login'
// Context
import { LoginProvider } from 'Context/Login'
// Components
import LoginForm from 'Components/Login'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
// Utils
import { errorMessage } from 'SharedUtils/Utils'
// Flow Props and Stats
type Props = {
  /** */
}
type State = {
  content: Array<mixed>,
  form: Object,
  showModal: boolean,
  validate: boolean,
  isLoading: boolean
}

class Login extends Component<Props, State> {
  state = {
    content: [],
    form: {},
    validate: false
  }

  onChange = ({ target }: SyntheticInputEvent) => {
    let { form } = this.state

    form = { ...form, [target.name]: target.value }
    this.setState({ form })
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
      isLoading
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
          />
        </LoginProvider>
      </Fragment>
    )
  }
}

export default Login
