import React, { Fragment, Component } from 'react'

import { activateAccount } from 'Api/Register'

// Components
import RegisterActive from 'Components/Activate'

type Props = {
  match: Object,
  history: any
}
type State = {
  activated: number
}

class Activate extends Component<Props, State> {
  state = {
    activated: 1
  }

  componentWillMount() {
    const { match } = this.props
    const { token, email } = match.params

    activateAccount(token, email)
      .then(() => {
        this.setState({ activated: 2 })
      })
      .catch(() => {
        this.setState({ activated: 3 })
      })
  }

  goToInicio = () => {
    const { history } = this.props
    history.push('/login')
  }

  onClickRetryActivation = () => {
    const { match } = this.props
    const { token, email } = match.params

    this.setState({ activated: 1 }, () => {
      activateAccount(token, email)
        .then(() => {
          this.setState({ activated: 2 })
        })
        .catch(() => {
          this.setState({ activated: 3 })
        })
    })
  }

  render() {
    const { match } = this.props
    const { email } = match.params
    const { activated } = this.state

    const Activated = () => {
      if (activated === 1) {
        return (
          <RegisterActive
            message={`Su cuenta ${email} está siendo activada`}
            status="pending"
          />
        )
      }
      if (activated === 2) {
        return (
          <RegisterActive
            message={`Su cuenta ${email} ha sido activada satisfactoriamente`}
            status="success"
            goToInicio={this.goToInicio}
          />
        )
      }
      return (
        <Fragment>
          <RegisterActive
            message={`Hubo un error al activar la cuenta ${email}`}
            status="error"
            gotRetryActivation={this.onClickRetryActivation}
          />
        </Fragment>
      )
    }

    return <Activated />
  }
}

export default Activate
