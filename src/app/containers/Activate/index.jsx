import React, { Fragment, Component } from 'react'

import { activateAccount } from 'Api/Register'

type Props = {
  match: Object
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
        return <h1>{`Su cuenta ${email} está siendo activada`}</h1>
      }
      if (activated === 2) {
        return (
          <h1>{`Su cuenta ${email} ha sido activada satisfactoriamente`}</h1>
        )
      }
      return (
        <Fragment>
          <h1>{`Hubo un error al activar la cuenta ${email}`}</h1>
          <button type="button" onClick={() => this.onClickRetryActivation}>
            Intentar nuevamente
          </button>
        </Fragment>
      )
    }

    return <Activated />
  }
}

export default Activate
