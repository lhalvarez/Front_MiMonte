import React, { Component } from 'react'
// Flow Props and State
type Props = {
  isLoading: Object
}

class Loading extends Component<Props> {
  showLoading = () => {
    const { isLoading } = this.props
    if (isLoading) {
      return (
        <div className="loading-component">
          <i className="fa fa-circle-o-notch fa-spin fa-4x" />
        </div>
      )
    }
    return null
  }

  render() {
    return this.showLoading()
  }
}

export default Loading
