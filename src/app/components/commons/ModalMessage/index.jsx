// Dependencies
import React, { Component, Fragment } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import Button from 'Components/commons/Button'
// Context
import ModalContext from 'Context/commons/Modal'
// Flow Props and State
type Props = {
  content: Object,
  onClose: void
}
type State = {
  /** */
}

class ModalMessage extends Component<Props, State> {
  static contextType = ModalContext

  render() {
    const { content, onClose } = this.props
    const modalConsumer = this.context

    return (
      <Fragment>
        <Modal
          show={modalConsumer.showModal}
          onHide={onClose}
          backdrop="static"
          keyboard={false}
          /* dialogClassName={modalContext.className} */
        >
          {content.title && (
            <ModalHeader closeButton={false}>
              <ModalTitle>{content.title}</ModalTitle>
            </ModalHeader>
          )}
          <ModalBody>{content.body}</ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={onClose} label="Cerrar" />
          </ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}

export default ModalMessage
