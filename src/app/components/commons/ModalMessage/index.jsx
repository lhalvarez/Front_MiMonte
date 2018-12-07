/* eslint-disable */
/* eslint-disable prettier/prettier */
// Dependencies
import React, { Component, Fragment } from 'react'
import { Modal, ButtonToolbar } from 'react-bootstrap'
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

    function customFooter() {
      const buttons = content.footer.map(f => (
        <Fragment key={f.label.toString()}>
          <Button variant={f.variant} onClick={f.onClick} label={f.label} />
          &nbsp;
        </Fragment>
      ))
      return <ButtonToolbar>{buttons}</ButtonToolbar>
    }

    const footer = content.footer ? customFooter() : <Button variant="primary" onClick={onClose} label="Cerrar" />

    return <Modal show={modalConsumer.showModal} onHide={onClose} backdrop="static" keyboard={false} size={size}>
        {content.title && <Modal.Header closeButton={false}>
            <Modal.Title>{content.title}</Modal.Title>
          </Modal.Header>}
        <Modal.Body>{content.body}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
  }
}

export default ModalMessage