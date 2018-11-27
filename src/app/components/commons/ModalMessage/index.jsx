// Dependencies
import React, { Component, Fragment } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'Components/commons/Button'
// Context
import ModalContext from 'Context/commons/Modal'
// Flow Props and State
type Props = {
  content: Object,
  onClose: void,
  size: string
}
type State = {
  /** */
}

class ModalMessage extends Component<Props, State> {
  static contextType = ModalContext

  render() {
    const { content, onClose, size } = this.props
    const modalConsumer = this.context

    const closeButton = (
      <Button variant="primary" onClick={onClose} label="Cerrar" />
    )

    return (
      <Fragment>
        <Modal
          show={modalConsumer.showModal}
          onHide={onClose}
          backdrop="static"
          keyboard={false}
          size={size}
          /* dialogClassName={modalContext.className} */
        >
          {content.title && (
            <Modal.Header closeButton={false}>
              <Modal.Title>{content.title}</Modal.Title>
            </Modal.Header>
          )}
          <Modal.Body>{content.body}</Modal.Body>
          <Modal.Footer>
            {content.footer ? content.footer : closeButton}
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}

export default ModalMessage
