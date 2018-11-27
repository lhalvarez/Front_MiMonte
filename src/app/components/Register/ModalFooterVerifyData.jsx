import React from 'react'
import { Col, Button } from 'react-bootstrap'
import style from './Register.less'

type Props = {
  handleHide: void,
  goToStep2: void
}

function ModalBodyVerifyData(props: Props) {
  const { handleHide, goToStep2 } = props
  return (
    <Col className="text-right">
      <Button
        variant="info"
        onClick={handleHide}
        className={style.btnModificar}
      >
        Modificar
      </Button>
      <Button variant="primary" onClick={goToStep2}>
        Aceptar
      </Button>
    </Col>
  )
}

export default ModalBodyVerifyData
