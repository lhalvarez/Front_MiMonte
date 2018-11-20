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
  onClose: void
}

function ModalProvider(props: Props) {
  const { content, onClose, showModal } = props

  return (
    <Fragment>
      <ModalContext.Provider value={{ showModal }}>
        <ModalMessage
          content={content}
          backdrop="static"
          keyboard={false}
          onClose={onClose}
        />
      </ModalContext.Provider>
    </Fragment>
  )
}

export default ModalProvider
