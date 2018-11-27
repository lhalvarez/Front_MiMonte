import React, { Fragment } from 'react'
import alertImage from 'SharedImages/icono-alerta.svg'
import { Row, Col, Media } from 'react-bootstrap'
import Checkbox from 'Components/commons/Checkbox'
import style from './Register.less'

type Props = {
  form: Object,
  handleChangeInput: void
}

function ModalBodyVerifyData(props: Props) {
  const { form, handleChangeInput } = props
  return (
    <Fragment>
      <Row>
        <Col className={style.titleModal}>
          <p>Atención</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className={style.textBodyModal}>
              <p>
                Estimado cliente, por favor verifica que tus datos de correo y
                teléfono celular sean correctos ya que
                <span>
                  &nbsp;no podrás modificarlos una vez que hayas dado click en
                  aceptar.
                </span>
                &nbsp;De ser incorrectos
                <span>&nbsp;perderás acceso a tu cuenta.</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Media>
              <img
                src={alertImage}
                alt=""
                className={`${style.imgMedia} img-fluid align-self-center`}
              />
              <Media.Body className={style.mediaBody}>
                <p className={style.textBodyInfo}>Correo</p>
                <p className={style.textBodyRed}>{form.email}</p>
                <p className={style.textBodyInfo}>Teléfono celular</p>
                <p className={style.textBodyRed}>{form.celular}</p>

                <Checkbox
                  label="Verifico que los datos proporcionados son correctos"
                  classLabel="textBodyInfo"
                  name="verifyData"
                  id="verifyData"
                  type="checkbox"
                  value={form.verifyData}
                  onChange={handleChangeInput}
                />
              </Media.Body>
            </Media>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default ModalBodyVerifyData
