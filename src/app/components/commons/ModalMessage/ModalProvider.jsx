// Dependencies
import React, { Fragment } from 'react'
// Context
import ModalContext from 'Context/commons/Modal'
// Components
import ModalMessage from 'Components/commons/ModalMessage'
// Flow
type Props = {
  content: Object,
  showModal: boolean,
  onClose: void,
  size: string
}

function ModalProvider(props: Props) {
  const { content, onClose, showModal, size } = props

  return (
    <Fragment>
      <ModalContext.Provider value={{ showModal }}>
        <ModalMessage
          content={content}
          backdrop="static"
          keyboard={false}
          onClose={onClose}
          size={size}
        />
      </ModalContext.Provider>
    </Fragment>
  )
}

export default ModalProvider
